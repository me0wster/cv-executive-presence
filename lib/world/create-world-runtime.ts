import * as THREE from "three";
import { createCameraRig } from "@/lib/world/camera-rig";
import { damp } from "@/lib/world/math";
import { interpolateWorldState } from "@/lib/world/world-state";
import { worldConfig } from "@/lib/world/world-config";
import type { ScrollProgressState, WorldRuntimeHandles } from "@/lib/world/types";

export interface CreateWorldRuntimeOptions {
  canvas: HTMLCanvasElement;
  reducedMotion?: boolean;
}

const SMOOTH_EPS = 0.0008;
const POINTER_EPS = 0.002;
const ACTIVITY_MS = 140;

export function createWorldRuntime(
  options: CreateWorldRuntimeOptions
): WorldRuntimeHandles {
  const { chapters, quality: qualityConfig, buildWorld } = worldConfig;

  let reducedMotion = Boolean(options.reducedMotion);
  let running = true;
  let clock = 0;
  let lastTime = 0;
  let pointerX = 0;
  let pointerY = 0;
  let targetPointerX = 0;
  let targetPointerY = 0;
  let activityUntil = 0;
  let progress: ScrollProgressState = {
    exact: 0,
    smooth: 0,
    index: 0,
    next: 0,
    localExact: 0,
    smoothIndex: 0,
    smoothNext: 0,
    localSmooth: 0,
    direction: 0,
    anchors: [],
  };

  const isMobile = () => window.innerWidth < 768;
  const quality = isMobile() ? qualityConfig.mobile : qualityConfig.desktop;
  const shadowsEnabled = quality.shadows > 0;

  const renderer = new THREE.WebGLRenderer({
    canvas: options.canvas,
    antialias: quality.dpr >= 1.25,
    alpha: false,
    powerPreference: "default",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  renderer.shadowMap.enabled = shadowsEnabled;
  if (shadowsEnabled) {
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(chapters[0].camera.fov, 1, 0.35, 120);
  const world = buildWorld(scene, { particleScale: quality.particles });
  const cameraRig = createCameraRig({
    camera,
    waypoints: chapters.map((chapter) => chapter.camera),
    isMobile,
  });

  let perfScale = 1;
  let perfAcc = 0;
  let perfCount = 0;
  let frame = 0;
  let hidden = false;

  function wake() {
    activityUntil = performance.now() + ACTIVITY_MS;
    scheduleFrame();
  }

  function scheduleFrame() {
    if (!running || hidden || frame) return;
    lastTime = 0;
    frame = requestAnimationFrame(tick);
  }

  function onVisibilityChange() {
    hidden = document.hidden;
    if (hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      return;
    }
    wake();
  }

  document.addEventListener("visibilitychange", onVisibilityChange);

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, quality.dpr) * perfScale;
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (shadowsEnabled) {
      world.keyLight.shadow.mapSize.set(quality.shadows, quality.shadows);
    }
  }

  function applyWorldState(
    state = interpolateWorldState(chapters, progress.smooth)
  ) {
    world.fog.density = state.fog;
    world.keyLight.intensity = 1.15 * state.key;
    world.fillLight.intensity = 0.45 + state.practicals * 0.25;
    world.practicalLights.forEach((light, index) => {
      light.intensity = 1.4 * state.practicals * (0.85 + (index % 3) * 0.08);
    });
    const particleMaterial = world.particles.material as THREE.PointsMaterial;
    particleMaterial.opacity = 0.18 + state.particles * 0.28;
    const wispMaterial = world.wisps.material as THREE.PointsMaterial;
    wispMaterial.opacity = 0.12 + state.particles * 0.18;
  }

  function updateWisps(dt: number) {
    const positions = world.wisps.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    for (let i = 0; i < positions.count; i += 1) {
      positions.setX(
        i,
        positions.getX(i) +
          Math.sin(clock * 0.6 + i) * dt * 0.08 +
          targetPointerX * dt * 0.04
      );
      positions.setY(
        i,
        positions.getY(i) + Math.cos(clock * 0.4 + i * 0.7) * dt * 0.03
      );
    }
    positions.needsUpdate = true;
  }

  function renderFrame(dt: number) {
    clock += dt;
    cameraRig.apply(progress.smooth, {
      x: targetPointerX,
      y: targetPointerY,
    });
    applyWorldState();
    updateWisps(dt);
    renderer.render(scene, camera);
  }

  function tick(now: number) {
    if (!running || hidden) {
      frame = 0;
      return;
    }

    const raw = lastTime ? (now - lastTime) / 1000 : 0;
    const dt = Math.min(raw || 1 / 60, 0.05);
    lastTime = now;

    targetPointerX = damp(targetPointerX, pointerX, 4.5, dt);
    targetPointerY = damp(targetPointerY, pointerY, 4.5, dt);

    const pointerAnimating =
      Math.abs(targetPointerX - pointerX) > POINTER_EPS ||
      Math.abs(targetPointerY - pointerY) > POINTER_EPS;
    const active = performance.now() < activityUntil || pointerAnimating;

    if (active) {
      renderFrame(dt);

      if (frame > 120) {
        perfAcc += raw;
        perfCount += 1;
        if (perfCount >= 40 || perfAcc > 0.9) {
          const avg = perfAcc / perfCount;
          perfAcc = 0;
          perfCount = 0;
          if (avg > 0.023 && perfScale > 0.5) {
            perfScale = Math.max(0.5, perfScale * (avg > 0.05 ? 0.64 : 0.85));
            resize();
          } else if (avg < 0.0138 && perfScale < 1) {
            perfScale = Math.min(1, perfScale + 0.08);
            resize();
          }
        }
      }
    }

    if (active || pointerAnimating) {
      frame = requestAnimationFrame(tick);
    } else {
      frame = 0;
    }
  }

  resize();
  wake();

  return {
    resize,
    update(nextProgress: ScrollProgressState) {
      const smoothChanged =
        Math.abs(nextProgress.smooth - progress.smooth) > SMOOTH_EPS;
      const indexChanged =
        nextProgress.smoothIndex !== progress.smoothIndex ||
        nextProgress.smoothNext !== progress.smoothNext;
      progress = nextProgress;
      if (smoothChanged || indexChanged) wake();
    },
    render() {
      cameraRig.apply(progress.smooth, {
        x: targetPointerX,
        y: targetPointerY,
      });
      applyWorldState();
      renderer.render(scene, camera);
    },
    setReducedMotion(value: boolean) {
      reducedMotion = value;
      if (reducedMotion) {
        running = false;
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    setPointer(x: number, y: number) {
      if (
        Math.abs(x - pointerX) > POINTER_EPS ||
        Math.abs(y - pointerY) > POINTER_EPS
      ) {
        pointerX = x;
        pointerY = y;
        wake();
      }
    },
    dispose() {
      running = false;
      cancelAnimationFrame(frame);
      frame = 0;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      world.dispose();
      cameraRig.dispose();
      renderer.dispose();
      scene.clear();
    },
  };
}

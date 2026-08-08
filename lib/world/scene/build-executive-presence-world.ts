import * as THREE from "three";
import type { ScrollWorldScene } from "@/lib/world/scene/types";

function createPaperTexture(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#f7f2ea";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 800; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const alpha = Math.random() * 0.04;
    ctx.fillStyle = `rgba(120, 100, 80, ${alpha})`;
    ctx.fillRect(x, y, 1, 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function buildExecutivePresenceWorld(scene: THREE.Scene): ScrollWorldScene {
  const root = new THREE.Group();
  root.name = "executive-presence";

  const paperTexture = createPaperTexture();
  const textures: THREE.Texture[] = [paperTexture];

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 120),
    new THREE.MeshStandardMaterial({
      color: 0xf3ece4,
      roughness: 0.95,
      metalness: 0,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  root.add(floor);

  const paperMat = new THREE.MeshStandardMaterial({
    map: paperTexture,
    color: 0xffffff,
    roughness: 0.92,
    metalness: 0,
    side: THREE.DoubleSide,
  });

  const frames: Array<{ x: number; y: number; z: number; w: number; h: number; rotY: number }> = [
    { x: -7, y: 3.8, z: -3, w: 5.2, h: 6.8, rotY: 0.22 },
    { x: 6.5, y: 3.2, z: -5, w: 4.4, h: 5.6, rotY: -0.28 },
    { x: 1, y: 4.8, z: -9, w: 6.5, h: 3.8, rotY: 0.08 },
    { x: -4, y: 2.2, z: 3, w: 3.4, h: 4.2, rotY: 0.4 },
    { x: 5, y: 1.8, z: 2, w: 3.8, h: 2.8, rotY: -0.18 },
    { x: -2, y: 5.5, z: -14, w: 4.8, h: 3.2, rotY: -0.05 },
  ];

  const disposables: Array<THREE.BufferGeometry | THREE.Material> = [
    floor.geometry,
    floor.material,
    paperMat,
  ];

  frames.forEach((frame, index) => {
    const sheet = new THREE.Mesh(
      new THREE.PlaneGeometry(frame.w, frame.h),
      paperMat
    );
    sheet.position.set(frame.x, frame.y, frame.z);
    sheet.rotation.y = frame.rotY;
    sheet.castShadow = true;
    sheet.receiveShadow = true;
    sheet.name = `paper-${index}`;
    root.add(sheet);
    disposables.push(sheet.geometry);

    const border = new THREE.Mesh(
      new THREE.PlaneGeometry(frame.w + 0.08, frame.h + 0.08),
      new THREE.MeshStandardMaterial({
        color: 0xe8dfd4,
        roughness: 0.88,
        metalness: 0.02,
        side: THREE.DoubleSide,
      })
    );
    border.position.copy(sheet.position);
    border.rotation.copy(sheet.rotation);
    border.position.z -= 0.02;
    root.add(border);
    disposables.push(border.geometry, border.material);
  });

  const accentGeo = new THREE.BoxGeometry(0.06, 2.4, 0.06);
  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x861b13,
    roughness: 0.4,
    metalness: 0.1,
  });
  [-8, 8].forEach((x) => {
    const accent = new THREE.Mesh(accentGeo, accentMat);
    accent.position.set(x, 1.2, -2);
    accent.castShadow = true;
    root.add(accent);
  });
  disposables.push(accentGeo, accentMat);

  const keyLight = new THREE.DirectionalLight(0xfff8f0, 1.15);
  keyLight.position.set(-6, 14, 8);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 60;
  keyLight.shadow.camera.left = -18;
  keyLight.shadow.camera.right = 18;
  keyLight.shadow.camera.top = 18;
  keyLight.shadow.camera.bottom = -18;

  const fillLight = new THREE.HemisphereLight(0xfff5eb, 0xe8dfd4, 0.65);
  const fog = new THREE.FogExp2(0xf5f0e8, 0.0045);
  scene.fog = fog;
  scene.background = new THREE.Color(0xf5f0e8);

  const particleCount = 180;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = 0.5 + Math.random() * 10;
    positions[i * 3 + 2] = -6 + Math.random() * 20;
  }
  const particles = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    ),
    new THREE.PointsMaterial({
      color: 0xd4c4b0,
      size: 0.06,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    })
  );

  const wispCount = 60;
  const wispPositions = new Float32Array(wispCount * 3);
  for (let i = 0; i < wispCount; i += 1) {
    wispPositions[i * 3] = (Math.random() - 0.5) * 18;
    wispPositions[i * 3 + 1] = 1.5 + Math.random() * 6;
    wispPositions[i * 3 + 2] = -2 + Math.random() * 14;
  }
  const wisps = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(wispPositions, 3)
    ),
    new THREE.PointsMaterial({
      color: 0xf0e6d8,
      size: 0.1,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    })
  );

  root.add(particles, wisps);
  scene.add(root, keyLight, fillLight);
  disposables.push(
    particles.geometry,
    particles.material,
    wisps.geometry,
    wisps.material
  );

  return {
    root,
    keyLight,
    fillLight,
    practicalLights: [],
    fog,
    particles,
    wisps,
    dispose() {
      textures.forEach((texture) => texture.dispose());
      disposables.forEach((item) => item.dispose());
      scene.remove(root, keyLight, fillLight);
    },
  };
}

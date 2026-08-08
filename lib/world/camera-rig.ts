import * as THREE from "three";
import { clamp, lerp } from "@/lib/world/math";
import type { CameraWaypoint } from "@/lib/world/types";

const _position = new THREE.Vector3();
const _target = new THREE.Vector3();
const _direction = new THREE.Vector3();

export interface CameraRigOptions {
  waypoints: CameraWaypoint[];
  camera: THREE.PerspectiveCamera;
  isMobile?: () => boolean;
}

export interface CameraRig {
  apply: (progress: number, pointer?: { x: number; y: number }) => void;
  dispose: () => void;
}

function aspectFix(): number {
  return clamp((1.62 - window.innerWidth / window.innerHeight) / 1.05, 0, 1);
}

function fitAspect(
  position: THREE.Vector3,
  target: THREE.Vector3,
  fov: number
): number {
  const narrowFactor = aspectFix();
  if (narrowFactor <= 0) return fov;
  _direction.subVectors(position, target).normalize();
  position.addScaledVector(_direction, narrowFactor * 8.2);
  position.y += narrowFactor * 1.1;
  return fov * (1 + narrowFactor * 0.4);
}

function resolveWaypoint(
  waypoint: CameraWaypoint,
  isMobile: boolean
): { position: THREE.Vector3; target: THREE.Vector3; fov: number } {
  if (isMobile && waypoint.mobile) {
    return {
      position: new THREE.Vector3(...waypoint.mobile.position),
      target: new THREE.Vector3(...waypoint.mobile.target),
      fov: waypoint.mobile.fov,
    };
  }

  return {
    position: new THREE.Vector3(...waypoint.position),
    target: new THREE.Vector3(...waypoint.target),
    fov: waypoint.fov,
  };
}

export function createCameraRig(options: CameraRigOptions): CameraRig {
  const { camera, waypoints } = options;
  const isMobile = options.isMobile ?? (() => window.innerWidth < 768);

  const positions = waypoints.map(
    (waypoint) => resolveWaypoint(waypoint, isMobile()).position
  );
  const targets = waypoints.map(
    (waypoint) => resolveWaypoint(waypoint, isMobile()).target
  );

  const curveP = new THREE.CatmullRomCurve3(positions, false, "catmullrom", 0.42);
  const curveT = new THREE.CatmullRomCurve3(targets, false, "catmullrom", 0.42);

  return {
    apply(progress: number, pointer = { x: 0, y: 0 }) {
      const last = waypoints.length - 1;
      const u = clamp(progress / last, 0, 1);
      curveP.getPoint(u, _position);
      curveT.getPoint(u, _target);

      const index = clamp(Math.floor(progress), 0, last - 1);
      const local = clamp(progress - index, 0, 1);
      const current = resolveWaypoint(waypoints[index], isMobile());
      const next = resolveWaypoint(waypoints[index + 1], isMobile());
      let fov = lerp(current.fov, next.fov, local);
      fov = fitAspect(_position, _target, fov);

      const parallax = 1 - clamp(progress / 1.6, 0, 1) * 0.55;
      _position.x += pointer.x * 0.62 * parallax;
      _position.y += pointer.y * 0.34 * parallax;
      _target.x -= pointer.x * 0.2 * parallax;
      _target.y -= pointer.y * 0.12 * parallax;

      camera.position.copy(_position);
      camera.lookAt(_target);

      if (Math.abs(camera.fov - fov) > 1e-4) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
    },
    dispose() {
      curveP.points.length = 0;
      curveT.points.length = 0;
    },
  };
}

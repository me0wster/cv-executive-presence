import * as THREE from "three";

export interface ScrollWorldScene {
  root: THREE.Group;
  keyLight: THREE.DirectionalLight;
  fillLight: THREE.HemisphereLight;
  practicalLights: THREE.PointLight[];
  fog: THREE.FogExp2;
  particles: THREE.Points;
  wisps: THREE.Points;
  dispose: () => void;
}

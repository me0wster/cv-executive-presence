export type Vec3 = [number, number, number];

export interface CameraWaypoint {
  position: Vec3;
  target: Vec3;
  fov: number;
  mobile?: {
    position: Vec3;
    target: Vec3;
    fov: number;
  };
}

export interface WorldChapterState {
  fog: number;
  key: number;
  practicals: number;
  particles: number;
  grade: "warm" | "neutral" | "cool";
}

export interface WorldChapterCopy {
  eyebrow: string;
  title: string;
  body: string;
}

export interface WorldChapter {
  id: string;
  label: string;
  scrollWeight: number;
  copy: WorldChapterCopy;
  camera: CameraWaypoint;
  world: WorldChapterState;
}

export interface ScrollProgressState {
  exact: number;
  smooth: number;
  index: number;
  next: number;
  localExact: number;
  smoothIndex: number;
  smoothNext: number;
  localSmooth: number;
  direction: number;
  anchors: number[];
}

export interface QualityProfile {
  dpr: number;
  shadows: number;
  particles: number;
  post: "lite" | "full";
}

export interface WorldRuntimeHandles {
  dispose: () => void;
  resize: () => void;
  update: (progress: ScrollProgressState) => void;
  render: () => void;
  setReducedMotion: (value: boolean) => void;
  setPointer: (x: number, y: number) => void;
}

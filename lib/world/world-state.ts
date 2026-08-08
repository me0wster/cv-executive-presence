import * as THREE from "three";
import { clamp, lerp } from "@/lib/world/math";
import type { WorldChapter, WorldChapterState } from "@/lib/world/types";

export interface InterpolatedWorldState {
  fog: number;
  key: number;
  practicals: number;
  particles: number;
  gradeMix: number;
}

export function interpolateWorldState(
  chapters: WorldChapter[],
  progress: number
): InterpolatedWorldState {
  const last = chapters.length - 1;
  const index = clamp(Math.floor(progress), 0, last - 1);
  const local = clamp(progress - index, 0, 1);
  const current = chapters[index].world;
  const next = chapters[index + 1].world;

  return {
    fog: lerp(current.fog, next.fog, local),
    key: lerp(current.key, next.key, local),
    practicals: lerp(current.practicals, next.practicals, local),
    particles: lerp(current.particles, next.particles, local),
    gradeMix: gradeToNumber(current.grade, next.grade, local),
  };
}

function gradeToNumber(
  from: WorldChapterState["grade"],
  to: WorldChapterState["grade"],
  t: number
): number {
  const map = { warm: 0, neutral: 0.5, cool: 1 } as const;
  return lerp(map[from], map[to], t);
}

export function gradeTint(gradeMix: number): THREE.ColorRepresentation {
  if (gradeMix < 0.33) return 0xfff1e8;
  if (gradeMix > 0.66) return 0xdce7f2;
  return 0xf3ece4;
}

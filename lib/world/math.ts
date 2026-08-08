export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function damp(
  current: number,
  target: number,
  lambda: number,
  dt: number
): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export function smooth(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / Math.max(1e-6, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function easeOut(t: number): number {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
}

export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

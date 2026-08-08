import { clamp, damp } from "@/lib/world/math";
import type { ScrollProgressState } from "@/lib/world/types";

export interface ScrollConductorOptions {
  sections: HTMLElement[];
  damping?: number;
  reducedMotion?: boolean;
  onUpdate?: (state: ScrollProgressState) => void;
  onChapterChange?: (index: number, state: ScrollProgressState) => void;
  getScrollY?: () => number;
}

export interface ScrollConductor {
  start: () => ScrollConductor;
  stop: () => void;
  destroy: () => void;
  measure: () => number[];
  read: () => void;
  getState: () => ScrollProgressState;
  progressAt: (y: number) => number;
  goTo: (index: number, behavior?: ScrollBehavior) => void;
  setReducedMotion: (value: boolean) => void;
}

function segment(progress: number, count: number) {
  const last = count - 1;
  const index = clamp(Math.floor(progress), 0, last);
  const next = Math.min(last, index + 1);
  return {
    index,
    next,
    local: next === index ? 0 : clamp(progress - index, 0, 1),
  };
}

export function createScrollConductor(
  options: ScrollConductorOptions
): ScrollConductor {
  const sections = options.sections;
  if (!sections.length) {
    throw new Error("createScrollConductor requires sections");
  }

  const damping = Number.isFinite(options.damping) ? options.damping! : 5.2;
  let reduce = Boolean(options.reducedMotion);
  const onUpdate = options.onUpdate ?? (() => undefined);
  const onChapterChange = options.onChapterChange ?? (() => undefined);
  const getY =
    options.getScrollY ??
    (() => window.scrollY || window.pageYOffset || 0);

  let anchors: number[] = [];
  let exact = 0;
  let smooth = 0;
  let direction = 0;
  let previousY = 0;
  let active = -1;
  let running = false;
  let frame = 0;
  let lastTime = 0;
  let dirty = true;
  let widthAtMeasure = 0;
  let resizeObserver: ResizeObserver | null = null;

  function maxScroll() {
    return Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
  }

  function measure() {
    const max = maxScroll();
    widthAtMeasure = window.innerWidth;
    anchors = sections.map((element, index) => {
      if (index === 0) return 0;
      if (index === sections.length - 1) return max;
      const value =
        element.offsetTop + element.offsetHeight * 0.5 - window.innerHeight * 0.5;
      return clamp(value, 0, max);
    });

    for (let index = 1; index < anchors.length; index += 1) {
      anchors[index] = Math.max(anchors[index], anchors[index - 1] + 1);
    }

    dirty = true;
    return anchors.slice();
  }

  function progressAt(y: number) {
    if (!anchors.length) measure();
    y = clamp(y, 0, maxScroll());
    if (y <= anchors[0]) return 0;

    for (let index = 0; index < anchors.length - 1; index += 1) {
      if (y <= anchors[index + 1]) {
        const span = Math.max(1, anchors[index + 1] - anchors[index]);
        return index + clamp((y - anchors[index]) / span, 0, 1);
      }
    }

    return anchors.length - 1;
  }

  function state(): ScrollProgressState {
    const exactSegment = segment(exact, sections.length);
    const smoothSegment = segment(smooth, sections.length);
    return {
      exact,
      smooth,
      index: exactSegment.index,
      next: exactSegment.next,
      localExact: exactSegment.local,
      smoothIndex: smoothSegment.index,
      smoothNext: smoothSegment.next,
      localSmooth: smoothSegment.local,
      direction,
      anchors,
    };
  }

  function readScroll() {
    const y = getY();
    const delta = y - previousY;
    if (Math.abs(delta) > 0.25) direction = delta > 0 ? 1 : -1;
    previousY = y;
    exact = progressAt(y);
    dirty = true;
  }

  function tick(now: number) {
    if (!running) return;
    const dt = lastTime ? Math.min((now - lastTime) / 1000, 1 / 30) : 1 / 60;
    lastTime = now;

    const previousSmooth = smooth;
    smooth = reduce ? exact : damp(smooth, exact, damping, dt);
    if (Math.abs(smooth - exact) < 0.0001) smooth = exact;

    const nextState = state();
    if (nextState.index !== active) {
      active = nextState.index;
      onChapterChange(active, nextState);
    }

    if (dirty || smooth !== previousSmooth) {
      dirty = false;
      onUpdate(nextState);
    }

    frame = requestAnimationFrame(tick);
  }

  function onScroll() {
    readScroll();
  }

  function onResize() {
    const widthChanged = window.innerWidth !== widthAtMeasure;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse && !widthChanged) return;
    measure();
    readScroll();
  }

  function onVisibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      return;
    }
    if (running && !frame) frame = requestAnimationFrame(tick);
    readScroll();
  }

  function start() {
    if (running) return api;
    running = true;
    measure();
    previousY = getY();
    exact = progressAt(previousY);
    smooth = reduce ? exact : exact;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
    window.addEventListener("pageshow", onResize);
    window.addEventListener("hashchange", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        measure();
        readScroll();
      });
      sections.forEach((section) => resizeObserver!.observe(section));
    }

    active = -1;
    lastTime = 0;
    frame = requestAnimationFrame(tick);
    return api;
  }

  function stop() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(frame);
    frame = 0;

    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
    window.removeEventListener("pageshow", onResize);
    window.removeEventListener("hashchange", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    resizeObserver?.disconnect();
    resizeObserver = null;
  }

  function setReducedMotion(value: boolean) {
    reduce = Boolean(value);
    if (reduce) smooth = exact;
    dirty = true;
  }

  function goTo(index: number, behavior: ScrollBehavior = "smooth") {
    if (!anchors.length) measure();
    index = clamp(Math.round(index), 0, anchors.length - 1);
    window.scrollTo({
      top: anchors[index],
      behavior: reduce ? "auto" : behavior,
    });
  }

  const api: ScrollConductor = {
    start,
    stop,
    destroy: stop,
    measure,
    read: readScroll,
    getState: state,
    progressAt,
    goTo,
    setReducedMotion,
  };

  return api;
}

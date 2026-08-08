"use client";

import { useEffect, useRef } from "react";
import { createWorldRuntime } from "@/lib/world/create-world-runtime";
import type { ScrollProgressState } from "@/lib/world/types";

interface ScrollWorldCanvasProps {
  progress: ScrollProgressState;
  reducedMotion: boolean;
  enabled: boolean;
}

export function ScrollWorldCanvas({
  progress,
  reducedMotion,
  enabled,
}: ScrollWorldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<ReturnType<typeof createWorldRuntime> | null>(null);

  useEffect(() => {
    runtimeRef.current?.update(progress);
  }, [progress]);

  useEffect(() => {
    if (!enabled || reducedMotion || !canvasRef.current) return;

    const runtime = createWorldRuntime({
      canvas: canvasRef.current,
      reducedMotion,
    });
    runtimeRef.current = runtime;

    const onResize = () => runtime.resize();
    window.addEventListener("resize", onResize, { passive: true });

    const onPointerMove = (event: PointerEvent) => {
      runtime.setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1)
      );
    };

    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      runtime.dispose();
      runtimeRef.current = null;
    };
  }, [enabled, reducedMotion]);

  if (!enabled || reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      id="scroll-world-canvas"
      aria-hidden="true"
      className="fixed inset-0 z-0 block h-full w-full"
    />
  );
}

"use client";

import { worldConfig } from "@/lib/world/world-config";
import { cn } from "@/lib/utils";

interface WorldChapterRailProps {
  activeChapter: number;
  onNavigate: (index: number) => void;
}

export function WorldChapterRail({
  activeChapter,
  onNavigate,
}: WorldChapterRailProps) {
  const chapters = worldConfig.chapters;

  return (
    <aside
      className="fixed right-[var(--world-pad)] top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
      aria-label="Chapter navigation"
    >
      {chapters.map((chapter, index) => (
        <button
          key={chapter.id}
          type="button"
          onClick={() => onNavigate(index)}
          className="group flex items-center justify-end gap-3"
          aria-current={activeChapter === index ? "true" : undefined}
        >
          <span
            className={cn(
              "text-[9px] uppercase tracking-[0.22em] opacity-0 transition-opacity group-hover:opacity-100",
              activeChapter === index
                ? "text-[var(--world-bone)] opacity-100"
                : "text-[var(--world-muted)]"
            )}
          >
            {chapter.label}
          </span>
          <span
            className={cn(
              "h-2 w-2 rounded-full border border-[var(--world-line)] transition-all",
              activeChapter === index &&
                "scale-125 border-[var(--world-brass)] bg-[var(--world-brass)] shadow-[0_0_10px_var(--world-brass)]"
            )}
          />
        </button>
      ))}
    </aside>
  );
}

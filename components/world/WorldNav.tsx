"use client";

import { cn } from "@/lib/utils";
import { worldConfig } from "@/lib/world/world-config";
import { useEffect, useState } from "react";

interface WorldNavProps {
  activeChapter: number;
  onNavigate: (id: string) => void;
}

export function WorldNav({ activeChapter, onNavigate }: WorldNavProps) {
  const chapters = worldConfig.chapters;
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsStuck(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "world-nav fixed inset-x-0 top-0 z-50 flex h-[var(--world-nav-h)] items-center gap-6 px-[var(--world-pad)]",
        isStuck && "world-nav-stuck",
      )}
    >
      <button
        type="button"
        onClick={() => onNavigate("hero")}
        className="flex min-h-[44px] items-center gap-3 text-left"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--world-line)] text-xs tracking-[0.24em]">
          TC
        </span>
        <span className="hidden sm:flex sm:flex-col">
          <b className="text-xs tracking-[0.26em] text-[var(--world-bone)]">
            TIMOTHY CHIN
          </b>
        </span>
      </button>

      <nav
        className="ml-auto hidden items-center gap-8 lg:flex"
        aria-label="Primary"
      >
        {chapters.slice(1).map((chapter, index) => (
          <button
            key={chapter.id}
            type="button"
            onClick={() => onNavigate(chapter.id)}
            className={cn(
              "relative min-h-[44px] text-[11px] uppercase tracking-[0.2em] transition-colors",
              activeChapter === index + 1
                ? "text-[var(--world-bone)]"
                : "text-[var(--world-bone-dim)] hover:text-[var(--world-bone)]",
            )}
          >
            {chapter.label}
            {activeChapter === index + 1 ? (
              <span className="absolute bottom-2 left-0 h-px w-full bg-[var(--world-brass)]" />
            ) : null}
          </button>
        ))}
      </nav>
    </header>
  );
}

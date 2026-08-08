"use client";

import { WorldChapterRail } from "@/components/world/WorldChapterRail";
import { WorldChapterSections } from "@/components/world/WorldChapterSections";
import { WorldNav } from "@/components/world/WorldNav";
import { WorldContentSurface } from "@/components/world/ui/WorldContentSurface";
import { createScrollConductor } from "@/lib/world/scroll-conductor";
import type { ScrollProgressState } from "@/lib/world/types";
import { getChapterIndex, worldConfig } from "@/lib/world/world-config";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ScrollWorldCanvas = dynamic(
  () =>
    import("@/components/world/ScrollWorldCanvas").then(
      (mod) => mod.ScrollWorldCanvas,
    ),
  { ssr: false },
);

const initialProgress: ScrollProgressState = {
  exact: 0,
  smooth: 0,
  index: 0,
  next: 0,
  localExact: 0,
  smoothIndex: 0,
  smoothNext: 0,
  localSmooth: 0,
  direction: 0,
  anchors: [],
};

export function ScrollWorldExperience() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] =
    useState<ScrollProgressState>(initialProgress);
  const [activeChapter, setActiveChapter] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("scroll-world-active");
    root.classList.remove("dark");

    const observer = new MutationObserver(() => {
      if (root.classList.contains("dark")) {
        root.classList.remove("dark");
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      root.classList.remove("scroll-world-active");
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-cam]"),
    );
    if (!sections.length) return;

    const conductor = createScrollConductor({
      sections,
      reducedMotion,
      onUpdate: (state) => setProgress(state),
      onChapterChange: (index) => setActiveChapter(index),
    });

    conductor.start();
    return () => conductor.destroy();
  }, [reducedMotion]);

  const navigateToChapter = (target: string | number) => {
    const index =
      typeof target === "number" ? target : getChapterIndex(String(target));
    if (index < 0) return;
    const section = document.getElementById(worldConfig.chapters[index].id);
    section?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div ref={pageRef} className="scroll-world-root relative min-h-screen">
      <div id="world-vignette" aria-hidden="true" />
      <div id="world-grain" aria-hidden="true" />

      <ScrollWorldCanvas
        progress={progress}
        reducedMotion={reducedMotion}
        enabled={!reducedMotion}
      />

      <div className="world-page relative z-10">
        <WorldNav
          activeChapter={activeChapter}
          onNavigate={(id) => navigateToChapter(id)}
        />
        <WorldChapterRail
          activeChapter={activeChapter}
          onNavigate={(index) => navigateToChapter(index)}
        />
        <WorldChapterSections reducedMotion={reducedMotion} />
      </div>

      <footer className="world-footer relative z-10 px-[var(--world-pad)] pb-6 pt-2">
        <WorldContentSurface className="inline-block px-6 py-4">
          <p className="text-xs tracking-[0.18em] text-[var(--world-muted)]">
            © {new Date().getFullYear()} Timothy Chin
          </p>
        </WorldContentSurface>
      </footer>
    </div>
  );
}

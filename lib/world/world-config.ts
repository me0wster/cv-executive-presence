import { buildExecutivePresenceWorld } from "@/lib/world/scene/build-executive-presence-world";
import { worldChapters } from "@/lib/world/chapters";
import type { QualityProfile, WorldChapter } from "@/lib/world/types";

export const worldQuality = {
  mobile: {
    dpr: 1,
    shadows: 0,
    particles: 0.25,
    post: "lite",
  } satisfies QualityProfile,
  desktop: {
    dpr: 1.125,
    shadows: 0,
    particles: 0.4,
    post: "lite",
  } satisfies QualityProfile,
};

export const worldConfig = {
  label: "Executive Presence",
  footerLabel: "Executive Presence",
  chapters: worldChapters,
  quality: worldQuality,
  buildWorld: buildExecutivePresenceWorld,
} as const;

export function getChapterById(id: string): WorldChapter | undefined {
  return worldChapters.find((chapter) => chapter.id === id);
}

export function getChapterIndex(id: string): number {
  return worldChapters.findIndex((chapter) => chapter.id === id);
}

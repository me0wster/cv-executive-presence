import { buildExecutivePresenceWorld } from "@/lib/world/scene/build-executive-presence-world";
import { worldChapters } from "@/lib/world/chapters";
import type { QualityProfile, WorldChapter } from "@/lib/world/types";

export const worldQuality = {
  mobile: {
    dpr: 1.25,
    shadows: 512,
    particles: 0.3,
    post: "lite",
  } satisfies QualityProfile,
  desktop: {
    dpr: 1.5,
    shadows: 1024,
    particles: 0.55,
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

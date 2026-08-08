import { aboutContent, personInfo } from "@/lib/data/person";
import { sections } from "@/lib/data/sections";
import type { WorldChapter } from "@/lib/world/types";

function sectionTitle(id: string) {
  return sections.find((s) => s.id === id)?.title ?? id;
}

export const worldChapters: WorldChapter[] = [
  {
    id: "hero",
    label: sectionTitle("hero"),
    scrollWeight: 1,
    copy: {
      eyebrow: "Executive Presence",
      title: `${personInfo.firstName} ${personInfo.lastName}`,
      body: personInfo.tagline,
    },
    camera: {
      position: [0, 3.2, 11],
      target: [0, 2.8, -6],
      fov: 40,
      mobile: {
        position: [0, 3.8, 13.5],
        target: [0, 2.9, -6],
        fov: 46,
      },
    },
    world: {
      fog: 0.006,
      key: 1.1,
      practicals: 0.2,
      particles: 0.12,
      grade: "warm",
    },
  },
  {
    id: "about",
    label: sectionTitle("about"),
    scrollWeight: 0.85,
    copy: {
      eyebrow: "Who I Am",
      title: aboutContent.headline,
      body: aboutContent.subheadline,
    },
    camera: {
      position: [-4.2, 2.4, 7.5],
      target: [0.8, 2.2, -4],
      fov: 42,
      mobile: {
        position: [-3.5, 2.9, 9.5],
        target: [0.8, 2.3, -4],
        fov: 48,
      },
    },
    world: {
      fog: 0.007,
      key: 1.05,
      practicals: 0.25,
      particles: 0.14,
      grade: "warm",
    },
  },
  {
    id: "experience",
    label: sectionTitle("experience"),
    scrollWeight: 1,
    copy: {
      eyebrow: "Career Journey",
      title: "Experience",
      body: "Leading DevOps and platform engineering across enterprise and product teams.",
    },
    camera: {
      position: [2.8, 2.6, 5],
      target: [-1.5, 2.8, -8],
      fov: 41,
      mobile: {
        position: [2.2, 3.1, 7],
        target: [-1.5, 2.9, -8],
        fov: 47,
      },
    },
    world: {
      fog: 0.008,
      key: 1,
      practicals: 0.3,
      particles: 0.16,
      grade: "neutral",
    },
  },
  {
    id: "skills",
    label: sectionTitle("skills"),
    scrollWeight: 0.9,
    copy: {
      eyebrow: "Expertise",
      title: "Skills",
      body: "Platform engineering, cloud architecture, and generative AI at scale.",
    },
    camera: {
      position: [4.5, 2.8, 2],
      target: [-2, 2.5, -7],
      fov: 40,
      mobile: {
        position: [3.6, 3.2, 3.5],
        target: [-2, 2.6, -7],
        fov: 46,
      },
    },
    world: {
      fog: 0.007,
      key: 0.98,
      practicals: 0.35,
      particles: 0.15,
      grade: "warm",
    },
  },
  {
    id: "projects",
    label: sectionTitle("projects"),
    scrollWeight: 0.9,
    copy: {
      eyebrow: "Selected Work",
      title: "Projects",
      body: "Developer portals, AI assistants, and platforms that reduce friction.",
    },
    camera: {
      position: [0.5, 3.4, -1],
      target: [0, 2.6, -11],
      fov: 38,
      mobile: {
        position: [0.4, 3.8, 0.8],
        target: [0, 2.7, -11],
        fov: 44,
      },
    },
    world: {
      fog: 0.006,
      key: 1.02,
      practicals: 0.28,
      particles: 0.12,
      grade: "neutral",
    },
  },
  {
    id: "contact",
    label: sectionTitle("contact"),
    scrollWeight: 0.8,
    copy: {
      eyebrow: "Get in Touch",
      title: "Contact",
      body: "Interested in collaborating, consulting, or just want to connect? I'd love to hear from you.",
    },
    camera: {
      position: [0, 4.5, -7],
      target: [0, 2, -16],
      fov: 42,
      mobile: {
        position: [0, 5, -6],
        target: [0, 2.1, -16],
        fov: 48,
      },
    },
    world: {
      fog: 0.005,
      key: 1,
      practicals: 0.22,
      particles: 0.1,
      grade: "warm",
    },
  },
];

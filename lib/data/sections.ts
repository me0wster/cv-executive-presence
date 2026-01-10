import type { Section } from "@/lib/types";

/**
 * Section configuration for the CV
 * Controls visibility and ordering of content sections
 */
export const sections: Section[] = [
  {
    id: "hero",
    title: "Timothy Chin",
    isVisible: true,
    order: 0,
  },
  {
    id: "about",
    title: "About",
    subtitle: "Who I Am",
    tagline: "Per aspera ad astra",
    isVisible: true,
    order: 1,
  },
  {
    id: "experience",
    title: "Experience",
    subtitle: "Career Journey",
    isVisible: true,
    order: 2,
  },
  {
    id: "skills",
    title: "Skills",
    subtitle: "Expertise",
    isVisible: true,
    order: 3,
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Selected Work",
    isVisible: true,
    order: 4,
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "Get in Touch",
    isVisible: true,
    order: 5,
  },
];

/**
 * Get a section by its ID
 */
export function getSectionById(id: string): Section | undefined {
  return sections.find((section) => section.id === id);
}

/**
 * Get all visible sections in order
 */
export function getVisibleSections(): Section[] {
  return sections
    .filter((section) => section.isVisible)
    .sort((a, b) => a.order - b.order);
}

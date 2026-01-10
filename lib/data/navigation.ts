import type { NavigationItem } from "@/lib/types";

/**
 * Navigation items for the main menu
 * Order determines display sequence
 */
export const navigationItems: NavigationItem[] = [
  {
    id: "about",
    label: "About",
    href: "#about",
    order: 1,
  },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
    order: 2,
  },
  {
    id: "skills",
    label: "Skills",
    href: "#skills",
    order: 3,
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    order: 4,
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    isPrimary: true,
    order: 5,
  },
];

/**
 * Section IDs for IntersectionObserver tracking
 * Must match the id attributes of section elements
 */
export const sectionIds = navigationItems.map((item) => item.id);

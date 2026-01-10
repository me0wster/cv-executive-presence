"use client";

import { useCallback } from "react";

/**
 * Hook for smooth scrolling to sections
 * Uses native scroll-behavior: smooth from CSS
 */
export function useScrollTo() {
  const scrollTo = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Get the element's position
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - 80; // 80px offset for fixed nav

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);

  return scrollTo;
}

"use client";

import { useEffect, useRef, useState } from "react";

import type { EntranceAnimationProps } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Entrance Animation - Triggers animation when element enters viewport
 * Uses IntersectionObserver for performance
 * Respects prefers-reduced-motion
 */
export function EntranceAnimation({
  children,
  delay = 0,
  duration = 500,
  direction = "up",
  disabled = false,
  className,
}: EntranceAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Intersection Observer for triggering animation
  useEffect(() => {
    if (disabled || prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [disabled, prefersReducedMotion]);

  const animationClass = {
    up: "animate-fade-in-up",
    down: "animate-fade-in-down",
    left: "animate-fade-in-left",
    right: "animate-fade-in-right",
  }[direction];

  const delayClass =
    {
      0: "",
      100: "animation-delay-100",
      200: "animation-delay-200",
      300: "animation-delay-300",
      400: "animation-delay-400",
      500: "animation-delay-500",
    }[delay] || "";

  if (disabled || prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && animationClass,
        isVisible && delayClass,
        className
      )}
      style={{
        animationDuration: `${duration}ms`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
}

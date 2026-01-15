"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { personInfo } from "@/lib/data/person";
import { useScrollTo } from "@/lib/hooks/use-scroll-to";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const scrollTo = useScrollTo();
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSkillIndex(
          (prev) => (prev + 1) % personInfo.animatedSkills.length
        );
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="flex items-center justify-between mb-12">
          <p className="text-sm text-muted-foreground tracking-wide">
            {personInfo.location}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-foreground">
                <span>{personInfo.firstName.toUpperCase()}</span>
                {personInfo.monogram && (
                  <span className="inline-flex items-center justify-center mx-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-2 border-foreground/20 rounded-sm">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-muted-foreground">
                      {personInfo.monogram}
                    </span>
                  </span>
                )}
                <span>{personInfo.lastName.toUpperCase()}</span>
              </h1>
            </div>

            <div className="w-full h-px bg-border mb-8" />

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl italic text-foreground mb-6">
              {personInfo.title}
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              {personInfo.tagline}
            </p>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Specializing in{" "}
              <span
                className={cn(
                  "font-medium transition-opacity duration-300",
                  isAnimating ? "opacity-0" : "opacity-100"
                )}
                style={{ color: "var(--color-accent-cta)" }}
              >
                {personInfo.animatedSkills[currentSkillIndex]}
              </span>
            </p>

            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary inline-flex items-center gap-2 group"
            >
              Get in Touch
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px] bg-muted overflow-hidden">
                {personInfo.photo ? (
                  <Image
                    src={personInfo.photo.src}
                    alt={personInfo.photo.alt}
                    fill
                    className="object-cover transition-all duration-500"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="font-serif text-6xl text-muted-foreground">
                      {personInfo.monogram}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/20 -z-10" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollTo("about")}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll to about section"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

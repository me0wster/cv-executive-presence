"use client";

import { DropCap } from "@/components/ui/drop-cap";
import { EditorialChip } from "@/components/world/ui/EditorialChip";
import { WorldContentSurface } from "@/components/world/ui/WorldContentSurface";
import { experienceEntries } from "@/lib/data/experience";
import { aboutContent, personInfo } from "@/lib/data/person";
import { getFeaturedProjects } from "@/lib/data/projects";
import { skillCategories } from "@/lib/data/skills";
import { cn } from "@/lib/utils";
import type { WorldChapter } from "@/lib/world/types";
import { worldConfig } from "@/lib/world/world-config";
import Image from "next/image";
import { useEffect, useState } from "react";

interface WorldChapterSectionsProps {
  reducedMotion: boolean;
}

function chapterMeta(chapters: WorldChapter[], id: string) {
  return chapters.find((chapter) => chapter.id === id)!;
}

export function WorldChapterSections({
  reducedMotion,
}: WorldChapterSectionsProps) {
  const chapters = worldConfig.chapters;
  const hero = chapterMeta(chapters, "hero");
  const about = chapterMeta(chapters, "about");
  const experience = chapterMeta(chapters, "experience");
  const skills = chapterMeta(chapters, "skills");
  const projects = chapterMeta(chapters, "projects");
  const contact = chapterMeta(chapters, "contact");
  const featuredProjects = getFeaturedProjects();

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSkillIndex(
          (prev) => (prev + 1) % personInfo.animatedSkills.length,
        );
        setIsAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const contactLinks = [
    {
      label: "Email",
      href: `mailto:${personInfo.email}`,
      value: personInfo.email,
    },
    {
      label: "LinkedIn",
      href: personInfo.linkedIn!,
      value: "Connect on LinkedIn",
    },
    { label: "GitHub", href: personInfo.github!, value: "View on GitHub" },
  ].filter((link) => link.href);

  const proficiencyStyles = {
    expert:
      "bg-accent-cta/10 text-accent-cta border border-accent-cta font-semibold shadow-sm ring-1 ring-accent-cta/10",
    proficient:
      "bg-muted/80 text-foreground border border-foreground/30 font-medium",
    familiar:
      "bg-transparent text-muted-foreground border border-border/50 font-normal",
  };

  return (
    <>
      <section
        id="hero"
        data-cam
        style={{ minHeight: `${hero.scrollWeight * 100}vh` }}
        className="world-sec relative flex flex-col justify-start overflow-hidden px-[var(--world-pad)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/5 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl pt-[calc(var(--world-nav-h)+2rem)]">
          <p className="mb-12 text-sm tracking-wide text-muted-foreground">
            {personInfo.location}
          </p>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <WorldContentSurface className="order-2 p-8 sm:p-10 lg:order-1">
              <h1 className="mb-8 font-serif text-5xl font-normal tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
                <span>{personInfo.firstName.toUpperCase()}</span>
                {personInfo.monogram ? (
                  <span className="mx-4 inline-flex h-16 w-16 items-center justify-center rounded-sm border-2 border-foreground/20 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                    <span className="font-serif text-2xl italic text-muted-foreground sm:text-3xl lg:text-4xl">
                      {personInfo.monogram}
                    </span>
                  </span>
                ) : null}
                <span>{personInfo.lastName.toUpperCase()}</span>
              </h1>

              <div className="mb-8 h-px w-full bg-border" />

              <h2 className="mb-6 font-serif text-3xl italic text-foreground sm:text-4xl lg:text-5xl">
                {personInfo.title}
              </h2>

              <p className="mb-4 text-lg text-muted-foreground sm:text-xl">
                {hero.copy.body}
              </p>

              <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
                Specializing in{" "}
                <span
                  className={cn(
                    "font-medium transition-opacity duration-300",
                    isAnimating ? "opacity-0" : "opacity-100",
                  )}
                  style={{ color: "var(--color-accent-cta)" }}
                >
                  {personInfo.animatedSkills[currentSkillIndex]}
                </span>
              </p>

              <a
                href="#contact"
                className="btn-primary inline-flex items-center gap-2 group"
              >
                Get in Touch
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
              </a>
            </WorldContentSurface>

            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="relative">
                <div className="relative h-80 w-64 overflow-hidden bg-muted sm:h-96 sm:w-80 lg:h-[480px] lg:w-96">
                  {personInfo.photo ? (
                    <>
                      <Image
                        src={personInfo.photo.src}
                        alt={personInfo.photo.alt}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div
                        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-40"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, black 15%, transparent 35%)",
                          backgroundSize: "4px 4px",
                        }}
                      />
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <span className="font-serif text-6xl text-muted-foreground">
                        {personInfo.monogram}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full border border-primary/20" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-7xl pb-8 sm:mt-14">
          <div className="mb-4 flex items-center justify-end gap-3">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--world-muted)]">
              Scroll to explore
            </span>
            <span className="world-scroll-cue" aria-hidden="true" />
          </div>
          <div className="world-chapters-grid border-t border-[var(--world-line-soft)] pt-5">
            {chapters.slice(1).map((chapter, index) => (
              <EditorialChip
                key={chapter.id}
                num={String(index + 1).padStart(2, "0")}
                label={chapter.label}
                title={chapter.copy.title}
                href={`#${chapter.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        data-cam
        className="world-sec section-container relative z-10"
      >
        <WorldContentSurface className="p-6 sm:p-8">
          <div className="mb-8">
            <p className="section-subheading">{about.copy.eyebrow}</p>
            <h2 className="section-heading">{about.copy.title}</h2>
            {aboutContent.tagline ? (
              <p className="mt-4 font-serif text-lg italic text-muted-foreground">
                {aboutContent.tagline}
              </p>
            ) : null}
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground/80">
                {aboutContent.subheadline}
              </p>
              <DropCap className="leading-relaxed text-foreground">
                {aboutContent.paragraphs[0]}
              </DropCap>
            </div>
            <div className="space-y-6">
              {aboutContent.paragraphs.slice(1).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="leading-relaxed text-foreground/90"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </WorldContentSurface>
      </section>

      <section
        id="experience"
        data-cam
        className="world-sec section-container relative z-10"
      >
        <WorldContentSurface className="p-6 sm:p-8">
          <div className="mb-8">
            <p className="section-subheading">{experience.copy.eyebrow}</p>
            <h2 className="section-heading">{experience.copy.title}</h2>
          </div>

          <div className="space-y-8">
            {experienceEntries.map((entry) => (
              <article
                key={`${entry.company}-${entry.startDate}`}
                className="relative border-l-2 border-border pl-8 transition-colors duration-300 hover:border-accent-cta"
              >
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-accent-cta bg-[var(--world-ink)]" />

                <div className="mb-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="font-serif text-2xl text-foreground">
                      {entry.title}
                    </h3>
                    <span className="whitespace-nowrap text-sm text-muted-foreground">
                      {entry.startDate} - {entry.endDate || "Present"}
                    </span>
                  </div>
                  <p className="mt-1 text-lg font-medium text-accent-cta">
                    {entry.company}
                  </p>
                  {entry.location ? (
                    <p className="text-sm text-muted-foreground">
                      {entry.location}
                    </p>
                  ) : null}
                </div>

                <p className="mb-4 text-foreground/85">{entry.description}</p>

                <ul className="mb-4 space-y-2">
                  {entry.accomplishments.map((accomplishment) => (
                    <li
                      key={accomplishment.slice(0, 32)}
                      className="flex items-start gap-2 text-foreground/90"
                    >
                      <span className="mt-1.5 text-accent-cta">•</span>
                      <span>{accomplishment}</span>
                    </li>
                  ))}
                </ul>

                {entry.technologies && entry.technologies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {entry.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </WorldContentSurface>
      </section>

      <section
        id="skills"
        data-cam
        className="world-sec section-container relative z-10"
      >
        <WorldContentSurface className="p-6 sm:p-8">
          <div className="mb-8">
            <p className="section-subheading">{skills.copy.eyebrow}</p>
            <h2 className="section-heading">{skills.copy.title}</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <div key={category.id} className="space-y-4">
                  <h3 className="border-b border-border pb-2 font-serif text-xl text-foreground">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-sm transition-all duration-200 hover:scale-105",
                          proficiencyStyles[skill.proficiency || "familiar"],
                        )}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </WorldContentSurface>
      </section>

      <section
        id="projects"
        data-cam
        className="world-sec section-container relative z-10"
      >
        <WorldContentSurface className="p-6 sm:p-8">
          <div className="mb-8">
            <p className="section-subheading">{projects.copy.eyebrow}</p>
            <h2 className="section-heading">{projects.copy.title}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative flex h-full flex-col rounded-xl border border-border/30 bg-background/55 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-cta/35 hover:bg-background/70 hover:shadow-md"
              >
                <h3 className="mb-4 font-serif text-xl text-foreground transition-colors group-hover:[color:var(--color-accent-cta)]">
                  {project.title}
                </h3>
                <p className="mb-4 grow text-muted-foreground">
                  {project.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-4 border-t border-border/50 pt-4">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:[color:var(--color-accent-cta)]"
                    >
                      Live
                    </a>
                  ) : null}
                  {project.sourceUrl ? (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:[color:var(--color-accent-cta)]"
                    >
                      Source
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </WorldContentSurface>
      </section>

      <section
        id="contact"
        data-cam
        className="world-sec section-container relative z-10 pb-6 sm:pb-8"
      >
        <WorldContentSurface className="p-6 sm:p-8">
          <div className="mb-8 text-center">
            <p className="section-subheading">{contact.copy.eyebrow}</p>
            <h2 className="section-heading">{contact.copy.title}</h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-center text-xl leading-relaxed text-foreground/80 sm:text-2xl">
              {contact.copy.body}
            </p>

            <div className="grid items-stretch gap-6 sm:grid-cols-3 sm:gap-8">
              {contactLinks.map((link) => {
                const href = link.href!;
                return (
                  <a
                    key={link.label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="group flex h-full flex-col items-center justify-center rounded-xl border border-border/30 bg-background/55 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent-cta)]/35 hover:bg-background/70 hover:shadow-md"
                  >
                    <span className="mb-4 font-serif text-lg text-foreground">
                      {link.label}
                    </span>
                    <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                      {link.value}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </WorldContentSurface>
      </section>
    </>
  );
}

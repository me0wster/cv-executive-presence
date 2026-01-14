"use client";

import { getFeaturedProjects } from "@/lib/data/projects";
import { SectionContainer } from "@/components/ui/section-container";
import { EntranceAnimation } from "@/components/ui/entrance-animation";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const projects = getFeaturedProjects();

  return (
    <SectionContainer
      id="projects"
      title="Projects"
      subtitle="Selected Work"
      tagline="A selection of projects I've worked on"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <EntranceAnimation
            key={project.title}
            delay={
              (Math.min(index, 5) * 100) as 0 | 100 | 200 | 300 | 400 | 500
            }
          >
            <article
              className={cn(
                "group relative flex flex-col h-full",
                "p-6 rounded-lg border border-border/50",
                "bg-background hover:bg-muted/30",
                "hover:border-accent-cta/50 hover:shadow-md",
                "transition-all duration-300"
              )}
            >
              <div className="mb-4">
                <h3 className="font-serif text-xl text-foreground transition-colors group-hover:[color:var(--color-accent-cta)]">
                  {project.title}
                </h3>
              </div>

              <p className="text-muted-foreground mb-4 grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-1 text-xs font-medium text-muted-foreground">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex gap-4 mt-auto pt-4 border-t border-border/50">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:[color:var(--color-accent-cta)]"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:[color:var(--color-accent-cta)]"
                  >
                    {project.sourceType === "gitlab" ? (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    Source
                  </a>
                )}
                {!project.url && !project.sourceUrl && (
                  <span className="text-sm text-muted-foreground/50 italic">
                    Company project
                  </span>
                )}
              </div>
            </article>
          </EntranceAnimation>
        ))}
      </div>
    </SectionContainer>
  );
}

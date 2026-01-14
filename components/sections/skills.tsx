"use client";

import { skillCategories } from "@/lib/data/skills";
import { SectionContainer } from "@/components/ui/section-container";
import { EntranceAnimation } from "@/components/ui/entrance-animation";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const proficiencyStyles = {
    expert:
      "bg-accent-cta/10 dark:bg-accent-cta/15 text-accent-cta dark:text-accent-cta border-accent-cta/40 dark:border-accent-cta/60 font-semibold shadow-sm ring-1 ring-accent-cta/10 dark:ring-accent-cta/20",
    proficient:
      "bg-muted/80 dark:bg-muted text-foreground border-border/60 dark:border-border font-medium",
    familiar:
      "bg-transparent text-muted-foreground/90 dark:text-muted-foreground border border-border/50 dark:border-border/70 font-normal",
  };

  return (
    <SectionContainer
      id="skills"
      title="Skills"
      subtitle="Expertise"
      tagline="Technologies and methodologies I work with"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories
          .sort((a, b) => a.order - b.order)
          .map((category, index) => (
            <EntranceAnimation
              key={category.id}
              delay={
                (Math.min(index, 5) * 100) as 0 | 100 | 200 | 300 | 400 | 500
              }
            >
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-foreground border-b border-border pb-2">
                  {category.name}
                </h3>

                {category.id === "certifications" ? (
                  <ul className="space-y-3">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-start gap-3 text-sm"
                      >
                        <svg
                          className="w-5 h-5 mt-0.5 text-(--color-accent-cta) shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        <span className="text-foreground">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105",
                          proficiencyStyles[skill.proficiency || "familiar"]
                        )}
                        title={`${skill.proficiency || "familiar"}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </EntranceAnimation>
          ))}
      </div>

      <EntranceAnimation delay={500}>
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Proficiency levels:
          </p>
          <div className="flex flex-wrap gap-6">
            <span className="flex items-center gap-2 text-sm text-accent-cta font-semibold">
              <span className="w-4 h-4 rounded-full bg-accent-cta/10 dark:bg-accent-cta/15 border border-accent-cta/40 dark:border-accent-cta/60 ring-1 ring-accent-cta/10 dark:ring-accent-cta/20" />
              Expert
            </span>
            <span className="flex items-center gap-2 text-sm text-foreground">
              <span className="w-4 h-4 rounded-full bg-muted/80 dark:bg-muted border border-border/60 dark:border-border" />
              Proficient
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-4 h-4 rounded-full bg-transparent border border-border/50 dark:border-border/70" />
              Familiar
            </span>
          </div>
        </div>
      </EntranceAnimation>
    </SectionContainer>
  );
}

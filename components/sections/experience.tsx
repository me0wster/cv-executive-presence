"use client";

import { experienceEntries } from "@/lib/data/experience";
import { SectionContainer } from "@/components/ui/section-container";
import { EntranceAnimation } from "@/components/ui/entrance-animation";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <SectionContainer
      id="experience"
      title="Experience"
      subtitle="Career Journey"
    >
      <div className="space-y-12">
        {experienceEntries.map((entry, index) => (
          <EntranceAnimation
            key={`${entry.company}-${entry.startDate}`}
            delay={
              (Math.min(index, 4) * 100) as 0 | 100 | 200 | 300 | 400 | 500
            }
          >
            <article
              className={cn(
                "relative pl-8 border-l-2 border-border",
                "hover:border-primary transition-colors duration-300"
              )}
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />

              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <h3 className="font-serif text-2xl text-foreground">
                    {entry.title}
                  </h3>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {entry.startDate} - {entry.endDate || "Present"}
                  </span>
                </div>
                <p className="text-lg text-primary font-medium mt-1">
                  {entry.company}
                </p>
                {entry.location && (
                  <p className="text-sm text-muted-foreground">
                    {entry.location}
                  </p>
                )}
              </div>

              <p className="text-muted-foreground mb-4">{entry.description}</p>

              <ul className="space-y-2 mb-4">
                {entry.accomplishments.map((accomplishment, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-foreground/80"
                  >
                    <span className="text-primary mt-1.5">•</span>
                    <span>{accomplishment}</span>
                  </li>
                ))}
              </ul>

              {entry.technologies && entry.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </EntranceAnimation>
        ))}
      </div>
    </SectionContainer>
  );
}

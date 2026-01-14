"use client";

import { aboutContent } from "@/lib/data/person";
import { SectionContainer } from "@/components/ui/section-container";
import { EntranceAnimation } from "@/components/ui/entrance-animation";
import { DropCap } from "@/components/ui/drop-cap";

export function AboutSection() {
  return (
    <SectionContainer
      id="about"
      title={aboutContent.headline}
      subtitle="Who I Am"
      tagline={aboutContent.tagline}
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-6">
          <EntranceAnimation>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {aboutContent.subheadline}
            </p>
          </EntranceAnimation>

          <EntranceAnimation delay={100}>
            <DropCap className="text-foreground/90 leading-relaxed">
              {aboutContent.paragraphs[0]}
            </DropCap>
          </EntranceAnimation>
        </div>

        <div className="space-y-6">
          {aboutContent.paragraphs.slice(1).map((paragraph, index) => (
            <EntranceAnimation
              key={index}
              delay={((index + 2) * 100) as 0 | 100 | 200 | 300 | 400 | 500}
            >
              <p className="text-foreground/90 leading-relaxed">{paragraph}</p>
            </EntranceAnimation>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

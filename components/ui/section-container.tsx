import type { SectionContainerProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SectionContainer({
  id,
  title,
  subtitle,
  tagline,
  children,
  className,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("section-container", className)}>
      <div className="mb-12">
        {subtitle && <p className="section-subheading">{subtitle}</p>}
        <h2 className="section-heading">{title}</h2>
        {tagline && (
          <p className="font-serif italic text-muted-foreground text-lg mt-4">
            {tagline}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

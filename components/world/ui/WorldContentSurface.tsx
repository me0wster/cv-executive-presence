import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WorldContentSurfaceProps {
  children: ReactNode;
  className?: string;
}

export function WorldContentSurface({
  children,
  className,
}: WorldContentSurfaceProps) {
  return (
    <div className={cn("world-content-surface", className)}>{children}</div>
  );
}

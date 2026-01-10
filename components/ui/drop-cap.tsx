import { cn } from "@/lib/utils";

interface DropCapProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Drop Cap - Decorative first letter styling
 * Used for paragraph starts in About and other prose sections
 */
export function DropCap({ children, className }: DropCapProps) {
  return <p className={cn("drop-cap", className)}>{children}</p>;
}

import { cn } from "@/lib/utils";

interface DropCapProps {
  children: React.ReactNode;
  className?: string;
}

export function DropCap({ children, className }: DropCapProps) {
  return <p className={cn("drop-cap", className)}>{children}</p>;
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PillProps {
  children: ReactNode;
  tone?: "accent" | "amber" | "muted";
  locked?: boolean;
  className?: string;
}

/** Small rounded chip used for streak count, XP, and badges. */
export function Pill({ children, tone = "accent", locked = false, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        locked && "bg-muted text-muted-foreground opacity-70",
        !locked && tone === "accent" && "bg-accent-soft text-accent-foreground",
        !locked && tone === "amber" && "bg-amber-soft text-amber",
        !locked && tone === "muted" && "bg-muted text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

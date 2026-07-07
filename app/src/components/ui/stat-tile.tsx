import { cn } from "@/lib/utils";

interface StatTileProps {
  label: string;
  value: string;
  warn?: boolean;
  className?: string;
}

/** Compact labeled figure (fees, XP, percentages) with tabular numerals so digits don't jitter. */
export function StatTile({ label, value, warn = false, className }: StatTileProps) {
  return (
    <div className={cn("flex-1 min-w-24 rounded-md px-3 py-2.5", warn ? "bg-amber-soft" : "bg-accent-soft", className)}>
      <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={cn("mt-0.5 text-lg font-bold tracking-tight tabular-figures", warn ? "text-amber" : "text-foreground")}>{value}</div>
    </div>
  );
}

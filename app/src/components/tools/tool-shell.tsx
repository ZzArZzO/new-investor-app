import type { ReactNode } from "react";

interface ToolShellProps {
  icon: string;
  title: string;
  subtitle: string;
  note: string;
  children: ReactNode;
}

/** Shared card chrome for the 5 interactive tools: heading, subtitle, content, illustrative-only note. */
export function ToolShell({ icon, title, subtitle, note, children }: ToolShellProps) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-[15px] font-extrabold">
        <span aria-hidden="true">{icon}</span>
        {title}
      </div>
      <p className="mt-0.5 mb-3 text-[12.5px] text-muted-foreground">{subtitle}</p>
      {children}
      <p className="mt-3 text-[11.5px] leading-relaxed text-muted-foreground italic">{note}</p>
    </div>
  );
}

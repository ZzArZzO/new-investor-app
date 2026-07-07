"use client";

import { useState } from "react";
import { TOOLS } from "@/content/tools";
import { TOOL_COMPONENTS } from "@/components/tools/tool-registry";
import { cn } from "@/lib/utils";

export default function ToolsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const ActiveComponent = activeId ? TOOL_COMPONENTS[activeId as keyof typeof TOOL_COMPONENTS] : null;
  const activeTool = TOOLS.find((t) => t.id === activeId);

  return (
    <div className="pt-1">
      <h2 className="font-heading text-xl font-medium">Interactive tools</h2>
      <p className="mt-1.5 mb-4 text-[15px] text-muted-foreground">
        Play with the ideas from the lessons. Every number here is illustrative — a way to build intuition, never a recommendation.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            type="button"
            onClick={() => setActiveId(tool.id)}
            className={cn(
              "flex min-h-30 flex-col gap-1.5 rounded-2xl border bg-card p-4 text-left shadow-sm transition-colors",
              activeId === tool.id ? "border-primary" : "border-border hover:border-primary",
            )}
          >
            <span className="text-2xl" aria-hidden="true">
              {tool.ico}
            </span>
            <span className="text-[15px] font-extrabold tracking-tight">{tool.name}</span>
            <span className="text-[12.5px] leading-snug text-muted-foreground">{tool.desc}</span>
            {tool.crypto && <span className="text-[12.5px] font-semibold text-amber">⚠️ crypto · high-risk</span>}
          </button>
        ))}
      </div>

      {ActiveComponent && activeTool && (
        <div className="mt-4">
          {activeTool.crypto && (
            <div className="mb-3 rounded-lg bg-amber-soft px-3.5 py-3 text-[14px] font-semibold">
              ⚠️ Crypto is high-risk and can go to zero. Illustrative only — no coin names, no predictions.
            </div>
          )}
          <ActiveComponent />
        </div>
      )}

      <p className="mt-6 px-1 pb-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Educational information, not personal financial advice. Investing involves risk, including loss of the money you
        invest. Crypto is high-risk and can go to zero.
      </p>
    </div>
  );
}

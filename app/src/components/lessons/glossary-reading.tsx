"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { GLOSSARY } from "@/content/glossary";

function linkifyGlossary(html: string): string {
  let result = html;
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  for (const term of terms) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?![^<]*>)\\b(${escaped})\\b`, "i");
    if (re.test(result)) {
      result = result.replace(
        re,
        `<button type="button" class="border-b border-dashed border-primary font-semibold text-primary" data-term="${term}">$1</button>`,
      );
    }
  }
  return result;
}

interface GlossaryReadingProps {
  html: string;
}

/** Renders lesson reading HTML with glossary terms as tap-to-define buttons. */
export function GlossaryReading({ html }: GlossaryReadingProps) {
  const linked = useMemo(() => linkifyGlossary(html), [html]);
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLElement).closest("[data-term]");
    const term = target?.getAttribute("data-term");
    if (!term) return;
    setOpenTerm((prev) => (prev === term ? null : term));
  }

  return (
    <div className="my-3.5">
      <div className="space-y-3 text-[15px] leading-relaxed [&_b]:font-bold" onClick={handleClick} dangerouslySetInnerHTML={{ __html: linked }} />
      {openTerm && GLOSSARY[openTerm] && (
        <div className="mt-2 rounded-lg bg-accent-soft px-3.5 py-2.5 text-[13.5px] text-accent-foreground">
          <b>{openTerm}:</b> {GLOSSARY[openTerm]}
        </div>
      )}
    </div>
  );
}

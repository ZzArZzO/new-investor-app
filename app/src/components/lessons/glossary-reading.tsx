"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { GLOSSARY } from "@/content/glossary";
import { LESSONS } from "@/content/lessons";

const LESSON_IDS = new Set(LESSONS.map((l) => l.id));

/** Cross-references like "Lesson 12" become taps that open that lesson. */
function linkifyLessonRefs(html: string): string {
  return html.replace(/(?![^<]*>)\bLesson (\d+)\b/g, (match, n: string) => {
    if (!LESSON_IDS.has(`l${n}`)) return match;
    return `<button type="button" class="font-semibold text-primary underline decoration-dashed underline-offset-2" data-lesson="l${n}">${match}</button>`;
  });
}

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
  const router = useRouter();
  const linked = useMemo(() => linkifyLessonRefs(linkifyGlossary(html)), [html]);
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const el = e.target as HTMLElement;
    const lessonId = el.closest("[data-lesson]")?.getAttribute("data-lesson");
    if (lessonId) {
      router.push(`/lessons/${lessonId}`);
      return;
    }
    const term = el.closest("[data-term]")?.getAttribute("data-term");
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

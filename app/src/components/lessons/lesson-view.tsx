"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Lesson } from "@/content/types";
import { LESSON_TOOLS } from "@/content/tools";
import { TOOL_COMPONENTS } from "@/components/tools/tool-registry";
import { GlossaryReading } from "@/components/lessons/glossary-reading";
import { LessonQuickCheck } from "@/components/lessons/lesson-quick-check";
import { Button } from "@/components/ui/button";
import { useAppStateContext } from "@/hooks/app-state-context";
import { useState } from "react";

interface LessonViewProps {
  lesson: Lesson;
}

export function LessonView({ lesson }: LessonViewProps) {
  const router = useRouter();
  const { completeLesson } = useAppStateContext();
  const [readyToComplete, setReadyToComplete] = useState(false);

  const toolId = LESSON_TOOLS[lesson.id];
  const ToolComponent = toolId ? TOOL_COMPONENTS[toolId] : null;

  function finish() {
    completeLesson(lesson.id);
    router.push("/lessons");
  }

  return (
    <div className="pt-1">
      <Link href="/lessons" className="mb-1 inline-flex items-center gap-1 py-2 text-sm font-semibold text-muted-foreground">
        <ChevronLeft className="size-4" aria-hidden="true" />
        All lessons
      </Link>
      <div className="text-xs font-bold uppercase tracking-wide text-primary">{lesson.pillar}</div>
      <h2 className="mt-1 font-heading text-xl font-medium">{lesson.title}</h2>

      <div className="my-3.5 rounded-lg bg-accent-soft px-3.5 py-3 text-[15px]">
        <b>The idea:</b> {lesson.core}
      </div>

      {lesson.crypto && (
        <div className="my-3.5 rounded-lg bg-amber-soft px-3.5 py-3 text-[14px] font-semibold">
          ⚠️ Crypto is high-risk. You can lose everything. Only ever use MiCA-licensed platforms, and never invest more than you can
          afford to lose.
        </div>
      )}

      <GlossaryReading html={lesson.reading} />

      <div className="my-3.5 rounded-lg bg-accent-soft px-3.5 py-3 text-[15px]">
        <b>In real life:</b> {lesson.example}
      </div>

      {ToolComponent && (
        <div className="my-4">
          <ToolComponent />
        </div>
      )}

      <LessonQuickCheck key={lesson.id} checks={lesson.check} onAllAnswered={() => setReadyToComplete(true)} />

      {readyToComplete && (
        <Button onClick={finish} className="mt-5 h-11 w-full rounded-xl">
          Complete lesson ✓
        </Button>
      )}

      <p className="mt-6 px-1 pb-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Educational information, not personal financial advice. Investing involves risk, including loss of the money you
        invest. Crypto is high-risk and can go to zero.
      </p>
    </div>
  );
}

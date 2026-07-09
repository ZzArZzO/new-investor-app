"use client";

import { useState } from "react";
import type { LessonCheck } from "@/content/types";
import { cn } from "@/lib/utils";

interface LessonQuickCheckProps {
  checks: LessonCheck[];
  onAllAnswered: (allCorrect: boolean, missedIndices: number[]) => void;
}

/** Render with `key={lesson.id}` from the parent so state resets on lesson change instead of via an effect. */
export function LessonQuickCheck({ checks, onAllAnswered }: LessonQuickCheckProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => checks.map(() => null));

  function pick(qi: number, oi: number) {
    if (answers[qi] !== null) return;
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
    if (next.every((a) => a !== null)) {
      const missed = checks.map((c, i) => (next[i] === c.a ? -1 : i)).filter((i) => i >= 0);
      onAllAnswered(missed.length === 0, missed);
    }
  }

  return (
    <div className="mt-5">
      <div className="text-xs font-bold uppercase tracking-wide text-primary">Quick check</div>
      <div className="mt-2.5 flex flex-col gap-5">
        {checks.map((c, qi) => {
          const picked = answers[qi];
          const answered = picked !== null;
          return (
            <div key={qi}>
              <div className="mb-1 text-[13px] font-bold text-muted-foreground">Question {qi + 1}</div>
              <div className="mb-2.5 font-bold">{c.q}</div>
              <div className="flex flex-col gap-2">
                {c.o.map((text, oi) => {
                  const isCorrect = oi === c.a;
                  const isPicked = oi === picked;
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={answered}
                      onClick={() => pick(qi, oi)}
                      className={cn(
                        "rounded-lg border px-4 py-3.5 text-left text-[15px] font-medium transition-colors",
                        !answered && "border-border bg-card hover:border-primary",
                        answered && isCorrect && "border-primary bg-accent-soft",
                        answered && !isCorrect && isPicked && "border-destructive bg-destructive/10",
                        answered && !isCorrect && !isPicked && "border-border bg-card opacity-50",
                      )}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <div className={cn("mt-2 rounded-lg px-3.5 py-3 text-[15px]", picked === c.a ? "bg-accent-soft text-accent-foreground" : "bg-destructive/10 text-destructive")}>
                  {picked === c.a ? "✓ Right. " : "Not quite. "}
                  {c.why}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

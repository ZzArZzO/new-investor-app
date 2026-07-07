"use client";

import { useMemo, useState } from "react";
import { DAILY_CARDS } from "@/content/daily-cards";
import { daySeed, todayStr } from "@/lib/date";
import { useAppStateContext } from "@/hooks/app-state-context";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DailyQuestionCard() {
  const { state, hydrated, answerDailyQuestion } = useAppStateContext();
  const today = todayStr();
  const card = useMemo(() => DAILY_CARDS[daySeed(today) % DAILY_CARDS.length], [today]);
  const [picked, setPicked] = useState<boolean | null>(null);

  if (!hydrated) return null;

  const answeredToday = state.daily.last === today;

  if (answeredToday && picked === null) {
    return (
      <section className="rounded-2xl bg-gradient-to-br from-amber-soft to-card p-5">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">Today&rsquo;s question · keep your streak</div>
        <p className="mt-2 font-semibold">✓ Done for today — come back tomorrow to keep the streak going.</p>
        <p className="mt-1 text-sm text-muted-foreground">Current streak: 🔥 {state.streak.count || 0}</p>
      </section>
    );
  }

  function pick(value: boolean) {
    if (answeredToday) return;
    setPicked(value);
    answerDailyQuestion();
    trackEvent("daily_question_answered", { correct: value === card.a });
  }

  const showFeedback = picked !== null;
  const correct = showFeedback && picked === card.a;

  return (
    <section className="rounded-2xl bg-gradient-to-br from-amber-soft to-card p-5">
      <div className="text-xs font-bold uppercase tracking-wide text-primary">Today&rsquo;s question · keep your streak</div>
      <p className="mt-2 text-[15px] font-semibold">{card.q}</p>
      <div className="mt-3 flex gap-2.5">
        <Button variant="outline" disabled={showFeedback} onClick={() => pick(true)} className="h-11 flex-1 rounded-xl">
          True
        </Button>
        <Button variant="outline" disabled={showFeedback} onClick={() => pick(false)} className="h-11 flex-1 rounded-xl">
          False
        </Button>
      </div>
      {showFeedback && (
        <div
          role="status"
          className={cn(
            "mt-3 rounded-lg px-3.5 py-3 text-[14px]",
            correct ? "bg-accent-soft text-accent-foreground" : "bg-destructive/10 text-destructive",
          )}
        >
          {correct ? "✓ Right. " : "Not quite. "}
          {card.why}
        </div>
      )}
    </section>
  );
}

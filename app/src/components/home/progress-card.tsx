"use client";

import { LESSONS } from "@/content/lessons";
import { PERSONAS } from "@/content/quiz";
import { BADGES } from "@/content/badges";
import { Progress } from "@/components/ui/progress";
import { Pill } from "@/components/ui/pill";
import { useAppStateContext } from "@/hooks/app-state-context";

export function ProgressCard() {
  const { state, hydrated } = useAppStateContext();
  if (!hydrated) return null;

  const done = state.done.length;
  const pct = Math.round((done / LESSONS.length) * 100);

  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wide text-primary">Your progress</div>
      <Progress value={pct} className="mt-3" />
      <p className="mt-2 text-sm text-muted-foreground">
        {done} of {LESSONS.length} lessons done
      </p>
      <div className="mt-2 flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
        ✨ <span>{state.xp || 0}</span> XP
      </div>
      {state.persona && (
        <p className="mt-3 font-semibold">
          {PERSONAS[state.persona].emoji} You&rsquo;re {PERSONAS[state.persona].name}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {BADGES.map((badge) => {
          const owned = state.badges.includes(badge.id);
          return (
            <Pill key={badge.id} locked={!owned}>
              {badge.ico} {badge.name}
            </Pill>
          );
        })}
      </div>
    </section>
  );
}

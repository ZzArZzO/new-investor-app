"use client";

import { useState } from "react";
import { FREE_LESSONS, LESSONS } from "@/content/lessons";
import { Progress } from "@/components/ui/progress";
import { LessonRow } from "@/components/lessons/lesson-row";
import { UpgradeSheet } from "@/components/plus/upgrade-sheet";
import { PLUS_FAKEDOOR_ENABLED } from "@/lib/plus-flag";
import { useAppStateContext } from "@/hooks/app-state-context";

const FOUNDATIONS_PILLAR = LESSONS[0].pillar;

export default function LessonsPage() {
  const { state, hydrated, plan } = useAppStateContext();
  const done = hydrated ? state.done : [];
  const [sheetOpen, setSheetOpen] = useState(false);

  const doneFree = done.filter((id) => FREE_LESSONS.some((l) => l.id === id)).length;
  const pct = Math.round((doneFree / FREE_LESSONS.length) * 100);

  const foundationsDone = LESSONS.filter((l) => l.pillar === FOUNDATIONS_PILLAR).every((l) => done.includes(l.id));

  const pillars: string[] = [];
  LESSONS.forEach((l) => {
    if (!pillars.includes(l.pillar)) pillars.push(l.pillar);
  });

  return (
    <div className="pt-1">
      <h2 className="font-heading text-xl font-medium">Lessons</h2>
      <Progress value={pct} className="mt-3 mb-1" />
      <p className="mb-4 text-sm text-muted-foreground">
        {doneFree} of {FREE_LESSONS.length} done
      </p>

      {pillars.map((pillar) => {
        const group = LESSONS.filter((l) => l.pillar === pillar);
        const doneInGroup = group.filter((l) => done.includes(l.id)).length;
        return (
          <div key={pillar} className="mb-5">
            <div className="mb-2.5 flex items-center gap-2 text-[15px] font-extrabold">
              {pillar}
              <span className="text-[13px] font-semibold text-muted-foreground">
                {doneInGroup}/{group.length}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {group.map((l, gIdx) => {
                // Tracks unlock once Foundations is done; within a track, lessons unlock
                // sequentially. Plus accounts skip progression locks entirely.
                const trackOpen = pillar === FOUNDATIONS_PILLAR || foundationsDone;
                const unlocked =
                  plan === "plus" ||
                  done.includes(l.id) ||
                  (trackOpen && (gIdx === 0 || done.includes(group[gIdx - 1].id)));
                return (
                  <LessonRow
                    key={l.id}
                    lessonId={l.id}
                    index={gIdx}
                    title={l.title}
                    done={done.includes(l.id)}
                    unlocked={unlocked}
                    lockedLabel={trackOpen ? "Finish the previous lesson first" : `Finish ${FOUNDATIONS_PILLAR} first`}
                    plus={PLUS_FAKEDOOR_ENABLED && l.tier === "plus" && plan !== "plus" && !done.includes(l.id)}
                    onPlusClick={() => setSheetOpen(true)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      <UpgradeSheet open={sheetOpen} onOpenChange={setSheetOpen} feature="lessons" />
    </div>
  );
}

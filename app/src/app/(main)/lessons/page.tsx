"use client";

import { LESSONS } from "@/content/lessons";
import { Progress } from "@/components/ui/progress";
import { LessonRow } from "@/components/lessons/lesson-row";
import { useAppStateContext } from "@/hooks/app-state-context";

export default function LessonsPage() {
  const { state, hydrated } = useAppStateContext();
  const done = hydrated ? state.done : [];
  const pct = Math.round((done.length / LESSONS.length) * 100);

  const pillars: string[] = [];
  LESSONS.forEach((l) => {
    if (!pillars.includes(l.pillar)) pillars.push(l.pillar);
  });

  return (
    <div className="pt-1">
      <h2 className="font-heading text-xl font-medium">Lessons</h2>
      <Progress value={pct} className="mt-3 mb-1" />
      <p className="mb-4 text-sm text-muted-foreground">
        {done.length} of {LESSONS.length} done
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
              {group.map((l) => {
                const idx = LESSONS.indexOf(l);
                const unlocked = idx === 0 || done.includes(LESSONS[idx - 1].id) || done.includes(l.id);
                return <LessonRow key={l.id} lessonId={l.id} index={idx} title={l.title} done={done.includes(l.id)} unlocked={unlocked} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

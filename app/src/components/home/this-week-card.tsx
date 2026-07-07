"use client";

import { useMemo } from "react";
import { WEEKLY_ITEMS } from "@/content/weekly-items";
import { daySeed, todayStr } from "@/lib/date";
import { useAppStateContext } from "@/hooks/app-state-context";

const KIND_LABEL = { concept: "Concept", myth: "Myth vs fact", tip: "Tip of the week" } as const;

export function ThisWeekCard() {
  const { hydrated } = useAppStateContext();
  const item = useMemo(() => {
    const now = new Date();
    const mondayOffset = (now.getDay() + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - mondayOffset);
    return WEEKLY_ITEMS[daySeed(todayStr(monday)) % WEEKLY_ITEMS.length];
  }, []);

  if (!hydrated) return null;

  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wide text-primary">This week · {KIND_LABEL[item.kind]}</div>
      <p className="mt-2 text-[16px] font-extrabold tracking-tight">{item.title}</p>
      <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{item.body}</p>
    </section>
  );
}

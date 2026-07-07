"use client";

import { useMemo, useState } from "react";
import { SCAM_SCENARIOS } from "@/content/scam-scenarios";
import { daySeed, todayStr } from "@/lib/date";
import { useAppStateContext } from "@/hooks/app-state-context";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHANNEL_LABEL = { DM: "Direct message", email: "Email", popup: "Pop-up" } as const;

export function TodayScamCard() {
  const { state, hydrated, playDailyScam } = useAppStateContext();
  const today = todayStr();
  const scam = useMemo(() => SCAM_SCENARIOS[daySeed(today) % SCAM_SCENARIOS.length], [today]);
  const [picked, setPicked] = useState<boolean | null>(null);

  if (!hydrated) return null;

  const playedToday = state.scamDaily.last === today;

  if (playedToday && picked === null) {
    return (
      <section className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">Today&rsquo;s scam · safety reflex</div>
        <p className="mt-2 font-semibold">✓ Done for today — you trained your eye. Back tomorrow.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Spotting streak: 🛡️ {state.scamDaily.streak} (best {state.scamDaily.best})
        </p>
      </section>
    );
  }

  function pick(saidScam: boolean) {
    if (playedToday) return;
    setPicked(saidScam);
    playDailyScam();
    trackEvent("daily_scam_played", { correct: saidScam === scam.isScam });
  }

  const answered = picked !== null;
  const correct = answered && picked === scam.isScam;

  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wide text-primary">Today&rsquo;s scam · safety reflex</div>
      <div className="mt-3 overflow-hidden rounded-xl border border-border">
        <div className="flex items-center gap-2 bg-muted px-3 py-2 text-[13px]">
          <span className="grid size-7 flex-none place-items-center rounded-full bg-muted-foreground/70 text-[13px] font-bold text-background">
            {scam.from.slice(0, 1).toUpperCase()}
          </span>
          <span className="font-semibold">{scam.from}</span>
          <span className="ml-auto text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            {CHANNEL_LABEL[scam.channel]}
          </span>
        </div>
        <p className="whitespace-pre-wrap px-3.5 py-3.5 text-[14.5px] leading-relaxed">{scam.body}</p>
      </div>
      <div className="mt-3 flex gap-2.5">
        <Button variant="outline" disabled={answered} onClick={() => pick(false)} className="h-11 flex-1 rounded-xl">
          ✅ Safe
        </Button>
        <Button variant="outline" disabled={answered} onClick={() => pick(true)} className="h-11 flex-1 rounded-xl">
          🚩 Scam
        </Button>
      </div>
      {answered && (
        <div
          role="status"
          className={cn(
            "mt-3 rounded-lg px-3.5 py-3 text-[14px]",
            correct ? "bg-accent-soft text-accent-foreground" : "bg-destructive/10 text-destructive",
          )}
        >
          <b>
            {correct ? "✓ Correct — " : "✕ Not quite — "}
            {scam.isScam ? "this is a scam." : "this one is safe."}
          </b>
          <br />
          {scam.why}
          {scam.flags.length > 0 && (
            <ul className="mt-2 grid gap-1">
              {scam.flags.map((f) => (
                <li key={f} className="relative pl-5 text-[13px]">
                  <span className="absolute left-0 text-amber">⚑</span>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

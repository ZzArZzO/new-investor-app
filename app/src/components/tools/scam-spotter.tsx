"use client";

import { useMemo, useState } from "react";
import { SCAM_SCENARIOS } from "@/content/scam-scenarios";
import { daySeed, todayStr } from "@/lib/date";
import { useAppStateContext } from "@/hooks/app-state-context";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHANNEL_LABEL: Record<string, string> = { DM: "Direct message", email: "Email", popup: "Pop-up" };

export function ScamSpotter() {
  const { recordToolUse, recordPerfectScamRound } = useAppStateContext();
  const n = SCAM_SCENARIOS.length;
  const order = useMemo(() => {
    const start = daySeed(todayStr()) % n;
    return Array.from({ length: n }, (_, k) => (start + k) % n);
  }, [n]);

  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<"safe" | "scam" | null>(null);
  const [finished, setFinished] = useState(false);

  const sc = SCAM_SCENARIOS[order[i]];

  function choose(choice: "safe" | "scam") {
    if (answer) return;
    recordToolUse();
    const said = choice === "scam";
    const ok = said === sc.isScam;
    setAnswer(choice);
    if (ok) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 < n) {
      setI(i + 1);
      setAnswer(null);
    } else {
      const perfect = score === n;
      if (perfect) recordPerfectScamRound();
      setFinished(true);
    }
  }

  function playAgain() {
    setI(0);
    setScore(0);
    setAnswer(null);
    setFinished(false);
  }

  return (
    <ToolShell
      icon="🕵️"
      title="Spot the scam"
      subtitle="Safe or scam? Decide, then see the red flags. This is about the traps — it names no coins and predicts no prices."
      note="Educational scenarios modelled on common real-world crypto scams. Rule of thumb: anything asking for your recovery phrase, or promising guaranteed returns, is a scam."
    >
      {finished ? (
        <div className="text-center">
          <div className="rounded-xl bg-accent-soft p-5">
            <div className="text-3xl">{score === n ? "🏆" : "🕵️"}</div>
            <p className="mt-1 font-bold">
              {score} / {n} correct
            </p>
            <p className="mt-1 text-[14px] text-muted-foreground">
              {score === n
                ? "Perfect round — you spotted every trap."
                : "Good practice. The red flags repeat: recovery-phrase requests, guaranteed returns, urgency, and send-to-receive-more."}
            </p>
          </div>
          <Button onClick={playAgain} className="mt-3.5 h-11 w-full rounded-xl">
            Play again
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-2.5 text-[13px] font-bold text-muted-foreground">
            Message {i + 1} of {n} · score {score}
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <div className="flex items-center gap-2 bg-muted px-3 py-2.5 text-[13px]">
              <span className="grid size-7 flex-none place-items-center rounded-full bg-muted-foreground/40 text-[13px] font-bold text-background">
                {sc.from.slice(0, 1).toUpperCase()}
              </span>
              <span className="font-bold">{sc.from}</span>
              <span className="ml-auto text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
                {CHANNEL_LABEL[sc.channel] ?? sc.channel}
              </span>
            </div>
            <div className="px-3.5 py-4 text-[14.5px] leading-relaxed whitespace-pre-wrap">{sc.body}</div>
          </div>

          <div className="mt-2.5 flex gap-2.5">
            <button
              type="button"
              disabled={!!answer}
              onClick={() => choose("safe")}
              className={cn(
                "flex-1 rounded-lg border px-4 py-3.5 text-center text-[15px] font-medium",
                !answer && "border-border bg-card hover:border-primary",
                answer && !sc.isScam && "border-primary bg-accent-soft",
                answer === "safe" && sc.isScam && "border-destructive bg-destructive/10",
                answer && sc.isScam && answer !== "safe" && "opacity-50",
              )}
            >
              ✅ Safe
            </button>
            <button
              type="button"
              disabled={!!answer}
              onClick={() => choose("scam")}
              className={cn(
                "flex-1 rounded-lg border px-4 py-3.5 text-center text-[15px] font-medium",
                !answer && "border-border bg-card hover:border-primary",
                answer && sc.isScam && "border-primary bg-accent-soft",
                answer === "scam" && !sc.isScam && "border-destructive bg-destructive/10",
                answer && !sc.isScam && answer !== "scam" && "opacity-50",
              )}
            >
              🚩 Scam
            </button>
          </div>

          {answer && (
            <div className={cn("mt-3 rounded-lg px-3.5 py-3 text-[14.5px]", (answer === "scam") === sc.isScam ? "bg-accent-soft text-accent-foreground" : "bg-destructive/10 text-destructive")}>
              <b>{(answer === "scam") === sc.isScam ? "✓ Correct — " : "✕ Not quite — "}</b>
              {sc.isScam ? "this is a scam." : "this one is safe."}
              <br />
              {sc.why}
              {sc.flags.length > 0 && (
                <ul className="mt-2 grid gap-1">
                  {sc.flags.map((f) => (
                    <li key={f} className="relative pl-5 text-[13px]">
                      <span className="absolute left-0 text-amber">⚑</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <Button onClick={next} className="mt-3 h-11 w-full rounded-xl">
                {i + 1 < n ? "Next message →" : "See results"}
              </Button>
            </div>
          )}
        </>
      )}
    </ToolShell>
  );
}

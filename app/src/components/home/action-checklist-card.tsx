"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { ACTION_STEPS } from "@/content/action-steps";
import { useAppStateContext } from "@/hooks/app-state-context";
import { trackEvent } from "@/lib/analytics";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function ActionChecklistCard() {
  const { state, hydrated, toggleActionStep } = useAppStateContext();
  const router = useRouter();
  if (!hydrated) return null;

  const doneCount = ACTION_STEPS.filter((s) => state.actions.includes(s.id)).length;
  const pct = Math.round((doneCount / ACTION_STEPS.length) * 100);

  function handleStep(id: string, route: string | undefined, done: boolean) {
    toggleActionStep(id);
    if (!done) trackEvent("action_step_completed", { step: id });
    if (!done && route) router.push(route);
  }

  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wide text-primary">
        Your first investment · {doneCount}/{ACTION_STEPS.length} steps
      </div>
      <Progress value={pct} className="mt-3" />
      <ul className="mt-3 grid gap-1.5">
        {ACTION_STEPS.map((step) => {
          const done = state.actions.includes(step.id);
          return (
            <li key={step.id}>
              <button
                onClick={() => handleStep(step.id, step.route, done)}
                className="flex w-full items-start gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary"
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-5 flex-none place-items-center rounded-md border",
                    done ? "border-primary bg-primary text-primary-foreground" : "border-border",
                  )}
                >
                  {done && <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />}
                </span>
                <span>
                  <span className={cn("block text-[14px] font-semibold", done && "text-muted-foreground line-through")}>
                    {step.label}
                  </span>
                  <span className="block text-[12.5px] text-muted-foreground">{step.detail}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[11.5px] leading-relaxed text-muted-foreground italic">
        The generic steps everyone takes — not a recommendation to buy anything. Only ever use regulated, licensed platforms.
      </p>
    </section>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { PERSONAS } from "@/content/quiz";
import { Button } from "@/components/ui/button";
import { useAppStateContext } from "@/hooks/app-state-context";
import { SaveResultsCard } from "@/components/result/save-results-card";

export default function ResultPage() {
  const router = useRouter();
  const { state, hydrated } = useAppStateContext();

  if (!hydrated) return null;

  if (!state.persona) {
    router.replace("/quiz");
    return null;
  }

  const persona = PERSONAS[state.persona];

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-140 flex-col gap-3.5 px-4 pt-3 pb-8">
      <div className="rounded-2xl bg-card p-6 text-center shadow-sm">
        <div className="text-4xl">{persona.emoji}</div>
        <div className="mt-2 inline-block rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent-foreground">Your type</div>
        <h1 className="mt-1.5 font-heading text-2xl font-medium">{persona.name}</h1>
        <p className="mt-1.5 text-[15px] text-muted-foreground">{persona.desc}</p>
      </div>

      <div className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">How people like this often think</div>
        <p className="mt-2 text-[15px] leading-relaxed">{persona.approach}</p>
        <p className="mt-2.5 text-[12.5px] text-muted-foreground">
          This is a general illustration, not personal advice. It never uses your income or savings.
        </p>
      </div>

      <div className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">Your strengths & blind spots</div>
        <ul className="mt-2 grid gap-1.5">
          {persona.strengths.slice(0, 2).map((s) => (
            <li key={s} className="relative pl-5.5 text-[14px]">
              <span className="absolute left-0 top-0.5 text-xs font-bold text-primary">✓</span>
              {s}
            </li>
          ))}
          {persona.blindSpots.slice(0, 2).map((s) => (
            <li key={s} className="relative pl-5.5 text-[14px]">
              <span className="absolute left-0 top-0.5 text-xs font-bold text-destructive">!</span>
              {s}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => router.push(`/types/${persona.slug}`)}
          className="mt-3 text-[13.5px] font-semibold text-primary underline underline-offset-2"
        >
          Read the full {persona.name} profile, or see all four types
        </button>
      </div>

      <Button onClick={() => router.push("/lessons")} className="h-11 w-full rounded-xl">
        Start the lessons →
      </Button>
      <Button variant="outline" onClick={() => router.push("/compare")} className="h-11 w-full rounded-xl">
        See tools &amp; platforms
      </Button>

      <SaveResultsCard />

      <p className="mt-2 px-1 pb-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Educational information, not personal financial advice. Investing involves risk, including loss of the money you
        invest. Crypto is high-risk and can go to zero.
      </p>
    </div>
  );
}

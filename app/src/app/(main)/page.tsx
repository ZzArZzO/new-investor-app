"use client";

import { useRouter } from "next/navigation";
import { HeroCard } from "@/components/home/hero-card";
import { DailyQuestionCard } from "@/components/home/daily-question-card";
import { ReviewCard } from "@/components/home/review-card";
import { TodayScamCard } from "@/components/home/today-scam-card";
import { TrackerSnapshotCard } from "@/components/home/tracker-snapshot-card";
import { ActionChecklistCard } from "@/components/home/action-checklist-card";
import { ThisWeekCard } from "@/components/home/this-week-card";
import { ProgressCard } from "@/components/home/progress-card";
import { useAppStateContext } from "@/hooks/app-state-context";

const NEVER_DO = [
  'No price predictions or "this coin is going to X"',
  'No coin picks or "buy this" recommendations, ever',
  "No leveraged trading tutorials or margin/futures content",
  "No paid coin promotions or influencer partnerships",
  '"No guaranteed returns" language, anywhere',
];

export default function HomePage() {
  const router = useRouter();
  const { state, hydrated } = useAppStateContext();

  return (
    <div className="flex flex-col gap-3.5 pt-1">
      <HeroCard
        ctaLabel={hydrated && state.persona ? "Retake the type quiz" : "Find your investor type"}
        onCtaClick={() => router.push("/quiz")}
      />

      <DailyQuestionCard />
      <ReviewCard />
      <TodayScamCard />
      <TrackerSnapshotCard />
      <ActionChecklistCard />
      <ThisWeekCard />

      <section className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">What we&rsquo;ll never do</div>
        <ul className="mt-2.5 grid gap-1.5">
          {NEVER_DO.map((item) => (
            <li key={item} className="relative pl-5.5 text-sm">
              <span className="absolute left-0 top-0.5 text-xs font-bold text-destructive">✕</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <ProgressCard />

      <p className="mt-2 px-1.5 pb-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Educational information, not personal financial advice. Investing involves risk, including loss of the money you
        invest. Crypto is high-risk and can go to zero.
      </p>
    </div>
  );
}

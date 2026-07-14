"use client";

import Link from "next/link";
import { dueReviewItems, remainingReviewQuota } from "@/lib/app-state-logic";
import { todayStr } from "@/lib/date";
import { useAppStateContext } from "@/hooks/app-state-context";

/** Home entry point for the spaced-repetition deck, appears once there's anything to review. */
export function ReviewCard() {
  const { state, hydrated, plan } = useAppStateContext();
  if (!hydrated) return null;

  const today = todayStr();
  // Nothing to review until some learning has happened.
  if (state.done.length === 0) return null;

  const due = dueReviewItems(state, today).length;
  const quota = plan === "plus" ? Number.POSITIVE_INFINITY : remainingReviewQuota(state, today);

  if (quota === 0) {
    return (
      <section className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">Review · make it stick</div>
        <p className="mt-2 font-semibold">✓ Reviewed today, spaced repetition works best in small daily doses.</p>
      </section>
    );
  }

  return (
    <Link href="/review" className="block rounded-2xl bg-card p-5 shadow-sm transition-colors hover:ring-1 hover:ring-primary">
      <div className="text-xs font-bold uppercase tracking-wide text-primary">Review · make it stick</div>
      <p className="mt-2 text-[15px] font-semibold">
        {due > 0 ? `${due} card${due === 1 ? "" : "s"} due, a two-minute refresh.` : "A quick refresher round is ready."}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">Missed questions and key terms, spaced so they stick. +3 XP per card.</p>
    </Link>
  );
}

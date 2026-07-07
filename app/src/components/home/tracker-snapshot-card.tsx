"use client";

import Link from "next/link";
import { fmtEur } from "@/lib/date";
import { useAppStateContext } from "@/hooks/app-state-context";

export function TrackerSnapshotCard() {
  const { state, hydrated } = useAppStateContext();
  if (!hydrated) return null;

  const contributed = state.holdings.reduce((sum, h) => sum + h.contributed, 0);
  const count = state.holdings.length;

  return (
    <Link
      href="/tracker"
      className="block rounded-2xl border border-transparent bg-card p-5 shadow-sm transition-colors hover:border-primary"
    >
      <div className="text-xs font-bold uppercase tracking-wide text-primary">Your portfolio</div>
      {count === 0 ? (
        <p className="mt-2 text-[15px] font-semibold">Start tracking what you hold →</p>
      ) : (
        <p className="mt-2 text-[15px] font-semibold">
          {fmtEur(contributed)} contributed across {count} holding{count > 1 ? "s" : ""} →
        </p>
      )}
      <p className="mt-1 text-sm text-muted-foreground">Private and manual — you enter the numbers, nothing is connected.</p>
    </Link>
  );
}

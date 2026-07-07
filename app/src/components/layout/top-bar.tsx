"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { useAppStateContext } from "@/hooks/app-state-context";

export function TopBar() {
  const { state } = useAppStateContext();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-background/90 px-4 py-3.5 backdrop-blur">
      <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
        <span className="grid size-6 place-items-center rounded-md bg-gradient-to-br from-primary to-primary/70 text-sm text-primary-foreground">
          ▲
        </span>
        New Investor
      </Link>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-soft px-2.5 py-1 text-sm font-bold text-amber">
        <Flame className="size-4" aria-hidden="true" />
        {state.streak.count || 0}
      </span>
    </header>
  );
}

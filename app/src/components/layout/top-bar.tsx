"use client";

import Link from "next/link";
import Image from "next/image";
import { Flame, Settings } from "lucide-react";
import { useAppStateContext } from "@/hooks/app-state-context";

export function TopBar() {
  const { state } = useAppStateContext();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-background/90 px-4 py-3.5 backdrop-blur">
      <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
        <Image src="/icon.png" alt="" width={24} height={24} className="rounded-md" priority />
        New Investor
      </Link>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-soft px-2.5 py-1 text-sm font-bold text-amber">
          <Flame className="size-4" aria-hidden="true" />
          {state.streak.count || 0}
        </span>
        <Link href="/settings" aria-label="Save & restore progress" className="text-muted-foreground hover:text-foreground">
          <Settings className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}

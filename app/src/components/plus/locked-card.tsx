"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { UpgradeSheet } from "./upgrade-sheet";

interface LockedCardProps {
  title: string;
  description: string;
  /** Which surface this is, passed through to upgrade-sheet analytics. */
  feature: string;
}

/** A dashed "Plus, coming soon" teaser card that opens the upgrade sheet. */
export function LockedCard({ title, description, feature }: LockedCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border border-dashed border-border bg-card/60 p-5 text-left transition-colors hover:border-primary"
      >
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary">
          <Lock className="size-3.5" aria-hidden="true" />
          Plus · coming soon
        </div>
        <div className="mt-1.5 text-[15px] font-bold">{title}</div>
        <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>
      </button>
      <UpgradeSheet open={open} onOpenChange={setOpen} feature={feature} />
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { ToolSlider } from "@/components/tools/tool-slider";
import { StatTile } from "@/components/ui/stat-tile";
import { fmtEur } from "@/lib/date";
import { feeErosion } from "@/lib/tool-math";
import { useAppStateContext } from "@/hooks/app-state-context";

const LUMP = 10000;
const GROSS = 7;

function FeeBar({ label, value, maxValue, warn }: { label: string; value: number; maxValue: number; warn: boolean }) {
  const pct = Math.round((value / maxValue) * 100);
  return (
    <div className="flex items-center gap-2.5 text-[13px]">
      <span className="w-28 flex-none font-bold text-muted-foreground">{label}</span>
      <span className="h-5.5 flex-1 overflow-hidden rounded-md bg-muted">
        <span className={`block h-full rounded-md ${warn ? "bg-amber" : "bg-primary"}`} style={{ width: `${pct}%` }} />
      </span>
      <span className="w-18 flex-none text-right font-bold tabular-figures">{fmtEur(value)}</span>
    </div>
  );
}

export function FeeEroder() {
  const { recordToolUse } = useAppStateContext();
  const [fee, setFee] = useState(1.0);
  const [years, setYears] = useState(30);

  const { low, high, lost } = useMemo(() => feeErosion(LUMP, GROSS, fee, years), [fee, years]);
  const maxValue = Math.max(low, high);

  function handleChange<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      recordToolUse();
    };
  }

  return (
    <ToolShell
      icon="🪙"
      title="Fee eroder"
      subtitle={`A tiny yearly fee feels harmless. Over decades it quietly compounds against you. (Illustrative ${fmtEur(LUMP)} at a ${GROSS}% gross return.)`}
      note="Illustrative only. Fixed lump sum and a constant gross return, for comparison; real returns and fee structures vary. Not advice on any specific product."
    >
      <ToolSlider label="Yearly fee" min={0} max={2} step={0.1} value={fee} format={(v) => `${v.toFixed(1)}%`} onChange={handleChange(setFee)} />
      <ToolSlider label="Years invested" min={5} max={40} step={1} value={years} format={(v) => `${v} yr`} onChange={handleChange(setYears)} />

      <div className="mt-3 flex flex-col gap-2.5">
        <FeeBar label="Low-cost 0.2%" value={low} maxValue={maxValue} warn={false} />
        <FeeBar label={`${fee.toFixed(1)}% fee`} value={high} maxValue={maxValue} warn />
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2.5">
        <StatTile label="Fees quietly took" value={fmtEur(lost)} warn />
        <StatTile label="That's of" value={fmtEur(low)} />
      </div>
    </ToolShell>
  );
}

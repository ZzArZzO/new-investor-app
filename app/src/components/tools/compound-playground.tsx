"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ToolShell } from "@/components/tools/tool-shell";
import { ToolSlider } from "@/components/tools/tool-slider";
import { StatTile } from "@/components/ui/stat-tile";
import { fmtEur } from "@/lib/date";
import { fvSeries } from "@/lib/tool-math";
import { useAppStateContext } from "@/hooks/app-state-context";

export function CompoundPlayground() {
  const { recordToolUse } = useAppStateContext();
  const [pmt, setPmt] = useState(150);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(7);

  const series = useMemo(() => fvSeries(pmt, years, rate), [pmt, years, rate]);
  const data = useMemo(() => series.map((v, i) => ({ year: i, value: Math.round(v) })), [series]);
  const end = series[series.length - 1];
  const contributed = pmt * years * 12;
  const growth = Math.max(0, end - contributed);

  function handleChange<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      recordToolUse();
    };
  }

  return (
    <ToolShell
      icon="📈"
      title="Compound playground"
      subtitle="Drag the sliders. Watch how a steady monthly amount can snowball as its returns start earning returns."
      note="Illustrative only. Assumes a constant average return compounded monthly; real returns vary year to year and can be negative. Not a projection of any specific product."
    >
      <ToolSlider label="Monthly amount" min={10} max={1000} step={10} value={pmt} format={fmtEur} onChange={handleChange(setPmt)} />
      <ToolSlider label="Years invested" min={1} max={40} step={1} value={years} format={(v) => `${v} yr`} onChange={handleChange(setYears)} />
      <ToolSlider label="Average return / yr" min={0} max={12} step={0.5} value={rate} format={(v) => `${v}%`} onChange={handleChange(setRate)} />

      <div className="mt-3 h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id="compoundFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" hide />
            <Tooltip
              formatter={(value) => fmtEur(Number(value))}
              labelFormatter={(year) => `Year ${year}`}
              contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
            />
            <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2.5} fill="url(#compoundFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2.5">
        <StatTile label="You put in" value={fmtEur(contributed)} />
        <StatTile label="Growth" value={fmtEur(growth)} />
        <StatTile label="Ends near" value={fmtEur(end)} />
      </div>
    </ToolShell>
  );
}

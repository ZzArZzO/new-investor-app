"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { SANDBOX_SCENARIOS } from "@/content/sandbox-scenarios";
import { fmtEur } from "@/lib/date";
import { rebalanceWeights, sandboxPath } from "@/lib/tool-math";
import { useAppStateContext } from "@/hooks/app-state-context";
import { ToolShell } from "@/components/tools/tool-shell";
import { ToolSlider } from "@/components/tools/tool-slider";
import { StatTile } from "@/components/ui/stat-tile";
import { SegmentedControl } from "@/components/ui/segmented-control";

/** Illustrative starting pot. The math runs on a 100-index; display scales to euros. */
const START_EUR = 1000;

export function PortfolioSandbox() {
  const { recordToolUse } = useAppStateContext();
  const [weights, setWeights] = useState<[number, number, number]>([60, 30, 10]);
  const [indexPct, bondsPct, cryptoPct] = weights;
  const [scenarioId, setScenarioId] = useState(SANDBOX_SCENARIOS[1].id);

  const scenario = SANDBOX_SCENARIOS.find((s) => s.id === scenarioId) ?? SANDBOX_SCENARIOS[0];
  const { path, maxDrawdown } = useMemo(
    () => sandboxPath(indexPct, bondsPct, cryptoPct, scenario.ret),
    [indexPct, bondsPct, cryptoPct, scenario],
  );
  const data = path.map((v, year) => ({ year, value: Math.round((v * START_EUR) / 100) }));
  const end = path[path.length - 1];

  // Moving one slider rebalances the other two so the mix always sums to 100%.
  function handleWeight(changed: number) {
    return (v: number) => {
      setWeights((w) => rebalanceWeights(w, changed, v));
      recordToolUse();
    };
  }

  return (
    <ToolShell
      icon="🧪"
      title="Portfolio sandbox"
      subtitle="Mix asset types, then run the same mix through different illustrative decades. Feel how time and volatility interact."
      note="An illustrative €1,000 through hypothetical return sequences, not historical data for any specific asset, not a forecast, and no coin is named. Real outcomes will differ."
    >
      <ToolSlider label="World index %" min={0} max={100} step={5} value={indexPct} format={(v) => `${v}%`} onChange={handleWeight(0)} />
      <ToolSlider label="Bonds %" min={0} max={100} step={5} value={bondsPct} format={(v) => `${v}%`} onChange={handleWeight(1)} />
      <ToolSlider label="Crypto slice %" min={0} max={100} step={5} value={cryptoPct} format={(v) => `${v}%`} onChange={handleWeight(2)} />

      <SegmentedControl
        options={SANDBOX_SCENARIOS.map((s) => ({ value: s.id, label: s.name }))}
        value={scenarioId}
        onChange={(v) => {
          setScenarioId(v);
          recordToolUse();
        }}
        className="mt-1 mb-3"
      />

      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id="sandboxFill" x1="0" y1="0" x2="0" y2="1">
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
            <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2.5} fill="url(#sandboxFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2.5">
        <StatTile label="Start" value={fmtEur(START_EUR)} />
        <StatTile label={`After ${scenario.ret.index.length} yrs`} value={fmtEur((end * START_EUR) / 100)} />
        <StatTile label="Worst drop" value={`-${Math.round(maxDrawdown * 100)}%`} warn />
      </div>
      <p className="mt-2 text-[12px] text-muted-foreground">{scenario.desc}</p>
    </ToolShell>
  );
}

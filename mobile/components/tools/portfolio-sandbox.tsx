import { useMemo, useState } from "react";
import { View } from "react-native";

import { SANDBOX_SCENARIOS } from "@/content/sandbox-scenarios";
import { fmtEur } from "@/lib/date";
import { rebalanceWeights, sandboxPath } from "@/lib/tool-math";
import { useAppState } from "@/lib/app-state";
import { useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";
import { PathChart } from "@/components/tools/path-chart";
import { SegmentedControl } from "@/components/segmented-control";
import { StatTile } from "@/components/stat-tile";
import { Stepper } from "@/components/stepper";
import { ToolShell } from "@/components/tools/tool-shell";

/** Illustrative starting pot. The math runs on a 100-index; display scales to euros. */
const START_EUR = 1000;

export function PortfolioSandbox() {
  const { colors } = useTheme();
  const { recordToolUse } = useAppState();
  const [weights, setWeights] = useState<[number, number, number]>([60, 30, 10]);
  const [indexPct, bondsPct, cryptoPct] = weights;
  const [scenarioId, setScenarioId] = useState(SANDBOX_SCENARIOS[1].id);

  const scenario = SANDBOX_SCENARIOS.find((s) => s.id === scenarioId) ?? SANDBOX_SCENARIOS[0];
  const { path, maxDrawdown } = useMemo(
    () => sandboxPath(indexPct, bondsPct, cryptoPct, scenario.ret),
    [indexPct, bondsPct, cryptoPct, scenario]
  );
  const end = path[path.length - 1];

  // Moving one stepper rebalances the other two so the mix always sums to 100%.
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
      <Stepper label="World index %" min={0} max={100} step={5} value={indexPct} display={`${indexPct}%`} onChange={handleWeight(0)} />
      <Stepper label="Bonds %" min={0} max={100} step={5} value={bondsPct} display={`${bondsPct}%`} onChange={handleWeight(1)} />
      <Stepper label="Crypto slice %" min={0} max={100} step={5} value={cryptoPct} display={`${cryptoPct}%`} onChange={handleWeight(2)} />

      <View style={{ marginTop: 14 }}>
        <SegmentedControl
          variant="chip"
          options={SANDBOX_SCENARIOS.map((s) => ({ id: s.id, label: s.name }))}
          value={scenarioId}
          onChange={(id) => {
            setScenarioId(id);
            recordToolUse();
          }}
        />
      </View>

      <PathChart path={path} style={{ marginTop: 14 }} />

      <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        <StatTile label="Start" value={fmtEur(START_EUR)} />
        <StatTile label={`After ${scenario.ret.index.length} yrs`} value={fmtEur((end * START_EUR) / 100)} />
        <StatTile label="Worst drop" value={`-${Math.round(maxDrawdown * 100)}%`} warn />
      </View>
      <AppText variant="muted" style={{ marginTop: 8, fontSize: 12, lineHeight: 17 }}>
        {scenario.desc}
      </AppText>
    </ToolShell>
  );
}

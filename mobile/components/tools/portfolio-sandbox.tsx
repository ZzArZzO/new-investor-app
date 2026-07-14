import { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

import { SANDBOX_SCENARIOS } from "@/content/sandbox-scenarios";
import { fmtEur } from "@/lib/date";
import { rebalanceWeights, sandboxPath } from "@/lib/tool-math";
import { useAppState } from "@/lib/app-state";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";
import { Stepper } from "@/components/stepper";
import { ToolShell } from "@/components/tools/tool-shell";

const CHART_W = 300;
const CHART_H = 140;

/** Area chart of the portfolio path, drawn as one SVG path (recharts equivalent on web). */
function PathChart({ path }: { path: number[] }) {
  const { colors } = useTheme();
  const max = Math.max(...path);
  const min = Math.min(...path, 0);
  const range = max - min || 1;
  const pts = path.map((v, idx) => {
    const x = (idx / (path.length - 1)) * CHART_W;
    const y = CHART_H - ((v - min) / range) * (CHART_H - 10);
    return { x, y };
  });
  const line = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;

  return (
    <View style={{ alignItems: "center", marginTop: 14 }}>
      <Svg width="100%" height={CHART_H} viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.primary} stopOpacity="0.35" />
            <Stop offset="1" stopColor={colors.primary} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path d={area} fill="url(#fill)" />
        <Path d={line} stroke={colors.primary} strokeWidth={2.5} fill="none" />
      </Svg>
    </View>
  );
}

function StatTile({ label, value, warn = false }: { label: string; value: string; warn?: boolean }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        borderRadius: RADIUS.md,
        backgroundColor: warn ? colors.amberSoft : colors.muted,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <AppText variant="muted" style={{ fontSize: 11.5, lineHeight: 15 }}>
        {label}
      </AppText>
      <AppText variant="bold" style={{ marginTop: 2, fontSize: 16, color: warn ? colors.amber : undefined }}>
        {value}
      </AppText>
    </View>
  );
}

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

      <View style={{ marginTop: 14, flexDirection: "row", gap: 8 }}>
        {SANDBOX_SCENARIOS.map((s) => {
          const active = s.id === scenarioId;
          return (
            <Pressable
              key={s.id}
              accessibilityRole="button"
              onPress={() => {
                setScenarioId(s.id);
                recordToolUse();
              }}
              style={{
                flex: 1,
                borderRadius: RADIUS.pill,
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.border,
                backgroundColor: active ? colors.primary : colors.card,
                paddingVertical: 8,
                alignItems: "center",
              }}
            >
              <AppText
                style={{
                  fontFamily: FONTS.bodyMedium,
                  fontSize: 12.5,
                  lineHeight: 17,
                  color: active ? colors.primaryForeground : colors.foreground,
                }}
              >
                {s.name}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <PathChart path={path} />

      <View style={{ marginTop: 10, flexDirection: "row", gap: 10 }}>
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

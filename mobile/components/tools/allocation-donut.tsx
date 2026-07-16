import { useState } from "react";
import { View } from "react-native";

import { rebalanceWeights } from "@/lib/tool-math";
import { useAppState } from "@/lib/app-state";
import { RADIUS, useTheme, withAlpha } from "@/lib/theme";
import { AppText } from "@/components/ui";
import { Donut } from "@/components/donut";
import { Stepper } from "@/components/stepper";
import { ToolShell } from "@/components/tools/tool-shell";

export function AllocationDonut() {
  const { colors } = useTheme();
  const { recordToolUse } = useAppState();
  const [weights, setWeights] = useState<[number, number, number]>([70, 20, 10]);
  const [corePct, satellitePct, cryptoPct] = weights;

  const data = [
    { key: "core", label: "Diversified core", value: corePct, color: colors.primary },
    { key: "satellite", label: "Satellite", value: satellitePct, color: colors.amber },
    { key: "crypto", label: "Crypto slice", value: cryptoPct, color: colors.destructive },
  ];

  const message =
    cryptoPct <= 5
      ? "A small, bounded crypto slice, the shape most long-term plans use. If it went to zero, the plan barely notices."
      : cryptoPct <= 20
        ? "A noticeable but still-bounded crypto slice. Worth asking Lesson 8's question honestly before you size it."
        : "That's a large high-risk slice. Lesson 8's test: if it went to zero tomorrow, would it change your life? If yes, it's too big.";

  const danger = cryptoPct > 20;

  // Moving one stepper rebalances the other two so the split always sums to 100%.
  function handleWeight(changed: number) {
    return (v: number) => {
      setWeights((w) => rebalanceWeights(w, changed, v));
      recordToolUse();
    };
  }

  return (
    <ToolShell
      icon="🍩"
      title="Core + satellite"
      subtitle="Shape a core-and-satellite split and read the honest gut-check on your crypto slice."
      note="Illustrative shapes in percentages only, it never uses your real money, income or savings, and is not a recommendation to hold any particular mix."
    >
      <Stepper label="Diversified core %" min={0} max={100} step={5} value={corePct} display={`${corePct}%`} onChange={handleWeight(0)} />
      <Stepper label="Satellite (stocks/sector) %" min={0} max={100} step={5} value={satellitePct} display={`${satellitePct}%`} onChange={handleWeight(1)} />
      <Stepper label="Crypto slice %" min={0} max={100} step={5} value={cryptoPct} display={`${cryptoPct}%`} onChange={handleWeight(2)} />

      <View style={{ marginTop: 16, flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Donut slices={data} />
        <View style={{ flex: 1, gap: 8 }}>
          {data.map((d) => (
            <View key={d.key} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: d.color }} />
              <AppText style={{ flex: 1, fontSize: 13, lineHeight: 18 }}>{d.label}</AppText>
              <AppText variant="bold" style={{ fontSize: 13, color: colors.mutedForeground }}>
                {Math.round(d.value)}%
              </AppText>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          marginTop: 14,
          borderRadius: RADIUS.md,
          paddingHorizontal: 14,
          paddingVertical: 12,
          backgroundColor: danger ? withAlpha(colors.destructive, 0.1) : colors.accent,
        }}
      >
        <AppText
          style={{
            fontSize: 14,
            lineHeight: 20,
            color: danger ? colors.destructive : colors.accentForeground,
          }}
        >
          {message}
        </AppText>
      </View>
    </ToolShell>
  );
}

import { useMemo, useState } from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { useAppState } from "@/lib/app-state";
import { RADIUS, useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";
import { Stepper } from "@/components/stepper";
import { ToolShell } from "@/components/tools/tool-shell";

const SIZE = 120;
const STROKE = 20;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

/** Donut via stroke-dash segments on circles — no chart library needed. */
function Donut({ slices }: { slices: { value: number; color: string }[] }) {
  let offset = 0;
  return (
    <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {slices.map((s, idx) => {
        const len = (s.value / 100) * CIRC;
        const circle = (
          <Circle
            key={idx}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke={s.color}
            strokeWidth={STROKE}
            fill="none"
            strokeDasharray={`${len} ${CIRC - len}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        );
        offset += len;
        return circle;
      })}
    </Svg>
  );
}

export function AllocationDonut() {
  const { colors } = useTheme();
  const { recordToolUse } = useAppState();
  const [core, setCore] = useState(70);
  const [satellite, setSatellite] = useState(20);
  const [crypto, setCrypto] = useState(10);

  const { corePct, satellitePct, cryptoPct } = useMemo(() => {
    const total = core + satellite + crypto || 1;
    return {
      corePct: (core / total) * 100,
      satellitePct: (satellite / total) * 100,
      cryptoPct: (crypto / total) * 100,
    };
  }, [core, satellite, crypto]);

  const data = [
    { key: "core", label: "Diversified core", value: corePct, color: colors.primary },
    { key: "satellite", label: "Satellite", value: satellitePct, color: colors.amber },
    { key: "crypto", label: "Crypto slice", value: cryptoPct, color: colors.destructive },
  ];

  const message =
    cryptoPct <= 5
      ? "A small, bounded crypto slice — the shape most long-term plans use. If it went to zero, the plan barely notices."
      : cryptoPct <= 20
        ? "A noticeable but still-bounded crypto slice. Worth asking Lesson 8's question honestly before you size it."
        : "That's a large high-risk slice. Lesson 8's test: if it went to zero tomorrow, would it change your life? If yes, it's too big.";

  const danger = cryptoPct > 20;

  function handleChange(setter: (v: number) => void) {
    return (v: number) => {
      setter(v);
      recordToolUse();
    };
  }

  return (
    <ToolShell
      icon="🍩"
      title="Core + satellite"
      subtitle="Shape a core-and-satellite split and read the honest gut-check on your crypto slice."
      note="Illustrative shapes in percentages only — it never uses your real money, income or savings, and is not a recommendation to hold any particular mix."
    >
      <Stepper label="Diversified core %" min={0} max={100} step={5} value={core} display={`${core}%`} onChange={handleChange(setCore)} />
      <Stepper label="Satellite (stocks/sector) %" min={0} max={100} step={5} value={satellite} display={`${satellite}%`} onChange={handleChange(setSatellite)} />
      <Stepper label="Crypto slice %" min={0} max={100} step={5} value={crypto} display={`${crypto}%`} onChange={handleChange(setCrypto)} />

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
          backgroundColor: danger ? `${colors.destructive}1a` : colors.accent,
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

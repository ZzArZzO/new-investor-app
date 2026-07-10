import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { fmtEur } from "@/lib/date";
import { fvSeries, feeErosion } from "@/lib/tool-math";
import { useAppState } from "@/lib/app-state";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, Card } from "@/components/ui";

interface StepperProps {
  label: string;
  value: number;
  display: string;
  onChange: (next: number) => void;
  step: number;
  min: number;
  max: number;
}

/** +/- stepper — keeps the tools dependency-free (no native slider package). */
function Stepper({ label, value, display, onChange, step, min, max }: StepperProps) {
  const { colors } = useTheme();

  function StepBtn({ text, next, disabled }: { text: string; next: number; disabled: boolean }) {
    return (
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={() => onChange(next)}
        style={({ pressed }) => ({
          width: 40,
          height: 40,
          borderRadius: RADIUS.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        })}
      >
        <AppText variant="bold" style={{ color: colors.primary, fontSize: 18, lineHeight: 22 }}>
          {text}
        </AppText>
      </Pressable>
    );
  }

  return (
    <View style={{ marginTop: 14 }}>
      <AppText variant="muted" style={{ fontSize: 13, marginBottom: 6 }}>
        {label}
      </AppText>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <StepBtn text="−" next={Math.max(min, value - step)} disabled={value <= min} />
        <AppText variant="bold" style={{ flex: 1, textAlign: "center", fontSize: 16 }}>
          {display}
        </AppText>
        <StepBtn text="+" next={Math.min(max, value + step)} disabled={value >= max} />
      </View>
    </View>
  );
}

function CompoundPlayground() {
  const { recordToolUse } = useAppState();
  const { colors } = useTheme();
  const [monthly, setMonthly] = useState(100);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(6);

  // Any interaction with a tool earns the Tinkerer badge, same as web.
  const touched = monthly !== 100 || years !== 20 || rate !== 6;
  useEffect(() => {
    if (touched) recordToolUse();
  }, [touched, recordToolUse]);

  const series = useMemo(() => fvSeries(monthly, years, rate), [monthly, years, rate]);
  const total = series[series.length - 1] ?? 0;
  const contributed = monthly * 12 * years;
  const growth = Math.max(0, total - contributed);

  return (
    <Card>
      <AppText variant="kicker">Compound interest playground</AppText>
      <AppText variant="muted" style={{ marginTop: 6 }}>
        What steady monthly investing could grow into. Not a prediction — a way to feel how time and rate matter.
      </AppText>

      <Stepper
        label="Monthly amount"
        value={monthly}
        display={fmtEur(monthly)}
        onChange={setMonthly}
        step={25}
        min={25}
        max={1000}
      />
      <Stepper label="Years" value={years} display={`${years} years`} onChange={setYears} step={5} min={5} max={40} />
      <Stepper
        label="Average yearly return"
        value={rate}
        display={`${rate}%`}
        onChange={setRate}
        step={1}
        min={0}
        max={12}
      />

      <View
        style={{
          marginTop: 18,
          borderRadius: RADIUS.md,
          backgroundColor: colors.accent,
          paddingHorizontal: 14,
          paddingVertical: 12,
          gap: 4,
        }}
      >
        <AppText style={{ color: colors.accentForeground }}>
          You’d put in{" "}
          <AppText variant="bold" style={{ color: colors.accentForeground }}>
            {fmtEur(contributed)}
          </AppText>
        </AppText>
        <AppText style={{ color: colors.accentForeground }}>
          It could grow to{" "}
          <AppText variant="bold" style={{ color: colors.accentForeground, fontSize: 17 }}>
            {fmtEur(Math.round(total))}
          </AppText>
        </AppText>
        <AppText variant="muted" style={{ fontSize: 13 }}>
          {fmtEur(Math.round(growth))} of that is growth, not contributions.
        </AppText>
      </View>
    </Card>
  );
}

function FeeEroder() {
  const { recordToolUse } = useAppState();
  const { colors } = useTheme();
  const [fee, setFee] = useState(1.5);

  useEffect(() => {
    if (fee !== 1.5) recordToolUse();
  }, [fee, recordToolUse]);

  const result = useMemo(() => feeErosion(10000, 6, fee, 30), [fee]);

  return (
    <Card>
      <AppText variant="kicker">Fee eroder</AppText>
      <AppText variant="muted" style={{ marginTop: 6 }}>
        €10,000 invested for 30 years at 6% average growth. Watch what the yearly fee quietly eats.
      </AppText>

      <Stepper
        label="Yearly fee"
        value={fee}
        display={`${fee.toFixed(1)}%`}
        onChange={(v) => setFee(Math.round(v * 10) / 10)}
        step={0.1}
        min={0.1}
        max={3}
      />

      <View
        style={{
          marginTop: 18,
          borderRadius: RADIUS.md,
          backgroundColor: colors.amberSoft,
          paddingHorizontal: 14,
          paddingVertical: 12,
          gap: 4,
        }}
      >
        <AppText style={{ color: colors.amber }}>
          With this fee you end at{" "}
          <AppText variant="bold" style={{ color: colors.amber }}>
            {fmtEur(Math.round(result.high))}
          </AppText>
        </AppText>
        <AppText style={{ color: colors.amber }}>
          A 0.2% low-cost fund ends at{" "}
          <AppText variant="bold" style={{ color: colors.amber }}>
            {fmtEur(Math.round(result.low))}
          </AppText>
        </AppText>
        <AppText variant="bold" style={{ color: colors.amber, marginTop: 2 }}>
          Fees cost you {fmtEur(Math.round(result.lost))}.
        </AppText>
      </View>
    </Card>
  );
}

export default function ToolsScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 32, gap: 14 }}
    >
      <AppText variant="heading">Tools</AppText>
      <CompoundPlayground />
      <FeeEroder />
      <AppText variant="muted" style={{ textAlign: "center", fontSize: 12, marginTop: 4 }}>
        Scam spotter, portfolio sandbox and allocation tools are coming to mobile next.
      </AppText>
    </ScrollView>
  );
}

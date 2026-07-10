import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { fmtEur } from "@/lib/date";
import { feeErosion } from "@/lib/tool-math";
import { useAppState } from "@/lib/app-state";
import { RADIUS, useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";
import { Stepper } from "@/components/stepper";
import { ToolShell } from "@/components/tools/tool-shell";

export function FeeEroder() {
  const { recordToolUse } = useAppState();
  const { colors } = useTheme();
  const [fee, setFee] = useState(1.5);

  useEffect(() => {
    if (fee !== 1.5) recordToolUse();
  }, [fee, recordToolUse]);

  const result = useMemo(() => feeErosion(10000, 6, fee, 30), [fee]);

  return (
    <ToolShell
      icon="🧾"
      title="Fee eroder"
      subtitle="€10,000 invested for 30 years at 6% average growth. Watch what the yearly fee quietly eats."
      note="Illustrative comparison before tax. The point is the mechanism: fees compound against you just like returns compound for you."
    >
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
    </ToolShell>
  );
}

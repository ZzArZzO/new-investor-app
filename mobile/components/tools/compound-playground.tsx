import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { fmtEur } from "@/lib/date";
import { fvSeries } from "@/lib/tool-math";
import { useAppState } from "@/lib/app-state";
import { AppText } from "@/components/ui";
import { PathChart } from "@/components/tools/path-chart";
import { StatTile } from "@/components/stat-tile";
import { Stepper } from "@/components/stepper";
import { ToolShell } from "@/components/tools/tool-shell";

export function CompoundPlayground() {
  const { recordToolUse } = useAppState();
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
    <ToolShell
      icon="📈"
      title="Compound interest playground"
      subtitle="What steady monthly investing could grow into. Not a prediction, a way to feel how time and rate matter."
      note="Illustrative maths only, before tax and inflation. Real returns vary year to year and can be negative."
    >
      <Stepper label="Monthly amount" value={monthly} display={fmtEur(monthly)} onChange={setMonthly} step={25} min={25} max={1000} />
      <Stepper label="Years" value={years} display={`${years} years`} onChange={setYears} step={5} min={5} max={40} />
      <Stepper label="Average yearly return" value={rate} display={`${rate}%`} onChange={setRate} step={1} min={0} max={12} />

      <PathChart path={series} style={{ marginTop: 14 }} />

      <View style={{ marginTop: 10, flexDirection: "row", gap: 10 }}>
        <StatTile label="You put in" value={fmtEur(contributed)} />
        <StatTile label="Growth" value={fmtEur(Math.round(growth))} />
        <StatTile label="Ends near" value={fmtEur(Math.round(total))} />
      </View>
      <AppText variant="muted" style={{ marginTop: 8, fontSize: 13, lineHeight: 18 }}>
        {fmtEur(Math.round(growth))} of the end amount is growth, not contributions.
      </AppText>
    </ToolShell>
  );
}

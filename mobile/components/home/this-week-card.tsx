import { useMemo } from "react";

import { WEEKLY_ITEMS } from "@/content/weekly-items";
import { pickForWeek } from "@/lib/date";
import { useAppState } from "@/lib/app-state";
import { FONTS } from "@/lib/theme";
import { AppText, Card } from "@/components/ui";
import { CardSkeleton } from "@/components/skeleton";

const KIND_LABEL = { concept: "Concept", myth: "Myth vs fact", tip: "Tip of the week" } as const;

export function ThisWeekCard() {
  const { hydrated } = useAppState();
  const item = useMemo(() => pickForWeek(WEEKLY_ITEMS), []);

  if (!hydrated) return <CardSkeleton lines={2} />;

  return (
    <Card>
      <AppText variant="kicker">This week · {KIND_LABEL[item.kind]}</AppText>
      <AppText style={{ marginTop: 8, fontFamily: FONTS.bodySemiBold, fontSize: 16, lineHeight: 22 }}>
        {item.title}
      </AppText>
      <AppText variant="muted" style={{ marginTop: 4 }}>
        {item.body}
      </AppText>
    </Card>
  );
}

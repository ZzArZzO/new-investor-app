import { useRouter } from "expo-router";
import { Pressable } from "react-native";

import { fmtEur } from "@/lib/date";
import { useAppState } from "@/lib/app-state";
import { AppText, Card } from "@/components/ui";

/** Home link card to the tracker, derived read-only from holdings. */
export function TrackerSnapshotCard() {
  const router = useRouter();
  const { state, hydrated } = useAppState();
  if (!hydrated) return null;

  const contributed = state.holdings.reduce((sum, h) => sum + h.contributed, 0);
  const empty = state.holdings.length === 0;

  return (
    <Pressable accessibilityRole="button" onPress={() => router.push("/tracker")}>
      {({ pressed }) => (
        <Card style={{ opacity: pressed ? 0.8 : 1 }}>
          <AppText variant="kicker">Tracker · your plan on paper</AppText>
          <AppText variant="bold" style={{ marginTop: 8 }}>
            {empty
              ? "Start tracking what you hold, by asset type, no prices, nothing connected."
              : `${fmtEur(contributed)} contributed across ${state.holdings.length} holding${state.holdings.length === 1 ? "" : "s"}.`}
          </AppText>
          <AppText variant="muted" style={{ marginTop: 4 }}>
            Self-reported numbers only. Log contributions to build the habit.
          </AppText>
        </Card>
      )}
    </Pressable>
  );
}

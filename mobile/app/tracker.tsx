import { Stack } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { HOLDING_TYPES, holdingTypeMeta } from "@/content/holdings";
import { fmtEur, todayStr } from "@/lib/date";
import { useAppState } from "@/lib/app-state";
import { holdingColor } from "@/lib/holding-colors";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card } from "@/components/ui";
import { Donut } from "@/components/donut";
import { AddHoldingForm } from "@/components/tracker/add-holding-form";

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
      <AppText variant="bold" style={{ marginTop: 2, fontSize: 15, color: warn ? colors.amber : undefined }}>
        {value}
      </AppText>
    </View>
  );
}

export default function TrackerScreen() {
  const { colors } = useTheme();
  const { state, hydrated, removeHolding, logContribution } = useAppState();

  const summary = useMemo(() => {
    const { holdings } = state;
    const contributed = holdings.reduce((sum, h) => sum + h.contributed, 0);
    const hasValues = holdings.some((h) => typeof h.value === "number");
    const value = holdings.reduce((sum, h) => sum + (h.value ?? h.contributed), 0);
    const byType = HOLDING_TYPES.map((t) => ({
      ...t,
      total: holdings.filter((h) => h.type === t.id).reduce((sum, h) => sum + h.contributed, 0),
    })).filter((x) => x.total > 0);
    return { contributed, hasValues, value, byType };
  }, [state]);

  if (!hydrated) return null;

  const loggedToday = state.contributions.last === todayStr();
  const empty = state.holdings.length === 0;

  return (
    <>
      <Stack.Screen options={{ title: "Tracker" }} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 40, gap: 14 }}>
        {!empty && (
          <Card style={{ padding: 16 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <StatTile label="You've put in" value={fmtEur(summary.contributed)} />
              {summary.hasValues && <StatTile label="Value now" value={fmtEur(summary.value)} />}
              {summary.hasValues && (
                <StatTile
                  label="Difference"
                  value={fmtEur(summary.value - summary.contributed)}
                  warn={summary.value < summary.contributed}
                />
              )}
            </View>
            <View style={{ marginTop: 14, flexDirection: "row", alignItems: "center", gap: 16 }}>
              <Donut
                size={110}
                slices={summary.byType.map((d) => ({
                  value: (d.total / summary.contributed) * 100,
                  color: holdingColor(d.id, colors),
                }))}
              />
              <View style={{ flex: 1, gap: 8 }}>
                {summary.byType.map((d) => (
                  <View key={d.id} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: holdingColor(d.id, colors) }} />
                    <AppText style={{ flex: 1, fontSize: 13, lineHeight: 18 }}>{d.label}</AppText>
                    <AppText variant="bold" style={{ fontSize: 13, color: colors.mutedForeground }}>
                      {Math.round((d.total / summary.contributed) * 100)}%
                    </AppText>
                  </View>
                ))}
              </View>
            </View>
            <AppText variant="muted" style={{ marginTop: 12, fontSize: 11.5, lineHeight: 16, fontStyle: "italic" }}>
              You enter your own numbers; the app connects to nothing and fetches no prices. Illustrative, not advice.
            </AppText>
          </Card>
        )}

        <Card>
          <AppText variant="kicker">Monthly habit · dollar-cost averaging</AppText>
          <AppText variant="bold" style={{ marginTop: 8 }}>
            {loggedToday
              ? "✓ Logged today, the boring habit is what does the work."
              : "Invested this month? Log it to build the habit."}
          </AppText>
          <AppText variant="muted" style={{ marginTop: 4 }}>
            Contributions logged: {state.contributions.count} · streak 🔥 {state.streak.count || 0}
          </AppText>
          <Btn label="Log a contribution (+10 XP)" disabled={loggedToday} onPress={logContribution} style={{ marginTop: 12 }} />
        </Card>

        {empty ? (
          <View
            style={{
              borderRadius: RADIUS["2xl"],
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: colors.border,
              padding: 24,
            }}
          >
            <AppText variant="muted" style={{ textAlign: "center" }}>
              No holdings yet. Add what you already hold, or plan to, below. By asset type, no prices needed.
            </AppText>
          </View>
        ) : (
          <Card style={{ padding: 16 }}>
            <AppText variant="bold" style={{ fontSize: 15, marginBottom: 4 }}>
              Your holdings
            </AppText>
            {state.holdings.map((h, idx) => (
              <View
                key={h.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingVertical: 12,
                  borderTopWidth: idx === 0 ? 0 : 1,
                  borderTopColor: colors.border,
                }}
              >
                <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: holdingColor(h.type, colors) }} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <AppText style={{ fontFamily: FONTS.bodySemiBold, fontSize: 14, lineHeight: 19 }} >
                    {h.label}
                  </AppText>
                  <AppText variant="muted" style={{ fontSize: 12, lineHeight: 16 }}>
                    {holdingTypeMeta(h.type)?.label} · in {fmtEur(h.contributed)}
                    {typeof h.value === "number" ? ` · now ${fmtEur(h.value)}` : ""}
                  </AppText>
                </View>
                <Pressable accessibilityRole="button" onPress={() => removeHolding(h.id)} hitSlop={8}>
                  <AppText variant="muted" style={{ fontSize: 13, fontFamily: FONTS.bodySemiBold }}>
                    Remove
                  </AppText>
                </Pressable>
              </View>
            ))}
          </Card>
        )}

        <AddHoldingForm />
      </ScrollView>
    </>
  );
}

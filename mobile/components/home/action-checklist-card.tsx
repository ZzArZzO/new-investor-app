import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { ACTION_STEPS } from "@/content/action-steps";
import { useAppState } from "@/lib/app-state";
import { hapticSelect } from "@/lib/haptics";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, Card, ProgressBar } from "@/components/ui";
import { CardSkeleton } from "@/components/skeleton";

export function ActionChecklistCard() {
  const router = useRouter();
  const { colors } = useTheme();
  const { state, hydrated, toggleActionStep } = useAppState();
  if (!hydrated) return <CardSkeleton lines={3} />;

  const doneCount = ACTION_STEPS.filter((s) => state.actions.includes(s.id)).length;
  const pct = Math.round((doneCount / ACTION_STEPS.length) * 100);

  function handleStep(id: string, route: string | undefined, done: boolean) {
    hapticSelect();
    toggleActionStep(id);
    // /compare is the only routed step today (stack screen, reachable from Tools too).
    if (!done && route === "/compare") router.push("/compare");
  }

  return (
    <Card>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <AppText variant="heading" style={{ fontSize: 19, lineHeight: 25, flexShrink: 1 }}>
          Getting started roadmap
        </AppText>
        <AppText variant="bold" style={{ color: colors.mutedForeground, fontSize: 13 }}>
          {doneCount} of {ACTION_STEPS.length} ({pct}%)
        </AppText>
      </View>
      <ProgressBar value={pct} style={{ marginTop: 12 }} />
      <View style={{ marginTop: 14, gap: 14 }}>
        {ACTION_STEPS.map((step) => {
          const done = state.actions.includes(step.id);
          return (
            <Pressable
              key={step.id}
              accessibilityRole="button"
              accessibilityState={{ checked: done }}
              onPress={() => handleStep(step.id, step.route, done)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderWidth: 1.5,
                  borderColor: done ? colors.primary : colors.mutedForeground,
                  backgroundColor: done ? colors.primary : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {done && (
                  <AppText variant="bold" style={{ color: colors.primaryForeground, fontSize: 13, lineHeight: 17 }}>
                    ✓
                  </AppText>
                )}
              </View>
              <View style={{ flex: 1 }}>
                {step.kicker && (
                  <AppText variant="kicker" style={{ fontSize: 11, lineHeight: 15 }}>
                    {step.kicker}
                  </AppText>
                )}
                <AppText
                  style={{
                    fontFamily: FONTS.bodySemiBold,
                    fontSize: 14.5,
                    lineHeight: 20,
                    marginTop: 1,
                    color: done ? colors.mutedForeground : colors.foreground,
                    textDecorationLine: done ? "line-through" : "none",
                  }}
                >
                  {step.label}
                </AppText>
                <AppText variant="muted" style={{ fontSize: 12.5, lineHeight: 17 }}>
                  {step.detail}
                </AppText>
              </View>
              {step.route && (
                <AppText style={{ color: colors.mutedForeground, fontSize: 17, lineHeight: 22 }}>→</AppText>
              )}
            </Pressable>
          );
        })}
      </View>
      <AppText variant="muted" style={{ marginTop: 14, fontSize: 11.5, lineHeight: 16, fontStyle: "italic" }}>
        The generic steps everyone takes, not a recommendation to buy anything. Only ever use regulated, licensed
        platforms.
      </AppText>
    </Card>
  );
}

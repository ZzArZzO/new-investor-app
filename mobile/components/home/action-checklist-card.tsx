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
      <AppText variant="kicker">
        Your first investment · {doneCount}/{ACTION_STEPS.length} steps
      </AppText>
      <ProgressBar value={pct} style={{ marginTop: 12 }} />
      <View style={{ marginTop: 12, gap: 6 }}>
        {ACTION_STEPS.map((step) => {
          const done = state.actions.includes(step.id);
          return (
            <Pressable
              key={step.id}
              accessibilityRole="button"
              onPress={() => handleStep(step.id, step.route, done)}
              style={({ pressed }) => ({
                flexDirection: "row",
                gap: 12,
                borderRadius: RADIUS.xl,
                borderWidth: 1,
                borderColor: pressed ? colors.primary : colors.border,
                padding: 12,
              })}
            >
              <View
                style={{
                  marginTop: 2,
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: done ? colors.primary : colors.border,
                  backgroundColor: done ? colors.primary : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {done && (
                  <AppText variant="bold" style={{ color: colors.primaryForeground, fontSize: 12, lineHeight: 15 }}>
                    ✓
                  </AppText>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <AppText
                  style={{
                    fontFamily: FONTS.bodySemiBold,
                    fontSize: 14,
                    lineHeight: 19,
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
            </Pressable>
          );
        })}
      </View>
      <AppText variant="muted" style={{ marginTop: 12, fontSize: 11.5, lineHeight: 16, fontStyle: "italic" }}>
        The generic steps everyone takes, not a recommendation to buy anything. Only ever use regulated, licensed
        platforms.
      </AppText>
    </Card>
  );
}

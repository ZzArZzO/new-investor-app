import { useMemo, useState } from "react";
import { View } from "react-native";

import { SCAM_SCENARIOS } from "@/content/scam-scenarios";
import { daySeed, todayStr } from "@/lib/date";
import { useAppState } from "@/lib/app-state";
import { RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card } from "@/components/ui";

const CHANNEL_LABEL = { DM: "Direct message", email: "Email", popup: "Pop-up" } as const;

export function TodayScamCard() {
  const { colors } = useTheme();
  const { state, hydrated, playDailyScam } = useAppState();
  const today = todayStr();
  const scam = useMemo(() => SCAM_SCENARIOS[daySeed(today) % SCAM_SCENARIOS.length], [today]);
  const [picked, setPicked] = useState<boolean | null>(null);

  if (!hydrated) return null;

  const playedToday = state.scamDaily.last === today;

  if (playedToday && picked === null) {
    return (
      <Card>
        <AppText variant="kicker">Today’s scam · safety reflex</AppText>
        <AppText variant="bold" style={{ marginTop: 8 }}>
          ✓ Done for today, you trained your eye. Back tomorrow.
        </AppText>
        <AppText variant="muted" style={{ marginTop: 4 }}>
          Spotting streak: 🛡️ {state.scamDaily.streak} (best {state.scamDaily.best})
        </AppText>
      </Card>
    );
  }

  function pick(saidScam: boolean) {
    if (playedToday) return;
    setPicked(saidScam);
    playDailyScam();
  }

  const answered = picked !== null;
  const correct = answered && picked === scam.isScam;

  return (
    <Card>
      <AppText variant="kicker">Today’s scam · safety reflex</AppText>

      <View style={{ marginTop: 12, borderRadius: RADIUS.xl, borderWidth: 1, borderColor: colors.border, overflow: "hidden" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: colors.muted,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: colors.mutedForeground,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppText variant="bold" style={{ color: colors.background, fontSize: 13, lineHeight: 17 }}>
              {scam.from.slice(0, 1).toUpperCase()}
            </AppText>
          </View>
          <AppText variant="bold" style={{ fontSize: 13, flex: 1 }}>
            {scam.from}
          </AppText>
          <AppText variant="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {CHANNEL_LABEL[scam.channel]}
          </AppText>
        </View>
        <View style={{ paddingHorizontal: 14, paddingVertical: 14, backgroundColor: colors.background }}>
          <AppText style={{ fontSize: 14.5, lineHeight: 21 }}>{scam.body}</AppText>
        </View>
      </View>

      <View style={{ marginTop: 12, flexDirection: "row", gap: 10 }}>
        <Btn label="✅ Safe" variant="outline" disabled={answered} onPress={() => pick(false)} style={{ flex: 1 }} />
        <Btn label="🚩 Scam" variant="outline" disabled={answered} onPress={() => pick(true)} style={{ flex: 1 }} />
      </View>

      {answered && (
        <View
          style={{
            marginTop: 12,
            borderRadius: RADIUS.md,
            paddingHorizontal: 14,
            paddingVertical: 12,
            backgroundColor: correct ? colors.accent : `${colors.destructive}1a`,
          }}
        >
          <AppText style={{ color: correct ? colors.accentForeground : colors.destructive, fontSize: 14, lineHeight: 20 }}>
            <AppText variant="bold" style={{ color: correct ? colors.accentForeground : colors.destructive, fontSize: 14 }}>
              {correct ? "✓ Correct, " : "✕ Not quite, "}
              {scam.isScam ? "this is a scam." : "this one is safe."}
            </AppText>{" "}
            {scam.why}
          </AppText>
          {scam.flags.length > 0 && (
            <View style={{ marginTop: 8, gap: 4 }}>
              {scam.flags.map((f) => (
                <View key={f} style={{ flexDirection: "row", gap: 6 }}>
                  <AppText style={{ color: colors.amber, fontSize: 13, lineHeight: 19 }}>⚑</AppText>
                  <AppText
                    style={{
                      flex: 1,
                      fontSize: 13,
                      lineHeight: 19,
                      color: correct ? colors.accentForeground : colors.destructive,
                    }}
                  >
                    {f}
                  </AppText>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </Card>
  );
}

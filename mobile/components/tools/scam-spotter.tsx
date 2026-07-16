import { useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { SCAM_SCENARIOS } from "@/content/scam-scenarios";
import { daySeed, todayStr } from "@/lib/date";
import { useAppState } from "@/lib/app-state";
import { hapticError, hapticSuccess } from "@/lib/haptics";
import { FONTS, RADIUS, useTheme, withAlpha } from "@/lib/theme";
import { CHANNEL_LABEL } from "@/lib/scam-labels";
import { AppText, Btn } from "@/components/ui";
import { ToolShell } from "@/components/tools/tool-shell";

/** Messages per round. Short rounds keep the game snappy; "Play again" serves the next batch. */
const ROUND_SIZE = 8;

export function ScamSpotter() {
  const { colors } = useTheme();
  const { recordToolUse, recordPerfectScamRound } = useAppState();
  const n = SCAM_SCENARIOS.length;
  const rounds = Math.ceil(n / ROUND_SIZE);
  const [round, setRound] = useState(0);
  const order = useMemo(() => {
    const start = daySeed(todayStr()) % n;
    return Array.from({ length: n }, (_, k) => (start + k) % n);
  }, [n]);
  const roundOrder = order.slice(round * ROUND_SIZE, round * ROUND_SIZE + ROUND_SIZE);
  const len = roundOrder.length;

  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<"safe" | "scam" | null>(null);
  const [finished, setFinished] = useState(false);

  const sc = SCAM_SCENARIOS[roundOrder[i]];

  function choose(choice: "safe" | "scam") {
    if (answer) return;
    recordToolUse();
    const ok = (choice === "scam") === sc.isScam;
    if (ok) hapticSuccess();
    else hapticError();
    setAnswer(choice);
    if (ok) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 < len) {
      setI(i + 1);
      setAnswer(null);
    } else {
      if (score === len) recordPerfectScamRound();
      setFinished(true);
    }
  }

  function playAgain() {
    setRound((round + 1) % rounds);
    setI(0);
    setScore(0);
    setAnswer(null);
    setFinished(false);
  }

  const wasCorrect = answer !== null && (answer === "scam") === sc.isScam;

  function ChoiceBtn({ choice, label }: { choice: "safe" | "scam"; label: string }) {
    const isRightAnswer = (choice === "scam") === sc.isScam;
    const border =
      answer && isRightAnswer ? colors.primary : answer === choice && !isRightAnswer ? colors.destructive : colors.border;
    const background =
      answer && isRightAnswer ? colors.accent : answer === choice && !isRightAnswer ? withAlpha(colors.destructive, 0.1) : colors.card;
    return (
      <Pressable
        accessibilityRole="button"
        disabled={!!answer}
        onPress={() => choose(choice)}
        style={{
          flex: 1,
          borderRadius: RADIUS.md,
          borderWidth: 1,
          borderColor: border,
          backgroundColor: background,
          paddingVertical: 14,
          alignItems: "center",
          opacity: answer && !isRightAnswer && answer !== choice ? 0.5 : 1,
        }}
      >
        <AppText style={{ fontFamily: FONTS.bodyMedium }}>{label}</AppText>
      </Pressable>
    );
  }

  return (
    <ToolShell
      icon="🕵️"
      title="Spot the scam"
      subtitle="Safe or scam? Decide, then see the red flags. This is about the traps, it names no coins and predicts no prices."
      note="Educational scenarios modelled on common real-world crypto scams. Rule of thumb: anything asking for your recovery phrase, or promising guaranteed returns, is a scam."
    >
      {finished ? (
        <View style={{ marginTop: 14 }}>
          <View
            style={{
              borderRadius: RADIUS.xl,
              backgroundColor: colors.accent,
              padding: 20,
              alignItems: "center",
            }}
          >
            <AppText style={{ fontSize: 32, lineHeight: 40 }}>{score === len ? "🏆" : "🕵️"}</AppText>
            <AppText variant="bold" style={{ marginTop: 4, color: colors.accentForeground }}>
              {score} / {len} correct
            </AppText>
            <AppText variant="muted" style={{ marginTop: 4, textAlign: "center", fontSize: 14 }}>
              {score === len
                ? "Perfect round, you spotted every trap."
                : "Good practice. The red flags repeat: recovery-phrase requests, guaranteed returns, urgency, and send-to-receive-more."}
            </AppText>
          </View>
          <Btn label="Play again · fresh messages" onPress={playAgain} style={{ marginTop: 14 }} />
        </View>
      ) : (
        <View style={{ marginTop: 14 }}>
          <AppText variant="muted" style={{ fontFamily: FONTS.bodySemiBold, fontSize: 13, marginBottom: 10 }}>
            Message {i + 1} of {len} · score {score}
          </AppText>

          <View style={{ borderRadius: RADIUS.xl, borderWidth: 1, borderColor: colors.border, overflow: "hidden" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                backgroundColor: colors.muted,
                paddingHorizontal: 12,
                paddingVertical: 10,
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
                  {sc.from.slice(0, 1).toUpperCase()}
                </AppText>
              </View>
              <AppText variant="bold" style={{ fontSize: 13, flex: 1 }}>
                {sc.from}
              </AppText>
              <AppText variant="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {CHANNEL_LABEL[sc.channel] ?? sc.channel}
              </AppText>
            </View>
            <View style={{ paddingHorizontal: 14, paddingVertical: 14, backgroundColor: colors.background }}>
              <AppText style={{ fontSize: 14.5, lineHeight: 21 }}>{sc.body}</AppText>
            </View>
          </View>

          <View style={{ marginTop: 10, flexDirection: "row", gap: 10 }}>
            <ChoiceBtn choice="safe" label="✅ Safe" />
            <ChoiceBtn choice="scam" label="🚩 Scam" />
          </View>

          {answer && (
            <View
              style={{
                marginTop: 12,
                borderRadius: RADIUS.md,
                paddingHorizontal: 14,
                paddingVertical: 12,
                backgroundColor: wasCorrect ? colors.accent : withAlpha(colors.destructive, 0.1),
              }}
            >
              <AppText
                style={{ color: wasCorrect ? colors.accentForeground : colors.destructive, fontSize: 14.5, lineHeight: 21 }}
              >
                <AppText
                  variant="bold"
                  style={{ color: wasCorrect ? colors.accentForeground : colors.destructive, fontSize: 14.5 }}
                >
                  {wasCorrect ? "✓ Correct, " : "✕ Not quite, "}
                </AppText>
                {sc.isScam ? "this is a scam." : "this one is safe."} {sc.why}
              </AppText>
              {sc.flags.length > 0 && (
                <View style={{ marginTop: 8, gap: 4 }}>
                  {sc.flags.map((f) => (
                    <View key={f} style={{ flexDirection: "row", gap: 6 }}>
                      <AppText style={{ color: colors.amber, fontSize: 13, lineHeight: 19 }}>⚑</AppText>
                      <AppText
                        style={{
                          flex: 1,
                          fontSize: 13,
                          lineHeight: 19,
                          color: wasCorrect ? colors.accentForeground : colors.destructive,
                        }}
                      >
                        {f}
                      </AppText>
                    </View>
                  ))}
                </View>
              )}
              <Btn label={i + 1 < len ? "Next message →" : "See results"} onPress={next} style={{ marginTop: 12 }} />
            </View>
          )}
        </View>
      )}
    </ToolShell>
  );
}

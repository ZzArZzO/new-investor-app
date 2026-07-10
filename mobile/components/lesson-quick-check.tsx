import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { LessonCheck } from "@/content/types";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, FeedbackBox } from "@/components/ui";

interface LessonQuickCheckProps {
  checks: LessonCheck[];
  onAllAnswered: (allCorrect: boolean, missedIndices: number[]) => void;
}

/** Render with `key={lesson.id}` from the parent so state resets on lesson change. */
export function LessonQuickCheck({ checks, onAllAnswered }: LessonQuickCheckProps) {
  const { colors } = useTheme();
  const [answers, setAnswers] = useState<(number | null)[]>(() => checks.map(() => null));

  function pick(qi: number, oi: number) {
    if (answers[qi] !== null) return;
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
    if (next.every((a) => a !== null)) {
      const missed = checks.map((c, i) => (next[i] === c.a ? -1 : i)).filter((i) => i >= 0);
      onAllAnswered(missed.length === 0, missed);
    }
  }

  return (
    <View style={{ marginTop: 20 }}>
      <AppText variant="kicker">Quick check</AppText>
      <View style={{ marginTop: 10, gap: 20 }}>
        {checks.map((c, qi) => {
          const picked = answers[qi];
          const answered = picked !== null;
          return (
            <View key={qi}>
              <AppText variant="muted" style={{ fontFamily: FONTS.bodySemiBold, fontSize: 13, marginBottom: 4 }}>
                Question {qi + 1}
              </AppText>
              <AppText variant="bold" style={{ marginBottom: 10 }}>
                {c.q}
              </AppText>
              <View style={{ gap: 8 }}>
                {c.o.map((text, oi) => {
                  const isCorrect = oi === c.a;
                  const isPicked = oi === picked;
                  const border = answered && isCorrect ? colors.primary : answered && isPicked ? colors.destructive : colors.border;
                  const background =
                    answered && isCorrect ? colors.accent : answered && isPicked ? `${colors.destructive}1a` : colors.card;
                  return (
                    <Pressable
                      key={oi}
                      accessibilityRole="button"
                      disabled={answered}
                      onPress={() => pick(qi, oi)}
                      style={{
                        borderRadius: RADIUS.md,
                        borderWidth: 1,
                        borderColor: border,
                        backgroundColor: background,
                        paddingHorizontal: 16,
                        paddingVertical: 14,
                        opacity: answered && !isCorrect && !isPicked ? 0.5 : 1,
                      }}
                    >
                      <Text style={{ color: colors.foreground, fontFamily: FONTS.bodyMedium, fontSize: 15, lineHeight: 21 }}>
                        {text}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              {answered && (
                <FeedbackBox correct={picked === c.a}>
                  {picked === c.a ? "✓ Right. " : "Not quite. "}
                  {c.why}
                </FeedbackBox>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

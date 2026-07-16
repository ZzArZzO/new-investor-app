import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { QUIZ, scoreQuiz } from "@/content/quiz";
import type { PersonaKey } from "@/content/types";
import { useAppState } from "@/lib/app-state";
import { hapticSelect } from "@/lib/haptics";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, ProgressBar } from "@/components/ui";

const LETTERS: PersonaKey[] = ["A", "B", "C", "D"];

export default function QuizScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { setPersona } = useAppState();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PersonaKey[]>([]);

  const item = QUIZ[step];

  function choose(letter: PersonaKey) {
    hapticSelect();
    const next = [...answers];
    next[step] = letter;
    setAnswers(next);
    if (step + 1 < QUIZ.length) {
      setStep(step + 1);
    } else {
      setPersona(scoreQuiz(next));
      router.replace("/result");
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: "Investor type quiz" }} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32 }}>
        <AppText variant="muted" style={{ fontFamily: FONTS.bodySemiBold, fontSize: 13 }}>
          Question {step + 1} of {QUIZ.length}
        </AppText>
        <ProgressBar value={Math.round((step / QUIZ.length) * 100)} style={{ marginTop: 8, marginBottom: 20 }} />
        <AppText variant="heading">{item.q}</AppText>
        <View style={{ marginTop: 14, gap: 10 }}>
          {item.o.map((text, idx) => (
            <Pressable
              key={text}
              accessibilityRole="button"
              onPress={() => choose(LETTERS[idx])}
              style={({ pressed }) => ({
                borderRadius: RADIUS.md,
                borderWidth: 1,
                borderColor: pressed ? colors.primary : colors.border,
                backgroundColor: colors.card,
                paddingHorizontal: 16,
                paddingVertical: 14,
              })}
            >
              <AppText style={{ fontFamily: FONTS.bodyMedium }}>{text}</AppText>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

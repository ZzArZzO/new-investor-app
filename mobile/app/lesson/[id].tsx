import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { LESSONS } from "@/content/lessons";
import { LESSON_TOOLS } from "@/content/tools";
import { useAppState } from "@/lib/app-state";
import { RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn } from "@/components/ui";
import { LessonReading } from "@/components/lesson-reading";
import { LessonQuickCheck } from "@/components/lesson-quick-check";
import { TOOL_COMPONENTS } from "@/components/tools/tool-registry";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { completeLesson, queueReviewItems } = useAppState();
  const [readyToComplete, setReadyToComplete] = useState(false);

  const lesson = LESSONS.find((l) => l.id === id);
  const toolId = lesson ? LESSON_TOOLS[lesson.id] : undefined;
  const ToolComponent = toolId ? TOOL_COMPONENTS[toolId] : null;

  if (!lesson) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <AppText variant="muted">Lesson not found.</AppText>
      </View>
    );
  }

  function finish() {
    if (!lesson) return;
    completeLesson(lesson.id);
    router.back();
  }

  return (
    <>
      <Stack.Screen options={{ title: lesson.pillar }} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40 }}>
        <AppText variant="kicker">{lesson.pillar}</AppText>
        <AppText variant="heading" style={{ marginTop: 4 }}>
          {lesson.title}
        </AppText>

        <View
          style={{
            marginVertical: 14,
            borderRadius: RADIUS.md,
            paddingHorizontal: 14,
            paddingVertical: 12,
            backgroundColor: colors.accent,
          }}
        >
          <AppText style={{ color: colors.accentForeground }}>
            <AppText variant="bold" style={{ color: colors.accentForeground }}>
              The idea:
            </AppText>{" "}
            {lesson.core}
          </AppText>
        </View>

        {lesson.crypto && (
          <View
            style={{
              marginBottom: 14,
              borderRadius: RADIUS.md,
              paddingHorizontal: 14,
              paddingVertical: 12,
              backgroundColor: colors.amberSoft,
            }}
          >
            <AppText variant="bold" style={{ color: colors.amber, fontSize: 14, lineHeight: 20 }}>
              ⚠️ Crypto is high-risk. You can lose everything. Only ever use MiCA-licensed platforms, and never invest
              more than you can afford to lose.
            </AppText>
          </View>
        )}

        <LessonReading html={lesson.reading} />

        <View
          style={{
            marginVertical: 14,
            borderRadius: RADIUS.md,
            paddingHorizontal: 14,
            paddingVertical: 12,
            backgroundColor: colors.accent,
          }}
        >
          <AppText style={{ color: colors.accentForeground }}>
            <AppText variant="bold" style={{ color: colors.accentForeground }}>
              In real life:
            </AppText>{" "}
            {lesson.example}
          </AppText>
        </View>

        {ToolComponent && (
          <View style={{ marginVertical: 6 }}>
            <ToolComponent />
          </View>
        )}

        <LessonQuickCheck
          key={lesson.id}
          checks={lesson.check}
          onAllAnswered={(_, missed) => {
            setReadyToComplete(true);
            // Missed questions come back tomorrow as spaced-repetition review cards.
            if (missed.length > 0) queueReviewItems(missed.map((i) => `check:${lesson.id}:${i}`));
          }}
        />

        {readyToComplete && <Btn label="Complete lesson ✓" onPress={finish} style={{ marginTop: 20 }} />}

        <AppText
          variant="muted"
          style={{ marginTop: 24, paddingHorizontal: 4, textAlign: "center", fontSize: 11.5, lineHeight: 17 }}
        >
          Educational information, not personal financial advice. Investing involves risk, including loss of the money
          you invest. Crypto is high-risk and can go to zero.
        </AppText>
      </ScrollView>
    </>
  );
}

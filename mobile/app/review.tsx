import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import {
  FREE_REVIEW_CARDS_PER_DAY,
  dueReviewItems,
  remainingReviewQuota,
} from "@/lib/app-state-logic";
import { composeReviewSession, type ReviewCardData } from "@/lib/review-logic";
import { todayStr } from "@/lib/date";
import { useAppState } from "@/lib/app-state";
import { hapticError, hapticSuccess } from "@/lib/haptics";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card, FeedbackBox } from "@/components/ui";
import { CardSkeleton, Skeleton } from "@/components/skeleton";

export default function ReviewScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { state, hydrated, answerReviewCard } = useAppState();
  const today = todayStr();

  // The session is composed once after hydration and then held stable —
  // answering cards mutates state, and recomposing mid-session would shuffle it.
  const [session, setSession] = useState<ReviewCardData[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (!hydrated || session !== null) return;
    setSession(composeReviewSession(state, today, remainingReviewQuota(state, today)));
  }, [hydrated, session, state, today]);

  if (!hydrated || session === null) {
    return (
      <>
        <Stack.Screen options={{ title: "Review" }} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}>
          <Skeleton width={140} height={13} />
          <CardSkeleton lines={4} style={{ marginTop: 12 }} />
        </ScrollView>
      </>
    );
  }

  if (session.length === 0) {
    return (
      <>
        <Stack.Screen options={{ title: "Review" }} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}>
          <Card style={{ alignItems: "center" }}>
            <AppText variant="bold">✓ You’re done for today.</AppText>
            <AppText variant="muted" style={{ marginTop: 6, textAlign: "center" }}>
              {FREE_REVIEW_CARDS_PER_DAY} cards a day is the sweet spot, spacing works best in small daily doses. Come
              back tomorrow.
            </AppText>
          </Card>
        </ScrollView>
      </>
    );
  }

  if (index >= session.length) {
    return (
      <>
        <Stack.Screen options={{ title: "Review" }} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, gap: 14 }}>
          <Card style={{ alignItems: "center" }}>
            <AppText variant="bold">
              Session done, {correctCount} of {session.length} right. ✓
            </AppText>
            <AppText variant="muted" style={{ marginTop: 6, textAlign: "center" }}>
              Anything you missed comes back sooner; what you knew comes back later. That spacing is what makes it
              stick.
            </AppText>
          </Card>
          <Btn label="Back home" onPress={() => router.back()} />
        </ScrollView>
      </>
    );
  }

  const card = session[index];
  const answered = picked !== null;
  const wasCorrect = answered && picked === card.answer;

  const pick = (oi: number) => {
    if (answered) return;
    setPicked(oi);
    const correct = oi === card.answer;
    if (correct) {
      hapticSuccess();
      setCorrectCount((c) => c + 1);
    } else {
      hapticError();
    }
    answerReviewCard(card.id, correct);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Review" }} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32 }}>
        <AppText variant="muted" style={{ fontSize: 13 }}>
          Card {index + 1} of {session.length} · +3 XP each
        </AppText>

        <Card style={{ marginTop: 12 }}>
          <AppText variant="bold">{card.question}</AppText>
          <View style={{ marginTop: 12, gap: 8 }}>
            {card.options.map((text, oi) => {
              const isCorrect = oi === card.answer;
              const isPicked = oi === picked;
              const border =
                answered && isCorrect ? colors.primary : answered && isPicked ? colors.destructive : colors.border;
              const background =
                answered && isCorrect ? colors.accent : answered && isPicked ? `${colors.destructive}1a` : colors.card;
              return (
                <Pressable
                  key={oi}
                  accessibilityRole="button"
                  disabled={answered}
                  onPress={() => pick(oi)}
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
                  <AppText style={{ fontFamily: FONTS.bodyMedium }}>{text}</AppText>
                </Pressable>
              );
            })}
          </View>
          {answered && (
            <FeedbackBox correct={wasCorrect}>
              {wasCorrect ? "✓ Right. " : "Not quite. "}
              {card.why}
            </FeedbackBox>
          )}
        </Card>

        {answered && (
          <Btn
            label={index + 1 >= session.length ? "Finish" : "Next card"}
            onPress={() => {
              setIndex((i) => i + 1);
              setPicked(null);
            }}
            style={{ marginTop: 14 }}
          />
        )}
      </ScrollView>
    </>
  );
}

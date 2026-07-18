import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DAILY_CARDS } from "@/content/daily-cards";
import { PERSONAS } from "@/content/quiz";
import { QUOTES } from "@/content/quotes";
import { dueReviewItems, remainingReviewQuota } from "@/lib/app-state-logic";
import { daySeed, todayStr } from "@/lib/date";
import { useAppState } from "@/lib/app-state";
import { hapticError, hapticSuccess } from "@/lib/haptics";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card, FeedbackBox, SectionHeader } from "@/components/ui";
import { CardSkeleton } from "@/components/skeleton";
import { ActionChecklistCard } from "@/components/home/action-checklist-card";
import { ThisWeekCard } from "@/components/home/this-week-card";
import { TodayScamCard } from "@/components/home/today-scam-card";
import { TrackerSnapshotCard } from "@/components/home/tracker-snapshot-card";

function Masthead() {
  return (
    <View>
      <AppText variant="kicker">Daily edition</AppText>
      <AppText variant="heading" style={{ marginTop: 4, fontSize: 34, lineHeight: 40 }}>
        New Investor
      </AppText>
      <AppText variant="muted" style={{ marginTop: 4, fontSize: 15, lineHeight: 21 }}>
        Your thoughtful path to building long-term wealth.
      </AppText>
    </View>
  );
}

function QuoteBlock() {
  const { colors } = useTheme();
  const quote = QUOTES[daySeed(todayStr()) % QUOTES.length];
  return (
    <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, paddingVertical: 16 }}>
      <AppText style={{ fontFamily: FONTS.headingMedium, fontSize: 18, lineHeight: 26 }}>
        “{quote.text}”
      </AppText>
      <AppText variant="muted" style={{ marginTop: 6, fontSize: 13 }}>
        {quote.author}
      </AppText>
    </View>
  );
}

function HeroCard() {
  const router = useRouter();
  const { colors } = useTheme();
  const { state, hydrated } = useAppState();

  if (!hydrated) return <CardSkeleton lines={3} />;

  const persona = state.persona ? PERSONAS[state.persona] : null;

  // Once the type is known, the onboarding pitch gives way to the user's profile.
  if (persona) {
    return (
      <Card>
        <AppText variant="kicker">Your investor type</AppText>
        <AppText variant="heading" style={{ marginTop: 8, fontSize: 24, lineHeight: 30 }}>
          {persona.emoji} {persona.name}
        </AppText>
        <AppText variant="muted" style={{ marginTop: 6, fontSize: 14.5, lineHeight: 21 }}>
          {persona.desc}
        </AppText>
        <Btn label="See your profile" onPress={() => router.push(`/types/${persona.slug}`)} style={{ marginTop: 14 }} />
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/quiz")}
          hitSlop={8}
          style={{ alignSelf: "center", marginTop: 10, paddingVertical: 6 }}
        >
          <AppText variant="bold" style={{ color: colors.mutedForeground, fontSize: 13 }}>
            Retake the quiz
          </AppText>
        </Pressable>
      </Card>
    );
  }

  return (
    <Card>
      <AppText variant="kicker">Featured diagnostic</AppText>
      <AppText variant="heading" style={{ marginTop: 6, fontSize: 24, lineHeight: 30 }}>
        Find your investor type
      </AppText>
      <AppText variant="muted" style={{ marginTop: 8, fontSize: 14.5, lineHeight: 21 }}>
        A two-minute quiz sorts you into one of four investor types, with the strengths and blind spots of each. No
        hype, no hot tips.
      </AppText>
      <Btn label="Take the quiz" onPress={() => router.push("/quiz")} style={{ marginTop: 16 }} />
    </Card>
  );
}

function DailyQuestionCard() {
  const { state, hydrated, answerDailyQuestion } = useAppState();
  const today = todayStr();
  const card = useMemo(() => DAILY_CARDS[daySeed(today) % DAILY_CARDS.length], [today]);
  const [picked, setPicked] = useState<boolean | null>(null);

  if (!hydrated) return <CardSkeleton lines={3} />;

  const answeredToday = state.daily.last === today;
  const freezes = state.streak.freezes ?? 0;

  if (answeredToday && picked === null) {
    return (
      <Card>
        <AppText variant="kicker">Daily trivia · keep your streak</AppText>
        <AppText variant="bold" style={{ marginTop: 8 }}>
          ✓ Done for today, come back tomorrow to keep the streak going.
        </AppText>
        <AppText variant="muted" style={{ marginTop: 4 }}>
          Current streak: 🔥 {state.streak.count || 0}
          {freezes > 0 ? ` · 🧊 ${freezes} freeze${freezes === 1 ? "" : "s"}` : ""}
        </AppText>
      </Card>
    );
  }

  function pick(value: boolean) {
    if (answeredToday) return;
    if (value === card.a) hapticSuccess();
    else hapticError();
    setPicked(value);
    answerDailyQuestion();
  }

  const showFeedback = picked !== null;
  const correct = showFeedback && picked === card.a;

  return (
    <Card>
      <AppText variant="kicker">Daily trivia · keep your streak</AppText>
      <AppText variant="bold" style={{ marginTop: 8 }}>
        {card.q}
      </AppText>
      <View style={{ marginTop: 12, flexDirection: "row", gap: 10 }}>
        <Btn label="True" variant="outline" disabled={showFeedback} onPress={() => pick(true)} style={{ flex: 1 }} />
        <Btn label="False" variant="outline" disabled={showFeedback} onPress={() => pick(false)} style={{ flex: 1 }} />
      </View>
      {showFeedback && (
        <FeedbackBox correct={correct}>
          {correct ? "✓ Right. " : "Not quite. "}
          {card.why}
        </FeedbackBox>
      )}
    </Card>
  );
}

/** Home entry point for the spaced-repetition deck, appears once there's anything to review. */
function ReviewCard() {
  const router = useRouter();
  const { state, hydrated } = useAppState();
  if (!hydrated) return null;

  const today = todayStr();
  // Nothing to review until some learning has happened.
  if (state.done.length === 0) return null;

  const due = dueReviewItems(state, today).length;
  const quota = remainingReviewQuota(state, today);

  if (quota === 0) {
    return (
      <>
        <SectionHeader>Knowledge maintenance</SectionHeader>
        <Card>
          <AppText variant="kicker">Daily reviews</AppText>
          <AppText variant="bold" style={{ marginTop: 8 }}>
            ✓ Reviewed today, spaced repetition works best in small daily doses.
          </AppText>
        </Card>
      </>
    );
  }

  return (
    <>
      <SectionHeader>Knowledge maintenance</SectionHeader>
      <Card>
        <AppText variant="kicker">Daily reviews</AppText>
        <AppText variant="heading" style={{ marginTop: 6, fontSize: 21, lineHeight: 27 }}>
          {due > 0 ? `Review due: ${due} card${due === 1 ? "" : "s"}` : "A refresher round is ready"}
        </AppText>
        <AppText variant="muted" style={{ marginTop: 6, fontSize: 14, lineHeight: 20 }}>
          A quick two-minute refresh to lock core definitions in long-term memory. +3 XP per card.
        </AppText>
        <Btn label="Start 2-min refresh" onPress={() => router.push("/review")} style={{ marginTop: 14 }} />
      </Card>
    </>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top + 12,
        paddingHorizontal: 16,
        paddingBottom: 32,
        gap: 14,
      }}
    >
      <Masthead />
      <QuoteBlock />
      <HeroCard />
      <SectionHeader>Today’s question</SectionHeader>
      <DailyQuestionCard />
      <ReviewCard />
      <SectionHeader>Today’s scam challenge</SectionHeader>
      <TodayScamCard />
      <SectionHeader>Your first investment</SectionHeader>
      <ActionChecklistCard />
      <SectionHeader>Your portfolio</SectionHeader>
      <TrackerSnapshotCard />
      <ThisWeekCard />
      <DisclaimerPanel />
    </ScrollView>
  );
}

function DisclaimerPanel() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        borderRadius: RADIUS.xl,
        backgroundColor: colors.muted,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginTop: 8,
      }}
    >
      <AppText variant="muted" style={{ textAlign: "center", fontSize: 11.5, lineHeight: 17 }}>
        Educational information, not personal financial advice. Investing involves risk, including loss of the money
        you invest. Crypto is high-risk and can go to zero.
      </AppText>
    </View>
  );
}

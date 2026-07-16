import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BADGES } from "@/content/badges";
import { DAILY_CARDS } from "@/content/daily-cards";
import { FREE_LESSONS } from "@/content/lessons";
import { dueReviewItems, remainingReviewQuota } from "@/lib/app-state-logic";
import { daySeed, todayStr } from "@/lib/date";
import { useAppState } from "@/lib/app-state";
import { hapticError, hapticSuccess } from "@/lib/haptics";
import { useTheme } from "@/lib/theme";
import { AppText, Btn, Card, FeedbackBox, ProgressBar } from "@/components/ui";
import { CardSkeleton } from "@/components/skeleton";
import { ActionChecklistCard } from "@/components/home/action-checklist-card";
import { ThisWeekCard } from "@/components/home/this-week-card";
import { TodayScamCard } from "@/components/home/today-scam-card";
import { TrackerSnapshotCard } from "@/components/home/tracker-snapshot-card";

const NEVER_DO = [
  'No price predictions or "this coin is going to X"',
  'No coin picks or "buy this" recommendations, ever',
  "No leveraged trading tutorials or margin/futures content",
  "No paid coin promotions or influencer partnerships",
  '"No guaranteed returns" language, anywhere',
];

function HeroCard() {
  const router = useRouter();
  const { colors } = useTheme();
  const { state, hydrated } = useAppState();
  return (
    <Card>
      <View
        style={{
          alignSelf: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: `${colors.primary}33`,
          backgroundColor: `${colors.primary}0d`,
          paddingHorizontal: 12,
          paddingVertical: 4,
        }}
      >
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary }} />
        <AppText style={{ color: colors.primary, fontSize: 12 }}>Investing · Crypto · Blockchain</AppText>
      </View>
      <AppText variant="heading" style={{ marginTop: 10, fontSize: 26, lineHeight: 32 }}>
        Learn to invest, calmly.
      </AppText>
      <AppText variant="muted" style={{ marginTop: 10, fontSize: 15, lineHeight: 22 }}>
        Short lessons that take you from confusion to your first move, in stocks or crypto. No hype, no hot tips.
      </AppText>
      <Btn
        label={hydrated && state.persona ? "Retake the type quiz" : "Find your investor type"}
        onPress={() => router.push("/quiz")}
        style={{ marginTop: 20 }}
      />
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
        <AppText variant="kicker">Today’s question · keep your streak</AppText>
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
      <AppText variant="kicker">Today’s question · keep your streak</AppText>
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
      <Card>
        <AppText variant="kicker">Review · make it stick</AppText>
        <AppText variant="bold" style={{ marginTop: 8 }}>
          ✓ Reviewed today, spaced repetition works best in small daily doses.
        </AppText>
      </Card>
    );
  }

  return (
    <Pressable accessibilityRole="button" onPress={() => router.push("/review")}>
      {({ pressed }) => (
        <Card style={{ opacity: pressed ? 0.8 : 1 }}>
          <AppText variant="kicker">Review · make it stick</AppText>
          <AppText variant="bold" style={{ marginTop: 8 }}>
            {due > 0 ? `${due} card${due === 1 ? "" : "s"} due, a two-minute refresh.` : "A quick refresher round is ready."}
          </AppText>
          <AppText variant="muted" style={{ marginTop: 4 }}>
            Missed questions and key terms, spaced so they stick. +3 XP per card.
          </AppText>
        </Card>
      )}
    </Pressable>
  );
}

function ProgressCard() {
  const { state, hydrated } = useAppState();
  if (!hydrated) return <CardSkeleton lines={2} />;
  const done = state.done.filter((id) => FREE_LESSONS.some((l) => l.id === id)).length;
  const pct = Math.round((done / FREE_LESSONS.length) * 100);
  const earned = BADGES.filter((b) => state.badges.includes(b.id));
  return (
    <Card>
      <AppText variant="kicker">Your progress</AppText>
      <ProgressBar value={pct} style={{ marginTop: 12 }} />
      <AppText variant="muted" style={{ marginTop: 8 }}>
        {done} of {FREE_LESSONS.length} lessons · {state.xp} XP · 🔥 {state.streak.count || 0} day streak
      </AppText>
      {earned.length > 0 && (
        <AppText style={{ marginTop: 8 }}>{earned.map((b) => `${b.ico} ${b.name}`).join("  ·  ")}</AppText>
      )}
    </Card>
  );
}

function NeverDoCard() {
  const { colors } = useTheme();
  return (
    <Card>
      <AppText variant="kicker">What we’ll never do</AppText>
      <View style={{ marginTop: 10, gap: 6 }}>
        {NEVER_DO.map((item) => (
          <View key={item} style={{ flexDirection: "row", gap: 8 }}>
            <AppText variant="bold" style={{ color: colors.destructive, fontSize: 12, lineHeight: 21 }}>
              ✕
            </AppText>
            <AppText style={{ flex: 1, fontSize: 14, lineHeight: 21 }}>{item}</AppText>
          </View>
        ))}
      </View>
    </Card>
  );
}

function SettingsButton() {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Settings"
      onPress={() => router.push("/settings")}
      hitSlop={8}
      style={({ pressed }) => ({ alignSelf: "flex-end", opacity: pressed ? 0.6 : 1 })}
    >
      <AppText style={{ fontSize: 20, lineHeight: 24, color: colors.mutedForeground }}>⚙️</AppText>
    </Pressable>
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
      <SettingsButton />
      <HeroCard />
      <DailyQuestionCard />
      <ReviewCard />
      <TodayScamCard />
      <TrackerSnapshotCard />
      <ActionChecklistCard />
      <ThisWeekCard />
      <NeverDoCard />
      <ProgressCard />
      <AppText
        variant="muted"
        style={{ marginTop: 8, paddingHorizontal: 6, textAlign: "center", fontSize: 11.5, lineHeight: 17 }}
      >
        Educational information, not personal financial advice. Investing involves risk, including loss of the money you
        invest. Crypto is high-risk and can go to zero.
      </AppText>
    </ScrollView>
  );
}

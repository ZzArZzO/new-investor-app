import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ADVANCED_PILLARS, FREE_LESSONS, LESSONS } from "@/content/lessons";
import { useAppState } from "@/lib/app-state";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, ProgressBar } from "@/components/ui";

const FOUNDATIONS_PILLAR = LESSONS[0].pillar;

interface LessonRowProps {
  index: number;
  title: string;
  done: boolean;
  unlocked: boolean;
  lockedLabel: string;
  onPress: () => void;
}

function LessonRow({ index, title, done, unlocked, lockedLabel, onPress }: LessonRowProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      disabled={!unlocked}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          borderRadius: RADIUS.xl,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          paddingHorizontal: 14,
          paddingVertical: 13,
          opacity: unlocked ? (pressed ? 0.8 : 1) : 0.55,
        },
      ]}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: done ? colors.primary : colors.muted,
        }}
      >
        <AppText
          style={{
            color: done ? colors.primaryForeground : colors.mutedForeground,
            fontFamily: FONTS.bodySemiBold,
            fontSize: 13,
            lineHeight: 17,
          }}
        >
          {done ? "✓" : index + 1}
        </AppText>
      </View>
      <View style={{ flex: 1 }}>
        <AppText style={{ fontFamily: FONTS.bodyMedium, fontSize: 15, lineHeight: 20 }}>{title}</AppText>
        {!unlocked && (
          <AppText variant="muted" style={{ fontSize: 12, lineHeight: 16, marginTop: 2 }}>
            🔒 {lockedLabel}
          </AppText>
        )}
      </View>
    </Pressable>
  );
}

export default function LessonsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { state, hydrated } = useAppState();
  const done = hydrated ? state.done : [];

  const doneFree = done.filter((id) => FREE_LESSONS.some((l) => l.id === id)).length;
  const pct = Math.round((doneFree / FREE_LESSONS.length) * 100);
  const foundationsDone = LESSONS.filter((l) => l.pillar === FOUNDATIONS_PILLAR).every((l) => done.includes(l.id));

  const pillars: string[] = [];
  LESSONS.forEach((l) => {
    if (!pillars.includes(l.pillar)) pillars.push(l.pillar);
  });
  const corePillars = pillars.filter((p) => !ADVANCED_PILLARS.includes(p));
  const advancedPillars = pillars.filter((p) => ADVANCED_PILLARS.includes(p));

  function renderPillar(pillar: string) {
    const group = LESSONS.filter((l) => l.pillar === pillar);
    const doneInGroup = group.filter((l) => done.includes(l.id)).length;
    return (
      <View key={pillar} style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
          <AppText variant="bold" style={{ fontSize: 15 }}>
            {pillar}
          </AppText>
          <AppText variant="muted" style={{ fontSize: 13 }}>
            {doneInGroup}/{group.length}
          </AppText>
        </View>
        <View style={{ gap: 10 }}>
          {group.map((l, gIdx) => {
            // Tracks unlock once Foundations is done; within a track, lessons
            // unlock sequentially (same rules as the web app).
            const trackOpen = pillar === FOUNDATIONS_PILLAR || foundationsDone;
            const unlocked =
              done.includes(l.id) || (trackOpen && (gIdx === 0 || done.includes(group[gIdx - 1].id)));
            return (
              <LessonRow
                key={l.id}
                index={gIdx}
                title={l.title}
                done={done.includes(l.id)}
                unlocked={unlocked}
                lockedLabel={trackOpen ? "Finish the previous lesson first" : `Finish ${FOUNDATIONS_PILLAR} first`}
                onPress={() => router.push(`/lesson/${l.id}`)}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 32 }}
    >
      <AppText variant="heading">Lessons</AppText>
      <ProgressBar value={pct} style={{ marginTop: 12 }} />
      <AppText variant="muted" style={{ marginTop: 6, marginBottom: 16 }}>
        {doneFree} of {FREE_LESSONS.length} done
      </AppText>

      {corePillars.map(renderPillar)}

      {advancedPillars.length > 0 && (
        <>
          <View style={{ marginTop: 12, marginBottom: 14 }}>
            <AppText variant="heading" style={{ fontSize: 18 }}>
              Advanced
            </AppText>
            <AppText variant="muted" style={{ marginTop: 4, fontSize: 13, lineHeight: 18 }}>
              Optional deep dives. Nothing here is needed to make your first investment.
            </AppText>
          </View>
          {advancedPillars.map(renderPillar)}
        </>
      )}
    </ScrollView>
  );
}

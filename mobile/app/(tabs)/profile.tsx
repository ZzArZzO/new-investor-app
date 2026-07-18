import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BADGES } from "@/content/badges";
import { FREE_LESSONS } from "@/content/lessons";
import { PERSONAS } from "@/content/quiz";
import { useAppState } from "@/lib/app-state";
import { useAuth } from "@/lib/auth";
import { RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card, ProgressBar, SectionHeader } from "@/components/ui";
import { CardSkeleton } from "@/components/skeleton";
import { StatTile } from "@/components/stat-tile";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const { state, hydrated } = useAppState();
  const { token, email } = useAuth();

  if (!hydrated) {
    return (
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 32, gap: 14 }}
      >
        <CardSkeleton lines={3} />
        <CardSkeleton lines={2} />
        <CardSkeleton lines={2} />
      </ScrollView>
    );
  }

  const persona = state.persona ? PERSONAS[state.persona] : null;
  const done = state.done.filter((id) => FREE_LESSONS.some((l) => l.id === id)).length;
  const pct = Math.round((done / FREE_LESSONS.length) * 100);
  const version = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 32, gap: 14 }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <AppText variant="kicker">Account</AppText>
          <AppText variant="heading" style={{ marginTop: 4, fontSize: 28, lineHeight: 34 }}>
            Your Profile
          </AppText>
          <AppText variant="muted" style={{ marginTop: 4, fontSize: 14, lineHeight: 20 }}>
            Your investor type, study progress, and account.
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Settings"
          onPress={() => router.push("/settings")}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, padding: 4 })}
        >
          <AppText style={{ fontSize: 20, lineHeight: 24, color: colors.mutedForeground }}>⚙️</AppText>
        </Pressable>
      </View>

      <Card>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: colors.accent,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppText variant="heading" style={{ fontSize: 22, lineHeight: 28, color: colors.accentForeground }}>
              {token && email ? email[0].toUpperCase() : "☺"}
            </AppText>
          </View>
          <View style={{ flex: 1 }}>
            <AppText variant="bold" style={{ fontSize: 16, lineHeight: 22 }}>
              {token && email ? email : "Not signed in"}
            </AppText>
            <AppText variant="muted" style={{ fontSize: 13, lineHeight: 18 }}>
              {token
                ? "Progress syncs between this phone and the web app."
                : "Progress lives only on this phone."}
            </AppText>
          </View>
        </View>
        <Btn
          label={token ? "Manage account" : "Sign in or back up"}
          variant={token ? "outline" : "primary"}
          onPress={() => router.push("/settings")}
          style={{ marginTop: 14 }}
        />
      </Card>

      <SectionHeader>Investor diagnostics</SectionHeader>
      {persona ? (
        <Card>
          <AppText variant="kicker">Investor classification</AppText>
          <AppText variant="heading" style={{ marginTop: 8, fontSize: 24, lineHeight: 30 }}>
            {persona.emoji} {persona.name}
          </AppText>
          <AppText variant="muted" style={{ marginTop: 6, fontSize: 14.5, lineHeight: 21 }}>
            {persona.desc}
          </AppText>
          <Btn label="See full profile" onPress={() => router.push(`/types/${persona.slug}`)} style={{ marginTop: 14 }} />
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
      ) : (
        <Card>
          <AppText variant="kicker">Investor classification</AppText>
          <AppText variant="muted" style={{ marginTop: 8, fontSize: 14.5, lineHeight: 21 }}>
            You have not taken the investor type quiz yet. Four questions sort you into one of four published types,
            each with its strengths and blind spots.
          </AppText>
          <Btn label="Diagnose your investor type" onPress={() => router.push("/quiz")} style={{ marginTop: 14 }} />
        </Card>
      )}

      <SectionHeader>Study progress</SectionHeader>
      <Card>
        <AppText variant="kicker">Curriculum</AppText>
        <ProgressBar value={pct} style={{ marginTop: 12 }} />
        <AppText variant="muted" style={{ marginTop: 8 }}>
          {done} of {FREE_LESSONS.length} lessons done
        </AppText>
        <View style={{ marginTop: 12, flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          <StatTile label="XP" value={`${state.xp}`} />
          <StatTile label="Day streak" value={`🔥 ${state.streak.count || 0}`} />
          <StatTile label="Scam streak" value={`🛡️ ${state.scamDaily.streak || 0}`} />
        </View>
      </Card>

      <Card>
        <AppText variant="kicker">Badges</AppText>
        <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
          {BADGES.map((badge) => {
            const owned = state.badges.includes(badge.id);
            return (
              <View
                key={badge.id}
                style={{
                  borderRadius: RADIUS.pill,
                  borderWidth: 1,
                  borderColor: owned ? colors.primary : colors.border,
                  backgroundColor: owned ? colors.accent : colors.card,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  opacity: owned ? 1 : 0.55,
                }}
              >
                <AppText
                  style={{
                    fontSize: 12,
                    lineHeight: 17,
                    color: owned ? colors.accentForeground : colors.mutedForeground,
                  }}
                >
                  {badge.ico} {badge.name}
                </AppText>
              </View>
            );
          })}
        </View>
      </Card>

      <SectionHeader>Your portfolio</SectionHeader>
      <Card>
        <AppText variant="kicker">Portfolio tracker</AppText>
        <AppText variant="heading" style={{ marginTop: 8, fontSize: 21, lineHeight: 27 }}>
          View your portfolio
        </AppText>
        <AppText variant="muted" style={{ marginTop: 6, fontSize: 14, lineHeight: 20 }}>
          Self-reported holdings and monthly contributions. Nothing is connected and no prices are fetched.
        </AppText>
        <Btn label="Open portfolio" onPress={() => router.push("/tracker")} style={{ marginTop: 14 }} />
      </Card>

      <View
        style={{
          borderRadius: RADIUS.xl,
          backgroundColor: colors.muted,
          paddingVertical: 14,
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <AppText variant="muted" style={{ fontSize: 12.5 }}>
          New Investor App v{version}
        </AppText>
        <AppText variant="muted" style={{ marginTop: 2, fontSize: 11, color: colors.gold }}>
          Built with editorial warmth &amp; care
        </AppText>
      </View>
    </ScrollView>
  );
}

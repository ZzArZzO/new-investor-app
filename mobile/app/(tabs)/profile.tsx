import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BADGES } from "@/content/badges";
import { FREE_LESSONS } from "@/content/lessons";
import { PERSONAS } from "@/content/quiz";
import { useAppState } from "@/lib/app-state";
import { useAuth } from "@/lib/auth";
import { RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card, ProgressBar } from "@/components/ui";
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

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 32, gap: 14 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <AppText variant="heading">Profile</AppText>
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

      {persona ? (
        <Card>
          <AppText variant="kicker">Your investor type</AppText>
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
          <AppText variant="kicker">Your investor type</AppText>
          <AppText variant="muted" style={{ marginTop: 8 }}>
            Four questions sort you into one of four investor types, with the strengths and blind spots of each.
          </AppText>
          <Btn label="Find your investor type" onPress={() => router.push("/quiz")} style={{ marginTop: 14 }} />
        </Card>
      )}

      <Card>
        <AppText variant="kicker">Progress</AppText>
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

      <Card>
        <AppText variant="kicker">Account</AppText>
        {token ? (
          <>
            <AppText variant="muted" style={{ marginTop: 8 }}>
              Synced as <AppText variant="bold">{email}</AppText>. Progress follows you between this phone and the
              web app.
            </AppText>
            <Btn label="Manage account" variant="outline" onPress={() => router.push("/settings")} style={{ marginTop: 12 }} />
          </>
        ) : (
          <>
            <AppText variant="muted" style={{ marginTop: 8 }}>
              Progress lives only on this phone. Sign in to sync it with the web app, or copy a backup code.
            </AppText>
            <Btn label="Sign in or back up" onPress={() => router.push("/settings")} style={{ marginTop: 12 }} />
          </>
        )}
      </Card>
    </ScrollView>
  );
}

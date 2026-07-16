import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

import { PERSONAS } from "@/content/quiz";
import { useAppState } from "@/lib/app-state";
import { RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card } from "@/components/ui";
import { CardSkeleton } from "@/components/skeleton";

export default function ResultScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { state, hydrated } = useAppState();

  const persona = state.persona ? PERSONAS[state.persona] : null;

  useEffect(() => {
    if (hydrated && !persona) router.replace("/quiz");
  }, [hydrated, persona, router]);

  if (!hydrated || !persona) {
    return (
      <>
        <Stack.Screen options={{ title: "Your result" }} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32, gap: 14 }}>
          <CardSkeleton lines={4} />
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Your result" }} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32, gap: 14 }}>
        <Card style={{ alignItems: "center" }}>
          <AppText style={{ fontSize: 40, lineHeight: 48 }}>{persona.emoji}</AppText>
          <View
            style={{
              marginTop: 8,
              borderRadius: RADIUS.pill,
              backgroundColor: colors.accent,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <AppText variant="bold" style={{ color: colors.accentForeground, fontSize: 12, lineHeight: 16 }}>
              Your type
            </AppText>
          </View>
          <AppText variant="heading" style={{ marginTop: 6, fontSize: 24, lineHeight: 30, textAlign: "center" }}>
            {persona.name}
          </AppText>
          <AppText variant="muted" style={{ marginTop: 6, fontSize: 15, textAlign: "center" }}>
            {persona.desc}
          </AppText>
        </Card>

        <Card>
          <AppText variant="kicker">How people like this often think</AppText>
          <AppText style={{ marginTop: 8 }}>{persona.approach}</AppText>
          <AppText variant="muted" style={{ marginTop: 10, fontSize: 12.5, lineHeight: 18 }}>
            This is a general illustration, not personal advice. It never uses your income or savings.
          </AppText>
        </Card>

        <Card>
          <AppText variant="kicker">Your strengths &amp; blind spots</AppText>
          <View style={{ marginTop: 8, gap: 6 }}>
            {persona.strengths.slice(0, 2).map((s) => (
              <View key={s} style={{ flexDirection: "row", gap: 8 }}>
                <AppText variant="bold" style={{ color: colors.primary, fontSize: 13, lineHeight: 20 }}>
                  ✓
                </AppText>
                <AppText style={{ flex: 1, fontSize: 14, lineHeight: 20 }}>{s}</AppText>
              </View>
            ))}
            {persona.blindSpots.slice(0, 2).map((s) => (
              <View key={s} style={{ flexDirection: "row", gap: 8 }}>
                <AppText variant="bold" style={{ color: colors.destructive, fontSize: 13, lineHeight: 20 }}>
                  !
                </AppText>
                <AppText style={{ flex: 1, fontSize: 14, lineHeight: 20 }}>{s}</AppText>
              </View>
            ))}
          </View>
        </Card>

        <Btn
          label={`Read the full ${persona.name} profile`}
          variant="outline"
          onPress={() => router.push({ pathname: "/types/[slug]", params: { slug: persona.slug } })}
        />
        <Btn label="Start the lessons →" onPress={() => router.dismissTo("/(tabs)/lessons")} />
        <Btn label="See tools & platforms" variant="outline" onPress={() => router.replace("/compare")} />

        <AppText
          variant="muted"
          style={{ marginTop: 8, paddingHorizontal: 4, textAlign: "center", fontSize: 11.5, lineHeight: 17 }}
        >
          Educational information, not personal financial advice. Investing involves risk, including loss of the money
          you invest. Crypto is high-risk and can go to zero.
        </AppText>
      </ScrollView>
    </>
  );
}

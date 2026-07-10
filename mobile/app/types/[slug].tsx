import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { personaBySlug } from "@/content/quiz";
import { useTheme } from "@/lib/theme";
import { AppText, Btn, Card } from "@/components/ui";

export default function TypeScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const persona = personaBySlug(slug ?? "");

  if (!persona) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <AppText variant="muted">Type not found.</AppText>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: persona.name }} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32, gap: 14 }}>
        <Card style={{ alignItems: "center" }}>
          <AppText style={{ fontSize: 40, lineHeight: 48 }}>{persona.emoji}</AppText>
          <AppText variant="heading" style={{ marginTop: 8, fontSize: 24, lineHeight: 30, textAlign: "center" }}>
            {persona.name}
          </AppText>
          <AppText variant="muted" style={{ marginTop: 6, fontSize: 15, textAlign: "center" }}>
            {persona.desc}
          </AppText>
        </Card>

        <Card>
          <AppText variant="kicker">How people like this often think</AppText>
          <AppText style={{ marginTop: 8 }}>{persona.approach}</AppText>
        </Card>

        <Card>
          <AppText variant="kicker">Strengths</AppText>
          <View style={{ marginTop: 8, gap: 6 }}>
            {persona.strengths.map((s) => (
              <View key={s} style={{ flexDirection: "row", gap: 8 }}>
                <AppText variant="bold" style={{ color: colors.primary, fontSize: 13, lineHeight: 20 }}>
                  ✓
                </AppText>
                <AppText style={{ flex: 1, fontSize: 14.5, lineHeight: 20 }}>{s}</AppText>
              </View>
            ))}
          </View>
        </Card>

        <Card>
          <AppText variant="kicker">Blind spots to watch</AppText>
          <View style={{ marginTop: 8, gap: 6 }}>
            {persona.blindSpots.map((s) => (
              <View key={s} style={{ flexDirection: "row", gap: 8 }}>
                <AppText variant="bold" style={{ color: colors.destructive, fontSize: 13, lineHeight: 20 }}>
                  !
                </AppText>
                <AppText style={{ flex: 1, fontSize: 14.5, lineHeight: 20 }}>{s}</AppText>
              </View>
            ))}
          </View>
        </Card>

        <Btn label="Not sure this is you? Take the quiz →" onPress={() => router.push("/quiz")} />

        <AppText
          variant="muted"
          style={{ marginTop: 6, paddingHorizontal: 4, textAlign: "center", fontSize: 11.5, lineHeight: 17 }}
        >
          A general illustration, not personal financial advice. The quiz never asks about your income or savings, and
          the same lessons and comparisons are shown to everyone.
        </AppText>
      </ScrollView>
    </>
  );
}

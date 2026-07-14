import { Stack, useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

import { PERSONA_LIST } from "@/content/quiz";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";

export default function TypesScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Investor types" }} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32 }}>
        <AppText variant="heading">The four investor types</AppText>
        <AppText variant="muted" style={{ marginTop: 6, marginBottom: 16 }}>
          Behavioral archetypes on the involvement × emotional-style grid. Everyone sees the same lessons, the type
          just names your starting habits.
        </AppText>
        <View style={{ gap: 10 }}>
          {PERSONA_LIST.map((p) => (
            <Pressable
              key={p.slug}
              accessibilityRole="button"
              onPress={() => router.push({ pathname: "/types/[slug]", params: { slug: p.slug } })}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                borderRadius: RADIUS.xl,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                paddingHorizontal: 14,
                paddingVertical: 14,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <AppText style={{ fontSize: 26, lineHeight: 32 }}>{p.emoji}</AppText>
              <View style={{ flex: 1 }}>
                <AppText style={{ fontFamily: FONTS.bodySemiBold, fontSize: 15, lineHeight: 20 }}>{p.name}</AppText>
                <AppText variant="muted" style={{ fontSize: 13, lineHeight: 18, marginTop: 2 }}>
                  {p.desc}
                </AppText>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

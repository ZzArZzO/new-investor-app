import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TOOLS } from "@/content/tools";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";

export default function ToolsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 32 }}
    >
      <AppText variant="heading">Tools</AppText>
      <AppText variant="muted" style={{ marginTop: 6, marginBottom: 16 }}>
        Small interactive sandboxes, feel the mechanics before any real money is involved.
      </AppText>

      <View style={{ gap: 10 }}>
        {TOOLS.map((tool) => (
          <Pressable
            key={tool.id}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: "/tool/[id]", params: { id: tool.id } })}
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
            <AppText style={{ fontSize: 26, lineHeight: 32 }}>{tool.ico}</AppText>
            <View style={{ flex: 1 }}>
              <AppText style={{ fontFamily: FONTS.bodySemiBold, fontSize: 15, lineHeight: 20 }}>{tool.name}</AppText>
              <AppText variant="muted" style={{ fontSize: 13, lineHeight: 18, marginTop: 2 }}>
                {tool.desc}
              </AppText>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

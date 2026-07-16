import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TOOLS } from "@/content/tools";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";

function ToolRow({ icon, name, desc, onPress }: { icon: string; name: string; desc: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      android_ripple={{ color: colors.accent }}
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
        overflow: "hidden",
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <AppText style={{ fontSize: 26, lineHeight: 32 }}>{icon}</AppText>
      <View style={{ flex: 1 }}>
        <AppText style={{ fontFamily: FONTS.bodySemiBold, fontSize: 15, lineHeight: 20 }}>{name}</AppText>
        <AppText variant="muted" style={{ fontSize: 13, lineHeight: 18, marginTop: 2 }}>
          {desc}
        </AppText>
      </View>
    </Pressable>
  );
}

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
          <ToolRow
            key={tool.id}
            icon={tool.ico}
            name={tool.name}
            desc={tool.desc}
            onPress={() => router.push({ pathname: "/tool/[id]", params: { id: tool.id } })}
          />
        ))}
        <ToolRow
          icon="⚖️"
          name="Compare brokers & exchanges"
          desc="Regulated platforms side by side. Facts only, no recommendations."
          onPress={() => router.push("/compare")}
        />
      </View>
    </ScrollView>
  );
}

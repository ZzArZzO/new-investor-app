import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

import { toolById } from "@/content/tools";
import type { ToolId } from "@/content/types";
import { TOOL_COMPONENTS } from "@/components/tools/tool-registry";
import { AppText } from "@/components/ui";

export default function ToolScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const meta = toolById(id ?? "");
  const Tool = meta ? TOOL_COMPONENTS[meta.id as ToolId] : null;

  if (!meta || !Tool) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <AppText variant="muted">Tool not found.</AppText>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: meta.name }} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 40 }}>
        <Tool />
      </ScrollView>
    </>
  );
}

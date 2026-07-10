import { Link, Stack } from "expo-router";
import { View } from "react-native";

import { useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";

export default function NotFoundScreen() {
  const { colors } = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
        <AppText variant="heading">This screen doesn’t exist.</AppText>
        <Link href="/" style={{ marginTop: 15, paddingVertical: 15 }}>
          <AppText variant="bold" style={{ color: colors.primary }}>
            Go to home screen
          </AppText>
        </Link>
      </View>
    </>
  );
}

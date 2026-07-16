import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppState } from "@/lib/app-state";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { MAX_FONT_SCALE } from "@/components/ui";

/**
 * Global toast overlay fed by app-state (badge unlocks, streak freezes).
 * Keyed by message so a replacement re-animates; sits above the tab bar
 * respecting the bottom safe-area inset.
 */
export function Toast() {
  const { toastMessage } = useAppState();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  if (!toastMessage) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        bottom: insets.bottom + 72,
        left: 24,
        right: 24,
        alignItems: "center",
      }}
    >
      <Animated.View
        key={toastMessage}
        entering={FadeInDown.duration(200)}
        exiting={FadeOutDown.duration(150)}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        style={{
          maxWidth: "100%",
          backgroundColor: colors.foreground,
          borderRadius: RADIUS.xl,
          paddingHorizontal: 18,
          paddingVertical: 12,
        }}
      >
        <Text
          maxFontSizeMultiplier={MAX_FONT_SCALE}
          style={{ color: colors.background, fontFamily: FONTS.bodyMedium, fontSize: 14, lineHeight: 19 }}
        >
          {toastMessage}
        </Text>
      </Animated.View>
    </View>
  );
}

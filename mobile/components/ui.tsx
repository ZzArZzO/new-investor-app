import { useEffect, useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { FONTS, RADIUS, useTheme, withAlpha } from "@/lib/theme";

/** Cap system font scaling so fixed-height rows degrade gracefully, not clip. */
export const MAX_FONT_SCALE = 1.3;

interface ChildrenStyleProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Rounded content card on the paper background. */
export function Card({ children, style }: ChildrenStyleProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}>
      {children}
    </View>
  );
}

interface AppTextProps {
  children: ReactNode;
  variant?: "body" | "muted" | "heading" | "kicker" | "bold";
  style?: StyleProp<TextStyle>;
}

/** Themed text. `heading` uses the Fraunces serif, `kicker` is the small green uppercase label. */
export function AppText({ children, variant = "body", style }: AppTextProps) {
  const { colors } = useTheme();
  const base: TextStyle[] = [{ color: colors.foreground, fontFamily: FONTS.body, fontSize: 15, lineHeight: 22 }];
  if (variant === "muted") base.push({ color: colors.mutedForeground, fontSize: 14, lineHeight: 20 });
  if (variant === "heading") base.push({ fontFamily: FONTS.heading, fontSize: 22, lineHeight: 28 });
  if (variant === "bold") base.push({ fontFamily: FONTS.bodySemiBold });
  if (variant === "kicker")
    base.push({
      color: colors.primary,
      fontFamily: FONTS.bodySemiBold,
      fontSize: 12,
      lineHeight: 16,
      textTransform: "uppercase",
      letterSpacing: 0.6,
    });
  return (
    <Text maxFontSizeMultiplier={MAX_FONT_SCALE} style={[...base, style]}>
      {children}
    </Text>
  );
}

interface BtnProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Btn({ label, onPress, variant = "primary", disabled = false, loading = false, style }: BtnProps) {
  const { colors } = useTheme();
  const primary = variant === "primary";
  const labelColor = primary ? colors.primaryForeground : colors.secondaryForeground;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      android_ripple={{ color: colors.accent }}
      style={({ pressed }) => [
        styles.btn,
        primary
          ? { backgroundColor: colors.primary }
          : { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
        (pressed || disabled) && { opacity: disabled ? 0.5 : 0.8 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={labelColor} />
      ) : (
        <Text
          maxFontSizeMultiplier={MAX_FONT_SCALE}
          style={{
            color: labelColor,
            fontFamily: FONTS.bodySemiBold,
            fontSize: 15,
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

interface ProgressBarProps {
  value: number;
  style?: StyleProp<ViewStyle>;
}

/** Thin determinate progress bar, 0-100. Fill width animates on change. */
export function ProgressBar({ value, style }: ProgressBarProps) {
  const { colors } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  const [trackWidth, setTrackWidth] = useState(0);
  const fillWidth = useSharedValue(0);

  useEffect(() => {
    fillWidth.value = withTiming((pct / 100) * trackWidth, { duration: 250 });
  }, [pct, trackWidth, fillWidth]);

  const animatedFill = useAnimatedStyle(() => ({ width: fillWidth.value }));

  return (
    <View
      style={[styles.track, { backgroundColor: colors.muted }, style]}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View style={[styles.fill, { backgroundColor: colors.primary }, animatedFill]} />
    </View>
  );
}

interface FeedbackBoxProps {
  correct: boolean;
  children: ReactNode;
}

/** Green/red answer feedback panel used by quizzes and daily questions. */
export function FeedbackBox({ correct, children }: FeedbackBoxProps) {
  const { colors } = useTheme();
  return (
    <Animated.View
      entering={FadeInDown.duration(180)}
      style={{
        marginTop: 10,
        borderRadius: RADIUS.md,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: correct ? colors.accent : withAlpha(colors.destructive, 0.1),
      }}
    >
      <Text
        maxFontSizeMultiplier={MAX_FONT_SCALE}
        style={{
          color: correct ? colors.accentForeground : colors.destructive,
          fontFamily: FONTS.body,
          fontSize: 14,
          lineHeight: 20,
        }}
      >
        {children}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS["2xl"],
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    borderRadius: RADIUS.xl,
    paddingHorizontal: 16,
    paddingVertical: 10,
    overflow: "hidden",
  },
  track: {
    height: 8,
    borderRadius: RADIUS.pill,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: RADIUS.pill,
  },
});

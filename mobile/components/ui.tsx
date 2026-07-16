import type { ReactNode } from "react";
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
import { FONTS, RADIUS, useTheme } from "@/lib/theme";

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
  return <Text style={[...base, style]}>{children}</Text>;
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

/** Thin determinate progress bar, 0-100. */
export function ProgressBar({ value, style }: ProgressBarProps) {
  const { colors } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={[styles.track, { backgroundColor: colors.muted }, style]}>
      <View style={[styles.fill, { backgroundColor: colors.primary, width: `${pct}%` }]} />
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
    <View
      style={{
        marginTop: 10,
        borderRadius: RADIUS.md,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: correct ? colors.accent : `${colors.destructive}1a`,
      }}
    >
      <Text
        style={{
          color: correct ? colors.accentForeground : colors.destructive,
          fontFamily: FONTS.body,
          fontSize: 14,
          lineHeight: 20,
        }}
      >
        {children}
      </Text>
    </View>
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
    height: 44,
    borderRadius: RADIUS.xl,
    paddingHorizontal: 16,
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

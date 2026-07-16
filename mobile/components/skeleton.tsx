import { useEffect } from "react";
import type { DimensionValue, StyleProp, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

import { RADIUS, useTheme } from "@/lib/theme";
import { Card } from "@/components/ui";

interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

/** Muted pulsing placeholder block shown while stored state hydrates. */
export function Skeleton({ width = "100%", height = 16, radius = RADIUS.md, style }: SkeletonProps) {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.55);
  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
  }, [opacity]);
  const pulse = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return (
    <Animated.View
      style={[{ width, height, borderRadius: radius, backgroundColor: colors.muted }, pulse, style]}
    />
  );
}

interface CardSkeletonProps {
  lines?: number;
  style?: StyleProp<ViewStyle>;
}

/** Card-shaped skeleton approximating a home card: kicker plus body lines. */
export function CardSkeleton({ lines = 2, style }: CardSkeletonProps) {
  return (
    <Card style={style}>
      <Skeleton width={90} height={12} />
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? "60%" : "100%"} height={14} style={{ marginTop: 10 }} />
      ))}
    </Card>
  );
}

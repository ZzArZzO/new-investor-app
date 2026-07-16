import { Pressable, View } from "react-native";

import { hapticSelect } from "@/lib/haptics";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";

interface SegmentedOption<T extends string> {
  id: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (id: T) => void;
  /** `pill`: equal-width row (mode toggles). `chip`: wrapping tag cloud (type pickers). */
  variant?: "pill" | "chip";
}

/** Shared segmented selector with selection a11y state, 44pt targets, and ripple. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  variant = "pill",
}: SegmentedControlProps<T>) {
  const { colors } = useTheme();
  const pill = variant === "pill";

  return (
    <View style={pill ? { flexDirection: "row", gap: 8 } : { flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
      {options.map((option) => {
        const active = option.id === value;
        return (
          <Pressable
            key={option.id}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => {
              if (active) return;
              hapticSelect();
              onChange(option.id);
            }}
            android_ripple={{ color: colors.accent }}
            style={({ pressed }) => [
              {
                minHeight: 44,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                overflow: "hidden",
                opacity: pressed ? 0.8 : 1,
              },
              pill
                ? {
                    flex: 1,
                    borderRadius: RADIUS.pill,
                    borderColor: active ? colors.primary : colors.border,
                    backgroundColor: active ? colors.primary : colors.card,
                    paddingVertical: 8,
                  }
                : {
                    flexGrow: 1,
                    borderRadius: RADIUS.md,
                    borderColor: active ? colors.primary : colors.border,
                    backgroundColor: active ? colors.accent : colors.card,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                  },
            ]}
          >
            <AppText
              style={
                pill
                  ? {
                      fontFamily: FONTS.bodyMedium,
                      fontSize: 13,
                      lineHeight: 18,
                      color: active ? colors.primaryForeground : colors.foreground,
                    }
                  : {
                      fontFamily: FONTS.bodySemiBold,
                      fontSize: 12.5,
                      lineHeight: 17,
                      color: active ? colors.primary : colors.mutedForeground,
                    }
              }
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

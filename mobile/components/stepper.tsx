import { Pressable, View } from "react-native";
import { hapticSelect } from "@/lib/haptics";
import { RADIUS, useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";

interface StepperProps {
  label: string;
  value: number;
  display: string;
  onChange: (next: number) => void;
  step: number;
  min: number;
  max: number;
}

/** +/- stepper, keeps the tools dependency-free (no native slider package). */
export function Stepper({ label, value, display, onChange, step, min, max }: StepperProps) {
  const { colors } = useTheme();

  function StepBtn({ text, hint, next, disabled }: { text: string; hint: string; next: number; disabled: boolean }) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${hint} ${label}`}
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={() => {
          hapticSelect();
          onChange(next);
        }}
        android_ripple={{ color: colors.accent }}
        style={({ pressed }) => ({
          width: 44,
          height: 44,
          borderRadius: RADIUS.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        })}
      >
        <AppText variant="bold" style={{ color: colors.primary, fontSize: 18, lineHeight: 22 }}>
          {text}
        </AppText>
      </Pressable>
    );
  }

  return (
    <View style={{ marginTop: 14 }}>
      <AppText variant="muted" style={{ fontSize: 13, marginBottom: 6 }}>
        {label}
      </AppText>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <StepBtn text="−" hint="Decrease" next={Math.max(min, value - step)} disabled={value <= min} />
        <AppText variant="bold" style={{ flex: 1, textAlign: "center", fontSize: 16 }}>
          {display}
        </AppText>
        <StepBtn text="+" hint="Increase" next={Math.min(max, value + step)} disabled={value >= max} />
      </View>
    </View>
  );
}

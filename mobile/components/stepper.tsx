import { Pressable, View } from "react-native";
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

  function StepBtn({ text, next, disabled }: { text: string; next: number; disabled: boolean }) {
    return (
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={() => onChange(next)}
        style={({ pressed }) => ({
          width: 40,
          height: 40,
          borderRadius: RADIUS.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          alignItems: "center",
          justifyContent: "center",
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
        <StepBtn text="−" next={Math.max(min, value - step)} disabled={value <= min} />
        <AppText variant="bold" style={{ flex: 1, textAlign: "center", fontSize: 16 }}>
          {display}
        </AppText>
        <StepBtn text="+" next={Math.min(max, value + step)} disabled={value >= max} />
      </View>
    </View>
  );
}

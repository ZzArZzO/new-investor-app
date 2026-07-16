import { useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import { HOLDING_TYPES } from "@/content/holdings";
import type { HoldingType } from "@/content/types";
import { useAppState } from "@/lib/app-state";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card } from "@/components/ui";

export function AddHoldingForm() {
  const { colors } = useTheme();
  const { addHolding } = useAppState();
  const [label, setLabel] = useState("");
  const [type, setType] = useState<HoldingType>("index");
  const [contributed, setContributed] = useState("");
  const [value, setValue] = useState("");
  const contributedRef = useRef<TextInput>(null);
  const valueRef = useRef<TextInput>(null);

  const contributedNum = Number(contributed);
  const valid = label.trim().length > 0 && contributedNum > 0;

  const inputStyle = {
    height: 42,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    color: colors.foreground,
    fontFamily: FONTS.body,
    fontSize: 14,
  } as const;

  function submit() {
    if (!valid) return;
    const v = Number(value);
    addHolding({
      label: label.trim(),
      type,
      contributed: contributedNum,
      value: value.trim() !== "" && v >= 0 ? v : undefined,
    });
    setLabel("");
    setContributed("");
    setValue("");
    setType("index");
  }

  return (
    <Card style={{ padding: 16 }}>
      <AppText variant="bold" style={{ fontSize: 15 }}>
        Add a holding
      </AppText>
      <AppText variant="muted" style={{ fontSize: 12.5, lineHeight: 17, marginTop: 2, marginBottom: 12 }}>
        Asset type only, never a specific product or coin. You enter your own figures; nothing is connected.
      </AppText>

      <AppText variant="bold" style={{ fontSize: 13, marginBottom: 4 }}>
        What is it?
      </AppText>
      <TextInput
        style={inputStyle}
        value={label}
        onChangeText={setLabel}
        placeholder="e.g. World index ETF"
        placeholderTextColor={colors.mutedForeground}
        maxLength={40}
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => contributedRef.current?.focus()}
      />

      <AppText variant="bold" style={{ fontSize: 13, marginTop: 12, marginBottom: 6 }}>
        Type
      </AppText>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
        {HOLDING_TYPES.map((t) => {
          const active = type === t.id;
          return (
            <Pressable
              key={t.id}
              accessibilityRole="button"
              onPress={() => setType(t.id)}
              style={{
                borderRadius: RADIUS.md,
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.border,
                backgroundColor: active ? colors.accent : colors.card,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
            >
              <AppText
                style={{
                  fontFamily: FONTS.bodySemiBold,
                  fontSize: 12.5,
                  lineHeight: 17,
                  color: active ? colors.primary : colors.mutedForeground,
                }}
              >
                {t.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={{ marginTop: 12, flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <AppText variant="bold" style={{ fontSize: 13, marginBottom: 4 }}>
            Contributed (€)
          </AppText>
          <TextInput
            ref={contributedRef}
            style={inputStyle}
            inputMode="decimal"
            value={contributed}
            onChangeText={(t) => setContributed(t.replace(/[^0-9.]/g, ""))}
            placeholder="1000"
            placeholderTextColor={colors.mutedForeground}
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => valueRef.current?.focus()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <AppText variant="bold" style={{ fontSize: 13, marginBottom: 4 }}>
            Value now (€, opt.)
          </AppText>
          <TextInput
            ref={valueRef}
            style={inputStyle}
            inputMode="decimal"
            value={value}
            onChangeText={(t) => setValue(t.replace(/[^0-9.]/g, ""))}
            placeholder="—"
            placeholderTextColor={colors.mutedForeground}
            returnKeyType="done"
            onSubmitEditing={submit}
          />
        </View>
      </View>

      <Btn label="Add holding" onPress={submit} disabled={!valid} style={{ marginTop: 16 }} />
    </Card>
  );
}

import * as Clipboard from "expo-clipboard";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import { exportState } from "@/lib/app-state-transfer";
import { useAppState } from "@/lib/app-state";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card } from "@/components/ui";

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { state, hydrated } = useAppState();
  const [copied, setCopied] = useState(false);

  const backup = useMemo(() => (hydrated ? exportState(state) : ""), [hydrated, state]);

  async function copyBackup() {
    await Clipboard.setStringAsync(backup);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 40, gap: 14 }}>
        <Card>
          <AppText variant="kicker">Account</AppText>
          <AppText variant="bold" style={{ marginTop: 8 }}>
            Sign-in is coming to mobile.
          </AppText>
          <AppText variant="muted" style={{ marginTop: 4 }}>
            Soon you’ll be able to sign in and keep your progress synced between this phone and the web app. Until
            then, progress lives on this device — use the backup code below if you switch phones.
          </AppText>
        </Card>

        <Card>
          <AppText variant="kicker">Back up my progress</AppText>
          <AppText variant="muted" style={{ marginTop: 8 }}>
            Your full progress as a code. Copy it somewhere safe — it’s the same format the web app uses.
          </AppText>
          <View
            style={{
              marginTop: 10,
              borderRadius: RADIUS.md,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.background,
              padding: 12,
              maxHeight: 140,
            }}
          >
            <AppText style={{ fontFamily: FONTS.body, fontSize: 11, lineHeight: 15, color: colors.mutedForeground }}>
              {backup.length > 600 ? `${backup.slice(0, 600)}…` : backup}
            </AppText>
          </View>
          <Btn label={copied ? "Copied ✓" : "Copy code"} onPress={copyBackup} style={{ marginTop: 12 }} />
        </Card>

        <AppText variant="muted" style={{ textAlign: "center", fontSize: 11.5, lineHeight: 17, paddingHorizontal: 6 }}>
          Educational information, not personal financial advice. Investing involves risk, including loss of the money
          you invest. Crypto is high-risk and can go to zero.
        </AppText>
      </ScrollView>
    </>
  );
}

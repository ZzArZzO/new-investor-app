import * as AppleAuthentication from "expo-apple-authentication";
import * as Clipboard from "expo-clipboard";
import * as Google from "expo-auth-session/providers/google";
import { Stack } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Platform, Pressable, ScrollView, TextInput, View } from "react-native";

import { exportState } from "@/lib/app-state-transfer";
import { useAppState } from "@/lib/app-state";
import { useAuth } from "@/lib/auth";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card } from "@/components/ui";

const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
const GOOGLE_CONFIGURED = Boolean(GOOGLE_IOS_CLIENT_ID || GOOGLE_ANDROID_CLIENT_ID);

function PrefToggle({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      onPress={onToggle}
      style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8 }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: on ? colors.primary : colors.border,
          backgroundColor: on ? colors.primary : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {on && (
          <AppText variant="bold" style={{ color: colors.primaryForeground, fontSize: 12, lineHeight: 15 }}>
            ✓
          </AppText>
        )}
      </View>
      <AppText style={{ flex: 1, fontSize: 14, lineHeight: 19 }}>{label}</AppText>
    </Pressable>
  );
}

function SignedOutAccount() {
  const { colors } = useTheme();
  const { signIn, signUp, signInWithGoogle, signInWithApple } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appleAvailable, setAppleAvailable] = useState(false);

  const [, googleResponse, promptGoogle] = Google.useIdTokenAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (Platform.OS === "ios") {
      AppleAuthentication.isAvailableAsync().then(setAppleAvailable, () => setAppleAvailable(false));
    }
  }, []);

  useEffect(() => {
    if (googleResponse?.type === "success" && googleResponse.params.id_token) {
      setBusy(true);
      signInWithGoogle(googleResponse.params.id_token)
        .catch((e: unknown) => setError(e instanceof Error ? e.message : "Google sign-in failed."))
        .finally(() => setBusy(false));
    }
  }, [googleResponse, signInWithGoogle]);

  const inputStyle = {
    height: 44,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    color: colors.foreground,
    fontFamily: FONTS.body,
    fontSize: 14,
  } as const;

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      if (mode === "signin") await signIn(email.trim(), password);
      else await signUp(email.trim(), password);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function appleSignIn() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });
      if (credential.identityToken) {
        setBusy(true);
        await signInWithApple(credential.identityToken);
      }
    } catch (e: unknown) {
      // Cancelled sheets throw — only surface real failures.
      if (e instanceof Error && !e.message.includes("canceled")) setError("Apple sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <AppText variant="kicker">Account</AppText>
      <AppText variant="muted" style={{ marginTop: 8 }}>
        Sign in to keep your progress synced between this phone and the web app.
      </AppText>

      <View style={{ marginTop: 12, flexDirection: "row", gap: 8 }}>
        {(["signin", "signup"] as const).map((m) => {
          const active = mode === m;
          return (
            <Pressable
              key={m}
              accessibilityRole="button"
              onPress={() => setMode(m)}
              style={{
                flex: 1,
                borderRadius: RADIUS.pill,
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.border,
                backgroundColor: active ? colors.primary : colors.card,
                paddingVertical: 8,
                alignItems: "center",
              }}
            >
              <AppText
                style={{
                  fontFamily: FONTS.bodyMedium,
                  fontSize: 13,
                  lineHeight: 18,
                  color: active ? colors.primaryForeground : colors.foreground,
                }}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={{ marginTop: 12, gap: 10 }}>
        <TextInput
          style={inputStyle}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.mutedForeground}
          autoCapitalize="none"
          autoComplete="email"
          inputMode="email"
        />
        <TextInput
          style={inputStyle}
          value={password}
          onChangeText={setPassword}
          placeholder={mode === "signup" ? "Password (min 8 characters)" : "Password"}
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      {error && (
        <AppText style={{ marginTop: 10, color: colors.destructive, fontSize: 13, lineHeight: 18 }}>{error}</AppText>
      )}

      <Btn
        label={busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
        onPress={submit}
        disabled={busy || email.trim().length === 0 || password.length === 0}
        style={{ marginTop: 12 }}
      />

      {GOOGLE_CONFIGURED && (
        <Btn label="Continue with Google" variant="outline" disabled={busy} onPress={() => promptGoogle()} style={{ marginTop: 10 }} />
      )}
      {appleAvailable && (
        <Btn label=" Continue with Apple" variant="outline" disabled={busy} onPress={appleSignIn} style={{ marginTop: 10 }} />
      )}
    </Card>
  );
}

function SignedInAccount() {
  const { colors } = useTheme();
  const { email, signOut, deleteAccount } = useAuth();
  const { state, toggleEmailPref } = useAppState();
  const [busy, setBusy] = useState(false);

  // Absent field = opted in (accounts predate this setting), same as web.
  const emails = state.emails ?? { streak: true, weekly: true };

  function confirmDelete() {
    Alert.alert(
      "Delete my account",
      "This permanently deletes your account and all synced progress. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setBusy(true);
            deleteAccount()
              .catch(() => Alert.alert("Delete failed", "Please try again."))
              .finally(() => setBusy(false));
          },
        },
      ],
    );
  }

  return (
    <Card>
      <AppText variant="kicker">Account</AppText>
      <AppText variant="bold" style={{ marginTop: 8 }}>
        Signed in as {email}
      </AppText>
      <AppText variant="muted" style={{ marginTop: 4 }}>
        Progress syncs automatically between this phone and the web app.
      </AppText>

      <AppText variant="kicker" style={{ marginTop: 16 }}>
        Email preferences
      </AppText>
      <View style={{ marginTop: 4 }}>
        <PrefToggle label="Streak reminder — a nudge before your streak breaks" on={emails.streak} onToggle={() => toggleEmailPref("streak")} />
        <PrefToggle label="Weekly digest — one concept, myth or tip each Monday" on={emails.weekly} onToggle={() => toggleEmailPref("weekly")} />
      </View>

      <Btn label="Sign out" variant="outline" disabled={busy} onPress={() => void signOut()} style={{ marginTop: 14 }} />
      <Pressable accessibilityRole="button" disabled={busy} onPress={confirmDelete} style={{ marginTop: 14, alignSelf: "center" }}>
        <AppText style={{ color: colors.destructive, fontSize: 13, fontFamily: FONTS.bodySemiBold }}>
          Delete my account
        </AppText>
      </Pressable>
    </Card>
  );
}

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { token } = useAuth();
  const { state, hydrated, migrationNotice, dismissMigrationNotice } = useAppState();
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
        {migrationNotice && (
          <View
            style={{
              borderRadius: RADIUS.md,
              backgroundColor: colors.amberSoft,
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          >
            <AppText style={{ color: colors.amber, fontSize: 13.5, lineHeight: 19 }}>
              Your account already had progress saved, so this phone now shows that. The progress made on this device
              before signing in wasn’t merged.
            </AppText>
            <Pressable accessibilityRole="button" onPress={dismissMigrationNotice} style={{ marginTop: 6 }}>
              <AppText variant="bold" style={{ color: colors.amber, fontSize: 13 }}>
                Got it
              </AppText>
            </Pressable>
          </View>
        )}

        {token ? <SignedInAccount /> : <SignedOutAccount />}

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
              overflow: "hidden",
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

import * as AppleAuthentication from "expo-apple-authentication";
import * as Clipboard from "expo-clipboard";
import * as Google from "expo-auth-session/providers/google";
import { Stack } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Platform, Pressable, ScrollView, TextInput, View } from "react-native";

import { exportState, importState } from "@/lib/app-state-transfer";
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
      // Cancelled sheets throw, only surface real failures.
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
        <PrefToggle label="Streak reminder, a nudge before your streak breaks" on={emails.streak} onToggle={() => toggleEmailPref("streak")} />
        <PrefToggle label="Weekly digest, one concept, myth or tip each Monday" on={emails.weekly} onToggle={() => toggleEmailPref("weekly")} />
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
  const { state, hydrated, migrationNotice, migrationBackup, dismissMigrationNotice, replaceState } = useAppState();
  const [copied, setCopied] = useState(false);
  const [oldCopied, setOldCopied] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [restoreText, setRestoreText] = useState("");
  const [restoreStatus, setRestoreStatus] = useState<"idle" | "done" | "error">("idle");

  const backup = useMemo(() => (hydrated ? exportState(state) : ""), [hydrated, state]);

  async function copyBackup() {
    await Clipboard.setStringAsync(backup);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function copyOldProgress() {
    if (!migrationBackup) return;
    await Clipboard.setStringAsync(migrationBackup);
    setOldCopied(true);
    setTimeout(() => setOldCopied(false), 2000);
  }

  function handleRestore() {
    const next = importState(restoreText);
    if (!next) {
      setRestoreStatus("error");
      return;
    }
    replaceState(next);
    setRestoreStatus("done");
    setRestoreText("");
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
              before signing in wasn’t merged. Copy it here if you want to keep it.
            </AppText>
            <View style={{ marginTop: 6, flexDirection: "row", gap: 16 }}>
              {migrationBackup && (
                <Pressable accessibilityRole="button" onPress={copyOldProgress}>
                  <AppText variant="bold" style={{ color: colors.amber, fontSize: 13 }}>
                    {oldCopied ? "Copied ✓" : "Copy old progress code"}
                  </AppText>
                </Pressable>
              )}
              <Pressable accessibilityRole="button" onPress={dismissMigrationNotice}>
                <AppText variant="bold" style={{ color: colors.amber, fontSize: 13 }}>
                  Got it
                </AppText>
              </Pressable>
            </View>
          </View>
        )}

        {token ? <SignedInAccount /> : <SignedOutAccount />}

        {!token && (
        <Card>
          <AppText variant="kicker">Back up &amp; restore</AppText>
          <AppText variant="muted" style={{ marginTop: 8 }}>
            Without an account, progress lives only on this phone. Copy a backup code to keep somewhere safe, or paste
            one to bring progress onto this device. Same format as the web app.
          </AppText>
          <Btn label={copied ? "Copied ✓" : "Copy backup code"} onPress={copyBackup} style={{ marginTop: 12 }} />
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setRestoreOpen((v) => !v);
              setRestoreStatus("idle");
            }}
            style={{ marginTop: 10, paddingVertical: 4 }}
          >
            <AppText variant="bold" style={{ color: colors.primary, fontSize: 13.5 }}>
              Restore from a code
            </AppText>
          </Pressable>
          {restoreOpen && (
            <View style={{ marginTop: 6 }}>
              <TextInput
                value={restoreText}
                onChangeText={(t) => {
                  setRestoreText(t);
                  setRestoreStatus("idle");
                }}
                placeholder="Paste your backup code here"
                placeholderTextColor={colors.mutedForeground}
                multiline
                numberOfLines={3}
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                  borderRadius: RADIUS.md,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                  padding: 12,
                  minHeight: 76,
                  fontFamily: FONTS.body,
                  fontSize: 11,
                  color: colors.foreground,
                  textAlignVertical: "top",
                }}
              />
              <AppText variant="muted" style={{ marginTop: 6, fontSize: 12, lineHeight: 17 }}>
                Restoring replaces the progress currently on this device.
              </AppText>
              <Btn label="Restore" onPress={handleRestore} disabled={restoreText.trim() === ""} style={{ marginTop: 8 }} />
              {restoreStatus === "error" && (
                <AppText style={{ marginTop: 6, color: colors.destructive, fontSize: 12.5, lineHeight: 18 }}>
                  That doesn&rsquo;t look like a backup code. Paste the full code, exactly as it was copied.
                </AppText>
              )}
              {restoreStatus === "done" && (
                <AppText variant="bold" style={{ marginTop: 6, fontSize: 12.5 }}>
                  ✓ Progress restored.
                </AppText>
              )}
            </View>
          )}
        </Card>
        )}

        <AppText variant="muted" style={{ textAlign: "center", fontSize: 11.5, lineHeight: 17, paddingHorizontal: 6 }}>
          Educational information, not personal financial advice. Investing involves risk, including loss of the money
          you invest. Crypto is high-risk and can go to zero.
        </AppText>
      </ScrollView>
    </>
  );
}

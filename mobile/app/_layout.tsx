import { Fraunces_500Medium, Fraunces_600SemiBold } from "@expo-google-fonts/fraunces";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";

import { AppStateProvider, useAppState } from "@/lib/app-state";
import { DARK, FONTS, LIGHT, RADIUS, useTheme } from "@/lib/theme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Fraunces_500Medium,
    Fraunces_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppStateProvider>
      <RootLayoutNav />
    </AppStateProvider>
  );
}

/** Global toast overlay fed by app-state (badge unlocks, streak freezes). */
function Toast() {
  const { toastMessage } = useAppState();
  const { colors } = useTheme();
  if (!toastMessage) return null;
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        bottom: 96,
        left: 24,
        right: 24,
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: colors.foreground,
          borderRadius: RADIUS.xl,
          paddingHorizontal: 18,
          paddingVertical: 12,
        }}
      >
        <Text style={{ color: colors.background, fontFamily: FONTS.bodyMedium, fontSize: 14 }}>{toastMessage}</Text>
      </View>
    </View>
  );
}

function RootLayoutNav() {
  const { colors, dark } = useTheme();

  // Feed Calm Clarity colors into React Navigation so headers/transitions match.
  const base = dark ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: colors.background,
      card: colors.card,
      text: colors.foreground,
      primary: colors.primary,
      border: colors.border,
    },
  };

  return (
    <ThemeProvider value={navTheme}>
      <StatusBar style={dark ? "light" : "dark"} />
      <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="lesson/[id]"
          options={{
            title: "",
            headerBackTitle: "Lessons",
            headerTintColor: dark ? DARK.primary : LIGHT.primary,
            headerStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
          }}
        />
      </Stack>
      <Toast />
    </ThemeProvider>
  );
}

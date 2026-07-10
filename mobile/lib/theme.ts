import { useColorScheme } from "react-native";

/**
 * Calm Clarity palette — mirrors app/src/app/globals.css (web source of truth).
 * Warm paper background, muted forest green, editorial serif headlines.
 */
export interface Palette {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  amber: string;
  amberSoft: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
}

export const LIGHT: Palette = {
  background: "#f8f6ef",
  foreground: "#1c231d",
  card: "#fcfaf3",
  cardForeground: "#1c231d",
  primary: "#33553f",
  primaryForeground: "#f3f1e6",
  secondary: "#eeece2",
  secondaryForeground: "#33553f",
  muted: "#eeece2",
  mutedForeground: "#5e655d",
  accent: "#e6e9df",
  accentForeground: "#33553f",
  amber: "#96580a",
  amberSoft: "#fbf1e2",
  destructive: "#b8382b",
  destructiveForeground: "#fcfaf3",
  border: "#dedacc",
};

export const DARK: Palette = {
  background: "#131511",
  foreground: "#edeee9",
  card: "#182019",
  cardForeground: "#edeee9",
  primary: "#6fcb9b",
  primaryForeground: "#0b140f",
  secondary: "#1c2620",
  secondaryForeground: "#6fcb9b",
  muted: "#1c2620",
  mutedForeground: "#9ca398",
  accent: "#1b2a20",
  accentForeground: "#6fcb9b",
  amber: "#e0a24a",
  amberSoft: "#2a2113",
  destructive: "#e0705f",
  destructiveForeground: "#131511",
  border: "#2a2d26",
};

/** Base radius matches web --radius: 0.6875rem = 11px. */
export const RADIUS = {
  sm: 6,
  md: 9,
  lg: 11,
  xl: 15,
  "2xl": 20,
  pill: 999,
} as const;

export const FONTS = {
  heading: "Fraunces_600SemiBold",
  headingMedium: "Fraunces_500Medium",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
} as const;

export function useTheme(): { colors: Palette; dark: boolean } {
  const scheme = useColorScheme();
  const dark = scheme === "dark";
  return { colors: dark ? DARK : LIGHT, dark };
}

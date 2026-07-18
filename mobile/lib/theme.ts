import { useColorScheme } from "react-native";

/**
 * "Daily Edition" palette — editorial financial-newspaper look.
 * Dark: deep forest night, sage CTAs, gold kickers, coral danger.
 * Light: the paper-edition twin (warm paper, forest CTAs, bronze kickers).
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
  /** Editorial kicker/label accent (gold at night, bronze on paper). */
  gold: string;
  amber: string;
  amberSoft: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
}

export const LIGHT: Palette = {
  background: "#f8f6ef",
  foreground: "#1d231c",
  card: "#fdfbf4",
  cardForeground: "#1d231c",
  primary: "#33553f",
  primaryForeground: "#f3f1e6",
  secondary: "#eeece2",
  secondaryForeground: "#33553f",
  muted: "#eeece2",
  mutedForeground: "#5e655d",
  accent: "#e6e9df",
  accentForeground: "#33553f",
  gold: "#a2702e",
  amber: "#96580a",
  amberSoft: "#fbf1e2",
  destructive: "#c05548",
  destructiveForeground: "#fcfaf3",
  border: "#dedacc",
};

export const DARK: Palette = {
  background: "#11160f",
  foreground: "#eef1ea",
  card: "#1a211a",
  cardForeground: "#eef1ea",
  primary: "#adc9a8",
  primaryForeground: "#13200f",
  secondary: "#222b21",
  secondaryForeground: "#adc9a8",
  muted: "#222b21",
  mutedForeground: "#9aa596",
  accent: "#243020",
  accentForeground: "#bcd6b7",
  gold: "#d9a05b",
  amber: "#d9a05b",
  amberSoft: "#2a2416",
  destructive: "#e2857c",
  destructiveForeground: "#2a1512",
  border: "#2c342b",
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

/**
 * Hex color + 0-1 opacity as an 8-digit hex string, replacing scattered
 * hand-rolled suffixes like `${colors.destructive}1a`.
 */
export function withAlpha(hex: string, alpha: number): string {
  const clamped = Math.max(0, Math.min(1, alpha));
  return `${hex}${Math.round(clamped * 255)
    .toString(16)
    .padStart(2, "0")}`;
}

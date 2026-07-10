import type { HoldingType } from "@/content/types";
import type { Palette } from "@/lib/theme";

/**
 * Web's HOLDING_TYPES carry CSS variables ("var(--primary)") that mean nothing
 * in React Native — resolve them against the active palette instead.
 */
export function holdingColor(type: HoldingType, colors: Palette): string {
  switch (type) {
    case "index":
      return colors.primary;
    case "bonds":
      return colors.amber;
    case "crypto":
      return colors.destructive;
    case "other":
      return colors.mutedForeground;
  }
}

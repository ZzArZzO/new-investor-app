import type { HoldingTypeMeta } from "./types";

// Asset *types* only, never named products or coins. Colours mirror the
// allocation donut used elsewhere.
export const HOLDING_TYPES: HoldingTypeMeta[] = [
  { id: "index", label: "World index / ETF", color: "var(--primary)" },
  { id: "bonds", label: "Bonds", color: "var(--accent)" },
  { id: "crypto", label: "Crypto slice", color: "var(--destructive)" },
  { id: "other", label: "Other", color: "var(--muted-foreground)" },
];

export function holdingTypeMeta(id: string): HoldingTypeMeta | undefined {
  return HOLDING_TYPES.find((t) => t.id === id);
}

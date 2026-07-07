import type { ToolMeta } from "./types";

// which tool embeds in which lesson
export const LESSON_TOOLS: Record<string, ToolMeta["id"]> = {
  l1: "compound",
  l4: "fee",
  l7: "scam",
  l8: "sandbox",
  l9: "allocation",
};

export const TOOLS: ToolMeta[] = [
  { id: "compound", ico: "📈", name: "Compound playground", desc: "Watch small monthly amounts snowball over time.", crypto: false },
  { id: "fee", ico: "🪙", name: "Fee eroder", desc: "See how a tiny yearly fee quietly eats your returns.", crypto: false },
  { id: "scam", ico: "🕵️", name: "Spot the scam", desc: "Safe or scam? Train your eye on real crypto traps.", crypto: true },
  { id: "sandbox", ico: "🧪", name: "Portfolio sandbox", desc: "Mix asset types, then stress-test them through history.", crypto: true },
  { id: "allocation", ico: "🍩", name: "Core + satellite", desc: "Shape a core-and-satellite split and gut-check the risk.", crypto: true },
];

export function toolById(id: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.id === id);
}

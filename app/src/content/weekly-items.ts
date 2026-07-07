import type { WeeklyItem } from "./types";

// Rotated deterministically by ISO week (see this-week-card). No market calls,
// no predictions — just a fresh, evergreen nudge each week to keep the habit alive.
export const WEEKLY_ITEMS: WeeklyItem[] = [
  {
    id: "w1",
    kind: "concept",
    title: "Time in the market",
    body: "The biggest lever isn't picking the perfect investment — it's starting early and giving compounding years to work. Boring and consistent beats clever and sporadic.",
  },
  {
    id: "w2",
    kind: "myth",
    title: "Myth: you need a lot of money to start",
    body: "Many regulated brokers let you buy fractional shares and start with small recurring amounts. The habit matters more than the size of the first buy.",
  },
  {
    id: "w3",
    kind: "tip",
    title: "Check less, not more",
    body: "Frequent checking tends to trigger emotional, ill-timed decisions. Set a boring schedule and let it run — most days there's nothing you need to do.",
  },
  {
    id: "w4",
    kind: "concept",
    title: "Volatility vs. permanent loss",
    body: "A broad market falling and recovering is volatility — noise for a long-term investor. Permanent loss is a single thing going to zero, or panic-selling at the bottom.",
  },
  {
    id: "w5",
    kind: "myth",
    title: "Myth: fees are too small to matter",
    body: "0.2% vs 1.5% a year feels tiny, but over decades it can quietly cost you a third of your final pot. Small percentages compound — against you, too.",
  },
  {
    id: "w6",
    kind: "tip",
    title: "Decide the crypto slice once",
    body: "If you hold any, size it in the cold light of day as an amount you could lose entirely — then don't top it up in a hype frenzy.",
  },
  {
    id: "w7",
    kind: "concept",
    title: "Diversification, the free lunch",
    body: "Own hundreds of companies and one going bust barely registers; own one and it can wipe you out. Spreading risk historically costs very little growth.",
  },
  {
    id: "w8",
    kind: "tip",
    title: "The recovery-phrase rule",
    body: "Your recovery phrase IS your wallet. No legitimate service ever asks for it. Never type it into a website or share it with 'support'.",
  },
  {
    id: "w9",
    kind: "myth",
    title: "Myth: the pros reliably beat the market",
    body: "Most active stock-pickers don't beat a broad, low-cost index over the long run — which is why 'just buy the index' is such common advice.",
  },
  {
    id: "w10",
    kind: "concept",
    title: "Core and satellite",
    body: "A boring diversified core does the long-term work; a small, bounded satellite adds engagement without risking the plan. Your type just leans the shape one way or another.",
  },
];

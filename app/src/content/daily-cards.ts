import type { DailyCard } from "./types";

// Daily true/false questions — rotated deterministically by date.
export const DAILY_CARDS: DailyCard[] = [
  {
    q: 'Cash sitting idle for 20 years is "safe" because the number never drops.',
    a: false,
    why: "Inflation quietly erodes what that cash can buy — doing nothing is a slow, invisible loss.",
  },
  {
    q: "A 20% drop matters far less to a 25-year-old with a long time horizon than to someone retiring next year.",
    a: true,
    why: "With decades to recover, volatility is mostly noise; near retirement it can be a real problem.",
  },
  {
    q: "Most professional stock-pickers beat a broad, low-cost index fund over the long run.",
    a: false,
    why: 'Most do not, which is why "just buy the index" is such common advice.',
  },
  {
    q: "A 1.5% yearly fee versus 0.2% can quietly cost you a third of your final pot over decades.",
    a: true,
    why: "Small fees compound against you year after year.",
  },
  {
    q: "A legitimate support agent might ask for your recovery phrase to help fix your wallet.",
    a: false,
    why: "Never. The recovery phrase IS the wallet — no real service ever asks for it.",
  },
  {
    q: "Diversification lowers risk without giving up much long-term return.",
    a: true,
    why: "It is the closest thing to a free lunch in investing.",
  },
  {
    q: "A typical crypto-asset represents ownership of a business with profits, like a share does.",
    a: false,
    why: "Most have no business or cash flows — value comes from supply, demand and belief.",
  },
  {
    q: '"Only invest what you can afford to lose" is the literal rule for a crypto slice, not a cliché.',
    a: true,
    why: "There is generally no compensation scheme; the slice should be small and bounded.",
  },
  {
    q: "Checking your portfolio constantly tends to improve your returns.",
    a: false,
    why: "Frequent checking usually triggers emotional, ill-timed decisions.",
  },
  {
    q: "Dollar-cost averaging means investing a fixed amount on a schedule, whatever the price.",
    a: true,
    why: "It turns investing into a boring, automatic habit — which is the point.",
  },
];

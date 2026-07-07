import type { ActionStep } from "./types";

// The generic sequence anyone follows to make a first investment. Editorial —
// these are the steps everyone takes, not a recommendation to buy anything.
// "Choose a provider" routes to the (affiliate) comparison table.
export const ACTION_STEPS: ActionStep[] = [
  {
    id: "provider",
    label: "Choose a provider",
    detail: "Compare regulated brokers and MiCA-licensed exchanges — facts only, shown to everyone.",
    route: "/compare",
  },
  {
    id: "open",
    label: "Open an account",
    detail: "Start the sign-up with a provider you picked. Only ever use regulated, licensed platforms.",
  },
  {
    id: "kyc",
    label: "Verify your ID (KYC)",
    detail: "Regulated platforms confirm your identity before you can invest — usually a quick photo-ID check.",
  },
  {
    id: "deposit",
    label: "Make a first deposit",
    detail: "Move an amount you're comfortable with. Nothing here is a target — you decide the size.",
  },
  {
    id: "buy",
    label: "Place your first order",
    detail: "A market order buys now at the current price; a limit order waits for a price you set.",
  },
  {
    id: "recurring",
    label: "Set up a recurring buy",
    detail: "Automating a fixed amount on a schedule turns investing into a boring, reliable habit.",
  },
];

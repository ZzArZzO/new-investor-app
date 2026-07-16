import type { ScamScenario } from "@/content/types";

/** Display labels for scam-scenario channels, shared by the daily card and the tool. */
export const CHANNEL_LABEL: Record<ScamScenario["channel"], string> = {
  DM: "Direct message",
  email: "Email",
  popup: "Pop-up",
};

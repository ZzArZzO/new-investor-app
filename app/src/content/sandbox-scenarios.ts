import type { SandboxScenario } from "./types";

// Illustrative yearly-return SEQUENCES per asset type (not predictions).
export const SANDBOX_SCENARIOS: SandboxScenario[] = [
  {
    id: "good",
    name: "A good decade",
    desc: "Ten broadly rising years, the kind long-term investors hope for.",
    ret: {
      index: [0.14, 0.08, 0.11, 0.06, 0.16, 0.09, 0.12, 0.05, 0.13, 0.1],
      bonds: [0.03, 0.02, 0.04, 0.03, 0.02, 0.03, 0.04, 0.02, 0.03, 0.03],
      crypto: [0.6, 0.3, 0.9, -0.2, 0.55, 0.4, 0.7, -0.1, 0.35, 0.25],
    },
  },
  {
    id: "crash",
    name: "A 2020-style crash + recovery",
    desc: "A sudden deep drop, then a climb back over the following years.",
    ret: {
      index: [-0.34, 0.16, 0.18, 0.12, -0.08, 0.15, 0.1, 0.09, 0.11, 0.07],
      bonds: [0.06, 0.04, 0.02, -0.02, 0.03, 0.02, 0.03, 0.02, 0.02, 0.03],
      crypto: [-0.55, 0.4, 0.8, -0.3, 0.5, 0.3, -0.15, 0.45, 0.2, 0.15],
    },
  },
  {
    id: "lost",
    name: "A lost decade for stocks",
    desc: "A flat, choppy stretch where the market ends roughly where it started.",
    ret: {
      index: [0.05, -0.12, 0.08, -0.06, 0.1, -0.15, 0.09, 0.04, -0.08, 0.07],
      bonds: [0.04, 0.05, 0.03, 0.04, 0.03, 0.05, 0.02, 0.03, 0.04, 0.03],
      crypto: [0.2, -0.4, 0.3, -0.5, 0.25, -0.3, 0.15, 0.1, -0.2, 0.05],
    },
  },
  {
    id: "cryptozero",
    name: "The crypto slice goes to zero",
    desc: "A reminder of Lesson 8: a single high-risk asset can simply not come back.",
    ret: {
      index: [0.09, 0.07, 0.11, 0.06, 0.08, 0.1, 0.05, 0.09, 0.07, 0.08],
      bonds: [0.03, 0.03, 0.02, 0.03, 0.03, 0.02, 0.03, 0.03, 0.02, 0.03],
      crypto: [0.4, -0.5, -0.6, -0.7, -0.8, -0.9, -0.95, -0.99, -0.99, -0.99],
    },
  },
];

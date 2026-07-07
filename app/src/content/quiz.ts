import type { Persona, PersonaKey, QuizQuestion } from "./types";

export const QUIZ: QuizQuestion[] = [
  {
    q: "When you think about investing or crypto, what's your first reaction?",
    o: ["Nervous but curious", "Excited to learn", "Ready to dive in", "I've already dabbled a bit"],
  },
  {
    q: "Your investment drops 20% in a month. What's your gut reaction?",
    o: ["Panic, want to sell", "Uncomfortable, but I'd hold", "Interesting, maybe buy more", "Doesn't bother me much"],
  },
  {
    q: "How hands-on do you want to be?",
    o: ["Set it and forget it", "Check in monthly", "Like following markets regularly", "Want full control over picks"],
  },
  {
    q: "What's your time horizon for this money?",
    o: ["Under 3 years", "3–7 years", "7+ years", "Honestly not sure yet"],
  },
  {
    q: "What's pulling you toward this?",
    o: ["Grow savings safely", "Beat inflation, build a habit", "Learn a skill, get involved", "Curiosity about stocks/crypto"],
  },
  {
    q: "How much research do you want to do before buying?",
    o: ["None, just point me somewhere sensible", "A little", "A fair amount", "A lot, I enjoy this part"],
  },
  {
    q: "Which sounds most like you?",
    o: [
      "One simple, diversified fund",
      "A small mix I understand well",
      "Picking individual companies sometimes",
      "Exploring crypto and newer assets too",
    ],
  },
  {
    q: "How would friends describe your risk approach in life?",
    o: ["Cautious", "Balanced", "Adventurous", "Depends on the day"],
  },
];

export const PERSONAS: Record<PersonaKey, Persona> = {
  A: {
    emoji: "🟢",
    name: "The Cautious Starter",
    desc: "You want safety and simplicity above all, and there's nothing wrong with that.",
    approach:
      "People in this group often start with a single, globally diversified fund weighted toward stability, and build the habit before adding any risk. Crypto, if it appears at all, tends to be a tiny “learn with a few euros” amount, or skipped until they feel comfortable.",
  },
  B: {
    emoji: "🔵",
    name: "The Steady Builder",
    desc: "You want to build wealth over the long term without obsessing over it day to day.",
    approach:
      "People here commonly use a globally diversified index fund with monthly automatic contributions, and sometimes hold a small, clearly-bounded crypto slice kept separate from the core.",
  },
  C: {
    emoji: "🟠",
    name: "The Hands-On Explorer",
    desc: "You enjoy research and want some control over where your money goes.",
    approach:
      "People in this group often use a “core and satellite” shape: a solid index fund as the base, plus a smaller portion in individual stocks, sector ETFs, or a deliberately-sized crypto slice they've researched themselves.",
  },
  D: {
    emoji: "🟣",
    name: "The Curious Diversifier",
    desc: "You're interested in a bit of everything, including newer, higher-risk assets.",
    approach:
      "People here often keep a diversified core, plus a small, clearly-bounded allocation to higher-volatility assets like crypto, framed explicitly as the “high risk, could go to zero” slice and held on a regulated, MiCA-licensed platform.",
  },
};

/**
 * Tally quiz answers (A–D per question) into a persona. Ties default to B
 * (Steady Builder) — mirrors the legacy prototype's scoring exactly.
 */
export function scoreQuiz(answers: PersonaKey[]): PersonaKey {
  const tally: Record<PersonaKey, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((letter) => {
    tally[letter]++;
  });
  const top = Math.max(tally.A, tally.B, tally.C, tally.D);
  const tied = (Object.keys(tally) as PersonaKey[]).filter((k) => tally[k] === top);
  if (tied.length > 1) {
    return tied.includes("B") ? "B" : tied[0];
  }
  return tied[0];
}

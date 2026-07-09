import type { Persona, PersonaKey, QuizQuestion } from "./types";

// Question design notes (see persona-research.md): purely behavioral — no income,
// savings, or time-horizon items (the latter drifts toward regulated suitability).
// Q4 is a Grable-Lytton-style hypothetical choice, Q7 an impulsivity item (BB&K),
// Q8 a money-feelings item (Klontz-inspired). Answers map A–D onto the
// involvement × emotional-style grid the four personas sit on.
export const QUIZ: QuizQuestion[] = [
  {
    q: "When you think about investing or crypto, what's your first reaction?",
    o: ["Nervous but curious", "Fine, as long as it's simple", "Ready to dig in", "Excited — I've been itching to start"],
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
    q: "You can take €500 guaranteed, or a coin flip for €1,200. Which do you take?",
    o: ["The €500, no hesitation", "Probably the €500", "I'd think the odds through first", "The flip — worth the shot"],
  },
  {
    q: "What's pulling you toward this?",
    o: [
      "Grow savings safely",
      "Beat inflation, build a habit",
      "Learn a skill, get involved",
      "The excitement — and not missing what everyone's talking about",
    ],
  },
  {
    q: "How much research do you want to do before buying?",
    o: ["None, just point me somewhere sensible", "A little", "A lot, I enjoy this part", "Not much — I trust my gut"],
  },
  {
    q: "You've decided to try something new with money. What happens next?",
    o: [
      "I sleep on it — probably several nights",
      "I set it up calmly and let it run",
      "I research first, then act deliberately",
      "I act the same day, while I'm excited",
    ],
  },
  {
    q: "Thinking about money mostly makes you feel…",
    o: ["Anxious — I'd rather not", "Fine — as long as it stays simple", "Interested — I like understanding it", "Excited — the swings are part of the fun"],
  },
];

export const PERSONAS: Record<PersonaKey, Persona> = {
  A: {
    emoji: "🟢",
    name: "The Careful Starter",
    slug: "careful-starter",
    desc: "Money decisions feel heavy, so you want safety, simplicity and small steps.",
    approach:
      "People in this group often start with a single, globally diversified fund weighted toward stability, and build the habit with small automatic amounts before adding any risk. Crypto, if it appears at all, tends to be a tiny “learn with a few euros” amount, or skipped until they feel comfortable.",
    strengths: [
      "Takes risk seriously — the hype machine bounces right off you",
      "Once a habit starts, it sticks",
      "Unlikely to bet money that shouldn't be bet",
    ],
    blindSpots: [
      "Waiting until you feel “fully ready” quietly costs compounding years",
      "Idle cash isn't actually safe — inflation erodes it",
      "A drop can trigger panic-selling unless you've written a plan in calm weather",
    ],
  },
  B: {
    emoji: "🔵",
    name: "The Steady Autopilot",
    slug: "steady-autopilot",
    desc: "You want wealth to build itself in the background while you get on with life.",
    approach:
      "People here commonly use a globally diversified index fund with monthly automatic contributions, and sometimes hold a small, clearly-bounded crypto slice kept separate from the core. Automation does the work; checking is rare and scheduled.",
    strengths: [
      "Automation-friendly — the boring monthly habit is your superpower",
      "Dips don't rattle you much",
      "Consistency beats cleverness over decades, and you have it",
    ],
    blindSpots: [
      "Set-and-forget can become never-check — a yearly rebalance still matters",
      "Following defaults or friends without checking fees can quietly cost a lot",
      "Low interest means scams dressed as “simple products” deserve extra suspicion",
    ],
  },
  C: {
    emoji: "🟠",
    name: "The Curious Explorer",
    slug: "curious-explorer",
    desc: "You want to understand how it all works and make your own informed calls.",
    approach:
      "People in this group often use a “core and satellite” shape: a solid index fund as the base, plus a smaller portion in individual stocks, sector ETFs, or a deliberately-sized crypto slice they've researched themselves.",
    strengths: [
      "You do the homework and read past the headlines",
      "Learning is fun for you, so you keep getting better",
      "Comfortable separating a solid core from researched experiments",
    ],
    blindSpots: [
      "A few wins can turn research into overconfidence — the market humbles everyone",
      "Research rabbit holes can delay actually starting",
      "You'll find evidence for what you already believe unless you look for the opposite",
    ],
  },
  D: {
    emoji: "🟣",
    name: "The Thrill Chaser",
    slug: "thrill-chaser",
    desc: "The excitement is real — the swings, the new assets, being early. The trick is keeping the thrill without betting your foundation.",
    approach:
      "People like this often keep a boring, diversified core doing the real work, plus a small, hard-capped “excitement slice” — often including crypto on a MiCA-licensed platform — deliberately sized as an amount they could lose entirely. The size gets decided once, in the cold light of day, never topped up mid-hype.",
    strengths: [
      "Energy to actually learn — curiosity is the best fuel there is",
      "Volatility doesn't scare you into bad exits",
      "Often early to genuinely understand new technology",
    ],
    blindSpots: [
      "FOMO buys at peak attention — which is usually peak price",
      "The exciting slice tends to grow mid-hype unless it's hard-capped",
      "Constant checking amplifies emotional trades",
      "Scammers specifically hunt people who move fast — slow down on anything urgent",
    ],
  },
};

/** All four personas in display order, for the published /types pages. */
export const PERSONA_LIST: Persona[] = [PERSONAS.A, PERSONAS.B, PERSONAS.C, PERSONAS.D];

export function personaBySlug(slug: string): Persona | undefined {
  return PERSONA_LIST.find((p) => p.slug === slug);
}

/**
 * Tally quiz answers (A–D per question) into a persona. Ties default to B
 * (Steady Autopilot) — mirrors the legacy prototype's scoring exactly.
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

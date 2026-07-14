import { LESSONS } from "@/content/lessons";
import { GLOSSARY } from "@/content/glossary";
import type { AppState, LessonCheck } from "@/content/types";
import { dueReviewItems, reviewOf } from "./app-state-logic";
import { checkOptionOrder } from "./check-order";
import { daySeed } from "./date";

/** One renderable card in a review session. */
export interface ReviewCardData {
  id: string;
  question: string;
  options: string[];
  answer: number;
  why: string;
}

export function checkReviewId(lessonId: string, questionIndex: number): string {
  return `check:${lessonId}:${questionIndex}`;
}

/** Resolves a "check:<lessonId>:<idx>" id back to its lesson question. */
function resolveCheckCard(id: string): ReviewCardData | null {
  const [, lessonId, idxStr] = id.split(":");
  const lesson = LESSONS.find((l) => l.id === lessonId);
  const check: LessonCheck | undefined = lesson?.check[Number(idxStr)];
  if (!lesson || !check) return null;
  // Same rotated order as the lesson view, so the correct answer isn't always first.
  const order = checkOptionOrder(check);
  return { id, question: check.q, options: order.map((i) => check.o[i]), answer: order.indexOf(check.a), why: check.why };
}

/** Builds a "which term matches this definition?" card with two deterministic decoys. */
function buildTermCard(term: string, seed: number): ReviewCardData | null {
  const definition = GLOSSARY[term];
  if (!definition) return null;
  const others = Object.keys(GLOSSARY).filter((t) => t !== term);
  const decoyA = others[seed % others.length];
  const rest = others.filter((t) => t !== decoyA);
  const decoyB = rest[(seed >> 3) % rest.length];
  const options = [term, decoyA, decoyB];
  // Deterministic shuffle-by-rotation so the right answer isn't always first.
  const rotate = seed % options.length;
  const rotated = [...options.slice(rotate), ...options.slice(0, rotate)];
  return {
    id: `term:${term}`,
    question: `Which term matches: “${definition}”`,
    options: rotated,
    answer: rotated.indexOf(term),
    why: `${term}, ${definition}`,
  };
}

function resolveCard(id: string, seed: number): ReviewCardData | null {
  if (id.startsWith("check:")) return resolveCheckCard(id);
  if (id.startsWith("term:")) return buildTermCard(id.slice("term:".length), seed);
  return null;
}

/**
 * Composes today's review session: due cards first, topped up with glossary
 * terms not yet in the deck (rotated deterministically by date), capped at
 * `limit`. Pure, same state + date always yields the same session.
 */
export function composeReviewSession(state: AppState, today: string, limit: number): ReviewCardData[] {
  if (limit <= 0) return [];
  const seed = daySeed(today);
  const due = dueReviewItems(state, today)
    .map((item) => resolveCard(item.id, seed))
    .filter((card): card is ReviewCardData => card !== null);

  const inDeck = new Set(reviewOf(state).items.map((item) => item.id));
  const freshTerms = Object.keys(GLOSSARY).filter((term) => !inDeck.has(`term:${term}`));
  const topUp: ReviewCardData[] = [];
  const start = freshTerms.length > 0 ? seed % freshTerms.length : 0;
  for (let i = 0; i < freshTerms.length && due.length + topUp.length < limit; i++) {
    const term = freshTerms[(start + i) % freshTerms.length];
    const card = buildTermCard(term, seed + i);
    if (card) topUp.push(card);
  }

  return [...due.slice(0, limit), ...topUp];
}

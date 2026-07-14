import type { LessonCheck } from "@/content/types";

/**
 * Display order for a check's options. Content stores the correct answer at
 * index 0, so rendering in stored order would teach "always pick the first
 * option". Rotated by a hash of the question text: deterministic, so server
 * and client render the same order (no hydration mismatch) and the review
 * deck shows the same layout as the lesson.
 */
export function checkOptionOrder(check: LessonCheck): number[] {
  let hash = 0;
  for (let i = 0; i < check.q.length; i++) hash = (hash * 31 + check.q.charCodeAt(i)) >>> 0;
  const rotate = hash % check.o.length;
  const indices = check.o.map((_, i) => i);
  return [...indices.slice(rotate), ...indices.slice(0, rotate)];
}

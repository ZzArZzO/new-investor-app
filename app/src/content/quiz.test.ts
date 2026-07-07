import { describe, expect, it } from "vitest";
import { scoreQuiz } from "./quiz";
import type { PersonaKey } from "./types";

describe("scoreQuiz", () => {
  it("picks the letter with the most answers", () => {
    const answers: PersonaKey[] = ["C", "C", "C", "A", "B"];
    expect(scoreQuiz(answers)).toBe("C");
  });

  it("defaults a tie to B (Steady Builder) when B is among the tied letters", () => {
    const answers: PersonaKey[] = ["A", "A", "B", "B"];
    expect(scoreQuiz(answers)).toBe("B");
  });

  it("picks the first tied letter when B is not among the tied letters", () => {
    const answers: PersonaKey[] = ["A", "A", "C", "C"];
    expect(scoreQuiz(answers)).toBe("A");
  });

  it("handles a unanimous set of answers", () => {
    const answers: PersonaKey[] = ["D", "D", "D", "D", "D", "D", "D", "D"];
    expect(scoreQuiz(answers)).toBe("D");
  });
});

import { describe, expect, it } from "vitest";
import { isLocked, nextLockoutState } from "./auth-lockout";

describe("isLocked", () => {
  const now = new Date("2026-07-09T12:00:00Z");

  it("is not locked when there's no lockedUntil", () => {
    expect(isLocked(null, now)).toBe(false);
  });

  it("is locked when lockedUntil is in the future", () => {
    expect(isLocked(new Date("2026-07-09T12:05:00Z"), now)).toBe(true);
  });

  it("is not locked once lockedUntil has passed", () => {
    expect(isLocked(new Date("2026-07-09T11:55:00Z"), now)).toBe(false);
  });
});

describe("nextLockoutState", () => {
  const now = new Date("2026-07-09T12:00:00Z");

  it("increments attempts without locking below the threshold", () => {
    const result = nextLockoutState(2, now);
    expect(result.failedLoginAttempts).toBe(3);
    expect(result.lockedUntil).toBeNull();
  });

  it("locks once attempts reach the threshold", () => {
    const result = nextLockoutState(4, now);
    expect(result.failedLoginAttempts).toBe(5);
    expect(result.lockedUntil).not.toBeNull();
    expect(result.lockedUntil!.getTime()).toBeGreaterThan(now.getTime());
  });
});

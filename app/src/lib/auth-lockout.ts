const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

/** Basic brute-force guard for the Credentials provider — no external rate-limit infra yet. */
export function isLocked(lockedUntil: Date | null, now: Date): boolean {
  return lockedUntil !== null && lockedUntil > now;
}

export function nextLockoutState(
  failedAttempts: number,
  now: Date,
): { failedLoginAttempts: number; lockedUntil: Date | null } {
  const attempts = failedAttempts + 1;
  return {
    failedLoginAttempts: attempts,
    lockedUntil: attempts >= MAX_ATTEMPTS ? new Date(now.getTime() + LOCKOUT_MS) : null,
  };
}

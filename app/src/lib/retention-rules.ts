import type { AppState } from "@/content/types";

export const MIN_STREAK_TO_NAG = 2;

/** Only nag if the streak broke tonight (last active = yesterday), it's worth protecting, and today's warning hasn't gone out yet. */
export function shouldSendStreakWarning(
  streak: AppState["streak"] | undefined,
  sentOn: string | null,
  today: string,
  yesterday: string,
): boolean {
  if (!streak || streak.last !== yesterday) return false;
  if (streak.count < MIN_STREAK_TO_NAG) return false;
  if (sentOn === today) return false;
  return true;
}

/** One digest per ISO week, guarded by the Monday date string already stamped on send. */
export function shouldSendWeeklyDigest(sentOn: string | null, monday: string): boolean {
  return sentOn !== monday;
}

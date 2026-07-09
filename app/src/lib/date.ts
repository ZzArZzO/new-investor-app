export function todayStr(now: Date = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function yesterdayStr(now: Date = new Date()): string {
  const d = new Date(now);
  d.setDate(d.getDate() - 1);
  return todayStr(d);
}

export function daysAgoStr(days: number, now: Date = new Date()): string {
  const d = new Date(now);
  d.setDate(d.getDate() - days);
  return todayStr(d);
}

export function daysFromNowStr(days: number, now: Date = new Date()): string {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  return todayStr(d);
}

/** Deterministic non-cryptographic string hash, used to rotate daily content by date. */
export function daySeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function fmtEur(n: number): string {
  return `€${Math.round(n).toLocaleString("en-US")}`;
}

/** The Monday of the ISO week containing `now`, at local midnight. */
export function mondayOf(now: Date = new Date()): Date {
  const mondayOffset = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - mondayOffset);
  return monday;
}

/** Deterministically picks one item per ISO week from a list, rotating by the week's Monday date. */
export function pickForWeek<T>(items: readonly T[], now: Date = new Date()): T {
  return items[daySeed(todayStr(mondayOf(now))) % items.length];
}

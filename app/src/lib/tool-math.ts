import type { SandboxReturns } from "@/content/types";

/** Annual snapshots of a monthly-contribution investment compounded monthly. */
export function fvSeries(pmt: number, years: number, ratePct: number): number[] {
  const r = ratePct / 100 / 12;
  let bal = 0;
  const arr = [0];
  for (let m = 1; m <= years * 12; m++) {
    bal = bal * (1 + r) + pmt;
    if (m % 12 === 0) arr.push(bal);
  }
  return arr;
}

export interface FeeErosionResult {
  low: number;
  high: number;
  lost: number;
}

/** Compares a lump sum grown at a low fee vs. a higher fee, both against the same gross return. */
export function feeErosion(lump: number, grossPct: number, feePct: number, years: number, lowFeePct = 0.2): FeeErosionResult {
  const low = lump * Math.pow(1 + (grossPct - lowFeePct) / 100, years);
  const high = lump * Math.pow(1 + (grossPct - feePct) / 100, years);
  return { low, high, lost: Math.max(0, low - high) };
}

export interface SandboxPathResult {
  path: number[];
  maxDrawdown: number;
}

/** Runs a normalized (index/bonds/crypto sum to 100) starting mix through a return sequence. */
export function sandboxPath(indexPct: number, bondsPct: number, cryptoPct: number, ret: SandboxReturns): SandboxPathResult {
  const total = indexPct + bondsPct + cryptoPct || 1;
  let idx = (100 * indexPct) / total;
  let bnd = (100 * bondsPct) / total;
  let cry = (100 * cryptoPct) / total;
  const path = [idx + bnd + cry];
  let peak = path[0];
  let maxDrawdown = 0;
  for (let y = 0; y < ret.index.length; y++) {
    idx *= 1 + ret.index[y];
    bnd *= 1 + ret.bonds[y];
    cry *= 1 + ret.crypto[y];
    const t = idx + bnd + cry;
    path.push(t);
    if (t > peak) peak = t;
    const dd = (peak - t) / peak;
    if (dd > maxDrawdown) maxDrawdown = dd;
  }
  return { path, maxDrawdown };
}

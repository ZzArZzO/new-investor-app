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

/**
 * Rebalances three portfolio weights so they always sum to 100. The changed
 * slider keeps its new value (clamped to the step grid); the other two scale
 * proportionally into the remainder. When both others are zero, the remainder
 * splits evenly. All results stay on the step grid and sum to exactly 100.
 */
export function rebalanceWeights(weights: [number, number, number], changed: number, value: number, step = 5): [number, number, number] {
  const v = Math.min(100, Math.max(0, Math.round(value / step) * step));
  const rest = 100 - v;
  const otherIdx = [0, 1, 2].filter((i) => i !== changed);
  const otherSum = weights[otherIdx[0]] + weights[otherIdx[1]];
  const next: [number, number, number] = [...weights];
  next[changed] = v;
  if (otherSum === 0) {
    const half = Math.round(rest / 2 / step) * step;
    next[otherIdx[0]] = rest - half;
    next[otherIdx[1]] = half;
  } else {
    const first = Math.min(rest, Math.round((rest * weights[otherIdx[0]]) / otherSum / step) * step);
    next[otherIdx[0]] = first;
    next[otherIdx[1]] = rest - first;
  }
  return next;
}

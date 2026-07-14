import { describe, expect, it } from "vitest";
import { feeErosion, fvSeries, rebalanceWeights, sandboxPath } from "./tool-math";

describe("fvSeries", () => {
  it("starts at zero with no contributions made yet", () => {
    expect(fvSeries(150, 10, 7)[0]).toBe(0);
  });

  it("returns one snapshot per year plus the starting zero", () => {
    expect(fvSeries(150, 10, 7)).toHaveLength(11);
  });

  it("grows faster with a higher rate for the same contributions", () => {
    const low = fvSeries(150, 20, 2);
    const high = fvSeries(150, 20, 10);
    expect(high[high.length - 1]).toBeGreaterThan(low[low.length - 1]);
  });

  it("with 0% return, ends at exactly the sum contributed", () => {
    const series = fvSeries(100, 5, 0);
    expect(series[series.length - 1]).toBeCloseTo(100 * 5 * 12, 5);
  });
});

describe("feeErosion", () => {
  it("costs nothing extra when the fee equals the low-fee baseline", () => {
    const { lost } = feeErosion(10000, 7, 0.2, 30, 0.2);
    expect(lost).toBeCloseTo(0, 5);
  });

  it("a higher fee erodes more of the final value over more years", () => {
    const shortHorizon = feeErosion(10000, 7, 1.5, 5);
    const longHorizon = feeErosion(10000, 7, 1.5, 30);
    expect(longHorizon.lost).toBeGreaterThan(shortHorizon.lost);
  });

  it("never reports negative loss when the fee is below the baseline", () => {
    const { lost } = feeErosion(10000, 7, 0.05, 30, 0.2);
    expect(lost).toBe(0);
  });
});

describe("sandboxPath", () => {
  const flat = { index: [0, 0, 0], bonds: [0, 0, 0], crypto: [0, 0, 0] };

  it("normalizes an all-index portfolio to start at 100", () => {
    const { path } = sandboxPath(60, 30, 10, flat);
    expect(path[0]).toBeCloseTo(100, 5);
  });

  it("stays flat with 0% returns across every year", () => {
    const { path, maxDrawdown } = sandboxPath(50, 50, 0, flat);
    expect(path.every((v) => Math.abs(v - 100) < 1e-9)).toBe(true);
    expect(maxDrawdown).toBe(0);
  });

  it("reports a drawdown when a path drops below its prior peak", () => {
    const drop = { index: [0.5, -0.5, 0], bonds: [0, 0, 0], crypto: [0, 0, 0] };
    const { maxDrawdown } = sandboxPath(100, 0, 0, drop);
    expect(maxDrawdown).toBeGreaterThan(0);
  });

  it("avoids dividing by zero when all weights are zero", () => {
    const { path } = sandboxPath(0, 0, 0, flat);
    expect(Number.isFinite(path[0])).toBe(true);
  });
});

describe("rebalanceWeights", () => {
  it("keeps the changed value and scales the others to fill 100", () => {
    const next = rebalanceWeights([60, 30, 10], 0, 40);
    expect(next[0]).toBe(40);
    expect(next[0] + next[1] + next[2]).toBe(100);
    expect(next[1]).toBeGreaterThan(next[2]);
  });

  it("always sums to exactly 100 across the step grid", () => {
    for (let v = 0; v <= 100; v += 5) {
      const next = rebalanceWeights([40, 90, 10], 1, v);
      expect(next[0] + next[1] + next[2]).toBe(100);
      expect(next[1]).toBe(v);
    }
  });

  it("splits the remainder evenly when the other two weights are zero", () => {
    const next = rebalanceWeights([100, 0, 0], 0, 50);
    expect(next).toEqual([50, 25, 25]);
  });

  it("clamps out-of-range values into 0-100", () => {
    expect(rebalanceWeights([60, 30, 10], 2, 150)[2]).toBe(100);
    expect(rebalanceWeights([60, 30, 10], 2, -20)[2]).toBe(0);
  });

  it("keeps results on the step grid", () => {
    const next = rebalanceWeights([35, 55, 10], 0, 70);
    for (const w of next) expect(w % 5).toBe(0);
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";

const { returningMock } = vi.hoisted(() => ({ returningMock: vi.fn() }));

vi.mock("@/db/client", () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        onConflictDoUpdate: vi.fn(() => ({ returning: returningMock })),
      })),
    })),
  },
}));

import { checkRateLimit, clientIp, RATE_LIMIT_MESSAGE } from "./rate-limit";

afterEach(() => {
  vi.clearAllMocks();
});

describe("checkRateLimit", () => {
  it("allows requests while the window count is at or below the limit", async () => {
    returningMock.mockResolvedValue([{ count: 5 }]);
    expect(await checkRateLimit("register", "1.2.3.4", 5, 60_000)).toBe(true);
  });

  it("blocks requests once the window count exceeds the limit", async () => {
    returningMock.mockResolvedValue([{ count: 6 }]);
    expect(await checkRateLimit("register", "1.2.3.4", 5, 60_000)).toBe(false);
  });

  it("treats a missing returned row as the first request", async () => {
    returningMock.mockResolvedValue([]);
    expect(await checkRateLimit("register", "1.2.3.4", 5, 60_000)).toBe(true);
  });
});

describe("clientIp", () => {
  it("uses the first x-forwarded-for entry", () => {
    const req = new Request("https://x.test", { headers: { "x-forwarded-for": "9.9.9.9, 10.0.0.1" } });
    expect(clientIp(req)).toBe("9.9.9.9");
  });

  it("falls back to x-real-ip, then a shared bucket", () => {
    const real = new Request("https://x.test", { headers: { "x-real-ip": "8.8.8.8" } });
    expect(clientIp(real)).toBe("8.8.8.8");
    expect(clientIp(new Request("https://x.test"))).toBe("unknown");
  });
});

describe("RATE_LIMIT_MESSAGE", () => {
  it("is a user-facing sentence, not an internal error", () => {
    expect(RATE_LIMIT_MESSAGE).toMatch(/try again/i);
  });
});

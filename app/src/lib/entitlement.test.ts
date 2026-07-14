import { afterEach, describe, expect, it, vi } from "vitest";
import { getEntitlement, planForEmail, planForUser } from "./entitlement";

const { selectWhere } = vi.hoisted(() => ({ selectWhere: vi.fn() }));

vi.mock("@/db/client", () => ({
  db: { select: vi.fn(() => ({ from: vi.fn(() => ({ where: selectWhere })) })) },
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("planForEmail", () => {
  it("grants plus to an allowlisted email, case-insensitively", () => {
    expect(planForEmail("Tester@Example.com", "tester@example.com,other@example.com")).toBe("plus");
  });

  it("returns free for emails not on the list", () => {
    expect(planForEmail("someone@example.com", "tester@example.com")).toBe("free");
  });

  it("returns free when the allowlist is unset or empty", () => {
    expect(planForEmail("tester@example.com", undefined)).toBe("free");
    expect(planForEmail("tester@example.com", "")).toBe("free");
  });

  it("returns free for a missing email", () => {
    expect(planForEmail(null, "tester@example.com")).toBe("free");
    expect(planForEmail(undefined, "tester@example.com")).toBe("free");
  });

  it("tolerates whitespace around allowlist entries", () => {
    expect(planForEmail("a@b.com", " a@b.com , c@d.com ")).toBe("plus");
  });
});

describe("getEntitlement", () => {
  it("returns free when no subscription row exists", async () => {
    selectWhere.mockResolvedValue([]);
    expect(await getEntitlement("user-1")).toBe("free");
  });

  it("returns free when status is not active/trialing", async () => {
    selectWhere.mockResolvedValue([{ status: "canceled", currentPeriodEnd: new Date(Date.now() + 100_000) }]);
    expect(await getEntitlement("user-1")).toBe("free");
  });

  it("returns free when currentPeriodEnd is in the past (stale webhook fails safe)", async () => {
    selectWhere.mockResolvedValue([{ status: "active", currentPeriodEnd: new Date(Date.now() - 1000) }]);
    expect(await getEntitlement("user-1")).toBe("free");
  });

  it("returns plus for an active subscription with a future period end", async () => {
    selectWhere.mockResolvedValue([{ status: "active", currentPeriodEnd: new Date(Date.now() + 100_000) }]);
    expect(await getEntitlement("user-1")).toBe("plus");
  });

  it("returns plus for trialing status", async () => {
    selectWhere.mockResolvedValue([{ status: "trialing", currentPeriodEnd: new Date(Date.now() + 100_000) }]);
    expect(await getEntitlement("user-1")).toBe("plus");
  });
});

describe("planForUser", () => {
  it("grants plus via tester allowlist without querying the db", async () => {
    const prevAllowlist = process.env.PLUS_TESTER_EMAILS;
    process.env.PLUS_TESTER_EMAILS = "tester@example.com";
    expect(await planForUser("user-1", "tester@example.com")).toBe("plus");
    expect(selectWhere).not.toHaveBeenCalled();
    process.env.PLUS_TESTER_EMAILS = prevAllowlist;
  });

  it("falls back to real entitlement when not a tester", async () => {
    selectWhere.mockResolvedValue([{ status: "active", currentPeriodEnd: new Date(Date.now() + 100_000) }]);
    expect(await planForUser("user-1", "someone@example.com")).toBe("plus");
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const { authMock, selectWhere, insertValues, onConflictDoUpdate, customersCreate, checkoutSessionsCreate } = vi.hoisted(() => ({
  authMock: vi.fn(),
  selectWhere: vi.fn(),
  insertValues: vi.fn(),
  onConflictDoUpdate: vi.fn(),
  customersCreate: vi.fn(),
  checkoutSessionsCreate: vi.fn(),
}));

vi.mock("@/auth", () => ({ auth: authMock }));
vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn(async () => true),
  clientIp: () => "test-ip",
  RATE_LIMIT_MESSAGE: "Too many attempts. Try again in a few minutes.",
}));

vi.mock("@/db/client", () => ({
  db: {
    select: vi.fn(() => ({ from: vi.fn(() => ({ where: selectWhere })) })),
    insert: vi.fn(() => ({
      values: vi.fn((v: unknown) => {
        insertValues(v);
        return { onConflictDoUpdate };
      }),
    })),
  },
}));
vi.mock("@/lib/stripe", () => ({
  stripeClient: () => ({
    customers: { create: customersCreate },
    checkout: { sessions: { create: checkoutSessionsCreate } },
  }),
  priceIdForInterval: (interval: string) => `price_${interval}`,
}));

const SESSION = { user: { id: "user-1", email: "reader@example.com" } };

function req(body: unknown) {
  return new Request("http://localhost/api/billing/checkout", { method: "POST", body: JSON.stringify(body) });
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/billing/checkout", () => {
  it("returns 401 when unauthenticated", async () => {
    authMock.mockResolvedValue(null);
    const res = await POST(req({ interval: "monthly" }));
    expect(res.status).toBe(401);
    expect(checkoutSessionsCreate).not.toHaveBeenCalled();
  });

  it("rejects an invalid interval", async () => {
    authMock.mockResolvedValue(SESSION);
    const res = await POST(req({ interval: "weekly" }));
    expect(res.status).toBe(400);
    expect(checkoutSessionsCreate).not.toHaveBeenCalled();
  });

  it("creates a new Stripe customer when none exists yet, then a checkout session", async () => {
    authMock.mockResolvedValue(SESSION);
    selectWhere.mockResolvedValue([]);
    customersCreate.mockResolvedValue({ id: "cus_123" });
    onConflictDoUpdate.mockResolvedValue(undefined);
    checkoutSessionsCreate.mockResolvedValue({ url: "https://checkout.stripe.com/session" });

    const res = await POST(req({ interval: "annual" }));

    expect(customersCreate).toHaveBeenCalledWith(expect.objectContaining({ email: "reader@example.com" }));
    expect(insertValues).toHaveBeenCalledWith(expect.objectContaining({ userId: "user-1", stripeCustomerId: "cus_123" }));
    expect(checkoutSessionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({ customer: "cus_123", client_reference_id: "user-1" }),
    );
    expect(await res.json()).toEqual({ url: "https://checkout.stripe.com/session" });
  });

  it("reuses an existing Stripe customer id", async () => {
    authMock.mockResolvedValue(SESSION);
    selectWhere.mockResolvedValue([{ stripeCustomerId: "cus_existing" }]);
    checkoutSessionsCreate.mockResolvedValue({ url: "https://checkout.stripe.com/session" });

    await POST(req({ interval: "monthly" }));

    expect(customersCreate).not.toHaveBeenCalled();
    expect(checkoutSessionsCreate).toHaveBeenCalledWith(expect.objectContaining({ customer: "cus_existing" }));
  });
});

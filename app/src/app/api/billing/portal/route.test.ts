import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const { authMock, selectWhere, portalSessionsCreate } = vi.hoisted(() => ({
  authMock: vi.fn(),
  selectWhere: vi.fn(),
  portalSessionsCreate: vi.fn(),
}));

vi.mock("@/auth", () => ({ auth: authMock }));
vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn(async () => true),
  clientIp: () => "test-ip",
  RATE_LIMIT_MESSAGE: "Too many attempts. Try again in a few minutes.",
}));

vi.mock("@/db/client", () => ({
  db: { select: vi.fn(() => ({ from: vi.fn(() => ({ where: selectWhere })) })) },
}));
vi.mock("@/lib/stripe", () => ({
  stripeClient: () => ({ billingPortal: { sessions: { create: portalSessionsCreate } } }),
}));

const SESSION = { user: { id: "user-1", email: "reader@example.com" } };

function req() {
  return new Request("http://localhost/api/billing/portal", { method: "POST" });
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/billing/portal", () => {
  it("returns 401 when unauthenticated", async () => {
    authMock.mockResolvedValue(null);
    const res = await POST(req());
    expect(res.status).toBe(401);
    expect(portalSessionsCreate).not.toHaveBeenCalled();
  });

  it("returns 404 when the user has no billing account yet", async () => {
    authMock.mockResolvedValue(SESSION);
    selectWhere.mockResolvedValue([]);
    const res = await POST(req());
    expect(res.status).toBe(404);
    expect(portalSessionsCreate).not.toHaveBeenCalled();
  });

  it("returns a portal session url for an existing customer", async () => {
    authMock.mockResolvedValue(SESSION);
    selectWhere.mockResolvedValue([{ stripeCustomerId: "cus_123" }]);
    portalSessionsCreate.mockResolvedValue({ url: "https://billing.stripe.com/session" });

    const res = await POST(req());

    expect(portalSessionsCreate).toHaveBeenCalledWith(expect.objectContaining({ customer: "cus_123" }));
    expect(await res.json()).toEqual({ url: "https://billing.stripe.com/session" });
  });
});

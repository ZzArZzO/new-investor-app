import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const { constructEvent, subscriptionsRetrieve, selectWhere, insertValues, onConflictDoUpdate, updateSet, updateWhere } =
  vi.hoisted(() => ({
    constructEvent: vi.fn(),
    subscriptionsRetrieve: vi.fn(),
    selectWhere: vi.fn(),
    insertValues: vi.fn(),
    onConflictDoUpdate: vi.fn(),
    updateSet: vi.fn(),
    updateWhere: vi.fn(),
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
    update: vi.fn(() => ({
      set: vi.fn((v: unknown) => {
        updateSet(v);
        return { where: updateWhere };
      }),
    })),
  },
}));
vi.mock("@/lib/stripe", () => ({
  stripeClient: () => ({
    webhooks: { constructEvent },
    subscriptions: { retrieve: subscriptionsRetrieve },
  }),
}));

function req(body: string, signature = "sig_test") {
  return new Request("http://localhost/api/stripe/webhook", {
    method: "POST",
    body,
    headers: signature ? { "stripe-signature": signature } : {},
  });
}

const SUBSCRIPTION = {
  id: "sub_123",
  status: "active",
  cancel_at_period_end: false,
  customer: "cus_123",
  items: { data: [{ price: { id: "price_annual" }, current_period_end: 1_800_000_000 }] },
};

beforeEach(() => {
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/stripe/webhook", () => {
  it("returns 400 when the webhook secret is unset", async () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const res = await POST(req("{}"));
    expect(res.status).toBe(400);
  });

  it("returns 400 on an invalid signature", async () => {
    constructEvent.mockImplementation(() => {
      throw new Error("bad signature");
    });
    const res = await POST(req("{}"));
    expect(res.status).toBe(400);
  });

  it("upserts a subscription row on checkout.session.completed", async () => {
    constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: { client_reference_id: "user-1", customer: "cus_123", subscription: "sub_123" } },
    });
    subscriptionsRetrieve.mockResolvedValue(SUBSCRIPTION);
    onConflictDoUpdate.mockResolvedValue(undefined);

    const res = await POST(req("{}"));

    expect(res.status).toBe(200);
    expect(insertValues).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "user-1", stripeCustomerId: "cus_123", status: "active", priceId: "price_annual" }),
    );
  });

  it("updates the matching row on customer.subscription.updated", async () => {
    constructEvent.mockReturnValue({ type: "customer.subscription.updated", data: { object: SUBSCRIPTION } });
    selectWhere.mockResolvedValue([{ userId: "user-1" }]);

    const res = await POST(req("{}"));

    expect(res.status).toBe(200);
    expect(updateSet).toHaveBeenCalledWith(expect.objectContaining({ status: "active" }));
  });

  it("no-ops on customer.subscription.updated when no row matches the customer yet", async () => {
    constructEvent.mockReturnValue({ type: "customer.subscription.updated", data: { object: SUBSCRIPTION } });
    selectWhere.mockResolvedValue([]);

    const res = await POST(req("{}"));

    expect(res.status).toBe(200);
    expect(updateSet).not.toHaveBeenCalled();
  });

  it("200-noops unhandled event types", async () => {
    constructEvent.mockReturnValue({ type: "invoice.paid", data: { object: {} } });
    const res = await POST(req("{}"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
  });
});

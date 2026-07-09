import { afterEach, describe, expect, it, vi } from "vitest";
import { GET, PUT } from "./route";

const { authMock, selectWhere, insertValues, onConflictDoUpdate } = vi.hoisted(() => ({
  authMock: vi.fn(),
  selectWhere: vi.fn(),
  insertValues: vi.fn(),
  onConflictDoUpdate: vi.fn(),
}));

vi.mock("@/auth", () => ({ auth: authMock }));
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

const SESSION = { user: { id: "user-1" } };

const VALID_STATE = {
  done: [],
  persona: null,
  streak: { count: 0, last: null },
  daily: { last: null },
  xp: 0,
  badges: [],
  holdings: [],
  contributions: { last: null, count: 0 },
  scamDaily: { last: null, streak: 0, best: 0 },
  actions: [],
};

function putReq(body: unknown) {
  return new Request("http://localhost/api/state", { method: "PUT", body: JSON.stringify(body) });
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/state", () => {
  it("returns 401 when unauthenticated", async () => {
    authMock.mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns null state when no row exists", async () => {
    authMock.mockResolvedValue(SESSION);
    selectWhere.mockResolvedValue([]);
    const res = await GET();
    expect(await res.json()).toEqual({ state: null, plan: "free" });
  });

  it("returns the stored state", async () => {
    authMock.mockResolvedValue(SESSION);
    selectWhere.mockResolvedValue([{ state: VALID_STATE }]);
    const res = await GET();
    expect(await res.json()).toEqual({ state: VALID_STATE, plan: "free" });
  });
});

describe("PUT /api/state", () => {
  it("returns 401 when unauthenticated", async () => {
    authMock.mockResolvedValue(null);
    const res = await PUT(putReq(VALID_STATE));
    expect(res.status).toBe(401);
    expect(insertValues).not.toHaveBeenCalled();
  });

  it("rejects an invalid state payload", async () => {
    authMock.mockResolvedValue(SESSION);
    const res = await PUT(putReq({ xp: "not-a-number" }));
    expect(res.status).toBe(400);
    expect(insertValues).not.toHaveBeenCalled();
  });

  it("upserts a valid state payload", async () => {
    authMock.mockResolvedValue(SESSION);
    onConflictDoUpdate.mockResolvedValue(undefined);
    const res = await PUT(putReq(VALID_STATE));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(insertValues).toHaveBeenCalledWith(expect.objectContaining({ userId: "user-1", state: VALID_STATE }));
  });
});

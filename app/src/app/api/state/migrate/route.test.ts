import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const { authMock, selectWhere, insertValues } = vi.hoisted(() => ({
  authMock: vi.fn(),
  selectWhere: vi.fn(),
  insertValues: vi.fn(),
}));

vi.mock("@/auth", () => ({ auth: authMock }));
vi.mock("@/db/client", () => ({
  db: {
    select: vi.fn(() => ({ from: vi.fn(() => ({ where: selectWhere })) })),
    insert: vi.fn(() => ({ values: insertValues })),
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

function req(body: unknown) {
  return new Request("http://localhost/api/state/migrate", { method: "POST", body: JSON.stringify(body) });
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/state/migrate", () => {
  it("returns 401 when unauthenticated", async () => {
    authMock.mockResolvedValue(null);
    const res = await POST(req(VALID_STATE));
    expect(res.status).toBe(401);
  });

  it("rejects an invalid state payload", async () => {
    authMock.mockResolvedValue(SESSION);
    const res = await POST(req({ xp: "not-a-number" }));
    expect(res.status).toBe(400);
    expect(insertValues).not.toHaveBeenCalled();
  });

  it("keeps server state and discards the local upload when a row already exists", async () => {
    authMock.mockResolvedValue(SESSION);
    const serverState = { ...VALID_STATE, xp: 500 };
    selectWhere.mockResolvedValue([{ state: serverState }]);
    const res = await POST(req(VALID_STATE));
    expect(await res.json()).toEqual({ state: serverState, migrated: false });
    expect(insertValues).not.toHaveBeenCalled();
  });

  it("uploads the local state once when no row exists yet", async () => {
    authMock.mockResolvedValue(SESSION);
    selectWhere.mockResolvedValue([]);
    insertValues.mockResolvedValue(undefined);
    const res = await POST(req(VALID_STATE));
    expect(await res.json()).toEqual({ state: VALID_STATE, migrated: true });
    expect(insertValues).toHaveBeenCalledWith(expect.objectContaining({ userId: "user-1", state: VALID_STATE }));
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { DELETE } from "./route";

const { authMock, deleteWhere } = vi.hoisted(() => ({
  authMock: vi.fn(),
  deleteWhere: vi.fn(),
}));

vi.mock("@/auth", () => ({ auth: authMock }));
vi.mock("@/db/client", () => ({
  db: {
    delete: vi.fn(() => ({ where: deleteWhere })),
  },
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("DELETE /api/account", () => {
  it("returns 401 when unauthenticated", async () => {
    authMock.mockResolvedValue(null);
    const res = await DELETE();
    expect(res.status).toBe(401);
    expect(deleteWhere).not.toHaveBeenCalled();
  });

  it("deletes the signed-in user's row", async () => {
    authMock.mockResolvedValue({ user: { id: "user-1" } });
    deleteWhere.mockResolvedValue(undefined);
    const res = await DELETE();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(deleteWhere).toHaveBeenCalledTimes(1);
  });
});

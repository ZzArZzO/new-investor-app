import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const { selectWhere, insertValues } = vi.hoisted(() => ({
  selectWhere: vi.fn(),
  insertValues: vi.fn(),
}));

vi.mock("@/db/client", () => ({
  db: {
    select: vi.fn(() => ({ from: vi.fn(() => ({ where: selectWhere })) })),
    insert: vi.fn(() => ({ values: insertValues })),
  },
}));

function req(body: unknown) {
  return new Request("http://localhost/api/register", { method: "POST", body: JSON.stringify(body) });
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/register", () => {
  it("rejects an invalid payload", async () => {
    const res = await POST(req({ email: "not-an-email", password: "short" }));
    expect(res.status).toBe(400);
    expect(selectWhere).not.toHaveBeenCalled();
  });

  it("rejects an already-registered email", async () => {
    selectWhere.mockResolvedValue([{ id: "existing-user" }]);
    const res = await POST(req({ email: "reader@example.com", password: "longenoughpassword" }));
    expect(res.status).toBe(409);
    expect(insertValues).not.toHaveBeenCalled();
  });

  it("creates the user with a hashed password on success", async () => {
    selectWhere.mockResolvedValue([]);
    insertValues.mockResolvedValue(undefined);
    const res = await POST(req({ email: "reader@example.com", password: "longenoughpassword" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(insertValues).toHaveBeenCalledTimes(1);
    const [values] = insertValues.mock.calls[0];
    expect(values.email).toBe("reader@example.com");
    expect(values.password).not.toBe("longenoughpassword");
    expect(values.password.length).toBeGreaterThan(20);
  });
});

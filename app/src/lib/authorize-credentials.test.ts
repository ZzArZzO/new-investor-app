import { afterEach, describe, expect, it, vi } from "vitest";
import { authorizeCredentials } from "./authorize-credentials";
import { hashPassword } from "./password";

const { selectWhere, updateWhere } = vi.hoisted(() => ({
  selectWhere: vi.fn(),
  updateWhere: vi.fn(),
}));

vi.mock("@/db/client", () => ({
  db: {
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: selectWhere,
      })),
    })),
    update: vi.fn(() => ({
      set: vi.fn((values: unknown) => ({
        where: (...args: unknown[]) => updateWhere(values, ...args),
      })),
    })),
  },
}));

const PASSWORD = "correct-horse-battery";

async function userRow(overrides: Record<string, unknown> = {}) {
  return {
    id: "user-1",
    email: "reader@example.com",
    name: "Reader",
    image: null,
    password: await hashPassword(PASSWORD),
    failedLoginAttempts: 0,
    lockedUntil: null,
    ...overrides,
  };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("authorizeCredentials", () => {
  it("returns null for a malformed credentials shape", async () => {
    selectWhere.mockResolvedValue([]);
    const result = await authorizeCredentials({ email: "not-an-email", password: "" });
    expect(result).toBeNull();
    expect(selectWhere).not.toHaveBeenCalled();
  });

  it("returns null when no user exists for the email", async () => {
    selectWhere.mockResolvedValue([]);
    const result = await authorizeCredentials({ email: "nobody@example.com", password: PASSWORD });
    expect(result).toBeNull();
    expect(updateWhere).not.toHaveBeenCalled();
  });

  it("returns null for a Google-only account (no password set)", async () => {
    selectWhere.mockResolvedValue([await userRow({ password: null })]);
    const result = await authorizeCredentials({ email: "reader@example.com", password: PASSWORD });
    expect(result).toBeNull();
    expect(updateWhere).not.toHaveBeenCalled();
  });

  it("returns null while locked out, without touching lockout state", async () => {
    const lockedUntil = new Date(Date.now() + 60_000);
    selectWhere.mockResolvedValue([await userRow({ lockedUntil })]);
    const result = await authorizeCredentials({ email: "reader@example.com", password: PASSWORD });
    expect(result).toBeNull();
    expect(updateWhere).not.toHaveBeenCalled();
  });

  it("returns null on wrong password and increments the failed-attempt counter", async () => {
    selectWhere.mockResolvedValue([await userRow({ failedLoginAttempts: 2 })]);
    const result = await authorizeCredentials({ email: "reader@example.com", password: "wrong-password" });
    expect(result).toBeNull();
    expect(updateWhere).toHaveBeenCalledTimes(1);
    const [values] = updateWhere.mock.calls[0];
    expect(values).toEqual({ failedLoginAttempts: 3, lockedUntil: null });
  });

  it("locks the account once wrong-password attempts reach the threshold", async () => {
    selectWhere.mockResolvedValue([await userRow({ failedLoginAttempts: 4 })]);
    const result = await authorizeCredentials({ email: "reader@example.com", password: "wrong-password" });
    expect(result).toBeNull();
    const [values] = updateWhere.mock.calls[0] as [{ failedLoginAttempts: number; lockedUntil: Date | null }];
    expect(values.failedLoginAttempts).toBe(5);
    expect(values.lockedUntil).not.toBeNull();
  });

  it("returns the user and resets lockout state on a correct password", async () => {
    selectWhere.mockResolvedValue([await userRow({ failedLoginAttempts: 3 })]);
    const result = await authorizeCredentials({ email: "reader@example.com", password: PASSWORD });
    expect(result).toEqual({ id: "user-1", email: "reader@example.com", name: "Reader", image: null });
    expect(updateWhere).toHaveBeenCalledWith({ failedLoginAttempts: 0, lockedUntil: null }, expect.anything());
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { todayStr, yesterdayStr } from "@/lib/date";
import { GET } from "./route";

const { selectInnerJoin, updateWhere, sendMock } = vi.hoisted(() => ({
  selectInnerJoin: vi.fn(),
  updateWhere: vi.fn(),
  sendMock: vi.fn(),
}));

vi.mock("@/db/client", () => ({
  db: {
    select: vi.fn(() => ({ from: vi.fn(() => ({ innerJoin: selectInnerJoin })) })),
    update: vi.fn(() => ({ set: vi.fn(() => ({ where: updateWhere })) })),
  },
}));
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function Resend() {
    return { emails: { send: sendMock } };
  }),
}));

const today = todayStr();
const yesterday = yesterdayStr();

function req(secret?: string) {
  const headers = secret ? { authorization: `Bearer ${secret}` } : undefined;
  return new Request("http://localhost/api/cron/streak-warning", { headers });
}

beforeEach(() => {
  vi.stubEnv("CRON_SECRET", "test-secret");
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

describe("GET /api/cron/streak-warning", () => {
  it("rejects requests without the correct bearer token", async () => {
    const res = await GET(req("wrong-secret"));
    expect(res.status).toBe(401);
    expect(selectInnerJoin).not.toHaveBeenCalled();
  });

  it("emails users whose streak broke yesterday and marks them sent", async () => {
    selectInnerJoin.mockResolvedValue([
      {
        userId: "user-1",
        email: "reader@example.com",
        state: { streak: { count: 4, last: yesterday } },
        sentOn: null,
      },
    ]);
    sendMock.mockResolvedValue({ error: null });
    updateWhere.mockResolvedValue(undefined);

    const res = await GET(req("test-secret"));

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].to).toEqual(["reader@example.com"]);
    expect(updateWhere).toHaveBeenCalledTimes(1);
    expect(await res.json()).toEqual({ sent: 1 });
  });

  it("skips users already warned today or with an active streak", async () => {
    selectInnerJoin.mockResolvedValue([
      { userId: "user-1", email: "a@example.com", state: { streak: { count: 4, last: yesterday } }, sentOn: today },
      { userId: "user-2", email: "b@example.com", state: { streak: { count: 4, last: today } }, sentOn: null },
    ]);

    const res = await GET(req("test-secret"));

    expect(sendMock).not.toHaveBeenCalled();
    expect(await res.json()).toEqual({ sent: 0 });
  });

  it("does not mark as sent when the email provider errors", async () => {
    selectInnerJoin.mockResolvedValue([
      {
        userId: "user-1",
        email: "reader@example.com",
        state: { streak: { count: 4, last: yesterday } },
        sentOn: null,
      },
    ]);
    sendMock.mockResolvedValue({ error: { message: "provider down" } });

    const res = await GET(req("test-secret"));

    expect(updateWhere).not.toHaveBeenCalled();
    expect(await res.json()).toEqual({ sent: 0 });
  });
});

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SignJWT } from "jose";
import { signMobileToken, verifyMobileToken } from "./mobile-token";

const SECRET = "test-secret-at-least-32-characters-long!";

describe("mobile token", () => {
  beforeEach(() => {
    process.env.AUTH_SECRET = SECRET;
  });
  afterEach(() => {
    delete process.env.AUTH_SECRET;
  });

  it("round-trips a user id", async () => {
    const token = await signMobileToken("user-123");
    expect(await verifyMobileToken(token)).toBe("user-123");
  });

  it("rejects garbage", async () => {
    expect(await verifyMobileToken("not-a-jwt")).toBeNull();
  });

  it("rejects a token signed with a different secret", async () => {
    const forged = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("user-123")
      .setAudience("newinvestor-mobile")
      .setIssuer("newinvestor")
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode("some-other-secret-32-characters-xx"));
    expect(await verifyMobileToken(forged)).toBeNull();
  });

  it("rejects a token with the wrong audience", async () => {
    const wrongAud = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("user-123")
      .setAudience("something-else")
      .setIssuer("newinvestor")
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(SECRET));
    expect(await verifyMobileToken(wrongAud)).toBeNull();
  });

  it("rejects an expired token", async () => {
    const expired = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("user-123")
      .setAudience("newinvestor-mobile")
      .setIssuer("newinvestor")
      .setExpirationTime(Math.floor(Date.now() / 1000) - 60)
      .sign(new TextEncoder().encode(SECRET));
    expect(await verifyMobileToken(expired)).toBeNull();
  });
});

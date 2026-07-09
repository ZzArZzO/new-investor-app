import { describe, expect, it } from "vitest";
import { planForEmail } from "./entitlement";

describe("planForEmail", () => {
  it("grants plus to an allowlisted email, case-insensitively", () => {
    expect(planForEmail("Tester@Example.com", "tester@example.com,other@example.com")).toBe("plus");
  });

  it("returns free for emails not on the list", () => {
    expect(planForEmail("someone@example.com", "tester@example.com")).toBe("free");
  });

  it("returns free when the allowlist is unset or empty", () => {
    expect(planForEmail("tester@example.com", undefined)).toBe("free");
    expect(planForEmail("tester@example.com", "")).toBe("free");
  });

  it("returns free for a missing email", () => {
    expect(planForEmail(null, "tester@example.com")).toBe("free");
    expect(planForEmail(undefined, "tester@example.com")).toBe("free");
  });

  it("tolerates whitespace around allowlist entries", () => {
    expect(planForEmail("a@b.com", " a@b.com , c@d.com ")).toBe("plus");
  });
});

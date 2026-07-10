import { createRemoteJWKSet, jwtVerify } from "jose";

export interface VerifiedIdentity {
  email: string;
  providerAccountId: string;
  name: string | null;
}

const GOOGLE_JWKS = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));
const APPLE_JWKS = createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"));

/**
 * Verifies a Google ID token from the native mobile sign-in flow.
 * Audience must be one of our Google OAuth client ids (web + iOS + Android).
 */
export async function verifyGoogleIdToken(idToken: string): Promise<VerifiedIdentity | null> {
  const audiences = [
    process.env.AUTH_GOOGLE_ID,
    process.env.GOOGLE_IOS_CLIENT_ID,
    process.env.GOOGLE_ANDROID_CLIENT_ID,
  ].filter((v): v is string => typeof v === "string" && v.length > 0);
  if (audiences.length === 0) return null;

  try {
    const { payload } = await jwtVerify(idToken, GOOGLE_JWKS, {
      issuer: ["https://accounts.google.com", "accounts.google.com"],
      audience: audiences,
    });
    if (typeof payload.email !== "string" || payload.email_verified !== true) return null;
    if (typeof payload.sub !== "string") return null;
    return {
      email: payload.email,
      providerAccountId: payload.sub,
      name: typeof payload.name === "string" ? payload.name : null,
    };
  } catch {
    return null;
  }
}

/** Verifies an Apple identity token from expo-apple-authentication. Audience = the iOS bundle id. */
export async function verifyAppleIdentityToken(identityToken: string): Promise<VerifiedIdentity | null> {
  const bundleId = process.env.APPLE_BUNDLE_ID;
  if (!bundleId) return null;

  try {
    const { payload } = await jwtVerify(identityToken, APPLE_JWKS, {
      issuer: "https://appleid.apple.com",
      audience: bundleId,
    });
    if (typeof payload.email !== "string" || typeof payload.sub !== "string") return null;
    return { email: payload.email, providerAccountId: payload.sub, name: null };
  } catch {
    return null;
  }
}

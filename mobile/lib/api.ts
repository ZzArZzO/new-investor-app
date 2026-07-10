import type { AppState } from "@/content/types";

/**
 * Web app API base. Set EXPO_PUBLIC_API_URL for device testing (your PC's LAN
 * IP or the deployed URL) — localhost only reaches the phone itself.
 */
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}, token?: string | null): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
  const body: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const message =
      typeof body === "object" && body !== null && "message" in body && typeof body.message === "string"
        ? body.message
        : `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }
  return body as T;
}

export interface TokenResponse {
  token: string;
  email: string;
}

export const api = {
  login: (email: string, password: string) =>
    request<TokenResponse>("/api/mobile/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (email: string, password: string) =>
    request<TokenResponse>("/api/mobile/register", { method: "POST", body: JSON.stringify({ email, password }) }),
  googleSignIn: (idToken: string) =>
    request<TokenResponse>("/api/mobile/google", { method: "POST", body: JSON.stringify({ idToken }) }),
  appleSignIn: (identityToken: string) =>
    request<TokenResponse>("/api/mobile/apple", { method: "POST", body: JSON.stringify({ identityToken }) }),
  getState: (token: string) => request<{ state: Partial<AppState> | null; plan: string }>("/api/state", {}, token),
  putState: (token: string, state: AppState) =>
    request<{ ok: boolean }>("/api/state", { method: "PUT", body: JSON.stringify(state) }, token),
  migrateState: (token: string, state: AppState) =>
    request<{ state: Partial<AppState>; migrated: boolean }>(
      "/api/state/migrate",
      { method: "POST", body: JSON.stringify(state) },
      token,
    ),
  deleteAccount: (token: string) => request<{ ok: boolean }>("/api/account", { method: "DELETE" }, token),
};

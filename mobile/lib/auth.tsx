import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Platform } from "react-native";

import { api } from "@/lib/api";

const TOKEN_KEY = "ni_mobile_token";
const EMAIL_KEY = "ni_mobile_email";

export interface AuthValue {
  /** Bearer token for the web API, null when signed out. */
  token: string | null;
  email: string | null;
  /** False until SecureStore has been read — sync must wait for this. */
  ready: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: (idToken: string) => Promise<void>;
  signInWithApple: (identityToken: string) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

async function persist(token: string, email: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(EMAIL_KEY, email);
}

async function clear(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(EMAIL_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // SecureStore is unavailable on web preview — treat as signed out.
        const stored = Platform.OS === "web" ? null : await SecureStore.getItemAsync(TOKEN_KEY);
        const storedEmail = Platform.OS === "web" ? null : await SecureStore.getItemAsync(EMAIL_KEY);
        if (!cancelled && stored) {
          setToken(stored);
          setEmail(storedEmail);
        }
      } catch {
        // Corrupt keychain entry — stay signed out rather than crash.
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const adopt = useCallback(async (t: string, e: string) => {
    await persist(t, e);
    setToken(t);
    setEmail(e);
  }, []);

  const signIn = useCallback(
    async (em: string, password: string) => {
      const res = await api.login(em, password);
      await adopt(res.token, res.email);
    },
    [adopt],
  );

  const signUp = useCallback(
    async (em: string, password: string) => {
      const res = await api.register(em, password);
      await adopt(res.token, res.email);
    },
    [adopt],
  );

  const signInWithGoogle = useCallback(
    async (idToken: string) => {
      const res = await api.googleSignIn(idToken);
      await adopt(res.token, res.email);
    },
    [adopt],
  );

  const signInWithApple = useCallback(
    async (identityToken: string) => {
      const res = await api.appleSignIn(identityToken);
      await adopt(res.token, res.email);
    },
    [adopt],
  );

  const signOut = useCallback(async () => {
    await clear();
    setToken(null);
    setEmail(null);
  }, []);

  const deleteAccount = useCallback(async () => {
    if (!token) return;
    await api.deleteAccount(token);
    await clear();
    setToken(null);
    setEmail(null);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, email, ready, signIn, signUp, signInWithGoogle, signInWithApple, signOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}

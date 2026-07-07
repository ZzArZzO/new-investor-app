"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useAppState, type UseAppStateResult } from "./use-app-state";

const AppStateContext = createContext<UseAppStateResult | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const value = useAppState();
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppStateContext(): UseAppStateResult {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppStateContext must be used within an AppStateProvider");
  return ctx;
}

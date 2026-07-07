"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AppStateProvider } from "@/hooks/app-state-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppStateProvider>{children}</AppStateProvider>
    </ThemeProvider>
  );
}

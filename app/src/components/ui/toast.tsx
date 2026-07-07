"use client";

import { cn } from "@/lib/utils";
import { useAppStateContext } from "@/hooks/app-state-context";

/** Fixed-position toast driven by badge-unlock events from the app state context. */
export function AppToast() {
  const { toastMessage } = useAppStateContext();
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-24 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 rounded-full bg-foreground px-4.5 py-3 text-sm font-semibold text-background shadow-lg transition-all duration-300",
        toastMessage ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      {toastMessage}
    </div>
  );
}

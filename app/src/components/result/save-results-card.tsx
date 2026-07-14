"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgojdqvj";

type Status = "idle" | "submitting" | "success" | "error";

export function SaveResultsCard() {
  const [dismissed, setDismissed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  if (dismissed || status === "success") {
    return status === "success" ? (
      <div className="rounded-2xl bg-card p-5 text-center shadow-sm">
        <p className="text-[15px] font-semibold">You&rsquo;re on the list. 🎉</p>
        <p className="mt-1 text-[12.5px] text-muted-foreground">
          We&rsquo;ll email you updates, no spam. Want your progress to follow you across devices instead? Create a
          free account in Settings.
        </p>
      </div>
    ) : null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Formspree request failed");
      trackEvent("results_email_captured");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wide text-primary">Stay in the loop</div>
      <p className="mt-1.5 text-[13.5px] text-muted-foreground">
        Optional, leave your email for updates on new lessons and tools. This doesn&rsquo;t save your progress; for
        that, create a free account in Settings.
      </p>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
        <input type="hidden" name="source" value="app_result" />
        <input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
          className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={status === "submitting"} className="h-9 flex-1">
            {status === "submitting" ? "Sending…" : "Keep me posted"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setDismissed(true)} className="h-9">
            Not now
          </Button>
        </div>
        {status === "error" && (
          <p className="text-[12.5px] text-destructive">Something went wrong, try again in a moment.</p>
        )}
      </form>
      <p className="mt-2.5 text-[11.5px] text-muted-foreground">No spam, just occasional updates.</p>
    </div>
  );
}

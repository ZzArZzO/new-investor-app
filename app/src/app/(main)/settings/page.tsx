"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useAppStateContext } from "@/hooks/app-state-context";
import { exportState } from "@/lib/app-state-transfer";

type AuthMode = "signin" | "signup";
type DeleteStatus = "idle" | "confirming" | "deleting" | "error";

const GENERIC_AUTH_ERROR = "That didn't work — check your details and try again.";

export default function SettingsPage() {
  const { data: session, status: sessionStatus } = useSession();
  const { state, hydrated, migrationNotice, dismissMigrationNotice, toggleEmailPref } = useAppStateContext();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<DeleteStatus>("idle");
  const [copied, setCopied] = useState(false);

  if (!hydrated || sessionStatus === "loading") return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setAuthError(null);

    if (mode === "signup") {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body: { message?: string } = await res.json().catch(() => ({}));
        setAuthError(body.message ?? GENERIC_AUTH_ERROR);
        setSubmitting(false);
        return;
      }
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    setSubmitting(false);
    if (result?.error) setAuthError(GENERIC_AUTH_ERROR);
  }

  async function handleDelete() {
    setDeleteStatus("deleting");
    const res = await fetch("/api/account", { method: "DELETE" });
    if (!res.ok) {
      setDeleteStatus("error");
      return;
    }
    window.localStorage.removeItem("ni_state_v1");
    await signOut({ callbackUrl: "/" });
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(exportState(state));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may be unavailable — the textarea below still lets someone select-and-copy manually.
    }
  }

  return (
    <div className="flex flex-col gap-3.5 pt-1">
      <div>
        <h1 className="text-[26px] font-extrabold leading-tight tracking-tight">Account &amp; progress</h1>
        <p className="mt-1 text-[15px] text-muted-foreground">
          Sign in to sync your progress across devices, or just back up a copy below.
        </p>
      </div>

      {migrationNotice && (
        <div className="rounded-2xl bg-amber-soft p-4 text-[13.5px] shadow-sm">
          <p>
            We found existing saved progress under this email. This device&rsquo;s local progress wasn&rsquo;t added
            to it — back it up below before it&rsquo;s replaced, if you want to keep it.
          </p>
          <Button type="button" variant="ghost" onClick={dismissMigrationNotice} className="mt-2 h-8">
            Got it
          </Button>
        </div>
      )}

      <div className="rounded-2xl bg-card p-4 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">Account</div>
        {session?.user ? (
          <div className="mt-2 flex flex-col gap-3">
            <p className="text-[14px]">
              Signed in as <span className="font-semibold">{session.user.email}</span>
            </p>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => signOut()} className="h-9">
                Sign out
              </Button>
              {deleteStatus === "idle" && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setDeleteStatus("confirming")}
                  className="h-9"
                >
                  Delete my account
                </Button>
              )}
            </div>
            {deleteStatus === "confirming" && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-[13px]">
                <p>This permanently deletes your account and synced progress. This can&rsquo;t be undone.</p>
                <div className="mt-2 flex gap-2">
                  <Button type="button" variant="destructive" onClick={handleDelete} className="h-8">
                    Yes, delete everything
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setDeleteStatus("idle")} className="h-8">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            {deleteStatus === "error" && (
              <p className="text-[12.5px] text-destructive">Something went wrong — try again in a moment.</p>
            )}
          </div>
        ) : (
          <div className="mt-2 flex flex-col gap-3">
            <div className="flex gap-1 rounded-lg bg-accent-soft p-1 text-[13px] font-semibold">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 rounded-md py-1.5 ${mode === "signin" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-md py-1.5 ${mode === "signup" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
              >
                Create account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
              />
              <input
                type="password"
                required
                minLength={mode === "signup" ? 8 : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "Password (min. 8 characters)" : "Password"}
                aria-label="Password"
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
              />
              <Button type="submit" disabled={submitting} className="h-9">
                {submitting ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
              </Button>
              {authError && <p className="text-[12.5px] text-destructive">{authError}</p>}
            </form>

            <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              or
              <div className="h-px flex-1 bg-border" />
            </div>

            <Button type="button" variant="outline" onClick={() => signIn("google")} className="h-9">
              Continue with Google
            </Button>
          </div>
        )}
      </div>

      {session?.user && (
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wide text-primary">Email preferences</div>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            Which emails we may send to {session.user.email}. Changes apply from the next send.
          </p>
          <div className="mt-2 flex flex-col gap-2">
            <label className="flex items-center gap-2.5 text-[14px]">
              <input
                type="checkbox"
                checked={state.emails?.streak !== false}
                onChange={() => toggleEmailPref("streak")}
                className="size-4 accent-[var(--primary)]"
              />
              Streak reminder (when a streak is about to break)
            </label>
            <label className="flex items-center gap-2.5 text-[14px]">
              <input
                type="checkbox"
                checked={state.emails?.weekly !== false}
                onChange={() => toggleEmailPref("weekly")}
                className="size-4 accent-[var(--primary)]"
              />
              Weekly digest (one short read, Mondays)
            </label>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-card p-4 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">Back up my progress</div>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          A copy of your progress as a code, in case you ever need it outside your account.
        </p>
        <textarea
          readOnly
          value={exportState(state)}
          rows={4}
          className="mt-2 w-full resize-none rounded-lg border border-border bg-background p-2 font-mono text-[11px] text-muted-foreground"
        />
        <Button type="button" variant="outline" onClick={handleCopy} className="mt-2.5 h-9">
          {copied ? "Copied!" : "Copy code"}
        </Button>
      </div>

      <p className="mt-2 px-1 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Educational information, not personal financial advice. If you create an account, we store your email and app
        progress to sync it across devices — nothing else.
      </p>
      <p className="px-1 pb-2 text-center text-[11.5px] text-muted-foreground">
        <Link href="/privacy" className="underline">
          Privacy policy
        </Link>
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { PLUS_CHECKOUT_ENABLED } from "@/lib/plus-flag";
import { cn } from "@/lib/utils";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgojdqvj";
const WAITLIST_KEY = "ni_plus_waitlist_v1";

export const PLUS_PRICE_MONTHLY = "€5.99/month";
export const PLUS_PRICE_ANNUAL = "€39.99/year";
const PRICE_SHOWN = "5.99m-39.99y";

const PLUS_FEATURES = [
  "🔥 Deep-dive tracks: financial independence, real estate, crypto deep-dive",
  "🔁 Unlimited daily review cards",
  "📊 Portfolio insights: fees you're paying, drift vs your own targets",
  "📥 Import holdings from your broker's CSV export",
];

type Status = "idle" | "submitting" | "success" | "error";

function hasJoinedWaitlist(): boolean {
  try {
    return window.localStorage.getItem(WAITLIST_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberJoined(): void {
  try {
    window.localStorage.setItem(WAITLIST_KEY, "1");
  } catch {
    // Best effort, the success state still shows for this session.
  }
}

interface UpgradeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Which surface opened the sheet, analytics only, low-cardinality. */
  feature: string;
}

/**
 * The Plus tier is not purchasable yet, this sheet shows the planned tier
 * honestly ("coming soon") and captures a waitlist email to measure
 * willingness-to-pay before any billing is built.
 */
export function UpgradeSheet({ open, onOpenChange, feature }: UpgradeSheetProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [checkoutInterval, setCheckoutInterval] = useState<"monthly" | "annual" | null>(null);
  const [checkoutError, setCheckoutError] = useState(false);
  // Dialog content only mounts client-side after user interaction, so reading
  // localStorage during render is hydration-safe here.
  const joined = open && hasJoinedWaitlist();

  useEffect(() => {
    if (!open) return;
    trackEvent("upgrade_sheet_viewed", { feature, price_shown: PRICE_SHOWN });
  }, [open, feature]);

  async function handleCheckout(interval: "monthly" | "annual") {
    setCheckoutInterval(interval);
    setCheckoutError(false);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });
      if (!res.ok) throw new Error("Checkout session failed");
      const body: { url: string } = await res.json();
      window.location.href = body.url;
    } catch {
      setCheckoutError(true);
      setCheckoutInterval(null);
    }
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
      trackEvent("plus_waitlist_joined", { feature, price_shown: PRICE_SHOWN });
      rememberJoined();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const onList = joined || status === "success";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Investor Plus</DialogTitle>
          <DialogDescription>
            Coming soon, deeper tracks and tools on top of everything that stays free.
          </DialogDescription>
        </DialogHeader>

        <ul className="grid gap-2 text-[13.5px]">
          {PLUS_FEATURES.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <div className="flex gap-2.5">
          <div className="flex-1 rounded-xl border border-border px-3.5 py-3 text-center">
            <div className="text-[15px] font-extrabold">{PLUS_PRICE_MONTHLY}</div>
            <div className="text-[12px] text-muted-foreground">flexible</div>
          </div>
          <div className="relative flex-1 rounded-xl border-2 border-primary bg-accent-soft px-3.5 py-3 text-center">
            <div className="text-[15px] font-extrabold">{PLUS_PRICE_ANNUAL}</div>
            <div className="text-[12px] text-muted-foreground">≈ €3.33/month</div>
          </div>
        </div>

        <p className="text-[12.5px] text-muted-foreground">
          Everything you use today stays free: all core lessons, the daily habit, tools, tracker and the comparison
          tables. Plus adds depth, it never changes what anyone is shown or recommended. When Plus launches
          you&rsquo;ll be able to cancel in two clicks, no phone call, no retention flow.
        </p>

        {PLUS_CHECKOUT_ENABLED ? (
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              onClick={() => handleCheckout("annual")}
              disabled={checkoutInterval !== null}
              className={cn("h-10 rounded-xl")}
            >
              {checkoutInterval === "annual" ? "Redirecting…" : `Subscribe, ${PLUS_PRICE_ANNUAL}`}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleCheckout("monthly")}
              disabled={checkoutInterval !== null}
              className="h-10 rounded-xl"
            >
              {checkoutInterval === "monthly" ? "Redirecting…" : `Subscribe, ${PLUS_PRICE_MONTHLY}`}
            </Button>
            {checkoutError && (
              <p className="text-[12.5px] text-destructive">Something went wrong, try again in a moment.</p>
            )}
            <p className="text-[11.5px] text-muted-foreground">
              Handled by Stripe Checkout. Cancel anytime from account settings, no phone call, no retention flow.
            </p>
          </div>
        ) : onList ? (
          <div className="rounded-xl bg-accent-soft px-4 py-3.5 text-center">
            <p className="text-[14.5px] font-semibold">You&rsquo;re on the list. 🎉</p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              We&rsquo;ll email you when Plus launches, founding members get a discount.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input type="hidden" name="source" value="plus_waitlist" />
            <input type="hidden" name="price_shown" value={PRICE_SHOWN} />
            <input type="hidden" name="feature" value={feature} />
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              aria-label="Email address"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
            <Button type="submit" disabled={status === "submitting"} className={cn("h-10 rounded-xl")}>
              {status === "submitting" ? "Sending…" : "Join the waitlist"}
            </Button>
            {status === "error" && (
              <p className="text-[12.5px] text-destructive">Something went wrong, try again in a moment.</p>
            )}
            <p className="text-[11.5px] text-muted-foreground">
              No payment, no spam, one email when it launches, founding-member discount included.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

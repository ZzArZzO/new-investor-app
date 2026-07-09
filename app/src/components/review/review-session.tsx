"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { FREE_REVIEW_CARDS_PER_DAY, dueReviewItems, remainingReviewQuota } from "@/lib/app-state-logic";
import { composeReviewSession, type ReviewCardData } from "@/lib/review-logic";
import { todayStr } from "@/lib/date";
import { trackEvent } from "@/lib/analytics";
import { useAppStateContext } from "@/hooks/app-state-context";
import { UpgradeSheet } from "@/components/plus/upgrade-sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ReviewSession() {
  const { state, hydrated, answerReviewCard, plan } = useAppStateContext();
  const today = todayStr();

  // The session is composed once after hydration and then held stable —
  // answering cards mutates state, and recomposing mid-session would shuffle it.
  const [session, setSession] = useState<ReviewCardData[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (!hydrated || session !== null) return;
    // Plus lifts the daily cap; sessions still come in sane batches of up to 10.
    const limit = plan === "plus" ? Math.max(dueReviewItems(state, today).length, 10) : remainingReviewQuota(state, today);
    // Deliberate one-time capture after hydration (same pattern as use-app-state).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(composeReviewSession(state, today, limit));
  }, [hydrated, session, state, today, plan]);

  if (!hydrated || session === null) return null;

  const backLink = (
    <Link href="/" className="mb-1 inline-flex items-center gap-1 py-2 text-sm font-semibold text-muted-foreground">
      <ChevronLeft className="size-4" aria-hidden="true" />
      Home
    </Link>
  );

  if (session.length === 0) {
    return (
      <div className="pt-1">
        {backLink}
        <h2 className="font-heading text-xl font-medium">Review</h2>
        <div className="mt-3.5 rounded-2xl bg-card p-5 text-center shadow-sm">
          <p className="text-[15px] font-semibold">✓ You&rsquo;re done for today.</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Free accounts get {FREE_REVIEW_CARDS_PER_DAY} review cards a day — come back tomorrow to keep the
            spacing working.
          </p>
          <Button variant="outline" onClick={() => setSheetOpen(true)} className="mt-3.5 h-10 rounded-xl">
            Unlimited review is coming with Plus
          </Button>
        </div>
        <UpgradeSheet open={sheetOpen} onOpenChange={setSheetOpen} feature="review_cap" />
      </div>
    );
  }

  if (index >= session.length) {
    return (
      <div className="pt-1">
        {backLink}
        <h2 className="font-heading text-xl font-medium">Review</h2>
        <div className="mt-3.5 rounded-2xl bg-card p-5 text-center shadow-sm">
          <p className="text-[15px] font-semibold">
            Session done — {correctCount} of {session.length} right. ✓
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Anything you missed comes back sooner; what you knew comes back later. That spacing is what makes it
            stick.
          </p>
          <Button asChild className="mt-3.5 h-10 rounded-xl">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const card = session[index];
  const answered = picked !== null;
  const wasCorrect = answered && picked === card.answer;

  // Arrow (not a hoisted function declaration) so the session null-narrowing above applies.
  const pick = (oi: number) => {
    if (answered) return;
    setPicked(oi);
    const correct = oi === card.answer;
    if (correct) setCorrectCount((c) => c + 1);
    answerReviewCard(card.id, correct);
    if (index + 1 >= session.length) {
      trackEvent("review_session_completed", { cards: session.length, correct: correctCount + (correct ? 1 : 0) });
    }
  };

  return (
    <div className="pt-1">
      {backLink}
      <h2 className="font-heading text-xl font-medium">Review</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Card {index + 1} of {session.length} · +3 XP each
      </p>

      <div className="mt-3.5 rounded-2xl bg-card p-5 shadow-sm">
        <div className="font-bold">{card.question}</div>
        <div className="mt-3 flex flex-col gap-2">
          {card.options.map((text, oi) => {
            const isCorrect = oi === card.answer;
            const isPicked = oi === picked;
            return (
              <button
                key={oi}
                type="button"
                disabled={answered}
                onClick={() => pick(oi)}
                className={cn(
                  "rounded-lg border px-4 py-3.5 text-left text-[15px] font-medium transition-colors",
                  !answered && "border-border bg-card hover:border-primary",
                  answered && isCorrect && "border-primary bg-accent-soft",
                  answered && !isCorrect && isPicked && "border-destructive bg-destructive/10",
                  answered && !isCorrect && !isPicked && "border-border bg-card opacity-50",
                )}
              >
                {text}
              </button>
            );
          })}
        </div>
        {answered && (
          <div
            className={cn(
              "mt-3 rounded-lg px-3.5 py-3 text-[14px]",
              wasCorrect ? "bg-accent-soft text-accent-foreground" : "bg-destructive/10 text-destructive",
            )}
          >
            {wasCorrect ? "✓ Right. " : "Not quite. "}
            {card.why}
          </div>
        )}
      </div>

      {answered && (
        <Button
          onClick={() => {
            setIndex((i) => i + 1);
            setPicked(null);
          }}
          className="mt-3.5 h-11 w-full rounded-xl"
        >
          {index + 1 >= session.length ? "Finish" : "Next card"}
        </Button>
      )}
    </div>
  );
}

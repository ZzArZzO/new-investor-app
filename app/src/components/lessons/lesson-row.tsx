import Link from "next/link";
import { ChevronRight, Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonRowProps {
  lessonId: string;
  index: number;
  title: string;
  done: boolean;
  unlocked: boolean;
  /** Shown under the title when the row is locked by progression. */
  lockedLabel?: string;
  /** Plus-tier lesson: renders a lock chip and calls onPlusClick instead of navigating. */
  plus?: boolean;
  onPlusClick?: () => void;
}

export function LessonRow({ lessonId, index, title, done, unlocked, lockedLabel, plus, onPlusClick }: LessonRowProps) {
  const content = (
    <>
      <span
        className={cn(
          "grid size-8.5 flex-none place-items-center rounded-lg text-sm font-bold",
          done ? "bg-primary text-primary-foreground" : "bg-accent-soft text-accent-foreground",
        )}
      >
        {done ? <Check className="size-4" aria-hidden="true" /> : plus ? <Lock className="size-3.5" aria-hidden="true" /> : index + 1}
      </span>
      <span className="flex flex-col">
        <span className="flex items-center gap-1.5 text-[15px] font-bold">
          {title}
          {plus && (
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide text-primary">
              Plus
            </span>
          )}
        </span>
        <span className="text-[13px] text-muted-foreground">
          {plus
            ? "Coming with Plus — tap to learn more"
            : unlocked
              ? done
                ? "Completed"
                : "Tap to start"
              : (lockedLabel ?? "Finish the previous lesson first")}
        </span>
      </span>
      <ChevronRight className="ml-auto size-4.5 flex-none text-muted-foreground" aria-hidden="true" />
    </>
  );

  const className = cn(
    "flex min-h-15 w-full items-center gap-3.5 rounded-xl border border-border bg-card px-4 py-3.5 text-left shadow-sm",
    !unlocked && !plus && "opacity-55",
  );

  if (plus) {
    return (
      <button type="button" onClick={onPlusClick} className={cn(className, "transition-colors hover:border-primary")}>
        {content}
      </button>
    );
  }

  if (!unlocked) {
    return (
      <div className={className} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/lessons/${lessonId}`} className={cn(className, "transition-colors hover:border-primary")}>
      {content}
    </Link>
  );
}

import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonRowProps {
  lessonId: string;
  index: number;
  title: string;
  done: boolean;
  unlocked: boolean;
}

export function LessonRow({ lessonId, index, title, done, unlocked }: LessonRowProps) {
  const content = (
    <>
      <span
        className={cn(
          "grid size-8.5 flex-none place-items-center rounded-lg text-sm font-bold",
          done ? "bg-primary text-primary-foreground" : "bg-accent-soft text-accent-foreground",
        )}
      >
        {done ? <Check className="size-4" aria-hidden="true" /> : index + 1}
      </span>
      <span className="flex flex-col">
        <span className="text-[15px] font-bold">{title}</span>
        <span className="text-[13px] text-muted-foreground">
          {unlocked ? (done ? "Completed" : "Tap to start") : "Finish the previous lesson first"}
        </span>
      </span>
      <ChevronRight className="ml-auto size-4.5 flex-none text-muted-foreground" aria-hidden="true" />
    </>
  );

  const className = cn(
    "flex min-h-15 w-full items-center gap-3.5 rounded-xl border border-border bg-card px-4 py-3.5 text-left shadow-sm",
    !unlocked && "opacity-55",
  );

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

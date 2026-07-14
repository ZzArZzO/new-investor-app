import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PERSONA_LIST } from "@/content/quiz";

export const metadata = {
  title: "The four investor types",
  description:
    "The four published investor types behind our quiz, strengths, blind spots, and how people like this often approach investing. Educational, never personal advice.",
};

export default function TypesPage() {
  return (
    <div className="pt-1">
      <h2 className="font-heading text-xl font-medium">The four investor types</h2>
      <p className="mt-1.5 text-[15px] text-muted-foreground">
        Our quiz sorts you into one of four published types based on how you think about money, never on your income
        or savings. All four are listed openly here: the quiz adapts how we teach, never what anyone should buy.
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        {PERSONA_LIST.map((p) => (
          <Link
            key={p.slug}
            href={`/types/${p.slug}`}
            className="flex min-h-15 w-full items-center gap-3.5 rounded-xl border border-border bg-card px-4 py-3.5 shadow-sm transition-colors hover:border-primary"
          >
            <span className="text-2xl">{p.emoji}</span>
            <span className="flex flex-col">
              <span className="text-[15px] font-bold">{p.name}</span>
              <span className="text-[13px] text-muted-foreground">{p.desc}</span>
            </span>
            <ChevronRight className="ml-auto size-4.5 flex-none text-muted-foreground" aria-hidden="true" />
          </Link>
        ))}
      </div>

      <Link
        href="/quiz"
        className="mt-4 block rounded-xl bg-primary px-4 py-3 text-center text-[15px] font-bold text-primary-foreground"
      >
        Find your type →
      </Link>

      <p className="mt-5 px-1 pb-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Educational information, not personal financial advice. Types are general illustrations, most people are a
        blend, and your type can change as life changes.
      </p>
    </div>
  );
}

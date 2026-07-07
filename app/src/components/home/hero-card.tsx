import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroCardProps {
  ctaLabel: string;
  onCtaClick: () => void;
}

export function HeroCard({ ctaLabel, onCtaClick }: HeroCardProps) {
  return (
    <section className="rounded-2xl bg-card p-6 shadow-sm">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
        <span className="inline-block size-1.5 rounded-full bg-primary" />
        Investing · Crypto · Blockchain
      </span>
      <h1 className="mt-2.5 font-heading text-[26px] leading-tight font-medium text-balance">Learn to invest, calmly.</h1>
      <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
        Short lessons that take you from confusion to your first move, in stocks or crypto. No hype, no hot tips.
      </p>
      <Button onClick={onCtaClick} className="mt-5 h-11 w-full rounded-xl text-[15px]">
        {ctaLabel}
      </Button>
      <div className="mt-2.5 flex gap-2.5">
        <Button asChild variant="outline" className="h-11 flex-1 rounded-xl">
          <Link href="/lessons">Browse lessons</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 flex-1 rounded-xl">
          <Link href="/tools">Tools</Link>
        </Button>
      </div>
    </section>
  );
}

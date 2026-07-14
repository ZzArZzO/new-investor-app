import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { PERSONA_LIST, personaBySlug } from "@/content/quiz";

interface TypePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PERSONA_LIST.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: TypePageProps) {
  const { slug } = await params;
  const persona = personaBySlug(slug);
  if (!persona) return {};
  return {
    title: `${persona.name}, investor type`,
    description: persona.desc,
  };
}

export default async function TypePage({ params }: TypePageProps) {
  const { slug } = await params;
  const persona = personaBySlug(slug);
  if (!persona) notFound();

  return (
    <div className="pt-1">
      <Link href="/types" className="mb-1 inline-flex items-center gap-1 py-2 text-sm font-semibold text-muted-foreground">
        <ChevronLeft className="size-4" aria-hidden="true" />
        All types
      </Link>

      <div className="rounded-2xl bg-card p-6 text-center shadow-sm">
        <div className="text-4xl">{persona.emoji}</div>
        <h1 className="mt-2 font-heading text-2xl font-medium">{persona.name}</h1>
        <p className="mt-1.5 text-[15px] text-muted-foreground">{persona.desc}</p>
      </div>

      <div className="mt-3.5 rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">How people like this often think</div>
        <p className="mt-2 text-[15px] leading-relaxed">{persona.approach}</p>
      </div>

      <div className="mt-3.5 rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">Strengths</div>
        <ul className="mt-2 grid gap-1.5">
          {persona.strengths.map((s) => (
            <li key={s} className="relative pl-5.5 text-[14.5px]">
              <span className="absolute left-0 top-0.5 text-xs font-bold text-primary">✓</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3.5 rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">Blind spots to watch</div>
        <ul className="mt-2 grid gap-1.5">
          {persona.blindSpots.map((s) => (
            <li key={s} className="relative pl-5.5 text-[14.5px]">
              <span className="absolute left-0 top-0.5 text-xs font-bold text-destructive">!</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/quiz"
        className="mt-4 block rounded-xl bg-primary px-4 py-3 text-center text-[15px] font-bold text-primary-foreground"
      >
        Not sure this is you? Take the quiz →
      </Link>

      <p className="mt-5 px-1 pb-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        A general illustration, not personal financial advice. The quiz never asks about your income or savings, and
        the same lessons and comparisons are shown to everyone.
      </p>
    </div>
  );
}

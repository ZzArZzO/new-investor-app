"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { QUIZ, scoreQuiz } from "@/content/quiz";
import type { PersonaKey } from "@/content/types";
import { Progress } from "@/components/ui/progress";
import { useAppStateContext } from "@/hooks/app-state-context";

export default function QuizPage() {
  const router = useRouter();
  const { setPersona } = useAppStateContext();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PersonaKey[]>([]);

  const letters: PersonaKey[] = ["A", "B", "C", "D"];
  const item = QUIZ[step];

  function choose(letter: PersonaKey) {
    const next = [...answers];
    next[step] = letter;
    setAnswers(next);
    if (step + 1 < QUIZ.length) {
      setStep(step + 1);
    } else {
      const persona = scoreQuiz(next);
      setPersona(persona);
      router.push("/result");
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-140 flex-col px-4 pt-3 pb-8">
      <Link href="/" className="mb-1 inline-flex items-center gap-1 py-2 text-sm font-semibold text-muted-foreground">
        <ChevronLeft className="size-4" aria-hidden="true" />
        Home
      </Link>
      <div className="text-[13px] font-bold text-muted-foreground">
        Question {step + 1} of {QUIZ.length}
      </div>
      <Progress value={Math.round((step / QUIZ.length) * 100)} className="mt-2 mb-5" />
      <h2 className="font-heading text-xl font-medium text-balance">{item.q}</h2>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {item.o.map((text, idx) => (
          <button
            key={text}
            type="button"
            onClick={() => choose(letters[idx])}
            className="rounded-lg border border-border bg-card px-4 py-3.5 text-left text-[15px] font-medium transition-colors hover:border-primary"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { LESSONS } from "@/content/lessons";
import { LessonView } from "@/components/lessons/lesson-view";

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params;
  const lesson = LESSONS.find((l) => l.id === id);
  if (!lesson) notFound();
  return <LessonView key={lesson.id} lesson={lesson} />;
}

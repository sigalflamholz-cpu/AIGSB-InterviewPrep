"use client";

import type { GeneratedQuestion } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface QuestionDisplayProps {
  question: GeneratedQuestion;
}

export default function QuestionDisplay({ question }: QuestionDisplayProps) {
  const categoryLabels = {
    behavioral: "Behavioral",
    case: "Case Study",
    situational: "Situational",
  };

  const difficultyVariant = {
    easy: "success" as const,
    medium: "warning" as const,
    hard: "default" as const,
  };

  return (
    <div className="animate-fade-in rounded-3xl bg-card-light p-8">
      <div className="mb-5 flex items-center gap-2">
        <Badge variant="info">{categoryLabels[question.category]}</Badge>
        <Badge variant={difficultyVariant[question.difficulty]}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </Badge>
      </div>
      <p className="text-lg font-bold leading-7 text-text-dark">
        {question.question}
      </p>
      {question.context && (
        <div className="mt-5 rounded-xl bg-white/50 p-4 text-sm leading-relaxed text-text-dark/70">
          <span className="font-bold text-text-dark">Context: </span>
          {question.context}
        </div>
      )}
    </div>
  );
}

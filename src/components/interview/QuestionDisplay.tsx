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
    <div className="animate-fade-in rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Badge variant="info">{categoryLabels[question.category]}</Badge>
        <Badge variant={difficultyVariant[question.difficulty]}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </Badge>
      </div>
      <p className="text-lg font-medium leading-7 text-slate-800">
        {question.question}
      </p>
      {question.context && (
        <div className="mt-4 rounded-lg bg-white/70 p-4 text-sm text-slate-600">
          <span className="font-semibold text-slate-700">Context: </span>
          {question.context}
        </div>
      )}
    </div>
  );
}

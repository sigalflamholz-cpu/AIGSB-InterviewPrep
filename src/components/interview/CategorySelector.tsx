"use client";

import type { QuestionCategory, Difficulty, AnswerMode } from "@/lib/types";

interface CategorySelectorProps {
  category: QuestionCategory;
  setCategory: (c: QuestionCategory) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  answerMode: AnswerMode;
  setAnswerMode: (m: AnswerMode) => void;
}

const categories: { value: QuestionCategory; label: string; desc: string }[] = [
  { value: "behavioral", label: "Behavioral", desc: "STAR method questions about past experiences" },
  { value: "case", label: "Case Study", desc: "Open-ended business analysis scenarios" },
  { value: "situational", label: "Situational", desc: "Hypothetical workplace judgment calls" },
];

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export default function CategorySelector({
  category,
  setCategory,
  difficulty,
  setDifficulty,
  answerMode,
  setAnswerMode,
}: CategorySelectorProps) {
  return (
    <div className="space-y-8">
      {/* Question Type */}
      <div>
        <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-text-muted">
          Question Type
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`rounded-2xl border p-5 text-left transition-all ${
                category === cat.value
                  ? "border-foreground/30 bg-card-dark"
                  : "border-border bg-card-darker hover:border-border hover:bg-card-dark"
              }`}
            >
              <div className="text-sm font-bold uppercase tracking-wide text-foreground">
                {cat.label}
              </div>
              <div className="mt-1 text-[11px] text-text-muted">{cat.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-text-muted">
          Difficulty Level
        </label>
        <div className="flex gap-3">
          {difficulties.map((diff) => (
            <button
              key={diff.value}
              onClick={() => setDifficulty(diff.value)}
              className={`rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                difficulty === diff.value
                  ? "border-foreground/30 bg-card-dark text-foreground"
                  : "border-border bg-transparent text-text-muted hover:border-border hover:text-foreground"
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      {/* Answer Mode */}
      <div>
        <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-text-muted">
          Answer Format
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => setAnswerMode("free-form")}
            className={`rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              answerMode === "free-form"
                ? "border-foreground/30 bg-card-dark text-foreground"
                : "border-border bg-transparent text-text-muted hover:text-foreground"
            }`}
          >
            Free-Form
          </button>
          <button
            onClick={() => setAnswerMode("multiple-choice")}
            className={`rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              answerMode === "multiple-choice"
                ? "border-foreground/30 bg-card-dark text-foreground"
                : "border-border bg-transparent text-text-muted hover:text-foreground"
            }`}
          >
            Multiple Choice
          </button>
        </div>
      </div>
    </div>
  );
}

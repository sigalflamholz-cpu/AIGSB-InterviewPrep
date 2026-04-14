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

const difficulties: { value: Difficulty; label: string; color: string }[] = [
  { value: "easy", label: "Easy", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { value: "medium", label: "Medium", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "hard", label: "Hard", color: "bg-red-100 text-red-700 border-red-200" },
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
        <label className="mb-3 block text-sm font-semibold text-slate-700">
          Question Type
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                category === cat.value
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="font-semibold text-slate-900">{cat.label}</div>
              <div className="mt-1 text-xs text-slate-500">{cat.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-slate-700">
          Difficulty Level
        </label>
        <div className="flex gap-3">
          {difficulties.map((diff) => (
            <button
              key={diff.value}
              onClick={() => setDifficulty(diff.value)}
              className={`rounded-lg border px-5 py-2 text-sm font-medium transition-all ${
                difficulty === diff.value
                  ? diff.color + " shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      {/* Answer Mode */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-slate-700">
          Answer Format
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => setAnswerMode("free-form")}
            className={`rounded-lg border px-5 py-2 text-sm font-medium transition-all ${
              answerMode === "free-form"
                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Free-Form Text
          </button>
          <button
            onClick={() => setAnswerMode("multiple-choice")}
            className={`rounded-lg border px-5 py-2 text-sm font-medium transition-all ${
              answerMode === "multiple-choice"
                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Multiple Choice
          </button>
        </div>
      </div>
    </div>
  );
}

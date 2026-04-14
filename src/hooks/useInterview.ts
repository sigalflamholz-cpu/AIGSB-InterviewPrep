"use client";

import { useState } from "react";
import type {
  QuestionCategory,
  Difficulty,
  AnswerMode,
  GeneratedQuestion,
  Feedback,
} from "@/lib/types";

export function useInterview() {
  const [category, setCategory] = useState<QuestionCategory>("behavioral");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [answerMode, setAnswerMode] = useState<AnswerMode>("free-form");
  const [jobDescription, setJobDescription] = useState("");
  const [question, setQuestion] = useState<GeneratedQuestion | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateQuestion() {
    setIsGenerating(true);
    setError(null);
    setQuestion(null);
    setAnswer("");
    setFeedback(null);

    try {
      const res = await fetch("/api/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          difficulty,
          answerMode,
          jobDescription: jobDescription.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate question");
      }

      const data = await res.json();
      setQuestion(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  }

  async function submitAnswer(): Promise<Feedback | null> {
    if (!question || !answer.trim()) return null;

    setIsEvaluating(true);
    setError(null);

    try {
      const res = await fetch("/api/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer, answerMode }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to evaluate answer");
      }

      const data: Feedback = await res.json();
      setFeedback(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      return null;
    } finally {
      setIsEvaluating(false);
    }
  }

  function reset() {
    setQuestion(null);
    setAnswer("");
    setFeedback(null);
    setError(null);
  }

  return {
    category,
    setCategory,
    difficulty,
    setDifficulty,
    answerMode,
    setAnswerMode,
    jobDescription,
    setJobDescription,
    question,
    answer,
    setAnswer,
    feedback,
    isGenerating,
    isEvaluating,
    error,
    generateQuestion,
    submitAnswer,
    reset,
  };
}

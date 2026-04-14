"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Feedback, GeneratedQuestion, AnswerMode } from "@/lib/types";
import FeedbackCard from "@/components/results/FeedbackCard";
import StarEvaluation from "@/components/results/StarEvaluation";

interface SessionData {
  feedback: Feedback;
  question: GeneratedQuestion;
  answer: string;
  answerMode: AnswerMode;
}

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 10) * circumference;
  const color =
    score >= 7
      ? "text-emerald-500"
      : score >= 5
        ? "text-amber-500"
        : "text-red-500";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="100" height="100" className="-rotate-90">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${color} transition-all duration-1000`}
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-2xl font-black text-foreground">{score}</span>
        <span className="text-[10px] text-text-muted">/10</span>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<SessionData | null>(null);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("interviewFeedback");
    if (!stored) {
      router.push("/interview");
      return;
    }
    setData(JSON.parse(stored));
  }, [router]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  const { feedback, question } = data;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 md:px-8">
        <Link href="/" className="text-sm font-black uppercase tracking-wider text-foreground">
          Interview
          <br />
          <span className="text-text-muted">Simulator</span>
        </Link>
      </header>

      <main className="flex-1 px-6 pb-12 md:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Score Header */}
          <div className="animate-fade-in flex flex-col items-center rounded-3xl bg-card-light p-10 text-center">
            <ScoreRing score={feedback.overallScore} />
            <h1 className="mt-5 text-2xl font-black uppercase tracking-tight text-text-dark">
              Your Score
            </h1>
            <p className="mt-2 max-w-md text-sm text-text-dark/60">
              {feedback.overallScore >= 8
                ? "Excellent response. You demonstrated strong interview skills."
                : feedback.overallScore >= 6
                  ? "Good effort. With some refinement, your answer will be even stronger."
                  : feedback.overallScore >= 4
                    ? "A solid start. Focus on the improvement areas below."
                    : "Keep practicing. Review the feedback below to strengthen your approach."}
            </p>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid gap-4 md:grid-cols-2">
            <FeedbackCard
              title="Strengths"
              items={feedback.strengths}
              variant="strengths"
            />
            <FeedbackCard
              title="Areas for Improvement"
              items={feedback.improvements}
              variant="improvements"
            />
          </div>

          {/* STAR Evaluation */}
          {feedback.starEvaluation && question.category === "behavioral" && (
            <StarEvaluation evaluation={feedback.starEvaluation} />
          )}

          {/* Model Answer */}
          <div className="rounded-3xl border border-border bg-card-darker">
            <button
              onClick={() => setShowModel(!showModel)}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                Model Answer
              </span>
              <svg
                className={`h-4 w-4 text-text-muted transition-transform ${showModel ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showModel && (
              <div className="border-t border-border px-6 pb-6 pt-4">
                <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/70">
                  {feedback.improvedAnswer}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/interview"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-foreground/20 bg-card-dark px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:border-foreground/40"
            >
              Practice Again
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/"
              className="flex flex-1 items-center justify-center rounded-full border border-border px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted transition-all hover:border-foreground/20 hover:text-foreground"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

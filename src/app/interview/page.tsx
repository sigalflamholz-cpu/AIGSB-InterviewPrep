"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useInterview } from "@/hooks/useInterview";
import CategorySelector from "@/components/interview/CategorySelector";
import JobDescriptionInput from "@/components/interview/JobDescriptionInput";
import QuestionDisplay from "@/components/interview/QuestionDisplay";
import FreeFormAnswer from "@/components/interview/FreeFormAnswer";
import MultipleChoiceAnswer from "@/components/interview/MultipleChoiceAnswer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function InterviewPage() {
  const router = useRouter();
  const {
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
    isGenerating,
    isEvaluating,
    error,
    generateQuestion,
    submitAnswer,
    reset,
  } = useInterview();

  async function handleSubmit() {
    const feedback = await submitAnswer();
    if (feedback) {
      sessionStorage.setItem(
        "interviewFeedback",
        JSON.stringify({ feedback, question, answer, answerMode })
      );
      router.push("/results");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 md:px-8">
        <Link href="/" className="text-sm font-black uppercase tracking-wider text-foreground">
          Interview
          <br />
          <span className="text-text-muted">Simulator</span>
        </Link>
        {question && (
          <button
            onClick={reset}
            className="rounded-full border border-border px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            New Question
          </button>
        )}
      </header>

      <main className="flex-1 px-6 pb-12 md:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {!question ? (
            <>
              <div className="rounded-3xl bg-card-light p-8">
                <h1 className="text-3xl font-black uppercase leading-tight tracking-tight text-text-dark md:text-4xl">
                  Configure
                  <br />
                  Your Practice
                </h1>
                <p className="mt-3 text-sm text-text-dark/60">
                  Choose your question type, difficulty, and answer format.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card-darker p-8">
                <CategorySelector
                  category={category}
                  setCategory={setCategory}
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  answerMode={answerMode}
                  setAnswerMode={setAnswerMode}
                />
              </div>

              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
              />

              {error && (
                <div className="rounded-2xl border border-red-900 bg-red-950 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                onClick={generateQuestion}
                disabled={isGenerating}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-foreground/20 bg-card-dark px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:bg-card-darker hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Question
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <QuestionDisplay question={question} />

              <div className="animate-fade-in rounded-3xl border border-border bg-card-darker p-8">
                {answerMode === "free-form" ? (
                  <FreeFormAnswer
                    value={answer}
                    onChange={setAnswer}
                    disabled={isEvaluating}
                  />
                ) : question.choices ? (
                  <MultipleChoiceAnswer
                    choices={question.choices}
                    selected={answer}
                    onSelect={setAnswer}
                    disabled={isEvaluating}
                  />
                ) : null}
              </div>

              {error && (
                <div className="rounded-2xl border border-red-900 bg-red-950 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isEvaluating || !answer.trim()}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-foreground/20 bg-card-dark px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:bg-card-darker hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isEvaluating ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Submit Answer
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

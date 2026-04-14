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
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-slate-900">
            Interview<span className="text-blue-600">Sim</span>
          </Link>
          {question && (
            <button
              onClick={reset}
              className="text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              New Question
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-3xl space-y-8">
          {!question ? (
            <>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Configure Your Practice
                </h1>
                <p className="mt-2 text-slate-500">
                  Choose your question type, difficulty, and answer format.
                </p>
              </div>

              <CategorySelector
                category={category}
                setCategory={setCategory}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                answerMode={answerMode}
                setAnswerMode={setAnswerMode}
              />

              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
              />

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={generateQuestion}
                disabled={isGenerating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Generating Question...
                  </>
                ) : (
                  "Generate Question"
                )}
              </button>
            </>
          ) : (
            <>
              <QuestionDisplay question={question} />

              <div className="animate-fade-in">
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
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isEvaluating || !answer.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isEvaluating ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Analyzing Your Answer...
                  </>
                ) : (
                  "Submit Answer"
                )}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

import type { StarEvaluation as StarEvalType } from "@/lib/types";

interface StarEvaluationProps {
  evaluation: StarEvalType;
}

const components: { key: keyof StarEvalType; label: string; description: string }[] = [
  { key: "situation", label: "Situation", description: "Context and setting" },
  { key: "task", label: "Task", description: "Your responsibility" },
  { key: "action", label: "Action", description: "Steps you took" },
  { key: "result", label: "Result", description: "Outcomes and impact" },
];

function ScoreBar({ score }: { score: number }) {
  const percentage = (score / 10) * 100;
  const color =
    score >= 7 ? "bg-emerald-500" : score >= 5 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 rounded-full bg-slate-200">
        <div
          className={`h-2 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-right text-sm font-semibold text-slate-700">
        {score}/10
      </span>
    </div>
  );
}

export default function StarEvaluation({ evaluation }: StarEvaluationProps) {
  return (
    <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
      <h3 className="mb-6 text-lg font-semibold text-violet-800">
        STAR Framework Evaluation
      </h3>
      <div className="space-y-5">
        {components.map((comp) => {
          const data = evaluation[comp.key];
          return (
            <div key={comp.key}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-800">
                    {comp.label}
                  </span>
                  <span className="ml-2 text-xs text-slate-400">
                    {comp.description}
                  </span>
                </div>
              </div>
              <ScoreBar score={data.score} />
              <p className="mt-1.5 text-sm text-slate-600">{data.feedback}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

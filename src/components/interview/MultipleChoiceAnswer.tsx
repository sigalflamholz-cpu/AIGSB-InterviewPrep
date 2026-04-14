"use client";

interface MultipleChoiceAnswerProps {
  choices: string[];
  selected: string;
  onSelect: (choice: string) => void;
  disabled?: boolean;
}

export default function MultipleChoiceAnswer({
  choices,
  selected,
  onSelect,
  disabled,
}: MultipleChoiceAnswerProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-slate-700">
        Select Your Answer
      </label>
      <div className="space-y-3">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onSelect(choice)}
            disabled={disabled}
            className={`w-full rounded-xl border-2 p-4 text-left text-sm transition-all ${
              selected === choice
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selected === choice
                    ? "border-blue-500 bg-blue-500"
                    : "border-slate-300"
                }`}
              >
                {selected === choice && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-slate-700">{choice}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

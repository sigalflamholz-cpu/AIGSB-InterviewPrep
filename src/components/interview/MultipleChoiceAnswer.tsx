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
      <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-text-muted">
        Select Your Answer
      </label>
      <div className="space-y-3">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onSelect(choice)}
            disabled={disabled}
            className={`w-full rounded-2xl border p-5 text-left text-sm transition-all ${
              selected === choice
                ? "border-foreground/30 bg-card-dark"
                : "border-border bg-card-darker hover:border-border hover:bg-card-dark"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selected === choice
                    ? "border-foreground bg-foreground"
                    : "border-text-muted/30"
                }`}
              >
                {selected === choice && (
                  <div className="h-2 w-2 rounded-full bg-background" />
                )}
              </div>
              <span className="text-foreground">{choice}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

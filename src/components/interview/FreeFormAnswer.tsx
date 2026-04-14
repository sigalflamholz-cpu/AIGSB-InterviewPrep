"use client";

interface FreeFormAnswerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function FreeFormAnswer({
  value,
  onChange,
  disabled,
}: FreeFormAnswerProps) {
  return (
    <div>
      <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-text-muted">
        Your Answer
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Type your answer here. For behavioral questions, try using the STAR method (Situation, Task, Action, Result)..."
        className="w-full resize-none rounded-2xl border border-border bg-card-darker p-5 text-sm leading-7 text-foreground placeholder-text-muted/50 transition-colors focus:border-foreground/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        rows={8}
      />
      <div className="mt-1 text-right text-[10px] uppercase tracking-widest text-text-muted/50">
        {value.length} characters
      </div>
    </div>
  );
}

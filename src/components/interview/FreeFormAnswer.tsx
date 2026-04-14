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
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Your Answer
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Type your answer here. For behavioral questions, try to structure your response using the STAR method (Situation, Task, Action, Result)..."
        className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-700 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-50"
        rows={8}
      />
      <div className="mt-1 text-right text-xs text-slate-400">
        {value.length} characters
      </div>
    </div>
  );
}

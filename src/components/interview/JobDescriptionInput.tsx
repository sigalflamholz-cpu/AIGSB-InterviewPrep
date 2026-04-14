"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionInput({
  value,
  onChange,
}: JobDescriptionInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card-darker">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Job Description
          </span>
          <span className="text-[10px] uppercase tracking-widest text-text-muted/50">
            (optional)
          </span>
          {value.trim() && <Badge variant="info">JD Active</Badge>}
        </div>
        <svg
          className={`h-4 w-4 text-text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="border-t border-border px-6 pb-6 pt-4">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste a job description here to get tailored interview questions..."
            className="w-full resize-none rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder-text-muted/50 focus:border-foreground/30 focus:outline-none"
            rows={6}
          />
          {value.trim() && (
            <button
              onClick={() => onChange("")}
              className="mt-2 text-[10px] uppercase tracking-widest text-text-muted hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

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
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">
            Job Description
          </span>
          <span className="text-xs text-slate-400">(optional)</span>
          {value.trim() && <Badge variant="info">JD Active</Badge>}
        </div>
        <svg
          className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-3">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste a job description here to get tailored interview questions..."
            className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={6}
          />
          {value.trim() && (
            <button
              onClick={() => onChange("")}
              className="mt-2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear job description
            </button>
          )}
        </div>
      )}
    </div>
  );
}

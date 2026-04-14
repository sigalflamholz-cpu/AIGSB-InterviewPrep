interface FeedbackCardProps {
  title: string;
  items: string[];
  variant: "strengths" | "improvements";
}

export default function FeedbackCard({ title, items, variant }: FeedbackCardProps) {
  const styles = {
    strengths: {
      border: "border-emerald-200",
      bg: "bg-emerald-50",
      title: "text-emerald-800",
      icon: "text-emerald-500",
      dot: "bg-emerald-400",
    },
    improvements: {
      border: "border-amber-200",
      bg: "bg-amber-50",
      title: "text-amber-800",
      icon: "text-amber-500",
      dot: "bg-amber-400",
    },
  };

  const s = styles[variant];

  return (
    <div className={`rounded-2xl border ${s.border} ${s.bg} p-6`}>
      <h3 className={`mb-4 text-lg font-semibold ${s.title}`}>{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
            <span className="text-sm leading-6 text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

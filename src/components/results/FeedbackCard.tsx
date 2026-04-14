interface FeedbackCardProps {
  title: string;
  items: string[];
  variant: "strengths" | "improvements";
}

export default function FeedbackCard({ title, items, variant }: FeedbackCardProps) {
  const styles = {
    strengths: {
      border: "border-emerald-900",
      bg: "bg-emerald-950",
      title: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    improvements: {
      border: "border-amber-900",
      bg: "bg-amber-950",
      title: "text-amber-400",
      dot: "bg-amber-400",
    },
  };

  const s = styles[variant];

  return (
    <div className={`rounded-3xl border ${s.border} ${s.bg} p-6`}>
      <h3 className={`mb-4 text-[10px] font-bold uppercase tracking-widest ${s.title}`}>
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
            <span className="text-sm leading-6 text-foreground/80">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

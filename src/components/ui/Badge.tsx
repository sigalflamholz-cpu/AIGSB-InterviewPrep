interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info";
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "border-border bg-card-dark text-text-muted",
    success: "border-emerald-800 bg-emerald-950 text-emerald-400",
    warning: "border-amber-800 bg-amber-950 text-amber-400",
    info: "border-white/20 bg-white/10 text-foreground",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

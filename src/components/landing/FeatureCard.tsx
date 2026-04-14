interface FeatureCardProps {
  tag: string;
  bgClass?: string;
}

export default function FeatureCard({ tag, bgClass = "bg-card-darker" }: FeatureCardProps) {
  return (
    <div
      className={`relative flex min-h-[200px] items-end overflow-hidden rounded-3xl ${bgClass} p-6`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <span className="relative z-10 text-sm font-bold uppercase tracking-wider text-white">
        #{tag}
      </span>
    </div>
  );
}

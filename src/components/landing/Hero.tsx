import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid gap-4 px-6 pt-6 md:grid-cols-2 md:px-8">
      {/* Left — headline card */}
      <div className="flex flex-col justify-between rounded-3xl bg-card-light p-10 md:p-14">
        <div>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-text-dark md:text-5xl lg:text-6xl">
            Predict{" "}
            <span className="inline-block">
              &mdash;&rarr;
            </span>
            <br />
            The
            <br />
            Unpredictable
            <br />
            Interview
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-text-dark/70">
            We establish rigorous, scenario-based mock environments to ensure
            your systemic knowledge is articulated flawlessly under pressure.
          </p>
        </div>
      </div>

      {/* Right — CTA card with dark overlay */}
      <div className="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-card-darker md:min-h-[480px]">
        {/* Decorative dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/40 via-neutral-900/60 to-black/80" />

        <div className="relative z-10 flex flex-col items-center">
          <Link
            href="/interview"
            className="flex h-28 w-28 items-center justify-center rounded-full bg-white/15 text-center text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:scale-105"
          >
            Start
            <br />
            Mock
          </Link>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            View Curriculum
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            Book Coach
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 8h20" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}

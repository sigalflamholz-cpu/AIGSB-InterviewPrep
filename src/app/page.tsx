import Hero from "@/components/landing/Hero";
import FeatureCard from "@/components/landing/FeatureCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-5 md:px-8">
        <Link href="/" className="text-sm font-black uppercase tracking-wider text-foreground">
          Interview
          <br />
          <span className="text-text-muted">Simulator</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/interview"
            className="text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-foreground"
          >
            Practice
          </Link>
          <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
            Behavioral
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
            Case Study
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
            Method
          </span>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Hero />

      {/* Feature Tags Grid */}
      <section className="grid grid-cols-2 gap-4 px-6 py-4 md:grid-cols-3 md:px-8">
        <FeatureCard tag="Systems" bgClass="bg-gradient-to-br from-emerald-950 to-card-darker" />
        <FeatureCard tag="Behavioral" bgClass="bg-card-darker" />
        <FeatureCard tag="Situational" bgClass="bg-gradient-to-br from-neutral-800 to-card-darker" />
      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 py-8 md:px-8">
        <div className="flex items-center justify-between border-t border-border pt-6">
          <span className="text-xs text-text-muted">
            Powered by Claude AI
          </span>
          <Link
            href="/interview"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card-dark px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-foreground transition-all hover:bg-card-darker hover:border-foreground/20"
          >
            Start Practicing
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  );
}

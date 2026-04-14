import Hero from "@/components/landing/Hero";
import FeatureCard from "@/components/landing/FeatureCard";

function BrainIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-1.5 3.1A5 5 0 0 1 17 14a5 5 0 0 1-3 4.6V22h-4v-3.4A5 5 0 0 1 7 14a5 5 0 0 1 2.5-4.9A4 4 0 0 1 8 6a4 4 0 0 1 4-4z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold text-slate-900">
            Interview<span className="text-blue-600">Sim</span>
          </span>
        </div>
      </header>

      <main className="flex-1">
        <Hero />

        <section id="features" className="bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">
              Everything You Need to Prepare
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
              Our AI-powered platform helps you practice and improve with
              targeted feedback on every answer.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<BrainIcon />}
                title="AI-Generated Questions"
                description="Practice with behavioral, case, and situational questions across three difficulty levels. Each question is uniquely generated to keep your practice fresh."
              />
              <FeatureCard
                icon={<TargetIcon />}
                title="Job Description Tailoring"
                description="Paste any job description and get interview questions specifically tailored to that role's requirements, skills, and competencies."
              />
              <FeatureCard
                icon={<ChartIcon />}
                title="STAR Framework Feedback"
                description="Receive detailed analysis of your answers with scoring against the STAR method. See exactly where you excel and where to improve."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-slate-500">
          Powered by Claude AI. Built for interview excellence.
        </div>
      </footer>
    </div>
  );
}

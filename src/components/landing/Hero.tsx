import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-32">
      <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
        AI-Powered Interview Practice
      </div>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
        Ace Your Next{" "}
        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Interview
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Practice behavioral, case, and situational interview questions with
        real-time AI feedback. Get detailed analysis of your answers, STAR
        framework evaluation, and personalized improvement tips.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/interview"
          className="rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
        >
          Start Practicing
        </Link>
        <a
          href="#features"
          className="rounded-xl border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}

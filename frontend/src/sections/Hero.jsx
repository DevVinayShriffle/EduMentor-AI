export default function Hero({ onGetStarted, onExploreCourses }) {
  return (
    <section id="home" className="relative flex min-h-dvh items-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_28%),radial-gradient(circle_at_left,_rgba(167,139,250,0.12),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f6f9ff_56%,_#eef4ff_100%)] px-4 pb-24 pt-28 text-center md:pt-36">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] opacity-40" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="inline-flex items-center rounded-full border border-blue-200/80 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 shadow-sm backdrop-blur">
          AI-Powered Learning Platform
        </div>

        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
          Learn Smarter with{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
            EduMentor AI
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          Structured 1-year and 2-year learning journeys with live classes, auto-saved recordings, revision shorts, AI doubt solving, and measurable progress tracking.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button className="rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(79,70,229,0.24)] transition hover:scale-[1.02]">
            Get Started
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white/80 px-7 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white">
            Explore Courses
          </button>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-white/70 bg-white/80 px-5 py-5 text-left shadow-[0_18px_50px_rgba(37,99,235,0.08)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">Live + Recorded</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">Attend real-time classes and revisit automatically saved lectures anytime.</p>
          </div>
          <div className="rounded-[24px] border border-white/70 bg-white/80 px-5 py-5 text-left shadow-[0_18px_50px_rgba(37,99,235,0.08)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">AI Support</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">Solve doubts with text or images and keep practice moving without delay.</p>
          </div>
          <div className="rounded-[24px] border border-white/70 bg-slate-950 px-5 py-5 text-left text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">Progress Tracking</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">Turn quizzes, weekly tests, and completion data into visible improvement.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


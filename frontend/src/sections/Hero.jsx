export default function Hero({ onGetStarted, onExploreCourses }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pb-20 pt-32 text-center md:pt-40 scroll-mt-24"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      {/* Soft floating gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top, rgba(59,130,246,0.10), transparent 60%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto">

        {/* Heading */}
        <h1
          className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Learn Smarter with{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #3b82f6, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            EduMentor AI
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="mt-5 text-sm md:text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          AI-powered structured learning for 1-year & 2-year courses with live classes,
          recorded lectures, quizzes, and intelligent doubt solving.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

          {/* Primary button */}
          <button
            type="button"
            onClick={onGetStarted}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-all hover:scale-[1.03]"
            style={{
              background:
                "linear-gradient(90deg, #3b82f6, #6366f1)",
              color: "#fff",
            }}
          >
            Get Started
          </button>

          {/* Secondary button */}
          <button
            type="button"
            onClick={onExploreCourses}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-all hover:bg-slate-100"
            style={{
              border: "1px solid var(--border-soft)",
              color: "var(--text-primary)",
              background: "transparent",
            }}
          >
            Explore Courses
          </button>

        </div>
      </div>
    </section>
  );
}

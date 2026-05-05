const pillars = [
  {
    label: "Structured Learning",
    text: "Long-term 1-year and 2-year programs designed around syllabus flow, milestone pacing, and disciplined progress."
  },
  {
    label: "AI + Teaching",
    text: "Live classes, recorded lectures, short revision content, and AI-powered doubt solving work together in one system."
  },
  {
    label: "Measurable Growth",
    text: "Daily quizzes, weekly tests, and dashboard analytics help students understand where they are improving."
  }
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fbff_52%,_#eef5ff_100%)] px-4 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-200/80 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 shadow-sm backdrop-blur">
              About EduMentor AI
            </div>

            <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              A modern learning ecosystem built for serious students and competitive exam preparation.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              EduMentor AI combines structured long-term learning, live teaching, recorded lectures, short-form revision, AI support, and centralized academic control into one premium digital platform.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/70 bg-white/85 px-5 py-5 shadow-[0_18px_50px_rgba(37,99,235,0.08)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">Roles</p>
                <p className="mt-3 text-2xl font-bold text-slate-950">3</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">Student, Teacher, and Admin workflows designed into the same system.</p>
              </div>
              <div className="rounded-[24px] border border-white/70 bg-white/85 px-5 py-5 shadow-[0_18px_50px_rgba(37,99,235,0.08)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">Learning Modes</p>
                <p className="mt-3 text-2xl font-bold text-slate-950">4+</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">Live classes, recordings, shorts, study materials, and guided practice.</p>
              </div>
              <div className="rounded-[24px] border border-white/70 bg-slate-950 px-5 py-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">Core Promise</p>
                <p className="mt-3 text-2xl font-bold">Clarity</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">Replace fragmented coaching workflows with one intentional learning environment.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar) => (
              <article
                key={pillar.label}
                className="rounded-[28px] border border-white/75 bg-white/88 p-6 shadow-[0_22px_55px_rgba(37,99,235,0.08)] backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                  {pillar.label}
                </p>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {pillar.text}
                </p>
              </article>
            ))}

            <div className="rounded-[28px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 shadow-[0_22px_55px_rgba(37,99,235,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                Student Journey
              </p>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Register, enroll in a course, attend live sessions, revisit recordings, solve doubts with AI, take daily quizzes and weekly tests, then use analytics to keep improving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

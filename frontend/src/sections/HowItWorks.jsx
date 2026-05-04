const journey = [
  {
    step: "01",
    title: "Choose a structured course",
    description:
      "Start with a 1-year or 2-year learning plan built around syllabus milestones, topic sequencing, and long-term progress."
  },
  {
    step: "02",
    title: "Join live classes, revisit recordings",
    description:
      "Attend real-time sessions with teachers, then come back to automatically saved lectures whenever you need revision."
  },
  {
    step: "03",
    title: "Revise faster with shorts and materials",
    description:
      "Use short topic-wise videos, notes, PDFs, and downloadable resources to tighten understanding between classes."
  },
  {
    step: "04",
    title: "Ask AI, practice daily, improve weekly",
    description:
      "Solve doubts with text or images, take AI-generated daily quizzes, and measure growth through weekly tests and analytics."
  }
];

const highlights = [
  "Live classes with auto-recorded playback",
  "AI doubt solving for text and image questions",
  "Daily quizzes and weekly evaluation loops",
  "Progress analytics with completion visibility"
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.14),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] py-20"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="mx-auto flex h-full w-full max-w-2xl xl:mx-0">
            <div className="flex h-full w-full flex-col rounded-[32px] border border-white/60 bg-white/45 p-6 shadow-[0_24px_80px_rgba(37,99,235,0.08)] backdrop-blur md:p-8">
              <div className="inline-flex items-center rounded-full border border-blue-200/80 bg-white/75 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 shadow-sm backdrop-blur">
                Learning Flow
              </div>

              <h2 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                A premium learning journey built for consistency, revision, and measurable growth.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                EduMentor AI brings live teaching, recorded lectures, short-form revision, AI guidance, and progress tracking into one deliberate system instead of a pile of disconnected tools.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/70 bg-white/80 px-4 py-4 text-left text-sm font-medium text-slate-700 shadow-[0_18px_45px_rgba(30,64,175,0.08)] backdrop-blur"
                  >
                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      +
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex h-full w-full max-w-2xl xl:mx-0">
            <div className="absolute left-7 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-blue-200 via-slate-300 to-transparent md:block" />

            <div className="w-full space-y-5 rounded-[32px] border border-white/60 bg-white/35 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur md:p-6">
              {journey.map((item) => (
                <article
                  key={item.step}
                  className="group relative rounded-[28px] border border-white/75 bg-white/88 p-6 text-left shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(37,99,235,0.14)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold tracking-[0.22em] text-white shadow-lg shadow-slate-900/20">
                      {item.step}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="xl:col-span-2">
            <div className="rounded-[28px] border border-slate-200/80 bg-slate-950 p-6 text-left text-white shadow-[0_28px_70px_rgba(15,23,42,0.2)] md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
                    Student Dashboard
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">
                    Progress you can actually act on
                  </h3>
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
                  Personalized
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/8 p-4">
                  <p className="text-sm text-slate-300">Course completion</p>
                  <p className="mt-2 text-3xl font-bold">78%</p>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                  </div>
                </div>

                <div className="rounded-2xl bg-white/8 p-4">
                  <p className="text-sm text-slate-300">Weekly score trend</p>
                  <p className="mt-2 text-3xl font-bold">+12%</p>
                  <p className="mt-3 text-sm text-emerald-300">
                    Stronger quiz performance after revision sessions
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-sm text-slate-300">Next recommended actions</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    Watch recorded physics lecture
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    Attempt AI daily quiz
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    Revise with topic shorts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

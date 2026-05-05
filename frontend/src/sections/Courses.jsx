const categoryChips = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "JEE Main",
  "JEE Advanced",
  "NEET",
  "UPSC",
  "SSC",
  "Banking",
  "State Exams",
  "1 Year Program",
  "2 Year Program",
  "Crash Course",
  "Revision Batch",
];

const featuredCourses = [
  {
    title: "JEE Main 1 Year Program",
    provider: "Exam-Based",
    type: "1 Year Program",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "NEET 2 Year Program",
    provider: "Exam-Based",
    type: "2 Year Program",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Physics Revision Batch",
    provider: "Subject-Based",
    type: "Revision Batch",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mathematics Crash Course",
    provider: "Subject-Based",
    type: "Crash Course",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
  },
];

const spotlightLists = [
  {
    title: "Most popular",
    items: [
      "Mathematics Mastery Program",
      "Physics Concept Builder",
      "Chemistry Problem Solving Batch",
    ],
  },
  {
    title: "Hot new releases",
    items: [
      "JEE Advanced Rank Booster",
      "NEET Rapid Revision Batch",
      "English Writing and Grammar Lab",
    ],
  },
  {
    title: "Trending now",
    items: [
      "UPSC Foundation Program",
      "Banking Quant Crash Course",
      "SSC Complete Test Series",
    ],
  },
];

export default function Courses() {
  return (
    <section
      id="courses"
      className="bg-[linear-gradient(180deg,_#eef4ff_0%,_#ffffff_100%)] px-4 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Courses built for long-term outcomes, not content overload.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            Explore learning plans designed around timelines, revision cycles, performance checkpoints, and real academic progression.
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm font-semibold text-slate-700">Explore categories</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {categoryChips.map((chip) => (
              <button
                key={chip}
                type="button"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[32px] border border-indigo-100 bg-[linear-gradient(135deg,_#d946ef_0%,_#8b5cf6_28%,_#eef2ff_28%,_#eef2ff_100%)] shadow-[0_24px_70px_rgba(99,102,241,0.16)]">
          <div className="grid gap-5 bg-[linear-gradient(135deg,_rgba(88,28,135,0.22)_0%,_rgba(79,70,229,0.18)_45%,_rgba(30,41,59,0.10)_100%)] p-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[24px] bg-white/12 p-6 text-left text-white backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">
                Program Formats
              </p>
              <h3 className="mt-4 text-3xl font-bold leading-tight text-slate-950">
                Choose the duration that matches your preparation intensity.
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-900">
                Offer long-term 1 Year and 2 Year programs, fast-paced Crash Courses,
                and Revision Batches for students who need a sharper short-cycle push.
              </p>
              <button className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-fuchsia-700 transition hover:bg-fuchsia-50">
                View programs
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredCourses.map((course) => (
                <article
                  key={course.title}
                  className="flex h-full flex-col overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-[0_16px_45px_rgba(37,99,235,0.08)]"
                >
                  <div className="h-32 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 text-left">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                      {course.provider}
                    </p>
                    <h4 className="mt-2 min-h-[4.5rem] text-sm font-semibold leading-6 text-slate-950">
                      {course.title}
                    </h4>
                    <p className="mt-auto pt-3 text-xs text-slate-500">{course.type}</p>
                    <p className="mt-2 text-xs font-medium text-slate-700">
                      ★ {course.rating}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {spotlightLists.map((group) => (
            <div
              key={group.title}
              className="rounded-[26px] border border-blue-100 bg-white/90 p-4 shadow-[0_18px_50px_rgba(37,99,235,0.07)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-950">
                  {group.title}
                </h3>
                <span className="text-sm font-medium text-blue-700">›</span>
              </div>

              <div className="space-y-3">
                {group.items.map((item, itemIndex) => (
                  <article
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 text-sm font-bold text-white">
                      {itemIndex + 1}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-950">
                        {item}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Guided course track
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


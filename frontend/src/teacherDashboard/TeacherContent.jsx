import { useOutletContext } from "react-router-dom";

export default function TeacherContent() {
  const { isDarkTheme } = useOutletContext();
  const actions = ["Add Course", "Add Lesson", "Upload Video", "Upload Material"];
  const sections = [
    {
      title: "Courses",
      rows: [
        { name: "Class 12 Physics Mastery", status: "Active", updated: "2 hours ago" },
        { name: "Organic Chemistry Crash Batch", status: "Draft", updated: "Yesterday" },
      ],
    },
    {
      title: "Syllabus & Lessons",
      rows: [
        { name: "Electrostatics Module 4", status: "Published", updated: "Today" },
        { name: "Hydrocarbons Revision Sheet", status: "Review", updated: "2 days ago" },
      ],
    },
    {
      title: "Videos / Recordings",
      rows: [
        { name: "Wave Optics Live Replay", status: "Processing", updated: "45 mins ago" },
        { name: "Trigonometry Problem Sprint", status: "Live", updated: "Today" },
      ],
    },
    {
      title: "Study Materials",
      rows: [
        { name: "Mock Test Solutions Pack", status: "Uploaded", updated: "Today" },
        { name: "Formula Flash Notes", status: "Scheduled", updated: "Tomorrow 8 AM" },
      ],
    },
  ];
  const cardClass = isDarkTheme
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]"
    : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-fuchsia-300" : "text-blue-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
          Content Management
        </p>
        <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Organize courses, lessons, recordings, and materials.</h1>
            <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${mutedClass}`}>
              Use this space to keep published content current, spot drafts waiting on review, and
              move lesson assets into the right course flow quickly.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {actions.map((action) => (
              <button
                key={action}
                type="button"
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] ${
                  isDarkTheme
                    ? "bg-gradient-to-r from-indigo-500/85 via-violet-500/85 to-fuchsia-500/85"
                    : "bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500"
                }`}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className={`rounded-[28px] border p-5 ${cardClass}`}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isDarkTheme ? "bg-white/8 text-slate-200" : "bg-blue-50 text-blue-700"
                }`}
              >
                {section.rows.length} items
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {section.rows.map((row) => (
                <div
                  key={row.name}
                  className={`rounded-2xl border p-4 ${
                    isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-semibold">{row.name}</h3>
                      <p className={`mt-1 text-sm ${mutedClass}`}>Last updated {row.updated}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isDarkTheme ? "bg-fuchsia-500/12 text-fuchsia-200" : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

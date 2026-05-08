import { useOutletContext } from "react-router-dom";

export default function StudentLearn() {
  const { isDarkTheme } = useOutletContext();
  const sections = [
    {
      title: "Current Courses",
      rows: [
        { name: "Class 12 Physics Mastery", status: "In Progress", updated: "Continue module 5" },
        { name: "Organic Chemistry Fast Track", status: "Revision", updated: "Review reaction maps" },
      ],
    },
    {
      title: "Recordings",
      rows: [
        { name: "Current Electricity Replay", status: "Saved", updated: "Watched 68%" },
        { name: "Limits Problem Solving Session", status: "Resume", updated: "Watched 42%" },
      ],
    },
    {
      title: "Shorts",
      rows: [
        { name: "Electrostatics Formula Recap", status: "Recommended", updated: "3 mins" },
        { name: "Hydrocarbons Memory Hack", status: "New", updated: "4 mins" },
      ],
    },
    {
      title: "Study Materials",
      rows: [
        { name: "Mock Test Solution Pack", status: "Downloaded", updated: "Today" },
        { name: "Derivative Formula Sheet", status: "Open", updated: "Yesterday" },
      ],
    },
  ];
  const cardClass = isDarkTheme
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]"
    : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-cyan-300" : "text-sky-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Learn</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Manage courses, recordings, shorts, and study materials from one place.
        </h1>
        <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${mutedClass}`}>
          This learning workspace is built for restarting quickly, continuing unfinished lessons, and
          keeping revision assets close to the core course flow.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className={`rounded-[28px] border p-5 ${cardClass}`}>
            <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
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
                      <p className={`mt-1 text-sm ${mutedClass}`}>{row.updated}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isDarkTheme ? "bg-cyan-500/12 text-cyan-200" : "bg-sky-100 text-sky-700"
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

import { useOutletContext } from "react-router-dom";

export default function TeacherHome() {
  const { isDarkTheme } = useOutletContext();
  const stats = [
    { label: "Upcoming Live Classes", value: "06", note: "2 starting in the next 3 hours" },
    { label: "Active Courses", value: "14", note: "3 recently updated this week" },
    { label: "Pending Doubts", value: "18", note: "7 need replies before evening" },
    { label: "Average Attendance", value: "89%", note: "Up 4% from last week" },
  ];
  const schedule = [
    { time: "09:30 AM", title: "Physics Revision Sprint", meta: "Class 12 A • 42 students" },
    { time: "12:00 PM", title: "Organic Chemistry Q&A", meta: "NEET Batch • Live doubt clinic" },
    { time: "03:30 PM", title: "Weekly Mock Discussion", meta: "JEE Advanced • Test review" },
  ];
  const actions = [
    "Create Live Class",
    "Upload Material",
    "Create Test",
    "Review Doubts",
  ];
  const activity = [
    "Uploaded projectile motion worksheet for Class 11 Foundation",
    "Published recording for Differential Calculus masterclass",
    "Reviewed 24 quiz submissions from the weekend batch",
    "Replied to 8 AI-escalated doubts in the chemistry group",
  ];
  const cardClass = isDarkTheme
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]"
    : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-fuchsia-300" : "text-blue-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${accentClass}`}>
          Teacher Dashboard
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Keep classes, content, and student support moving from one control surface.
        </h1>
        <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${mutedClass}`}>
          Today&apos;s workspace surfaces live teaching priorities, pending student help, and the
          fastest actions you are likely to need before your next session starts.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.label} className={`rounded-[28px] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
              {item.label}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{item.value}</h2>
            <p className={`mt-3 text-sm leading-6 ${mutedClass}`}>{item.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
                Today&apos;s Schedule
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Classes and checkpoints</h2>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isDarkTheme ? "bg-white/8 text-slate-200" : "bg-blue-50 text-blue-700"
              }`}
            >
              3 live items
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {schedule.map((item) => (
              <div
                key={item.time}
                className={`rounded-2xl border p-4 ${
                  isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className={`mt-1 text-sm ${mutedClass}`}>{item.meta}</p>
                  </div>
                  <span className={`text-sm font-semibold ${accentClass}`}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
            Quick Actions
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Launch the next workflow</h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {actions.map((action) => (
              <button
                key={action}
                type="button"
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition hover:scale-[1.01] ${
                  isDarkTheme
                    ? "bg-gradient-to-r from-indigo-500/70 via-violet-500/70 to-fuchsia-500/70 text-white shadow-[0_16px_34px_rgba(129,140,248,0.22)]"
                    : "bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 text-white shadow-[0_16px_34px_rgba(79,70,229,0.22)]"
                }`}
              >
                {action}
              </button>
            ))}
          </div>

          <div
            className={`mt-5 rounded-2xl border p-4 ${
              isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"
            }`}
          >
            <p className="text-sm font-semibold">Focus for the next hour</p>
            <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>
              Reply to open doubts from the NEET chemistry batch, then publish the attendance recap
              before the 12:00 PM session starts.
            </p>
          </div>
        </div>
      </section>

      <section className={`rounded-[28px] border p-5 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
          Recent Activity
        </p>
        <div className="mt-5 space-y-3">
          {activity.map((item, index) => (
            <div
              key={item}
              className={`flex items-start gap-3 rounded-2xl border p-4 ${
                isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"
              }`}
            >
              <div
                className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  isDarkTheme ? "bg-fuchsia-500/15 text-fuchsia-200" : "bg-blue-100 text-blue-700"
                }`}
              >
                {index + 1}
              </div>
              <p className={`text-sm leading-6 ${mutedClass}`}>{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

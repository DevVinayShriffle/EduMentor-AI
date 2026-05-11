import { useOutletContext } from "react-router-dom";

export default function StudentHome() {
  const { isDarkTheme } = useOutletContext();
  const stats = [
    { label: "Daily Study Goal", value: "3.5 hrs", note: "2.1 hrs completed today" },
    { label: "Upcoming Class", value: "01", note: "Physics starts at 5:00 PM" },
    { label: "Pending Quiz", value: "02", note: "Math and chemistry practice due" },
    { label: "Weekly Streak", value: "6 days", note: "Keep momentum alive" },
  ];
  const quickActions = ["Resume Recording", "Open Daily Quiz", "Ask AI Doubt", "Review Weak Topics"];
  const activity = ["Finished 2 revision shorts from the electrostatics module", "Attempted 15 MCQs in the chemistry rapid drill", "Saved one AI doubt about integration substitutions", "Downloaded the latest biology notes pack"];
  const upcoming = [
    { time: "5:00 PM", title: "Physics Live Class", meta: "Current electricity • Class 12" },
    { time: "7:30 PM", title: "Chemistry Quiz Window", meta: "Organic basics • 20 questions" },
  ];
  const cardClass = isDarkTheme
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]"
    : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-cyan-300" : "text-sky-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${accentClass}`}>Student Dashboard</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Keep learning momentum visible, structured, and easy to restart.</h1>
        <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${mutedClass}`}>Your dashboard surfaces the next class, practice work, study streaks, and the fastest path back into revision when you return.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.label} className={`rounded-[28px] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>{item.label}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{item.value}</h2>
            <p className={`mt-3 text-sm leading-6 ${mutedClass}`}>{item.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Today&apos;s Snapshot</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Upcoming checkpoints</h2>
          <div className="mt-5 space-y-3">
            {upcoming.map((item) => (
              <div key={item.time} className={`rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
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
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Quick Actions</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Pick up where you left off</h2>
          <div className="mt-5 grid gap-3">
            {quickActions.map((action) => (
              <button key={action} type="button" className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold text-white transition hover:scale-[1.01] ${isDarkTheme ? "bg-gradient-to-r from-cyan-500/80 via-blue-500/80 to-indigo-500/80" : "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500"}`}>
                {action}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={`rounded-[28px] border p-5 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Recent Learning Activity</p>
        <div className="mt-5 space-y-3">
          {activity.map((item, index) => (
            <div key={item} className={`flex items-start gap-3 rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
              <div className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${isDarkTheme ? "bg-cyan-500/15 text-cyan-200" : "bg-sky-100 text-sky-700"}`}>{index + 1}</div>
              <p className={`text-sm leading-6 ${mutedClass}`}>{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

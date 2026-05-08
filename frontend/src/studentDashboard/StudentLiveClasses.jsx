import { useOutletContext } from "react-router-dom";

export default function StudentLiveClasses() {
  const { isDarkTheme } = useOutletContext();
  const classes = [
    { title: "Physics Live Problem Lab", time: "Today • 5:00 PM", status: "Join soon" },
    { title: "Math Doubt Clearing Session", time: "Tomorrow • 7:00 PM", status: "Scheduled" },
    { title: "Biology Revision Marathon", time: "Saturday • 11:00 AM", status: "Upcoming" },
  ];
  const attendance = [
    { label: "Attendance This Week", value: "92%" },
    { label: "Classes Missed", value: "1" },
    { label: "Replay Queue", value: "3" },
  ];
  const cardClass = isDarkTheme
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]"
    : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-cyan-300" : "text-sky-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Live Classes</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Keep upcoming sessions, attendance, and replay access in one view.
        </h1>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {attendance.map((item) => (
          <article key={item.label} className={`rounded-[28px] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>{item.label}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{item.value}</h2>
          </article>
        ))}
      </section>

      <section className={`rounded-[28px] border p-5 ${cardClass}`}>
        <h2 className="text-2xl font-semibold tracking-tight">Upcoming sessions</h2>
        <div className="mt-5 space-y-3">
          {classes.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border p-4 ${
                isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className={`mt-1 text-sm ${mutedClass}`}>{item.time}</p>
                </div>
                <div className="flex gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isDarkTheme ? "bg-cyan-500/12 text-cyan-200" : "bg-sky-100 text-sky-700"}`}>{item.status}</span>
                  <button type="button" className={`rounded-2xl px-4 py-2 text-sm font-semibold text-white ${isDarkTheme ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" : "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500"}`}>Open</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

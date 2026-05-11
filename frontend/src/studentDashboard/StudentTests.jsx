import { useOutletContext } from "react-router-dom";

export default function StudentTests() {
  const { isDarkTheme } = useOutletContext();
  const stats = [
    { label: "Daily Quiz", value: "Pending" },
    { label: "Weekly Exams", value: "2 this week" },
    { label: "Average Score", value: "76%" },
    { label: "Recent Attempts", value: "11" },
  ];
  const tests = [
    { title: "Physics Daily Quiz", due: "Today", score: "Not attempted", status: "Open" },
    { title: "Chemistry Weekly Exam", due: "Friday", score: "68%", status: "Reviewed" },
    { title: "Math Speed Test", due: "Sunday", score: "Scheduled", status: "Upcoming" },
  ];
  const cardClass = isDarkTheme ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]" : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-cyan-300" : "text-sky-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Tests</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Stay on top of daily quizzes, weekly exams, and recent test results.</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.label} className={`rounded-[28px] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>{item.label}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{item.value}</h2>
          </article>
        ))}
      </section>

      <section className={`rounded-[28px] border p-5 ${cardClass}`}>
        <h2 className="text-2xl font-semibold tracking-tight">Assessment queue</h2>
        <div className="mt-5 space-y-3">
          {tests.map((item) => (
            <div key={item.title} className={`rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className={`mt-1 text-sm ${mutedClass}`}>Due {item.due}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className={mutedClass}>{item.score}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isDarkTheme ? "bg-cyan-500/12 text-cyan-200" : "bg-sky-100 text-sky-700"}`}>{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

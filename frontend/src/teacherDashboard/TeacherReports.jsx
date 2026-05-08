import { useOutletContext } from "react-router-dom";

export default function TeacherReports() {
  const { isDarkTheme } = useOutletContext();
  const metrics = [
    { label: "Completion Rate", value: "84%" },
    { label: "Average Attendance", value: "89%" },
    { label: "Test Performance", value: "74%" },
    { label: "Content Engagement", value: "78%" },
  ];
  const coursePerformance = [
    { label: "Class 12 Physics", value: 88 },
    { label: "NEET Chemistry", value: 76 },
    { label: "JEE Foundation Maths", value: 82 },
  ];
  const weakTopics = ["Electrochemistry numericals", "Definite integration speed", "Wave optics derivations"];
  const engagement = [
    "Recorded lectures saw a 12% rise in watch-through this week.",
    "Students open short-form revision videos 1.7x more than long notes.",
    "Attendance dips most sharply in the last session block of the day.",
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
          Reports
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">See performance, attendance, and content engagement in one view.</h1>
        <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${mutedClass}`}>
          These reports highlight the places where progress is compounding and the topics that may need
          more explanation, more practice, or better scheduling.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <article key={item.label} className={`rounded-[28px] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>{item.label}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{item.value}</h2>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
            Course Performance
          </p>
          <div className="mt-5 space-y-4">
            {coursePerformance.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className={`text-sm ${mutedClass}`}>{item.value}%</span>
                </div>
                <div className={`mt-2 h-3 rounded-full ${isDarkTheme ? "bg-white/8" : "bg-slate-100"}`}>
                  <div
                    className={`h-3 rounded-full ${
                      isDarkTheme
                        ? "bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
                        : "bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500"
                    }`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className={`rounded-[28px] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Weak Topics</p>
            <div className="mt-4 space-y-3">
              {weakTopics.map((topic) => (
                <div
                  key={topic}
                  className={`rounded-2xl border p-4 ${
                    isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"
                  }`}
                >
                  <p className={`text-sm leading-6 ${mutedClass}`}>{topic}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[28px] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Engagement Summary</p>
            <div className="mt-4 space-y-3">
              {engagement.map((item) => (
                <div
                  key={item}
                  className={`rounded-2xl border p-4 ${
                    isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"
                  }`}
                >
                  <p className={`text-sm leading-6 ${mutedClass}`}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

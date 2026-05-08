import { useOutletContext } from "react-router-dom";

export default function TeacherAssessments() {
  const { isDarkTheme } = useOutletContext();
  const actions = ["Create Test", "Add Assignment", "Open Question Bank"];
  const stats = [
    { label: "Active Tests", value: "09" },
    { label: "Submitted Assignments", value: "126" },
    { label: "Pending Evaluation", value: "31" },
    { label: "Average Score", value: "74%" },
  ];
  const tests = [
    { title: "Electrostatics Weekly Test", batch: "Class 12 A", submissions: "38/42", status: "Live" },
    { title: "Hydrocarbons Practice Set", batch: "NEET Core", submissions: "62/80", status: "Review" },
    { title: "Limits and Continuity Quiz", batch: "JEE Foundation", submissions: "29/35", status: "Scheduled" },
  ];
  const cardClass = isDarkTheme ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]" : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-fuchsia-300" : "text-blue-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Assessments</p>
        <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Monitor tests, assignment flow, and evaluation load.</h1>
            <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${mutedClass}`}>Quickly launch a new assessment, scan submission pressure, and see which batches are falling behind on completion.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
              <button key={action} type="button" className={`rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] ${isDarkTheme ? "bg-gradient-to-r from-indigo-500/85 via-violet-500/85 to-fuchsia-500/85" : "bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500"}`}>
                {action}
              </button>
            ))}
          </div>
        </div>
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
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Active Assessment Queue</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Current tests and assignment load</h2>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {tests.map((test) => (
            <div key={test.title} className={`rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-base font-semibold">{test.title}</h3>
                  <p className={`mt-1 text-sm ${mutedClass}`}>{test.batch}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className={mutedClass}>Submissions {test.submissions}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isDarkTheme ? "bg-fuchsia-500/12 text-fuchsia-200" : "bg-indigo-100 text-indigo-700"}`}>{test.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

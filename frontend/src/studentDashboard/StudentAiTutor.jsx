import { useOutletContext } from "react-router-dom";

export default function StudentAiTutor() {
  const { isDarkTheme } = useOutletContext();
  const doubts = [
    { topic: "Integration", question: "How do I choose substitution quickly in timed exams?", time: "10 mins ago" },
    { topic: "Hydrocarbons", question: "Why does this reaction prefer one intermediate over another?", time: "48 mins ago" },
    { topic: "Electrostatics", question: "Can you simplify the flux concept with one example?", time: "Yesterday" },
  ];
  const selected = doubts[0];
  const cardClass = isDarkTheme
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]"
    : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-cyan-300" : "text-sky-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>AI Tutor</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Ask doubts, review AI explanations, and keep a history of what confused you.
        </h1>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <h2 className="text-2xl font-semibold tracking-tight">Recent doubts</h2>
          <div className="mt-4 space-y-3">
            {doubts.map((item, index) => (
              <button
                key={item.topic + item.time}
                type="button"
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  isDarkTheme
                    ? index === 0 ? "border-cyan-400/30 bg-white/8" : "border-white/10 bg-white/5 hover:bg-white/8"
                    : index === 0 ? "border-sky-200 bg-sky-50/80" : "border-slate-200/80 bg-slate-50/80 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{item.topic}</p>
                  <span className={`text-xs ${mutedClass}`}>{item.time}</span>
                </div>
                <p className={`mt-3 text-sm leading-6 ${mutedClass}`}>{item.question}</p>
              </button>
            ))}
          </div>
        </div>

        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <h2 className="text-2xl font-semibold tracking-tight">Selected doubt</h2>
          <p className={`mt-3 text-sm ${mutedClass}`}>{selected.question}</p>
          <div className={`mt-5 rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
            <p className="text-sm font-semibold">AI Explanation</p>
            <p className={`mt-3 text-sm leading-7 ${mutedClass}`}>
              Start by checking the inner expression and asking whether its derivative is already present
              nearby. In timed tests, substitution is often the fastest when the expression repeats in
              multiple terms or appears inside a root, log, or trigonometric form.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className={`rounded-2xl px-4 py-3 text-sm font-semibold text-white ${isDarkTheme ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" : "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500"}`}>Ask New Doubt</button>
            <button type="button" className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${isDarkTheme ? "border-white/10 bg-white/5 text-slate-100" : "border-slate-200 bg-white text-slate-900"}`}>View History</button>
          </div>
        </div>
      </section>
    </div>
  );
}

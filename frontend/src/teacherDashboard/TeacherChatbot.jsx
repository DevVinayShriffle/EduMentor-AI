import { useOutletContext } from "react-router-dom";

export default function TeacherChatbot() {
  const { isDarkTheme } = useOutletContext();
  const doubts = [
    {
      student: "Diya Kapoor",
      topic: "Hydrocarbons",
      question: "Why does anti-Markovnikov addition not happen without peroxide conditions?",
      time: "12 mins ago",
    },
    {
      student: "Aarav Sharma",
      topic: "Electrostatics",
      question: "Can you explain why electric flux is independent of the Gaussian surface shape?",
      time: "34 mins ago",
    },
    {
      student: "Ishita Nair",
      topic: "Calculus",
      question: "I understand the formula, but how do I decide which substitution is best in integration?",
      time: "1 hour ago",
    },
  ];
  const selected = doubts[0];
  const cardClass = isDarkTheme ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]" : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-fuchsia-300" : "text-blue-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Chatbot and Student Doubts</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Review recent doubts and draft stronger explanations faster.</h1>
        <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${mutedClass}`}>Use AI-assisted explanation drafting to clear repetitive confusion quickly, then send a more human reply where the student needs reassurance or extra steps.</p>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Recent Doubts</p>
          <div className="mt-4 space-y-3">
            {doubts.map((item, index) => (
              <button key={item.student + item.time} type="button" className={`w-full rounded-2xl border p-4 text-left transition ${isDarkTheme ? (index === 0 ? "border-fuchsia-400/30 bg-white/8" : "border-white/10 bg-white/5 hover:bg-white/8") : index === 0 ? "border-indigo-200 bg-indigo-50/80" : "border-slate-200/80 bg-slate-50/80 hover:bg-white"}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{item.student}</p>
                  <span className={`text-xs ${mutedClass}`}>{item.time}</span>
                </div>
                <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.18em] ${accentClass}`}>{item.topic}</p>
                <p className={`mt-3 text-sm leading-6 ${mutedClass}`}>{item.question}</p>
              </button>
            ))}
          </div>
        </div>

        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Selected Doubt</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{selected.topic} clarification</h2>
          <p className={`mt-2 text-sm ${mutedClass}`}>
            {selected.student} asked: {selected.question}
          </p>

          <div className={`mt-5 rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
            <p className="text-sm font-semibold">AI Assistant Draft</p>
            <p className={`mt-3 text-sm leading-7 ${mutedClass}`}>Anti-Markovnikov addition depends on a radical pathway, and peroxide helps create that pathway. Without peroxide, the reaction usually follows the normal ionic addition route, so the more stable carbocation direction dominates instead.</p>
            <p className={`mt-3 text-sm leading-7 ${mutedClass}`}>A useful teaching follow-up is to compare the reaction mechanism step by step and ask the student which intermediate is formed in each case.</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className={`rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] ${isDarkTheme ? "bg-gradient-to-r from-indigo-500/85 via-violet-500/85 to-fuchsia-500/85" : "bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500"}`}>
              Generate AI Explanation
            </button>
            <button type="button" className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${isDarkTheme ? "border-white/10 bg-white/5 text-slate-100 hover:bg-white/8" : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"}`}>
              Send Reply
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

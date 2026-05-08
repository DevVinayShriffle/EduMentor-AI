import { useOutletContext } from "react-router-dom";

export default function StudentProfile() {
  const { isDarkTheme } = useOutletContext();
  const fields = [
    ["Full Name", "Aarav Sharma"],
    ["Phone", "+91 90000 00001"],
    ["Class Level", "Class 12"],
    ["Target Exam", "JEE Main + Advanced"],
    ["School", "EduMentor Senior Secondary"],
    ["Bio", "Focused on improving speed in physics numericals and keeping a steady weekly revision cycle."],
  ];
  const preferences = [
    { label: "Notifications", value: "Enabled" },
    { label: "Class Reminders", value: "30 mins before live class" },
    { label: "AI Study Support", value: "Enabled for doubt help" },
  ];
  const cardClass = isDarkTheme ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]" : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-cyan-300" : "text-sky-700";

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <div className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Profile</p>
          <div className="mt-5 flex items-center gap-4">
            <div className={`flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold ${isDarkTheme ? "bg-cyan-500/12 text-cyan-200" : "bg-sky-100 text-sky-700"}`}>AS</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Aarav Sharma</h1>
              <p className={`mt-1 text-sm ${mutedClass}`}>aarav.sharma@edumentor.ai</p>
              <p className={`mt-2 text-xs font-semibold uppercase tracking-[0.18em] ${accentClass}`}>Student</p>
            </div>
          </div>
        </div>

        <div className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Editable Details</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {fields.map(([label, value]) => (
              <label key={label} className={label === "Bio" ? "md:col-span-2" : ""}>
                <span className={`mb-2 block text-sm font-medium ${mutedClass}`}>{label}</span>
                {label === "Bio" ? <textarea value={value} readOnly rows={4} className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${isDarkTheme ? "border-white/10 bg-white/5 text-white" : "border-slate-200 bg-white text-slate-900"}`} /> : <input value={value} readOnly className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${isDarkTheme ? "border-white/10 bg-white/5 text-white" : "border-slate-200 bg-white text-slate-900"}`} />}
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className={`rounded-[28px] border p-5 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Preferences</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {preferences.map((item) => (
            <div key={item.label} className={`rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accentClass}`}>{item.label}</p>
              <p className={`mt-3 text-sm leading-6 ${mutedClass}`}>{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <button type="button" className={`rounded-2xl px-5 py-3 text-sm font-semibold text-white ${isDarkTheme ? "bg-gradient-to-r from-cyan-500/85 via-blue-500/85 to-indigo-500/85" : "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500"}`}>
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}

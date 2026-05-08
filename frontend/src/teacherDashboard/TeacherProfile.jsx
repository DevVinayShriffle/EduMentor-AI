import { useOutletContext } from "react-router-dom";

export default function TeacherProfile() {
  const { isDarkTheme } = useOutletContext();
  const fields = [
    ["Full Name", "Dr. Meera Sinha"],
    ["Phone", "+91 98765 43210"],
    ["Qualification", "M.Sc. Physics, B.Ed"],
    ["Subjects", "Physics, Science Aptitude"],
    ["Experience", "9 years"],
    ["Bio", "Focused on concept clarity, problem-solving speed, and structured revision systems."],
  ];
  const preferences = [
    { label: "Notifications", value: "Enabled" },
    { label: "Live Class Reminders", value: "15 mins before session" },
    { label: "AI Assistant Support", value: "Enabled for doubt drafting" },
  ];
  const cardClass = isDarkTheme
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]"
    : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-fuchsia-300" : "text-blue-700";

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <div className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Profile</p>
          <div className="mt-5 flex items-center gap-4">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold ${
                isDarkTheme ? "bg-fuchsia-500/12 text-fuchsia-200" : "bg-indigo-100 text-indigo-700"
              }`}
            >
              MS
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dr. Meera Sinha</h1>
              <p className={`mt-1 text-sm ${mutedClass}`}>meera.sinha@edumentor.ai</p>
              <p className={`mt-2 text-xs font-semibold uppercase tracking-[0.18em] ${accentClass}`}>
                Teacher
              </p>
            </div>
          </div>

          <div
            className={`mt-6 rounded-2xl border p-4 ${
              isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"
            }`}
          >
            <p className="text-sm font-semibold">Profile Snapshot</p>
            <p className={`mt-2 text-sm leading-7 ${mutedClass}`}>
              Strong live-class engagement, fast doubt resolution turnaround, and consistently above-target
              attendance across core science batches.
            </p>
          </div>
        </div>

        <div className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
            Editable Details
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {fields.map(([label, value]) => (
              <label key={label} className={label === "Bio" ? "md:col-span-2" : ""}>
                <span className={`mb-2 block text-sm font-medium ${mutedClass}`}>{label}</span>
                {label === "Bio" ? (
                  <textarea
                    value={value}
                    readOnly
                    rows={4}
                    className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
                      isDarkTheme
                        ? "border-white/10 bg-white/5 text-white"
                        : "border-slate-200 bg-white text-slate-900"
                    }`}
                  />
                ) : (
                  <input
                    value={value}
                    readOnly
                    className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
                      isDarkTheme
                        ? "border-white/10 bg-white/5 text-white"
                        : "border-slate-200 bg-white text-slate-900"
                    }`}
                  />
                )}
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className={`rounded-[28px] border p-5 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
          Preferences
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {preferences.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border p-4 ${
                isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accentClass}`}>{item.label}</p>
              <p className={`mt-3 text-sm leading-6 ${mutedClass}`}>{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <button
            type="button"
            className={`rounded-2xl px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] ${
              isDarkTheme
                ? "bg-gradient-to-r from-indigo-500/85 via-violet-500/85 to-fuchsia-500/85"
                : "bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500"
            }`}
          >
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}

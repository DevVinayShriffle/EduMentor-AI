import { useOutletContext } from "react-router-dom";

export default function TeacherHome() {
  const { isDarkTheme } = useOutletContext();

  return (
    <div
      className={`rounded-[32px] border p-6 md:p-8 ${
        isDarkTheme
          ? "border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.72),rgba(30,41,59,0.66))] text-slate-100 shadow-[0_30px_80px_rgba(2,6,23,0.38)]"
          : "border-white/75 bg-white/88 text-slate-900 shadow-[0_24px_70px_rgba(37,99,235,0.08)]"
      }`}
    >
      <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isDarkTheme ? "text-fuchsia-300" : "text-blue-700"}`}>
        Teacher Route
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">Teacher Home</h1>
      <p className={`mt-3 max-w-2xl text-sm leading-7 ${isDarkTheme ? "text-slate-300" : "text-slate-600"}`}>
        Phase 2 establishes the routed teacher workspace shell. This page now renders inside the
        dedicated teacher layout and receives theme state from the parent outlet context.
      </p>
    </div>
  );
}

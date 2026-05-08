import { useOutletContext } from "react-router-dom";

export default function StudentLiveClasses() {
  const { isDarkTheme } = useOutletContext();

  return (
    <div
      className={`rounded-[32px] border p-6 md:p-8 ${
        isDarkTheme
          ? "border-white/10 bg-slate-900/70 text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]"
          : "border-white/75 bg-white/90 text-slate-900 shadow-[0_24px_70px_rgba(37,99,235,0.08)]"
      }`}
    >
      <h1 className="text-3xl font-bold tracking-tight">Student Live Classes</h1>
      <p className={`mt-3 text-sm leading-7 ${isDarkTheme ? "text-slate-300" : "text-slate-600"}`}>
        The live classes page is connected to the new student shell and theme context.
      </p>
    </div>
  );
}

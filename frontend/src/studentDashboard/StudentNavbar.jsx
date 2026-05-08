import { Menu } from "lucide-react";

export default function StudentNavbar({ user, isDarkTheme, onThemeToggle, onMenuToggle, onLogout }) {
  const userLabel = user?.name || user?.email?.split("@")[0] || "Student";

  return (
    <header className={`sticky top-0 z-30 border-b backdrop-blur-xl transition-colors duration-500 ${isDarkTheme ? "border-white/10 bg-slate-950/50 shadow-[0_20px_50px_rgba(2,6,23,0.38)]" : "border-slate-200/80 bg-white/85 shadow-[0_12px_36px_rgba(15,23,42,0.06)]"}`}>
      <style>{`
        .student-theme-switch {
          font-size: 17px;
          position: relative;
          display: inline-block;
          width: 3.5em;
          height: 2em;
        }

        .student-theme-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .student-theme-switch .slider {
          --background: #14532d;
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: var(--background);
          transition: 0.5s;
          border-radius: 30px;
        }

        .student-theme-switch .slider:before {
          position: absolute;
          content: "";
          height: 1.4em;
          width: 1.4em;
          border-radius: 50%;
          left: 10%;
          bottom: 15%;
          box-shadow: inset 8px -4px 0 0 #fde047;
          background: var(--background);
          transition: 0.5s;
        }

        .student-theme-switch input:checked + .slider {
          background-color: #2563eb;
        }

        .student-theme-switch input:checked + .slider:before {
          transform: translateX(100%);
          box-shadow: inset 15px -4px 0 15px #fde047;
        }
      `}</style>

      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onMenuToggle} className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border shadow-sm transition lg:hidden ${isDarkTheme ? "border-white/12 bg-white/8 text-slate-200 hover:border-cyan-400/50 hover:text-white" : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"}`} aria-label="Open student navigation">
            <Menu size={18} />
          </button>

          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isDarkTheme ? "text-cyan-300" : "text-sky-700"}`}>Student Workspace</p>
            <h1 className={`mt-1 text-lg font-semibold tracking-tight sm:text-xl ${isDarkTheme ? "text-slate-50" : "text-slate-950"}`}>Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="student-theme-switch shrink-0" aria-label="Toggle student dashboard theme">
            <input type="checkbox" checked={isDarkTheme} onChange={onThemeToggle} />
            <span className="slider" />
          </label>

          <div className={`hidden rounded-2xl border px-4 py-2 text-right shadow-sm sm:block ${isDarkTheme ? "border-white/12 bg-white/8" : "border-slate-200 bg-white"}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>Learner</p>
            <p className={`mt-1 text-sm font-semibold ${isDarkTheme ? "text-slate-100" : "text-slate-900"}`}>{userLabel}</p>
          </div>

          <button type="button" onClick={onLogout} className={`rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.01] ${isDarkTheme ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_18px_50px_rgba(6,182,212,0.22)]" : "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 shadow-[0_18px_40px_rgba(37,99,235,0.2)]"}`}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

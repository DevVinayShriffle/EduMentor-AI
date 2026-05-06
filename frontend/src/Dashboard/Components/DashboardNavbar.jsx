import { Menu } from "lucide-react";

export default function DashboardNavbar({
  user,
  roleLabel,
  onMenuToggle,
  onBackToSite,
  onLogout,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <style>{`
        .dashboard-theme-switch {
          font-size: 17px;
          position: relative;
          display: inline-block;
          width: 3.5em;
          height: 2em;
        }

        .dashboard-theme-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .dashboard-theme-switch .slider {
          --background: #28096b;
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: var(--background);
          transition: 0.5s;
          border-radius: 30px;
        }

        .dashboard-theme-switch .slider:before {
          position: absolute;
          content: "";
          height: 1.4em;
          width: 1.4em;
          border-radius: 50%;
          left: 10%;
          bottom: 15%;
          box-shadow: inset 8px -4px 0 0 #fff000;
          background: var(--background);
          transition: 0.5s;
        }

        .dashboard-theme-switch input:checked + .slider {
          background-color: #522ba7;
        }

        .dashboard-theme-switch input:checked + .slider:before {
          transform: translateX(100%);
          box-shadow: inset 15px -4px 0 15px #fff000;
        }
      `}</style>

      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 lg:hidden"
            aria-label="Open dashboard navigation"
          >
            <Menu size={18} />
          </button>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
              {roleLabel} Workspace
            </p>
            <h1 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
              Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="dashboard-theme-switch shrink-0" aria-label="Toggle dashboard theme preview">
            <input type="checkbox" />
            <span className="slider" />
          </label>

          <div className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2 text-right shadow-sm sm:block">
            <p className="mt-1 text-sm font-semibold text-slate-900">{user?.email.split('@')[0]}</p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(79,70,229,0.22)] transition hover:scale-[1.01]"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

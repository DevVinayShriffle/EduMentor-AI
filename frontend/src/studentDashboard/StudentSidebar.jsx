import {
  BarChart3,
  BookOpen,
  Bot,
  CalendarDays,
  CreditCard,
  Home,
  LogOut,
  User,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logoImage from "../assets/images/edumentor-logo-no-bg.png";

const sidebarItems = [
  { label: "Dashboard", icon: Home, to: "/student", end: true },
  { label: "Learn", icon: BookOpen, to: "/student/learn" },
  { label: "Live Classes", icon: CalendarDays, to: "/student/live-classes" },
  { label: "AI Tutor", icon: Bot, to: "/student/ai-tutor" },
  { label: "Tests", icon: BookOpen, to: "/student/tests" },
  { label: "Performance", icon: BarChart3, to: "/student/performance" },
  { label: "Payments", icon: CreditCard, to: "/student/payments" },
  { label: "Profile", icon: User, to: "/student/profile" },
];

export default function StudentSidebar({
  isOpen,
  isDarkTheme,
  onBackToSite,
  onClose,
  onLogout,
}) {
  const getNavItemClassName = (isActive) =>
    `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${
      isActive
        ? isDarkTheme
          ? "bg-white/12 text-white shadow-inner shadow-cyan-500/10 ring-1 ring-cyan-400/25"
          : "bg-sky-100 text-sky-950 shadow-inner shadow-sky-200/60"
        : isDarkTheme
          ? "text-slate-300 hover:bg-white/8 hover:text-white"
          : "text-slate-600 hover:bg-white/75 hover:text-slate-950"
    }`;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          isDarkTheme
            ? "bg-slate-950/45 backdrop-blur-md"
            : "bg-slate-950/20 backdrop-blur-sm"
        } ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-[18.5rem] flex-col border-r transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isDarkTheme
            ? "border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.24),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_24%),linear-gradient(180deg,_rgba(7,10,24,0.98)_0%,_rgba(10,18,33,0.98)_48%,_rgba(17,24,39,0.98)_100%)] text-slate-100 shadow-[0_24px_80px_rgba(2,6,23,0.45)]"
            : "border-slate-200/80 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_28%),linear-gradient(180deg,rgba(248,250,252,0.98)_0%,rgba(240,249,255,0.98)_100%)] text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
        }`}
      >
        <div className="px-5 py-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToSite}
              className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl text-left transition hover:opacity-90"
              aria-label="Go to landing page"
              title="Back to landing page"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${
                  isDarkTheme
                    ? "bg-white shadow-[0_0_22px_rgba(255,255,255,0.72),0_0_50px_rgba(56,189,248,0.35),0_14px_38px_rgba(15,23,42,0.45)]"
                    : ""
                }`}
              >
                <img
                  src={logoImage}
                  alt="EduMentor AI logo"
                  className="h-10 w-auto"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`text-lg font-semibold tracking-tight ${
                    isDarkTheme ? "text-slate-50" : "text-slate-950"
                  }`}
                >
                  EduMentor AI
                </p>
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                    isDarkTheme ? "text-cyan-300" : "text-sky-600"
                  }`}
                >
                  Student Panel
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border shadow-sm transition lg:hidden ${
                isDarkTheme
                  ? "border-white/12 bg-white/8 text-slate-300 hover:border-cyan-400/50 hover:text-white"
                  : "border-slate-200 bg-white text-slate-500 hover:border-sky-300 hover:text-sky-700"
              }`}
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <nav className="mt-6 space-y-2">
            {sidebarItems.map(({ label, icon: Icon, to, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) => getNavItemClassName(isActive)}
              >
                <Icon size={18} className="shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div
            className={`mt-8 rounded-[28px] border px-4 py-4 ${
              isDarkTheme ? "border-white/10 bg-white/5" : "border-white/70 bg-white/80"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                isDarkTheme ? "text-cyan-200" : "text-sky-700"
              }`}
            >
              Quick Actions
            </p>
            <button
              type="button"
              onClick={onLogout}
              className={`mt-4 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                isDarkTheme
                  ? "bg-white/8 text-slate-200 hover:bg-white/12 hover:text-white"
                  : "bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <LogOut size={18} className="shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

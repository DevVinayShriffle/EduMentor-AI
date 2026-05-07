import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  CreditCard,
  X,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  MessageSquareText,
  MonitorPlay,
  Settings2,
  UserRound,
  Users,
} from "lucide-react";
import logoImage from "../../assets/images/edumentor-logo-no-bg.png";

const sectionIcons = {
  dashboard: LayoutDashboard,
  learn: GraduationCap,
  "live-classes": MonitorPlay,
  "ai-tutor": Bot,
  tests: ClipboardList,
  performance: BarChart3,
  payments: CreditCard,
  profile: UserRound,
  teaching: GraduationCap,
  content: FolderKanban,
  assessments: ClipboardList,
  students: Users,
  reports: BarChart3,
  chat: MessageSquareText,
  users: Users,
  courses: GraduationCap,
  "ai-monitor": BrainCircuit,
  analytics: BarChart3,
  settings: Settings2,
};

export default function DashbaordSidebar({
  isOpen,
  sections,
  roleLabel,
  activeItemId,
  isDesktopCollapsed,
  isDarkTheme,
  onBackToSite,
  onItemSelect,
  onDesktopExpand,
  onDesktopCollapse,
  onClose,
}) {
  const defaultOpenSections = useMemo(() => {
    const matchingSection = sections.find((section) =>
      section.itemId === activeItemId ||
      section.items.some((item) => item.id === activeItemId)
    );

    return matchingSection ? [matchingSection.id] : [sections[0]?.id].filter(Boolean);
  }, [activeItemId, sections]);

  const [openSections, setOpenSections] = useState(defaultOpenSections);

  useEffect(() => {
    setOpenSections((current) => {
      const matchingSection = sections.find((section) =>
        section.itemId === activeItemId ||
        section.items.some((item) => item.id === activeItemId)
      );

      if (!matchingSection) {
        return current.length ? current : defaultOpenSections;
      }

      return current.includes(matchingSection.id) ? current : [matchingSection.id];
    });
  }, [activeItemId, defaultOpenSections, sections]);

  const toggleSection = (sectionId) => {
    setOpenSections((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [sectionId]
    );
  };

  const handleBrandClick = () => {
    onClose?.();
    onBackToSite?.();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${isDarkTheme
          ? "bg-slate-950/45 backdrop-blur-md"
          : "bg-slate-950/20 backdrop-blur-sm"
          } ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-[18.5rem] flex-col border-r text-slate-900 transition-[width,transform,background-color,border-color] duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } ${isDesktopCollapsed ? "lg:w-[5.5rem]" : "lg:w-[18.5rem]"} ${isDarkTheme
            ? "border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.28),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(236,72,153,0.18),_transparent_24%),linear-gradient(180deg,_rgba(7,10,24,0.98)_0%,_rgba(12,18,35,0.98)_48%,_rgba(17,24,39,0.98)_100%)] text-slate-100 shadow-[0_24px_80px_rgba(2,6,23,0.45)]"
            : "border-slate-200/80 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_28%),linear-gradient(180deg,rgba(248,250,252,0.98)_0%,rgba(238,242,255,0.98)_100%)] text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
          }`}
      >
        <div className={`px-5 py-5 ${isDesktopCollapsed ? "lg:px-4" : ""}`}>
          <div
            className={`flex items-center gap-3 ${isDesktopCollapsed ? "lg:justify-center" : ""
              }`}
          >
            <button
              type="button"
              onClick={handleBrandClick}
              className={`flex min-w-0 items-center gap-3 rounded-2xl text-left transition hover:opacity-90 ${
                isDesktopCollapsed ? "lg:justify-center" : "flex-1"
              }`}
              aria-label="Go to landing page"
              title="Back to landing page"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${
                  isDarkTheme
                    ? "bg-white shadow-[0_0_22px_rgba(255,255,255,0.75),0_0_50px_rgba(129,140,248,0.55),0_14px_38px_rgba(15,23,42,0.45)]"
                    : ""
                }`}
              >
                <img
                  src={logoImage}
                  alt="EduMentor AI logo"
                  className="h-10 w-auto"
                />
              </div>

              <div className={`min-w-0 flex-1 ${isDesktopCollapsed ? "lg:hidden" : ""}`}>
                <p
                  className={`text-lg font-semibold tracking-tight ${
                    isDarkTheme ? "text-slate-50" : "text-slate-950"
                  }`}
                >
                  EduMentor AI
                </p>

                <p
                  className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                    isDarkTheme ? "text-fuchsia-300" : "text-indigo-600"
                  }`}
                >
                  {roleLabel} Panel
                </p>
              </div>
            </button>

            {!isDesktopCollapsed ? (
              <button
                type="button"
                onClick={onDesktopCollapse}
                className={`hidden h-9 w-9 items-center justify-center rounded-xl border shadow-sm transition lg:inline-flex ${isDarkTheme
                  ? "border-white/12 bg-white/8 text-slate-300 hover:border-fuchsia-400/50 hover:text-white"
                  : "border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-700"
                  }`}
                aria-label="Collapse sidebar"
              >
                <X size={16} />
              </button>
            ) : null}
          </div>
        </div>

        <style>
          {`
            .dashboard-sidebar-scroll {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }

            .dashboard-sidebar-scroll::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <div className={`dashboard-sidebar-scroll flex-1 overflow-y-auto px-4 py-5 ${isDesktopCollapsed ? "lg:px-3" : ""}`}>
          <nav className="space-y-5">
            {sections.map((section) => {
              const SectionIcon = sectionIcons[section.id] || LayoutDashboard;
              const isOpenSection = openSections.includes(section.id);
              const isDirectSection = Boolean(section.itemId);
              const hasActiveItem =
                section.itemId === activeItemId ||
                section.items.some((item) => item.id === activeItemId);

              return (
                <div key={section.id}>
                  {isDirectSection ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (isDesktopCollapsed) {
                          onDesktopExpand();
                        }

                        onItemSelect(section.itemId);
                      }}
                      title={section.label}
                      className={`flex w-full items-center rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition ${hasActiveItem
                        ? isDarkTheme
                          ? "bg-white/12 text-white shadow-inner shadow-fuchsia-500/10 ring-1 ring-fuchsia-400/25"
                          : "bg-indigo-100 text-indigo-950 shadow-inner shadow-indigo-200/60"
                        : isDarkTheme
                          ? "text-slate-300 hover:bg-white/8 hover:text-white"
                          : "text-slate-600 hover:bg-white/75 hover:text-slate-950"
                        } ${isDesktopCollapsed
                          ? "justify-between lg:justify-center lg:px-0"
                          : "justify-between"
                        }`}
                    >
                      <span
                        className={`flex items-center gap-3 ${isDesktopCollapsed ? "lg:justify-center" : ""
                          }`}
                      >
                        <SectionIcon size={18} className="shrink-0" />
                        <span className={isDesktopCollapsed ? "lg:hidden" : ""}>
                          {section.label}
                        </span>
                      </span>

                      {hasActiveItem ? (
                        <span
                          className={`h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.16)] ${isDesktopCollapsed ? "lg:hidden" : ""
                            }`}
                        />
                      ) : null}
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          if (isDesktopCollapsed) {
                            setOpenSections([section.id]);
                            onDesktopExpand();
                            return;
                          }

                          toggleSection(section.id);
                        }}
                        title={section.label}
                        className={`flex w-full items-center rounded-2xl px-3 py-2 text-left transition ${hasActiveItem
                          ? isDarkTheme
                            ? "bg-white/10 shadow-sm ring-1 ring-white/8"
                            : "bg-white/75 shadow-sm"
                          : isDarkTheme
                            ? "hover:bg-white/6"
                            : "hover:bg-white/65"
                          } ${isDesktopCollapsed
                            ? "justify-between lg:justify-center lg:px-0"
                            : "justify-between"
                          }`}
                      >
                        <span
                          className={`flex items-center gap-3 ${isDesktopCollapsed ? "lg:justify-center" : ""
                            }`}
                        >
                          <SectionIcon
                            size={18}
                            className={`shrink-0 ${isDarkTheme ? "text-slate-400" : "text-slate-500"
                              }`}
                          />
                          <span
                            className={`text-[11px] font-bold uppercase tracking-[0.24em] ${isDarkTheme ? "text-slate-400" : "text-slate-500"
                              } ${isDesktopCollapsed ? "lg:hidden" : ""
                              }`}
                          >
                            {section.label}
                          </span>
                        </span>

                        {isOpenSection ? (
                          <ChevronDown
                            size={14}
                            className={`${isDarkTheme ? "text-slate-500" : "text-slate-400"
                              } ${isDesktopCollapsed ? "lg:hidden" : ""}`}
                          />
                        ) : (
                          <ChevronRight
                            size={14}
                            className={`${isDarkTheme ? "text-slate-500" : "text-slate-400"
                              } ${isDesktopCollapsed ? "lg:hidden" : ""}`}
                          />
                        )}
                      </button>

                      {isOpenSection && !isDesktopCollapsed ? (
                        <div className="mt-2 space-y-1 pl-7">
                          {section.items.map((item) => {
                            const isActive = activeItemId === item.id;

                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => onItemSelect(item.id)}
                                className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition ${isActive
                                  ? isDarkTheme
                                    ? "bg-white/12 text-white shadow-inner shadow-fuchsia-500/10 ring-1 ring-fuchsia-400/20"
                                    : "bg-indigo-100 text-indigo-950 shadow-inner shadow-indigo-200/60"
                                  : isDarkTheme
                                    ? "text-slate-300 hover:bg-white/8 hover:text-white"
                                    : "text-slate-600 hover:bg-white/75 hover:text-slate-950"
                                  }`}
                              >
                                <span>{item.label}</span>

                                {isActive ? (
                                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.16)]" />
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

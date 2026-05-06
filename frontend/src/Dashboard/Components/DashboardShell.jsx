import { useMemo, useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashbaordSidebar from "./DashbaordSidebar";

export default function DashboardShell({
  user,
  roleConfig,
  activeItemId,
  onItemSelect,
  onBackToSite,
  onLogout,
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  const activeLabel = useMemo(() => {
    for (const section of roleConfig.navigation) {
      if (section.itemId === activeItemId) {
        return section.label;
      }

      const match = section.items.find((item) => item.id === activeItemId);
      if (match) return match.label;
    }

    return "Overview";
  }, [activeItemId, roleConfig.navigation]);

  const handleItemSelect = (itemId) => {
    onItemSelect(itemId);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.14),_transparent_24%),linear-gradient(180deg,_#f7faff_0%,_#eef4ff_100%)]">
      <DashbaordSidebar
        isOpen={isSidebarOpen}
        sections={roleConfig.navigation}
        roleLabel={roleConfig.label}
        activeItemId={activeItemId}
        isDesktopCollapsed={isDesktopSidebarCollapsed}
        onItemSelect={handleItemSelect}
        onDesktopExpand={() => setIsDesktopSidebarCollapsed(false)}
        onDesktopCollapse={() => setIsDesktopSidebarCollapsed(true)}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className={isDesktopSidebarCollapsed ? "lg:pl-[5.5rem]" : "lg:pl-[18.5rem]"}>
        <DashboardNavbar
          user={user}
          roleLabel={roleConfig.label}
          onMenuToggle={() => setIsSidebarOpen(true)}
          onBackToSite={onBackToSite}
          onLogout={onLogout}
        />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Current Section
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {activeLabel}
            </h2>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}

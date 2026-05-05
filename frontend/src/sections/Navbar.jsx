import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({
  isAuthenticated,
  onLoginClick,
  onDashboardClick,
  onLogoutClick,
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleNavClick = (path) => {
    setActive(path);
    setOpen(false);
  };

  return (
    <header
      className="w-full sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        background: "rgba(11, 11, 13, 0.18)",
        borderColor: "rgba(15, 23, 42, 0.10)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 6px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2">

        {/* Logo */}
        <a
          href="#home"
          onClick={() => handleNavClick("#home")}
          className="text-lg sm:text-xl font-semibold tracking-tight cursor-pointer"
          style={{ color: "var(--text-primary)" }}
        >
          EduMentor<span style={{ color: "var(--accent-primary)" }}>AI</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={() => handleNavClick(link.path)}
              className="relative pb-1 transition-colors"
              style={{
                color:
                  active === link.path
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
              }}
            >
              {link.name}

              {/* Softer gradient underline */}
              <span
                className={`
                  absolute left-0 -bottom-0.5 h-[2px] w-full
                  bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500
                  transform origin-left transition-transform duration-300
                  ${active === link.path ? "scale-x-100" : "scale-x-0"}
                `}
              />
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              <button
                type="button"
                onClick={onDashboardClick}
                className="hidden md:block text-xs sm:text-sm px-3 py-1.5 rounded-md transition-all hover:scale-[1.03]"
                style={{
                  border: "1px solid rgba(255,255,255,0.16)",
                  color: "#fff",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={onLogoutClick}
                className="hidden md:block text-xs sm:text-sm px-3 py-1.5 rounded-md transition-all hover:scale-[1.03]"
                style={{
                  background: "linear-gradient(90deg, #3b82f6, #6366f1)",
                  color: "#fff",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onLoginClick}
              className="hidden md:block text-xs sm:text-sm px-3 py-1.5 rounded-md transition-all hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(90deg, #3b82f6, #6366f1)",
                color: "#fff",
              }}
            >
              Login
            </button>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={20} style={{ color: "var(--text-primary)" }} />
            ) : (
              <Menu size={20} style={{ color: "var(--text-primary)" }} />
            )}
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          background: "rgba(15, 23, 42, 0.25)",
          backdropFilter: "blur(6px)",
        }}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(255,255,255,0.95)",
          borderLeft: "1px solid var(--border-soft)",
        }}
      >
        <div className="flex flex-col p-6 gap-5 text-sm">

          {links.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={() => {
                handleNavClick(link.path);
              }}
              style={{
                color:
                  active === link.path
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
              }}
              className="transition-colors"
            >
              {link.name}
            </a>
          ))}

          {isAuthenticated ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onDashboardClick();
                }}
                className="mt-4 text-sm px-3 py-2 rounded-md"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.16)",
                }}
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onLogoutClick();
                }}
                className="text-sm px-3 py-2 rounded-md"
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #6366f1)",
                  color: "white",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onLoginClick();
              }}
              className="mt-4 text-sm px-3 py-2 rounded-md"
              style={{
                background:
                  "linear-gradient(90deg, #3b82f6, #6366f1)",
                color: "white",
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

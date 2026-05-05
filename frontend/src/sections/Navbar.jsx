import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(window.location.hash || "#home");
  const [isPinned, setIsPinned] = useState(false);

  const links = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Courses", path: "#courses" },
    { name: "Contact", path: "#contact" }
  ];

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.path.replace("#", "")))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActive(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleHashChange = () => {
      setActive(window.location.hash || "#home");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsPinned(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  const handleNavClick = (path) => {
    setActive(path);
    setOpen(false);
  };

  const closeMobileMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed left-0 z-[100] w-full border-b backdrop-blur-md transition-[top,box-shadow,background-color] duration-300 ${
          isPinned ? "top-0" : "top-[29px]"
        }`}
        style={{
          background: isPinned
            ? "rgba(255, 255, 255, 0.82)"
            : "rgba(255, 255, 255, 0.58)",
          borderColor: isPinned
            ? "rgba(148, 163, 184, 0.28)"
            : "rgba(255, 255, 255, 0.22)",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          boxShadow: isPinned
            ? "0 10px 34px rgba(15, 23, 42, 0.16)"
            : "0 6px 24px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="cursor-pointer whitespace-nowrap text-lg font-semibold tracking-tight sm:text-xl"
            style={{ color: "#0f172a" }}
          >
            EduMentor<span style={{ color: "var(--accent-primary)" }}>AI</span>
          </a>

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
                      ? "#0f172a"
                      : "#475569",
                }}
              >
                {link.name}

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

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#about"
              onClick={() => handleNavClick("#about")}
              className="hidden md:block text-xs sm:text-sm px-3 py-1.5 rounded-md transition-all hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(90deg, #3b82f6, #6366f1)",
                color: "#fff",
              }}
            >
              Explore
            </a>

            <button
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              className="rounded-md p-2 transition-colors md:hidden"
              style={{ color: "#0f172a" }}
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed left-0 top-0 z-[105] h-dvh w-[min(22rem,78vw)] md:hidden transition-all duration-300 ${
          open
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(15, 23, 42, 0.28)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        onClick={closeMobileMenu}
        onWheel={closeMobileMenu}
        onTouchMove={closeMobileMenu}
      />

      <div
        className={`fixed right-0 top-0 z-[110] h-dvh w-[min(22rem,78vw)] overflow-y-auto border-l shadow-2xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(255,255,255,1)",
          borderColor: "var(--border-soft)",
        }}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <a
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="cursor-pointer whitespace-nowrap text-base font-semibold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            EduMentor<span style={{ color: "var(--accent-primary)" }}>AI</span>
          </a>

          <button
            type="button"
            aria-label="Close navigation menu"
            className="rounded-md p-2 transition-colors"
            style={{ color: "#0f172a" }}
            onClick={closeMobileMenu}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-3 px-4 py-6 text-base">
          {links.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={() => handleNavClick(link.path)}
              className="rounded-xl px-4 py-3 transition-colors"
              style={{
                color:
                  active === link.path
                    ? "#0f172a"
                    : "#475569",
                background:
                  active === link.path ? "rgba(99, 102, 241, 0.10)" : "transparent",
              }}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#about"
            onClick={() => handleNavClick("#about")}
            className="mt-4 rounded-xl px-4 py-3 text-center text-sm"
            style={{
              background:
                "linear-gradient(90deg, #3b82f6, #6366f1)",
              color: "white",
            }}
          >
            Explore
          </a>
        </div>
      </div>
    </>
  );
}

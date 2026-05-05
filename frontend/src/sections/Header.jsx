import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

const Header = () => {
  const [language, setLanguage] = useState("EN");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCollapsed(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="
        fixed top-0 left-0 z-[60] w-full
        flex justify-end items-center sm:px-6 
        py-0.5
        border-b
        transition-transform duration-300
      "
      style={{
        borderColor: "var(--border-soft)",
        background: "rgba(255,255,255,0.86)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transform: isCollapsed ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <Globe size={14} style={{ color: "var(--accent-primary)" }} />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="
            bg-black 
            text-white
            text-xs 
            outline-none 
            cursor-pointer
            px-2
            py-1
            rounded-xl
          "
        >
          <option value="EN">EN</option>
          <option value="HI">हिंदी</option>
        </select>
      </div>
    </header>
  );
};

export default Header;

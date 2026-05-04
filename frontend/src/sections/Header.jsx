import { useState } from "react";
import { Globe } from "lucide-react";

const Header = () => {
  const [language, setLanguage] = useState("EN");

  return (
    <header
      className="
        w-full 
        flex justify-end items-center sm:px-6 
        py-0.5
        border-b
      "
      style={{
        borderColor: "var(--border-soft)",
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
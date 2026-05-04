import { useState } from "react";
import { Globe } from "lucide-react";

const Header = () => {
  const [language, setLanguage] = useState("English");

  return (
    <header className="w-full bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0f172a] px-4 sm:px-8 py-2 flex items-center justify-end border-b border-white/10">

      {/* Language Selector */}
      <div className="flex items-center gap-2 sm:gap-3 bg-white/5 px-2 sm:px-3 py-1 rounded-full backdrop-blur-md border border-white/10">

        <Globe size={16} className="text-blue-400 shrink-0" />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="
            bg-transparent text-gray-200 text-xs sm:text-sm 
            outline-none cursor-pointer
          "
        >
          <option className="text-black" value="English">English</option>
          <option className="text-black" value="Hindi">हिंदी</option>
        </select>

      </div>
    </header>
  );
};

export default Header;
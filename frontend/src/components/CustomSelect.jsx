import { Check, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  buttonClassName = "",
  menuClassName = "",
  optionClassName = "",
  selectedOptionClassName = "",
  iconClassName = "",
}) {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (nextValue) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm outline-none transition ${buttonClassName} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <span className={selectedOption ? "" : "opacity-70"}>{selectedOption?.label || placeholder}</span>
        <ChevronDown size={18} className={`shrink-0 transition ${isOpen ? "rotate-180" : ""} ${iconClassName}`} />
      </button>

      {isOpen ? (
        <div className={`absolute left-0 top-[calc(100%+0.6rem)] z-50 max-h-72 w-full overflow-y-auto rounded-2xl border p-2 shadow-[0_20px_60px_rgba(15,23,42,0.2)] ${menuClassName}`}>
          <div role="listbox" className="space-y-1">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={`flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${optionClassName} ${isSelected ? selectedOptionClassName : ""}`}
                >
                  <span>{option.label}</span>
                  {isSelected ? <Check size={16} className="shrink-0" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

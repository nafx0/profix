"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  required = false,
  placeholder = "Select an option",
  error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`form-group relative ${isOpen ? "z-50" : "z-0"}`} ref={containerRef}>
      <label className="form-label block mb-2 text-sm font-medium text-white/60">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full flex items-center justify-between px-4 py-3.5 bg-white/5 border rounded-xl text-left transition-all duration-200 ${
          isOpen
            ? "border-white/40 shadow-[0_0_0_4px_rgba(255,255,255,0.05)]"
            : "border-white/10 hover:border-white/20 hover:bg-white/10"
        } ${error ? "border-red-500/50" : ""}`}
      >
        <span className={`block truncate ${!selectedOption?.value ? "text-white/40" : "text-white/90"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <svg
            className={`h-4 w-4 text-white/50 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-auto focus:outline-none py-1"
          >
            {options
             .filter(opt => opt.value !== "") // Filter out the placeholder option if it exists in the list
             .map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`cursor-pointer select-none relative py-3 pl-4 pr-9 text-sm transition-colors ${
                  value === option.value
                    ? "bg-white text-black font-medium"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="block truncate">{option.label}</span>
                {value === option.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-black">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ))}
            {options.length === 0 && (
                 <div className="py-3 px-4 text-sm text-white/40">No options available</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

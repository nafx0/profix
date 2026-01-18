"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minDate?: string;
  error?: string;
}

export default function CustomDatePicker({
  label,
  value,
  onChange,
  required = false,
  minDate,
  error,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for the calendar view (current month/year being displayed)
  const [viewDate, setViewDate] = useState(() => {
    return value ? new Date(value) : new Date();
  });

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

  // Update view when value changes externally
  useEffect(() => {
    if (value) {
      setViewDate(new Date(value));
    }
  }, [value]);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    // Adjust for timezone offset to ensure string is correct YYYY-MM-DD
    // Actually, simple way:
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    const dateString = `${year}-${month}-${d}`;
    
    onChange(dateString);
    setIsOpen(false);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Generate calendar grid
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const totalDays = daysInMonth(year, month);
  const startDay = startDayOfMonth(year, month);
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: startDay }, (_, i) => i);

  // Min date logic
  const isDateDisabled = (day: number) => {
    if (!minDate) return false;
    const current = new Date(year, month, day);
    const min = new Date(minDate);
    // Reset hours for comparison
    current.setHours(0,0,0,0);
    min.setHours(0,0,0,0);
    return current < min;
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
        <span className={`block truncate ${!value ? "text-white/40" : "text-white/90"}`}>
          {value ? formatDate(value) : "Select Date"}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <svg className="h-4 w-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
            className="absolute z-50 w-full mt-2 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl p-4 min-w-[300px]"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                 type="button"
                 onClick={handlePrevMonth}
                 className="p-1 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-white font-medium select-none">
                {viewDate.toLocaleString("default", { month: "long", year: "numeric" })}
              </h3>
              <button
                 type="button"
                 onClick={handleNextMonth}
                 className="p-1 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-2 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="text-xs font-medium text-white/40 py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {blanksArray.map((_, i) => (
                <div key={`blank-${i}`} />
              ))}
              {daysArray.map((day) => {
                const isDisabled = isDateDisabled(day);
                const isSelected =
                  value &&
                  new Date(value).getDate() === day &&
                  new Date(value).getMonth() === month &&
                  new Date(value).getFullYear() === year;

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleDayClick(day)}
                    className={`
                      h-8 w-8 rounded-lg flex items-center justify-center text-sm transition-all
                      ${isSelected ? "bg-white text-black font-bold shadow-lg scale-105" : ""}
                      ${!isSelected && !isDisabled ? "text-white/80 hover:bg-white/10 hover:text-white" : ""}
                      ${isDisabled ? "text-white/20 cursor-not-allowed" : ""}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

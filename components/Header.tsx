"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { languages, Language } from "@/lib/i18n";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language)!;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-[#00b0f0] tracking-tight">CIBIL</span>
            <div className="flex flex-col leading-none ml-1">
              <span className="text-[9px] text-gray-500 font-medium">Part of TransUnion</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Login */}
            <button className="border border-gray-700 rounded-full px-5 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors hidden sm:block">
              {t("login")}
            </button>

            {/* Font size / script switcher (decorative, matching screenshot) */}
            <div className="hidden sm:flex items-center gap-1 text-gray-600 font-semibold">
              <span className="text-xs cursor-pointer hover:text-[#00b0f0]">A</span>
              <span className="text-sm cursor-pointer hover:text-[#00b0f0]">अ</span>
              <span className="text-base cursor-pointer hover:text-[#00b0f0]">A</span>
              <span className="text-lg cursor-pointer hover:text-[#00b0f0]">ए</span>
            </div>

            {/* Language dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                <span>{currentLang.label}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between ${
                        language === lang.code ? "text-[#00b0f0] font-semibold bg-blue-50" : "text-gray-700"
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-gray-400 text-xs">{lang.nativeLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile login */}
            <button className="border border-gray-700 rounded-full px-4 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors sm:hidden">
              {t("login")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

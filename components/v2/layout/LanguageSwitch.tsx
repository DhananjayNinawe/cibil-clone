"use client";

import { useEffect, useRef, useState } from "react";
import { languages, type Language } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { ChevronDownIcon, IndiaFlagIcon } from "@/components/icons";

/**
 * Language menu.
 *
 * V1 portals its panel to <body> because the header clips it; V2's header does not clip
 * (no `overflow-hidden` on the strip), so the panel can be a plain absolutely-positioned
 * child — which keeps it inside the nav's own stacking and focus order.
 */
export default function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, tv } = useV2();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = languages.find((l) => l.code === language)!;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={tv("v2LanguageLabel")}
        onClick={() => setOpen((prev) => !prev)}
        className="v2-focus flex items-center gap-2 rounded-full border border-[var(--v2-line)] px-3 py-2 text-xs font-bold tracking-wide text-[var(--v2-text-2)] transition-colors duration-300 hover:border-[rgba(0,176,240,0.45)] hover:text-[var(--v2-text)]"
      >
        <IndiaFlagIcon className="h-3 w-4.5" />
        <span>{compact ? current.code.toUpperCase() : current.label}</span>
        <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={tv("v2LanguageLabel")}
          className="v2-panel absolute right-0 top-[calc(100%+10px)] z-50 w-52 overflow-hidden rounded-[var(--v2-r-md)] shadow-[var(--v2-shadow-3)]"
        >
          {languages.map((lang) => {
            const active = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLanguage(lang.code as Language);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors duration-200 ${
                  active
                    ? "bg-[rgba(0,176,240,0.12)] font-bold text-[var(--v2-cyan)]"
                    : "text-[var(--v2-text-2)] hover:bg-[var(--v2-surface-2)] hover:text-[var(--v2-text)]"
                }`}
              >
                <span>{lang.nativeLabel}</span>
                <span className="text-[10px] tracking-[0.14em] text-[var(--v2-text-3)]">{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

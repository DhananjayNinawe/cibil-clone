"use client";

import { useEffect, useRef, useState } from "react";
import { languages } from "@/lib/i18n";
import { useEscape } from "@/lib/v4/motion";
import { useV4 } from "@/lib/v4/useV4";
import { CheckIcon, GlobeIcon } from "@/components/v4/ui/Icons";

/**
 * The language switch.
 *
 * A menu button, wired the way the ARIA pattern actually specifies: `aria-expanded` on the trigger,
 * `role="menu"` on the surface, `aria-checked` on the current choice, Escape to dismiss, and focus
 * returned to the trigger afterwards. The four names are written in their own scripts — हिंदी, not
 * "Hindi" — because a reader looking for their language is looking for the word they read in.
 */
export default function LanguageSwitch({ tone = "day" }: { tone?: "day" | "night" }) {
  const { language, setLanguage, t4 } = useV4();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEscape(open, () => {
    setOpen(false);
    triggerRef.current?.focus();
  });

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const current = languages.find((l) => l.code === language) ?? languages[0];

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t4("v4ChooseLanguage")}
        className="v4-btn v4-btn-ghost !px-2.5 !py-2 text-[0.875rem] font-bold"
      >
        <GlobeIcon size={17} />
        <span className="hidden sm:inline">{current.nativeLabel}</span>
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={t4("v4LanguageLabel")}
          className={`v4-surface-in absolute right-0 top-[calc(100%+8px)] z-50 w-48 overflow-hidden rounded-[var(--v4-r-md)] border border-[var(--v4-edge)] bg-[var(--v4-surface)] p-1.5 shadow-[var(--v4-elev-3)] ${
            tone === "night" ? "v4-tone-night" : ""
          }`}
        >
          {languages.map((lang) => {
            const selected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-[var(--v4-r-xs)] px-3 py-2.5 text-left text-[0.9375rem] transition-colors hover:bg-[var(--v4-surface-2)] ${
                  selected ? "font-bold text-[var(--v4-fg)]" : "text-[var(--v4-fg-2)]"
                }`}
              >
                {lang.nativeLabel}
                {selected ? <CheckIcon size={16} className="text-[var(--v4-accent)]" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

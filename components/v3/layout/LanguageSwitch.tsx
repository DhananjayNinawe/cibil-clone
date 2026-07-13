"use client";

import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { Globe } from "@/components/v3/ui/Icons";

/**
 * The language switch.
 *
 * Each language is written in its own script — a Tamil reader looks for "தமிழ்", not for "TA" —
 * and those endonyms are proper nouns, not copy, so they are not catalogue keys. The button's
 * accessible name comes from `t3("v3LanguageLabel")`.
 */
const LANGUAGES: { code: Language; endonym: string }[] = [
  { code: "en", endonym: "English" },
  { code: "hi", endonym: "हिन्दी" },
  { code: "mr", endonym: "मराठी" },
  { code: "ta", endonym: "தமிழ்" },
];

export default function LanguageSwitch() {
  const { language, setLanguage, t3 } = useV3();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t3("v3LanguageLabel")}
        className="v3-focus v3-num inline-flex h-10 items-center gap-2 px-2 text-xs tracking-[0.06em] text-[var(--v3-ink-2)] transition-colors hover:text-[var(--v3-ink)] sm:px-3"
      >
        <Globe className="text-base" />
        <span className="hidden md:inline">{current.endonym}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t3("v3LanguageLabel")}
          className="v3-fade-up absolute right-0 top-full z-50 min-w-[10rem] border border-[var(--v3-rule-3)] bg-[var(--v3-paper-2)] py-1"
        >
          {LANGUAGES.map((item) => {
            const selected = item.code === language;
            return (
              <li key={item.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage(item.code);
                    setOpen(false);
                  }}
                  className={`v3-focus flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--v3-paper-3)] ${
                    selected ? "text-[var(--v3-ink)]" : "text-[var(--v3-ink-2)]"
                  }`}
                >
                  <span>{item.endonym}</span>
                  {selected && <span aria-hidden className="h-px w-4 bg-[var(--v3-accent)]" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

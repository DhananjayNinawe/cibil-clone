"use client";

import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/lib/i18n";
import { v4Translations, type V4TranslationKey } from "@/lib/v4/i18n";

/**
 * The single translation hook for V4.
 *
 * `t` reads V1's catalog — every string the product already says lives there, and V4 re-presents
 * that copy rather than rewriting it. `t4` reads V4's own catalog, which holds only the chrome V4
 * invents (the Launcher, the chart labels, its empty and error states).
 *
 * Two functions rather than one merged lookup, on purpose: the split keeps both key unions intact,
 * so a typo in either is a compile error and neither catalog can quietly shadow the other.
 *
 * Language state itself is V1's `LanguageContext`, shared by all four versions — which is why
 * switching to Tamil on a V4 page and then crossing to V1 keeps the choice.
 */
export function useV4() {
  const { language, setLanguage, t } = useLanguage();

  const t4 = useCallback(
    (key: V4TranslationKey): string => v4Translations[language][key] ?? v4Translations.en[key],
    [language],
  );

  return { language, setLanguage, t, t4 };
}

export type { TranslationKey, V4TranslationKey };

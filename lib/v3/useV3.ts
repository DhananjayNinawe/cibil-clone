"use client";

import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/lib/i18n";
import { v3Translations, type V3TranslationKey } from "@/lib/v3/i18n";

/**
 * The single translation hook for V3.
 *
 * `t` reads V1's catalog — every string the product already says lives there, and V3
 * re-presents that copy rather than rewriting it. `t3` reads V3's own catalog, which holds
 * only the chrome V3 invents (the index overlay, folio marks, its 404).
 *
 * Two functions rather than one merged lookup on purpose: the split keeps both key unions
 * intact, so a typo in either is a compile error and neither catalog can quietly shadow the
 * other.
 */
export function useV3() {
  const { language, setLanguage, t } = useLanguage();

  const t3 = useCallback(
    (key: V3TranslationKey): string => v3Translations[language][key] ?? v3Translations.en[key],
    [language],
  );

  return { language, setLanguage, t, t3 };
}

export type { TranslationKey, V3TranslationKey };

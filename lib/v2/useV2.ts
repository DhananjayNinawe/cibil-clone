"use client";

import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/lib/i18n";
import { v2Translations, type V2TranslationKey } from "@/lib/v2/i18n";

/**
 * The single translation hook for V2.
 *
 * `t` reads V1's catalog — every string the product already says lives there, and V2
 * re-presents that copy rather than rewriting it. `tv` reads V2's own catalog, which
 * holds only the chrome V2 invents (skip links, scroll hints, its 404).
 *
 * Two functions rather than one merged lookup on purpose: the split keeps both key
 * unions intact, so a typo in either is a compile error and neither catalog can quietly
 * shadow the other.
 */
export function useV2() {
  const { language, setLanguage, t } = useLanguage();

  const tv = useCallback(
    (key: V2TranslationKey): string => v2Translations[language][key] ?? v2Translations.en[key],
    [language],
  );

  return { language, setLanguage, t, tv };
}

export type { TranslationKey, V2TranslationKey };

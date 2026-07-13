import type { Language } from "@/lib/i18n";
import { v2en, type V2TranslationKey } from "./en";
import { v2hi } from "./hi";
import { v2mr } from "./mr";
import { v2ta } from "./ta";

export type { V2TranslationKey };

/** Typed the same way V1's catalog is, so a key missing from any locale fails the build. */
export const v2Translations: Record<Language, Record<V2TranslationKey, string>> = {
  en: v2en,
  hi: v2hi,
  mr: v2mr,
  ta: v2ta,
};

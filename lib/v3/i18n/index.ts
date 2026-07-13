import type { Language } from "@/lib/i18n";
import { v3en, type V3TranslationKey } from "./en";
import { v3hi } from "./hi";
import { v3mr } from "./mr";
import { v3ta } from "./ta";

/**
 * Typed Record<Language, Record<V3TranslationKey, string>> — a key missing from any locale is
 * a compile error, which is the whole point of the shape.
 */
export const v3Translations: Record<Language, Record<V3TranslationKey, string>> = {
  en: v3en,
  hi: v3hi,
  mr: v3mr,
  ta: v3ta,
};

export type { V3TranslationKey };

import type { Language } from "@/lib/i18n";
import { v4en, type V4TranslationKey } from "./en";
import { v4hi } from "./hi";
import { v4mr } from "./mr";
import { v4ta } from "./ta";

/**
 * Typed `Record<Language, Record<V4TranslationKey, string>>` — a key missing from any locale is a
 * compile error, which is the whole point of the shape.
 */
export const v4Translations: Record<Language, Record<V4TranslationKey, string>> = {
  en: v4en,
  hi: v4hi,
  mr: v4mr,
  ta: v4ta,
};

export type { V4TranslationKey };

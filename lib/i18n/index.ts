import { en, type TranslationKey } from "./en";
import { hi } from "./hi";
import { mr } from "./mr";
import { ta } from "./ta";

export type Language = "en" | "hi" | "mr" | "ta";
export type { TranslationKey };

export const languages: { code: Language; label: string; nativeLabel: string }[] = [
  { code: "en", label: "ENGLISH", nativeLabel: "English" },
  { code: "hi", label: "HINDI", nativeLabel: "हिंदी" },
  { code: "mr", label: "MARATHI", nativeLabel: "मराठी" },
  { code: "ta", label: "TAMIL", nativeLabel: "தமிழ்" },
];

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en,
  hi,
  mr,
  ta,
};

/**
 * The Terms and Conditions document, transcribed from the source site.
 *
 * This is binding legal copy. It is translated into all four locales so the page is readable in
 * every language, but **English remains the authoritative version** — `TermsContent` renders the
 * `legalTranslationNotice` banner above the document to say so, which is what lets us ship a
 * translation of a contract without the translation itself becoming the contract.
 *
 * One file per locale (`en`/`hi`/`mr`/`ta`), mirroring `lib/i18n/`. Every locale must define the
 * same section `id` slugs in the same order, so the table of contents and in-page anchors resolve
 * in any language.
 *
 * `body` strings support the inline markup understood by `lib/richText.tsx`:
 *   `**bold**`, `[label](/href)`, and lines starting with `- ` become bullets.
 */
import type { Language } from "@/lib/i18n";
import type { TermsSection, TermsSubsection } from "./types";
import { TERMS_INTRO as introEn, TERMS_SECTIONS as sectionsEn } from "./en";
import { TERMS_INTRO as introHi, TERMS_SECTIONS as sectionsHi } from "./hi";
import { TERMS_INTRO as introMr, TERMS_SECTIONS as sectionsMr } from "./mr";
import { TERMS_INTRO as introTa, TERMS_SECTIONS as sectionsTa } from "./ta";

export type { TermsSection, TermsSubsection };

/** Lead-in paragraphs shown above the first numbered section. */
export const TERMS_INTRO: Record<Language, string[]> = {
  en: introEn,
  hi: introHi,
  mr: introMr,
  ta: introTa,
};

export const TERMS_SECTIONS: Record<Language, TermsSection[]> = {
  en: sectionsEn,
  hi: sectionsHi,
  mr: sectionsMr,
  ta: sectionsTa,
};

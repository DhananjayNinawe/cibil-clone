/**
 * The Privacy Policy document, transcribed from the source site (cibil.com/privacy-policy).
 *
 * This is a legal instrument. It is translated into all four locales so the page is readable in
 * every language, but **English remains the authoritative version** — `PrivacyPolicyContent`
 * renders the `legalTranslationNotice` banner above the document to say so.
 *
 * One file per locale (`en`/`hi`/`mr`/`ta`), mirroring `lib/i18n/`. Every locale must define the
 * same sections in the same order.
 *
 * `body` strings use the inline markup understood by `renderRichText`: `**bold**`, `[label](href)`,
 * and lines beginning `- ` become a bullet list.
 */
import type { Language } from "@/lib/i18n";
import type { PolicyPart, PolicySection } from "./types";
import { PRIVACY_POLICY as en, PRIVACY_POLICY_LAST_UPDATED as updatedEn } from "./en";
import { PRIVACY_POLICY as hi, PRIVACY_POLICY_LAST_UPDATED as updatedHi } from "./hi";
import { PRIVACY_POLICY as mr, PRIVACY_POLICY_LAST_UPDATED as updatedMr } from "./mr";
import { PRIVACY_POLICY as ta, PRIVACY_POLICY_LAST_UPDATED as updatedTa } from "./ta";

export type { PolicyPart, PolicySection };

/** The "last updated" date, localised — the month name is language-specific. */
export const PRIVACY_POLICY_LAST_UPDATED: Record<Language, string> = {
  en: updatedEn,
  hi: updatedHi,
  mr: updatedMr,
  ta: updatedTa,
};

export const PRIVACY_POLICY: Record<Language, PolicySection[]> = { en, hi, mr, ta };

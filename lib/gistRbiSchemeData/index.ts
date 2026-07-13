/**
 * Content for the "Gist of RBI Scheme" page, transcribed from the source site.
 *
 * This is long-form regulatory copy that quotes RBI circulars (including the definition of
 * "wilful default"). It is translated into all four locales so the page is readable in every
 * language, but the English text remains the authoritative one — the page renders the
 * `legalTranslationNotice` banner above it to say so.
 *
 * One file per locale (`en`/`hi`/`mr`/`ta`), mirroring `lib/i18n/`. Every locale must define the
 * same `id` slugs in the same order, so in-page anchors and the side nav resolve in any language.
 *
 * `body` strings support the inline markup understood by `lib/richText.tsx`:
 *   `**bold**`, `[label](/href)`, and lines starting with `- ` become bullets.
 *
 * Headings are numbered by the component from array order — do not prefix them with "1." here.
 */
import type { Language } from "@/lib/i18n";
import type { GistScheme } from "./types";
import { GIST_RBI_SCHEMES as en } from "./en";
import { GIST_RBI_SCHEMES as hi } from "./hi";
import { GIST_RBI_SCHEMES as mr } from "./mr";
import { GIST_RBI_SCHEMES as ta } from "./ta";

export type { GistScheme };

export const GIST_RBI_SCHEMES: Record<Language, GistScheme[]> = { en, hi, mr, ta };

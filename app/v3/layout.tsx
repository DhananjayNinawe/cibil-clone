import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter, Tiro_Devanagari_Hindi, Tiro_Tamil } from "next/font/google";
import "./v3.css";
import Shell from "@/components/v3/layout/Shell";

/**
 * V3's typographic voice, loaded here rather than in the root layout.
 *
 * app/layout.tsx belongs to V1 and is read-only, so V3 cannot add fonts to it — and should not
 * want to: V1 and V2 are both set in Intro, and a redesign that keeps the old typeface is a
 * reskin, not a redesign. next/font can be called from any layout, and the variables it emits
 * are scoped to the element they are applied to, so these five faces exist only inside /v3.
 *
 * They are self-hosted at build time (next/font downloads and inlines them), so there is no
 * request to Google at runtime, no render-blocking stylesheet, and no CLS — the fallback metrics
 * are matched automatically.
 */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-v3-serif",
  display: "swap",
});

const grotesk = Inter({
  subsets: ["latin"],
  variable: "--font-v3-grotesk",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-v3-plex",
  display: "swap",
});

/* The Indic serifs. `preload: false` keeps them out of the critical path for the ~everyone who
   reads the site in English — the browser only fetches a face once a glyph on the page needs it,
   and no Latin glyph ever resolves to Tiro. A Hindi reader gets a real serif headline; an English
   reader pays nothing for it. */
const serifDevanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-v3-serif-deva",
  display: "swap",
  preload: false,
});

const serifTamil = Tiro_Tamil({
  subsets: ["tamil"],
  weight: "400",
  variable: "--font-v3-serif-tamil",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "CIBIL — Your credit score, in your hands",
    // Every V3 page sets its own `title`; this frames it without each page repeating the brand.
    template: "%s — CIBIL",
  },
  description:
    "Monitor your CIBIL Score and Report, raise disputes, and stay loan-ready. India's pioneer credit information company.",
};

const FONT_VARS = [
  serif.variable,
  grotesk.variable,
  plex.variable,
  serifDevanagari.variable,
  serifTamil.variable,
].join(" ");

/**
 * Nested under the root layout, so it inherits <html>, <body> and the LanguageProvider — V3
 * shares V1's language state, which is why switching language on a V3 page and crossing to V1
 * keeps the choice.
 *
 * Everything visual is scoped under `.v3-root` (see v3.css): V1 and V2 render in the same
 * document and must be untouched by V3's tokens.
 */
export default function V3Layout({ children }: { children: React.ReactNode }) {
  return <Shell fontClassName={FONT_VARS}>{children}</Shell>;
}

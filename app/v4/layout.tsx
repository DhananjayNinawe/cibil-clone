import type { Metadata } from "next";
import { Geist_Mono, Manrope, Noto_Sans_Devanagari, Noto_Sans_Tamil } from "next/font/google";
import "./v4.css";
import Shell from "@/components/v4/layout/Shell";

/**
 * V4's typographic voice, loaded here rather than in the root layout.
 *
 * app/layout.tsx belongs to V1 and is read-only, so V4 cannot add fonts to it — and should not want
 * to: V1 and V2 are both set in Intro, and a redesign that keeps the old typeface is a reskin, not
 * a redesign. `next/font` can be called from any layout, and the CSS variables it emits are scoped
 * to the element they are applied to, so these four faces exist only inside /v4.
 *
 * They are self-hosted at build time (next/font downloads and inlines them), so there is no request
 * to Google at runtime, no render-blocking stylesheet, and no layout shift — the fallback metrics
 * are matched automatically.
 *
 * ── Why these two ───────────────────────────────────────────────────────────────────────────────
 * Manrope speaks. It is a variable grotesque with enough geometry to feel engineered and enough
 * warmth not to feel clinical, and — the reason it is here rather than Inter — it is *not* the face
 * V3 already uses, nor the Intro that V1 and V2 share. Four versions of this site, four voices.
 *
 * Geist Mono counts. Every figure in V4 is set in it with tabular numerals, because a column of
 * proportional digits is a ragged column, and a counter ticking upward in proportional digits
 * shoves its own label sideways as it counts.
 */
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-v4-manrope",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v4-geist-mono",
  display: "swap",
});

/* The Indic faces. `preload: false` keeps them out of the critical path for the ~everyone who reads
   the site in English: the browser fetches a face only once a glyph on the page actually needs it,
   and no Latin glyph ever resolves to Noto. A Hindi reader gets a properly-set headline; an English
   reader pays nothing for it.

   Sans, not serif, and that is a deliberate difference from V3 — which sets its Indic text in the
   Tiro serifs to match its own serif display. V4's voice is a grotesque, so its Devanagari and
   Tamil are grotesques too. A typeface pairing that changes character when the language changes is
   not a pairing. */
const deva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-v4-deva",
  display: "swap",
  preload: false,
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-v4-tamil",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "CIBIL — Your credit, in focus",
    // Every V4 page sets its own `title`; this frames it without each page repeating the brand.
    template: "%s — CIBIL",
  },
  description:
    "Check your CIBIL Score and Report, raise a dispute, and stay loan-ready. India's pioneer credit information company.",
};

const FONT_VARS = [sans.variable, mono.variable, deva.variable, tamil.variable].join(" ");

/**
 * Nested under the root layout, so it inherits <html>, <body> and the LanguageProvider — V4 shares
 * V1's language state, which is why choosing Tamil on a V4 page and then crossing to V1 keeps it.
 *
 * Everything visual is scoped under `.v4-root` (see v4.css): V1, V2 and V3 render in the same
 * document and must be untouched by V4's tokens.
 */
export default function V4Layout({ children }: { children: React.ReactNode }) {
  return <Shell fontClassName={FONT_VARS}>{children}</Shell>;
}

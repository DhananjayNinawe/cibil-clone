import type { Metadata } from "next";
import "./v2.css";
import Nav from "@/components/v2/layout/Nav";
import Footer from "@/components/v2/layout/Footer";
import BackToTop from "@/components/v2/layout/BackToTop";
import ScrollProgress from "@/components/v2/motion/ScrollProgress";

export const metadata: Metadata = {
  title: {
    default: "CIBIL — Your credit score, in your hands",
    // Every V2 page sets its own `title`; this frames it without each page repeating the brand.
    template: "%s — CIBIL",
  },
  description:
    "Monitor your CIBIL Score and Report, raise disputes, and stay loan-ready. India's pioneer credit information company.",
};

/**
 * The V2 shell.
 *
 * Nested under the root layout, so it inherits <html>, <body>, the Intro font variable and
 * the LanguageProvider — V2 shares V1's language state, which is why switching language on a
 * V2 page and crossing to V1 keeps the choice.
 *
 * Everything visual is scoped under `.v2-root` (see v2.css): V1 renders in the same document
 * and must be untouched by V2's tokens.
 */
export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2-root relative flex min-h-screen flex-1 flex-col">
      {/*
        No script tag here on purpose. The hidden half of every scroll reveal is gated in CSS
        behind `@media (scripting: enabled)` (v2.css) — so a reader without JavaScript never
        sees an invisible page, and we do not have to mutate <html> from an inline script to
        say so. React owns <html> (the root layout renders it with the font variable), so
        stamping a class on it pre-hydration is a server/client attribute mismatch.
      */}
      <ScrollProgress />
      <Nav />

      <main id="v2-main" className="flex-1">
        {children}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

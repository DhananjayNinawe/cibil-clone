"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

interface FaqHeroProps {
  titleKey: TranslationKey;
  /** Optional bold segment appended to the title (e.g. "...WITH **SCORE SIMULATOR**"). */
  titleBoldKey?: TranslationKey;
  descKey?: TranslationKey;
  ctaKey?: TranslationKey;
  ctaHref?: string;
  gradient?: string;
}

/** Reusable Knowledge Center hero: text block on a light-grey band, gradient placeholder image on the right. */
export default function FaqHero({
  titleKey,
  titleBoldKey,
  descKey,
  ctaKey,
  ctaHref = "/register",
  gradient = "from-[#8fb8cc] to-[#3a5a6a]",
}: FaqHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
      <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
          {t(titleKey)}
          {titleBoldKey && <> <span className="font-extrabold">{t(titleBoldKey)}</span></>}
        </h1>
        {descKey && <p className="text-gray-600 mt-4 max-w-md">{t(descKey)}</p>}
        {ctaKey && (
          <Link
            href={ctaHref}
            className="inline-block mt-6 w-fit bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
          >
            {t(ctaKey)}
          </Link>
        )}
      </div>
      <div className={`relative w-full h-full min-h-[200px] overflow-hidden bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/15" />
        </div>
      </div>
    </section>
  );
}

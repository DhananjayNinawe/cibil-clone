"use client";

import { useLanguage } from "@/context/LanguageContext";
import { renderRichText } from "@/lib/richText";
import TranslationNotice from "@/components/shared/TranslationNotice";
import { TERMS_INTRO, TERMS_SECTIONS, type TermsSection } from "@/lib/legalPageData";

/**
 * The Terms and Conditions document. The body is translated per locale (see `lib/legalPageData/`),
 * with `TranslationNotice` marking the English text as the authoritative one off English.
 */
export default function TermsContent() {
  const { t, language } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900">{t("termsPageTitle")}</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <TableOfContents />

        <div className="min-w-0 text-sm leading-relaxed text-gray-700">
          <TranslationNotice />

          <div className="space-y-4">
            {TERMS_INTRO[language].map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {TERMS_SECTIONS[language].map((section, i) => (
            <Section key={section.id} section={section} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TableOfContents() {
  const { t, language } = useLanguage();

  return (
    <nav aria-label={t("termsTocHeading")} className="lg:sticky lg:top-6 lg:self-start">
      <h2 className="mb-3 inline-block border-b-2 border-[#00b0f0] pb-2 text-sm font-bold text-gray-800">
        {t("termsTocHeading")}
      </h2>
      <ol className="space-y-2.5">
        {TERMS_SECTIONS[language].map((section, i) => (
          <li key={section.id} className="flex gap-2 text-sm">
            <span className="text-gray-400">{i + 1}.</span>
            <a href={`#${section.id}`} className="text-gray-700 hover:text-[#00b0f0] hover:underline">
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Section({ section, index }: { section: TermsSection; index: number }) {
  return (
    <div id={section.id} className="mt-10 scroll-mt-6">
      <h2 className="mb-3 font-bold text-gray-900">
        {index}. {section.heading}
      </h2>

      {section.body && <div className="space-y-4">{renderRichText(section.body)}</div>}

      {section.subsections?.map((sub) => (
        <div key={sub.heading} className="mt-6">
          <h3 className="mb-2 font-semibold text-gray-900">{sub.heading}</h3>
          <div className="space-y-4">{renderRichText(sub.body)}</div>
        </div>
      ))}
    </div>
  );
}

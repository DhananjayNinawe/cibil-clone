"use client";

import { useLanguage } from "@/context/LanguageContext";
import { renderRichText } from "@/lib/richText";
import SuitFiledSideNav from "@/components/suit-filed/SuitFiledSideNav";
import TranslationNotice from "@/components/shared/TranslationNotice";
import { GIST_RBI_SCHEMES } from "@/lib/gistRbiSchemeData";

/**
 * The "Gist of RBI Scheme" document. The body is translated per locale (see `lib/gistRbiSchemeData/`),
 * with `TranslationNotice` marking the English text as the authoritative one off English.
 */
export default function GistRbiSchemeContent() {
  const { t, language } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("gistRbiPageTitle")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <SuitFiledSideNav active="suitFiledSideGist" />

        <div className="min-w-0 text-sm leading-relaxed text-gray-700">
          <TranslationNotice />

          {GIST_RBI_SCHEMES[language].map((scheme, i) => (
            <div key={scheme.id} id={scheme.id} className="scroll-mt-6 first:mt-0 mt-8">
              <h2 className="mb-3 font-bold text-[#0a3a52]">
                {i + 1}. {scheme.heading}
              </h2>
              <div className="space-y-4">{renderRichText(scheme.body)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

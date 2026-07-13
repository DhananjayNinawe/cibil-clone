"use client";

import { useLanguage } from "@/context/LanguageContext";
import { renderRichText } from "@/lib/richText";
import TranslationNotice from "@/components/shared/TranslationNotice";
import { PRIVACY_POLICY, PRIVACY_POLICY_LAST_UPDATED } from "@/lib/privacyPolicyData";

export default function PrivacyPolicyContent() {
  const { t, language } = useLanguage();

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("privacyPolicy")}</h1>

      <TranslationNotice />

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        {PRIVACY_POLICY[language].map((section) => (
          <section key={section.heading} className="space-y-4">
            {/* Headings carry their own casing (most are upper-case in the source document). */}
            <h2 className="text-sm font-bold text-gray-900 tracking-wide">{section.heading}</h2>

            {section.parts.map((part, index) => (
              <div key={part.subheading ?? index} className="space-y-4">
                {part.subheading && <h3 className="font-semibold text-gray-900">{part.subheading}</h3>}
                {part.body && renderRichText(part.body)}
                {part.lines && (
                  <div>
                    {part.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-gray-500">
        {t("privacyLastUpdated")}: {PRIVACY_POLICY_LAST_UPDATED[language]}
      </p>
    </article>
  );
}

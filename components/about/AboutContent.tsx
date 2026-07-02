"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function AboutContent() {
  const { t } = useLanguage();

  return (
    <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("aboutSectionTitle")}</h2>
      <p className="text-gray-700 mt-6 leading-relaxed">{t("aboutParagraph1")}</p>
      <p className="text-gray-700 mt-5 leading-relaxed">{t("aboutParagraph2")}</p>
    </section>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";
import FaqAccordion, { FaqItem } from "@/components/faq/FaqAccordion";

export default function SubscriptionFaq() {
  const { t } = useLanguage();

  const items: FaqItem[] = [
    { question: t("subFaqQ1"), answer: <p>{t("subFaqA1")}</p> },
    { question: t("subFaqQ2"), answer: <p>{t("subFaqA2")}</p> },
    { question: t("subFaqQ3"), answer: <p>{t("subFaqA3")}</p> },
    { question: t("subFaqQ4"), answer: <p>{t("subFaqA4")}</p> },
    { question: t("subFaqQ5"), answer: <p>{t("subFaqA5")}</p> },
    { question: t("subFaqQ6"), answer: <p>{t("subFaqA6")}</p> },
  ];

  return (
    <section className="bg-[#f4f5f7] px-3 py-12 sm:px-6">
      <h2 className="text-center text-xl font-semibold text-[#0b5b84] sm:text-2xl">{t("subFaqHeading")}</h2>
      <p className="mt-2 text-center text-sm text-gray-600">{t("subFaqSubheading")}</p>

      <div className="mx-auto mt-8 max-w-6xl">
        <FaqAccordion items={items} variant="card" />
      </div>
    </section>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";
import SuitFiledSideNav from "@/components/suit-filed/SuitFiledSideNav";
import { SUIT_FILED_OVERVIEW } from "@/lib/footerPageData";
import { renderRichText } from "@/lib/richText";

export default function SuitFiledOverviewContent() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("suitFiledOverviewTitle")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <SuitFiledSideNav active="suitFiledSideOverview" />

        <div className="text-sm text-gray-700 leading-relaxed">
          {SUIT_FILED_OVERVIEW.map((section) => (
            <div key={section.heading} className="mb-8 last:mb-0">
              <h2 className="font-bold text-gray-900 mb-3">{section.heading}</h2>
              <div className="space-y-4">{renderRichText(section.body)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

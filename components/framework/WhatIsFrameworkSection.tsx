"use client";

import { useLanguage } from "@/context/LanguageContext";
import { DocumentIcon, MegaphoneIcon } from "@/components/icons";
import { TranslationKey } from "@/lib/i18n";

function PdfCard({ title }: { title: TranslationKey }) {
  const { t } = useLanguage();

  return (
    <div className="bg-[#e6f7fd] rounded-lg p-4 flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-gray-800">{t(title)}</p>
        <a href="#" className="text-sm text-blue-700 hover:underline font-medium">
          {t("downloadPdfLink")}
        </a>
      </div>
      <DocumentIcon className="w-6 h-6 text-[#00b0f0] shrink-0" />
    </div>
  );
}

export default function WhatIsFrameworkSection() {
  const { t } = useLanguage();

  return (
    <section id="what-is-framework" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("whatIsFrameworkHeading")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("frameworkPara1")}</p>
          <p className="text-gray-700 leading-relaxed mt-4">{t("frameworkPara2")}</p>
        </div>

        <div className="space-y-4">
          <PdfCard title="frameworkPdfCardTitle" />
          <PdfCard title="regDisclosure2123Title" />
          <PdfCard title="regDisclosure2324Title" />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3 mt-8">
        <MegaphoneIcon className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
        <p className="text-sm text-gray-600">{t("frameworkEffectiveNote")}</p>
      </div>
    </section>
  );
}

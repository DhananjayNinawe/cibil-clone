"use client";

import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

const SIDEBAR_ITEMS: TranslationKey[] = [
  "sidebarCompanyAccountDetails",
  "sidebarOwnership",
  "sidebarDuplicateAccount",
];

export default function IntroSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
      <div>
        <p className="text-gray-700 leading-relaxed">{t("companyDisputeIntro1")}</p>
        <p className="text-gray-700 leading-relaxed mt-4">{t("companyDisputeIntro2")}</p>
      </div>

      <aside className="border-t-2 border-[#00b0f0] h-fit">
        <div className="bg-gray-50 border border-t-0 border-gray-100 px-6 py-6">
          <h2 className="font-bold text-gray-900 mb-4">{t("typesOfDisputesHeading")}</h2>
          <ul className="space-y-2 list-disc pl-4">
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item} className="text-sm text-gray-700">
                {t(item)}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-b-2 border-[#00b0f0]" />
      </aside>
    </section>
  );
}

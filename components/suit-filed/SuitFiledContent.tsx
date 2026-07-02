"use client";

import { useLanguage } from "@/context/LanguageContext";
import SuitFiledSideNav from "@/components/suit-filed/SuitFiledSideNav";

export default function SuitFiledContent() {
  const { t } = useLanguage();

  const terms = [t("suitFiledTerm1"), t("suitFiledTerm2"), t("suitFiledTerm3"), t("suitFiledTerm4"), t("suitFiledTerm5")];
  const disclaimers = [t("suitFiledDisc1"), t("suitFiledDisc2"), t("suitFiledDisc3"), t("suitFiledDisc4"), t("suitFiledDisc5")];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("suitFiledPageTitle")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <SuitFiledSideNav active="suitFiledSideSuit" />

        <div className="text-sm text-gray-700 leading-relaxed">
          <h2 className="font-bold text-gray-900 mb-3">{t("suitFiledTermsHeading")}</h2>
          <ul className="list-disc pl-5 space-y-3">
            {terms.map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ul>

          <h2 className="font-bold text-gray-900 mt-8 mb-3">{t("suitFiledDisclaimerHeading")}</h2>
          <p>{t("suitFiledDisclaimerIntro")}</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            {disclaimers.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          <h2 className="font-bold text-gray-900 mt-8 mb-3">{t("suitFiledGoverningHeading")}</h2>
          <ul className="list-disc pl-5">
            <li>{t("suitFiledGoverning")}</li>
          </ul>

          <div className="flex items-center gap-6 mt-8">
            <button className="bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-8 py-2.5 transition-colors">
              {t("iAgreeBtn")}
            </button>
            <button className="bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-8 py-2.5 transition-colors">
              {t("iDisagreeBtn")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

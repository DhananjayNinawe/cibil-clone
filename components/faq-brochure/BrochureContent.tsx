"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { PlusMinusCircleIcon } from "@/components/icons";
import CreditSidebarCard from "@/components/faq/CreditSidebarCard";

const TABS: TranslationKey[] = ["brochureTab1", "brochureTab2"];

export default function BrochureContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TranslationKey>("brochureTab1");
  const [open, setOpen] = useState(true);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-12">{t("brochurePageTitle")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
        <div>
          <div className="flex items-center gap-8 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-bold pb-1 transition-colors ${
                  activeTab === tab ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t(tab)}
              </button>
            ))}
          </div>

          {activeTab === "brochureTab1" ? (
            <div className="border-b-2 border-[#f5c518] pb-6">
              <button type="button" onClick={() => setOpen((o) => !o)} className="flex items-center gap-3 mb-4">
                <PlusMinusCircleIcon expanded={open} className="w-5 h-5 text-gray-700" />
                <span className="font-bold text-gray-900">{t("brochureTab1")}</span>
              </button>
              {open && (
                <div className="ml-8 space-y-4 text-gray-700 leading-relaxed">
                  <p>{t("brochureTab1Para1")}</p>
                  <p>{t("brochureTab1Para2")}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 py-6">{t("sectionContentComingSoon")}</p>
          )}
        </div>

        <div className="flex justify-center lg:justify-end">
          <CreditSidebarCard variant="score-report" />
        </div>
      </div>

      <p className="text-gray-700 mt-12 max-w-4xl">
        {t("brochureFooterText")}{" "}
        <a href="#" className="text-blue-700 hover:underline">
          {t("downloadWord")}
        </a>{" "}
        {t("brochureDownloadPrefix")}
      </p>
    </section>
  );
}

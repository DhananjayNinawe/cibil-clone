"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { PlusMinusCircleIcon } from "@/components/icons";

const TABS: TranslationKey[] = [
  "tabCompensationGuidelines",
  "tabCompensationEligibility",
  "tabCompensationPayout",
  "tabCompensationCalculation",
  "tabGeneralQuestions",
  "tabCustomerSupportFaqs",
];

const FAQ_TITLES: TranslationKey[] = [
  "frameworkFaq1Title",
  "frameworkFaq2Title",
  "frameworkFaq3Title",
  "frameworkFaq4Title",
  "frameworkFaq5Title",
];

function FaqItem({ title, answer, defaultOpen = false }: { title: string; answer?: string; defaultOpen?: boolean }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-start gap-3 text-left">
        <PlusMinusCircleIcon expanded={open} className="w-5 h-5 text-[#00b0f0] mt-0.5 shrink-0" />
        <span className="font-bold text-sm text-gray-800">{title}</span>
      </button>
      {open && <p className="mt-3 ml-8 text-sm text-gray-600 leading-relaxed">{answer ?? t("sectionContentComingSoon")}</p>}
    </div>
  );
}

export default function FrameworkFaqSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TranslationKey>("tabCompensationGuidelines");

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("frameworkFaqsHeading")}</h2>

        <div className="bg-white rounded-lg shadow-sm grid grid-cols-1 lg:grid-cols-[220px_1fr]">
          <div className="border-b lg:border-b-0 lg:border-r border-gray-200 p-6">
            <p className="text-xs font-bold tracking-widest text-gray-400 mb-4">{t("questionSectionsLabel")}</p>
            <nav className="flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-left text-sm px-3 py-2 rounded transition-colors ${
                    activeTab === tab
                      ? "bg-[#e6f7fd] text-[#0072c6] font-semibold border-l-2 border-[#00b0f0]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {t(tab)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "tabCompensationGuidelines" ? (
              FAQ_TITLES.map((title, i) => (
                <FaqItem key={title} title={t(title)} answer={i === 0 ? t("frameworkPara1") : undefined} defaultOpen={i === 0} />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-6">{t("sectionContentComingSoon")}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

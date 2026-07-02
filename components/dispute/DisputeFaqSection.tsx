"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { PlusMinusCircleIcon } from "@/components/icons";

function FaqItemView({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-start gap-3 text-left">
        <PlusMinusCircleIcon expanded={open} className="w-5 h-5 text-[#00b0f0] mt-0.5 shrink-0" />
        <span className="font-bold text-sm text-gray-800">{title}</span>
      </button>
      {open && <div className="mt-3 ml-8 text-sm text-gray-600 leading-relaxed space-y-2">{children}</div>}
    </div>
  );
}

function StandardAnswer() {
  const { t } = useLanguage();
  return (
    <p>
      {t("faqStandardAnswerPrefix")}{" "}
      <a href="#" className="text-blue-700 underline">
        {t("theseStepsLink")}
      </a>
      . {t("faqStandardAnswerSuffix")}
    </p>
  );
}

const TABS: { key: TranslationKey; hasContent: boolean }[] = [
  { key: "tabAccountInfo", hasContent: true },
  { key: "tabProfileInfo", hasContent: false },
  { key: "tabEnquiryInfo", hasContent: false },
];

export default function DisputeFaqSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TranslationKey>("tabAccountInfo");

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center font-bold text-gray-900 text-lg mb-8">{t("selectSectionHeading")}</h2>

        <div className="flex items-center justify-center gap-8 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t(tab.key)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm mt-8 px-6 py-4">
          {activeTab === "tabAccountInfo" ? (
            <>
              <FaqItemView title={t("faq1Title")}>
                <StandardAnswer />
              </FaqItemView>
              <FaqItemView title={t("faq2Title")}>
                <StandardAnswer />
              </FaqItemView>
              <FaqItemView title={t("faq3Title")}>
                <p>{t("faq3Answer")}</p>
              </FaqItemView>
              <FaqItemView title={t("faq4Title")}>
                <StandardAnswer />
                <p>{t("faq4ExtraParagraph")}</p>
                <p>
                  {t("faq4ClosingPrefix")}{" "}
                  <a href="#" className="text-blue-700 underline">
                    {t("theseStepsLink")}
                  </a>
                  .
                </p>
              </FaqItemView>
              <FaqItemView title={t("faq5Title")}>
                <p>{t("faq5Answer")}</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>{t("faq5Bullet1")}</li>
                  <li>{t("faq5Bullet2")}</li>
                  <li>{t("faq5Bullet3")}</li>
                </ul>
              </FaqItemView>
            </>
          ) : (
            <p className="py-6 text-sm text-gray-500 text-center">{t("sectionContentComingSoon")}</p>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";
import { HashIcon, QuestionIcon, CalendarIcon } from "@/components/icons";

export default function KeyTermsSection() {
  const { t } = useLanguage();

  const terms = [
    { icon: <HashIcon />, bg: "bg-yellow-50", title: t("ecnTitle"), desc: t("ecnDesc") },
    { icon: <QuestionIcon />, bg: "bg-green-50", title: t("enquiryPurposeTitle"), desc: t("enquiryPurposeDesc") },
    { icon: <CalendarIcon />, bg: "bg-purple-50", title: t("enquiryDateTimeTitle"), desc: t("enquiryDateTimeDesc") },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-gray-800 mb-8">{t("learnKeyTermsHeading")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {terms.map((term) => (
          <div key={term.title} className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-full ${term.bg} flex items-center justify-center shrink-0`}>
              {term.icon}
            </div>
            <div>
              <p className="font-bold text-gray-900">{term.title}</p>
              <p className="text-sm text-gray-500 mt-1">{term.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

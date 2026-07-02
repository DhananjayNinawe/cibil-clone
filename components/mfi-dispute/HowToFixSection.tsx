"use client";

import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { ReportChartIcon, DocumentAlertIcon, ScaleIcon, PhoneCheckIcon, ArrowRightIcon } from "@/components/icons";

interface Step {
  number: string;
  title: TranslationKey;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  { number: "1", title: "mfiStep1Title", icon: <ReportChartIcon /> },
  { number: "2", title: "mfiStep2Title", icon: <DocumentAlertIcon /> },
  { number: "3", title: "mfiStep3Title", icon: <ScaleIcon /> },
  { number: "4", title: "mfiStep4Title", icon: <PhoneCheckIcon /> },
];

export default function HowToFixSection() {
  const { t } = useLanguage();

  return (
    <section id="how-to-fix" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="font-bold text-gray-900 text-lg mb-6">{t("mfiHowToFixHeading")}</h2>

      <div className="bg-[#e6f1f4] rounded-lg p-6 sm:p-10">
        <h3 className="text-center font-bold text-gray-800 max-w-2xl mx-auto mb-8">{t("mfiFollowStepsHeading")}</h3>

        <div className="bg-white rounded-lg p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-2">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex items-center gap-4 lg:gap-2 lg:flex-1">
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="w-24 h-24 rounded-full bg-[#0a3a52] flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded bg-[#0a3a52] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {step.number}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">{t(step.title)}</p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <ArrowRightIcon className="hidden lg:block w-6 h-6 text-gray-300 shrink-0 rotate-90 lg:rotate-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

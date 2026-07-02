"use client";

import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import {
  DocumentAlertIcon,
  SearchIcon,
  BankIcon,
  ChatBubbleIcon,
  CrossCircleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/icons";

function FlowStep({
  number,
  icon,
  title,
  desc,
  className = "",
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  desc?: string;
  className?: string;
}) {
  return (
    <div className={`relative flex-1 rounded-lg border bg-white p-4 ${className}`}>
      <span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#00b0f0] text-white text-xs font-bold flex items-center justify-center">
        {number}
      </span>
      <div className="flex items-center gap-2 mb-1.5">
        {icon}
        <p className="font-bold text-xs sm:text-sm text-gray-800 leading-snug">{title}</p>
      </div>
      {desc && <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>}
    </div>
  );
}

function FlowArrow() {
  return <ArrowRightIcon className="w-5 h-5 text-gray-300 shrink-0 rotate-90 lg:rotate-0 mx-auto" />;
}

export default function ProcessDiagram({ headingKey = "diagramHeading" }: { headingKey?: TranslationKey }) {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="font-bold text-gray-900 text-lg">{t(headingKey)}</h2>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-10">
        <h3 className="text-center font-bold text-gray-900 mb-10">{t("whatWeDoHeading")}</h3>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-3">
          <FlowStep
            number="1"
            icon={<DocumentAlertIcon className="w-6 h-6 text-[#0a3a52]" />}
            title={t("diagStep1Title")}
            desc={t("diagStep1Desc")}
            className="border-gray-200 w-full lg:w-56"
          />
          <FlowArrow />
          <FlowStep
            number="2"
            icon={<SearchIcon className="w-5 h-5 text-[#0a3a52]" />}
            title={t("diagStep2Title")}
            desc={t("diagStep2Desc")}
            className="border-gray-200 w-full lg:w-56"
          />
          <FlowArrow />
          <FlowStep
            number="3"
            icon={<BankIcon className="w-5 h-5 text-[#0a3a52]" />}
            title={t("diagStep3Title")}
            className="border-gray-200 w-full lg:w-56"
          />
          <FlowArrow />

          <div className="w-full lg:w-44 shrink-0 rounded-lg bg-[#e6f7fd] border border-[#00b0f0]/30 p-4 text-center">
            <p className="text-xs font-semibold text-gray-700">{t("diagDecisionText")}</p>
          </div>
          <FlowArrow />

          <div className="flex flex-col gap-4 w-full lg:w-56">
            <FlowStep
              number="4.A"
              icon={<ChatBubbleIcon className="w-5 h-5 text-green-600" />}
              title={t("diagAcceptedTitle")}
              desc={t("diagAcceptedDesc")}
              className="border-green-200"
            />
            <FlowStep
              number="4.B"
              icon={<CrossCircleIcon className="w-5 h-5 text-red-500" />}
              title={t("diagRejectedTitle")}
              desc={t("diagRejectedDesc")}
              className="border-red-200"
            />
          </div>
          <FlowArrow />

          <FlowStep
            number="5"
            icon={<CheckCircleIcon className="w-5 h-5 text-[#00b0f0]" />}
            title={t("diagFinalTitle")}
            desc={t("diagFinalDesc")}
            className="border-gray-200 w-full lg:w-56"
          />
        </div>

        <p className="text-center text-xs text-gray-500 mt-10">{t("diagTurnaroundTime")}</p>
      </div>
    </section>
  );
}

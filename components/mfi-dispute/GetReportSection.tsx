"use client";

import { useLanguage } from "@/context/LanguageContext";
import { DocumentIcon, MailIcon } from "@/components/icons";

export default function GetReportSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="font-bold text-gray-900 text-lg mb-6">{t("mfiGetReportHeading")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border-2 border-[#0a3a52]/20 rounded-lg p-6">
          <div className="flex justify-center mb-4">
            <DocumentIcon className="w-10 h-10 text-[#0a3a52]" />
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <span className="font-bold">{t("step1Label")}:</span> {t("mfiRequestFormStep1")}{" "}
              <a href="#" className="text-blue-700 underline">
                {t("mfiRequestFormLink")}
              </a>
              .
            </li>
            <li>
              <span className="font-bold">{t("step2Label")}:</span> {t("mfiRequestFormStep2")}
            </li>
            <li>
              <span className="font-bold">{t("step3Label")}:</span> {t("mfiRequestFormStep3")}
            </li>
            <li>
              <span className="font-bold">{t("step4Label")}:</span> {t("mfiRequestFormStep4")}
            </li>
          </ul>
        </div>

        <div className="border-2 border-[#0a3a52]/20 rounded-lg p-6 flex flex-col items-center text-center justify-center">
          <MailIcon className="w-10 h-10 text-[#0a3a52] mb-4" />
          <p className="font-bold text-gray-900">{t("writeToUsTitle")}</p>
          <p className="text-sm text-gray-700 mt-2">{t("mfiWriteToUsEmail")}</p>
          <p className="text-sm text-gray-700 mt-1">{t("mfiContactUsFaqLabel")}</p>
        </div>
      </div>
    </section>
  );
}

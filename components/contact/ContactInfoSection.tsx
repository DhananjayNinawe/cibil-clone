"use client";

import { useLanguage } from "@/context/LanguageContext";

function InfoRow({ label, buttonLabel }: { label: string; buttonLabel: string }) {
  return (
    <div className="border-t border-gray-200 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <p className="text-gray-800 font-semibold flex-1">{label}</p>
      <a
        href="#"
        className="inline-block w-fit bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs sm:text-sm font-bold rounded-full px-6 py-2.5 text-center transition-colors"
      >
        {buttonLabel}
      </a>
    </div>
  );
}

export default function ContactInfoSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <InfoRow label={t("watchVideosLabel")} buttonLabel={t("clickHereBtn")} />
      <InfoRow label={t("contactUsLabel")} buttonLabel={t("contactUsDetailsBtn")} />

      <div className="border-t border-b border-gray-200 py-8">
        <p className="text-xs font-bold tracking-wide text-gray-800">{t("registeredOfficeLabel")}</p>
        <p className="font-bold text-gray-900 mt-2">{t("registeredOfficeName")}</p>
        <p className="text-gray-700 mt-1">{t("registeredOfficeFormerly")}</p>
        <p className="text-gray-700">{t("registeredOfficeAddress1")}</p>
        <p className="text-gray-700">{t("registeredOfficeAddress2")}</p>
        <p className="text-gray-700">{t("registeredOfficeAddress3")}</p>
        <p className="text-gray-700 mt-1">
          {t("registeredOfficeEmailLabel")}{" "}
          <a href={`mailto:${t("registeredOfficeEmail")}`} className="text-blue-700 hover:underline">
            {t("registeredOfficeEmail")}
          </a>
        </p>
        <p className="text-gray-600 italic text-sm mt-4 max-w-3xl">{t("registeredOfficeNote")}</p>
      </div>
    </section>
  );
}

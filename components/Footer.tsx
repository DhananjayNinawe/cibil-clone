"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-2 text-center">
        <p className="text-xs text-gray-500">{t("copyright")}</p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <a href="#" className="text-xs text-gray-500 hover:text-[#00b0f0] hover:underline transition-colors">
            {t("faqs")}
          </a>
          <a href="#" className="text-xs text-gray-500 hover:text-[#00b0f0] hover:underline transition-colors">
            {t("termsConditions")}
          </a>
          <a href="#" className="text-xs text-gray-500 hover:text-[#00b0f0] hover:underline transition-colors">
            {t("privacyPolicy")}
          </a>
        </div>
      </div>
    </footer>
  );
}

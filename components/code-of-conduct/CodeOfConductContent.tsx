"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Standalone "external link" landing — the source page has no site nav/footer, just the CIBIL
 * logo and an Ethics Helpline notice with a Continue link.
 */
export default function CodeOfConductContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <div className="py-8 flex justify-center">
        <Link href="/" className="flex flex-col items-center leading-none">
          <span className="text-2xl font-bold text-[#00b0f0] tracking-tight">CIBIL</span>
          <span className="text-[9px] text-gray-500 font-medium">Part of TransUnion</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-800">
          <span className="font-bold">{t("cocImportantLabel")}</span> {t("cocImportantText")}
        </p>
        <p className="text-gray-800 mt-8">
          {t("cocEthicsPrefix")}{" "}
          <a href="#" className="text-blue-700 font-bold underline">
            {t("cocContinueLink")}
          </a>{" "}
          {t("cocEthicsSuffix")}
        </p>
      </div>
    </div>
  );
}

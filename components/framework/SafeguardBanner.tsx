"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function SafeguardBanner() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#fdf6d8] py-4 px-4">
      <p className="text-center text-sm text-gray-700 max-w-3xl mx-auto">
        <Link href="/" className="text-blue-700 hover:underline font-semibold">
          {t("disputeClickHere")}
        </Link>{" "}
        {t("safeguardProfileBanner")}
      </p>
    </div>
  );
}

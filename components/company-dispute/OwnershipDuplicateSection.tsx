"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function OwnershipDuplicateSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <div>
        <h2 className="font-bold text-gray-900">{t("companyDisputeSection2Heading")}</h2>
        <p className="text-gray-700 leading-relaxed mt-2">{t("ownershipDesc")}</p>
      </div>
      <div>
        <h2 className="font-bold text-gray-900">{t("companyDisputeSection3Heading")}</h2>
        <p className="text-gray-700 leading-relaxed mt-2">{t("duplicateAccountDesc")}</p>
      </div>
    </section>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * The source Regulatory Disclosure page is an extremely long (~1000-row) tabular document that
 * wasn't legible in the reference screenshot. This renders the page shell — title, intro, and the
 * table's column structure — with a "refer to the official site" note in place of the full data.
 */
export default function RegulatoryContent() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("regulatoryTitle")}</h1>
      <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">{t("regulatoryIntro")}</p>

      <div className="overflow-x-auto mt-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#0e5063] text-white">
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold w-20">{t("regulatoryColSrNo")}</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{t("regulatoryColParticulars")}</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{t("regulatoryColDetails")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-6 text-center text-gray-400" colSpan={3}>
                {t("sectionContentComingSoon")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

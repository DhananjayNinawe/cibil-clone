"use client";

import { useLanguage } from "@/context/LanguageContext";
import SuitFiledSideNav from "@/components/suit-filed/SuitFiledSideNav";
import { RBI_CIRCULARS } from "@/lib/footerPageData";

export default function RbiNotificationsContent() {
  const { t, language } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("rbiNotifTitle")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <SuitFiledSideNav active="suitFiledSideRbi" />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-gray-700">
                <th className="border border-gray-200 px-4 py-3 text-center font-semibold">{t("rbiColSrNo")}</th>
                <th className="border border-gray-200 px-4 py-3 text-center font-semibold">{t("rbiColCategory")}</th>
                <th className="border border-gray-200 px-4 py-3 text-center font-semibold">{t("rbiColCircular")}</th>
                <th className="border border-gray-200 px-4 py-3 text-center font-semibold">{t("rbiColReference")}</th>
                <th className="border border-gray-200 px-4 py-3 text-center font-semibold">{t("rbiColDate")}</th>
              </tr>
            </thead>
            <tbody>
              {RBI_CIRCULARS[language].map((c) => (
                <tr key={c.sr}>
                  <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">{c.sr}</td>
                  <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">{c.category}</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    <a href="#" className="text-blue-700 hover:underline">
                      {c.name}
                    </a>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">{c.reference}</td>
                  <td className="border border-gray-200 px-4 py-3 text-center text-gray-700 whitespace-nowrap">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

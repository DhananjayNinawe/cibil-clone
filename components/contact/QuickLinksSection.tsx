"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

interface QuickLinkItem {
  title: TranslationKey;
  desc?: TranslationKey;
}

interface QuickLinkColumn {
  heading: TranslationKey;
  items: QuickLinkItem[];
}

const COLUMNS: QuickLinkColumn[] = [
  {
    heading: "colConsumer",
    items: [
      { title: "qlPurchaseScoreReport", desc: "qlPurchaseScoreReportDesc" },
      { title: "qlDisputeResolution", desc: "qlDisputeResolutionDesc" },
      { title: "qlMyCibilUserName", desc: "qlMyCibilUserNameDesc" },
      { title: "qlMyCibilPasswordReset", desc: "qlMyCibilPasswordResetDesc" },
      { title: "qlUnderstandScoreReport" },
    ],
  },
  {
    heading: "colCommercial",
    items: [
      { title: "qlPurchaseRankReport", desc: "qlPurchaseRankReportDesc" },
      { title: "qlCommercialDispute", desc: "qlCommercialDisputeDesc" },
      { title: "qlCompanyDocUpload", desc: "qlCompanyDocUploadDesc" },
      { title: "qlRankPortalLogin", desc: "qlRankPortalLoginDesc" },
      { title: "qlRankCompanyFaqsShort" },
    ],
  },
  {
    heading: "colMicrofinance",
    items: [
      { title: "qlCheckMfiScoreReport", desc: "qlCheckMfiScoreReportDesc" },
      { title: "qlMfiDispute", desc: "qlMfiDisputeDesc" },
      { title: "qlMfiUserName", desc: "qlMfiUserNameDesc" },
      { title: "qlMfiPasswordReset", desc: "qlMfiPasswordResetDesc" },
      { title: "qlUnderstandMfiScoreReport" },
    ],
  },
];

function QuickLinkColumnView({ column }: { column: QuickLinkColumn }) {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="text-sm font-bold text-gray-700 mb-4">{t(column.heading)}</h3>
      <ul className="space-y-6">
        {column.items.map((item) => (
          <li key={item.title}>
            <a href="#" className="text-sm font-bold text-blue-700 hover:underline leading-snug block">
              {t(item.title)}
            </a>
            {item.desc && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t(item.desc)}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function QuickLinksSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("quickLinksHeading")}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {COLUMNS.map((column) => (
            <QuickLinkColumnView key={column.heading} column={column} />
          ))}
        </div>

        <aside className="border-t-2 border-[#00b0f0] h-fit">
          <div className="border border-t-0 border-gray-200 rounded-b-lg overflow-hidden">
            <div className="px-6 py-6 text-center">
              <p className="text-gray-700 font-medium">{t("contactSidebarQuestion")}</p>
            </div>
            <div className="bg-[#0a3a52] px-6 py-6 text-center">
              <p className="text-white font-bold leading-snug">{t("contactSidebarCta")}</p>
              <Link
                href="/register"
                className="inline-block mt-4 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs font-bold rounded-full px-5 py-2.5 transition-colors"
              >
                {t("contactSidebarBtn")}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

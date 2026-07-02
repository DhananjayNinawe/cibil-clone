"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

export type SidebarVariant = "score-report" | "subscribe" | "rank";

interface VariantConfig {
  subtitle: TranslationKey;
  buttonLabel: TranslationKey;
  href: string;
}

const VARIANTS: Record<SidebarVariant, VariantConfig> = {
  "score-report": { subtitle: "sidebarUnlimitedAccess", buttonLabel: "sidebarGetScoreReportBtn", href: "/register" },
  subscribe: { subtitle: "sidebarMonitorReady", buttonLabel: "sidebarSubscribeNowBtn", href: "/choose-subscription" },
  rank: { subtitle: "sidebarRankReport", buttonLabel: "sidebarGetYoursNowBtn", href: "/register" },
};

export default function CreditSidebarCard({ variant = "subscribe" }: { variant?: SidebarVariant }) {
  const { t } = useLanguage();
  const config = VARIANTS[variant];

  return (
    <aside className="w-full max-w-xs rounded-xl overflow-hidden shadow-sm">
      <div className="bg-white px-6 py-5 text-center">
        <p className="font-semibold text-gray-800">{t("sidebarWaitTitle")}</p>
      </div>
      <div className="bg-[#0a3a52] px-6 py-6 text-center">
        <p className="text-white font-semibold leading-snug">{t(config.subtitle)}</p>
        <Link
          href={config.href}
          className="inline-block mt-5 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs font-bold rounded-full px-5 py-3 transition-colors"
        >
          {t(config.buttonLabel)}
        </Link>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

const ITEMS: { key: TranslationKey; href: string }[] = [
  { key: "suitFiledSideOverview", href: "/suit-filed-cases/overview" },
  { key: "suitFiledSideGist", href: "/suit-filed-cases/gist-rbi-scheme" },
  { key: "suitFiledSideSuit", href: "/suit-filed-cases/suit-filed-cases" },
  { key: "suitFiledSideNonSuit", href: "/suit-filed-cases/non-suit-filed-cases" },
  { key: "suitFiledSideRbi", href: "/external-links/rbi-notifications" },
];

/** Shared left sidebar for the Suit Filed Cases / RBI Notifications section. */
export default function SuitFiledSideNav({ active }: { active: TranslationKey }) {
  const { t } = useLanguage();

  return (
    <nav className="space-y-1">
      {ITEMS.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className={`block px-4 py-2.5 text-sm rounded transition-colors ${
            active === item.key
              ? "bg-gray-100 text-gray-900 font-semibold border-l-2 border-[#00b0f0]"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>
  );
}

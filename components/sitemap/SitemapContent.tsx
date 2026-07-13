"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SITEMAP_COLUMNS, type SitemapGroup } from "@/lib/sitemapData";

export default function SitemapContent() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-360 px-6 py-10 sm:px-8 lg:px-11">
      <h1 className="text-[26px] font-bold leading-snug text-gray-900">{t("sitemapTitle")}</h1>

      <div className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {SITEMAP_COLUMNS.map((column) => (
          <nav key={column.key} aria-label={t(column.key)}>
            <Link
              href={column.href}
              className="text-[22px] font-semibold text-[#0f6cbd] underline underline-offset-4 hover:text-[#00b0f0]"
            >
              {t(column.key)}
            </Link>

            <div className="mt-6 space-y-8">
              {column.groups.map((group, index) => (
                <Group key={group.key ?? `group-${index}`} group={group} />
              ))}
            </div>
          </nav>
        ))}
      </div>
    </section>
  );
}

function Group({ group }: { group: SitemapGroup }) {
  const { t } = useLanguage();

  return (
    <div>
      {group.key &&
        (group.href ? (
          <Link
            href={group.href}
            className="text-lg font-semibold text-[#0f6cbd] underline underline-offset-4 hover:text-[#00b0f0]"
          >
            {t(group.key)}
          </Link>
        ) : (
          <h2 className="text-lg font-semibold text-gray-800">{t(group.key)}</h2>
        ))}

      {group.links.length > 0 && (
        <ul className={`space-y-2.5 pl-4 ${group.key ? "mt-4" : ""}`}>
          {group.links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className="text-[13px] text-[#0f6cbd] underline underline-offset-4 hover:text-[#00b0f0]"
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

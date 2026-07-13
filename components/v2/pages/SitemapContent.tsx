"use client";

import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { V2_SITEMAP_COLUMNS } from "@/lib/v2/sitemapData";
import type { SitemapColumn, SitemapGroup } from "@/lib/sitemapData";
import { Container, Section } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Reveal from "@/components/v2/motion/Reveal";
import { ArrowRightIcon } from "@/components/icons";

/**
 * The site index.
 *
 * The tree is `V2_SITEMAP_COLUMNS`, which is V1's `SITEMAP_COLUMNS` with every href mapped through
 * `toV2()`. Nothing about the information architecture is retyped here, which is what guarantees
 * V2 cannot grow an orphan page or a dead link unless V1 has one (AGENTS.md).
 *
 * V1's one structural rule is carried over intact: a group with an `href` is a link, a group
 * without one is a plain section heading. It is the difference between "About TransUnion CIBIL"
 * (a page) and "Credit Report Products" (a label), and losing it would invent a page that
 * does not exist.
 */
export default function SitemapContent() {
  const { t, tv } = useV2();

  return (
    <>
      <PageHero
        eyebrow={tv("v2AllPages")}
        title={t("sitemapTitle")}
        lede={tv("v2SitemapLede")}
        breadcrumbs={[{ label: t("footerSitemap") }]}
        tone="cyan"
        size="sm"
      />

      <Section space="md">
        <Container>
          <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {V2_SITEMAP_COLUMNS.map((column, index) => (
              <Reveal key={column.key} variant="up" delay={index * 90}>
                <Column column={column} index={index} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function Column({ column, index }: { column: SitemapColumn; index: number }) {
  const { t } = useV2();

  return (
    <nav
      aria-label={t(column.key)}
      className="h-full border-t border-[var(--v2-line-2)] pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 lg:first:border-l-0 lg:first:pl-0"
    >
      <span aria-hidden className="v2-eyebrow block text-[var(--v2-text-3)] tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>

      <Link
        href={column.href}
        className="v2-focus group mt-4 inline-flex items-baseline gap-2 text-[var(--v2-text)] transition-colors duration-300 hover:text-[var(--v2-cyan)]"
      >
        <span className="v2-h3">{t(column.key)}</span>
        <ArrowRightIcon className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 ease-[var(--v2-ease)] group-hover:translate-x-0 group-hover:opacity-100" />
      </Link>

      <div className="mt-9 space-y-10">
        {column.groups.map((group, groupIndex) => (
          <Group key={group.key ?? `group-${groupIndex}`} group={group} />
        ))}
      </div>
    </nav>
  );
}

function Group({ group }: { group: SitemapGroup }) {
  const { t } = useV2();

  return (
    <div>
      {group.key &&
        (group.href ? (
          <Link
            href={group.href}
            className="v2-focus v2-underline text-sm font-bold text-[var(--v2-cyan)] transition-colors duration-300 hover:text-[var(--v2-cyan-soft)]"
          >
            {t(group.key)}
          </Link>
        ) : (
          <h2 className="v2-eyebrow text-[var(--v2-text-2)]">{t(group.key)}</h2>
        ))}

      {group.links.length > 0 && (
        <ul className={`space-y-px ${group.key ? "mt-4" : ""}`}>
          {group.links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className="v2-focus group flex items-center gap-3 rounded-[var(--v2-r-sm)] py-2 pr-3 text-sm text-[var(--v2-text-2)] transition-colors duration-300 hover:bg-[var(--v2-surface)] hover:text-[var(--v2-text)]"
              >
                <span
                  aria-hidden
                  className="h-px w-3 shrink-0 bg-[var(--v2-line-2)] transition-all duration-300 ease-[var(--v2-ease)] group-hover:w-6 group-hover:bg-[var(--v2-cyan)] group-hover:shadow-[0_0_10px_rgba(0,176,240,0.9)]"
                />
                <span className="min-w-0">{t(link.key)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

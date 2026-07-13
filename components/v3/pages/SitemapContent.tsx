"use client";

import Link from "next/link";
import type { SitemapGroup } from "@/lib/sitemapData";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { V3_SITEMAP_COLUMNS } from "@/lib/v3/sitemapData";
import { Container, Section } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Rule from "@/components/v3/ui/Rule";
import { ArrowUpRight } from "@/components/v3/ui/Icons";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * The site, printed as an index.
 *
 * V1 sets this as three columns of blue underlined links; V2 as a stack of glass panels. V3 sets
 * it as the back matter of a book, and it is the page where the whole design argument is made
 * plainly: every destination the site has, numbered into parts, ruled into groups, each entry a
 * row you can run your finger down. It deliberately echoes the Index overlay's typography — the
 * overlay is this document, opened over the page.
 *
 * The tree is V1's own (lib/sitemapData.ts), mapped through `toV3()` in lib/v3/sitemapData.ts, so
 * V1's two invariants — no orphan routes, no dead links — carry across for free.
 */
export default function SitemapContent() {
  const { t, t3 } = useV3();

  return (
    <>
      <PageHeader
        size="full"
        folio={t3("v3IndexLabel")}
        title={t("sitemapTitle")}
        lede={t3("v3SitemapLede")}
        breadcrumbs={[{ label: t("searchHome"), href: toV3("/") }, { label: t("footerSitemap") }]}
      />

      <Section space="md">
        <Container>
          {V3_SITEMAP_COLUMNS.map((column, index) => (
            <section
              key={column.key}
              className="grid gap-8 border-t border-[var(--v3-line-2)] py-12 lg:grid-cols-[minmax(14rem,1fr)_2.6fr] lg:gap-16 lg:py-14"
            >
              {/* The part: its number and its name, hung in the left margin. */}
              <div>
                <p aria-hidden className="v3-folio mb-4 text-[var(--v3-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h2 className="v3-h2 text-balance">
                  <Link href={column.href} className="v3-focus group inline-flex items-baseline gap-2">
                    <span className="v3-link-draw">{t(column.key)}</span>
                    <ArrowUpRight className="text-sm text-[var(--v3-fg-3)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </h2>
              </div>

              <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
                {column.groups.map((group, i) => (
                  <Reveal key={group.key ?? `group-${i}`} variant="rise" delay={Math.min(i, 4) * 60}>
                    <Group group={group} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}

          <Rule strong />
        </Container>
      </Section>
    </>
  );
}

/**
 * A group inside a part. The one rule V1's sitemap carries over verbatim: a group with an `href`
 * is itself a destination and renders as a link; one without is a plain heading.
 */
function Group({ group }: { group: SitemapGroup }) {
  const { t } = useV3();

  return (
    <div>
      {group.key && (
        <h3 className="v3-folio border-b border-[var(--v3-line-2)] pb-3">
          {group.href ? (
            <Link href={group.href} className="v3-focus v3-link-draw text-[var(--v3-accent)]">
              {t(group.key)}
            </Link>
          ) : (
            <span className="text-[var(--v3-fg)]">{t(group.key)}</span>
          )}
        </h3>
      )}

      {group.links.length > 0 && (
        <ul className={group.key ? "mt-1" : "border-t border-[var(--v3-line-2)]"}>
          {group.links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className="v3-focus group block border-b border-[var(--v3-line)] py-2.5 transition-colors hover:text-[var(--v3-accent)]"
              >
                <span className="text-sm leading-snug text-[var(--v3-fg-2)] transition-colors group-hover:text-[var(--v3-accent)]">
                  {t(link.key)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

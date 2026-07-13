"use client";

import Link from "next/link";
import { Container, Section } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { V4_SITEMAP_COLUMNS } from "@/lib/v4/sitemapData";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The sitemap.
 *
 * Rendered from `V4_SITEMAP_COLUMNS`, which is V1's own sitemap mapped through `toV4()` — so this
 * page cannot list a route that does not exist, and cannot omit one that does, unless V1 has the
 * same bug. (AGENTS.md enforces both invariants on V1.)
 *
 * A group with an `href` renders as a link; a group without one renders as a plain heading. That
 * distinction is V1's data model, kept — it is what stops a heading pretending to be a destination.
 */
export default function SitemapContent() {
  const { t } = useV4();

  return (
    <Section space="lg">
      <Container width="wide">
        <h1 className="v4-h1">{t("sitemapTitle")}</h1>

        <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {V4_SITEMAP_COLUMNS.map((column, i) => (
            <Reveal key={column.key} as="nav" index={i} aria-labelledby={`v4-sm-${column.key}`}>
              <h2 id={`v4-sm-${column.key}`}>
                <Link href={column.href} className="v4-h3 hover:text-[var(--v4-accent)]">
                  {t(column.key)}
                </Link>
              </h2>

              <div className="mt-6 grid gap-7">
                {column.groups.map((group, gi) => (
                  <div key={group.key ?? `group-${gi}`}>
                    {group.key ? (
                      group.href ? (
                        <h3>
                          <Link href={group.href} className="v4-link !text-[0.9375rem]">
                            {t(group.key)}
                          </Link>
                        </h3>
                      ) : (
                        <h3 className="v4-label">{t(group.key)}</h3>
                      )
                    ) : null}

                    <ul className={`grid gap-2 ${group.key ? "mt-3" : ""}`}>
                      {group.links.map((link) => (
                        <li key={`${link.key}-${link.href}`}>
                          <Link
                            href={link.href}
                            className="text-[0.9375rem] leading-snug text-[var(--v4-fg-2)] transition-colors hover:text-[var(--v4-accent)]"
                          >
                            {t(link.key)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

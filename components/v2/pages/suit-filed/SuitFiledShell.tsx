"use client";

import type { ReactNode } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import SideNav from "@/components/v2/ui/SideNav";

/**
 * The five destinations of the suit-filed / RBI section, in V1's order. Same keys V1's own
 * `SuitFiledSideNav` uses — the sitemap already reuses them too, so the section reads the same
 * whichever door you come in through. `toV2()` keeps every link inside V2.
 */
const SECTION_LINKS: { key: TranslationKey; href: string }[] = [
  { key: "suitFiledSideOverview", href: "/suit-filed-cases/overview" },
  { key: "suitFiledSideGist", href: "/suit-filed-cases/gist-rbi-scheme" },
  { key: "suitFiledSideSuit", href: "/suit-filed-cases/suit-filed-cases" },
  { key: "suitFiledSideNonSuit", href: "/suit-filed-cases/non-suit-filed-cases" },
  { key: "suitFiledSideRbi", href: "/external-links/rbi-notifications" },
];

/**
 * The shell the four suit-filed pages share.
 *
 * Four pages, one identity: the same eyebrow, the same deep-cyan hero, the same left rail — so
 * moving between them feels like turning a page rather than landing on another site. The rail
 * carries the section nav always, and an in-page table of contents underneath it on the two
 * pages long enough to need one.
 */
export default function SuitFiledShell({
  title,
  docRail,
  children,
}: {
  /** Pre-translated page title — becomes the h1 and the last breadcrumb. */
  title: string;
  /** In-page table of contents, rendered under the section nav. */
  docRail?: ReactNode;
  children: ReactNode;
}) {
  const { t } = useV2();

  return (
    <>
      <PageHero
        eyebrow={t("footerCorpSuitFiledHeading")}
        title={title}
        breadcrumbs={[
          { label: t("footerCorpSuitFiledHeading"), href: toV2("/suit-filed-cases/overview") },
          { label: title },
        ]}
        tone="deep"
        size="sm"
      />

      <Section space="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
            {/* The sticky lives on the column, so the section nav and the table of contents travel
                together as one rail. (SideNav and DocRail each declare `lg:sticky` of their own;
                inside an already-pinned parent that is a no-op, which is why they can be composed
                here without either of them needing to know about the other.) */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SideNav
                links={SECTION_LINKS.map((link) => ({ label: t(link.key), href: toV2(link.href) }))}
              />

              {docRail && (
                <>
                  <hr className="v2-hairline my-8" />
                  {docRail}
                </>
              )}
            </div>

            {children}
          </div>
        </Container>
      </Section>
    </>
  );
}

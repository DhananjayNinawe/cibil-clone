"use client";

import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { RBI_CIRCULARS } from "@/lib/footerPageData";
import Badge from "@/components/v2/ui/Badge";
import PageHero from "@/components/v2/ui/PageHero";
import SideNav, { type SideNavLink } from "@/components/v2/ui/SideNav";
import { Container, Eyebrow, Section } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import { useSpotlight } from "@/lib/v2/motion";
import { DocumentIcon } from "@/components/icons";

/** The same section nav V1 shares across the suit-filed cluster, pointed at V2. */
const SECTION_LINKS: { key: TranslationKey; href: string }[] = [
  { key: "suitFiledSideOverview", href: "/suit-filed-cases/overview" },
  { key: "suitFiledSideGist", href: "/suit-filed-cases/gist-rbi-scheme" },
  { key: "suitFiledSideSuit", href: "/suit-filed-cases/suit-filed-cases" },
  { key: "suitFiledSideNonSuit", href: "/suit-filed-cases/non-suit-filed-cases" },
  { key: "suitFiledSideRbi", href: "/external-links/rbi-notifications" },
];

/**
 * The circular library.
 *
 * V1 prints the nine circulars as a five-column bordered grid whose long titles are blue links to
 * "#" — a wall of underlines with no document on the other end. V2 keeps every field (serial,
 * category, full name, RBI reference, date) but re-cuts each row as a document card on a rail:
 * the name is the object, the reference and date are its metadata, and the category is a badge
 * you can scan a column of. No link is claimed where no document exists.
 */
export default function RbiNotificationsContent() {
  const { t, tv, language } = useV2();
  const circulars = RBI_CIRCULARS[language];

  const sectionLinks: SideNavLink[] = SECTION_LINKS.map((link) => ({
    label: t(link.key),
    href: toV2(link.href),
  }));

  return (
    <>
      <PageHero
        size="sm"
        tone="deep"
        eyebrow={t("aboutUsEyebrow")}
        title={t("rbiNotifTitle")}
        breadcrumbs={[{ label: t("footerRbiNotifications") }]}
      />

      <Section space="lg" tone="canvas">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
            <SideNav links={sectionLinks} />

            <div>
              <Reveal variant="fade">
                <Eyebrow index="01">{tv("v2DetailsLabel")}</Eyebrow>
              </Reveal>

              <ol className="mt-10 space-y-4">
                {circulars.map((circular, index) => (
                  <Reveal as="li" key={circular.sr} variant="up" delay={index * 60}>
                    <CircularCard circular={circular} />
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function CircularCard({ circular }: { circular: (typeof RBI_CIRCULARS)["en"][number] }) {
  const { t } = useV2();
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className="v2-spotlight v2-rim group relative overflow-hidden rounded-[var(--v2-r-lg)] border border-[var(--v2-line)] bg-[var(--v2-surface)] p-6 backdrop-blur-md transition-[border-color,transform] duration-500 ease-[var(--v2-ease)] hover:-translate-y-0.5 hover:border-[rgba(0,176,240,0.4)] sm:p-7"
    >
      <div className="relative z-10 flex gap-5 sm:gap-7">
        {/* The serial is the rail's index — a numeral, not language. */}
        <div className="flex shrink-0 flex-col items-center gap-3">
          <span className="text-2xl font-light leading-none tabular-nums text-[var(--v2-text-3)] transition-colors duration-500 group-hover:text-[var(--v2-cyan)]">
            <span className="sr-only">{t("rbiColSrNo")} </span>
            {String(circular.sr).padStart(2, "0")}
          </span>
          <span
            aria-hidden
            className="h-full w-px bg-linear-to-b from-[var(--v2-line-2)] to-transparent"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="cyan">
              <span className="sr-only">{t("rbiColCategory")}: </span>
              {circular.category}
            </Badge>
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v2-text-3)]">
              <DocumentIcon className="h-3.5 w-3.5 text-[var(--v2-text-3)]" />
              {t("rbiColCircular")}
            </span>
          </div>

          <h2 className="mt-4 text-[15px] font-bold leading-snug text-[var(--v2-text)] transition-colors duration-300 group-hover:text-[var(--v2-cyan-soft)] sm:text-base">
            {circular.name}
          </h2>

          <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3 border-t border-[var(--v2-line)] pt-4">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--v2-text-3)]">
                {t("rbiColReference")}
              </dt>
              <dd className="mt-1 text-sm text-[var(--v2-text-2)]">{circular.reference}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--v2-text-3)]">
                {t("rbiColDate")}
              </dt>
              <dd className="mt-1 whitespace-nowrap text-sm text-[var(--v2-text-2)]">
                {circular.date}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

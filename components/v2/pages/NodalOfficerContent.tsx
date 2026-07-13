"use client";

import { useMemo, useState } from "react";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { searchNodalOfficers } from "@/lib/nodalOfficerData";
import Callout from "@/components/v2/ui/Callout";
import DataTable from "@/components/v2/ui/DataTable";
import PageHero from "@/components/v2/ui/PageHero";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import { InlineLink } from "@/components/v2/pages/shared";
import { SearchIcon, CloseIcon } from "@/components/icons";

/**
 * Nodal officer list.
 *
 * The dataset is V1's (lib/nodalOfficerData.ts) and so is the filter — `searchNodalOfficers`
 * is imported, never re-implemented. What changes is the staging: the search is the hero's
 * one control, the results resolve as you type into the design system's table, and the empty
 * state is a lit search glyph rather than five grey bars.
 *
 * The "sample data" warning V1 prints is kept, verbatim and visible. These are placeholder
 * contacts; a reader must never mistake them for their bank's real grievance line.
 */
export default function NodalOfficerContent() {
  const { t, tv } = useV2();
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const results = useMemo(() => searchNodalOfficers(trimmed), [trimmed]);
  const hasResults = results.length > 0;

  return (
    <>
      <PageHero
        eyebrow={t("navGrievance")}
        title={t("nodalListHeading")}
        lede={t("nodalListSubtitle")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV2("/consumer-dispute-resolution") },
          { label: t("megaNodalOfficerList") },
        ]}
        tone="cyan"
        size="sm"
      >
        <div className="relative max-w-xl">
          <span aria-hidden className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--v2-cyan)]">
            <SearchIcon className="h-5 w-5" />
          </span>

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            aria-label={t("nodalListSearchPlaceholder")}
            placeholder={t("nodalListSearchPlaceholder")}
            className="v2-focus v2-glass h-14 w-full rounded-full pl-14 pr-12 text-[15px] text-[var(--v2-text)] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[var(--v2-text-3)] focus:border-[var(--v2-cyan)] focus:shadow-[var(--v2-glow-cyan)] [&::-webkit-search-cancel-button]:hidden"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("searchClear")}
              className="v2-focus absolute right-5 top-1/2 -translate-y-1/2 text-[var(--v2-text-3)] transition-colors hover:text-[var(--v2-text)]"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </PageHero>

      {/* Results ---------------------------------------------------------------- */}
      <Section space="md" tone="canvas">
        <Container>
          {hasResults ? (
            <div>
              {/* aria-live so a screen-reader user hears the count change as they type. */}
              <p aria-live="polite" className="v2-eyebrow text-[var(--v2-cyan)]">
                <span className="tabular-nums">{results.length}</span>{" "}
                {results.length === 1 ? t("nodalResultsCountOne") : t("nodalResultsCount")}
              </p>

              <div className="mt-6">
                <DataTable
                  caption={t("nodalListHeading")}
                  columns={[
                    t("nodalColInstitution"),
                    t("nodalColCity"),
                    t("nodalColEmail"),
                    t("nodalColPhone"),
                  ]}
                  rows={results.map((officer) => [
                    // Institution names and contact details are proper nouns and tokens.
                    <strong key="institution">{officer.institution}</strong>,
                    officer.city,
                    <InlineLink key="email" href={`mailto:${officer.email}`}>
                      {officer.email}
                    </InlineLink>,
                    <span key="phone" className="whitespace-nowrap">
                      {officer.phone}
                    </span>,
                  ])}
                />
              </div>

              <div className="mt-6">
                <Callout tone="warning">{t("nodalSampleNote")}</Callout>
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </Container>
      </Section>

      {/* Points to note ---------------------------------------------------------- */}
      <Section space="lg" tone="raised">
        <Container width="narrow">
          <SectionHeading eyebrow={tv("v2KeyPoints")} title={t("pointsToNoteHeading")} />

          <ul className="mt-10 space-y-6">
            <Reveal as="li" variant="up" className="flex gap-4">
              <Bullet />
              <p className="text-sm leading-relaxed text-[var(--v2-text-2)]">{t("nodalPoint1")}</p>
            </Reveal>

            <Reveal as="li" variant="up" delay={90} className="flex gap-4">
              <Bullet />
              <div className="min-w-0">
                <p className="text-sm leading-relaxed text-[var(--v2-text-2)]">{t("nodalPoint2")}</p>
                <ul className="mt-3 space-y-2 border-l border-[var(--v2-line)] pl-5">
                  <li className="text-sm leading-relaxed text-[var(--v2-text-3)]">{t("nodalSubPoint1")}</li>
                  <li className="text-sm leading-relaxed text-[var(--v2-text-3)]">{t("nodalSubPoint2")}</li>
                </ul>
              </div>
            </Reveal>

            <Reveal as="li" variant="up" delay={180} className="flex gap-4">
              <Bullet />
              <p className="text-sm leading-relaxed text-[var(--v2-text-2)]">
                {t("nodalPoint3Prefix")}{" "}
                <InlineLink href={toV2("/consumer-dispute-resolution")}>{t("disputeClickHere")}</InlineLink>
              </p>
            </Reveal>
          </ul>
        </Container>
      </Section>
    </>
  );

  function EmptyState() {
    return (
      <Reveal variant="fade" className="flex flex-col items-center py-14 text-center">
        <span
          aria-hidden
          className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[var(--v2-line)] bg-[var(--v2-surface)]"
        >
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,176,240,0.18),transparent_70%)] blur-md" />
          <SearchIcon className="relative h-10 w-10 text-[var(--v2-cyan)]" />
        </span>

        {trimmed && (
          <p aria-live="polite" className="mt-8 text-sm text-[var(--v2-text-2)]">
            {t("nodalNoMatch")} <span className="font-bold text-[var(--v2-text)]">“{trimmed}”</span>
          </p>
        )}
      </Reveal>
    );
  }
}

function Bullet() {
  return (
    <span
      aria-hidden
      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.8)]"
    />
  );
}

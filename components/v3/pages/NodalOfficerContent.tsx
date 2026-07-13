"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { searchNodalOfficers } from "@/lib/nodalOfficerData";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Ledger from "@/components/v3/ui/Ledger";
import Callout from "@/components/v3/ui/Callout";
import { TextField } from "@/components/v3/ui/Field";
import Rule from "@/components/v3/ui/Rule";
import { Close, Search } from "@/components/v3/ui/Icons";

/**
 * The nodal officer register.
 *
 * This page is a lookup, so V3 sets it as one: a ruled search line, a count in the mono voice,
 * and the result as a ledger — horizontal rules only, the institution in ink, the phone number
 * right-aligned as a figure. The register itself is V1's (`lib/nodalOfficerData.ts`), imported,
 * never copied, including the notice that the contact details in this repo are placeholders.
 *
 * Before a query is typed there is nothing to show, and the page says so with an empty plate
 * rather than a spinner or a wall of every row — the same empty state V1 draws, ruled.
 */
export default function NodalOfficerContent() {
  const { t, t3 } = useV3();
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const results = useMemo(() => searchNodalOfficers(trimmed), [trimmed]);
  const hasResults = results.length > 0;

  const rows = results.map((officer) => [
    officer.institution,
    officer.city,
    <a
      key={officer.email}
      href={`mailto:${officer.email}`}
      className="v3-focus v3-link text-[var(--v3-fg-2)]"
    >
      {officer.email}
    </a>,
    <span key={officer.phone} className="whitespace-nowrap">
      {officer.phone}
    </span>,
  ]);

  return (
    <>
      <PageHeader
        folio={t("megaNodalOfficerList")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("navGrievance"), href: toV3("/consumer-dispute-resolution") },
          { label: t("megaNodalOfficerList") },
        ]}
        title={[t("nodalListHeading")]}
        lede={t("nodalListSubtitle")}
      />

      {/* The search line. A rule you write on — no box, no rounded input. */}
      <Section space="md">
        <Container>
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div className="relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute bottom-3 left-0 text-base text-[var(--v3-fg-3)]"
              />

              <TextField
                label={t("nodalColInstitution")}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("nodalListSearchPlaceholder")}
                autoComplete="off"
                className="[&_input]:pl-8"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={t("searchClear")}
                  className="v3-focus absolute right-0 bottom-2.5 text-[var(--v3-fg-3)] transition-colors hover:text-[var(--v3-fg)]"
                >
                  <Close className="text-sm" />
                </button>
              )}
            </div>

            {hasResults && (
              <p className="v3-num text-xs tracking-[0.08em] text-[var(--v3-fg-3)] lg:pb-3 lg:text-right">
                {results.length}{" "}
                {results.length === 1 ? t("nodalResultsCountOne") : t("nodalResultsCount")}
              </p>
            )}
          </div>

          {hasResults ? (
            <div className="mt-12">
              <Ledger
                caption={t("nodalListHeading")}
                columns={[
                  t("nodalColInstitution"),
                  t("nodalColCity"),
                  t("nodalColEmail"),
                  t("nodalColPhone"),
                ]}
                rows={rows}
                numericFrom={3}
              />

              <Callout tone="warning" title={t3("v3KeyPoints")} className="mt-10 max-w-[70ch]">
                <p>{t("nodalSampleNote")}</p>
              </Callout>
            </div>
          ) : (
            /* The empty state: a stack of blank rules with nothing written on them. */
            <div className="mt-14 flex flex-col items-center gap-4 border-t border-[var(--v3-line)] py-16">
              <Rule still className="w-40 max-w-full" />
              <Rule still className="w-56 max-w-full" />

              <Search aria-hidden className="my-3 text-4xl text-[var(--v3-line-2)]" />

              <Rule still className="w-56 max-w-full" />
              <Rule still className="w-40 max-w-full" />

              {trimmed && (
                <p className="mt-6 text-sm text-[var(--v3-fg-2)]">
                  {t("nodalNoMatch")} <span className="font-medium text-[var(--v3-fg)]">{trimmed}</span>
                </p>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* The standing instructions. They stay on the page whether or not a search has run. */}
      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead index="01" folio={t3("v3KeyPoints")} title={t("pointsToNoteHeading")} />

          <ol className="mt-12 border-t border-[var(--v3-line-3)]">
            <li className="grid gap-x-8 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[3rem_1fr]">
              <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
                {"01"}
              </span>
              <p className="max-w-[68ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                {t("nodalPoint1")}
              </p>
            </li>

            <li className="grid gap-x-8 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[3rem_1fr]">
              <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
                {"02"}
              </span>

              <div className="min-w-0">
                <p className="max-w-[68ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                  {t("nodalPoint2")}
                </p>

                <ul className="mt-4 border-t border-[var(--v3-line)]">
                  <li className="border-b border-[var(--v3-line)] py-3 text-sm leading-relaxed text-[var(--v3-fg-2)]">
                    {t("nodalSubPoint1")}
                  </li>
                  <li className="py-3 text-sm leading-relaxed text-[var(--v3-fg-2)]">
                    {t("nodalSubPoint2")}
                  </li>
                </ul>
              </div>
            </li>

            <li className="grid gap-x-8 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[3rem_1fr]">
              <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
                {"03"}
              </span>
              <p className="max-w-[68ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                {t("nodalPoint3Prefix")}{" "}
                <Link
                  href={toV3("/consumer-dispute-resolution")}
                  className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
                >
                  {t("disputeClickHere")}
                </Link>
              </p>
            </li>
          </ol>
        </Container>
      </Section>
    </>
  );
}

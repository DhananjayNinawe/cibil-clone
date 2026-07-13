"use client";

import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState } from "react";
import PageHero from "@/components/v4/ui/PageHero";
import Notice from "@/components/v4/ui/Notice";
import { Ledger, type Column } from "@/components/v4/ui/Ledger";
import { Button } from "@/components/v4/ui/Button";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { CloseIcon, SearchIcon } from "@/components/v4/ui/Icons";
import { NODAL_OFFICERS, searchNodalOfficers, type NodalOfficer } from "@/lib/nodalOfficerData";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The nodal officer register.
 *
 * V1 opens this page on a blank slate: an illustration of an empty search box, and nothing else,
 * until you type. That is a search UI treating its own dataset as a secret — a reader who does not
 * know whether their lender is even listed has no way to find out except by guessing at spellings.
 *
 * So V4 shows the register. The field *filters* it rather than summoning it: type and the table
 * narrows; clear the field and every institution is back. `searchNodalOfficers()` is the same
 * matcher V1 uses, so the results are identical for any query that returns any.
 *
 * The empty state is therefore the one that actually matters — *your bank is not in this list* —
 * and it is designed rather than defaulted: it names what was searched for, and it offers the two
 * things a reader in that position can still do (clear the filter, or go and raise the dispute with
 * CIBIL directly).
 *
 * The row count is announced. A filter that silently rewrites a table below a text field is a
 * filter a screen-reader user cannot tell is working, which is why the count sits in a polite live
 * region wired to the input through `aria-describedby`.
 */
export default function NodalOfficerContent() {
  const { t, t4 } = useV4();
  const [query, setQuery] = useState("");
  const inputId = useId();
  const countId = `${inputId}-count`;

  // The register is small enough to filter on every keystroke, but deferring keeps the field's own
  // repaint ahead of the table's — the caret never lags behind the typing.
  const deferred = useDeferredValue(query);
  const trimmed = deferred.trim();

  const rows = useMemo(
    () => (trimmed ? searchNodalOfficers(trimmed) : NODAL_OFFICERS),
    [trimmed],
  );

  const columns: Column<NodalOfficer>[] = [
    {
      key: "institution",
      header: t("nodalColInstitution"),
      // The institution name is the row's subject, so it carries the row's weight.
      render: (row) => <span className="font-bold text-[var(--v4-fg)]">{row.institution}</span>,
    },
    { key: "city", header: t("nodalColCity"), render: (row) => row.city },
    {
      key: "email",
      header: t("nodalColEmail"),
      render: (row) => (
        <a href={`mailto:${row.email}`} className="v4-link break-words">
          {row.email}
        </a>
      ),
    },
    { key: "phone", header: t("nodalColPhone"), numeric: true, render: (row) => row.phone },
  ];

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navGrievance"), href: toV4("/consumer-dispute-resolution") }}
        label={t("megaNodalOfficerList")}
        title={t("nodalListHeading")}
        lede={t("nodalListSubtitle")}
        aside={
          <div className="v4-plane p-6 sm:p-8">
            {/* A real `<label>`, not a placeholder pretending to be one: a placeholder disappears
                the moment the reader types, and is not announced as the field's name. V1's own
                column header — "Bank / Financial Institution" — is exactly what this field wants,
                and its placeholder ("E.g Bank of Baroda") goes back to being an example. */}
            <label htmlFor={inputId} className="v4-label">
              {t("nodalColInstitution")}
            </label>

            <div className="relative mt-3">
              <SearchIcon
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--v4-fg-3)]"
              />
              <input
                id={inputId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("nodalListSearchPlaceholder")}
                autoComplete="off"
                aria-describedby={countId}
                className="v4-input pl-11 pr-11"
              />
              {query ? (
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={t("searchClear")}
                  onClick={() => setQuery("")}
                  className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 !px-2"
                >
                  <CloseIcon size={16} />
                </Button>
              ) : null}
            </div>

            {/* Polite, not assertive: the reader is mid-word, and an assertive region would
                interrupt them on every keystroke. */}
            <p id={countId} role="status" aria-live="polite" className="v4-caption mt-3">
              <span className="v4-num">{rows.length}</span>{" "}
              {rows.length === 1 ? t("nodalResultsCountOne") : t("nodalResultsCount")}
            </p>
          </div>
        }
      />

      {/* ── The register ────────────────────────────────────────────────────────────────────── */}
      <Section space="md" aria-labelledby="v4-register-heading">
        <Container>
          <h2 id="v4-register-heading" className="v4-sr">
            {t("nodalListHeading")}
          </h2>

          {rows.length > 0 ? (
            <Reveal>
              <Ledger
                caption={t("nodalListHeading")}
                columns={columns}
                rows={rows}
                rowKey={(row) => row.institution}
              />
            </Reveal>
          ) : (
            <Reveal variant="focus" className="v4-plane px-6 py-16 text-center sm:py-20">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-[var(--v4-r-md)] border border-[var(--v4-edge-2)] bg-[var(--v4-surface-2)] text-[var(--v4-fg-3)]">
                <SearchIcon size={24} />
              </span>

              <h3 className="v4-h3 mt-6">{t("nodalNoMatch")}</h3>
              {/* The query itself, quoted back — a reader who mistyped their bank's name can only
                  see the typo if we show them what we searched for. */}
              <p className="v4-num mt-2 text-[0.9375rem] text-[var(--v4-fg-2)]">
                {`“${trimmed}”`}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button variant="secondary" onClick={() => setQuery("")}>
                  {t("searchClear")}
                </Button>
              </div>

              <p className="v4-caption mx-auto mt-6 max-w-md">{t4("v4NoMatchesHint")}</p>
            </Reveal>
          )}

          {/* The dataset in this repo is a stand-in. Saying so, above the fold of the table rather
              than in grey text under it, beats letting a reader dial a placeholder number in the
              belief that it is their bank's grievance line. */}
          <Reveal index={1} className="mt-6">
            <Notice tone="warning">{t("nodalSampleNote")}</Notice>
          </Reveal>
        </Container>
      </Section>

      {/* ── What to have ready ──────────────────────────────────────────────────────────────── */}
      <Section tone="tint" aria-labelledby="v4-notes-heading">
        <Container width="text">
          <SectionHead id="v4-notes-heading" title={t("pointsToNoteHeading")} />

          <div className="v4-prose mt-8">
            <ul>
              <li>{t("nodalPoint1")}</li>
              <li>
                {t("nodalPoint2")}
                <ul className="mt-2">
                  <li>{t("nodalSubPoint1")}</li>
                  <li>{t("nodalSubPoint2")}</li>
                </ul>
              </li>
              <li>
                {t("nodalPoint3Prefix")}{" "}
                <Link href={toV4("/consumer-dispute-resolution")} className="v4-link">
                  {t("disputeClickHere")}
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}

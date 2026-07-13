"use client";

import SuitFiledNav from "@/components/v4/pages/SuitFiledNav";
import PageHero from "@/components/v4/ui/PageHero";
import { Container, Section } from "@/components/v4/ui/Layout";
import { Ledger, type Column } from "@/components/v4/ui/Ledger";
import { RBI_CIRCULARS, type RbiCircular } from "@/lib/footerPageData";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The RBI circulars that govern credit-information reporting.
 *
 * This is a *register*, not a document: nine rows, each a circular with a category, a reference
 * number and a date. So it is a real `<table>` — a <Ledger>, with a caption, `<th scope>` on every
 * header and a focusable scroll container, because a table that overflows inside a plain
 * `overflow-x: auto` div cannot be scrolled by a keyboard at all.
 *
 * The reference number is the thing a reader actually came for — it is what they will paste into a
 * search, quote to a bank, or cite in a complaint — so it is drawn in the mono face at full ink
 * weight, and it never wraps. The serial number and the date are `numeric` columns: right-aligned
 * tabular figures, so a column of dates lines up and can be read *down*.
 *
 * ── Why the circular names are not links ────────────────────────────────────────────────────────
 * `RbiCircular` has no `url` field: the data carries a name, a reference and a date, and nothing
 * else. V1 renders each name as `<a href="#">` — a link that looks like a way to the PDF and goes
 * nowhere. V4 does not ship dead links, and the alternative (guessing an rbi.org.in URL from the
 * reference number) would be inventing a fact about a regulator's document, which is worse than a
 * missing link. So the names are text until the data has somewhere real to point.
 */
export default function RbiNotificationsContent() {
  const { t, language } = useV4();

  const columns: Column<RbiCircular>[] = [
    {
      key: "sr",
      header: t("rbiColSrNo"),
      numeric: true,
      render: (circular) => circular.sr,
    },
    {
      key: "category",
      header: t("rbiColCategory"),
      render: (circular) => <span className="v4-chip">{circular.category}</span>,
    },
    {
      key: "name",
      header: t("rbiColCircular"),
      render: (circular) => (
        <span className="block min-w-[22rem] font-semibold text-[var(--v4-fg)]">
          {circular.name}
        </span>
      ),
    },
    {
      key: "reference",
      header: t("rbiColReference"),
      render: (circular) => (
        <span className="v4-num whitespace-nowrap text-[var(--v4-fg)]">{circular.reference}</span>
      ),
    },
    {
      key: "date",
      header: t("rbiColDate"),
      numeric: true,
      render: (circular) => <span className="whitespace-nowrap">{circular.date}</span>,
    },
  ];

  return (
    <>
      <PageHero
        label={t("footerCorpSuitFiledHeading")}
        title={t("rbiNotifTitle")}
        breadcrumb={{
          label: t("footerCorpSuitFiledHeading"),
          href: toV4("/suit-filed-cases/overview"),
        }}
      />

      <SuitFiledNav current="suitFiledSideRbi" />

      <Section space="md">
        <Container width="wide">
          <Ledger
            caption={t("rbiNotifTitle")}
            columns={columns}
            rows={RBI_CIRCULARS[language]}
            rowKey={(circular) => String(circular.sr)}
          />
        </Container>
      </Section>
    </>
  );
}

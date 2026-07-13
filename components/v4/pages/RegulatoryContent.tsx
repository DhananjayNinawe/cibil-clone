"use client";

import { Ledger, type Column } from "@/components/v4/ui/Ledger";
import { Container, Section } from "@/components/v4/ui/Layout";
import Notice from "@/components/v4/ui/Notice";
import { Reveal } from "@/components/v4/motion/Reveal";
import { useV4 } from "@/lib/v4/useV4";

/**
 * A row of the disclosure schedule.
 *
 * The type exists, and the table is rendered with its real columns, but there are **no rows** —
 * because the source document runs to roughly a thousand of them and none is in this codebase.
 * V1's page says so in the catalog's own words (`sectionContentComingSoon`) and points the reader
 * at the official site; V4 says exactly the same thing and does not invent a single line of a
 * regulatory filing to fill the gap.
 */
interface DisclosureRow {
  srNo: string;
  particulars: string;
  details: string;
}

/**
 * Regulatory Disclosure — a document, so it is set like one.
 *
 * No hero, no bands, no aside: one column, one heading, the intent stated at the top and the
 * schedule beneath it. Legal text earns its authority from legibility, not from art direction, and
 * a filing made under the Credit Information Companies (Regulation) Act is not the place for a
 * plane that lifts on hover.
 */
export default function RegulatoryContent() {
  const { t } = useV4();

  const columns: Column<DisclosureRow>[] = [
    { key: "srNo", header: t("regulatoryColSrNo"), numeric: true, render: (row) => row.srNo },
    { key: "particulars", header: t("regulatoryColParticulars"), render: (row) => row.particulars },
    { key: "details", header: t("regulatoryColDetails"), render: (row) => row.details },
  ];

  return (
    <Section space="lg">
      <Container>
        <p className="v4-label">
          <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
          <span className="ml-2.5">{t("navAbout")}</span>
        </p>

        <h1 className="v4-h1 mt-4">{t("regulatoryTitle")}</h1>

        <div className="v4-prose mt-6">
          <p>{t("regulatoryIntro")}</p>
        </div>

        <Reveal variant="fade" className="mt-12">
          <Ledger<DisclosureRow>
            caption={t("regulatoryTitle")}
            columns={columns}
            rows={[]}
            rowKey={(row) => row.srNo}
          />

          <Notice tone="info" className="mt-4">
            {t("sectionContentComingSoon")}
          </Notice>
        </Reveal>
      </Container>
    </Section>
  );
}

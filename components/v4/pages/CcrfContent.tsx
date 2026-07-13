"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Disclosure, DisclosureList } from "@/components/v4/ui/Disclosure";
import { Ledger, type Column } from "@/components/v4/ui/Ledger";
import PageHero from "@/components/v4/ui/PageHero";
import { FaqBody, type FaqGroup } from "@/components/v4/faq/FaqShell";
import RelatedTopics from "@/components/v4/faq/RelatedTopics";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

const HREF = toV4("/faq/company-credit-report");

/**
 * `/v4/faq/company-credit-report` — the CIBIL Rank and the Company Credit Report.
 *
 * The whole page turns on one question: *how is a Rank different from a Score?* V1 answers it with a
 * 720×1100 JPEG of a comparison table. Every word of that comparison is already in the catalog, in
 * four languages (`ccrfDiffRank1…4`, `ccrfDiffScore1…4`) — and none of it reaches the reader,
 * because it is trapped in an image: English on the Tamil page, invisible to a screen reader,
 * unselectable, and a blur at 400% zoom.
 *
 * So V4 sets it as a real `<table>`, lifted out of the accordion and given its own section. It is
 * the most useful object on the page and it should not be behind a plus sign.
 */
export default function CcrfContent() {
  const { t } = useV4();

  const groups: FaqGroup[] = [
    {
      id: "rank-and-report",
      label: t("fcsFaqHeading"),
      content: (
        <DisclosureList>
          <Disclosure question={t("ccrfQ1")} defaultOpen>
            <p>{t("ccrfA1")}</p>
          </Disclosure>

          <Disclosure question={t("ccrfQ2")}>
            <p>{t("ccrfA2")}</p>
          </Disclosure>

          <Disclosure question={t("ccrfQ3")}>
            <p>{t("ccrfA3")}</p>
          </Disclosure>

          <Disclosure question={t("ccrfQ4")}>
            <p>
              {t("ccrfA4")}{" "}
              {/* V1's "Get Yours Now" here is an `href="#"`. It means enrolment, and enrolment is a
                  page. */}
              <Link href={toV4("/register")}>{t("ccrfA4Link")}</Link>
            </p>
          </Disclosure>

          <Disclosure question={t("ccrfQ5")}>
            <p>{t("ccrfA5")}</p>
          </Disclosure>
        </DisclosureList>
      ),
    },
    {
      id: "rank-versus-score",
      label: t("ccrfQ6"),
      content: <RankVersusScore />,
    },
    {
      id: "points-to-note",
      label: t("pointsToNoteHeading"),
      content: (
        <DisclosureList>
          <Disclosure question={t("ccrfQ7")}>
            <p>{t("ccrfA7")}</p>
          </Disclosure>

          <Disclosure question={t("ccrfQ8")}>
            <p>
              {t("ccrfA8Prefix")}{" "}
              <Link href={toV4("/company-dispute-resolution")}>{t("ccrfA8Link")}</Link>{" "}
              {t("ccrfA8Suffix")}
            </p>
          </Disclosure>
        </DisclosureList>
      ),
    },
  ];

  return (
    <>
      <PageHero
        tone="night"
        breadcrumb={{ label: t("filterUnderstandingCibil"), href: toV4("/faq-brochure") }}
        label={t("faqs")}
        title={t("ccrfHeroTitle")}
        actions={
          <ButtonLink href={toV4("/register")} size="lg" arrow>
            {t("getRankReportBtn")}
          </ButtonLink>
        }
        aside={<Offer />}
      />

      <FaqBody groups={groups} />

      <RelatedTopics
        current={HREF}
        actions={
          <>
            <ButtonLink href={toV4("/company-credit-report")} arrow>
              {t("megaCompanyCreditReport")}
            </ButtonLink>
            <ButtonLink href={toV4("/company-dispute-resolution")} variant="secondary" arrow>
              {t("megaCompanyDisputeResolution")}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}

/**
 * Rank versus Score, as a table.
 *
 * Four rows, two columns, `<th scope="col">` on each header and the whole thing in `Ledger`'s
 * focusable scroll container — so it can be compared *down* a column by eye and read *across* a row
 * by a screen reader, neither of which an image of a table can do.
 */
function RankVersusScore() {
  const { t } = useV4();

  interface Row {
    rank: TranslationKey;
    score: TranslationKey;
  }

  const rows: Row[] = [
    { rank: "ccrfDiffRank1", score: "ccrfDiffScore1" },
    { rank: "ccrfDiffRank2", score: "ccrfDiffScore2" },
    { rank: "ccrfDiffRank3", score: "ccrfDiffScore3" },
    { rank: "ccrfDiffRank4", score: "ccrfDiffScore4" },
  ];

  const columns: Column<Row>[] = [
    { key: "rank", header: t("ccrfDiffRankHeader"), render: (row) => t(row.rank) },
    { key: "score", header: t("ccrfDiffScoreHeader"), render: (row) => t(row.score) },
  ];

  return (
    <Ledger
      caption={t("ccrfQ6")}
      columns={columns}
      rows={rows}
      rowKey={(row) => row.rank}
      className="w-full"
    />
  );
}

/**
 * The MSME-day offer V1 runs at the top of this page.
 *
 * V1 pairs it with a live day/hour/minute countdown. V4 drops the clock and keeps the date: nothing
 * in this design system loops or ticks on a timer — a bureau that puts a countdown on a help page is
 * selling, not helping — and "*Valid till 31st July 2026" says the same thing without manufacturing
 * urgency at sixty frames a second.
 */
function Offer() {
  const { t } = useV4();

  return (
    <div className="v4-plane p-6 sm:p-7">
      <p className="v4-label">{t("ccrfLimitedOffer")}</p>

      {/* No gold rule under "25% off", tempting as it is: in V4 gold means *you* — your score, your
          plan, your place on a scale — and a discount is not you. Spend the marker on furniture and
          there is nothing left to point with. */}
      <p className="mt-4 text-[1.25rem] font-bold leading-snug text-[var(--v4-fg)]">
        {t("ccrfOfferPrefix")} {t("ccrfOfferPercent")} {t("ccrfOfferSuffix")}
      </p>

      <p className="mt-5 flex flex-wrap items-center gap-2.5">
        <span className="v4-label">{t("ccrfUseCode")}</span>
        <span className="v4-chip v4-num">{t("ccrfCode")}</span>
      </p>

      <p className="v4-caption mt-5 border-t border-[var(--v4-edge)] pt-4">{t("ccrfOfferValid")}</p>
    </div>
  );
}

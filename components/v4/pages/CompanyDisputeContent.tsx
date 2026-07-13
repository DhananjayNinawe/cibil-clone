"use client";

import PageHero from "@/components/v4/ui/PageHero";
import Notice from "@/components/v4/ui/Notice";
import Rail from "@/components/v4/ui/Rail";
import { Ledger, type Column } from "@/components/v4/ui/Ledger";
import { Step, Steps } from "@/components/v4/ui/Steps";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { BuildingIcon, MailIcon } from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Company dispute resolution.
 *
 * A different reader from the consumer pages: a finance person, at a desk, with the CCR open in
 * another window, checking whether the specific field they are looking at is one they are allowed
 * to challenge. They are not browsing. They are *looking something up*.
 *
 * So this page is built as a reference document rather than a narrative — a sticky rail down the
 * left listing the three kinds of dispute (which is what V1's "TYPES OF DISPUTES" sidebar wanted to
 * be, except that V1's is a decorative list that does not link anywhere), and the twenty-two
 * disputable fields set as a real two-column table instead of two bulleted lists floating beside
 * each other. A table, because the reader's question is "is my field in here", and a table is the
 * object that answers it.
 */

/** The eleven company-level fields and the eleven account-level ones, paired row by row. */
const FIELD_ROWS: { company: TranslationKey; account: TranslationKey }[] = [
  { company: "fieldCompanyName", account: "fieldCreditType" },
  { company: "fieldRegisteredAddress", account: "fieldAssetClassification" },
  { company: "fieldBranchAddress", account: "fieldSanctionDate" },
  { company: "fieldTelephoneNumbers", account: "fieldSanctionedAmount" },
  { company: "fieldPanCompany", account: "fieldCurrentBalance" },
  { company: "fieldPromoterDirector", account: "fieldBankRemark" },
  { company: "fieldRelationship", account: "fieldStatus" },
  { company: "fieldLegalConstitution", account: "fieldWillfulDefaulterDate" },
  { company: "fieldCity", account: "fieldSuitFiledStatus" },
  { company: "fieldState", account: "fieldDateOfSuit" },
  { company: "fieldPinCode", account: "fieldSuitAmount" },
];

export default function CompanyDisputeContent() {
  const { t } = useV4();

  const columns: Column<(typeof FIELD_ROWS)[number]>[] = [
    {
      key: "company",
      header: t("companyDetailsHeading"),
      render: (row) => t(row.company),
    },
    {
      key: "account",
      header: t("accountDetailsHeading"),
      render: (row) => t(row.account),
    },
  ];

  const sections = [
    { id: "company-account-details", label: t("sidebarCompanyAccountDetails") },
    { id: "ownership", label: t("sidebarOwnership") },
    { id: "duplicate-account", label: t("sidebarDuplicateAccount") },
    { id: "dispute-process", label: t("disputeProcessHeading") },
    { id: "raise-dispute", label: t("raiseDisputeBtn") },
  ];

  return (
    <>
      <PageHero
        tone="night"
        breadcrumb={{ label: t("navGrievance"), href: toV4("/consumer-dispute-resolution") }}
        label={t("megaGrievanceRedressalHeading")}
        title={t("companyDisputeHeroTitle")}
        lede={t("companyDisputeHeroDesc")}
        actions={
          <ButtonLink href="#raise-dispute" size="lg" arrow>
            {t("raiseDisputeBtn")}
          </ButtonLink>
        }
        aside={
          <div className="v4-plane p-6 sm:p-8">
            <h2 className="v4-label">{t("typesOfDisputesHeading")}</h2>
            <ol className="mt-5 grid gap-0">
              {[
                t("sidebarCompanyAccountDetails"),
                t("sidebarOwnership"),
                t("sidebarDuplicateAccount"),
              ].map((label, i) => (
                <li
                  key={label}
                  className="flex items-center gap-4 border-b border-[var(--v4-edge)] py-4 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="v4-num text-[0.8125rem] text-[var(--v4-fg-3)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-bold text-[var(--v4-fg)]">{label}</span>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <Section space="md">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
            {/* The reference apparatus. V1's sidebar names the three dispute types and links to
                none of them; this one is the document's own index and marks where you are. */}
            <Rail sections={sections} />

            <div className="min-w-0">
              <div className="v4-prose">
                <p>{t("companyDisputeIntro1")}</p>
                <p>{t("companyDisputeIntro2")}</p>
              </div>

              {/* ── 1. Company / account details ───────────────────────────────────────────── */}
              <div id="company-account-details" className="scroll-mt-28 pt-16">
                <h2 className="v4-h2">{t("companyDisputeSection1Heading")}</h2>
                <p className="v4-label mt-4">{t("fieldsDisputedLabel")}</p>

                <Reveal className="mt-6">
                  <Ledger
                    caption={t("fieldsDisputedLabel")}
                    columns={columns}
                    rows={FIELD_ROWS}
                    rowKey={(row) => row.company}
                  />
                </Reveal>
              </div>

              {/* ── 2. Ownership ───────────────────────────────────────────────────────────── */}
              <div id="ownership" className="scroll-mt-28 pt-16">
                <h2 className="v4-h2">{t("companyDisputeSection2Heading")}</h2>
                <p className="v4-body mt-4">{t("ownershipDesc")}</p>
              </div>

              {/* ── 3. Duplicate account ───────────────────────────────────────────────────── */}
              <div id="duplicate-account" className="scroll-mt-28 pt-16">
                <h2 className="v4-h2">{t("companyDisputeSection3Heading")}</h2>
                <p className="v4-body mt-4">{t("duplicateAccountDesc")}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── The process ─────────────────────────────────────────────────────────────────────── */}
      <Section
        id="dispute-process"
        tone="night"
        className="scroll-mt-28"
        aria-labelledby="v4-ccr-process-heading"
      >
        <Container>
          <SectionHead id="v4-ccr-process-heading" title={t("disputeProcessHeading")} />

          <div className="mt-12">
            <Steps>
              <Step n={1} title={t("submitFormLabel")} index={0} />
              <Step n={2} title={t("basedOnTypeLabel")} index={1} />
              <Step n={3} title={t("acceptsRejectsLabel")} index={2} />
              <Step n={4} title={t("ifAcceptedLabel")} index={3} />
            </Steps>
          </div>

          <Reveal className="mt-10">
            <p className="v4-num text-[0.9375rem] font-bold text-[var(--v4-fg)]">
              {t("turnaroundTimeLabel")}
            </p>
            <p className="v4-caption mt-2">{t("turnaroundFootnote")}</p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Raise it ────────────────────────────────────────────────────────────────────────── */}
      <Section id="raise-dispute" tone="tint" className="scroll-mt-28" aria-labelledby="v4-raise-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 id="v4-raise-heading" className="v4-h2">
                {t("easiestWayText")}
              </h2>
              <p className="v4-lede mt-4">{t("pleaseClickBoldText")}</p>

              {/* V1 puts this button on `href="#"`. The online dispute request is a request to
                  CIBIL, and the site's front door for one is contact-us. */}
              <ButtonLink href={toV4("/contact-us")} size="lg" arrow className="mt-8">
                {t("raiseDisputeBtn")}
              </ButtonLink>

              <Notice tone="success" className="mt-8">
                {t("commercialEntitiesNote")}
              </Notice>
            </div>

            <Reveal className="v4-plane p-6 sm:p-8">
              <p className="flex items-center gap-2.5 font-bold text-[var(--v4-fg)]">
                <MailIcon size={19} className="text-[var(--v4-accent)]" />
                {t("alternativelyWriteText")}
              </p>

              <p className="mt-5 flex items-start gap-3.5 border-t border-[var(--v4-edge)] pt-5 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                <BuildingIcon size={19} className="mt-0.5 shrink-0 text-[var(--v4-fg-3)]" />
                {t("companyDisputeAddress")}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

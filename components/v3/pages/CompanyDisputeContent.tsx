"use client";

import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, SectionHead, Folio } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Steps from "@/components/v3/ui/Steps";
import Callout from "@/components/v3/ui/Callout";
import MarginRail from "@/components/v3/ui/MarginRail";
import Rule from "@/components/v3/ui/Rule";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";

const HERO_IMAGE =
  "https://www.cibil.com/content/dam/cibil/consumer/P-TransUnion-CIBIL-Commercial-Credit-Information-Report-2hero-D-190816.jpg";

const COMPANY_FIELDS: TranslationKey[] = [
  "fieldCompanyName",
  "fieldRegisteredAddress",
  "fieldBranchAddress",
  "fieldTelephoneNumbers",
  "fieldPanCompany",
  "fieldPromoterDirector",
  "fieldRelationship",
  "fieldLegalConstitution",
  "fieldCity",
  "fieldState",
  "fieldPinCode",
];

const ACCOUNT_FIELDS: TranslationKey[] = [
  "fieldCreditType",
  "fieldAssetClassification",
  "fieldSanctionDate",
  "fieldSanctionedAmount",
  "fieldCurrentBalance",
  "fieldBankRemark",
  "fieldStatus",
  "fieldWillfulDefaulterDate",
  "fieldSuitFiledStatus",
  "fieldDateOfSuit",
  "fieldSuitAmount",
];

/**
 * Company dispute resolution.
 *
 * V1 gives the three dispute types a boxed sidebar; V3 gives them a margin rail, which is the same
 * information doing more work — it tracks the section you are actually reading, and it carries the
 * dispute process with it, so the whole document is navigable from the margin.
 *
 * The disputable fields are two ruled columns rather than two bulleted lists. They are not rows of
 * a table — a company field and an account field on the same line have nothing to do with each
 * other — so they are ruled independently, which is exactly how a schedule is set in a contract.
 */
export default function CompanyDisputeContent() {
  const { t, t3 } = useV3();

  const rail = [
    { id: "company-account-details", label: t("sidebarCompanyAccountDetails") },
    { id: "ownership", label: t("sidebarOwnership") },
    { id: "duplicate-account", label: t("sidebarDuplicateAccount") },
    { id: "dispute-process", label: t("disputeProcessHeading") },
  ];

  const fieldList = (heading: string, fields: TranslationKey[]) => (
    <div>
      <h3 className="v3-folio border-b border-[var(--v3-line-3)] pb-3 text-[var(--v3-fg)]">{heading}</h3>
      <ul>
        {fields.map((field) => (
          <li
            key={field}
            className="v3-row border-b border-[var(--v3-line)] py-3 text-sm text-[var(--v3-fg-2)]"
          >
            {t(field)}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <PageHeader
        folio={t("navGrievance")}
        title={t("companyDisputeHeroTitle")}
        lede={t("companyDisputeHeroDesc")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV3("/consumer-dispute-resolution") },
          { label: t("megaCompanyDisputeResolution") },
        ]}
        actions={
          <Button href="#raise-dispute" size="lg" arrow>
            {t("raiseDisputeBtn")}
          </Button>
        }
        media={<Plate src={HERO_IMAGE} alt="" ratio="16 / 10" fit="cover" priority />}
      />

      <Section space="md">
        <Container>
          <Folio index="01">{t3("v3AtAGlance")}</Folio>
          <div className="mt-8 grid gap-x-16 gap-y-6 lg:grid-cols-2">
            <p className="v3-lede text-pretty">{t("companyDisputeIntro1")}</p>
            <p className="v3-lede text-pretty">{t("companyDisputeIntro2")}</p>
          </div>
        </Container>
      </Section>

      <Section space="lg" ruled>
        <Container>
          <SectionHead index="02" folio={t3("v3DetailsLabel")} title={t("typesOfDisputesHeading")} />

          <div className="mt-14 grid gap-x-16 gap-y-16 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <MarginRail links={rail} />

            <div className="min-w-0">
              <article id="company-account-details" className="scroll-mt-32">
                <h2 className="v3-h3">{t("companyDisputeSection1Heading")}</h2>
                <p className="mt-3 text-sm text-[var(--v3-fg-2)]">{t("fieldsDisputedLabel")}</p>

                <div className="mt-8 grid gap-x-14 gap-y-12 sm:grid-cols-2">
                  {fieldList(t("companyDetailsHeading"), COMPANY_FIELDS)}
                  {fieldList(t("accountDetailsHeading"), ACCOUNT_FIELDS)}
                </div>
              </article>

              <article id="ownership" className="mt-20 scroll-mt-32 border-t border-[var(--v3-line)] pt-12">
                <h2 className="v3-h3">{t("companyDisputeSection2Heading")}</h2>
                <p className="mt-4 max-w-[62ch] text-pretty leading-relaxed text-[var(--v3-fg-2)]">
                  {t("ownershipDesc")}
                </p>
              </article>

              <article
                id="duplicate-account"
                className="mt-16 scroll-mt-32 border-t border-[var(--v3-line)] pt-12"
              >
                <h2 className="v3-h3">{t("companyDisputeSection3Heading")}</h2>
                <p className="mt-4 max-w-[62ch] text-pretty leading-relaxed text-[var(--v3-fg-2)]">
                  {t("duplicateAccountDesc")}
                </p>
              </article>

              <article
                id="dispute-process"
                className="mt-20 scroll-mt-32 border-t border-[var(--v3-line)] pt-12"
              >
                <h2 className="v3-h3">{t("disputeProcessHeading")}</h2>

                <Steps
                  className="mt-8"
                  steps={[
                    { title: t("submitFormLabel") },
                    { title: t("basedOnTypeLabel") },
                    { title: t("acceptsRejectsLabel") },
                    { title: t("ifAcceptedLabel") },
                    { title: t("turnaroundTimeLabel") },
                  ]}
                />

                <p className="v3-caption mt-6">{t("turnaroundFootnote")}</p>
              </article>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="raise-dispute" space="lg" tone="sunken" ruled className="scroll-mt-24">
        <Container>
          <Folio index="03">{t3("v3ProcessLabel")}</Folio>

          <div className="mt-10 grid gap-x-16 gap-y-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="min-w-0">
              <Reveal variant="rise">
                <h2 className="v3-h2 max-w-[18ch] text-balance">{t("pleaseClickBoldText")}</h2>
                <p className="v3-lede mt-6 max-w-[50ch] text-pretty">{t("easiestWayText")}</p>

                <Button href="#" size="lg" arrow className="mt-10">
                  {t("raiseDisputeBtn")}
                </Button>
              </Reveal>

              <Reveal variant="rise" delay={80} className="mt-12">
                <Callout tone="note">
                  <p className="text-base leading-relaxed text-[var(--v3-fg)]">
                    {t("commercialEntitiesNote")}
                  </p>
                </Callout>
              </Reveal>
            </div>

            <Reveal variant="rise" delay={120}>
              <div className="border-t border-[var(--v3-line-3)] pt-6">
                <p className="v3-folio">{t("addressLabel")}</p>
                <p className="mt-5 text-sm leading-relaxed text-[var(--v3-fg-2)]">
                  {t("alternativelyWriteText")}
                </p>
                <address className="mt-4 max-w-[34ch] text-base leading-relaxed font-medium text-[var(--v3-fg)] not-italic">
                  {t("companyDisputeAddress")}
                </address>
              </div>
            </Reveal>
          </div>

          <Rule className="mt-20" strong />
        </Container>
      </Section>
    </>
  );
}

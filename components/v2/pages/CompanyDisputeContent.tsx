"use client";

import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Backdrop from "@/components/v2/ui/Backdrop";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Card from "@/components/v2/ui/Card";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import { MapPinIcon } from "@/components/icons";

const HERO_IMAGE =
  "https://www.cibil.com/content/dam/cibil/consumer/P-TransUnion-CIBIL-Commercial-Credit-Information-Report-2hero-D-190816.jpg";

const DIAGRAM_IMAGE =
  "https://www.cibil.com/company-dispute-resolution/_jcr_content/root/contentcontainer/pagesection_1926118715/columnrow/contentcontainer_1176380365/image_1433632198.coreimg.75.1440.jpeg/1684946337019/dispute.jpeg";

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

/** The three dispute types V1 lists in its sidebar — here they are the page's spine. */
const TYPES: { id: string; key: TranslationKey }[] = [
  { id: "account-details", key: "sidebarCompanyAccountDetails" },
  { id: "ownership", key: "sidebarOwnership" },
  { id: "duplicate", key: "sidebarDuplicateAccount" },
];

/**
 * Company dispute resolution.
 *
 * V1 buries the three dispute types in a grey box floated beside the intro. Here that list
 * becomes the page's navigation: a sticky numbered rail on the left, with each type opening
 * onto its own titled band on the right — so the reader can see the whole taxonomy at once
 * and jump straight to the one that matches their report.
 */
export default function CompanyDisputeContent() {
  const { t, tv } = useV2();

  return (
    <>
      <PageHero
        eyebrow={t("navGrievance")}
        title={t("companyDisputeHeroTitle")}
        lede={t("companyDisputeHeroDesc")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV2("/consumer-dispute-resolution") },
          { label: t("megaCompanyDisputeResolution") },
        ]}
        tone="deep"
        actions={
          <Button href="#raise-dispute" size="lg" arrow magnetic>
            {t("raiseDisputeBtn")}
          </Button>
        }
        media={
          <Parallax speed={0.05}>
            <Plate src={HERO_IMAGE} alt="" width={720} height={480} surface="dark" priority />
          </Parallax>
        }
      />

      {/* Intro + the type rail ------------------------------------------------ */}
      <Section space="xl" tone="canvas">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
            <Reveal variant="up">
              <div className="v2-prose max-w-2xl text-[17px]">
                <p>{t("companyDisputeIntro1")}</p>
                <p>{t("companyDisputeIntro2")}</p>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120}>
              {/* lg:self-start — a stretched grid item cannot stick. */}
              <nav aria-label={t("typesOfDisputesHeading")} className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>{t("typesOfDisputesHeading")}</Eyebrow>

                <ol className="mt-7 border-t border-[var(--v2-line)]">
                  {TYPES.map((type, index) => (
                    <li key={type.id}>
                      <a
                        href={`#${type.id}`}
                        className="v2-focus group flex items-baseline gap-4 border-b border-[var(--v2-line)] py-5 transition-colors duration-300 hover:border-[rgba(0,176,240,0.45)]"
                      >
                        <span className="text-xs font-bold tabular-nums text-[var(--v2-text-3)] transition-colors group-hover:text-[var(--v2-cyan)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] font-bold text-[var(--v2-text-2)] transition-colors group-hover:text-[var(--v2-text)]">
                          {t(type.key)}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 1 — Company / account details ---------------------------------------- */}
      <Section id="account-details" space="lg" tone="raised">
        <Container>
          <SectionHeading
            index="01"
            eyebrow={tv("v2DetailsLabel")}
            title={t("companyDisputeSection1Heading")}
            lede={t("fieldsDisputedLabel")}
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <FieldColumn heading={t("companyDetailsHeading")} fields={COMPANY_FIELDS} delay={0} />
            <FieldColumn heading={t("accountDetailsHeading")} fields={ACCOUNT_FIELDS} delay={120} />
          </div>
        </Container>
      </Section>

      {/* 2 & 3 — Ownership and duplicates ------------------------------------- */}
      <Section space="lg" tone="canvas">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal variant="up" id="ownership">
              <Card padding="lg" spotlight className="h-full">
                <Eyebrow index="02">{t("sidebarOwnership")}</Eyebrow>
                <h2 className="v2-h3 mt-5 text-[var(--v2-text)]">{t("companyDisputeSection2Heading")}</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--v2-text-2)]">{t("ownershipDesc")}</p>
              </Card>
            </Reveal>

            <Reveal variant="up" delay={120} id="duplicate">
              <Card padding="lg" spotlight className="h-full">
                <Eyebrow index="03">{t("sidebarDuplicateAccount")}</Eyebrow>
                <h2 className="v2-h3 mt-5 text-[var(--v2-text)]">{t("companyDisputeSection3Heading")}</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--v2-text-2)]">{t("duplicateAccountDesc")}</p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The process diagram --------------------------------------------------- */}
      <Section space="lg" tone="deep" className="isolate overflow-hidden">
        <Backdrop tone="cyan" />

        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionHeading index="04" eyebrow={tv("v2ProcessLabel")} title={t("disputeProcessHeading")} />

            <Reveal variant="blur" delay={120}>
              <Plate
                src={DIAGRAM_IMAGE}
                alt={t("disputeProcessHeading")}
                width={1440}
                height={780}
                surface="light"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Raise it -------------------------------------------------------------- */}
      <Section id="raise-dispute" space="xl" tone="canvas">
        <Container width="narrow">
          <Reveal variant="up">
            <p className="v2-lede text-pretty">
              {t("easiestWayText")}{" "}
              <span className="font-bold text-[var(--v2-text)]">{t("pleaseClickBoldText")}</span>
            </p>
          </Reveal>

          <Reveal variant="up" delay={100} className="mt-9">
            <Button href="#" size="lg" arrow magnetic>
              {t("raiseDisputeBtn")}
            </Button>
          </Reveal>

          <Reveal variant="up" delay={180} className="mt-12">
            <Callout tone="success">{t("commercialEntitiesNote")}</Callout>
          </Reveal>

          <Reveal variant="up" delay={240} className="mt-8">
            <Card padding="lg" spotlight>
              <div className="flex gap-5">
                <span aria-hidden className="mt-1 shrink-0 text-[var(--v2-cyan)]">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm leading-relaxed text-[var(--v2-text-2)]">{t("alternativelyWriteText")}</p>
                  <address className="mt-3 not-italic text-base font-bold leading-relaxed text-[var(--v2-text)]">
                    {t("companyDisputeAddress")}
                  </address>
                </div>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  );

  function FieldColumn({
    heading,
    fields,
    delay,
  }: {
    heading: string;
    fields: TranslationKey[];
    delay: number;
  }) {
    return (
      <Reveal variant="up" delay={delay}>
        <Card padding="lg" spotlight className="h-full">
          <h3 className="text-base font-bold text-[var(--v2-cyan)]">{heading}</h3>

          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {fields.map((field) => (
              <li key={field} className="flex items-start gap-3 text-sm text-[var(--v2-text-2)]">
                <span
                  aria-hidden
                  className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.8)]"
                />
                {t(field)}
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    );
  }
}

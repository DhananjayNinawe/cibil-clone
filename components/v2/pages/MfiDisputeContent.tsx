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
import Steps from "@/components/v2/ui/Steps";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import { InlineLink, ContactTile, DISPUTE_DIAGRAM_IMAGE } from "@/components/v2/pages/shared";
import { CheckCircleIcon, MailIcon, HeadsetIcon, BankIcon, DocumentIcon } from "@/components/icons";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/dispute-new.png";

const STEPS_IMAGE =
  "https://www.cibil.com/microfinance-dispute-resolution/_jcr_content/root/contentcontainer/pagesection_83362557/contentcontainer/pagesectionwithbackg/image.coreimg.75.1440.jpeg/1756108892218/mfidisputeimg.jpeg";

const IMPORTANT_POINTS: TranslationKey[] = [
  "pointNoCorrection",
  "pointRbiGuidelines",
  "pointResolveWithin30",
  "disputeFreeServiceBanner",
];

/**
 * Microfinance dispute resolution.
 *
 * The page V1 assembles from four bands plus two borrowed from the consumer dispute page.
 * V2 keeps every one of those pieces and the same order, but gives the "how to get your MFI
 * report" block the shape it actually has — a numbered request-form procedure beside a single
 * contact card — instead of two equal boxes that hide which one is the sequence.
 */
export default function MfiDisputeContent() {
  const { t, tv } = useV2();

  const requestSteps = [
    {
      id: "s1",
      title: t("step1Label"),
      body: (
        <>
          {t("mfiRequestFormStep1")} <InlineLink href="#">{t("mfiRequestFormLink")}</InlineLink>.
        </>
      ),
    },
    { id: "s2", title: t("step2Label"), body: t("mfiRequestFormStep2") },
    { id: "s3", title: t("step3Label"), body: t("mfiRequestFormStep3") },
    { id: "s4", title: t("step4Label"), body: t("mfiRequestFormStep4") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("navGrievance")}
        title={t("mfiDisputeHeroTitle")}
        lede={t("mfiDisputeHeroDesc")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV2("/consumer-dispute-resolution") },
          { label: t("megaMfiDisputeResolution") },
        ]}
        tone="gold"
        actions={
          <Button href="#how-to-fix" size="lg" arrow magnetic>
            {t("disputeHeroBtn")}
          </Button>
        }
        media={
          <Parallax speed={0.05}>
            <Plate src={HERO_IMAGE} alt="" width={720} height={520} surface="light" priority />
          </Parallax>
        }
      >
        <Callout tone="warning">{t("mfiFreeServiceBanner")}</Callout>
      </PageHero>

      {/* How to fix ------------------------------------------------------------ */}
      <Section id="how-to-fix" space="xl" tone="canvas">
        <Container>
          <SectionHeading
            index="01"
            eyebrow={tv("v2ProcessLabel")}
            title={t("mfiHowToFixHeading")}
            lede={t("mfiFollowStepsHeading")}
          />

          <Reveal variant="blur" className="mt-14">
            <Plate src={STEPS_IMAGE} alt={t("mfiFollowStepsHeading")} width={1440} height={557} surface="light" />
          </Reveal>
        </Container>
      </Section>

      {/* Getting the report ---------------------------------------------------- */}
      <Section space="lg" tone="raised">
        <Container>
          <SectionHeading index="02" eyebrow={tv("v2DetailsLabel")} title={t("mfiGetReportHeading")} />

          <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
            <Reveal variant="up">
              <Card padding="lg" spotlight className="h-full">
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(0,176,240,0.12)] text-[var(--v2-cyan)]"
                >
                  <DocumentIcon className="h-6 w-6" />
                </span>
                <Steps className="mt-8" steps={requestSteps} layout="rail" />
              </Card>
            </Reveal>

            <Reveal variant="up" delay={120}>
              <ContactTile icon={<MailIcon className="h-6 w-6" />} title={t("writeToUsTitle")}>
                <p>{t("mfiWriteToUsEmail")}</p>
                <p>{t("mfiContactUsFaqLabel")}</p>
              </ContactTile>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What happens next ------------------------------------------------------ */}
      <Section space="lg" tone="deep" className="isolate overflow-hidden">
        <Backdrop tone="cyan" />

        <Container className="relative">
          <SectionHeading index="03" eyebrow={tv("v2AtAGlance")} title={t("disputeHappensHeading")} align="center" />

          <Reveal variant="blur" className="mt-14">
            <Card padding="lg" spotlight>
              <h3 className="v2-h3 text-center text-[var(--v2-text)]">{t("whatWeDoHeading")}</h3>

              <Plate
                src={DISPUTE_DIAGRAM_IMAGE}
                alt={t("whatWeDoHeading")}
                width={1440}
                height={720}
                surface="light"
                glow={false}
                className="mt-10"
              />

              <div className="mt-10 flex items-center justify-center gap-4">
                <span aria-hidden className="h-px w-10 bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.9)]" />
                <p className="max-w-2xl text-center text-xs leading-relaxed text-[var(--v2-text-3)]">
                  {t("diagTurnaroundTime")}
                </p>
                <span aria-hidden className="h-px w-10 bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.9)]" />
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Important points -------------------------------------------------------- */}
      <Section space="xl" tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionHeading index="04" eyebrow={tv("v2KeyPoints")} title={t("importantPointsHeading")} />

            <ul>
              {IMPORTANT_POINTS.map((point, index) => (
                <Reveal
                  as="li"
                  key={point}
                  variant="up"
                  delay={index * 90}
                  className="flex gap-5 border-t border-[var(--v2-line)] py-7 last:border-b"
                >
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--v2-cyan)]" />
                  <p className="text-sm leading-relaxed text-[var(--v2-text-2)]">{t(point)}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Ways to raise it -------------------------------------------------------- */}
      <Section space="lg" tone="raised">
        <Container>
          <SectionHeading index="05" eyebrow={tv("v2Explore")} title={t("waysToRaiseDisputeHeading")} />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal variant="up">
              <ContactTile
                icon={<MailIcon className="h-6 w-6" />}
                title={t("writeToUsTitle")}
                note={t("mfiWriteToUsNote")}
              >
                <p>
                  <InlineLink href={`mailto:${t("registeredOfficeEmail")}`}>{t("mfiWriteToUsEmail")}</InlineLink>
                </p>
              </ContactTile>
            </Reveal>

            <Reveal variant="up" delay={110}>
              <ContactTile
                icon={<HeadsetIcon className="h-6 w-6" />}
                title={t("callUsTitle")}
                note={t("mfiCallTimings")}
              >
                <p>{t("mfiHelplineNumber")}</p>
              </ContactTile>
            </Reveal>

            <Reveal variant="up" delay={220}>
              <ContactTile
                icon={<BankIcon className="h-6 w-6 text-white" />}
                title={t("visitUsTitle")}
                note={t("mfiVisitTimings")}
              >
                <address className="not-italic">{t("mfiVisitAddress")}</address>
              </ContactTile>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

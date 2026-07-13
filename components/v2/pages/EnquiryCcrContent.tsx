"use client";

import { useState, type ReactNode } from "react";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Backdrop from "@/components/v2/ui/Backdrop";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Card from "@/components/v2/ui/Card";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import { Container, Section, SectionHeading, Divider } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import { InlineLink, PlanPicker } from "@/components/v2/pages/shared";
import {
  HashIcon,
  QuestionIcon,
  CalendarIcon,
  PersonContactIcon,
  WarningTriangleIcon,
  MailIcon,
  CloseIcon,
} from "@/components/icons";

const HERO_IMAGE =
  "https://www.cibil.com/content/dam/cibil/consumer/enq26/rankenq/images/commercial-banner.jpg";

/**
 * Commercial enquiry — the CCR sibling of /v2/enquiry.
 *
 * Deliberately not the same page in different words: the consumer page leads with plans and
 * reassurance, this one leads with the alert itself. V1's dismissible notification bar becomes
 * the first thing inside the hero (a bar above the hero would sit behind V2's fixed header),
 * the glossary is set as a numbered definition rail rather than a card row, and the three
 * next steps point at the *company* dispute flow, as V1's do.
 */
export default function EnquiryCcrContent() {
  const { t, tv } = useV2();
  const [noticeOpen, setNoticeOpen] = useState(true);

  const terms = [
    { id: "won", icon: <HashIcon className="h-5 w-5" />, title: t("wonTitle"), desc: t("wonDesc") },
    {
      id: "purpose",
      icon: <QuestionIcon className="h-5 w-5" />,
      title: t("enquiryPurposeTitle"),
      desc: t("ccrEnquiryPurposeDesc"),
    },
    {
      id: "when",
      icon: <CalendarIcon className="h-5 w-5" />,
      title: t("enquiryDateTimeTitle"),
      desc: t("ccrEnquiryDateTimeDesc"),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("navGrievance")}
        title={t("ccrHeroTitle")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV2("/consumer-dispute-resolution") },
          { label: t("megaCommercialEnquiry") },
        ]}
        tone="gold"
        lede={
          <>
            <span className="block">{t("ccrHeroPara1")}</span>
            <span className="mt-3 block">{t("ccrHeroPara2")}</span>
          </>
        }
        actions={
          <Button href="#plans" size="lg" arrow magnetic>
            {t("ccrHeroBtn")}
          </Button>
        }
        media={
          <Parallax speed={0.05}>
            <Plate src={HERO_IMAGE} alt="" width={720} height={520} surface="dark" priority />
          </Parallax>
        }
      >
        <div className="space-y-4">
          {noticeOpen && (
            <div className="relative">
              <Callout tone="info" className="pr-12">
                {t("ccrNotificationBanner")}
              </Callout>
              <button
                type="button"
                onClick={() => setNoticeOpen(false)}
                aria-label={t("a11yDismiss")}
                className="v2-focus absolute right-4 top-4 text-[var(--v2-text-3)] transition-colors hover:text-[var(--v2-text)]"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          )}

          <Callout tone="warning">{t("disputeFreeServiceBanner")}</Callout>
        </div>
      </PageHero>

      {/* Plans -------------------------------------------------------------------- */}
      <Section id="plans" space="xl" tone="canvas">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="up">
              <SectionHeading
                index="01"
                eyebrow={tv("v2CtaKicker")}
                title={t("ccrHowCheckHeading")}
                lede={t("ccrHowCheckDesc")}
              />

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Button href={toV2("/register")} size="lg" arrow magnetic>
                  {t("getStartedBtn")}
                </Button>
                <p className="text-sm text-[var(--v2-text-2)]">
                  {t("alreadyHaveAccount")}{" "}
                  <InlineLink href={toV2("/login")}>{t("logInLink")}</InlineLink>
                </p>
              </div>
            </Reveal>

            <Reveal variant="right" delay={140}>
              <PlanPicker
                label={t("ccrHowCheckHeading")}
                recommendedLabel={t("recommendedBadge")}
                plans={[
                  {
                    id: "basic",
                    name: t("ccrPlanBasicName"),
                    desc: t("ccrPlanBasicDesc"),
                    price: t("ccrPlanBasicPrice"),
                    note: t("ccrPlanBasicPeriod"),
                    recommended: true,
                  },
                  {
                    id: "standard",
                    name: t("ccrPlanStandardName"),
                    desc: t("ccrPlanStandardDesc"),
                    price: t("ccrPlanStandardPrice"),
                    note: t("ccrPlanStandardPeriod"),
                  },
                  {
                    id: "premium",
                    name: t("ccrPlanPremiumName"),
                    desc: t("ccrPlanPremiumDesc"),
                    price: t("ccrPlanPremiumPrice"),
                    note: t("ccrPlanPremiumPeriod"),
                  },
                ]}
              />
            </Reveal>
          </div>

          <Reveal variant="fade" delay={100} className="mt-16">
            <Callout tone="info">{t("ccrRankExposureBanner")}</Callout>
          </Reveal>
        </Container>
      </Section>

      {/* Key terms ---------------------------------------------------------------- */}
      <Section space="lg" tone="deep" className="isolate overflow-hidden">
        <Backdrop tone="cyan" />

        <Container className="relative">
          <SectionHeading index="02" eyebrow={tv("v2KeyPoints")} title={t("learnKeyTermsHeading")} />

          <ul className="mt-14">
            {terms.map((term, index) => (
              <Reveal as="li" key={term.id} variant="up" delay={index * 110}>
                {index > 0 && <Divider />}
                <div className="grid gap-4 py-8 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.4fr)] sm:items-baseline sm:gap-10">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(0,176,240,0.12)] text-[var(--v2-cyan)]"
                  >
                    {term.icon}
                  </span>
                  <h3 className="text-base font-bold text-[var(--v2-text)]">{term.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--v2-text-2)]">{term.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Don't recognise it? -------------------------------------------------------- */}
      <Section space="xl" tone="canvas">
        <Container>
          <SectionHeading index="03" eyebrow={tv("v2ProcessLabel")} title={t("dontRecogniseHeading")} />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Step
              delay={0}
              icon={<PersonContactIcon className="h-5 w-5 text-[var(--v2-cyan)]" />}
              title={t("pnoTitle")}
            >
              {t("pnoDesc")} <InlineLink href={toV2("/nodal-officer-list")}>{t("hereLowercase")}</InlineLink>
            </Step>

            <Step
              delay={110}
              icon={<WarningTriangleIcon className="h-5 w-5 text-[var(--v2-cyan)]" />}
              title={t("initiateDisputeTitle")}
            >
              {t("raiseDisputeCibilDesc")}{" "}
              <InlineLink href={toV2("/company-dispute-resolution")}>{t("clickHereBold")}</InlineLink>
            </Step>

            <Step
              delay={220}
              icon={<MailIcon className="h-5 w-5 text-[var(--v2-cyan)]" />}
              title={t("needHelpTitle")}
            >
              {t("needHelpDescPrefix")}{" "}
              <InlineLink href={toV2("/contact-us")}>{t("disputeClickHere")}</InlineLink>{" "}
              {t("needHelpDescSuffix")}
            </Step>
          </div>
        </Container>
      </Section>
    </>
  );

  function Step({
    icon,
    title,
    children,
    delay,
  }: {
    icon: ReactNode;
    title: string;
    children: ReactNode;
    delay: number;
  }) {
    return (
      <Reveal variant="up" delay={delay}>
        <Card padding="lg" spotlight interactive className="h-full">
          <span
            aria-hidden
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--v2-line)] bg-[var(--v2-surface)]"
          >
            {icon}
          </span>
          <h3 className="mt-6 text-base font-bold text-[var(--v2-text)]">{title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--v2-text-2)]">{children}</p>
        </Card>
      </Reveal>
    );
  }
}

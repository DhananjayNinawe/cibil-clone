"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Card from "@/components/v2/ui/Card";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import { InlineLink, PlanPicker } from "@/components/v2/pages/shared";
import {
  HashIcon,
  QuestionIcon,
  CalendarIcon,
  PersonContactIcon,
  ClockIcon,
  MailIcon,
  PlayIcon,
  ArrowRightIcon,
} from "@/components/icons";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/enq26/banner.jpg";

const VIDEO_THUMBNAIL = "https://i.ytimg.com/vi/HuCJuXSSzH0/sddefault.jpg";
const VIDEO_URL = "https://www.youtube.com/watch?v=HuCJuXSSzH0";

const BLOG_1 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blog-1.png";
const BLOG_2 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blog-2.png";
const BLOG_3 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blob%203.png";

/**
 * Consumer enquiry — the page a reader lands on after a lender has pulled their report.
 *
 * V1 stacks plans, a banner, three glossary terms, three next steps, a video and three
 * articles. V2 keeps all of it and the order, but changes the register: the page is written
 * as an answer to one anxious question, so the plans sit beside the reassurance rather than
 * below it, and the three "don't recognise this?" routes read as a decision, not a card grid.
 */
export default function EnquiryContent() {
  const { t, tv } = useV2();

  const terms = [
    { id: "ecn", icon: <HashIcon className="h-5 w-5" />, title: t("ecnTitle"), desc: t("ecnDesc") },
    {
      id: "purpose",
      icon: <QuestionIcon className="h-5 w-5" />,
      title: t("enquiryPurposeTitle"),
      desc: t("enquiryPurposeDesc"),
    },
    {
      id: "when",
      icon: <CalendarIcon className="h-5 w-5" />,
      title: t("enquiryDateTimeTitle"),
      desc: t("enquiryDateTimeDesc"),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("navGrievance")}
        title={t("enquiryHeroTitle")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV2("/consumer-dispute-resolution") },
          { label: t("megaConsumerEnquiry") },
        ]}
        tone="duo"
        lede={
          <>
            <span className="block">
              {t("enquiryHeroDescPrefix")}{" "}
              <span className="font-bold text-[var(--v2-text)]">{t("creditEnquiryBold")}</span>
              {t("enquiryHeroDescSuffix")}
            </span>
            <span className="mt-3 block">{t("enquiryHeroPara2")}</span>
          </>
        }
        actions={
          <>
            <Button href="#plans" size="lg" arrow magnetic>
              {t("checkCreditProfileBtn")}
            </Button>
            <p className="text-xs italic text-[var(--v2-text-3)]">{t("enquiryScoreNote")}</p>
          </>
        }
        media={
          <Parallax speed={0.05}>
            <Plate src={HERO_IMAGE} alt="" width={720} height={520} surface="dark" priority />
          </Parallax>
        }
      />

      {/* Plans ------------------------------------------------------------------- */}
      <Section id="plans" space="xl" tone="canvas">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="up">
              <PlanPicker
                label={t("dontGetCaughtHeading")}
                recommendedLabel={t("recommendedBadge")}
                plans={[
                  {
                    id: "free",
                    name: t("planFreeAnnualName"),
                    desc: t("planFreeAnnualDesc"),
                    price: t("planFreeAnnualPrice"),
                    recommended: true,
                  },
                  {
                    id: "starter",
                    name: t("enquiryPlanStarterName"),
                    desc: t("planStarterDesc"),
                    price: t("planStarterPrice"),
                    note: t("planStarterPriceNote"),
                  },
                  {
                    id: "basic",
                    name: t("enquiryPlanBasicSubName"),
                    desc: t("planBasicSubDesc"),
                    price: t("planBasicPrice"),
                    note: t("planBasicSubPriceNote"),
                  },
                ]}
              />
            </Reveal>

            <Reveal variant="right" delay={140}>
              <SectionHeading index="01" eyebrow={tv("v2CtaKicker")} title={t("dontGetCaughtHeading")} lede={t("dontGetCaughtDesc")} />

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
          </div>

          <Reveal variant="fade" delay={100} className="mt-16">
            <Callout tone="info">{t("eligibleFreeReportBanner")}</Callout>
          </Reveal>
        </Container>
      </Section>

      {/* Key terms --------------------------------------------------------------- */}
      <Section space="lg" tone="raised">
        <Container>
          <SectionHeading index="02" eyebrow={tv("v2KeyPoints")} title={t("learnKeyTermsHeading")} />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((term, index) => (
              <Reveal key={term.id} variant="up" delay={index * 110}>
                <Card padding="lg" spotlight className="h-full">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(0,176,240,0.12)] text-[var(--v2-cyan)]"
                  >
                    {term.icon}
                  </span>
                  <h3 className="mt-6 text-base font-bold text-[var(--v2-text)]">{term.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--v2-text-2)]">{term.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Don't recognise it? ------------------------------------------------------ */}
      <Section space="xl" tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionHeading index="03" eyebrow={tv("v2ProcessLabel")} title={t("dontRecogniseHeading")} />

            <ol>
              <Route
                index={0}
                icon={<PersonContactIcon className="h-5 w-5 text-[var(--v2-cyan)]" />}
                title={t("contactLenderTitle")}
              >
                {t("contactLenderDescPrefix")}{" "}
                <InlineLink href={toV2("/nodal-officer-list")}>{t("hereLowercase")}</InlineLink>
              </Route>

              <Route
                index={1}
                icon={<ClockIcon className="h-5 w-5 text-[var(--v2-cyan)]" />}
                title={t("raiseDisputeCibilTitle")}
              >
                {t("raiseDisputeCibilDesc")}{" "}
                <InlineLink href={toV2("/consumer-dispute-resolution")}>{t("clickHereBold")}</InlineLink>
              </Route>

              <Route
                index={2}
                icon={<MailIcon className="h-5 w-5 text-[var(--v2-cyan)]" />}
                title={t("needHelpTitle")}
              >
                {t("needHelpDescPrefix")}{" "}
                <InlineLink href={toV2("/contact-us")}>{t("disputeClickHere")}</InlineLink>{" "}
                {t("needHelpDescSuffix")}
              </Route>
            </ol>
          </div>
        </Container>
      </Section>

      {/* The video ---------------------------------------------------------------- */}
      <Section space="md" tone="raised">
        <Container width="narrow">
          <Reveal variant="up">
            <Card padding="sm" spotlight>
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <a
                  href={VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("a11yPlayVideo")}
                  className="v2-focus group relative flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-[var(--v2-r-md)] bg-black sm:w-64"
                >
                  <Image
                    src={VIDEO_THUMBNAIL}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 256px"
                    className="object-cover opacity-80 transition-transform duration-[900ms] ease-[var(--v2-ease)] group-hover:scale-105"
                  />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md transition-all duration-500 ease-[var(--v2-ease)] group-hover:scale-110 group-hover:border-[var(--v2-cyan)] group-hover:bg-[rgba(0,176,240,0.25)]">
                    <PlayIcon className="ml-0.5 h-6 w-6 text-white" />
                  </span>
                </a>

                <p className="text-sm leading-relaxed text-[var(--v2-text-2)]">{t("watchVideoDesc")}</p>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Recommended reads --------------------------------------------------------- */}
      <Section space="xl" tone="canvas">
        <Container>
          <SectionHeading
            index="04"
            eyebrow={tv("v2RelatedPages")}
            title={t("recommendedReadsHeading")}
            lede={t("featuredArticlesDesc")}
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Read title={t("enquiryArticle1Title")} excerpt={t("enquiryArticle1Excerpt")} image={BLOG_1} delay={0} />
            <Read title={t("enquiryArticle2Title")} excerpt={t("enquiryArticle2Excerpt")} image={BLOG_2} delay={110} />
            <Read title={t("disputeArticle1Title")} excerpt={t("disputeArticle1Excerpt")} image={BLOG_3} delay={220} />
          </div>
        </Container>
      </Section>
    </>
  );

  /** One of the three routes open to a reader who does not recognise the enquiry. */
  function Route({
    index,
    icon,
    title,
    children,
  }: {
    index: number;
    icon: ReactNode;
    title: string;
    children: ReactNode;
  }) {
    return (
      <Reveal
        as="li"
        variant="up"
        delay={index * 110}
        className="flex flex-col gap-5 border-t border-[var(--v2-line)] py-8 last:border-b sm:flex-row sm:items-start"
      >
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--v2-line)] bg-[var(--v2-surface)]"
        >
          {icon}
        </span>

        <div className="min-w-0">
          <h3 className="text-base font-bold text-[var(--v2-text)]">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--v2-text-2)]">{children}</p>
        </div>

        <span className="ml-auto hidden text-xs font-bold tabular-nums text-[var(--v2-text-3)] sm:block">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Reveal>
    );
  }

  function Read({
    title,
    excerpt,
    image,
    delay,
  }: {
    title: string;
    excerpt: string;
    image: string;
    delay: number;
  }) {
    return (
      <Reveal variant="up" delay={delay}>
        <article className="group flex h-full flex-col">
          <div className="relative aspect-16/10 overflow-hidden rounded-[var(--v2-r-lg)] border border-[var(--v2-line)] bg-[var(--v2-elev-1)]">
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-[900ms] ease-[var(--v2-ease)] group-hover:scale-[1.06]"
            />
          </div>

          <h3 className="mt-6 text-base font-bold leading-snug text-[var(--v2-text)]">{title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--v2-text-2)]">{excerpt}</p>

          <a
            href="#"
            className="v2-focus mt-auto inline-flex w-fit items-center gap-2 pt-4 text-sm font-bold text-[var(--v2-cyan)] transition-colors hover:text-[var(--v2-cyan-soft)]"
          >
            {t("readMoreLink")}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-[var(--v2-ease)] group-hover:translate-x-1" />
          </a>
        </article>
      </Reveal>
    );
  }
}

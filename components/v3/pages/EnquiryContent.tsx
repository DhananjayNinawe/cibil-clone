"use client";

import Image from "next/image";
import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Folio, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Steps from "@/components/v3/ui/Steps";
import ArticleCard from "@/components/v3/ui/ArticleCard";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import { Play } from "@/components/v3/ui/Icons";
import PlanLedger, { type PlanRow } from "@/components/v3/enquiry/PlanLedger";
import Glossary from "@/components/v3/enquiry/Glossary";

/* CIBIL's own artwork for this page — the same assets V1 serves. */
const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/enq26/banner.jpg";
const VIDEO_THUMBNAIL = "https://i.ytimg.com/vi/HuCJuXSSzH0/sddefault.jpg";
const VIDEO_URL = "https://www.youtube.com/watch?v=HuCJuXSSzH0";
const BLOG_1 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blog-1.png";
const BLOG_2 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blog-2.png";
const BLOG_3 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blob%203.png";

const PLANS: PlanRow[] = [
  { key: "free", name: "planFreeAnnualName", desc: "planFreeAnnualDesc", price: "planFreeAnnualPrice", recommended: true },
  {
    key: "starter",
    name: "enquiryPlanStarterName",
    desc: "planStarterDesc",
    price: "planStarterPrice",
    priceNote: "planStarterPriceNote",
  },
  {
    key: "basic",
    name: "enquiryPlanBasicSubName",
    desc: "planBasicSubDesc",
    price: "planBasicPrice",
    priceNote: "planBasicSubPriceNote",
  },
];

/**
 * Consumer Enquiry.
 *
 * A reader arrives here alarmed: someone pulled their credit report. So the page is set as a
 * notice with an explanation — the headline states what happened, the margin answers "will this
 * hurt my score", and everything below it is the paperwork: a ruled price list, an ink band with
 * the free-report entitlement, a numbered glossary of the terms in the alert, and the three ways
 * to act if the enquiry is not yours.
 */
export default function EnquiryContent() {
  const { t, t3 } = useV3();

  return (
    <>
      <PageHeader
        size="full"
        folio={t("megaConsumerEnquiry")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("navGrievance"), href: toV3("/consumer-dispute-resolution") },
          { label: t("megaConsumerEnquiry") },
        ]}
        title={[t("enquiryHeroTitle")]}
        lede={
          <>
            <span className="block">
              {t("enquiryHeroDescPrefix")}{" "}
              <span className="v3-em font-medium text-[var(--v3-fg)]">{t("creditEnquiryBold")}</span>
              {t("enquiryHeroDescSuffix")}
            </span>
            <span className="mt-4 block">{t("enquiryHeroPara2")}</span>
          </>
        }
        actions={
          <>
            <Button href="#plans" size="lg" arrow>
              {t("checkCreditProfileBtn")}
            </Button>
            <p className="v3-caption max-w-[26ch]">{t("enquiryScoreNote")}</p>
          </>
        }
        media={<Plate src={HERO_IMAGE} alt="" ratio="4 / 3" fit="cover" priority />}
      />

      {/* 01 — the price list, as a ruled comparison. */}
      <Section id="plans" space="lg">
        <Container>
          <SectionHead
            index="01"
            folio={t3("v3AtAGlance")}
            title={t("dontGetCaughtHeading")}
            lede={t("dontGetCaughtDesc")}
          />

          <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-[1.55fr_1fr] lg:items-start">
            <Reveal variant="rise">
              <PlanLedger plans={PLANS} group="v3-enquiry-plan" legend={t("dontGetCaughtHeading")} />
            </Reveal>

            <Reveal variant="rise" delay={120}>
              <div className="border-t-2 border-[var(--v3-fg)] pt-6">
                <p className="v3-folio">{t3("v3CtaKicker")}</p>

                <Button href={toV3("/register")} size="lg" arrow className="mt-7">
                  {t("getStartedBtn")}
                </Button>

                <p className="mt-6 text-sm text-[var(--v3-fg-2)]">
                  {t("alreadyHaveAccount")}{" "}
                  <Link
                    href={toV3("/login")}
                    className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
                  >
                    {t("logInLink")}
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 02 — the entitlement. The one line on this page that is worth raising its voice for. */}
      <Section space="sm" tone="ink">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-baseline lg:gap-14">
            <Folio index="02">{t3("v3KeyPoints")}</Folio>

            <Reveal variant="rise">
              <p className="v3-h3 max-w-[44ch] text-balance">{t("eligibleFreeReportBanner")}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 03 — the terms in the alert, as a numbered glossary. */}
      <Section space="lg">
        <Container>
          <SectionHead index="03" folio={t3("v3DetailsLabel")} title={t("learnKeyTermsHeading")} />

          <Glossary
            className="mt-12"
            entries={[
              { term: t("ecnTitle"), definition: t("ecnDesc") },
              { term: t("enquiryPurposeTitle"), definition: t("enquiryPurposeDesc") },
              { term: t("enquiryDateTimeTitle"), definition: t("enquiryDateTimeDesc") },
            ]}
          />
        </Container>
      </Section>

      {/* 04 — what to do if the enquiry is not yours. */}
      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead index="04" folio={t3("v3ProcessLabel")} title={t("dontRecogniseHeading")} />

          <Steps
            className="mt-12"
            steps={[
              {
                title: t("contactLenderTitle"),
                body: (
                  <>
                    {t("contactLenderDescPrefix")}{" "}
                    <Link href={toV3("/nodal-officer-list")} className="v3-focus">
                      {t("hereLowercase")}
                    </Link>
                  </>
                ),
              },
              {
                title: t("raiseDisputeCibilTitle"),
                body: (
                  <>
                    {t("raiseDisputeCibilDesc")}{" "}
                    <Link href={toV3("/consumer-dispute-resolution")} className="v3-focus font-semibold">
                      {t("clickHereBold")}
                    </Link>
                  </>
                ),
              },
              {
                title: t("needHelpTitle"),
                body: (
                  <>
                    {t("needHelpDescPrefix")}{" "}
                    <Link href={toV3("/contact-us")} className="v3-focus">
                      {t("disputeClickHere")}
                    </Link>{" "}
                    {t("needHelpDescSuffix")}
                  </>
                ),
              },
            ]}
          />
        </Container>
      </Section>

      {/* 05 — the film. A plate you can click, and one sentence beside it. */}
      <Section space="md">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
            <Reveal variant="plate">
              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("a11yPlayVideo")}
                className="v3-focus group block"
              >
                <span className="v3-plate relative block aspect-[16/9] w-full">
                  <Image
                    src={VIDEO_THUMBNAIL}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 352px"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-0 left-0 flex items-center gap-2 bg-[var(--v3-ink)] px-3 py-2 text-[var(--v3-paper)]">
                    <Play className="text-sm" />
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal variant="rise" delay={100}>
              <p className="v3-lede max-w-[46ch] text-pretty">{t("watchVideoDesc")}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 06 — the library, set as a lead story with two follow-ups. */}
      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead
            index="05"
            folio={t3("v3RelatedPages")}
            title={t("recommendedReadsHeading")}
            lede={t("featuredArticlesDesc")}
          />

          <div className="mt-14 grid gap-x-14 gap-y-14 lg:grid-cols-[1.4fr_1fr]">
            <Reveal variant="rise">
              <ArticleCard lead title={t("enquiryArticle1Title")} image={BLOG_1} />
              <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                {t("enquiryArticle1Excerpt")}
              </p>
            </Reveal>

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
              <Reveal variant="rise" delay={80}>
                <ArticleCard title={t("enquiryArticle2Title")} image={BLOG_2} />
                <p className="mt-3 text-sm leading-relaxed text-[var(--v3-fg-2)]">
                  {t("enquiryArticle2Excerpt")}
                </p>
              </Reveal>

              <Reveal variant="rise" delay={140}>
                <ArticleCard title={t("disputeArticle1Title")} image={BLOG_3} />
                <p className="mt-3 text-sm leading-relaxed text-[var(--v3-fg-2)]">
                  {t("disputeArticle1Excerpt")}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

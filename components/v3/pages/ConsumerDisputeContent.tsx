"use client";

import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Steps from "@/components/v3/ui/Steps";
import Tabs from "@/components/v3/ui/Tabs";
import Accordion from "@/components/v3/ui/Accordion";
import Callout from "@/components/v3/ui/Callout";
import Rule from "@/components/v3/ui/Rule";
import ArticleCard from "@/components/v3/ui/ArticleCard";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import ProcessSequence from "@/components/v3/dispute/ProcessSequence";
import ImportantPoints from "@/components/v3/dispute/ImportantPoints";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/dispute-new.png";

const ARTICLE_1 =
  "https://www.cibil.com/blog/a-guide-to-cibil-dispute-resolution-process/_jcr_content/teaserImage.coreimg.75.1440.png/1759906806692/disputeblog.png";
const ARTICLE_2 =
  "https://www.cibil.com/blog/what-is-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1731994787562/what-is-cibil-scr.jpeg";

/**
 * Consumer dispute resolution.
 *
 * A grievance procedure is the one thing on this site that genuinely *is* a printed document, so
 * V3 sets it as one: the four things you do (a ruled procedure), the five things we do (a second,
 * numbered sequence with the accept/reject fork spelled out), the three statutory provisos, and
 * the questions, indexed by the section of the report they concern.
 *
 * The "these steps" cross-reference inside the FAQ answers points back at the procedure on this
 * page — a real anchor rather than V1's dead `href="#"`, which is what a printed document's
 * cross-reference is for.
 */
export default function ConsumerDisputeContent() {
  const { t, t3 } = useV3();

  const faqLink = (
    <Link href="#how-to-initiate" className="v3-focus">
      {t("theseStepsLink")}
    </Link>
  );

  const standardAnswer = (
    <p>
      {t("faqStandardAnswerPrefix")} {faqLink}. {t("faqStandardAnswerSuffix")}
    </p>
  );

  const accountFaqs = (
    <Accordion
      numbered
      items={[
        { question: t("faq1Title"), answer: standardAnswer },
        { question: t("faq2Title"), answer: standardAnswer },
        { question: t("faq3Title"), answer: <p>{t("faq3Answer")}</p> },
        {
          question: t("faq4Title"),
          answer: (
            <div className="space-y-3">
              {standardAnswer}
              <p>{t("faq4ExtraParagraph")}</p>
              <p>
                {t("faq4ClosingPrefix")} {faqLink}.
              </p>
            </div>
          ),
        },
        {
          question: t("faq5Title"),
          answer: (
            <div className="space-y-3">
              <p>{t("faq5Answer")}</p>
              <ul className="space-y-2">
                {[t("faq5Bullet1"), t("faq5Bullet2"), t("faq5Bullet3")].map((bullet) => (
                  <li key={bullet} className="relative pl-6 before:absolute before:left-0 before:content-['—']">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ),
        },
      ]}
    />
  );

  const comingSoon = <p className="v3-lede">{t("sectionContentComingSoon")}</p>;

  return (
    <>
      <PageHeader
        folio={t("navGrievance")}
        title={t("disputeHeroTitle")}
        lede={t("disputeHeroDesc")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV3("/consumer-dispute-resolution") },
          { label: t("megaConsumerDisputeResolution") },
        ]}
        actions={
          <Button href="#how-to-initiate" size="lg" arrow>
            {t("disputeHeroBtn")}
          </Button>
        }
        media={<Plate src={HERO_IMAGE} alt="" ratio="16 / 10" fit="cover" priority />}
      />

      {/* The reassurance V1 prints as a dark band under the hero: the service costs nothing. */}
      <Section space="sm">
        <Container>
          <Reveal variant="rise">
            <Callout tone="success">
              <p className="text-base leading-relaxed text-[var(--v3-fg)] sm:text-lg">
                {t("disputeFreeServiceBanner")}
              </p>
            </Callout>
          </Reveal>
        </Container>
      </Section>

      <Section id="how-to-initiate" space="lg" ruled>
        <Container>
          <SectionHead
            index="01"
            folio={t3("v3ProcessLabel")}
            title={t("howToInitiateHeading")}
            lede={t("followStepsHeading")}
          />

          <Reveal variant="rise" className="mt-4">
            <Steps
              steps={[
                {
                  title: t("step1Line1"),
                  body: (
                    <div className="space-y-1">
                      <p>
                        <Link href={toV3("/login")} className="v3-focus">
                          {t("login")}
                        </Link>{" "}
                        {t("step1LoginSuffix")}
                      </p>
                      <p>
                        <Link href={toV3("/register")} className="v3-focus">
                          {t("step1EnrollLink")}
                        </Link>{" "}
                        {t("step1EnrollSuffix")}
                      </p>
                    </div>
                  ),
                },
                { title: t("step2Desc") },
                { title: t("step3Desc") },
                { title: `${t("login")} ${t("step4Desc")}` },
              ]}
            />
          </Reveal>

          <Reveal variant="rise" className="mt-12">
            <Callout tone="warning">
              <p className="text-base text-[var(--v3-fg)]">{t("disputeEligibilityNote")}</p>
            </Callout>
          </Reveal>

          <div className="mt-12 max-w-[64ch] space-y-4 text-sm leading-relaxed text-[var(--v3-fg-2)] sm:text-base">
            <p>
              <Link href={toV3("/register")} className="v3-focus v3-link font-medium text-[var(--v3-fg)]">
                {t("signUpLink")}
              </Link>{" "}
              {t("signUpPromptMiddle")}{" "}
              <Link href={toV3("/login")} className="v3-focus v3-link font-medium text-[var(--v3-fg)]">
                {t("heroLogIn")}
              </Link>{" "}
              {t("loginPromptSuffix")}
            </p>

            <p>
              {t("alternateDisputeText")}{" "}
              <Link
                href={toV3("/complaints-and-escalations")}
                className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
              >
                {t("disputeClickHere")}
              </Link>
              .
            </p>

            <p>
              {t("checkoutVideoText")}{" "}
              <Link href={toV3("/watch-and-learn")} className="v3-focus v3-link font-medium text-[var(--v3-fg)]">
                {t("checkoutVideoLink")}
              </Link>{" "}
              {t("checkoutVideoSuffix")}
            </p>
          </div>
        </Container>
      </Section>

      <ProcessSequence index="02" ledeKey="diagramHeading" />

      <ImportantPoints index="03" />

      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead index="04" folio={t("faqs")} title={t("selectSectionHeading")} />

          <Tabs
            className="mt-12"
            label={t("selectSectionHeading")}
            items={[
              { label: t("tabAccountInfo"), content: accountFaqs },
              { label: t("tabProfileInfo"), content: comingSoon },
              { label: t("tabEnquiryInfo"), content: comingSoon },
            ]}
          />
        </Container>
      </Section>

      <Section space="lg" ruled>
        <Container>
          <SectionHead
            index="05"
            folio={t3("v3RelatedPages")}
            title={t("featuredArticlesHeading")}
            lede={t("featuredArticlesDesc")}
            aside={
              <Button href={toV3("/blog/main")} variant="link" arrow>
                {t("readMoreLink")}
              </Button>
            }
          />

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:gap-16">
            <Reveal variant="rise">
              <ArticleCard
                title={t("disputeArticle1Title")}
                category={t("blogLabel")}
                image={ARTICLE_1}
                href={toV3("/blog/main")}
                lead
              />
            </Reveal>
            <Reveal variant="rise" delay={80}>
              <ArticleCard
                title={t("disputeArticle2Title")}
                category={t("blogLabel")}
                image={ARTICLE_2}
                href={toV3("/blog/main")}
                lead
              />
            </Reveal>
          </div>

          <Rule className="mt-20" strong />
        </Container>
      </Section>
    </>
  );
}

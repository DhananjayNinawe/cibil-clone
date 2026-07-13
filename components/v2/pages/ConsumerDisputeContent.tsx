"use client";

import Image from "next/image";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Backdrop from "@/components/v2/ui/Backdrop";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Card from "@/components/v2/ui/Card";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import Tabs from "@/components/v2/ui/Tabs";
import Accordion from "@/components/v2/ui/Accordion";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import { InlineLink, DISPUTE_DIAGRAM_IMAGE } from "@/components/v2/pages/shared";
import { CheckCircleIcon, PlayIcon, ArrowRightIcon } from "@/components/icons";

/* Artwork — the same remote assets V1's dispute page uses, nothing new. */
const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/dispute-new.png";

const STEP_BASE =
  "https://www.cibil.com/consumer-dispute-resolution/_jcr_content/root/contentcontainer/pagesection_83362557/contentcontainer/pagesectionwithbackg/contentcontainer/columnrow";

const STEP_ART = [
  `${STEP_BASE}/item_1764741897337.coreimg.svg/1764742170853/frame34.svg`,
  `${STEP_BASE}/item_1764741902134.coreimg.svg/1764742215793/frame35.svg`,
  `${STEP_BASE}/item_1764741906358.coreimg.svg/1764742249099/frame36.svg`,
  `${STEP_BASE}/item_1764741911591.coreimg.svg/1764742281557/frame37.svg`,
];

const STEP_LABELS: TranslationKey[] = ["step1Label", "step2Label", "step3Label", "step4Label"];

const ARTICLE_1 =
  "https://www.cibil.com/blog/a-guide-to-cibil-dispute-resolution-process/_jcr_content/teaserImage.coreimg.75.1440.png/1759906806692/disputeblog.png";
const ARTICLE_2 =
  "https://www.cibil.com/blog/what-is-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1731994787562/what-is-cibil-scr.jpeg";

/**
 * Consumer dispute resolution.
 *
 * V1 tells this story as five stacked white bands. Here the page is staged as a single
 * journey: the four-step raise flow becomes a numbered rail of lit plates, the resolution
 * diagram is hung as artwork with its turnaround time set as a caption, and the FAQ moves
 * from a hand-rolled toggle list into the design system's tabs + accordion.
 */
export default function ConsumerDisputeContent() {
  const { t, tv } = useV2();

  return (
    <>
      <PageHero
        eyebrow={t("navGrievance")}
        title={t("disputeHeroTitle")}
        lede={t("disputeHeroDesc")}
        breadcrumbs={[{ label: t("megaConsumerDisputeResolution") }]}
        tone="duo"
        size="md"
        actions={
          <Button href="#how-to-initiate" size="lg" arrow magnetic>
            {t("disputeHeroBtn")}
          </Button>
        }
        media={
          <Parallax speed={0.05}>
            <Plate src={HERO_IMAGE} alt="" width={720} height={520} surface="light" priority />
          </Parallax>
        }
      >
        <Callout tone="success">{t("disputeFreeServiceBanner")}</Callout>
      </PageHero>

      <HowToInitiate />
      <ResolutionFlow />
      <ImportantPoints />
      <DisputeFaqs />
      <FeaturedArticles />
    </>
  );

  /* ------------------------------------------------------------------ Steps */

  function HowToInitiate() {
    return (
      <Section id="how-to-initiate" space="xl" tone="canvas">
        <Container>
          <SectionHeading
            index="01"
            eyebrow={tv("v2ProcessLabel")}
            title={t("howToInitiateHeading")}
            lede={t("followStepsHeading")}
          />

          <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEP_ART.map((art, index) => (
              <Reveal as="li" key={STEP_LABELS[index]} variant="up" delay={index * 110} className="relative">
                {index < STEP_ART.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[calc(50%+7rem)] top-24 hidden h-px w-[calc(100%-14rem)] bg-linear-to-r from-[var(--v2-cyan)] to-transparent lg:block"
                  />
                )}

                <Plate
                  src={art}
                  alt=""
                  width={220}
                  height={220}
                  glow={false}
                  surface="light"
                  className="mx-auto max-w-[13rem]"
                  imageClassName="p-5"
                />

                <p className="v2-eyebrow mt-7 text-[var(--v2-cyan)]">{t(STEP_LABELS[index])}</p>
                <div className="mt-3 text-sm leading-relaxed text-[var(--v2-text-2)]">
                  {index === 0 && (
                    <>
                      <p className="font-bold text-[var(--v2-text)]">{t("step1Line1")}</p>
                      <p className="mt-2">
                        <InlineLink href={toV2("/login")}>{t("login")}</InlineLink>{" "}
                        {t("step1LoginSuffix")}
                      </p>
                      <p>
                        <InlineLink href={toV2("/register")}>{t("step1EnrollLink")}</InlineLink>{" "}
                        {t("step1EnrollSuffix")}
                      </p>
                    </>
                  )}
                  {index === 1 && <p>{t("step2Desc")}</p>}
                  {index === 2 && <p>{t("step3Desc")}</p>}
                  {index === 3 && (
                    <p>
                      <InlineLink href={toV2("/login")}>{t("login")}</InlineLink> {t("step4Desc")}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal variant="up" className="mt-16">
            <Callout tone="warning">{t("disputeEligibilityNote")}</Callout>
          </Reveal>

          <Reveal variant="up" delay={80} className="mt-10 space-y-3 text-[15px] leading-relaxed text-[var(--v2-text-2)]">
            <p>
              <InlineLink href={toV2("/register")}>{t("signUpLink")}</InlineLink>{" "}
              {t("signUpPromptMiddle")}{" "}
              <InlineLink href={toV2("/login")}>{t("heroLogIn")}</InlineLink> {t("loginPromptSuffix")}
            </p>
            <p>
              {t("alternateDisputeText")}{" "}
              <InlineLink href="#">{t("disputeClickHere")}</InlineLink>.
            </p>
          </Reveal>

          {/* V1's teal video strip, re-cut as a glass bar with a play affordance. */}
          <Reveal variant="up" delay={140} className="mt-12">
            <div className="v2-glass v2-rim flex flex-wrap items-center justify-center gap-4 rounded-[var(--v2-r-lg)] px-7 py-6 text-center">
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(0,176,240,0.15)] text-[var(--v2-cyan)]"
              >
                <PlayIcon className="ml-0.5 h-5 w-5" />
              </span>
              <p className="text-sm text-[var(--v2-text-2)]">
                {t("checkoutVideoText")}{" "}
                <a href="#" className="v2-focus v2-underline font-bold text-[var(--v2-gold)]">
                  {t("checkoutVideoLink")}
                </a>{" "}
                {t("checkoutVideoSuffix")}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    );
  }

  /* --------------------------------------------------------------- Diagram */

  function ResolutionFlow() {
    return (
      <Section space="lg" tone="deep" className="isolate overflow-hidden">
        <Backdrop tone="cyan" />

        <Container className="relative">
          <SectionHeading
            index="02"
            eyebrow={tv("v2AtAGlance")}
            title={t("diagramHeading")}
            align="center"
          />

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

              {/* The turnaround note is the diagram's headline number — it gets a rail of its own. */}
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
    );
  }

  /* -------------------------------------------------------- Important points */

  function ImportantPoints() {
    const points: TranslationKey[] = [
      "pointNoCorrection",
      "pointRbiGuidelines",
      "pointResolveWithin30",
      "disputeFreeServiceBanner",
    ];

    return (
      <Section space="xl" tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionHeading index="03" eyebrow={tv("v2KeyPoints")} title={t("importantPointsHeading")} />

            <ul>
              {points.map((point, index) => (
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
    );
  }

  /* ------------------------------------------------------------------- FAQs */

  function DisputeFaqs() {
    const standardAnswer = (
      <p>
        {t("faqStandardAnswerPrefix")} <a href="#">{t("theseStepsLink")}</a>. {t("faqStandardAnswerSuffix")}
      </p>
    );

    const accountFaqs = (
      <Accordion
        multiple
        items={[
          { id: "faq1", question: t("faq1Title"), answer: standardAnswer },
          { id: "faq2", question: t("faq2Title"), answer: standardAnswer },
          { id: "faq3", question: t("faq3Title"), answer: <p>{t("faq3Answer")}</p> },
          {
            id: "faq4",
            question: t("faq4Title"),
            answer: (
              <>
                {standardAnswer}
                <p>{t("faq4ExtraParagraph")}</p>
                <p>
                  {t("faq4ClosingPrefix")} <a href="#">{t("theseStepsLink")}</a>.
                </p>
              </>
            ),
          },
          {
            id: "faq5",
            question: t("faq5Title"),
            answer: (
              <>
                <p>{t("faq5Answer")}</p>
                <ul>
                  <li>{t("faq5Bullet1")}</li>
                  <li>{t("faq5Bullet2")}</li>
                  <li>{t("faq5Bullet3")}</li>
                </ul>
              </>
            ),
          },
        ]}
      />
    );

    const comingSoon = (
      <p className="py-12 text-center text-sm text-[var(--v2-text-3)]">{t("sectionContentComingSoon")}</p>
    );

    return (
      <Section space="xl" tone="raised">
        <Container width="narrow">
          <SectionHeading index="04" eyebrow={t("faqs")} title={t("selectSectionHeading")} align="center" />

          <Reveal variant="up" className="mt-14">
            <Tabs
              label={t("selectSectionHeading")}
              items={[
                { id: "account", label: t("tabAccountInfo"), panel: accountFaqs },
                { id: "profile", label: t("tabProfileInfo"), panel: comingSoon },
                { id: "enquiry", label: t("tabEnquiryInfo"), panel: comingSoon },
              ]}
            />
          </Reveal>
        </Container>
      </Section>
    );
  }

  /* --------------------------------------------------------------- Articles */

  function FeaturedArticles() {
    return (
      <Section space="xl" tone="canvas">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2.25fr)]">
            <SectionHeading
              index="05"
              eyebrow={tv("v2RelatedPages")}
              title={t("featuredArticlesHeading")}
              lede={t("featuredArticlesDesc")}
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <BlogTile title={t("disputeArticle1Title")} image={ARTICLE_1} delay={0} />
              <BlogTile title={t("disputeArticle2Title")} image={ARTICLE_2} delay={120} />
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  function BlogTile({ title, image, delay }: { title: string; image: string; delay: number }) {
    return (
      <Reveal variant="up" delay={delay}>
        <article className="group flex h-full flex-col">
          <div className="relative aspect-5/2 overflow-hidden rounded-[var(--v2-r-lg)] border border-[var(--v2-line)] bg-[var(--v2-elev-1)]">
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, 40vw"
              className="object-cover transition-transform duration-[900ms] ease-[var(--v2-ease)] group-hover:scale-[1.06]"
            />
          </div>

          <p className="v2-eyebrow mt-6 text-[var(--v2-cyan)]">{t("blogLabel")}</p>
          <h3 className="mt-3 text-xl font-bold leading-snug text-[var(--v2-text)]">{title}</h3>
          <a
            href="#"
            className="v2-focus mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-bold text-[var(--v2-cyan)] transition-colors hover:text-[var(--v2-cyan-soft)]"
          >
            {t("readMoreLink")}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-[var(--v2-ease)] group-hover:translate-x-1" />
          </a>
        </article>
      </Reveal>
    );
  }
}

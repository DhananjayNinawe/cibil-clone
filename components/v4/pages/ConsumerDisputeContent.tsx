"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/v4/ui/PageHero";
import Notice from "@/components/v4/ui/Notice";
import Tabs from "@/components/v4/ui/Tabs";
import { Disclosure, DisclosureList } from "@/components/v4/ui/Disclosure";
import { Step, Steps } from "@/components/v4/ui/Steps";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { ArrowRightIcon, ClockIcon, PlayIcon } from "@/components/v4/ui/Icons";
import { DisputeProcessSection, ImportantPointsSection } from "./DisputeProcess";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Consumer dispute resolution.
 *
 * Nobody arrives here in a good mood. They have found something on their credit report that is not
 * true, and the report is the thing a lender will judge them by. The page's whole job is to answer
 * three questions, in this order and without being asked twice: *is this going to cost me?* (no),
 * *how long?* (thirty days), *what do I do?* (four steps).
 *
 * So the two facts that settle the reader sit in the hero — the free-service promise and the
 * turnaround — rather than seven scrolls down in grey 12px text, which is where V1 puts them.
 * Everything after that is procedure, in the order it happens: what you do, then what we do, then
 * what the law lets us do, then the questions people actually ask.
 *
 * Copy is V1's, verbatim, through `t()`. The three links V1 leaves on `href="#"` are given the real
 * destinations they were always describing.
 */

const ARTICLE_1 =
  "https://www.cibil.com/blog/a-guide-to-cibil-dispute-resolution-process/_jcr_content/teaserImage.coreimg.75.1440.png/1759906806692/disputeblog.png";
const ARTICLE_2 =
  "https://www.cibil.com/blog/what-is-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1731994787562/what-is-cibil-scr.jpeg";

export default function ConsumerDisputeContent() {
  const { t } = useV4();

  // The FAQ answers all say "raise a dispute by following these steps" and then link to nothing.
  // The steps are on this page, a screen above — so the cross-reference points at them.
  const theseSteps = (
    <Link href="#how-to-initiate" className="v4-link">
      {t("theseStepsLink")}
    </Link>
  );

  const standardAnswer = (
    <p>
      {t("faqStandardAnswerPrefix")} {theseSteps}. {t("faqStandardAnswerSuffix")}
    </p>
  );

  const comingSoon = <p className="v4-caption">{t("sectionContentComingSoon")}</p>;

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navGrievance"), href: toV4("/consumer-dispute-resolution") }}
        label={t("megaGrievanceRedressalHeading")}
        title={t("disputeHeroTitle")}
        lede={t("disputeHeroDesc")}
        actions={
          <ButtonLink href="#how-to-initiate" size="lg" arrow>
            {t("disputeHeroBtn")}
          </ButtonLink>
        }
        aside={
          <div className="grid gap-3">
            <Notice tone="success">{t("disputeFreeServiceBanner")}</Notice>

            <div className="v4-plane flex items-start gap-3.5 p-5">
              <ClockIcon size={19} className="mt-0.5 shrink-0 text-[var(--v4-accent)]" />
              <p className="v4-num text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                {t("diagTurnaroundTime")}
              </p>
            </div>
          </div>
        }
      />

      {/* ── What you do ─────────────────────────────────────────────────────────────────────── */}
      <Section id="how-to-initiate" tone="plane" aria-labelledby="v4-initiate-heading">
        <Container>
          <SectionHead
            id="v4-initiate-heading"
            title={t("howToInitiateHeading")}
            lede={t("followStepsHeading")}
          />

          <div className="mt-12 grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
            <div>
              <Steps>
                <Step n={1} title={t("step1Label")} index={0}>
                  <p>{t("step1Line1")}</p>
                  <p>
                    <Link href={toV4("/login")} className="v4-link">
                      {t("login")}
                    </Link>{" "}
                    {t("step1LoginSuffix")}
                  </p>
                  <p>
                    <Link href={toV4("/register")} className="v4-link">
                      {t("step1EnrollLink")}
                    </Link>{" "}
                    {t("step1EnrollSuffix")}
                  </p>
                </Step>

                <Step n={2} title={t("step2Label")} index={1}>
                  <p>{t("step2Desc")}</p>
                </Step>

                <Step n={3} title={t("step3Label")} index={2}>
                  <p>{t("step3Desc")}</p>
                </Step>

                <Step n={4} title={t("step4Label")} index={3}>
                  <p>
                    <Link href={toV4("/login")} className="v4-link">
                      {t("login")}
                    </Link>{" "}
                    {t("step4Desc")}
                  </p>
                </Step>
              </Steps>
            </div>

            {/* The caveats that belong *beside* the procedure, not after it: the one rule that can
                stop a dispute before it starts, and the two other ways in. */}
            <aside className="grid content-start gap-6">
              <Reveal>
                <Notice tone="warning">{t("disputeEligibilityNote")}</Notice>
              </Reveal>

              <Reveal index={1} className="v4-body">
                <p>
                  <Link href={toV4("/register")} className="v4-link">
                    {t("signUpLink")}
                  </Link>{" "}
                  {t("signUpPromptMiddle")}{" "}
                  <Link href={toV4("/login")} className="v4-link">
                    {t("heroLogIn")}
                  </Link>{" "}
                  {t("loginPromptSuffix")}
                </p>
                <p className="mt-4">
                  {t("alternateDisputeText")}{" "}
                  {/* V1: `href="#"`. The alternate ways to raise a dispute are the escalation
                      channels, and they have a page of their own. */}
                  <Link href={toV4("/complaints-and-escalations")} className="v4-link">
                    {t("disputeClickHere")}
                  </Link>
                  .
                </p>
              </Reveal>

              <Reveal index={2}>
                <Link
                  href={toV4("/watch-and-learn")}
                  className="v4-plane v4-plane-lift group flex items-start gap-4 p-5"
                >
                  <span className="mt-0.5 shrink-0 text-[var(--v4-accent)]">
                    <PlayIcon size={22} />
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                    {t("checkoutVideoText")}{" "}
                    <span className="font-bold text-[var(--v4-fg)] group-hover:text-[var(--v4-accent)]">
                      {t("checkoutVideoLink")}
                    </span>{" "}
                    {t("checkoutVideoSuffix")}
                  </span>
                </Link>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ── What we do ──────────────────────────────────────────────────────────────────────── */}
      <DisputeProcessSection />

      <ImportantPointsSection />

      {/* ── The questions ───────────────────────────────────────────────────────────────────── */}
      <Section aria-labelledby="v4-faq-heading">
        <Container width="text">
          <SectionHead
            id="v4-faq-heading"
            label={t("faqs")}
            title={t("selectSectionHeading")}
            align="center"
          />

          <div className="mt-10">
            <Tabs
              label={t("selectSectionHeading")}
              items={[
                {
                  id: "account",
                  label: t("tabAccountInfo"),
                  panel: (
                    <DisclosureList>
                      <Disclosure question={t("faq1Title")}>{standardAnswer}</Disclosure>
                      <Disclosure question={t("faq2Title")}>{standardAnswer}</Disclosure>
                      <Disclosure question={t("faq3Title")}>
                        <p>{t("faq3Answer")}</p>
                      </Disclosure>
                      <Disclosure question={t("faq4Title")}>
                        {standardAnswer}
                        <p>{t("faq4ExtraParagraph")}</p>
                        <p>
                          {t("faq4ClosingPrefix")} {theseSteps}.
                        </p>
                      </Disclosure>
                      <Disclosure question={t("faq5Title")}>
                        <p>{t("faq5Answer")}</p>
                        <ul>
                          <li>{t("faq5Bullet1")}</li>
                          <li>{t("faq5Bullet2")}</li>
                          <li>{t("faq5Bullet3")}</li>
                        </ul>
                      </Disclosure>
                    </DisclosureList>
                  ),
                },
                { id: "profile", label: t("tabProfileInfo"), panel: comingSoon },
                { id: "enquiry", label: t("tabEnquiryInfo"), panel: comingSoon },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* ── Read on ─────────────────────────────────────────────────────────────────────────── */}
      <Section tone="tint" space="md" aria-labelledby="v4-articles-heading">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <SectionHead
              id="v4-articles-heading"
              label={t("blogLabel")}
              title={t("featuredArticlesHeading")}
              lede={t("featuredArticlesDesc")}
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <ArticleCard title={t("disputeArticle1Title")} image={ARTICLE_1} index={0} />
              <ArticleCard title={t("disputeArticle2Title")} image={ARTICLE_2} index={1} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/**
 * A teaser.
 *
 * One link, not two: V1 draws the artwork, the headline and a separate "Read More" anchor, which
 * gives a screen-reader user two identical entries in the links list and a sighted user two targets
 * for one destination. Here the whole card is the link, and "Read More" is the affordance inside it.
 *
 * The artwork is decorative (`alt=""`) because the headline directly beneath says the same thing —
 * alt text that repeats the adjacent heading is simply read out twice.
 */
function ArticleCard({
  title,
  image,
  index,
}: {
  title: string;
  image: string;
  index: number;
}) {
  const { t } = useV4();

  return (
    <Reveal index={index} variant="focus">
      <Link href={toV4("/blog/main")} className="group block">
        <span className="block overflow-hidden rounded-[var(--v4-r-md)] border border-[var(--v4-edge)] bg-[var(--v4-surface-2)]">
          <Image
            src={image}
            alt=""
            width={640}
            height={280}
            unoptimized
            sizes="(max-width: 640px) 100vw, 33vw"
            className="aspect-5/2 w-full object-cover transition-transform duration-500 ease-[var(--v4-ease)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </span>

        <span className="v4-h3 mt-5 block group-hover:text-[var(--v4-accent)]">{title}</span>

        <span className="mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-bold text-[var(--v4-accent)]">
          {t("readMoreLink")}
          <ArrowRightIcon
            size={16}
            className="transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </span>
      </Link>
    </Reveal>
  );
}

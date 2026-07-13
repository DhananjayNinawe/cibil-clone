"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import PageHero from "@/components/v4/ui/PageHero";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { ClockIcon, DocumentIcon, PlayIcon, UserIcon } from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Consumer enquiry.
 *
 * A reader lands here from an alert: *a lender has looked at your credit report.* They are one
 * sentence away from either "fine, that was me applying for a card" or "that was not me". The page
 * has to hold both without alarming the first reader or slowing the second one down.
 *
 * So the emotional order is: what this is (a credit enquiry, and checking your own report does not
 * cost you a point) → how to look (the plans, and the free one is yours by right) → what the words
 * in the alert mean → and, only then, what to do if it was not you.
 *
 * The one gold object on the page is the chip on the free annual report, because gold in V4 means
 * exactly one thing — *this is you* — and a statutory annual entitlement is the clearest instance of
 * it on the whole site.
 */

interface Plan {
  id: string;
  name: TranslationKey;
  desc: TranslationKey;
  price: TranslationKey;
  priceNote?: TranslationKey;
  /** The free annual report is not "recommended" — it is the reader's, once a year, by right. */
  yours?: boolean;
  recommended?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "free",
    name: "planFreeAnnualName",
    desc: "planFreeAnnualDesc",
    price: "planFreeAnnualPrice",
    yours: true,
    recommended: true,
  },
  {
    id: "starter",
    name: "enquiryPlanStarterName",
    desc: "planStarterDesc",
    price: "planStarterPrice",
    priceNote: "planStarterPriceNote",
  },
  {
    id: "basic",
    name: "enquiryPlanBasicSubName",
    desc: "planBasicSubDesc",
    price: "planBasicPrice",
    priceNote: "planBasicSubPriceNote",
  },
];

const BLOG_1 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blog-1.png";
const BLOG_2 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blog-2.png";
const BLOG_3 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blob%203.png";
const VIDEO_URL = "https://www.youtube.com/watch?v=HuCJuXSSzH0";

export default function EnquiryContent() {
  const { t, t4 } = useV4();
  const [plan, setPlan] = useState("free");
  const groupId = useId();

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navGrievance"), href: toV4("/consumer-dispute-resolution") }}
        label={t("megaConsumerEnquiry")}
        title={t("enquiryHeroTitle")}
        lede={
          <>
            {t("enquiryHeroDescPrefix")}{" "}
            <strong className="font-bold text-[var(--v4-fg)]">{t("creditEnquiryBold")}</strong>
            {t("enquiryHeroDescSuffix")} {t("enquiryHeroPara2")}
          </>
        }
        actions={
          <>
            <ButtonLink href="#plans" size="lg" arrow>
              {t("checkCreditProfileBtn")}
            </ButtonLink>
            {/* The single fact that stops a reader from *not* looking. V1 sets it in 12px italic. */}
            <span className="v4-caption self-center">{t("enquiryScoreNote")}</span>
          </>
        }
        aside={
          <div className="v4-plane p-6 sm:p-8">
            <h2 className="v4-label">{t("learnKeyTermsHeading")}</h2>

            <dl className="mt-6 grid gap-0">
              <Term glyph={<DocumentIcon size={18} />} term={t("ecnTitle")} def={t("ecnDesc")} />
              <Term
                glyph={<UserIcon size={18} />}
                term={t("enquiryPurposeTitle")}
                def={t("enquiryPurposeDesc")}
              />
              <Term
                glyph={<ClockIcon size={18} />}
                term={t("enquiryDateTimeTitle")}
                def={t("enquiryDateTimeDesc")}
              />
            </dl>
          </div>
        }
      />

      {/* ── How to look ─────────────────────────────────────────────────────────────────────── */}
      <Section id="plans" tone="tint" className="scroll-mt-28" aria-labelledby="v4-plans-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* A real radiogroup: a fieldset with a legend, a `<label>` wrapping every option, and
                a native `<input type="radio">` — so the arrow keys move between the plans and a
                screen reader announces "2 of 3, selected". V1 paints the same control and gets the
                semantics right; what it lacks is a legend, which is what tells the reader what the
                three options *are* options for. */}
            <fieldset>
              <legend className="v4-label">{t("sitemapSubscriptionPlans")}</legend>

              <div className="mt-5 grid gap-3">
                {PLANS.map((option, i) => {
                  const selected = plan === option.id;
                  return (
                    <Reveal key={option.id} index={i}>
                      <label
                        className={`v4-plane flex cursor-pointer items-center justify-between gap-5 p-5 transition-[border-color,box-shadow] ${
                          selected
                            ? "border-[var(--v4-accent)] shadow-[0_0_0_1px_var(--v4-accent)]"
                            : ""
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-4">
                          <input
                            type="radio"
                            name={`${groupId}-plan`}
                            value={option.id}
                            checked={selected}
                            onChange={() => setPlan(option.id)}
                            className="h-4 w-4 shrink-0 accent-[var(--v4-deep)]"
                          />
                          <span className="min-w-0">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-[var(--v4-fg)]">{t(option.name)}</span>
                              {option.recommended ? (
                                <span className="v4-chip">{t("recommendedBadge")}</span>
                              ) : null}
                            </span>
                            <span className="v4-caption mt-1 block">{t(option.desc)}</span>
                          </span>
                        </span>

                        <span className="shrink-0 text-right">
                          <span className="v4-num block font-bold text-[var(--v4-fg)]">
                            {t(option.price)}
                          </span>
                          {option.priceNote ? (
                            <span className="v4-caption block">{t(option.priceNote)}</span>
                          ) : null}
                        </span>
                      </label>
                    </Reveal>
                  );
                })}
              </div>

              {/* Gold, and the only gold on the page: the free annual report is *yours*. */}
              <Reveal index={3} className="mt-5">
                <p className="v4-chip v4-chip-you">{t("eligibleFreeReportBanner")}</p>
              </Reveal>
            </fieldset>

            <div>
              <h2 id="v4-plans-heading" className="v4-h2">
                {t("dontGetCaughtHeading")}
              </h2>
              <p className="v4-lede mt-4">{t("dontGetCaughtDesc")}</p>

              <ButtonLink href={toV4("/register")} size="lg" arrow className="mt-8">
                {t("getStartedBtn")}
              </ButtonLink>

              <p className="v4-caption mt-5">
                {t("alreadyHaveAccount")}{" "}
                <Link href={toV4("/login")} className="v4-link">
                  {t("logInLink")}
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── If it was not you ───────────────────────────────────────────────────────────────── */}
      <Section tone="night" aria-labelledby="v4-recognise-heading">
        <Container>
          <SectionHead id="v4-recognise-heading" title={t("dontRecogniseHeading")} />

          <ol className="mt-10 grid gap-3 md:grid-cols-3">
            <Action index={0} n={1} title={t("contactLenderTitle")}>
              {t("contactLenderDescPrefix")}{" "}
              <Link href={toV4("/nodal-officer-list")} className="v4-link">
                {t("hereLowercase")}
              </Link>
            </Action>

            <Action index={1} n={2} title={t("raiseDisputeCibilTitle")}>
              {t("raiseDisputeCibilDesc")}{" "}
              <Link href={toV4("/consumer-dispute-resolution")} className="v4-link">
                {t("clickHereBold")}
              </Link>
            </Action>

            <Action index={2} n={3} title={t("needHelpTitle")}>
              {t("needHelpDescPrefix")}{" "}
              <Link href={toV4("/contact-us")} className="v4-link">
                {t("disputeClickHere")}
              </Link>{" "}
              {t("needHelpDescSuffix")}
            </Action>
          </ol>
        </Container>
      </Section>

      {/* ── Watch and read ──────────────────────────────────────────────────────────────────── */}
      <Section aria-labelledby="v4-reads-heading">
        <Container width="wide">
          <Reveal className="v4-plane flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--v4-r-sm)] bg-[var(--v4-surface-2)] text-[var(--v4-accent)]">
              <PlayIcon size={24} />
            </span>
            <p className="flex-1 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
              {t("watchVideoDesc")}
            </p>
            <ButtonLink
              href={VIDEO_URL}
              external
              variant="secondary"
              newTabLabel={t4("v4OpensInNewTab")}
            >
              {t("a11yPlayVideo")}
            </ButtonLink>
          </Reveal>

          <SectionHead
            id="v4-reads-heading"
            className="mt-20"
            label={t("blogLabel")}
            title={t("recommendedReadsHeading")}
            lede={t("featuredArticlesDesc")}
          />

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <Read
              index={0}
              title={t("enquiryArticle1Title")}
              excerpt={t("enquiryArticle1Excerpt")}
              image={BLOG_1}
            />
            <Read
              index={1}
              title={t("enquiryArticle2Title")}
              excerpt={t("enquiryArticle2Excerpt")}
              image={BLOG_2}
            />
            <Read
              index={2}
              title={t("disputeArticle1Title")}
              excerpt={t("disputeArticle1Excerpt")}
              image={BLOG_3}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

/** A term from the alert, and what it means. A real `<dt>`/`<dd>` pair — it is a glossary. */
function Term({
  glyph,
  term,
  def,
}: {
  glyph: React.ReactNode;
  term: string;
  def: string;
}) {
  return (
    // A `<div>` is the one element a `<dl>` may wrap a pair in — and it may hold nothing but the
    // `<dt>` and the `<dd>`, which is why the glyph lives inside the term rather than beside it.
    <div className="border-b border-[var(--v4-edge)] py-4 first:pt-0 last:border-b-0 last:pb-0">
      <dt className="flex items-start gap-3.5 font-bold text-[var(--v4-fg)]">
        <span aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--v4-accent)]">
          {glyph}
        </span>
        {term}
      </dt>
      <dd className="v4-caption mt-1.5 pl-[2rem]">{def}</dd>
    </div>
  );
}

/**
 * One of the three things to do about an enquiry you do not recognise.
 *
 * Numbered, because they are in escalating order — ask the lender, then dispute it with CIBIL, then
 * write to us. The card is not the link; the named destination inside the sentence is, so the link
 * keeps the words V1 wrote around it and still says where it goes.
 */
function Action({
  n,
  title,
  children,
  index,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <li>
      <Reveal index={index} className="v4-plane flex h-full flex-col p-6">
        <span aria-hidden="true" className="v4-num text-[0.8125rem] text-[var(--v4-fg-3)]">
          {String(n).padStart(2, "0")}
        </span>
        <h3 className="v4-h3 mt-3">{title}</h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
          {children}
        </p>
      </Reveal>
    </li>
  );
}

/** A recommended read. One link per card — see ConsumerDisputeContent's ArticleCard. */
function Read({
  title,
  excerpt,
  image,
  index,
}: {
  title: string;
  excerpt: string;
  image: string;
  index: number;
}) {
  return (
    <Reveal index={index} variant="focus">
      <Link href={toV4("/blog/main")} className="group block">
        <span className="block overflow-hidden rounded-[var(--v4-r-md)] border border-[var(--v4-edge)] bg-[var(--v4-surface-2)]">
          <Image
            src={image}
            alt=""
            width={480}
            height={270}
            unoptimized
            sizes="(max-width: 640px) 100vw, 33vw"
            className="aspect-video w-full object-cover transition-transform duration-500 ease-[var(--v4-ease)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </span>
        <span className="mt-5 block font-bold leading-snug text-[var(--v4-fg)] group-hover:text-[var(--v4-accent)]">
          {title}
        </span>
        <span className="v4-caption mt-2 block">{excerpt}</span>
      </Link>
    </Reveal>
  );
}

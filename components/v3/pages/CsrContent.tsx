"use client";

import { useState } from "react";
import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { CSR_BLOG_1, CSR_BLOG_2, CSR_DASHBOARD, CSR_HERO } from "@/lib/v3/productArt";
import { Container, Folio, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Emphasise from "@/components/v3/ui/Emphasise";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import { ArrowRight, Close } from "@/components/v3/ui/Icons";

/**
 * CIBIL Score & Report.
 *
 * V1 states the product as a hero, a yellow strapline, a wall of prose, a grid of five icon cards,
 * a laptop, two banners and two blog tiles. Every one of those facts survives here; none of the
 * boxes does.
 *
 * The spine is the dashboard: the page opens on paper, explains what a score and a report *are*
 * in an editorial spread, and then — for the one section that is the actual product — inverts to
 * an ink band and sets the five dashboard features as a numbered ledger. That inversion is the
 * page's only raised voice, and it lands exactly where the argument turns from "here is what this
 * is" to "here is what you get".
 */
const FEATURES: { boldKey: TranslationKey; restKey: TranslationKey }[] = [
  { boldKey: "csrFeatUnlimitedBold", restKey: "csrFeatUnlimited" },
  { boldKey: "csrFeatTrendedBold", restKey: "csrFeatTrended" },
  { boldKey: "csrFeatAlertsBold", restKey: "csrFeatAlerts" },
  { boldKey: "csrFeatWhereBold", restKey: "csrFeatWhere" },
  { boldKey: "csrFeatSimulatorBold", restKey: "csrFeatSimulator" },
];

const BULLETS: TranslationKey[] = ["csrWhyBullet1", "csrWhyBullet2", "csrWhyBullet3"];

export default function CsrContent() {
  const { t, t3 } = useV3();
  const [showFreeBanner, setShowFreeBanner] = useState(true);

  return (
    <>
      <PageHeader
        size="full"
        folio={t("productIndividualsTag")}
        breadcrumbs={[
          { label: t("navProducts"), href: toV3("/choose-subscription") },
          { label: t("megaCibilScoreReport") },
        ]}
        title={[<Emphasise key="t" text={t("csrHeroTitle")} word={t("productIndividualsTitle")} />]}
        actions={
          <Button href={toV3("/choose-subscription")} size="lg" arrow>
            {t("sidebarSubscribeNowBtn")}
          </Button>
        }
        media={<Plate src={CSR_HERO} alt={t("csrHeroTitle")} mount priority ratio="4 / 3" />}
      />

      {/* The strapline. V1 shouts it on a yellow band; a broadsheet prints it as a standfirst — a
          mono label in the margin and the fact beside it, sitting on the masthead's own rule. */}
      <Section space="none" className="py-8 sm:py-10">
        <Container>
          <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-10">
            <p className="v3-folio text-[var(--v3-fg)]">{t("csrDidYouKnowLabel")}</p>
            <p className="v3-lede text-pretty text-[var(--v3-fg)]">{t("csrDidYouKnowText")}</p>
          </div>
        </Container>
      </Section>

      {/* 01 — the definitions, set as a two-column article under a ruled head. */}
      <Section space="lg" ruled>
        <Container>
          <SectionHead
            index="01"
            folio={t3("v3AtAGlance")}
            title={t("csrWhatHeading")}
            lede={t("csrWhatPara3")}
          />

          <div className="mt-14 grid gap-x-16 gap-y-8 lg:grid-cols-2">
            <Reveal variant="rise">
              <p className="text-pretty leading-relaxed text-[var(--v3-fg-2)]">{t("csrWhatPara1")}</p>
            </Reveal>
            <Reveal variant="rise" delay={80}>
              <p className="text-pretty leading-relaxed text-[var(--v3-fg-2)]">{t("csrWhatPara2")}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 02 — the dashboard. The one ink band on the page: the five features become a numbered
          ledger, because a ledger is what a dashboard is. */}
      <Section space="xl" tone="ink">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Folio index="02">{t3("v3KeyPoints")}</Folio>
              <h2 className="v3-h2 mt-8 text-balance">{t("csrDashboardHeading")}</h2>
              <p className="v3-lede mt-6 max-w-[36ch] text-pretty">{t("csrDashboardDesc")}</p>
              <Button href={toV3("/choose-subscription")} size="lg" arrow className="mt-10">
                {t("sidebarSubscribeNowBtn")}
              </Button>
            </div>

            <ul className="border-t border-[var(--v3-line-2)]">
              {FEATURES.map((feature, i) => (
                <Reveal
                  key={feature.boldKey}
                  as="li"
                  variant="rise"
                  delay={i * 70}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-[var(--v3-line)] py-6 sm:grid-cols-[4rem_1fr] sm:gap-x-8 sm:py-7"
                >
                  <span aria-hidden className="v3-num pt-1.5 text-xs text-[var(--v3-fg-3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-lg leading-snug font-medium text-[var(--v3-fg)]">
                      {t(feature.boldKey)}
                    </h3>
                    <p className="mt-1.5 max-w-[48ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                      {t(feature.restKey)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 03 — why subscribe. An asymmetric spread: the argument on the left, the plate on the right. */}
      <Section space="lg">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div className="min-w-0">
              <Folio index="03">{t3("v3DetailsLabel")}</Folio>
              <h2 className="v3-h2 mt-8 max-w-[18ch] text-balance">{t("csrWhyHeading")}</h2>
              <p className="mt-7 max-w-[52ch] text-pretty leading-relaxed text-[var(--v3-fg-2)]">
                {t("csrWhyDesc")}
              </p>

              <p className="mt-9 font-medium text-[var(--v3-fg)]">{t("csrWhyGetStarted")}</p>
              <ul className="mt-4 border-t border-[var(--v3-line)]">
                {BULLETS.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-baseline gap-4 border-b border-[var(--v3-line)] py-3.5 text-sm text-[var(--v3-fg-2)]"
                  >
                    <span aria-hidden className="text-[var(--v3-fg-3)]">
                      —
                    </span>
                    <span>{t(bullet)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Plate
              src={CSR_DASHBOARD}
              alt={t("csrDashboardHeading")}
              mount
              drift
              ratio="16 / 10"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </Container>
      </Section>

      {/* The track-your-decisions band. A wide ruled row, not a card: the claim on the left, the
          action on the right, a hairline under both. */}
      <Section space="md" tone="sunken" ruled>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="min-w-0">
              <h2 className="v3-h3 max-w-[26ch] text-balance">{t("csrTrackHeading")}</h2>
              <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                {t("csrTrackDesc")}
              </p>
            </div>

            <Button href={toV3("/choose-subscription")} variant="outline" size="lg" arrow>
              {t("sidebarSubscribeNowBtn")}
            </Button>
          </div>
        </Container>
      </Section>

      {/* The free-report notice. Dismissible, exactly as in V1 — an errata slip laid on the page. */}
      {showFreeBanner && (
        <Section space="none" ruled className="py-5">
          <Container>
            <div className="flex items-center gap-6">
              <p className="min-w-0 flex-1 text-sm text-[var(--v3-fg-2)]">
                <Link
                  href={toV3("/freecibilscore")}
                  className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
                >
                  {t("csrFreeBannerLink")}
                </Link>{" "}
                {t("csrFreeBannerRest")}
              </p>

              <button
                type="button"
                onClick={() => setShowFreeBanner(false)}
                aria-label={t("csrCloseBanner")}
                className="v3-focus shrink-0 cursor-pointer text-[var(--v3-fg-3)] transition-colors hover:text-[var(--v3-fg)]"
              >
                <Close className="text-base" />
              </button>
            </div>
          </Container>
        </Section>
      )}

      {/* 04 — from the blog. A lead story and a second entry beneath it, the way a page is set. */}
      <Section space="lg" ruled>
        <Container>
          <SectionHead
            index="04"
            folio={t("csrFromBlog")}
            title={t("footerCreditEducation")}
            lede={t("featuredArticlesDesc")}
          />

          <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-[1.3fr_1fr]">
            <Reveal variant="rise">
              <article className="group">
                <Plate
                  src={CSR_BLOG_1}
                  alt=""
                  mount
                  fit="cover"
                  ratio="16 / 9"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="mt-6 border-t border-[var(--v3-line-2)] pt-5">
                  <h3 className="v3-h3 text-pretty">{t("csrBlog1")}</h3>
                  <Link
                    href={toV3("/blog/main")}
                    className="v3-focus v3-num mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] text-[var(--v3-fg-2)] transition-colors hover:text-[var(--v3-accent)]"
                  >
                    {t("readMoreLink")}
                    <ArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-[3px]" />
                  </Link>
                </div>
              </article>
            </Reveal>

            <Reveal variant="rise" delay={90}>
              <article className="group border-t border-[var(--v3-line-2)] pt-5 lg:pt-0 lg:border-t-0">
                <div className="flex items-start gap-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-pretty text-base leading-snug font-medium text-[var(--v3-fg)]">
                      {t("csrBlog2")}
                    </h3>
                    <Link
                      href={toV3("/blog/main")}
                      className="v3-focus v3-num mt-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] text-[var(--v3-fg-2)] transition-colors hover:text-[var(--v3-accent)]"
                    >
                      {t("readMoreLink")}
                      <ArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-[3px]" />
                    </Link>
                  </div>

                  <Plate
                    src={CSR_BLOG_2}
                    alt=""
                    mount
                    fit="cover"
                    ratio="4 / 3"
                    sizes="180px"
                    className="w-32 shrink-0 sm:w-44"
                  />
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

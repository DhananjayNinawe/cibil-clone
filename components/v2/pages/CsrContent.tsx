"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import type { TranslationKey } from "@/lib/i18n";
import PageHero from "@/components/v2/ui/PageHero";
import Backdrop from "@/components/v2/ui/Backdrop";
import Button from "@/components/v2/ui/Button";
import Plate from "@/components/v2/ui/Plate";
import Prose from "@/components/v2/ui/Prose";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import {
  BellIcon,
  CloseIcon,
  GaugeIcon,
  MapPinIcon,
  PeopleIcon,
  ReportChartIcon,
  TrendIcon,
  ArrowRightIcon,
} from "@/components/icons";

/* The same four cibil.com assets V1's page uses — nothing new is introduced. */
const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/banners/cibil_score_report.png";
const LAPTOP_IMAGE =
  "https://www.cibil.com/consumer/_jcr_content/root/contentcontainer/pagesection_2012935909/columnrow/image.coreimg.75.1440.png/1715930130945/consumer-laptop.png";
const BLOG1_IMAGE =
  "https://www.cibil.com/blog/credit-matters-at-every-important-stage-in-your-life/_jcr_content/teaserImage.coreimg.75.1440.png/1726219468878/credit-rating-across-life.png";
const BLOG2_IMAGE =
  "https://www.cibil.com/blog/first-time-users-guide-to-establishing-credit/_jcr_content/teaserImage.coreimg.75.1440.png/1671208834821/first-time-users-guide.png";

type Feature = {
  Icon: (props: { className?: string }) => React.ReactElement;
  boldKey: TranslationKey;
  restKey: TranslationKey;
};

const FEATURES: Feature[] = [
  { Icon: ReportChartIcon, boldKey: "csrFeatUnlimitedBold", restKey: "csrFeatUnlimited" },
  { Icon: TrendIcon, boldKey: "csrFeatTrendedBold", restKey: "csrFeatTrended" },
  { Icon: BellIcon, boldKey: "csrFeatAlertsBold", restKey: "csrFeatAlerts" },
  { Icon: PeopleIcon, boldKey: "csrFeatWhereBold", restKey: "csrFeatWhere" },
  { Icon: GaugeIcon, boldKey: "csrFeatSimulatorBold", restKey: "csrFeatSimulator" },
];

const WHY_BULLETS: TranslationKey[] = ["csrWhyBullet1", "csrWhyBullet2", "csrWhyBullet3"];

/**
 * CIBIL Score & Report — the flagship consumer product page.
 *
 * V1 stacks six grey bands; V2 gives the page a spine. The dashboard's five capabilities become
 * a numbered rail against a sticky pitch, "why subscribe" becomes an editorial spread, and the
 * "track your decisions" band is a lit full-bleed close rather than another grey strip. Every
 * word, image and destination is V1's.
 */
export default function CsrContent() {
  const { t } = useV2();
  const [showFreeBanner, setShowFreeBanner] = useState(true);

  const subscribe = (
    <Button href={toV2("/choose-subscription")} size="lg" arrow magnetic>
      {t("sidebarSubscribeNowBtn")}
    </Button>
  );

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("navProducts") }, { label: t("productIndividualsTitle") }]}
        eyebrow={t("productIndividualsTag")}
        title={t("productIndividualsTitle")}
        lede={t("csrHeroTitle")}
        actions={subscribe}
        tone="duo"
        size="md"
        media={
          <Parallax speed={0.05}>
            <Plate src={HERO_IMAGE} alt={t("csrHeroTitle")} width={560} height={370} priority />
          </Parallax>
        }
      />

      {/* "Did you know?" — V1's yellow strip, kept as a strip because it is an aside, not a section. */}
      <div className="relative border-y border-[rgba(245,197,24,0.28)] bg-[rgba(245,197,24,0.08)] py-4">
        <Container>
          <p className="flex items-center justify-center gap-3 text-center text-sm text-[var(--v2-text-2)]">
            <MapPinIcon className="h-4 w-4 shrink-0 text-[var(--v2-gold)]" />
            <span>
              <span className="font-bold text-[var(--v2-gold)]">{t("csrDidYouKnowLabel")}</span>{" "}
              {t("csrDidYouKnowText")}
            </span>
          </p>
        </Container>
      </div>

      {/* What is a CIBIL Score & Report — editorial two-column spread. */}
      <Section space="lg" tone="canvas">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <SectionHeading
              index="01"
              eyebrow={t("productIndividualsTag")}
              title={t("csrWhatHeading")}
              className="lg:sticky lg:top-32 lg:self-start"
            />

            <Reveal variant="up">
              <Prose className="max-w-none text-[1.0625rem]">
                <p>{t("csrWhatPara1")}</p>
                <p>{t("csrWhatPara2")}</p>
                <p className="!mb-0 font-bold !text-[var(--v2-text)]">{t("csrWhatPara3")}</p>
              </Prose>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The dashboard's five capabilities, as a numbered rail. */}
      <Section space="xl" tone="raised">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading index="02" eyebrow={t("navProducts")} title={t("csrDashboardHeading")} />
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[var(--v2-text-2)]">
                {t("csrDashboardDesc")}
              </p>
              <div className="mt-9">{subscribe}</div>
            </div>

            <ul>
              {FEATURES.map(({ Icon, boldKey, restKey }, index) => (
                <Reveal
                  as="li"
                  key={boldKey}
                  variant="up"
                  delay={index * 90}
                  className="group flex items-start gap-6 border-t border-[var(--v2-line)] py-7 last:border-b"
                >
                  <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(0,176,240,0.35)] bg-[var(--v2-cyan-dim)] text-[var(--v2-cyan)] transition-shadow duration-500 group-hover:shadow-[var(--v2-glow-cyan)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-[15px] leading-relaxed text-[var(--v2-text-2)]">
                    <span className="block text-lg font-bold leading-snug text-[var(--v2-text)]">
                      {t(boldKey)}
                    </span>
                    <span className="mt-1.5 block">{t(restKey)}</span>
                  </p>
                  <span
                    aria-hidden
                    className="ml-auto hidden shrink-0 pt-1 font-light tabular-nums text-[var(--v2-text-3)] transition-colors duration-500 group-hover:text-[var(--v2-cyan)] sm:block"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Why subscribe — copy left, the dashboard on its plate right. */}
      <Section space="xl" tone="canvas">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeading index="03" eyebrow={t("productIndividualsTag")} title={t("csrWhyHeading")} />
              <Reveal variant="up" delay={80}>
                <p className="mt-7 text-[15px] leading-relaxed text-[var(--v2-text-2)]">{t("csrWhyDesc")}</p>
                <p className="mt-8 text-base font-bold text-[var(--v2-text)]">{t("csrWhyGetStarted")}</p>
                <ul className="mt-5 space-y-3.5">
                  {WHY_BULLETS.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-[15px] text-[var(--v2-text-2)]">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.9)]"
                      />
                      <span>{t(bullet)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Parallax speed={0.06}>
              <Reveal variant="blur">
                <Plate src={LAPTOP_IMAGE} alt={t("csrDashboardHeading")} width={600} height={370} />
              </Reveal>
            </Parallax>
          </div>
        </Container>
      </Section>

      {/* Track your decisions — the conversion band. */}
      <Section space="lg" tone="deep" className="isolate overflow-hidden">
        <Backdrop tone="cyan" />
        <Container className="relative">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Reveal variant="fade">
                <Eyebrow index="04">{t("navProducts")}</Eyebrow>
              </Reveal>
              <Reveal variant="up" delay={80}>
                <h2 className="v2-h2 mt-5 text-balance text-[var(--v2-text)]">{t("csrTrackHeading")}</h2>
                <p className="v2-lede mt-6 text-pretty">{t("csrTrackDesc")}</p>
              </Reveal>
            </div>
            <Reveal variant="up" delay={160} className="shrink-0">
              {subscribe}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Free-report reminder — dismissible, exactly as V1. */}
      {showFreeBanner && (
        <div className="border-b border-[var(--v2-line)] bg-[var(--v2-elev-1)]">
          <Container className="flex items-center gap-4 py-4">
            <p className="flex-1 text-center text-sm text-[var(--v2-text-2)]">
              <Link
                href={toV2("/freecibilscore")}
                className="v2-focus v2-underline font-bold text-[var(--v2-cyan)]"
              >
                {t("csrFreeBannerLink")}
              </Link>{" "}
              {t("csrFreeBannerRest")}
            </p>
            <button
              type="button"
              onClick={() => setShowFreeBanner(false)}
              aria-label={t("csrCloseBanner")}
              className="v2-focus shrink-0 rounded-full p-2 text-[var(--v2-text-3)] transition-colors hover:bg-[var(--v2-surface)] hover:text-[var(--v2-text)]"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </Container>
        </div>
      )}

      {/* From the blog. */}
      <Section space="xl" tone="canvas">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <Reveal variant="fade">
                <Eyebrow index="05">{t("csrFromBlog")}</Eyebrow>
              </Reveal>
              <Reveal variant="up" delay={80}>
                <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-[var(--v2-text-2)]">
                  {t("featuredArticlesDesc")}
                </p>
              </Reveal>
            </div>

            <BlogCard image={BLOG1_IMAGE} titleKey="csrBlog1" delay={0} />
            <BlogCard image={BLOG2_IMAGE} titleKey="csrBlog2" delay={120} />
          </div>
        </Container>
      </Section>
    </>
  );
}

/**
 * V1 points these at "#". A dead href is not something V2 can ship, so each card leads to the
 * blog index it belongs to — the same content, an honest destination.
 */
function BlogCard({
  image,
  titleKey,
  delay,
}: {
  image: string;
  titleKey: TranslationKey;
  delay: number;
}) {
  const { t } = useV2();

  return (
    <Reveal variant="up" delay={delay}>
      <Link href={toV2("/blog")} className="v2-focus group block">
        <div className="relative aspect-5/2 overflow-hidden rounded-[var(--v2-r-md)] border border-[var(--v2-line)] bg-[var(--v2-elev-1)]">
          <Image
            src={image}
            alt={t(titleKey)}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-[var(--v2-ease)] group-hover:scale-[1.06]"
          />
        </div>
        <h3 className="mt-6 text-lg font-bold leading-snug text-[var(--v2-text)] transition-colors duration-300 group-hover:text-[var(--v2-cyan-soft)]">
          {t(titleKey)}
        </h3>
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[var(--v2-cyan)]">
          {t("readMoreLink")}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-[var(--v2-ease)] group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

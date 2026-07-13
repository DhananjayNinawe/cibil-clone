"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/v4/ui/PageHero";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { ButtonLink, TextLink } from "@/components/v4/ui/Button";
import { Reveal } from "@/components/v4/motion/Reveal";
import {
  BellIcon,
  ChartIcon,
  CheckIcon,
  DocumentIcon,
  InfoIcon,
  ScoreIcon,
  UsersIcon,
  type IconProps,
} from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * CIBIL Score & Report — the front door for individuals.
 *
 * V1 opens it with a stock illustration and a gold pill, then states the two things the whole page
 * turns on — *what a score is* and *what a report is* — as two undifferentiated paragraphs of grey
 * body copy. They are not paragraphs. They are two **definitions**, and the reader is here because
 * they do not yet hold either of them; so V4 sets them as a facing pair of planes, one term each,
 * which is the shape a definition has.
 *
 * The rest follows the page's own argument: here is the instrument panel you get (a night band —
 * the one place you *look* rather than read), here is why it is worth paying for, and here is what
 * it costs you to do nothing.
 *
 * Every sentence is V1's, through `t()`. The hierarchy is the redesign.
 */

/* The artwork V1 already ships on this page. Re-used, not re-drawn. */
const IMAGES = {
  laptop:
    "https://www.cibil.com/consumer/_jcr_content/root/contentcontainer/pagesection_2012935909/columnrow/image.coreimg.75.1440.png/1715930130945/consumer-laptop.png",
  blog1:
    "https://www.cibil.com/blog/credit-matters-at-every-important-stage-in-your-life/_jcr_content/teaserImage.coreimg.75.1440.png/1726219468878/credit-rating-across-life.png",
  blog2:
    "https://www.cibil.com/blog/first-time-users-guide-to-establishing-credit/_jcr_content/teaserImage.coreimg.75.1440.png/1671208834821/first-time-users-guide.png",
};

interface Feature {
  icon: (props: IconProps) => React.ReactElement;
  bold: TranslationKey;
  rest: TranslationKey;
}

/* The five instruments on the dashboard, in V1's own order. The glyphs are V4's — V1's set mixes
   fill weights and grids, and a panel of instruments has to be engraved to one spec. */
const FEATURES: Feature[] = [
  { icon: DocumentIcon, bold: "csrFeatUnlimitedBold", rest: "csrFeatUnlimited" },
  { icon: ChartIcon, bold: "csrFeatTrendedBold", rest: "csrFeatTrended" },
  { icon: BellIcon, bold: "csrFeatAlertsBold", rest: "csrFeatAlerts" },
  { icon: UsersIcon, bold: "csrFeatWhereBold", rest: "csrFeatWhere" },
  { icon: ScoreIcon, bold: "csrFeatSimulatorBold", rest: "csrFeatSimulator" },
];

const WHY_BULLETS: TranslationKey[] = ["csrWhyBullet1", "csrWhyBullet2", "csrWhyBullet3"];

export default function CsrContent() {
  const { t, t4 } = useV4();

  return (
    <>
      <PageHero
        tone="night"
        breadcrumb={{ label: t("navProducts"), href: toV4("/choose-subscription") }}
        label={t("productIndividualsTag")}
        title={t("csrHeroTitle")}
        lede={t("productIndividualsDesc")}
        actions={
          <ButtonLink href={toV4("/choose-subscription")} size="lg" arrow>
            {t("sidebarSubscribeNowBtn")}
          </ButtonLink>
        }
        aside={
          /* Not a photograph — a plane of two facts. The first is the reason a stranger is on this
             page at all (a lender will look you up), and the second is the one thing CIBIL gives
             away, marked in gold because gold in V4 means exactly one thing: this is yours. */
          <div className="v4-plane p-6 sm:p-8">
            <p className="flex items-start gap-3.5">
              <InfoIcon size={19} className="mt-0.5 shrink-0 text-[var(--v4-accent)]" />
              <span className="text-[1.0625rem] leading-relaxed text-[var(--v4-fg-2)]">
                <strong className="font-bold text-[var(--v4-fg)]">
                  {t("csrDidYouKnowLabel")}
                </strong>{" "}
                {t("csrDidYouKnowText")}
              </span>
            </p>

            <div className="mt-7 border-t border-[var(--v4-edge)] pt-6">
              <span className="v4-chip v4-chip-you">{t("planFreeAnnualPrice")}</span>
              <p className="v4-caption mt-3.5">
                <Link href={toV4("/freecibilscore")} className="v4-link">
                  {t("csrFreeBannerLink")}
                </Link>{" "}
                {t("csrFreeBannerRest")}
              </p>
            </div>
          </div>
        }
      />

      {/* ── The two definitions. ─────────────────────────────────────────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-csr-what">
        <Container width="wide">
          <SectionHead id="v4-csr-what" title={t("csrWhatHeading")} />

          <div className="mt-11 grid gap-5 lg:grid-cols-2">
            <Reveal className="v4-plane h-full p-7 sm:p-9">
              <h3 className="v4-h3">{t("featCibilScore")}</h3>
              <p className="v4-body mt-4">{t("csrWhatPara1")}</p>
            </Reveal>

            <Reveal index={1} className="v4-plane h-full p-7 sm:p-9">
              <h3 className="v4-h3">{t("featCibilCreditReport")}</h3>
              <p className="v4-body mt-4">{t("csrWhatPara2")}</p>
            </Reveal>
          </div>

          <p className="v4-lede mt-8">{t("csrWhatPara3")}</p>
        </Container>
      </Section>

      {/* ── The dashboard. A night band: this is the section you look at, not the one you read. ─ */}
      <Section tone="night" aria-labelledby="v4-csr-dashboard">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <SectionHead
                id="v4-csr-dashboard"
                label={t4("v4SectionService")}
                title={t("csrDashboardHeading")}
                lede={t("csrDashboardDesc")}
              />
              <div className="mt-8">
                <ButtonLink href={toV4("/choose-subscription")} arrow>
                  {t("sidebarSubscribeNowBtn")}
                </ButtonLink>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {FEATURES.map((feature, i) => (
                <Reveal
                  as="li"
                  key={feature.bold}
                  index={i}
                  className="v4-plane flex items-start gap-4 p-5 sm:p-6"
                >
                  <feature.icon
                    size={22}
                    className="mt-0.5 shrink-0 text-[var(--v4-accent)]"
                  />
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                    <strong className="block font-bold text-[var(--v4-fg)]">
                      {t(feature.bold)}
                    </strong>
                    {t(feature.rest)}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── Why subscribe. ──────────────────────────────────────────────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-csr-why">
        <Container width="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHead id="v4-csr-why" title={t("csrWhyHeading")} lede={t("csrWhyDesc")} />

              <p className="mt-8 font-bold text-[var(--v4-fg)]">{t("csrWhyGetStarted")}</p>
              <ul className="mt-4 grid gap-3">
                {WHY_BULLETS.map((bullet, i) => (
                  <Reveal
                    as="li"
                    key={bullet}
                    index={i}
                    className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]"
                  >
                    <CheckIcon
                      size={18}
                      className="mt-0.5 shrink-0 text-[var(--v4-success)]"
                    />
                    <span>{t(bullet)}</span>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* CIBIL's own dashboard artwork. It earns its place here — it is the thing being sold
                three paragraphs above it — and it is decorative, so it carries an empty alt rather
                than a description a screen reader would have to sit through. */}
            <Reveal variant="focus" className="relative aspect-[16/10] w-full">
              <Image
                src={IMAGES.laptop}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-contain"
                unoptimized
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── The closing claim: one sentence, one action. ─────────────────────────────────────── */}
      <Section tone="tint" space="md" aria-labelledby="v4-csr-track">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div>
              <h2 id="v4-csr-track" className="v4-h3">
                {t("csrTrackHeading")}
              </h2>
              <p className="v4-body mt-3 !max-w-[52rem] !text-[0.9375rem]">{t("csrTrackDesc")}</p>
            </div>
            <ButtonLink href={toV4("/choose-subscription")} size="lg" arrow>
              {t("sidebarSubscribeNowBtn")}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ── From the blog. ──────────────────────────────────────────────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-csr-blog">
        <Container width="wide">
          <SectionHead
            id="v4-csr-blog"
            label={t("csrFromBlog")}
            title={t("footerCreditEducation")}
            lede={t("featuredArticlesDesc")}
          />

          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {[
              { image: IMAGES.blog1, title: "csrBlog1" as TranslationKey },
              { image: IMAGES.blog2, title: "csrBlog2" as TranslationKey },
            ].map((post, i) => (
              <Reveal key={post.title} variant="focus" index={i}>
                <article className="v4-plane v4-plane-lift group h-full overflow-hidden">
                  <div className="relative aspect-[5/2] w-full bg-[var(--v4-surface-2)]">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 45vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="v4-h3">{t(post.title)}</h3>
                    <TextLink href={toV4("/blog/main")} className="mt-4">
                      {t("readMoreLink")}
                    </TextLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

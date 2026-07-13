"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import type { TranslationKey } from "@/lib/i18n";
import OfferBanner from "@/components/shared/OfferBanner";
import PageHero from "@/components/v2/ui/PageHero";
import Backdrop from "@/components/v2/ui/Backdrop";
import Button from "@/components/v2/ui/Button";
import Card from "@/components/v2/ui/Card";
import Plate from "@/components/v2/ui/Plate";
import Tabs, { type TabItem } from "@/components/v2/ui/Tabs";
import Accordion, { type AccordionItem } from "@/components/v2/ui/Accordion";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import {
  CheckCircleIcon,
  CircleCheckOutlineIcon,
  ClipboardIcon,
  CrossCircleIcon,
  PlayIcon,
  RosetteCheckIcon,
} from "@/components/icons";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/vyapaari.jpg";
const RANK_VIDEO = "https://www.cibil.com/content/dam/cibil/consumer/media/video/cibil-rank.mp4";

const BENEFITS: {
  id: string;
  Icon: (props: { className?: string }) => React.ReactElement;
  title: TranslationKey;
  desc: TranslationKey;
}[] = [
  { id: "rate", Icon: RosetteCheckIcon, title: "ccpBenefit1Title", desc: "ccpBenefit1Desc" },
  { id: "proposals", Icon: ClipboardIcon, title: "ccpBenefit2Title", desc: "ccpBenefit2Desc" },
  { id: "ready", Icon: CircleCheckOutlineIcon, title: "ccpBenefit3Title", desc: "ccpBenefit3Desc" },
];

type CcrPlan = {
  /* V1 hardcodes the plan names as Latin capitals ("BASIC"). The catalog already translates
     them — `planBasicName` and friends — so V2 reads them from there instead. */
  name: TranslationKey;
  price: TranslationKey;
  period: TranslationKey;
  refresh: TranslationKey;
  saksham: boolean;
  featured?: boolean;
};

const PLANS: CcrPlan[] = [
  {
    name: "planBasicName",
    price: "ccpBasicPrice",
    period: "ccpBasicPeriod",
    refresh: "ccpBasicRefresh",
    saksham: false,
  },
  {
    name: "planStandardName",
    price: "ccpStandardPrice",
    period: "ccpStandardPeriod",
    refresh: "ccpStandardRefresh",
    saksham: true,
  },
  {
    name: "planPremiumName",
    price: "ccpPremiumPrice",
    period: "ccpPremiumPeriod",
    refresh: "ccpPremiumRefresh",
    saksham: true,
    featured: true,
  },
];

const THINGS: TranslationKey[] = ["ccpThing1", "ccpThing2", "ccpThing3"];

const INTRO: { q: TranslationKey; body: TranslationKey[] }[] = [
  { q: "ccpQ1", body: ["ccpA1"] },
  { q: "ccpQ2", body: ["ccpQ2Bullet1", "ccpQ2Bullet2"] },
];

const FAQ_TABS: { label: TranslationKey; items: { q: TranslationKey; a: TranslationKey }[] }[] = [
  {
    label: "ccpFaqTab1",
    items: [
      { q: "ccpFaq1", a: "ccpFaqA1" },
      { q: "ccpFaq2", a: "ccpFaqA2" },
    ],
  },
  {
    label: "ccpFaqTab2",
    items: [
      { q: "ccpFaq3", a: "ccpFaqA3" },
      { q: "ccpFaq4", a: "ccpFaqA4" },
    ],
  },
];

/**
 * CIBIL Rank & the Company Credit Report — the business half of the product line.
 *
 * V1 runs it as a light consumer page with a photo bleeding off the right. V2 keeps the photo but
 * treats the page as a business brief: the two founding questions open as an accordion beside the
 * product film, the three benefits are stated as cards, and the three plans are read as columns
 * with the same rows in the same order, so they can be compared down the page on a phone.
 */
export default function CcrProductContent() {
  const { t } = useV2();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("navBusiness") }, { label: t("sitemapRankCompanyReport") }]}
        eyebrow={t("productBusinessTag")}
        title={t("ccpHeroTitle")}
        lede={t("ccpHeroDesc")}
        tone="deep"
        size="md"
        actions={
          <>
            <Button href={toV2("/choose-subscription")} size="lg" arrow magnetic>
              {t("sidebarSubscribeNowBtn")}
            </Button>
            <p className="text-sm text-[var(--v2-text-2)]">
              {t("ccpAlready")}{" "}
              <Link href={toV2("/login")} className="v2-focus v2-underline font-bold text-[var(--v2-cyan)]">
                {t("loginNow")}
              </Link>
            </p>
          </>
        }
        media={
          <Parallax speed={0.05}>
            <Plate
              src={HERO_IMAGE}
              alt={t("ccpHeroTitle")}
              width={780}
              height={480}
              surface="dark"
              priority
            />
          </Parallax>
        }
      />

      {/* The live offer. V1's banner is imported wholesale rather than rebuilt: the countdown owns
          the campaign deadline, and a second copy of that date would be a bug waiting to happen.
          Its brand navy is already V2's --v2-deep, so it seats cleanly on the dark canvas. */}
      <Section space="sm" tone="canvas">
        <Container>
          <Reveal variant="scale">
            <div className="v2-rim overflow-hidden rounded-[var(--v2-r-lg)] shadow-[var(--v2-shadow-2)]">
              <OfferBanner />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* What the Rank is, and what the CCR is — beside the film. */}
      <Section space="lg" tone="canvas">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal variant="fade">
                <Eyebrow index="01">{t("productBusinessTitle")}</Eyebrow>
              </Reveal>
              <Reveal variant="up" delay={80} className="mt-8">
                <Accordion
                  defaultOpen={1}
                  items={INTRO.map<AccordionItem>((item) => ({
                    id: item.q,
                    question: t(item.q),
                    answer:
                      item.body.length > 1 ? (
                        <ul>
                          {item.body.map((key) => (
                            <li key={key}>{t(key)}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{t(item.body[0])}</p>
                      ),
                  }))}
                />
              </Reveal>
            </div>

            <Reveal variant="blur" delay={120}>
              <RankVideo />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Check now + the Demand Draft route. */}
      <Section space="md" tone="raised">
        <Container width="narrow">
          <Reveal variant="up" className="text-center">
            <Button href={toV2("/register")} size="lg" arrow magnetic>
              {t("ccpCheckNow")}
            </Button>
            {/* V1 hangs "DOWNLOAD" off href="#". V2 does not ship dead links, so the word stays —
                emphasised, not linked — and the instruction it introduces is unchanged. */}
            <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-[var(--v2-text-2)]">
              {t("ccpDownloadPrefix")}{" "}
              <strong className="font-bold text-[var(--v2-text)]">&quot;{t("ccpDownloadLink")}&quot;</strong>{" "}
              {t("ccpDownloadSuffix")}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Benefits. */}
      <Section space="xl" tone="canvas" className="isolate overflow-hidden">
        <Backdrop tone="deep" />
        <Container className="relative">
          <SectionHeading
            index="02"
            align="center"
            eyebrow={t("navBusiness")}
            title={t("ccpBenefitsHeading")}
            lede={t("ccpBenefitsSub")}
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {BENEFITS.map(({ id, Icon, title, desc }, index) => (
              <Reveal key={id} variant="up" delay={index * 110}>
                <Card spotlight interactive padding="lg" className="h-full text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(0,176,240,0.3)] bg-[var(--v2-cyan-dim)]">
                    <Icon className="h-8 w-8 text-[var(--v2-cyan)]" />
                  </span>
                  <h3 className="mt-6 text-base font-bold text-[var(--v2-text)]">{t(title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--v2-text-2)]">{t(desc)}</p>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal variant="fade" delay={200}>
            <p className="mt-8 text-center text-xs italic text-[var(--v2-text-3)]">
              {t("ccpBenefitsDisclaimer")}
            </p>
          </Reveal>

          <Reveal variant="up" delay={260} className="mt-12 flex justify-center">
            <Button href={toV2("/register")} size="lg" arrow magnetic>
              {t("ccpGetCcrNow")}
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Plans. */}
      <Section space="xl" tone="raised">
        <Container>
          <SectionHeading
            index="03"
            align="center"
            eyebrow={t("sitemapCreditReportProducts")}
            title={t("ccpMonitorHeading")}
            lede={t("ccpMonitorDesc")}
          />

          <div className="mt-14 grid items-start gap-6 sm:grid-cols-3">
            {PLANS.map((plan, index) => (
              <PlanColumn key={plan.name} plan={plan} index={index} />
            ))}
          </div>

          {/* Things you need to understand. V1 links these three to "#" — the labels stay, the
              dead hrefs do not. */}
          <div className="mt-20">
            <Reveal variant="fade" className="flex justify-center">
              <span className="v2-eyebrow border-b-2 border-[var(--v2-gold)] pb-2 text-[var(--v2-text)]">
                {t("ccpThingsHeading")}
              </span>
            </Reveal>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {THINGS.map((thing, index) => (
                <Reveal
                  as="li"
                  key={thing}
                  variant="up"
                  delay={index * 90}
                  className="v2-glass v2-rim rounded-[var(--v2-r-md)] p-5 text-center text-sm text-[var(--v2-text-2)]"
                >
                  {t(thing)}
                </Reveal>
              ))}
            </ul>
          </div>

          {/* FAQs, split by the two things people ask about. */}
          <div className="mt-20">
            <Reveal variant="fade" className="flex justify-center">
              <span className="v2-eyebrow border-b-2 border-[var(--v2-gold)] pb-2 text-[var(--v2-text)]">
                {t("ccpFaqHeading")}
              </span>
            </Reveal>

            <Reveal variant="up" delay={80} className="mx-auto mt-10 flex max-w-3xl flex-col items-center">
              <Tabs
                label={t("ccpFaqHeading")}
                className="w-full"
                items={FAQ_TABS.map<TabItem>((tab) => ({
                  id: tab.label,
                  label: t(tab.label),
                  panel: (
                    <Accordion
                      items={tab.items.map<AccordionItem>(({ q, a }) => ({
                        id: q,
                        question: t(q),
                        answer: <p>{t(a)}</p>,
                      }))}
                    />
                  ),
                }))}
              />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

/** The CIBIL Rank film, with V1's poster-state play affordance kept. */
function RankVideo() {
  const { t } = useV2();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="v2-rim relative aspect-video overflow-hidden rounded-[var(--v2-r-lg)] bg-black shadow-[var(--v2-shadow-3)]">
      <video
        ref={videoRef}
        src={RANK_VIDEO}
        controls
        preload="metadata"
        playsInline
        onPlay={() => setPlaying(true)}
        className="h-full w-full"
      >
        <track kind="captions" />
      </video>

      {!playing && (
        <button
          type="button"
          aria-label={t("ccpPlayVideo")}
          onClick={() => void videoRef.current?.play()}
          className="v2-focus absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md transition-all duration-500 ease-[var(--v2-ease)] hover:scale-110 hover:border-[var(--v2-cyan)] hover:bg-[rgba(0,176,240,0.25)]">
            <PlayIcon className="ml-1 h-8 w-8 text-white" />
          </span>
        </button>
      )}
    </div>
  );
}

function PlanColumn({ plan, index }: { plan: CcrPlan; index: number }) {
  const { t, tv } = useV2();
  const featured = plan.featured ?? false;

  return (
    <Reveal variant="up" delay={index * 110} className={featured ? "sm:-mt-6" : ""}>
      <div
        className={`v2-rim relative flex h-full flex-col overflow-hidden rounded-[var(--v2-r-lg)] transition-[transform,box-shadow] duration-500 ease-[var(--v2-ease)] hover:-translate-y-1 ${
          featured
            ? "bg-linear-to-b from-[#0f5773] to-[#0a3a52] shadow-[0_28px_90px_-30px_rgba(245,197,24,0.5),var(--v2-shadow-3)]"
            : "v2-glass shadow-[var(--v2-shadow-1)]"
        }`}
      >
        <p className="border-b border-[var(--v2-line)] py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-[var(--v2-cyan)]">
          {t(plan.name)}
        </p>

        <div className="px-6 py-7 text-center">
          <p className="text-3xl font-light tracking-tight tabular-nums text-[var(--v2-text)]">
            {t(plan.price)}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--v2-text-2)]">
            {t(plan.period)}
          </p>
        </div>

        <ul className="flex-1 space-y-4 border-t border-[var(--v2-line)] px-6 py-6 text-sm">
          <li className="flex items-start gap-3 text-[var(--v2-text-2)]">
            <CheckCircleIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--v2-cyan)]" />
            <span>{t(plan.refresh)}</span>
          </li>
          <li className="flex items-start gap-3 text-[var(--v2-text-2)]">
            <CheckCircleIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--v2-cyan)]" />
            <span>{t("ccpAccessDashboard")}</span>
          </li>
          {/* V1 leaves this cell blank on Basic. A blank cell in a column is ambiguous; the cross
              says the same thing and can actually be read. */}
          <li
            className={`flex items-start gap-3 ${
              plan.saksham ? "text-[var(--v2-text-2)]" : "text-[var(--v2-text-3)] line-through"
            }`}
          >
            {plan.saksham ? (
              <CheckCircleIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--v2-cyan)]" />
            ) : (
              <CrossCircleIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--v2-error)]" />
            )}
            <span>{t("featCibilSaksham")}</span>
            <span className="sr-only">{tv(plan.saksham ? "v2Included" : "v2NotIncluded")}</span>
          </li>
        </ul>

        <div className="border-t border-[var(--v2-line)] p-6">
          <Button
            href={toV2("/choose-subscription")}
            variant={featured ? "primary" : "ghost"}
            size="sm"
            full
            className={featured ? "" : "border-[rgba(245,197,24,0.55)] hover:border-[var(--v2-gold)] hover:text-[var(--v2-gold)]"}
          >
            {t("sidebarSubscribeNowBtn")}
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

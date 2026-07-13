"use client";

import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import type { TranslationKey } from "@/lib/i18n";
import PageHero from "@/components/v2/ui/PageHero";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import DataTable from "@/components/v2/ui/DataTable";
import Accordion, { type AccordionItem } from "@/components/v2/ui/Accordion";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import {
  BellIcon,
  CheckIcon,
  GaugeIcon,
  PeopleIcon,
  ReportChartIcon,
  TrendIcon,
  XMarkIcon,
} from "@/components/icons";

const SIMULATOR_VIDEO = "https://www.cibil.com/content/dam/cibil/consumer/scr-sim%20video.mp4";

type FeatureRow = {
  Icon: (props: { className?: string }) => React.ReactElement;
  boldKey: TranslationKey;
  descKey: TranslationKey;
  /** Basic is the only plan that drops a row (Alerts). */
  basic: boolean;
};

const FEATURE_ROWS: FeatureRow[] = [
  { Icon: ReportChartIcon, boldKey: "csrFeatUnlimitedBold", descKey: "csrFeatUnlimited", basic: true },
  { Icon: GaugeIcon, boldKey: "csrFeatSimulatorBold", descKey: "csrFeatSimulator", basic: true },
  { Icon: BellIcon, boldKey: "csrFeatAlertsBold", descKey: "csrFeatAlerts", basic: false },
  { Icon: TrendIcon, boldKey: "csrFeatTrendedBold", descKey: "csrFeatTrended", basic: true },
  { Icon: PeopleIcon, boldKey: "csrFeatWhereBold", descKey: "csrFeatWhere", basic: true },
];

type SimPlan = {
  id: string;
  name: TranslationKey;
  price: TranslationKey;
  period: TranslationKey;
  featured?: boolean;
};

const PLANS: SimPlan[] = [
  { id: "basic", name: "sspPlanBasic", price: "planBasicPrice", period: "planBasicPeriod" },
  { id: "standard", name: "sspPlanStandard", price: "planStandardPrice", period: "planStandardPeriod" },
  { id: "premium", name: "sspPlanPremium", price: "planPremiumPrice", period: "planPremiumPeriod", featured: true },
];

const FAQS: { q: TranslationKey; a: TranslationKey; period?: boolean }[] = [
  { q: "ssQ1", a: "ssA1" },
  { q: "ssQ2", a: "ssA2Intro" },
  // V1 ends this one with a full stop the catalog does not carry — the key is a clause, not a sentence.
  { q: "ssQ3", a: "ssA3Para1Prefix", period: true },
  { q: "ssQ4", a: "ssA4" },
  { q: "ssQ5", a: "ssA5" },
];

/**
 * The Score Simulator.
 *
 * A "what if" tool, so the page leads with the demonstration — the product's own video sits beside
 * the explanation rather than below it — and the plan comparison is a real matrix: one axis of
 * capabilities, one of plans, the recommended column lit down its full height.
 */
export default function ScoreSimulatorContent() {
  const { t } = useV2();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("navProducts") }, { label: t("featScoreSimulator") }]}
        eyebrow={t("sitemapCreditReportProducts")}
        title={t("sspHeroTitle")}
        lede={t("ssHeroDesc")}
        align="center"
        tone="cyan"
        size="md"
        actions={
          <Button href={toV2("/register")} size="lg" arrow magnetic>
            {t("simulateNowBtn")}
          </Button>
        }
      />

      {/* How it works, beside the product's own film. */}
      <Section space="lg" tone="canvas">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading index="01" eyebrow={t("navProducts")} title={t("sspHowHeading")} />
              <Reveal variant="up" delay={80}>
                <p className="mt-7 text-[15px] leading-relaxed text-[var(--v2-text-2)]">{t("sspHowPara1")}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--v2-text-2)]">{t("sspHowPara2")}</p>
              </Reveal>
            </div>

            <Reveal variant="blur" delay={120}>
              <div className="v2-rim relative overflow-hidden rounded-[var(--v2-r-lg)] shadow-[var(--v2-shadow-3)]">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  aria-label={t("sspHowHeading")}
                  className="aspect-video w-full bg-black"
                >
                  <source src={SIMULATOR_VIDEO} type="video/mp4" />
                  <track kind="captions" />
                </video>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The plan matrix. */}
      <Section space="xl" tone="raised">
        <Container>
          <SectionHeading index="02" eyebrow={t("navProducts")} title={t("sspTableHeading")} lede={t("sspTableDesc")} />

          <Reveal variant="up" delay={80} className="mt-14">
            <DataTable
              caption={t("sspTableHeading")}
              columns={[
                <span key="head" className="sr-only">
                  {t("sspTableDesc")}
                </span>,
                ...PLANS.map((plan) => <PlanHead key={plan.id} plan={plan} />),
              ]}
              rows={FEATURE_ROWS.map((row) => [
                <FeatureCell key={row.boldKey} row={row} />,
                <Mark key="basic" on={row.basic} />,
                <Mark key="standard" on />,
                <Mark key="premium" on featured />,
              ])}
            />
          </Reveal>

          <Reveal variant="fade" delay={140} className="mt-8">
            <Callout tone="warning" title={t("ssDisclaimerLabel")}>
              {t("sspDisclaimerShort")}
            </Callout>
          </Reveal>
        </Container>
      </Section>

      {/* FAQs. */}
      <Section space="xl" tone="canvas">
        <Container width="narrow">
          <SectionHeading align="center" eyebrow={t("navSupport")} title={t("fcsFaqHeading")} />
          <Reveal variant="up" delay={80} className="mt-14">
            <Accordion
              multiple
              items={FAQS.map<AccordionItem>(({ q, a, period }) => ({
                id: q,
                question: t(q),
                answer: <p>{period ? `${t(a)}.` : t(a)}</p>,
              }))}
            />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

/** A plan, as a table column header: name, price, term, and the way in. */
function PlanHead({ plan }: { plan: SimPlan }) {
  const { t } = useV2();
  const featured = plan.featured ?? false;

  return (
    <span
      className={`flex w-[13rem] flex-col items-center whitespace-normal rounded-[var(--v2-r-md)] p-4 text-center ${
        featured ? "bg-[rgba(0,176,240,0.10)] shadow-[inset_0_0_0_1px_rgba(0,176,240,0.35)]" : ""
      }`}
    >
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--v2-text-3)]">
        {t(plan.name)}
      </span>
      <span className="mt-2 text-2xl font-light normal-case tracking-tight tabular-nums text-[var(--v2-text)]">
        {t(plan.price)}
      </span>
      <span className="mt-1 text-[11px] font-normal normal-case tracking-normal text-[var(--v2-text-2)]">
        {t(plan.period)}
      </span>
      <Button
        href={toV2("/choose-subscription")}
        variant={featured ? "primary" : "ghost"}
        size="sm"
        full
        className={`mt-4 ${featured ? "" : "border-[rgba(245,197,24,0.55)] hover:border-[var(--v2-gold)] hover:text-[var(--v2-gold)]"}`}
      >
        {t("getStartedBtn")}
      </Button>
    </span>
  );
}

function FeatureCell({ row }: { row: FeatureRow }) {
  const { t } = useV2();
  const { Icon } = row;

  return (
    <span className="flex min-w-[18rem] items-start gap-3.5">
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[var(--v2-cyan)]" />
      <span className="text-sm leading-relaxed">
        <strong className="block font-bold text-[var(--v2-text)]">{t(row.boldKey)}</strong>
        <span className="text-[var(--v2-text-3)]">{t(row.descKey)}</span>
      </span>
    </span>
  );
}

/**
 * Included / not included.
 *
 * The glyph is decorative; the cell's meaning is carried by a visually-hidden label, so a screen
 * reader hears "CIBIL Alerts — Included" rather than the feature name followed by silence. V1's
 * matrix has no text alternative at all, which makes an included row and an excluded row sound
 * identical.
 */
function Mark({ on, featured = false }: { on: boolean; featured?: boolean }) {
  const { tv } = useV2();

  return (
    <span
      className={`flex h-full items-center justify-center rounded-[var(--v2-r-sm)] py-1 ${
        featured ? "bg-[rgba(0,176,240,0.07)]" : ""
      }`}
    >
      {on ? (
        <CheckIcon className="h-6 w-6 text-[var(--v2-cyan)]" />
      ) : (
        <XMarkIcon className="h-5 w-5 text-[var(--v2-error)]" />
      )}
      <span className="sr-only">{tv(on ? "v2Included" : "v2NotIncluded")}</span>
    </span>
  );
}

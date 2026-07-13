"use client";

import Image from "next/image";
import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import type { TranslationKey } from "@/lib/i18n";
import { renderRichText } from "@/lib/richText";
import PageHero from "@/components/v2/ui/PageHero";
import Backdrop from "@/components/v2/ui/Backdrop";
import Button from "@/components/v2/ui/Button";
import Plate from "@/components/v2/ui/Plate";
import Prose from "@/components/v2/ui/Prose";
import Accordion, { type AccordionItem } from "@/components/v2/ui/Accordion";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";

const DAM = "https://www.cibil.com/content/dam/cibil/consumer/facr";

/**
 * V1's copy embeds its own links (`[here](/register)`), and `renderRichText` emits them verbatim.
 * Verbatim would drop the reader out of V2 mid-sentence, so every internal target is pushed
 * through `toV2()` before the string is rendered. External URLs (the YouTube explainers) are
 * left alone — `toV2` returns them untouched anyway.
 */
function richV2(text: string): React.ReactNode {
  return renderRichText(text.replace(/\]\((\/[^)\s]*)\)/g, (_match, href: string) => `](${toV2(href)})`));
}

const GETS: { icon: string; text: TranslationKey }[] = [
  { icon: "cibil_score", text: "fcsGet1" },
  { icon: "cibil_payment", text: "fcsGet2" },
  { icon: "personal_info", text: "fcsGet3" },
  { icon: "all_enquiry", text: "fcsGet4" },
  { icon: "loan_credit", text: "fcsGet5" },
];

const FAQS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "fcsFaq1", a: "fcsA1" },
  { q: "fcsFaq2", a: "fcsA2" },
  { q: "fcsFaq3", a: "fcsA3" },
  { q: "fcsFaq4", a: "fcsA4" },
  { q: "fcsFaq5", a: "fcsA5" },
  { q: "fcsFaq6", a: "fcsA6" },
  { q: "fcsFaq7", a: "fcsA7" },
  { q: "fcsFaq8", a: "fcsA8" },
  { q: "fcsFaq9", a: "fcsA9" },
  { q: "fcsFaq10", a: "fcsA10" },
];

const TERMS: TranslationKey[] = ["fcsTerm1", "fcsTerm2", "fcsTerm3"];

/**
 * The free annual report.
 *
 * The one page on the site whose whole proposition is "this costs nothing, once a year" — so the
 * entitlement is stated in a lit band directly under the promise rather than in grey small print,
 * and the five things the report contains become a numbered rail with the product's own iconography
 * seated on lit plates (the source SVGs are line art drawn for a white page).
 */
export default function FcsContent() {
  const { t } = useV2();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("navProducts") }, { label: t("sitemapFreeScoreReport") }]}
        eyebrow={t("sitemapCreditReportProducts")}
        title={t("fcsHeroTitle")}
        tone="gold"
        size="md"
        actions={
          <>
            <Button href={toV2("/register")} size="lg" arrow magnetic>
              {t("getFreeScoreBtn")}
            </Button>
            <p className="text-sm text-[var(--v2-text-2)]">
              {t("alreadyHaveAccount")}{" "}
              <Link href={toV2("/login")} className="v2-focus v2-underline font-bold text-[var(--v2-cyan)]">
                {t("logInLink")}
              </Link>
            </p>
          </>
        }
        media={
          <Parallax speed={0.05}>
            <Plate src={`${DAM}/banner-image.png`} alt={t("fcsBannerAlt")} width={480} height={480} priority />
          </Parallax>
        }
      >
        <p className="max-w-xl text-[13px] leading-relaxed text-[var(--v2-text-3)]">
          {t("fcsHeroEligibility")}
        </p>
      </PageHero>

      {/* The entitlement, stated once, loudly. */}
      <div className="relative border-y border-[rgba(245,197,24,0.28)] bg-[rgba(245,197,24,0.08)] py-4">
        <Container>
          <p className="text-center text-sm font-bold text-[var(--v2-gold)]">{t("fcsFreeBanner")}</p>
        </Container>
      </div>

      {/* What the free report contains. */}
      <Section space="xl" tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading index="01" eyebrow={t("navProducts")} title={t("fcsWhatYouGetHeading")} />
              <div className="mt-9">
                <Button href={toV2("/register")} size="lg" arrow>
                  {t("getStartedNowBtn")}
                </Button>
              </div>
            </div>

            <ul>
              {GETS.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.text}
                  variant="up"
                  delay={index * 90}
                  className="group flex items-start gap-6 border-t border-[var(--v2-line)] py-7 last:border-b"
                >
                  {/* The DAM icons are dark line art on transparency: on the navy canvas they
                      would vanish, so each gets its own lit mat. */}
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-white to-[#e3f4fd] p-2.5 shadow-[0_0_28px_-8px_rgba(0,176,240,0.8)]">
                    <Image
                      src={`${DAM}/${item.icon}.svg`}
                      alt=""
                      aria-hidden
                      width={54}
                      height={54}
                      unoptimized
                      className="h-full w-full object-contain"
                    />
                  </span>

                  <Prose className="pt-1.5 text-[15px] [&_p]:!mb-0">{richV2(t(item.text))}</Prose>

                  <span
                    aria-hidden
                    className="ml-auto hidden shrink-0 pt-2 font-light tabular-nums text-[var(--v2-text-3)] transition-colors duration-500 group-hover:text-[var(--v2-cyan)] sm:block"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* FAQs — ten of them, the longest set on the site. */}
      <Section space="xl" tone="raised">
        <Container width="narrow">
          <SectionHeading align="center" eyebrow={t("navSupport")} title={t("fcsFaqHeading")} />
          <Reveal variant="up" delay={80} className="mt-14">
            <Accordion
              multiple
              defaultOpen={0}
              items={FAQS.map<AccordionItem>(({ q, a }) => ({
                id: q,
                question: t(q),
                answer: richV2(t(a)),
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      {/* Watch & learn — a full-bleed gold band, as on V1, but lit rather than pastel. */}
      <Section space="lg" tone="deep" className="isolate overflow-hidden">
        <Backdrop tone="gold" />
        <Container className="relative">
          <div className="flex flex-col items-center gap-12 sm:flex-row sm:justify-between">
            <div className="max-w-xl">
              <Reveal variant="fade">
                <Eyebrow index="02">{t("navKnowledge")}</Eyebrow>
              </Reveal>
              <Reveal variant="up" delay={80}>
                <p className="v2-lede mt-6 text-pretty text-[var(--v2-text)]">{t("fcsVideoBannerTitle")}</p>
                <div className="mt-8">
                  <Button href={toV2("/watch-and-learn")} size="lg" arrow magnetic>
                    {t("watchNowBtn")}
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal variant="blur" delay={140} className="shrink-0">
              <Image
                src={`${DAM}/Watch_and_learn.svg`}
                alt={t("fcsWatchLearnAlt")}
                width={260}
                height={200}
                unoptimized
                className="h-auto w-full max-w-[260px] rounded-[var(--v2-r-md)] bg-linear-to-br from-white to-[#e3f4fd] p-5 shadow-[var(--v2-shadow-2)]"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Terms & conditions — three columns, split by hairlines rather than boxed. */}
      <Section space="xl" tone="canvas">
        <Container>
          <SectionHeading align="center" eyebrow={t("navSupport")} title={t("fcsTermsHeading")} />

          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-0">
            {TERMS.map((term, index) => (
              <Reveal
                key={term}
                variant="up"
                delay={index * 90}
                className={`flex items-start gap-3 text-sm leading-relaxed text-[var(--v2-text-2)] ${
                  index > 0 ? "sm:border-l sm:border-[var(--v2-line)] sm:pl-8" : ""
                } ${index < TERMS.length - 1 ? "sm:pr-8" : ""}`}
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.9)]"
                />
                <span>{t(term)}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { ButtonLink } from "@/components/v4/ui/Button";
import { ArrowRightIcon } from "@/components/v4/ui/Icons";
import { Container, Section } from "@/components/v4/ui/Layout";
import PageHero from "@/components/v4/ui/PageHero";
import { Reveal, Tick } from "@/components/v4/motion/Reveal";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/** The section the hero's own call to action points at. */
const ABOUT_ID = "v4-about";

/**
 * The other pages the company publishes about itself. Labels are catalog keys — never free text —
 * and every href is a route that exists, so this band cannot rot into a list of dead ends.
 */
const CORPORATE_PAGES: { key: TranslationKey; href: string }[] = [
  { key: "footerCompanyHistory", href: toV4("/about-us/company-history") },
  { key: "footerRegulatoryDisclosure", href: toV4("/regulatory") },
  { key: "footerOfficialPartners", href: toV4("/official-partners") },
];

/**
 * About Us — the company's case for trust.
 *
 * V1 opens this page the way it opens all forty-five: a grey panel, a gold pill, and a stock
 * photograph of an office. That tells a reader nothing. What a credit bureau actually has to offer
 * a stranger is *evidence*, so V4 puts the evidence in the hero: the three figures TransUnion CIBIL
 * already publishes — 25 years, 183 million self-monitoring consumers, 46% of them improving their
 * score within six months — sit beside the headline as an instrument panel, ticking up as they
 * resolve. Not one of them is new: every value is read from V1's catalog, and V4 invents no
 * statistic about a company whose entire product is the accuracy of what it says about you.
 *
 * The prose that follows is set as a document — a sticky heading in the margin, the copy at a
 * proper measure — because these two paragraphs are the company's own account of itself and
 * deserve to be read rather than skimmed off a card.
 */
export default function AboutUsContent() {
  const { t } = useV4();

  return (
    <>
      <PageHero
        label={t("aboutUsEyebrow")}
        title={t("aboutUsHeroTitle")}
        lede={t("aboutUsHeroDesc")}
        actions={
          <ButtonLink href={`#${ABOUT_ID}`} size="lg" arrow>
            {t("knowMoreBtn")}
          </ButtonLink>
        }
        aside={<Figures />}
      />

      <Section id={ABOUT_ID} space="lg" className="scroll-mt-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-20">
            <h2 className="v4-h2 lg:sticky lg:top-28 lg:self-start">{t("aboutSectionTitle")}</h2>

            <Reveal className="v4-prose">
              <p>{t("aboutParagraph1")}</p>
              <p>{t("aboutParagraph2")}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The rest of the corporate record, one click away. A night band closes the page, so the
          reader leaves on the company's own colour rather than on a footer. */}
      <Section tone="night" space="md" aria-labelledby="v4-about-more">
        <Container>
          <h2 id="v4-about-more" className="v4-label">
            <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
            <span className="ml-2.5">{t("footerInformation")}</span>
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {CORPORATE_PAGES.map((page, i) => (
              <Reveal as="li" key={page.href} index={i}>
                <Link
                  href={page.href}
                  className="v4-plane v4-plane-lift group flex h-full items-center justify-between gap-4 px-5 py-6"
                >
                  <span className="v4-h3">{t(page.key)}</span>
                  <ArrowRightIcon
                    size={18}
                    className="shrink-0 text-[var(--v4-fg-3)] transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

/**
 * The hero's instrument panel.
 *
 * A definition list, because that is what it is: three terms and their values. The value is drawn
 * first and the label second, which `order` does in CSS rather than by inverting the markup — a
 * `<dl>` whose description precedes its term is not a definition list, and a screen reader reads
 * the pair, not the layout.
 *
 * `<Tick>` is `aria-hidden` while it counts; the true value is announced once, from the sibling.
 */
function Figures() {
  const { t, t4 } = useV4();

  const figures = [
    { value: t("statYearsValue"), unit: t("statYearsUnit"), label: t("statYearsLabel") },
    { value: t("statUsersValue"), unit: t("statUsersUnit"), label: t("statUsersLabel") },
    { value: t("statImprovedValue"), unit: null, label: t("statImprovedLabel") },
  ];

  return (
    <div className="v4-plane p-6 sm:p-8">
      <dl className="grid gap-6">
        {figures.map((figure) => (
          <div
            key={figure.label}
            className="flex items-baseline justify-between gap-6 border-t border-[var(--v4-edge)] pt-6 first:border-t-0 first:pt-0"
          >
            <dd className="v4-num order-1 flex items-baseline gap-1 text-[2.5rem] font-medium leading-none text-[var(--v4-fg)] sm:text-[3rem]">
              <Tick value={figure.value} />
              <span className="v4-sr">{figure.value}</span>
              {figure.unit ? (
                <span className="text-[1.125rem] font-normal text-[var(--v4-fg-3)]">
                  {figure.unit}
                </span>
              ) : null}
            </dd>
            <dt className="v4-caption order-2 max-w-[15rem] text-right">{figure.label}</dt>
          </div>
        ))}
      </dl>

      <p className="v4-caption mt-7 border-t border-[var(--v4-edge)] pt-5">{t4("v4StatsSource")}</p>
    </div>
  );
}

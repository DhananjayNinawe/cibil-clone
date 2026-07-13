"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import FaqLayout from "@/components/v2/pages/faq/FaqLayout";
import Accordion, { type AccordionItem } from "@/components/v2/ui/Accordion";
import Plate from "@/components/v2/ui/Plate";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";

const FOUR_FACTORS_IMG =
  "https://www.cibil.com/faq/credit-score-and-loan-basics/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image.coreimg.75.1440.jpeg/1738733444575/factors.jpeg";

/** The four factors, in V1's order: age, utilization, payment history, enquiries. */
const FACTORS: [TranslationKey, TranslationKey][] = [
  ["csbFactorAgeTitle", "csbFactorAgeDesc"],
  ["csbFactorUtilTitle", "csbFactorUtilDesc"],
  ["csbFactorPaymentTitle", "csbFactorPaymentDesc"],
  ["csbFactorEnquiriesTitle", "csbFactorEnquiriesDesc"],
];

const IMPROVE_STEPS: [TranslationKey, TranslationKey][] = [
  ["csbA4Bullet1Bold", "csbA4Bullet1"],
  ["csbA4Bullet2Bold", "csbA4Bullet2"],
  ["csbA4Bullet3Bold", "csbA4Bullet3"],
  ["csbA4Bullet4Bold", "csbA4Bullet4"],
  ["csbA4Bullet5Bold", "csbA4Bullet5"],
  ["csbA4Bullet6Bold", "csbA4Bullet6"],
];

function Factor({ index, title, desc }: { index: number; title: string; desc: string }) {
  return (
    <Reveal variant="up" delay={index * 90} className="relative pl-14">
      <span
        aria-hidden
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(0,176,240,0.3)] bg-[var(--v2-cyan-dim)] text-xs font-bold tabular-nums text-[var(--v2-cyan)]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="v2-h3 text-[var(--v2-text)]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--v2-text-2)]">{desc}</p>
    </Reveal>
  );
}

export default function CreditBasicsContent() {
  const { t, tv } = useV2();

  const items: AccordionItem[] = [
    {
      id: "csbQ1",
      question: t("csbQ1"),
      answer: (
        <>
          <p>{t("csbA1Para1")}</p>
          <p>{t("csbA1Para2")}</p>
          <p>
            <Link href={toV2("/about-us")}>{t("csbA1Link")}</Link> {t("csbA1LinkSuffix")}
          </p>
        </>
      ),
    },
    { id: "csbQ2", question: t("csbQ2"), answer: <p>{t("csbA2")}</p> },
    {
      id: "csbQ3",
      question: t("csbQ3"),
      answer: (
        <>
          <p>{t("csbA3")}</p>
          <p>
            <Link href={toV2("/watch-and-learn")}>{t("csbA3VideoLink")}</Link> {t("csbA3VideoSuffix")}
          </p>
        </>
      ),
    },
    {
      id: "csbQ4",
      question: t("csbQ4"),
      answer: (
        <>
          <p>{t("csbA4Intro")}</p>
          <ul>
            {IMPROVE_STEPS.map(([bold, rest]) => (
              <li key={bold}>
                <strong>{t(bold)}</strong> {t(rest)}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    { id: "csbQ5", question: t("csbQ5"), answer: <p>{t("csbA5")}</p> },
    { id: "csbQ6", question: t("csbQ6"), answer: <p>{t("csbA6")}</p> },
  ];

  /*
    V1 wedges the four factor cards between Q3 and Q4 of a flat Q&A list, where the most
    valuable content on the page is also the easiest to scroll past. Here they get the band
    they deserve — same four cards, same wheel, same copy — sitting between the hero and the
    questions, exactly the region of the page V1 put them in.
  */
  const factorsBand = (
    <Section space="lg" tone="raised">
      <Container>
        <SectionHeading
          align="center"
          eyebrow={tv("v2KeyPoints")}
          title={t("csbFourFactorsTitle")}
          lede={t("csbFourFactorsSubtitle")}
          className="mx-auto"
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)_minmax(0,1fr)] lg:gap-16">
          <div className="space-y-12 lg:order-1 lg:text-right">
            {FACTORS.slice(0, 2).map(([title, desc], index) => (
              <Factor key={title} index={index} title={t(title)} desc={t(desc)} />
            ))}
          </div>

          <Reveal variant="scale" className="lg:order-2">
            <Plate
              src={FOUR_FACTORS_IMG}
              alt={`${t("csbFourFactorsTitle")} ${t("csbFourFactorsSubtitle")}`}
              width={520}
              height={520}
              className="mx-auto max-w-[300px]"
              imageClassName="p-4"
            />
          </Reveal>

          <div className="space-y-12 lg:order-3">
            {FACTORS.slice(2).map(([title, desc], index) => (
              <Factor key={title} index={index + 2} title={t(title)} desc={t(desc)} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );

  return (
    <FaqLayout
      slug="credit-score-and-loan-basics"
      eyebrow={t("megaCreditBasicsHeading")}
      title={t("csbHeroTitle")}
      tone="duo"
      size="md"
      align="center"
      panel="subscribe"
      band={factorsBand}
      cta={{ label: t("getYoursNowBtn"), href: toV2("/register") }}
    >
      <Accordion items={items} multiple defaultOpen={0} />
    </FaqLayout>
  );
}

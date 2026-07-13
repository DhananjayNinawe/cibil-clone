"use client";

import Image from "next/image";
import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Backdrop from "@/components/v2/ui/Backdrop";
import Badge from "@/components/v2/ui/Badge";
import Button from "@/components/v2/ui/Button";
import PageHero from "@/components/v2/ui/PageHero";
import StatBlock from "@/components/v2/ui/StatBlock";
import { Container, Eyebrow, Section } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import SplitText from "@/components/v2/motion/SplitText";
import Parallax from "@/components/v2/motion/Parallax";
import { ArrowRightIcon } from "@/components/icons";

/** V1's own corporate photograph (components/about/HeroSection.tsx). */
const HERO_IMAGE_URL =
  "https://www.transunioncibil.com/content/dam/transunion-cibil/corporate/images/header/About-Us-2hero-D-220916.jpg";

/** Where the page sends a reader next. Labels are V1 keys; every destination is a real route. */
const ONWARD: { key: TranslationKey; href: string }[] = [
  { key: "footerCompanyHistory", href: "/about-us/company-history" },
  { key: "footerOfficialPartners", href: "/official-partners" },
  { key: "footerRegulatoryDisclosure", href: "/regulatory" },
  { key: "sitemapContactUsLink", href: "/contact-us" },
];

/**
 * The brand statement page.
 *
 * V1 splits the screen — grey box on the left, photograph on the right — and then drops the two
 * long "About TransUnion CIBIL" paragraphs into a plain column. Here the photograph becomes the
 * room the headline stands in, the paragraphs get a real reading measure against a lit rule, and
 * the numbers V1 only shows on the homepage are given the space to act as the company's
 * credentials. Every string is an existing key; nothing is invented.
 */
export default function AboutUsContent() {
  const { t, tv } = useV2();

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <div className="relative isolate">
        <Image
          src={HERO_IMAGE_URL}
          alt={t("aboutUsHeroTitle")}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="pointer-events-none absolute inset-0 -z-20 object-cover opacity-35"
        />
        {/* Reads the photograph as a lit room rather than a banner: the copy side is nearly
            solid canvas, the image side stays visible, and the seam is a gradient, not an edge. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--v2-bg)_16%,rgba(5,7,13,0.86)_46%,rgba(5,7,13,0.45)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-b from-transparent to-[var(--v2-bg)]"
        />

        <PageHero
          size="lg"
          tone="deep"
          eyebrow={t("aboutUsEyebrow")}
          title={t("aboutUsHeroTitle")}
          lede={t("aboutUsHeroDesc")}
          breadcrumbs={[{ label: t("aboutUsHeroTitle") }]}
          actions={
            <Button href="#about" size="lg" arrow magnetic>
              {t("knowMoreBtn")}
            </Button>
          }
        />
      </div>

      {/* -------------------------------------------------------- The statement */}
      <Section id="about" space="xl" tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-24">
            <div className="h-fit lg:sticky lg:top-32">
              <Reveal variant="fade">
                <Eyebrow index="01">{t("aboutUsEyebrow")}</Eyebrow>
              </Reveal>
              <h2 className="v2-h2 mt-6 text-balance text-[var(--v2-text)]">
                {t("aboutSectionTitle")}
              </h2>
              <Reveal variant="fade" delay={160}>
                <span
                  aria-hidden
                  className="mt-8 block h-px w-24 bg-[var(--v2-cyan)] shadow-[0_0_16px_rgba(0,176,240,0.9)]"
                />
              </Reveal>
            </div>

            {/* The lit rule runs down the measure — the copy is hung off it, not boxed in. */}
            <div className="relative lg:pl-14">
              <span
                aria-hidden
                className="absolute left-0 top-2 hidden h-full w-px bg-linear-to-b from-[var(--v2-cyan)] via-[rgba(0,176,240,0.25)] to-transparent lg:block"
              />

              <Reveal variant="up">
                <p className="max-w-[68ch] text-lg font-light leading-[1.75] text-[var(--v2-text)] sm:text-[1.375rem] sm:leading-[1.7]">
                  {t("aboutParagraph1")}
                </p>
              </Reveal>

              <Reveal variant="up" delay={120}>
                <p className="mt-10 max-w-[68ch] text-base font-light leading-[1.8] text-[var(--v2-text-2)] sm:text-[1.0625rem]">
                  {t("aboutParagraph2")}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- Information for Good */}
      <section className="relative isolate overflow-hidden border-y border-[var(--v2-line)] bg-[var(--v2-bg-2)] py-24 sm:py-32">
        <Backdrop tone="cyan" grid />
        <Container className="relative">
          <Parallax speed={0.05}>
            {/* SplitText brings its own in-view trigger — the words lift from a mask on their own. */}
            <p className="v2-display max-w-4xl text-balance text-[var(--v2-text)]">
              <SplitText text={t("infoForGood")} className="text-[var(--v2-cyan)]" stagger={90} />
            </p>
          </Parallax>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Credentials */}
      <Section space="xl" tone="canvas">
        <Container>
          <Reveal variant="fade">
            <Eyebrow index="02">{tv("v2StatsKicker")}</Eyebrow>
          </Reveal>

          <div className="mt-16 grid gap-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <Reveal variant="up">
              <StatBlock
                value={t("statYearsValue")}
                unit={t("statYearsUnit")}
                label={t("statYearsLabel")}
              />
            </Reveal>
            <Reveal variant="up" delay={110}>
              <StatBlock
                value={t("statUsersValue")}
                unit={t("statUsersUnit")}
                label={t("statUsersLabel")}
              />
            </Reveal>
            <Reveal variant="up" delay={220}>
              <StatBlock value={t("statImprovedValue")} label={t("statImprovedLabel")} />
            </Reveal>
          </div>

          <Reveal variant="fade" delay={300} className="mt-20">
            <div className="v2-glass v2-rim flex flex-col gap-5 rounded-[var(--v2-r-lg)] p-7 sm:flex-row sm:items-center sm:justify-between">
              <Badge tone="cyan" pulse>
                {t("aboutUsEyebrow")}
              </Badge>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--v2-text-2)]">
                {t("footerCertifications")}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------------------- Onward */}
      <Section space="lg" tone="raised">
        <Container>
          <Reveal variant="fade">
            <Eyebrow index="03">{tv("v2RelatedPages")}</Eyebrow>
          </Reveal>

          <ul className="mt-12">
            {ONWARD.map((item, index) => (
              <Reveal as="li" key={item.href} variant="up" delay={index * 80}>
                <Link
                  href={toV2(item.href)}
                  className="v2-focus group flex items-center justify-between gap-8 border-t border-[var(--v2-line)] py-7 transition-colors duration-500 last:border-b hover:border-[rgba(0,176,240,0.4)]"
                >
                  <span className="text-lg font-light text-[var(--v2-text-2)] transition-colors duration-300 group-hover:text-[var(--v2-text)] sm:text-xl">
                    {t(item.key)}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--v2-line-2)] text-[var(--v2-text-3)] transition-all duration-500 ease-[var(--v2-ease)] group-hover:border-[var(--v2-cyan)] group-hover:bg-[rgba(0,176,240,0.12)] group-hover:text-[var(--v2-cyan)]"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

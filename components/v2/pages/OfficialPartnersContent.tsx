"use client";

import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { renderRichText } from "@/lib/richText";
import Callout from "@/components/v2/ui/Callout";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import Prose from "@/components/v2/ui/Prose";
import { Container, Eyebrow, Section } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";

const CIBIL_LOGO_URL =
  "https://www.cibil.com/content/dam/cibil/content-fragments/header/cibil-logo.png";

/** Single artwork holding every partner logo, as published on cibil.com. */
const PARTNER_LOGOS_URL =
  "https://www.cibil.com/official-partners/_jcr_content/root/contentcontainer/pagesection/image.coreimg.75.1440.png/1781601071300/logo16jun.png";

/**
 * V1's copy carries its own inline markup (lib/richText.tsx), and one of those links points at
 * "/contact-us" — a V1 route. Rewriting the internal targets through `toV2()` before rendering
 * keeps V2 inside V2 without touching the catalog or the renderer. External URLs (https://…)
 * are left exactly as authored.
 */
function renderV2RichText(text: string) {
  return renderRichText(text.replace(/\]\((\/[^)]*)\)/g, (_, href: string) => `](${toV2(href)})`));
}

/**
 * The partner board — and the warning that goes with it.
 *
 * V1 runs the logo artwork and eight paragraphs of anti-impersonation advice down one narrow
 * column, all in the same grey. Here the artwork is hung on a lit plate (it is a white-background
 * asset), and the one sentence that actually tells a reader how to spot a fake — the "Powered by
 * CIBIL" advisory — is lifted out of the wall of text into a callout. Nothing is cut.
 */
export default function OfficialPartnersContent() {
  const { t, tv } = useV2();

  return (
    <>
      <PageHero
        size="md"
        tone="gold"
        eyebrow={t("aboutUsEyebrow")}
        title={t("officialPartnersTitle")}
        breadcrumbs={[{ label: t("footerOfficialPartners") }]}
      />

      {/* ------------------------------------------------------------ The board */}
      <Section space="lg" tone="canvas">
        <Container>
          <Reveal variant="fade">
            <Eyebrow index="01">{t("footerOfficialPartners")}</Eyebrow>
          </Reveal>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-16">
            <Reveal variant="up">
              <Plate
                src={CIBIL_LOGO_URL}
                alt="CIBIL - Part of TransUnion"
                width={182}
                height={82}
                className="max-w-[13rem]"
                imageClassName="p-6"
              />
              <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-[var(--v2-text-2)]">
                {t("officialPartnersIntro")}
              </p>
            </Reveal>

            <Reveal variant="blur" delay={120}>
              <Plate
                src={PARTNER_LOGOS_URL}
                alt={t("officialPartnersTitle")}
                width={934}
                height={642}
                imageClassName="p-4 sm:p-8"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- The disclosure */}
      <Section space="lg" tone="raised">
        <Container width="narrow">
          <Reveal variant="fade">
            <Eyebrow index="02">{tv("v2DetailsLabel")}</Eyebrow>
          </Reveal>

          <Reveal variant="up" className="mt-10">
            <Prose>
              <p>{t("officialPartnersWarn1")}</p>
            </Prose>
          </Reveal>

          <Reveal variant="up" delay={80} className="my-8">
            <Callout tone="warning">{t("officialPartnersWarn2")}</Callout>
          </Reveal>

          <Reveal variant="up" delay={120}>
            <Prose>
              <p>{t("officialPartnersWarn3")}</p>
              <p>{t("officialPartnersWarn4")}</p>
              {renderV2RichText(t("officialPartnersReport"))}
              <p>{t("officialPartnersWarn5")}</p>
              {renderV2RichText(t("officialPartnersWarn6"))}
              <p className="text-sm italic underline decoration-[var(--v2-line-2)] underline-offset-4">
                {t("officialPartnersKpmgNote")}
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

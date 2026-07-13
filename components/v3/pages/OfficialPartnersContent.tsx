"use client";

import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { renderRichText } from "@/lib/richText";
import { Container, Section } from "@/components/v3/ui/Layout";
import Callout from "@/components/v3/ui/Callout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Prose from "@/components/v3/ui/Prose";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";

const CIBIL_LOGO_URL =
  "https://www.cibil.com/content/dam/cibil/content-fragments/header/cibil-logo.png";

/** Single artwork holding every partner logo, as published on cibil.com. */
const PARTNER_LOGOS_URL =
  "https://www.cibil.com/official-partners/_jcr_content/root/contentcontainer/pagesection/image.coreimg.75.1440.png/1781601071300/logo16jun.png";

/**
 * V1's copy carries its own inline markup (lib/richText.tsx), and one of those links points at
 * "/contact-us" — a V1 route. Rewriting the internal targets through `toV3()` before rendering
 * keeps V3 inside V3 without touching the catalog or the shared renderer. External URLs
 * (https://…) are left exactly as authored.
 */
function renderV3RichText(text: string) {
  return renderRichText(text.replace(/\]\((\/[^)]*)\)/g, (_, href: string) => `](${toV3(href)})`));
}

/**
 * The partner board, and the warning that comes with it.
 *
 * V1 runs the artwork and eight paragraphs of anti-impersonation advice down one narrow grey
 * column, where the single sentence that actually tells a reader how to spot a fake is buried in
 * the middle of it. Here the board is mounted — the logos are drawn for a white page, so they get
 * a paper mat — and that one sentence is lifted into the margin as a struck note beside the
 * disclosure it summarises. Every paragraph, link and footnote is preserved.
 */
export default function OfficialPartnersContent() {
  const { t, t3 } = useV3();

  return (
    <>
      <PageHeader
        folio={t("aboutUsEyebrow")}
        title={t("officialPartnersTitle")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("footerOfficialPartners") },
        ]}
      />

      {/* ──────────────────────────────────────────────────────────────── The board */}
      <Section space="lg">
        <Container>
          <h2 className="v3-folio flex items-center gap-3">
            <span className="text-[var(--v3-accent)]">01</span>
            <span aria-hidden className="h-px w-8 shrink-0 bg-[var(--v3-line-2)]" />
            {t("footerOfficialPartners")}
          </h2>

          <div className="mt-12 grid items-start gap-x-16 gap-y-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="min-w-0">
              <Plate
                src={CIBIL_LOGO_URL}
                alt={t("aboutUsEyebrow")}
                ratio="182 / 82"
                mount
                priority
                sizes="200px"
                className="w-50"
              />

              <p className="mt-8 max-w-[38ch] text-base leading-relaxed text-pretty text-[var(--v3-fg-2)]">
                {t("officialPartnersIntro")}
              </p>
            </div>

            <Plate
              src={PARTNER_LOGOS_URL}
              alt={t("officialPartnersTitle")}
              ratio="934 / 642"
              mount
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="min-w-0"
            />
          </div>
        </Container>
      </Section>

      {/* ───────────────────────────────────────────────────────────── The disclosure */}
      <Section space="lg" tone="sunken" ruled>
        <Container>
          <h2 className="v3-folio flex items-center gap-3">
            <span className="text-[var(--v3-accent)]">02</span>
            <span aria-hidden className="h-px w-8 shrink-0 bg-[var(--v3-line-2)]" />
            {t3("v3DetailsLabel")}
          </h2>

          <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_0.62fr]">
            <Prose className="min-w-0">
              <p>{t("officialPartnersWarn1")}</p>
              <p>{t("officialPartnersWarn3")}</p>
              <p>{t("officialPartnersWarn4")}</p>
              {renderV3RichText(t("officialPartnersReport"))}
              <p>{t("officialPartnersWarn5")}</p>
              {renderV3RichText(t("officialPartnersWarn6"))}
              <p className="text-[var(--v3-fg-3)] italic">{t("officialPartnersKpmgNote")}</p>
            </Prose>

            {/* The one sentence a reader has to leave with, struck into the margin. */}
            <Reveal variant="rise" className="min-w-0">
              <Callout tone="warning" title={t("cocImportantLabel")} className="lg:sticky lg:top-32">
                <p className="v3-h3 text-pretty text-[var(--v3-fg)]">
                  {t("officialPartnersWarn2")}
                </p>
              </Callout>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

"use client";

import { useV2 } from "@/lib/v2/useV2";
import Callout from "@/components/v2/ui/Callout";
import Card from "@/components/v2/ui/Card";
import PageHero from "@/components/v2/ui/PageHero";
import { Container, Section } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import { ArrowRightIcon } from "@/components/icons";

/**
 * The Ethics Helpline interstitial.
 *
 * V1 renders this as a bare white page — logo, two paragraphs, a "Continue" link — because it is
 * a gate in front of an external destination, not a site page. V2 keeps that job: one screen, one
 * decision, nothing else competing for attention. The eligibility warning is a callout (it is the
 * reason the gate exists), and "Continue" is the only control on the page.
 *
 * The destination itself is not in this codebase: V1's link targets "#", and no ethics-helpline
 * URL exists in the catalog or the data files. Rather than invent one, the anchor is preserved
 * exactly as V1 leaves it — see the note in the handover.
 */
export default function CodeOfConductContent() {
  const { t } = useV2();

  return (
    <>
      <PageHero
        size="sm"
        tone="gold"
        align="center"
        eyebrow={t("aboutUsEyebrow")}
        title={t("footerCodeBusinessConduct")}
        breadcrumbs={[{ label: t("footerCodeBusinessConduct") }]}
      />

      <Section space="md" tone="canvas">
        <Container width="narrow">
          <Reveal variant="up">
            <Card padding="lg" spotlight>
              <Callout tone="warning" title={t("cocImportantLabel")}>
                {t("cocImportantText")}
              </Callout>

              <p className="mt-8 text-[15px] leading-[1.8] font-light text-[var(--v2-text-2)]">
                {t("cocEthicsPrefix")}{" "}
                <a
                  href="#"
                  className="v2-focus group inline-flex items-center gap-1.5 font-bold text-[var(--v2-cyan)] underline underline-offset-4 hover:text-[var(--v2-cyan-soft)]"
                >
                  {t("cocContinueLink")}
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--v2-ease)] group-hover:translate-x-0.5" />
                </a>{" "}
                {t("cocEthicsSuffix")}
              </p>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

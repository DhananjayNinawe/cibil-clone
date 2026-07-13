"use client";

import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section } from "@/components/v3/ui/Layout";
import Callout from "@/components/v3/ui/Callout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Prose from "@/components/v3/ui/Prose";
import Rule from "@/components/v3/ui/Rule";
import Reveal from "@/components/v3/motion/Reveal";
import { ArrowRight } from "@/components/v3/ui/Icons";

/**
 * The Ethics Helpline interstitial.
 *
 * This is a gate, not a page: one warning about what the helpline is for, and one way through it.
 * V1 strips the site chrome off entirely and shows a bare sheet; V3 keeps the same single-decision
 * shape but leaves it inside the shell, because a reader who lands here from the footer needs a way
 * back and V1 gives them none.
 *
 * The destination does not exist in this codebase — V1's anchor targets `#`, and no ethics-helpline
 * URL appears in the catalog or any data file. It is preserved as-is rather than invented.
 */
export default function CodeOfConductContent() {
  const { t } = useV3();

  return (
    <>
      <PageHeader
        folio={t("footerAboutUs")}
        title={t("footerCodeBusinessConduct")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("footerCodeBusinessConduct") },
        ]}
      />

      <Section space="lg">
        <Container width="text">
          <Reveal variant="rise">
            <Callout tone="warning" title={t("cocImportantLabel")}>
              {t("cocImportantText")}
            </Callout>
          </Reveal>

          <Reveal variant="rise" delay={80}>
            <Prose className="mt-14">
              <p>
                {t("cocEthicsPrefix")}{" "}
                <a href="#" className="v3-focus group inline-flex items-baseline gap-1.5 font-semibold">
                  {t("cocContinueLink")}
                  <ArrowRight className="translate-y-px text-xs transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px]" />
                </a>{" "}
                {t("cocEthicsSuffix")}
              </p>
            </Prose>
          </Reveal>

          <Rule className="mt-24 sm:mt-32" />
        </Container>
      </Section>
    </>
  );
}

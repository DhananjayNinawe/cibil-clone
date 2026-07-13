"use client";

import Link from "next/link";
import Image from "next/image";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { V3_PRODUCTS } from "@/lib/v3/libraryData";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import Reveal from "@/components/v3/motion/Reveal";
import { ArrowRight } from "@/components/v3/ui/Icons";

/**
 * The three products, set as entries in a ledger.
 *
 * Not three cards in a row. Each product is a full-width ruled entry — number in the margin, the
 * name at heading scale, the promise beside it, the artwork plated on the right — and you read
 * *down* them, the way you read a contents page. It gives the three offerings a hierarchy and a
 * rhythm that three equal boxes cannot, and it is the section where V3's grammar is clearest.
 *
 * The whole row is the link. Hovering lifts the paper a shade and walks the arrow; nothing
 * scales, nothing glows, nothing lifts off the page.
 */
export default function Products() {
  const { t } = useV3();

  return (
    <Section space="lg" ruled>
      <Container>
        <SectionHead
          index="01"
          folio={t("productsSubtitle")}
          title={
            <>
              {t("productsHeadingPrefix")} <span className="v3-em">{t("productsHeadingSuffix")}</span>
            </>
          }
        />

        <div className="mt-4">
          {V3_PRODUCTS.map((product, i) => (
            <Reveal key={product.key} variant="rise" delay={i * 80}>
              <Link
                href={toV3(product.href)}
                className="v3-focus v3-row group grid grid-cols-1 items-center gap-6 border-b border-[var(--v3-line)] py-8 sm:gap-10 sm:py-10 lg:grid-cols-[3.5rem_1.6fr_1fr_auto] lg:gap-12"
              >
                <span aria-hidden className="v3-num text-sm text-[var(--v3-fg-3)]">
                  {product.folio}
                </span>

                <div className="min-w-0">
                  <p className="v3-folio mb-3">{t(product.tag)}</p>
                  <h3 className="v3-h3 text-pretty">
                    <span className="v3-link-draw">{t(product.title)}</span>
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-[var(--v3-fg-2)] lg:hidden">
                    {t(product.desc)}
                  </p>
                </div>

                <p className="hidden max-w-[38ch] text-sm leading-relaxed text-[var(--v3-fg-2)] lg:block">
                  {t(product.desc)}
                </p>

                <div className="flex items-center gap-8">
                  {/* The plate. Fixed frame, image cropped into it — and mounted on paper, because
                      CIBIL's artwork is drawn for a white page. */}
                  <div className="v3-plate v3-plate-mount relative hidden h-24 w-40 shrink-0 sm:block">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="160px"
                      className="object-contain p-2 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  <span className="v3-num flex shrink-0 items-center gap-2 text-xs tracking-[0.08em] text-[var(--v3-fg-2)] transition-colors group-hover:text-[var(--v3-accent)]">
                    <span className="hidden xl:inline">{t("productGetStarted")}</span>
                    <ArrowRight className="text-base transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { V2_PRODUCTS } from "@/lib/v2/learnData";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import { useSpotlight } from "@/lib/v2/motion";
import { ArrowRightIcon } from "@/components/icons";

/**
 * The three audiences CIBIL serves.
 *
 * The cards are deliberately asymmetric — the first is a tall lead, the other two stack beside
 * it — so the section reads as an editorial spread rather than three equal boxes in a row. The
 * product artwork is V1's own, and it was drawn for a dark teal panel, so it needs no plate.
 */
export default function Products() {
  const { t } = useV2();

  return (
    <Section id="products" space="xl" tone="canvas">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <SectionHeading
            index="01"
            eyebrow={t("navProducts")}
            title={
              <>
                <span className="text-[var(--v2-cyan)]">{t("productsHeadingPrefix")}</span>{" "}
                {t("productsHeadingSuffix")}
              </>
            }
            lede={t("productsSubtitle")}
          />
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {V2_PRODUCTS.map((product, index) => (
            <ProductCard key={product.key} product={product} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof V2_PRODUCTS)[number];
  index: number;
}) {
  const { t } = useV2();
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  const tag = t(product.tag);
  const [firstWord, ...restWords] = tag.split(" ");
  const lead = index === 0;

  return (
    <Reveal
      variant="up"
      delay={index * 120}
      className={lead ? "lg:row-span-1" : ""}
    >
      <Link href={toV2(product.href)} className="v2-focus group block h-full rounded-[var(--v2-r-lg)]">
        <div
          ref={ref}
          onPointerMove={onPointerMove}
          className="v2-spotlight v2-rim relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-[var(--v2-r-lg)] bg-linear-to-b from-[#0a3a52] to-[#0f5773] p-8 shadow-[var(--v2-shadow-2)] transition-[transform,box-shadow] duration-700 ease-[var(--v2-ease)] hover:-translate-y-2 hover:shadow-[var(--v2-shadow-3)]"
        >
          <div className="relative z-10">
            <p className="v2-eyebrow">
              <span className="text-[var(--v2-cyan-soft)]">{firstWord}</span>
              {restWords.length > 0 && <span className="ml-1.5 text-white">{restWords.join(" ")}</span>}
            </p>

            <h3 className="mt-6 text-2xl font-bold leading-snug text-white">{t(product.title)}</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{t(product.desc)}</p>

            <span className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-white/10 pl-6 pr-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md transition-colors duration-500 group-hover:bg-[var(--v2-gold)] group-hover:text-[#0a0a0a]">
              {t("productGetStarted")}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[var(--v2-ease)] group-hover:translate-x-1 group-hover:bg-black/10">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </span>
          </div>

          <Image
            src={product.image}
            alt=""
            aria-hidden
            width={420}
            height={480}
            unoptimized
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto max-h-[58%] w-full select-none object-contain object-bottom transition-transform duration-[900ms] ease-[var(--v2-ease)] group-hover:scale-[1.04]"
          />
        </div>
      </Link>
    </Reveal>
  );
}

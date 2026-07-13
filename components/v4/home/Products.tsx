"use client";

import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { ArrowRightIcon, BuildingIcon, UserIcon, UsersIcon } from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Products & Services.
 *
 * Three audiences, not three identical cards. V1 renders them as a row of equal dark tiles; V4
 * gives the first one — the one nearly every visitor is here for — the weight it actually has, and
 * lets the other two sit beside it. That asymmetry *is* the information: individuals are the front
 * door, businesses and microfinance are the other two.
 *
 * The imagery is CIBIL's own product artwork, reused. The copy is CIBIL's own, reused. What is new
 * is the hierarchy.
 */

interface Product {
  tag: TranslationKey;
  title: TranslationKey;
  desc: TranslationKey;
  href: string;
  image: string;
  icon: typeof UserIcon;
}

const ART = "https://www.cibil.com/content/dam/cibil/homepage/shared";

const LEAD: Product = {
  tag: "productIndividualsTag",
  title: "productIndividualsTitle",
  desc: "productIndividualsDesc",
  href: toV4("/cibil-score-report"),
  image: `${ART}/ind-banner.png`,
  icon: UserIcon,
};

const REST: Product[] = [
  {
    tag: "productBusinessTag",
    title: "productBusinessTitle",
    desc: "productBusinessDesc",
    href: toV4("/company-credit-report"),
    image: `${ART}/business-banner.png`,
    icon: BuildingIcon,
  },
  {
    tag: "productMfiTag",
    title: "productMfiTitle",
    desc: "productMfiDesc",
    href: toV4("/microfinance"),
    image: `${ART}/micro-banner.png`,
    icon: UsersIcon,
  },
];

export default function Products() {
  const { t, t4 } = useV4();

  return (
    <Section tone="tint" aria-labelledby="v4-products-heading">
      <Container width="wide">
        <SectionHead
          id="v4-products-heading"
          label={t4("v4SectionProducts")}
          title={
            <>
              {t("productsHeadingPrefix")} {t("productsHeadingSuffix")}
            </>
          }
          lede={t("productsSubtitle")}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.28fr_1fr]">
          {/* The lead. A night plane — the one dark object in a light band, which is what makes it
              read as the primary choice without a badge saying "primary". */}
          <Reveal variant="focus">
            <Link
              href={LEAD.href}
              className="v4-tone-night v4-plane v4-plane-lift group flex h-full flex-col overflow-hidden"
            >
              <div className="p-7 sm:p-9">
                <p className="v4-label flex items-center gap-2">
                  <LEAD.icon size={16} />
                  {t(LEAD.tag)}
                </p>
                <h3 className="v4-h2 mt-4">{t(LEAD.title)}</h3>
                <p className="v4-body mt-4 !text-[0.9375rem]">{t(LEAD.desc)}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-bold text-[var(--v4-accent)]">
                  {t("productGetStarted")}
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  />
                </span>
              </div>

              <div className="relative mt-auto h-56 w-full sm:h-64">
                <Image
                  src={LEAD.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain object-bottom"
                  unoptimized
                />
              </div>
            </Link>
          </Reveal>

          {/* The other two, stacked. */}
          <div className="grid gap-5">
            {REST.map((product, i) => (
              <Reveal key={product.title} variant="focus" index={i + 1}>
                <Link
                  href={product.href}
                  className="v4-plane v4-plane-lift group flex h-full items-center gap-5 overflow-hidden p-6 sm:p-7"
                >
                  <div className="min-w-0 flex-1">
                    <p className="v4-label flex items-center gap-2">
                      <product.icon size={16} />
                      {t(product.tag)}
                    </p>
                    <h3 className="v4-h3 mt-3">{t(product.title)}</h3>
                    <p className="v4-body mt-2.5 !text-[0.875rem]">{t(product.desc)}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-bold text-[var(--v4-accent)]">
                      {t("productGetStarted")}
                      <ArrowRightIcon
                        size={15}
                        className="transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      />
                    </span>
                  </div>

                  {/* Decorative: the card's meaning is entirely in its heading and its copy, so the
                      artwork carries an empty alt rather than a description a screen reader would
                      have to sit through. */}
                  <div className="relative hidden h-32 w-32 shrink-0 sm:block">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

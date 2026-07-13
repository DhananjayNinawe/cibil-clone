"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { ArrowRightIcon } from "@/components/icons";

const CTA_HREF = "/choose-subscription";

interface ProductCardConfig {
  tag: TranslationKey;
  title: TranslationKey;
  desc: TranslationKey;
  image: string;
  accent: string;
  /** First card shows the "Get Started" label expanded by default. */
  defaultOpen?: boolean;
}

const PRODUCTS: ProductCardConfig[] = [
  {
    tag: "productIndividualsTag",
    title: "productIndividualsTitle",
    desc: "productIndividualsDesc",
    image: "https://www.cibil.com/content/dam/cibil/homepage/shared/ind-banner.png",
    accent: "from-[#0a3a52] to-[#0f5773]",
    defaultOpen: true,
  },
  {
    tag: "productBusinessTag",
    title: "productBusinessTitle",
    desc: "productBusinessDesc",
    image: "https://www.cibil.com/content/dam/cibil/homepage/shared/business-banner.png",
    accent: "from-[#0a3a52] to-[#14607e]",
  },
  {
    tag: "productMfiTag",
    title: "productMfiTitle",
    desc: "productMfiDesc",
    image: "https://www.cibil.com/content/dam/cibil/homepage/shared/micro-banner.png",
    accent: "from-[#0a3a52] to-[#1a6d8a]",
  },
];

function ProductCta({ open = false }: { open?: boolean }) {
  const { t } = useLanguage();

  return (
    <Link
      href={CTA_HREF}
      aria-label={t("productGetStarted")}
      title={t("productGetStarted")}
      className="group/cta inline-flex items-center h-11 rounded-full bg-[#0e5c80] text-white shadow-sm transition-colors hover:bg-[#137199] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <span
        className={`overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-out ${open
            ? "max-w-40 pl-5"
            : "max-w-0 pl-0 group-hover/cta:max-w-40 group-hover/cta:pl-5"
          }`}
      >
        {t("productGetStarted")}
      </span>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center">
        <ArrowRightIcon className="h-4 w-4" />
      </span>
    </Link>
  );
}

function ProductCard({ tag, title, desc, image, accent, defaultOpen }: ProductCardConfig) {
  const { t } = useLanguage();
  const tagLabel = t(tag);
  const [firstWord, ...restWords] = tagLabel.split(" ");
  const restLabel = restWords.join(" ");

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl bg-linear-to-b ${accent} p-7 text-white min-h-155`}
    >
      <div className="relative z-10">
        <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.12em]">
          <span className="text-[#6cc5ec]">{firstWord}</span>
          {restLabel && <span className="ml-1 font-bold text-white">{restLabel}</span>}
        </span>

        <h3 className="text-xl font-bold leading-snug">{t(title)}</h3>
        <p className="mt-3 text-sm text-white/70">{t(desc)}</p>

        <div className="mt-6">
          <ProductCta open={defaultOpen} />
        </div>
      </div>

      <Image
        src={image}
        alt=""
        aria-hidden
        width={360}
        height={420}
        unoptimized
        className="pointer-events-none absolute bottom-0 right-0 left-0 z-0 h-auto w-full max-h-[62%] select-none object-contain object-bottom"
      />
    </div>
  );
}

export default function ProductsServices() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            <span className="text-[#00b0f0]">{t("productsHeadingPrefix")}</span> {t("productsHeadingSuffix")}
          </h2>
          <div className="w-12 border-t-2 border-[#00b0f0] mt-10 mb-5" />
          <p className="text-base text-gray-500">{t("productsSubtitle")}</p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

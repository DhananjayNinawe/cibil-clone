"use client";

import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { ArrowRightIcon, PersonSilhouetteIcon } from "@/components/icons";

interface ProductCardConfig {
  tag: TranslationKey;
  title: TranslationKey;
  desc: TranslationKey;
  accent: string;
}

const PRODUCTS: ProductCardConfig[] = [
  { tag: "productIndividualsTag", title: "productIndividualsTitle", desc: "productIndividualsDesc", accent: "from-[#0a3a52] to-[#0f5773]" },
  { tag: "productBusinessTag", title: "productBusinessTitle", desc: "productBusinessDesc", accent: "from-[#0a3a52] to-[#14607e]" },
  { tag: "productMfiTag", title: "productMfiTitle", desc: "productMfiDesc", accent: "from-[#0a3a52] to-[#1a6d8a]" },
];

function ProductCard({ tag, title, desc, accent }: ProductCardConfig) {
  const { t } = useLanguage();

  return (
    <div className={`relative flex flex-col justify-between rounded-xl bg-gradient-to-b ${accent} text-white p-6 h-full min-h-[340px] overflow-hidden`}>
      <div>
        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#7fd4f0] mb-3">
          {t(tag)}
        </span>
        <h3 className="text-lg font-bold leading-snug">{t(title)}</h3>
        <p className="text-sm text-white/70 mt-2">{t(desc)}</p>
      </div>

      <div className="flex items-end justify-between mt-6">
        <button
          aria-label="Learn more"
          className="w-9 h-9 rounded-full bg-[#00b0f0] hover:bg-[#009fd9] flex items-center justify-center transition-colors"
        >
          <ArrowRightIcon className="w-4 h-4 text-white" />
        </button>
        <PersonSilhouetteIcon className="w-16 h-16 text-white/15" />
      </div>
    </div>
  );
}

export default function ProductsServices() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
            <span className="text-[#00b0f0]">{t("productsHeadingPrefix")}</span> {t("productsHeadingSuffix")}
          </h2>
          <div className="w-10 border-t-2 border-[#00b0f0] my-5" />
          <p className="text-sm text-gray-500">{t("productsSubtitle")}</p>
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

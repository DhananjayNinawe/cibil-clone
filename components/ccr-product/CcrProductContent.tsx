"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import OfferBanner from "@/components/shared/OfferBanner";
import { PlusMinusCircleIcon, RosetteCheckIcon, ClipboardIcon, CircleCheckOutlineIcon, PlayIcon } from "@/components/icons";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/vyapaari.jpg";
const RANK_VIDEO = "https://www.cibil.com/content/dam/cibil/consumer/media/video/cibil-rank.mp4";

type Accordion = { questionKey: TranslationKey; bodyKeys: TranslationKey[] };

const INTRO_QUESTIONS: Accordion[] = [
  { questionKey: "ccpQ1", bodyKeys: ["ccpA1"] },
  { questionKey: "ccpQ2", bodyKeys: ["ccpQ2Bullet1", "ccpQ2Bullet2"] },
];

const FAQ_TABS: { labelKey: TranslationKey; items: Accordion[] }[] = [
  {
    labelKey: "ccpFaqTab1",
    items: [
      { questionKey: "ccpFaq1", bodyKeys: ["ccpFaqA1"] },
      { questionKey: "ccpFaq2", bodyKeys: ["ccpFaqA2"] },
    ],
  },
  {
    labelKey: "ccpFaqTab2",
    items: [
      { questionKey: "ccpFaq3", bodyKeys: ["ccpFaqA3"] },
      { questionKey: "ccpFaq4", bodyKeys: ["ccpFaqA4"] },
    ],
  },
];

const BENEFITS: { icon: (props: { className?: string }) => React.ReactElement; titleKey: TranslationKey; descKey: TranslationKey }[] = [
  { icon: RosetteCheckIcon, titleKey: "ccpBenefit1Title", descKey: "ccpBenefit1Desc" },
  { icon: ClipboardIcon, titleKey: "ccpBenefit2Title", descKey: "ccpBenefit2Desc" },
  { icon: CircleCheckOutlineIcon, titleKey: "ccpBenefit3Title", descKey: "ccpBenefit3Desc" },
];

const PLANS: {
  name: string;
  priceKey: TranslationKey;
  periodKey: TranslationKey;
  refreshKey: TranslationKey;
  saksham: boolean;
}[] = [
  { name: "BASIC", priceKey: "ccpBasicPrice", periodKey: "ccpBasicPeriod", refreshKey: "ccpBasicRefresh", saksham: false },
  { name: "STANDARD", priceKey: "ccpStandardPrice", periodKey: "ccpStandardPeriod", refreshKey: "ccpStandardRefresh", saksham: true },
  { name: "PREMIUM", priceKey: "ccpPremiumPrice", periodKey: "ccpPremiumPeriod", refreshKey: "ccpPremiumRefresh", saksham: true },
];

const THINGS: TranslationKey[] = ["ccpThing1", "ccpThing2", "ccpThing3"];

function YellowButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs font-bold tracking-wide uppercase rounded-full px-7 py-3 transition-colors"
    >
      {children}
    </Link>
  );
}

/** Yellow-underlined centered section heading. */
function UnderlinedHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center">
      <span className="inline-block border-b-2 border-[#f5c518] pb-1 text-sm font-bold tracking-wide text-gray-900">
        {children}
      </span>
    </h2>
  );
}

function AccordionRow({
  item,
  open,
  onToggle,
  highlight = false,
}: {
  item: Accordion;
  open: boolean;
  onToggle: () => void;
  highlight?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <div className={`border-b ${open && highlight ? "border-[#f5c518] border-b-2" : "border-gray-200"}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex items-center gap-3 w-full text-left py-4 cursor-pointer"
      >
        <PlusMinusCircleIcon expanded={open} className="w-5 h-5 shrink-0 text-[#00b0f0]" />
        <span className="text-sm font-bold text-gray-800">{t(item.questionKey)}</span>
      </button>
      {open && (
        <ul className="ml-8 pl-4 pb-4 list-disc space-y-2 text-sm text-gray-600 leading-relaxed">
          {item.bodyKeys.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Accordion list where at most one row is open; `defaultOpen` is an index into `items`. */
function AccordionList({ items, defaultOpen = null, highlight = false }: { items: Accordion[]; defaultOpen?: number | null; highlight?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div>
      {items.map((item, i) => (
        <AccordionRow
          key={item.questionKey}
          item={item}
          open={openIndex === i}
          highlight={highlight}
          onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
        />
      ))}
    </div>
  );
}

function RankVideo() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-black">
      <video
        src={RANK_VIDEO}
        controls
        preload="metadata"
        playsInline
        onPlay={() => setPlaying(true)}
        className="w-full h-full"
      >
        <track kind="captions" />
      </video>
      {!playing && (
        <button
          type="button"
          aria-label={t("ccpPlayVideo")}
          onClick={(e) => {
            const video = e.currentTarget.parentElement?.querySelector("video");
            void video?.play();
          }}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <span className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <PlayIcon className="w-9 h-9 text-[#00b0f0] ml-1" />
          </span>
        </button>
      )}
    </div>
  );
}

function PlanColumn({ plan }: { plan: (typeof PLANS)[number] }) {
  const { t } = useLanguage();

  return (
    <div className="border border-gray-200 flex flex-col">
      <div className="bg-[#29abd6] text-white text-center text-sm font-bold tracking-wide py-3.5">{plan.name}</div>
      <div className="bg-[#f2f2f2] text-center text-sm font-bold text-gray-900 py-3.5">{t(plan.priceKey)}</div>
      <div className="text-center text-xs font-bold text-gray-800 py-3.5 border-b border-gray-200">{t(plan.periodKey)}</div>
      <div className="text-center text-xs text-gray-700 py-3.5 px-3 border-b border-gray-200">{t(plan.refreshKey)}</div>
      <div className="text-center text-xs text-gray-700 py-3.5 border-b border-gray-200">{t("ccpAccessDashboard")}</div>
      <div className="text-center text-xs text-gray-700 py-3.5 border-b border-gray-200 min-h-11">
        {plan.saksham ? t("featCibilSaksham") : ""}
      </div>
      <div className="bg-[#f2f2f2] mt-auto py-4 text-center">
        <YellowButton href="/choose-subscription">{t("sidebarSubscribeNowBtn")}</YellowButton>
      </div>
    </div>
  );
}

export default function CcrProductContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#f2f2f2] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:w-1/2 py-10 lg:py-14 lg:pl-10">
            <h1 className="text-2xl sm:text-[26px] font-bold text-gray-900 leading-snug max-w-sm">{t("ccpHeroTitle")}</h1>
            <p className="text-sm text-gray-700 mt-4">{t("ccpHeroDesc")}</p>
            <div className="mt-5">
              <YellowButton href="/choose-subscription">{t("sidebarSubscribeNowBtn")}</YellowButton>
            </div>
            <p className="text-sm text-gray-700 mt-5">
              {t("ccpAlready")}{" "}
              <Link href="/login" className="text-gray-900 font-bold underline underline-offset-2">
                {t("loginNow")}
              </Link>
            </p>
          </div>
        </div>

        {/* Banner art — bleeds to the right edge on desktop, stacks below the copy on mobile */}
        <div className="lg:hidden">
          <Image src={HERO_IMAGE} alt={t("ccpHeroTitle")} width={780} height={480} priority unoptimized className="w-full h-auto" />
        </div>
        <div className="hidden lg:block absolute top-0 right-0 h-full w-[42%]">
          <Image src={HERO_IMAGE} alt={t("ccpHeroTitle")} fill priority unoptimized sizes="42vw" className="object-cover object-left" />
        </div>
      </section>

      <div className="pt-8">
        <OfferBanner inset />
      </div>

      {/* Intro Q&A + video */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <AccordionList items={INTRO_QUESTIONS} defaultOpen={1} highlight />
        <RankVideo />
      </section>

      {/* Check now + Demand Draft note */}
      <div className="bg-[#f2f2f2] py-10 px-4 text-center">
        <YellowButton href="/register">{t("ccpCheckNow")}</YellowButton>
        <p className="text-sm text-gray-700 mt-5 max-w-3xl mx-auto">
          {t("ccpDownloadPrefix")}{" "}
          <span>
            &quot;
            <a href="#" className="font-bold text-gray-900 underline underline-offset-2">
              {t("ccpDownloadLink")}
            </a>
            &quot;
          </span>{" "}
          {t("ccpDownloadSuffix")}
        </p>
      </div>

      {/* Benefits */}
      <section className="relative bg-[#f2f2f2] border-t border-white pt-14 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("ccpBenefitsHeading")}</h2>
          <p className="text-sm text-gray-600 mt-2">{t("ccpBenefitsSub")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {BENEFITS.map(({ icon: Icon, titleKey, descKey }) => (
              <div key={titleKey} className="bg-white border border-gray-200 rounded-lg px-6 py-8 min-h-52">
                <div className="flex justify-center">
                  <Icon className="w-12 h-12 text-[#0a3a52]" />
                </div>
                <p className="mt-5 text-sm font-bold text-gray-900">{t(titleKey)}</p>
                <p className="mt-3 text-xs text-gray-600 leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 italic mt-6">{t("ccpBenefitsDisclaimer")}</p>
        </div>

        {/* Straddles the section edge, as on cibil.com */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-full text-center">
          <YellowButton href="/register">{t("ccpGetCcrNow")}</YellowButton>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
        <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-900">{t("ccpMonitorHeading")}</h2>
        <p className="text-center text-sm text-gray-600 mt-3 max-w-3xl mx-auto">{t("ccpMonitorDesc")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          {PLANS.map((plan) => (
            <PlanColumn key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Things you need to understand */}
        <div className="mt-14">
          <UnderlinedHeading>{t("ccpThingsHeading")}</UnderlinedHeading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-center">
            {THINGS.map((key) => (
              <a key={key} href="#" className="text-sm text-[#0a5fa8] underline underline-offset-2 hover:text-[#00b0f0]">
                {t(key)}
              </a>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-14">
          <UnderlinedHeading>{t("ccpFaqHeading")}</UnderlinedHeading>
          <FaqTabs />
        </div>
      </section>
    </>
  );
}

function FaqTabs() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div role="tablist" className="flex items-center justify-center gap-10 sm:gap-20 mt-8">
        {FAQ_TABS.map((tab, i) => (
          <button
            key={tab.labelKey}
            type="button"
            role="tab"
            onClick={() => setActiveTab(i)}
            aria-selected={activeTab === i}
            className={`text-sm pb-1 cursor-pointer transition-colors ${
              activeTab === i
                ? "font-bold text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <AccordionList key={activeTab} items={FAQ_TABS[activeTab].items} />
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { BellIcon, CloseIcon, GaugeIcon, MapPinIcon, PeopleIcon, ReportChartIcon, TrendIcon } from "@/components/icons";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/banners/cibil_score_report.png";
const LAPTOP_IMAGE =
  "https://www.cibil.com/consumer/_jcr_content/root/contentcontainer/pagesection_2012935909/columnrow/image.coreimg.75.1440.png/1715930130945/consumer-laptop.png";
const BLOG1_IMAGE =
  "https://www.cibil.com/blog/credit-matters-at-every-important-stage-in-your-life/_jcr_content/teaserImage.coreimg.75.1440.png/1726219468878/credit-rating-across-life.png";
const BLOG2_IMAGE =
  "https://www.cibil.com/blog/first-time-users-guide-to-establishing-credit/_jcr_content/teaserImage.coreimg.75.1440.png/1671208834821/first-time-users-guide.png";

type Feature = {
  icon: (props: { className?: string }) => React.ReactElement;
  boldKey: TranslationKey;
  restKey: TranslationKey;
};

const FEATURES: Feature[] = [
  { icon: ReportChartIcon, boldKey: "csrFeatUnlimitedBold", restKey: "csrFeatUnlimited" },
  { icon: TrendIcon, boldKey: "csrFeatTrendedBold", restKey: "csrFeatTrended" },
  { icon: BellIcon, boldKey: "csrFeatAlertsBold", restKey: "csrFeatAlerts" },
  { icon: PeopleIcon, boldKey: "csrFeatWhereBold", restKey: "csrFeatWhere" },
  { icon: GaugeIcon, boldKey: "csrFeatSimulatorBold", restKey: "csrFeatSimulator" },
];

function SubscribeButton() {
  const { t } = useLanguage();
  return (
    <Link
      href="/choose-subscription"
      className="inline-block bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs font-bold tracking-wide uppercase rounded-full px-7 py-3 transition-colors"
    >
      {t("sidebarSubscribeNowBtn")}
    </Link>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const { t } = useLanguage();
  const Icon = feature.icon;

  return (
    <div className="bg-white p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-[#e6f7fd] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#00b0f0]" />
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">
        <span className="font-bold text-gray-900">{t(feature.boldKey)}</span> {t(feature.restKey)}
      </p>
    </div>
  );
}

function BlogCard({ image, titleKey }: { image: string; titleKey: TranslationKey }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-5/2 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={t(titleKey)}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-5 text-lg font-bold text-gray-900 leading-snug text-center">{t(titleKey)}</h3>
      <a
        href="#"
        className="mt-2 mx-auto text-sm font-semibold text-[#00b0f0] hover:underline inline-flex items-center gap-1"
      >
        {t("readMoreLink")} <span aria-hidden>▸</span>
      </a>
    </div>
  );
}

export default function CsrContent() {
  const { t } = useLanguage();
  const [showFreeBanner, setShowFreeBanner] = useState(true);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#f2f2f2] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="pt-12 lg:py-16 max-w-md">
            <h1 className="text-2xl sm:text-3xl text-gray-900 leading-snug">{t("csrHeroTitle")}</h1>
            <div className="mt-7">
              <SubscribeButton />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end lg:-mr-8">
            <Image
              src={HERO_IMAGE}
              alt={t("csrHeroTitle")}
              width={520}
              height={340}
              priority
              unoptimized
              className="w-full max-w-md lg:max-w-lg h-auto"
            />
          </div>
        </div>
      </section>

      {/* Did you know */}
      <div className="bg-[#f5c518] py-3.5 px-4">
        <p className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-center text-sm text-gray-900">
          <MapPinIcon className="w-4 h-4 shrink-0 text-gray-900" />
          <span>
            <span className="font-bold">{t("csrDidYouKnowLabel")}</span> {t("csrDidYouKnowText")}
          </span>
        </p>
      </div>

      {/* What is CIBIL Score & Report */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">{t("csrWhatHeading")}</h2>
        <p className="text-gray-700 leading-relaxed">{t("csrWhatPara1")}</p>
        <p className="text-gray-700 leading-relaxed mt-4">{t("csrWhatPara2")}</p>
        <p className="text-gray-700 leading-relaxed mt-4">{t("csrWhatPara3")}</p>
      </section>

      {/* Dashboard features */}
      <section className="bg-[#eaeaea] py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 leading-snug">{t("csrDashboardHeading")}</h2>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">{t("csrDashboardDesc")}</p>
            <div className="mt-7">
              <SubscribeButton />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.boldKey} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Why subscribe */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5 max-w-sm leading-snug">{t("csrWhyHeading")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("csrWhyDesc")}</p>
          <p className="text-gray-800 mt-5">{t("csrWhyGetStarted")}</p>
          <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
            {[t("csrWhyBullet1"), t("csrWhyBullet2"), t("csrWhyBullet3")].map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span aria-hidden className="text-[#00b0f0] leading-6">
                  •
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src={LAPTOP_IMAGE}
            alt={t("csrDashboardHeading")}
            width={560}
            height={340}
            unoptimized
            className="w-full max-w-lg h-auto"
          />
        </div>
      </section>

      {/* Track banner */}
      <section className="bg-[#eaeaea] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t("csrTrackHeading")}</h2>
            <p className="text-sm text-gray-600 mt-3 max-w-2xl">{t("csrTrackDesc")}</p>
          </div>
          <div className="shrink-0">
            <SubscribeButton />
          </div>
        </div>
      </section>

      {/* Free score banner */}
      {showFreeBanner && (
        <div className="border-t-2 border-[#0a3a52] bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <p className="flex-1 text-center text-sm text-gray-600">
              <Link href="/freecibilscore" className="text-[#0a5fa8] underline font-medium">
                {t("csrFreeBannerLink")}
              </Link>{" "}
              {t("csrFreeBannerRest")}
            </p>
            <button
              type="button"
              onClick={() => setShowFreeBanner(false)}
              aria-label={t("csrCloseBanner")}
              className="text-gray-400 hover:text-gray-700 transition-colors"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* From the blog */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div>
            <p className="text-sm font-bold tracking-wide text-gray-900 uppercase">{t("csrFromBlog")}</p>
            <p className="text-sm text-gray-600 mt-4 max-w-xs leading-relaxed">{t("featuredArticlesDesc")}</p>
          </div>
          <BlogCard image={BLOG1_IMAGE} titleKey="csrBlog1" />
          <BlogCard image={BLOG2_IMAGE} titleKey="csrBlog2" />
        </div>
      </section>
    </>
  );
}

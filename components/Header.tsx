"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { languages, Language, TranslationKey } from "@/lib/i18n";
import { ChevronDownIcon, SearchIcon, IndiaFlagIcon } from "@/components/icons";

export type HeaderVariant = "full" | "marketing" | "auth" | "site";

interface HeaderProps {
  /**
   * "full"      – logo + login button + script size switcher + language dropdown (used by /register)
   * "marketing" – logo + plain "Login" link only (used by /choose-subscription)
   * "auth"      – logo + script size switcher + language dropdown, no login button, gold accent border (used by /login)
   * "site"      – full two-row site nav: business/personal tabs, primary nav, search, New/Existing User CTAs (used by home page)
   */
  variant?: HeaderVariant;
}

const CIBIL_LOGO_URL = "https://www.cibil.com/content/dam/cibil/content-fragments/header/cibil-logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={CIBIL_LOGO_URL}
        alt="CIBIL - Part of TransUnion"
        width={182}
        height={82}
        priority
        unoptimized
        className="h-9 w-auto"
      />
    </Link>
  );
}

function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLang = languages.find((l) => l.code === language)!;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-gray-900"
      >
        <span>{currentLang.label}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as Language);
                setDropdownOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between ${
                language === lang.code ? "text-[#00b0f0] font-semibold bg-blue-50" : "text-gray-700"
              }`}
            >
              <span>{lang.label}</span>
              <span className="text-gray-400 text-xs">{lang.nativeLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ScriptSizeSwitcher() {
  return (
    <div className="hidden sm:flex items-center gap-1 text-gray-600 font-semibold">
      <span className="text-xs cursor-pointer hover:text-[#00b0f0]">A</span>
      <span className="text-sm cursor-pointer hover:text-[#00b0f0]">अ</span>
      <span className="text-base cursor-pointer hover:text-[#00b0f0]">A</span>
      <span className="text-lg cursor-pointer hover:text-[#00b0f0]">ए</span>
    </div>
  );
}

interface MegaMenuLink {
  key: TranslationKey;
  href?: string;
}

interface MegaMenuColumn {
  heading: TranslationKey;
  links: MegaMenuLink[];
}

const SITE_NAV_LINKS: { key: TranslationKey; href: string }[] = [
  { key: "navProducts", href: "/choose-subscription" },
  { key: "navKnowledge", href: "#" },
  { key: "navGrievance", href: "#" },
  { key: "navSupport", href: "/contact-us" },
  { key: "navAbout", href: "/about-us" },
];

const MEGA_MENUS: Partial<Record<TranslationKey, MegaMenuColumn[]>> = {
  navProducts: [
    {
      heading: "megaIndividualsHeading",
      links: [
        { key: "megaCibilScoreReport", href: "/cibil-score-report" },
        { key: "featCibilAlerts", href: "/cibil-alerts" },
        { key: "megaFreeCibilScore", href: "/freecibilscore" },
        { key: "featScoreSimulator", href: "/score-simulator" },
      ],
    },
    {
      heading: "megaBusinessesHeading",
      links: [
        { key: "megaCompanyCreditReport", href: "/company-credit-report" },
        { key: "megaCheckCibilRank", href: "/company-credit-report" },
      ],
    },
    { heading: "megaMicrofinanceHeading", links: [{ key: "megaMfiScoreReport", href: "/microfinance" }] },
  ],
  navKnowledge: [
    {
      heading: "megaCreditBasicsHeading",
      links: [
        { key: "filterUnderstandingCibil", href: "/faq-brochure" },
        { key: "megaCreditScoreLoanBasics", href: "/faq/credit-score-and-loan-basics" },
        { key: "megaLoanRejectionsDisputes", href: "/faq/loan-rejections-disputes" },
        { key: "megaConsumerAwareness", href: "/faq/consumer-awareness" },
      ],
    },
    {
      heading: "faqs",
      links: [
        { key: "megaUnderstandScoreReport", href: "/faq/understand-your-credit-score-and-report" },
        { key: "megaScoreSimulatorFaqs", href: "/faq/score-simulator" },
        { key: "megaPurchasePostPurchase", href: "/faq/purchase-post-purchase-help" },
        { key: "megaFreeCibilScore", href: "/freecibilscore" },
        { key: "megaRankCompanyFaqs", href: "/faq/company-credit-report" },
      ],
    },
    {
      heading: "footerCreditEducation",
      links: [
        { key: "filterCreditAdvice", href: "/credit-advice" },
        { key: "filterCreditMyths", href: "/credit-myths" },
        { key: "megaWatchAndLearn", href: "/watch-and-learn" },
        { key: "filterCommercialCredit", href: "/commercial-credit" },
        { key: "megaNewToCredit", href: "/new-to-credit" },
        { key: "megaCibilJaagran", href: "/jaagran" },
        { key: "featCibilSaksham", href: "/cibil-saksham" },
      ],
    },
  ],
  navGrievance: [
    {
      heading: "megaGrievanceRedressalHeading",
      links: [
        { key: "megaConsumerDisputeResolution", href: "/consumer-dispute-resolution" },
        { key: "megaCompanyDisputeResolution", href: "/company-dispute-resolution" },
        { key: "megaMfiDisputeResolution", href: "/microfinance-dispute-resolution" },
        { key: "megaComplaintsEscalations", href: "/complaints-and-escalations" },
      ],
    },
    {
      heading: "megaResourcesHeading",
      links: [
        { key: "megaConsumerEnquiry", href: "/enquiry" },
        { key: "megaCommercialEnquiry", href: "/enquiryccr" },
        { key: "megaFrameworkCompensation", href: "/framework-for-compensation" },
        { key: "megaNodalOfficerList", href: "/nodal-officer-list" },
      ],
    },
  ],
};

type ActiveMenu = TranslationKey | "search" | null;

function SiteHeader() {
  const { t } = useLanguage();
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);

  const activeMegaMenu = activeMenu && activeMenu !== "search" ? MEGA_MENUS[activeMenu] : undefined;

  return (
    <header className="bg-white sticky top-0 z-50 border-b-[3px] border-[#f5c518]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-6 sm:gap-10">
            <Logo />
            <nav className="hidden sm:flex items-center gap-5 text-sm font-medium text-gray-500">
              <span className="cursor-pointer hover:text-gray-800">{t("navBusiness")}</span>
              <span className="text-gray-800 font-semibold border-b-2 border-[#00b0f0] pb-4 -mb-4 cursor-pointer">
                {t("navPersonal")}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/register"
              className="bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs sm:text-sm font-bold rounded-full px-4 sm:px-5 py-2 transition-colors whitespace-nowrap"
            >
              {t("newUser")}
            </Link>
            <Link
              href="/login"
              className="bg-white border border-[#f5c518] hover:bg-yellow-50 text-gray-900 text-xs sm:text-sm font-bold rounded-full px-4 sm:px-5 py-2 transition-colors whitespace-nowrap hidden sm:block"
            >
              {t("existingUser")}
            </Link>
            <div className="hidden lg:flex items-center gap-2">
              <IndiaFlagIcon />
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden md:block" onMouseLeave={() => setActiveMenu(null)}>
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <nav className="flex items-center text-sm font-medium">
              {SITE_NAV_LINKS.map((link) => {
                const hasMenu = Boolean(MEGA_MENUS[link.key]);
                const isActive = activeMenu === link.key;
                return (
                  <div
                    key={link.key}
                    onMouseEnter={() => setActiveMenu(hasMenu ? link.key : null)}
                    className={`h-12 flex items-center px-4 transition-colors hover:bg-[#f5c518] hover:text-gray-900 hover:font-bold ${
                      isActive ? "bg-[#f5c518] text-gray-900 font-bold" : "text-gray-600"
                    }`}
                  >
                    <Link href={link.href}>{t(link.key)}</Link>
                  </div>
                );
              })}
            </nav>
            <button
              type="button"
              aria-label="Search"
              onClick={() => setActiveMenu((prev) => (prev === "search" ? null : "search"))}
              onMouseEnter={() => setActiveMenu((prev) => (prev === "search" ? prev : null))}
              className={`h-12 w-12 flex items-center justify-center transition-colors ${
                activeMenu === "search" ? "bg-[#f5c518] text-gray-900" : "text-gray-500 hover:text-[#00b0f0]"
              }`}
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {activeMegaMenu && (
          <div className="absolute left-0 top-full w-full bg-white shadow-lg z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex gap-14">
                {activeMegaMenu.map((column) => (
                  <div key={column.heading} className="w-56 shrink-0">
                    <p className="text-xs font-bold tracking-widest uppercase text-gray-800 mb-4">
                      {t(column.heading)}
                    </p>
                    <ul className="space-y-3">
                      {column.links.map((link) => (
                        <li key={link.key}>
                          <Link href={link.href ?? "#"} className="text-sm text-gray-700 hover:text-[#00b0f0] hover:underline">
                            {t(link.key)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="border-l border-gray-200 self-stretch" />
              </div>
            </div>
          </div>
        )}

        {activeMenu === "search" && (
          <div className="absolute left-0 top-full w-full bg-white shadow-lg z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative max-w-xl">
                <input
                  type="text"
                  autoFocus
                  placeholder={t("searchPlaceholder")}
                  className="w-full border border-gray-300 rounded px-4 py-2.5 pr-11 text-sm focus:outline-none focus:border-[#00b0f0] focus:ring-1 focus:ring-[#00b0f0]"
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00b0f0]"
                >
                  <SearchIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Header({ variant = "full" }: HeaderProps) {
  const { t } = useLanguage();

  if (variant === "site") {
    return <SiteHeader />;
  }

  const showLoginButton = variant === "full";
  const showLoginLink = variant === "marketing";
  const showLanguageTools = variant === "full" || variant === "auth";
  const showAccentBorder = variant === "auth";

  return (
    <header
      className={`bg-white sticky top-0 z-50 ${
        showAccentBorder ? "border-b-[3px] border-[#f5c518]" : "border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4">
            {showLoginLink && (
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-800 hover:text-[#00b0f0] transition-colors"
              >
                {t("login")}
              </Link>
            )}

            {showLoginButton && (
              <Link
                href="/login"
                className="border border-gray-700 rounded-full px-5 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors hidden sm:block"
              >
                {t("login")}
              </Link>
            )}

            {showLanguageTools && (
              <>
                <ScriptSizeSwitcher />
                <LanguageDropdown />
              </>
            )}

            {showLoginButton && (
              <Link
                href="/login"
                className="border border-gray-700 rounded-full px-4 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors sm:hidden"
              >
                {t("login")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

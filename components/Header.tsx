"use client";

// KeyboardEvent is aliased: LanguageDropdown listens for the DOM one, so the React type cannot
// take that name here.
import { useState, useRef, useEffect, useMemo, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { languages, Language, TranslationKey } from "@/lib/i18n";
import { searchPages } from "@/lib/searchIndex";
import HighlightedText from "@/components/shared/HighlightedText";
import {
  ChevronDownIcon,
  SearchIcon,
  IndiaFlagIcon,
  MenuIcon,
  CloseIcon,
  PlusMinusCircleIcon,
} from "@/components/icons";

export type HeaderVariant = "full" | "marketing" | "auth" | "site";

interface HeaderProps {
  /**
   * "full"      – logo + login button + script size switcher + language dropdown (used by /register)
   * "marketing" – logo + yellow "Login" pill only (used by /choose-subscription)
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

/** Matches the panel's `w-44`; needed to keep it inside the viewport. */
const LANGUAGE_PANEL_WIDTH = 176;

function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const currentLang = languages.find((l) => l.code === language)!;

  // The panel is portalled to <body> and positioned against the trigger: both
  // hosts of this dropdown clip their children (the header's utility strip is
  // overflow-hidden so it can collapse on scroll, the mobile drawer scrolls),
  // so an absolutely positioned panel would be cut off.
  useEffect(() => {
    if (!dropdownOpen) return;

    const place = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Right-aligned to the trigger, clamped to the viewport — in the mobile
      // drawer the trigger sits near the left edge, so it would overflow.
      const right = Math.max(8, rect.right - LANGUAGE_PANEL_WIDTH);
      const left = Math.min(right, window.innerWidth - LANGUAGE_PANEL_WIDTH - 8);
      setCoords({ top: rect.bottom + 8, left });
    };
    place();

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setDropdownOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    const handleScroll = (e: Event) => {
      // Page scroll collapses the utility strip out from under the trigger, so
      // close. Scrolling an inner container (mobile drawer) just re-anchors.
      const target = e.target;
      if (target === document || target === document.documentElement || target === document.body) {
        setDropdownOpen(false);
      } else {
        place();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", place);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen}
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-gray-900"
      >
        <span>{currentLang.label}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      {dropdownOpen &&
        coords &&
        createPortal(
          <div
            ref={panelRef}
            role="listbox"
            style={{ top: coords.top, left: coords.left }}
            className="fixed z-200 w-44 overflow-hidden rounded border border-gray-200 bg-white shadow-lg"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={language === lang.code}
                onClick={() => {
                  setLanguage(lang.code as Language);
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between ${language === lang.code ? "text-[#00b0f0] font-semibold bg-blue-50" : "text-gray-700"
                  }`}
              >
                <span>{lang.label}</span>
                <span className="text-gray-400 text-xs">{lang.nativeLabel}</span>
              </button>
            ))}
          </div>,
          document.body,
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

/** Suggestions shown under the header input; the rest live on /search. */
const SUGGESTION_LIMIT = 6;

/**
 * Site search. Typing filters the page index in memory (see lib/searchIndex.ts) and offers the
 * best matches; Enter opens the highlighted one, or /search for the full ranked list.
 */
function SearchPanel({ onClose }: { onClose: () => void }) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const panelRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();
  const results = useMemo(
    () => searchPages(trimmed, language, SUGGESTION_LIMIT),
    [trimmed, language],
  );

  // Dismiss on any click outside the panel. The toggle button is exempt: it would otherwise be
  // closed here and immediately reopened by its own onClick, so it could never close the panel.
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (panelRef.current?.contains(target) || target.closest("[data-search-toggle]")) return;
      onClose();
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [onClose]);

  const goTo = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!trimmed) return;
    const selected = activeIndex >= 0 ? results[activeIndex] : undefined;
    goTo(selected ? selected.href : `/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    }
  };

  return (
    <div
      ref={panelRef}
      className="absolute left-0 top-[calc(100%+3px)] w-full bg-white shadow-lg z-40"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <form role="search" onSubmit={handleSubmit} className="max-w-xl">
          <div className="relative">
            <input
              type="text"
              autoFocus
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls="site-search-suggestions"
              aria-activedescendant={activeIndex >= 0 ? `site-search-option-${activeIndex}` : undefined}
              aria-label={t("searchPlaceholder")}
              autoComplete="off"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder={t("searchPlaceholder")}
              className="w-full border border-gray-300 rounded px-4 py-2.5 pr-20 text-sm focus:outline-none focus:border-[#00b0f0] focus:ring-1 focus:ring-[#00b0f0]"
            />
            {trimmed && (
              <button
                type="button"
                aria-label={t("searchClear")}
                onClick={() => {
                  setQuery("");
                  setActiveIndex(-1);
                }}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              aria-label={t("searchPlaceholder")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00b0f0]"
            >
              <SearchIcon className="w-4 h-4" />
            </button>
          </div>

          {trimmed && (
            <ul
              id="site-search-suggestions"
              role="listbox"
              aria-label={t("searchSuggestionsLabel")}
              className="mt-2 overflow-hidden rounded border border-gray-200 bg-white shadow-sm"
            >
              {results.map((result, index) => (
                <li key={result.href} id={`site-search-option-${index}`} role="option" aria-selected={index === activeIndex}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => goTo(result.href)}
                    className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors ${index === activeIndex ? "bg-gray-50" : ""
                      }`}
                  >
                    <span className="text-sm text-gray-800">
                      <HighlightedText text={t(result.titleKey)} query={trimmed} />
                    </span>
                    <span className="text-xs text-gray-500">
                      {t(result.sectionKey)}
                      {result.groupKey ? ` › ${t(result.groupKey)}` : ""}
                    </span>
                  </button>
                </li>
              ))}

              {results.length === 0 ? (
                <li className="px-4 py-3 text-sm text-gray-500">{t("searchNoSuggestions")}</li>
              ) : (
                <li className="border-t border-gray-100">
                  <button
                    type="submit"
                    onMouseEnter={() => setActiveIndex(-1)}
                    className="w-full px-4 py-2.5 text-left text-xs font-semibold text-[#0f6cbd] hover:bg-gray-50"
                  >
                    {t("searchViewAll")}
                  </button>
                </li>
              )}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
}

function MobileNav({
  open,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  const { t } = useLanguage();
  const [openSection, setOpenSection] = useState<TranslationKey | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      {/* Dimmed overlay */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide-in drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-[110] flex w-[85%] max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top bar: business/personal + search + close */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-5">
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <span>{t("navBusiness")}</span>
            <span className="border-b-2 border-[#00b0f0] pb-0.5 font-semibold text-gray-800">
              {t("navPersonal")}
            </span>
          </nav>
          <div className="flex items-center gap-4 text-gray-600">
            <button
              type="button"
              aria-label={t("searchPlaceholder")}
              onClick={onSearch}
              className="hover:text-[#00b0f0]"
            >
              <SearchIcon />
            </button>
            <button type="button" aria-label={t("a11yCloseMenu")} onClick={onClose} className="hover:text-[#00b0f0]">
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Scrollable nav list */}
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col">
            {SITE_NAV_LINKS.map((link) => {
              const columns = MEGA_MENUS[link.key];

              if (!columns) {
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={onClose}
                    className="border-b border-gray-100 px-5 py-4 text-[15px] text-gray-800"
                  >
                    {t(link.key)}
                  </Link>
                );
              }

              const isOpen = openSection === link.key;
              return (
                <div key={link.key} className="border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenSection(isOpen ? null : link.key);
                      setOpenSub(null);
                    }}
                    className={`relative w-full px-5 py-4 text-left text-[15px] transition-colors ${
                      isOpen ? "bg-[#f5c518] font-bold text-gray-900" : "text-gray-800"
                    }`}
                  >
                    {t(link.key)}
                    {isOpen && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-7 -bottom-1.5 h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-[#f5c518]"
                      />
                    )}
                  </button>

                  {isOpen && (
                    <div>
                      {columns.map((col) => {
                        const subKey = `${link.key}:${col.heading}`;
                        const subOpen = openSub === subKey;
                        return (
                          <div key={col.heading}>
                            <button
                              type="button"
                              onClick={() => setOpenSub(subOpen ? null : subKey)}
                              className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-gray-800"
                            >
                              <PlusMinusCircleIcon expanded={subOpen} className="h-4 w-4 shrink-0 text-[#00b0f0]" />
                              <span className={subOpen ? "font-semibold" : ""}>{t(col.heading)}</span>
                            </button>
                            {subOpen && (
                              <ul className="pb-2">
                                {col.links.map((sub) => (
                                  <li key={sub.key}>
                                    <Link
                                      href={sub.href ?? "#"}
                                      onClick={onClose}
                                      className="block py-2 pl-14 pr-5 text-sm text-gray-600 hover:text-[#00b0f0]"
                                    >
                                      {t(sub.key)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Language + existing user */}
          <div className="space-y-5 px-5 py-6">
            <div className="flex items-center gap-2">
              <LanguageDropdown />
              <IndiaFlagIcon />
            </div>
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center gap-1 text-sm font-semibold text-gray-800"
            >
              {t("existingUser")}
              <ChevronDownIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* New user CTA */}
        <div className="shrink-0 p-5">
          <Link
            href="/register"
            onClick={onClose}
            className="mx-auto block w-fit rounded-full bg-[#f5c518] px-8 py-3 text-sm font-bold text-gray-900 hover:bg-[#e8b800]"
          >
            {t("newUser")}
          </Link>
        </div>
      </aside>
    </>
  );
}

function SiteHeader() {
  const { t } = useLanguage();
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Hysteresis: collapse only after scrolling well past the utility row,
    // and expand only once back near the top. The dead band between the two
    // thresholds stops the state from flip-flopping (which caused the jerk).
    const onScroll = () => setScrolled((prev) => (prev ? window.scrollY > 64 : window.scrollY > 160));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeMegaMenu = activeMenu && activeMenu !== "search" ? MEGA_MENUS[activeMenu] : undefined;

  return (
    <header
      className="bg-white sticky top-0 z-50 border-b-[3px] border-[#f5c518]"
      // Mega menus close when the pointer leaves the header, but search must not: it would
      // vanish mid-typing the moment the pointer drifted off. It closes on Escape / click-away.
      onMouseLeave={() => setActiveMenu((prev) => (prev === "search" ? prev : null))}
    >
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-stretch">
          {/* Shared logo + divider – stays fixed across both states */}
          <div className="flex items-center pr-6 sm:pr-8">
            <Logo />
          </div>
          <div className="hidden md:block self-stretch border-l border-gray-200 my-3" />

          {/* Mobile controls: search + hamburger */}
          <div className="flex md:hidden items-center gap-4 ml-auto h-16 text-gray-600">
            <button
              type="button"
              data-search-toggle
              aria-label={t("searchPlaceholder")}
              aria-expanded={activeMenu === "search"}
              onClick={() => setActiveMenu((prev) => (prev === "search" ? null : "search"))}
              className="hover:text-[#00b0f0]"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              aria-label={t("a11yOpenMenu")}
              onClick={() => setMobileOpen(true)}
              className="hover:text-[#00b0f0]"
            >
              <MenuIcon />
            </button>
          </div>

          {/* Everything to the right of the logo (desktop) */}
          <div className="hidden md:block flex-1 min-w-0 pl-6 sm:pl-8">
            {/* Utility strip – collapses on scroll (desktop) */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${scrolled ? "md:grid-rows-[0fr] md:opacity-0" : "grid-rows-[1fr] opacity-100"
                }`}
            >
              <div className="overflow-hidden min-h-0">
                <div className="flex items-center justify-between gap-4 h-14">
                  <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-500">
                    <span className="cursor-pointer hover:text-gray-800">{t("navBusiness")}</span>
                    <span className="text-gray-800 font-semibold border-b-2 border-[#00b0f0] pb-0.5 cursor-pointer">
                      {t("navPersonal")}
                    </span>
                  </nav>

                  <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                    <Link
                      href="/register"
                      className="bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs sm:text-sm font-bold rounded-full px-4 sm:px-5 py-2 transition-colors whitespace-nowrap"
                    >
                      {t("newUser")}
                    </Link>
                    <span className="hidden sm:block h-6 w-px bg-gray-200" />
                    <Link
                      href="/login"
                      className="bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs sm:text-sm font-bold rounded-full px-4 sm:px-5 py-2 transition-colors whitespace-nowrap hidden sm:block"
                    >
                      {t("existingUser")}
                    </Link>
                    <span className="hidden lg:block h-6 w-px bg-gray-200" />
                    <div className="hidden lg:flex items-center gap-2">
                      <IndiaFlagIcon />
                      <LanguageDropdown />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary nav row – always visible (desktop) */}
            <div className="hidden md:flex items-center justify-between">
              <nav className="flex items-center text-sm font-medium -ml-4">
                {SITE_NAV_LINKS.map((link) => {
                  const hasMenu = Boolean(MEGA_MENUS[link.key]);
                  const isActive = activeMenu === link.key;
                  return (
                    <div
                      key={link.key}
                      onMouseEnter={() => setActiveMenu(hasMenu ? link.key : null)}
                      className={`group relative h-12 flex items-center px-4 transition-colors hover:bg-[#f5c518] hover:text-gray-900 ${isActive ? "bg-[#f5c518] text-gray-900" : "text-gray-600"
                        }`}
                    >
                      {/* Grid stack: an invisible bold copy reserves the bold
                          width so toggling weight never reflows the tabs. */}
                      <Link href={link.href} className="grid place-items-center whitespace-nowrap leading-none">
                        <span
                          className={`col-start-1 row-start-1 transition-none group-hover:font-bold ${isActive ? "font-bold" : "font-semibold"
                            }`}
                        >
                          {t(link.key)}
                        </span>
                        <span aria-hidden className="col-start-1 row-start-1 font-bold invisible">
                          {t(link.key)}
                        </span>
                      </Link>
                      {isActive && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute left-1/2 -bottom-1 z-40 -translate-x-1/2 h-0 w-0 border-x-11 border-x-transparent border-b-10 border-b-white"
                        />
                      )}
                    </div>
                  );
                })}
              </nav>
              <button
                type="button"
                data-search-toggle
                aria-label={t("searchPlaceholder")}
                aria-expanded={activeMenu === "search"}
                onClick={() => setActiveMenu((prev) => (prev === "search" ? null : "search"))}
                onMouseEnter={() => setActiveMenu((prev) => (prev === "search" ? prev : null))}
                className={`h-12 w-12 flex items-center justify-center transition-colors ${activeMenu === "search" ? "bg-[#f5c518] text-gray-900" : "text-gray-500 hover:text-[#00b0f0]"
                  }`}
              >
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>

        {activeMegaMenu && (
          <div className="absolute left-0 top-[calc(100%+3px)] w-full bg-white shadow-lg z-40">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
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

        {activeMenu === "search" && <SearchPanel onClose={() => setActiveMenu(null)} />}
      </div>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSearch={() => {
          setMobileOpen(false);
          setActiveMenu("search");
        }}
      />
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
      className={`bg-white sticky top-0 z-50 ${showAccentBorder ? "border-b-[3px] border-[#f5c518]" : "border-b border-gray-200"
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
                className="rounded-full bg-[#f5c518] px-6 py-2 text-xs font-bold tracking-wide text-gray-900 uppercase transition-colors hover:bg-[#e8b800]"
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

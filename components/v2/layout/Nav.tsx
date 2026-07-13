"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useV2 } from "@/lib/v2/useV2";
import { useScrolled } from "@/lib/v2/motion";
import { V2_NAV, type NavSection } from "@/lib/v2/nav";
import { toV2 } from "@/lib/v2/routes";
import Button from "@/components/v2/ui/Button";
import LanguageSwitch from "@/components/v2/layout/LanguageSwitch";
import SearchOverlay from "@/components/v2/layout/SearchOverlay";
import MobileMenu from "@/components/v2/layout/MobileMenu";
import { ArrowRightIcon, MenuIcon, SearchIcon } from "@/components/icons";

const LOGO = "https://www.cibil.com/content/dam/cibil/content-fragments/header/cibil-logo.png";

/**
 * The CIBIL lockup is a light-background brand asset — dropped straight onto a near-black
 * canvas it would disappear. Rather than recolour someone else's trademark, it is seated on
 * a lit white plate: the asset ships untouched and legible, and the plate becomes a
 * deliberate part of the design language (see <Plate>, used for every other CIBIL artwork).
 */
function Logo() {
  return (
    <Link href={toV2("/")} className="v2-focus group flex shrink-0 items-center rounded-[var(--v2-r-sm)]">
      <span className="flex items-center rounded-[10px] bg-white px-3 py-1.5 shadow-[0_6px_24px_-8px_rgba(0,176,240,0.6)] transition-shadow duration-500 group-hover:shadow-[0_10px_36px_-8px_rgba(0,176,240,0.9)]">
        <Image
          src={LOGO}
          alt="CIBIL - Part of TransUnion"
          width={182}
          height={82}
          priority
          unoptimized
          className="h-7 w-auto sm:h-8"
        />
      </span>
    </Link>
  );
}

function MegaPanel({ section, onNavigate }: { section: NavSection; onNavigate: () => void }) {
  const { t } = useV2();
  if (!section.columns) return null;

  return (
    <div
      className="v2-panel-in absolute inset-x-0 top-full origin-top"
      // The panel is a hover target too: without the padding bridge, the pointer crosses a
      // dead gap between the tab and the panel and the menu closes under the cursor.
      onMouseEnter={() => undefined}
    >
      <div className="mx-auto max-w-[1440px] px-[var(--v2-gutter)] pt-3">
        {/* v2-panel (opaque), not v2-glass: this floats over the hero, and the header's own
            backdrop-blur makes a child's backdrop-filter a no-op — see v2.css. */}
        <div className="v2-panel v2-rim v2-noise relative overflow-hidden rounded-[var(--v2-r-lg)] shadow-[var(--v2-shadow-3)]">
          <div className="relative grid gap-10 p-8 lg:grid-cols-[1fr_auto] lg:p-10">
            <div
              className="grid gap-10"
              style={{ gridTemplateColumns: `repeat(${section.columns.length}, minmax(0, 1fr))` }}
            >
              {section.columns.map((column) => (
                <div key={column.heading}>
                  <p className="v2-eyebrow mb-6 text-[var(--v2-text-3)]">{t(column.heading)}</p>
                  <ul className="space-y-1">
                    {column.links.map((link) => (
                      <li key={`${column.heading}-${link.key}`}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className="v2-focus group/link block rounded-[var(--v2-r-sm)] px-3 py-2.5 transition-colors duration-300 hover:bg-[rgba(0,176,240,0.08)]"
                        >
                          <span className="flex items-center gap-2 text-sm font-bold text-[var(--v2-text)] transition-colors group-hover/link:text-[var(--v2-cyan)]">
                            {t(link.key)}
                            <ArrowRightIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                          </span>
                          {link.descKey && (
                            <span className="mt-0.5 block text-xs leading-relaxed text-[var(--v2-text-3)]">
                              {t(link.descKey)}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {section.feature && (
              <Link
                href={section.feature.href}
                onClick={onNavigate}
                className="v2-focus group/feat relative hidden w-72 shrink-0 overflow-hidden rounded-[var(--v2-r-md)] border border-[var(--v2-line)] bg-linear-to-b from-[#0a3a52] to-[#0f5773] p-6 lg:block"
              >
                <p className="v2-eyebrow text-[var(--v2-cyan-soft)]">{t(section.feature.ctaKey)}</p>
                <p className="mt-4 text-lg font-bold leading-snug text-white">{t(section.feature.titleKey)}</p>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/65">
                  {t(section.feature.bodyKey)}
                </p>
                <Image
                  src={section.feature.image}
                  alt=""
                  aria-hidden
                  width={288}
                  height={180}
                  unoptimized
                  className="pointer-events-none mt-6 h-32 w-full select-none object-contain object-bottom transition-transform duration-700 ease-[var(--v2-ease)] group-hover/feat:scale-105"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Nav() {
  const { t, tv } = useV2();
  const pathname = usePathname();
  const scrolled = useScrolled(20);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Any route change closes whatever is open — otherwise the mega panel survives the
  // navigation it just triggered and hangs over the new page.
  //
  // Adjusted during render rather than in an effect: an effect would paint the new page once
  // with the old menu still open, and setState in an effect body cascades a second render
  // (react-hooks/set-state-in-effect). React re-runs this component immediately on the state
  // change below, before touching the DOM, so the panel is simply never painted open.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenSection(null);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setOpenSection(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const active = V2_NAV.find((section) => section.key === openSection);

  return (
    <>
      <a
        href="#v2-main"
        className="sr-only rounded-full bg-[var(--v2-cyan)] px-5 py-2 text-sm font-bold text-[#04202c] focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[120]"
      >
        {tv("v2SkipToContent")}
      </a>

      <header
        onMouseLeave={() => setOpenSection(null)}
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--v2-ease)] ${
          scrolled || openSection
            ? "border-b border-[var(--v2-line)] bg-[rgba(5,7,13,0.72)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label={tv("v2MainNavLabel")}
          className="mx-auto flex h-20 max-w-[1440px] items-center gap-6 px-[var(--v2-gutter)]"
        >
          <Logo />

          <ul className="ml-4 hidden items-center gap-1 lg:flex">
            {V2_NAV.map((section) => {
              const isOpen = openSection === section.key;
              return (
                <li key={section.key} onMouseEnter={() => setOpenSection(section.columns ? section.key : null)}>
                  <Link
                    href={section.href}
                    aria-expanded={section.columns ? isOpen : undefined}
                    onFocus={() => setOpenSection(section.columns ? section.key : null)}
                    className={`v2-focus relative flex h-20 items-center px-4 text-sm font-bold transition-colors duration-300 ${
                      isOpen ? "text-[var(--v2-cyan)]" : "text-[var(--v2-text-2)] hover:text-[var(--v2-text)]"
                    }`}
                  >
                    {t(section.key)}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 bottom-0 h-px bg-[var(--v2-cyan)] shadow-[0_0_12px_rgba(0,176,240,0.9)] transition-transform duration-500 ease-[var(--v2-ease)] ${
                        isOpen ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t("searchPlaceholder")}
              className="v2-focus flex h-10 w-10 items-center justify-center rounded-full border border-[var(--v2-line)] text-[var(--v2-text-2)] transition-colors duration-300 hover:border-[rgba(0,176,240,0.45)] hover:text-[var(--v2-cyan)]"
            >
              <SearchIcon className="h-4 w-4" />
            </button>

            <div className="hidden xl:block">
              <LanguageSwitch compact />
            </div>

            <Link
              href={toV2("/login")}
              className="v2-focus hidden rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--v2-text-2)] transition-colors duration-300 hover:text-[var(--v2-text)] md:block"
            >
              {t("existingUser")}
            </Link>

            <Button href={toV2("/register")} size="sm" magnetic className="hidden sm:inline-flex">
              {t("newUser")}
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("a11yOpenMenu")}
              className="v2-focus flex h-10 w-10 items-center justify-center rounded-full border border-[var(--v2-line)] text-[var(--v2-text-2)] transition-colors hover:text-[var(--v2-text)] lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {active && <MegaPanel section={active} onNavigate={() => setOpenSection(null)} />}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onSearch={() => setSearchOpen(true)} />
    </>
  );
}

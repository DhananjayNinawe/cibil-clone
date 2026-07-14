"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/v4/ui/Logo";
import Launcher from "./Launcher";
import LanguageSwitch from "./LanguageSwitch";
import { ButtonLink } from "@/components/v4/ui/Button";
import { ApertureIcon } from "@/components/v4/ui/Icons";
import { useScrolled } from "@/lib/v4/motion";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The header.
 *
 * Deliberately almost empty. V1 and V2 both carry a utility strip, five mega-menu triggers, a
 * search box and two CTAs across the top of every page — a control panel the reader has to parse
 * before they can read the page under it. V4 carries four things: the mark, the way in, the way to
 * change language, and the one action the whole site is for.
 *
 * Everything else lives one click deep in the Launcher, which is not a demotion: it is the entire
 * site, laid out at once, instead of five hover menus that each show a fifth of it.
 *
 * On scroll the bar settles onto a hairline and picks up its shadow. That is the only thing it does
 * — it does not shrink, collapse a strip, or hide itself. A header that moves while you read is a
 * header competing with the page.
 */
export default function Header() {
  const { t, t4 } = useV4();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const pathname = usePathname();

  /**
   * Any navigation closes the Launcher — without this, following a link leaves the overlay sitting
   * over the new page, apparently broken.
   *
   * Adjusted during render against the previous pathname rather than in an effect. Setting state
   * inside `useEffect` would render the stale open overlay once, then immediately re-render to close
   * it — a visible flash of the wrong UI, and the cascading-render pattern the React Compiler's
   * `set-state-in-effect` rule exists to catch. React explicitly supports this shape ("adjusting
   * state when a prop changes"): the extra render happens *before* the browser paints.
   */
  const [pathAtRender, setPathAtRender] = useState(pathname);
  if (pathname !== pathAtRender) {
    setPathAtRender(pathname);
    setOpen(false);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b bg-[color-mix(in_srgb,var(--v4-plane)_86%,transparent)] backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-[var(--v4-edge)] shadow-[var(--v4-shadow-1)]"
            : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[var(--v4-max-wide)] items-center gap-3 px-[var(--v4-gutter)] sm:h-[76px]">
          <Logo />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-label={t4("v4OpenExplore")}
            className="v4-btn v4-btn-secondary v4-btn-sm ml-1 sm:ml-4"
          >
            <ApertureIcon size={17} />
            <span>{t4("v4Explore")}</span>
          </button>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
            <LanguageSwitch />

            <ButtonLink href={toV4("/login")} variant="ghost" size="sm">
              {t("login")}
            </ButtonLink>

            {/* The CTA, from `sm` up only.
             *
             * On a phone the bar was carrying five things — mark, Explore, language, Login and this
             * — and the fifth is the one to lose, because it is the only one that is *duplicated*:
             * the hero's own "Get your free CIBIL Score & Report" button sits a thumb's width below
             * it, and the Launcher lists the same destination as its first task. A header that
             * competes with the page's own call to action does not double the conversion; it just
             * leaves no room for the navigation.
             *
             * Both labels are V1's own copy. The short one is a *different existing string*, not a
             * truncation — "Become credit ready today!" cut to fit is not a call to action, it is a
             * fragment.
             *
             * `v4-btn-sm-up`, not Tailwind's `hidden sm:inline-flex`: a Tailwind display utility
             * cannot override `.v4-btn`, because utilities are layered and v4.css is not. See the
             * note beside the class in v4.css. */}
            <ButtonLink href={toV4("/freecibilscore")} size="sm" className="v4-btn-sm-up">
              <span className="hidden md:inline">{t("heroBecomeReady")}</span>
              <span className="md:hidden">{t("megaFreeCibilScore")}</span>
            </ButtonLink>
          </div>
        </div>
      </header>

      {/* Mounted only while open, so its query and highlighted row are discarded on close by
          unmounting rather than by an effect that resets them. A Launcher that reopens still holding
          last week's query shows you a filtered site with no explanation of why. */}
      {open ? <Launcher onClose={() => setOpen(false)} /> : null}
    </>
  );
}

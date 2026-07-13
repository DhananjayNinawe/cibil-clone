"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { V2_NAV } from "@/lib/v2/nav";
import { toV2 } from "@/lib/v2/routes";
import Button from "@/components/v2/ui/Button";
import LanguageSwitch from "@/components/v2/layout/LanguageSwitch";
import { CloseIcon, PlusMinusCircleIcon, SearchIcon } from "@/components/icons";

/**
 * Full-screen mobile navigation.
 *
 * Kept mounted (rather than unmounted when closed) so it can transition out; while closed it
 * is `inert`, which removes it from the tab order and the accessibility tree in one attribute —
 * a `hidden`-less drawer that is still focusable is the classic mobile-menu a11y bug.
 */
export default function MobileMenu({
  open,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  const { t, tv } = useV2();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      inert={!open ? true : undefined}
      // overflow-hidden matters: while closed, the drawer is parked off-screen at
      // translate-x-full, and without clipping here that parked panel widens the document
      // and the phone gets a horizontal scrollbar on every page.
      className={`fixed inset-0 z-[80] overflow-hidden lg:hidden ${open ? "" : "pointer-events-none"}`}
    >
      <div
        aria-hidden
        onClick={onClose}
        className={`absolute inset-0 bg-[rgba(3,5,10,0.8)] backdrop-blur-lg transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        aria-label={tv("v2MainNavLabel")}
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-[var(--v2-line)] bg-[var(--v2-bg-2)] shadow-[var(--v2-shadow-3)] transition-transform duration-500 ease-[var(--v2-ease)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-[var(--v2-line)] px-6">
          <LanguageSwitch />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSearch();
              }}
              aria-label={t("searchPlaceholder")}
              className="v2-focus flex h-10 w-10 items-center justify-center rounded-full border border-[var(--v2-line)] text-[var(--v2-text-2)]"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("a11yCloseMenu")}
              className="v2-focus flex h-10 w-10 items-center justify-center rounded-full border border-[var(--v2-line)] text-[var(--v2-text-2)]"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          <ul className="space-y-1">
            {V2_NAV.map((section, index) => {
              const isOpen = expanded === section.key;
              return (
                <li
                  key={section.key}
                  className="border-b border-[var(--v2-line)] last:border-0"
                  // Links cascade in behind the drawer as it slides — the drawer itself is
                  // the transform, this is just the stagger riding on top of it.
                  style={{
                    transitionDelay: open ? `${120 + index * 45}ms` : "0ms",
                    transform: open ? "none" : "translateX(24px)",
                    opacity: open ? 1 : 0,
                    transition: "transform 500ms var(--v2-ease), opacity 500ms var(--v2-ease)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={section.href}
                      onClick={onClose}
                      className="v2-focus flex-1 py-5 text-lg font-bold text-[var(--v2-text)]"
                    >
                      {t(section.key)}
                    </Link>
                    {section.columns && (
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : section.key)}
                        aria-expanded={isOpen}
                        aria-label={t(section.key)}
                        className="v2-focus p-3"
                      >
                        <PlusMinusCircleIcon expanded={isOpen} className="h-5 w-5 text-[var(--v2-cyan)]" />
                      </button>
                    )}
                  </div>

                  {section.columns && (
                    <div
                      className="grid transition-[grid-template-rows] duration-500 ease-[var(--v2-ease)]"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-6 pb-6">
                          {section.columns.map((column) => (
                            <div key={column.heading}>
                              <p className="v2-eyebrow mb-3 text-[var(--v2-text-3)]">{t(column.heading)}</p>
                              <ul className="space-y-2.5">
                                {column.links.map((link) => (
                                  <li key={`${column.heading}-${link.key}`}>
                                    <Link
                                      href={link.href}
                                      onClick={onClose}
                                      className="v2-focus block text-sm text-[var(--v2-text-2)] transition-colors hover:text-[var(--v2-cyan)]"
                                    >
                                      {t(link.key)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="shrink-0 space-y-3 border-t border-[var(--v2-line)] p-6">
          <Button href={toV2("/register")} full size="lg" arrow onClick={onClose}>
            {t("newUser")}
          </Button>
          <Button href={toV2("/login")} full size="lg" variant="secondary" onClick={onClose}>
            {t("existingUser")}
          </Button>
        </div>
      </aside>
    </div>
  );
}

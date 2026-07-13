"use client";

import { useEffect, useRef, useState } from "react";

/**
 * V4's motion primitives — the "focus" vocabulary.
 *
 * Each version of this site moves differently on purpose. V2 moves like light: things glow,
 * drift, and pull toward the cursor. V3 moves like print being set: a rule is drawn, a line of
 * type is uncovered. V4 moves like an instrument coming into focus — an element resolves
 * (settles the last 8px, firms up from 98% scale), a plotted line draws itself along its own
 * path, a figure ticks up to its reading. Nothing loops, nothing glows, and nothing chases the
 * pointer; a credit bureau that fidgets is a credit bureau you do not trust.
 *
 * Four rules hold across all of them:
 *   1. Nothing animates that the OS asked to stay still (`prefers-reduced-motion`).
 *   2. Scroll work is batched into one rAF frame — never a layout read per scroll event.
 *   3. Every observer, listener and frame is torn down on unmount.
 *   4. Motion never gates content: the element's final state is what SSR renders, and the
 *      animation is subtraction from it. A reader with JS off sees the finished page.
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Reactive version — components that branch on motion re-render if the OS setting flips. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return reduced;
}

export interface InViewOptions {
  /** Fire once and stop observing (the default — re-animating on every pass is noise). */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Adds `is-focused` to the element once it enters the viewport — the hook every V4 reveal hangs
 * off. Under reduced motion the class lands immediately, so the content is simply there.
 *
 * The class is written straight to the DOM node rather than through React state because the
 * common case (a section of static prose revealing) does not otherwise need to re-render, and
 * a `setState` per section on scroll is a re-render per section on scroll. `inView` is returned
 * as well for the handful of components that genuinely need to branch in JS (the charts).
 */
export function useInView<T extends HTMLElement>({
  once = true,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.12,
}: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-focused");
      // Deferred a frame rather than set synchronously: a setState in an effect body re-renders
      // every consumer before the browser has painted once. Nothing is animating on this path
      // anyway — the class above already put the element in its final state.
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-focused");
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-focused");
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}

/**
 * A figure ticking up to its reading.
 *
 * Eased rather than linear, and it holds the digit count steady from the first frame: a number
 * that grows from "0" to "183" also grows *wider*, and a widening number shoves the label beside
 * it around. Every caller pairs this with `.v4-num` (tabular figures) for the same reason.
 *
 * `format` is passed in rather than assumed, because the figures on this site are not all plain
 * integers — "46%", "₹1,200", "183" — and the ticking version has to wear the same shape as the
 * final one or the layout jumps on the last frame.
 */
export function useTick(
  value: number,
  { duration = 1200, format = (n: number) => String(Math.round(n)) }: {
    duration?: number;
    format?: (n: number) => string;
  } = {},
) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(() => format(0));

  useEffect(() => {
    if (!inView) return;

    let raf = 0;

    if (prefersReducedMotion()) {
      raf = requestAnimationFrame(() => setDisplay(format(value)));
      return () => cancelAnimationFrame(raf);
    }

    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // easeOutQuint — arrives at its reading rather than stopping at it.
      const eased = 1 - Math.pow(1 - t, 5);
      setDisplay(format(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(format(value));
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // `format` is a caller-defined closure; depending on it would restart the tick on every
    // parent render. The value it formats is what matters, and that is in the list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration]);

  return { ref, display };
}

/** True once the page has scrolled past `offset` — settles the header onto its hairline. */
export function useScrolled(offset = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const apply = () => {
      ticking = false;
      setScrolled(window.scrollY > offset);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

/**
 * Which section id is currently being read — powers the sticky rail on long documents.
 *
 * Note the rootMargin: the detection band is a thin slice a third of the way down the viewport,
 * so the active entry is the one the reader's eye is actually on, not merely the topmost one
 * still intersecting — which stays "active" for a whole screenful after you have scrolled past it.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  // The array is rebuilt on every render by most callers; keying the effect on its contents
  // rather than its identity is what stops the observer being torn down and rebuilt each time.
  const key = ids.join("|");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (list.length === 0) return;

    const elements = list
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-25% 0px -68% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [key]);

  return active;
}

/** Locks body scroll while the Launcher is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPad = body.style.paddingRight;
    // Compensating for the scrollbar's width stops the whole page shifting right as it vanishes.
    const gap = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPad;
    };
  }, [locked]);
}

/**
 * Traps Tab inside an open overlay and restores focus to whatever opened it.
 *
 * WCAG 2.2 requires that a modal surface does not leak the tab ring back to the page behind it,
 * and — the half everyone forgets — that closing it returns focus to the trigger, so a keyboard
 * reader is not dumped at the top of the document.
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const restoreTo = document.activeElement as HTMLElement | null;
    const SELECTOR =
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(SELECTOR)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || !container.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreTo?.focus?.();
    };
  }, [active]);

  return ref;
}

/**
 * Closes an overlay on Escape. Split out from the trap because some surfaces (the Launcher)
 * want Escape without a trap while they are still animating open.
 */
export function useEscape(active: boolean, onEscape: () => void) {
  /**
   * The callback is held in a ref and refreshed in an effect — never written during render, which
   * React forbids (a render must be pure, and a ref write is a side effect that a re-render or a
   * discarded concurrent render would double-apply).
   *
   * The indirection earns its keep: callers pass an inline arrow (`() => setOpen(false)`), whose
   * identity changes every render. Depending on it directly would tear down and re-attach the
   * keydown listener on every keystroke the reader types into the Launcher.
   */
  const handler = useRef(onEscape);

  useEffect(() => {
    handler.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler.current();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active]);
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * V3's motion primitives.
 *
 * The vocabulary is deliberately narrow, and deliberately not V2's. V2 moves like light —
 * things glow, drift, and pull toward the cursor. V3 moves like print being set: a rule is
 * drawn, a line of type is uncovered, a figure settles on its number. Nothing floats, nothing
 * chases the pointer, nothing loops forever.
 *
 * Three rules hold across all of them:
 *   1. Nothing animates that the OS asked to stay still (`prefers-reduced-motion`).
 *   2. Scroll work is batched into a single rAF frame — never a layout read per scroll event.
 *   3. Every observer and listener is torn down on unmount.
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
 * Adds `is-set` to the element once it enters the viewport — the hook every V3 reveal hangs
 * off. ("Set", as in type that has been set.) Under reduced motion the class lands immediately,
 * so the content is simply there.
 */
export function useInView<T extends HTMLElement>({
  once = true,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.1,
}: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-set");
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
            entry.target.classList.add("is-set");
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-set");
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
 * The figure settles on its number.
 *
 * Eased, not linear, and — unlike a generic count-up — it holds the digit count steady from the
 * first frame, because a number that grows from "0" to "183" also grows *wider*, and a widening
 * number shoves the rule and the label beside it around. Callers pair this with `tabular-nums`.
 */
export function useTally(value: number, duration = 1400) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf = 0;
    let start = 0;

    if (prefersReducedMotion()) {
      raf = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(raf);
    }

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic — arrives rather than stops
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return { ref, display };
}

/** 0 → 1 for how far the document has been scrolled. Drives the reading rule in the masthead. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const apply = () => {
      ticking = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

/** True once the page has scrolled past `offset` — used to settle the masthead onto its rule. */
export function useScrolled(offset = 16): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

/**
 * Which section id is currently being read.
 *
 * Powers the margin rail (V3's "Contents"). Note the rootMargin: the band is a thin slice a
 * third of the way down the viewport, so the active entry is the one the reader's eye is
 * actually on — not merely the topmost one intersecting, which stays "active" for a whole
 * screenful after you have scrolled past it.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/**
 * A slow vertical drift for artwork held inside a fixed frame — the image moves, its window
 * does not. This is V3's only parallax, and it is a *masking* effect rather than a depth
 * effect: the frame crops, the plate breathes behind it.
 */
export function usePlateDrift<T extends HTMLElement>(distance = 24) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let ticking = false;

    const apply = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      // -1 → 1 across the element's travel through the viewport.
      const centre = rect.top + rect.height / 2;
      const ratio = (centre - window.innerHeight / 2) / (window.innerHeight / 2 + rect.height / 2);
      el.style.transform = `translate3d(0, ${(ratio * distance).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [distance]);

  return ref;
}

/** Locks body scroll while a full-screen overlay (the index, the search palette) is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const previous = body.style.overflow;
    // Compensating for the scrollbar's width stops the whole page shifting left as it vanishes.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const previousPad = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = previous;
      body.style.paddingRight = previousPad;
    };
  }, [locked]);
}

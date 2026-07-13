"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * V2's motion primitives.
 *
 * Three rules hold across all of them:
 *   1. Nothing animates that the OS asked to stay still (`prefers-reduced-motion`).
 *   2. Scroll and pointer work is batched into a single rAF frame — never one listener
 *      per component doing layout reads on every event.
 *   3. Every observer/listener is torn down on unmount.
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Reactive version — components that branch on motion need to re-render if the OS setting flips. */
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
  /** Viewport margin; the default pulls the trigger up so motion starts before the edge. */
  rootMargin?: string;
  threshold?: number;
}

/**
 * Adds `is-in` to the element once it enters the viewport. Returns the ref to attach.
 * Under reduced motion the class is applied immediately, so the content is simply there.
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
      el.classList.add("is-in");
      // Deferred by a frame rather than set synchronously here: a setState in an effect body
      // re-renders every consumer before the browser has painted once (react-hooks/
      // set-state-in-effect). Nothing is animating on this path anyway — the class above has
      // already put the element in its final state — so a frame's delay is invisible.
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-in");
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
 * Writes the pointer position into `--mx` / `--my` on the element, which `.v2-spotlight`
 * turns into a specular highlight. Coordinates are only read on pointer move over the
 * element itself, so there is no global listener.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
}

/**
 * Magnetic pull toward the cursor. Deliberately capped: past ~14px the control stops
 * feeling responsive and starts feeling broken, and a button that dodges the pointer is
 * a usability bug, not a delight.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28, max = 14) {
  const ref = useRef<T>(null);
  const frame = useRef(0);

  const reset = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      const el = ref.current;
      // Coarse pointers have no hover: the "magnet" would only ever fire on tap, which
      // reads as the button jumping away from the finger.
      if (!el || prefersReducedMotion() || event.pointerType !== "mouse") return;

      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const x = Math.max(-max, Math.min(max, dx * strength));
      const y = Math.max(-max, Math.min(max, dy * strength));

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    },
    [strength, max],
  );

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return { ref, onPointerMove, onPointerLeave: reset, onBlur: reset };
}

/**
 * Translates the element against the scroll direction. `speed` is a fraction of the
 * distance scrolled while the element is on screen: negative drifts up, positive down.
 */
export function useParallax<T extends HTMLElement>(speed = 0.12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let ticking = false;

    const apply = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      // Skip the maths entirely while off screen.
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      // Distance of the element's centre from the viewport's centre.
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(2)}px, 0)`;
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
  }, [speed]);

  return ref;
}

/** 0 → 1 for how far the document has been scrolled. Drives the reading-progress rail. */
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

/** True once the page has scrolled past `offset` — used to condense the header. */
export function useScrolled(offset = 24): boolean {
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
 * Counts up to `value` once the element is in view. Eased, not linear — a linear counter
 * looks mechanical; this one arrives.
 */
export function useCountUp(value: number, duration = 1600) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf = 0;
    let start = 0;

    if (prefersReducedMotion()) {
      // Same reason as useInView: scheduled, not set synchronously in the effect body. The
      // number lands on its final value on the next frame instead of counting up.
      raf = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(raf);
    }

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return { ref, display };
}

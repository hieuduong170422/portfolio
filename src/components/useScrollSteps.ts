"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_WIDTH_QUERY = "(min-width: 701px)";
/** Space above the pinned card: header plus project tabs. Keep in sync with `--pin-top` in AppShowcase.module.css. */
const TABS_OFFSET = 76;
/** Vertical padding of the pinned layout. */
const PIN_PADDING = 32;

/** Pin only when the tallest pinned element fits under the header; otherwise keep normal scrolling. */
function cardFits(track: HTMLElement) {
  const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;
  const available = window.innerHeight - header - TABS_OFFSET - PIN_PADDING;
  const content = track.querySelector<HTMLElement>("[data-pin-content]");
  return Boolean(content) && (content?.offsetHeight ?? 0) <= available;
}

/**
 * Scroll-driven steps: while the track scrolls past its pinned child,
 * progress through the track picks the current step.
 */
export function useScrollSteps({ enabled, count, onStep }: {
  enabled: boolean;
  count: number;
  onStep: (index: number) => void;
}) {
  const trackRef = useRef<HTMLElement>(null);
  const [scrollMode, setScrollMode] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const query = window.matchMedia(MIN_WIDTH_QUERY);
    let frame = 0;
    function update() {
      frame = 0;
      const track = trackRef.current;
      setScrollMode(query.matches && Boolean(track) && cardFits(track as HTMLElement));
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled]);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const pinned = track?.firstElementChild as HTMLElement | null;
    if (!track || !pinned) return null;
    const pinTop = parseFloat(getComputedStyle(pinned).top) || 0;
    const range = track.offsetHeight - pinned.offsetHeight;
    return { pinTop, range, top: track.getBoundingClientRect().top + window.scrollY };
  }, []);

  useEffect(() => {
    if (!scrollMode || count < 1) return;
    let frame = 0;
    let last = -1;
    function update() {
      frame = 0;
      const box = measure();
      if (!box || box.range <= 0) return;
      const progress = (window.scrollY + box.pinTop - box.top) / box.range;
      const index = Math.max(0, Math.min(count - 1, Math.floor(progress * count)));
      // Only report changes, so timed effects (e.g. the scan demo) are not reset mid-step.
      if (index !== last) {
        last = index;
        onStep(index);
      }
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollMode, count, onStep, measure]);

  /** Scroll the page to the middle of a step's segment so clicks and scrolling agree. */
  const scrollToStep = useCallback((index: number) => {
    const box = measure();
    if (!box) return;
    const target = box.top - box.pinTop + ((index + 0.5) / count) * box.range;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  }, [count, measure]);

  return { trackRef, scrollMode, scrollToStep };
}

"use client";

import { useEffect, useRef } from "react";

/** Wheel distance (px) that counts as one step, so a light trackpad touch does not skip screens. */
const STEP_THRESHOLD = 60;
/** Ignore further wheel input after a step while trackpad inertia winds down. */
const STEP_LOCK_MS = 520;
/** Forget a partial gesture after a pause. */
const GESTURE_RESET_MS = 180;
const LINE_HEIGHT = 16;

/** True when an element between the target and the stage can still scroll in that direction. */
function scrollsInside(target: EventTarget | null, stage: HTMLElement, deltaY: number) {
  let node = target instanceof HTMLElement ? target : null;
  while (node && node !== stage) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight + 1) {
      if (deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1) return true;
      if (deltaY < 0 && node.scrollTop > 0) return true;
    }
    node = node.parentElement;
  }
  return false;
}

/**
 * Wheel over the phone stage steps through screens; anywhere else the page scrolls as usual.
 * At the first or last screen the wheel falls through to the page, so visitors are never trapped.
 */
export function useWheelSteps({ count, selected, onStep }: {
  count: number;
  selected: number;
  onStep: (index: number) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const latest = useRef({ count, selected, onStep });

  useEffect(() => {
    latest.current = { count, selected, onStep };
  }, [count, selected, onStep]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let accumulated = 0;
    let lockedUntil = 0;
    let resetTimer = 0;

    function handleWheel(event: WheelEvent) {
      // Pinch-zoom and horizontal swipes (e.g. the widget stack) keep their native behaviour.
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const now = performance.now();
      if (now < lockedUntil) {
        event.preventDefault();
        return;
      }
      if (scrollsInside(event.target, stage as HTMLElement, event.deltaY)) return;
      const { count: total, selected: current, onStep: step } = latest.current;
      const direction = Math.sign(event.deltaY);
      const next = current + direction;
      if (!direction || next < 0 || next >= total) return;
      event.preventDefault();
      accumulated += event.deltaMode === WheelEvent.DOM_DELTA_LINE ? event.deltaY * LINE_HEIGHT : event.deltaY;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => { accumulated = 0; }, GESTURE_RESET_MS);
      if (Math.abs(accumulated) < STEP_THRESHOLD) return;
      accumulated = 0;
      lockedUntil = now + STEP_LOCK_MS;
      step(next);
    }

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.clearTimeout(resetTimer);
      stage.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return stageRef;
}

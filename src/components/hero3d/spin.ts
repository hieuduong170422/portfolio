"use client";

import { useRef, type PointerEvent, type RefObject, type SyntheticEvent } from "react";

// Kept free of three.js so Hero can import it without pulling the 3D chunk.

/** Per-phone spin, written by drag handlers and read every frame by the 3D scene. */
export type Spin = { yaw: number; pitch: number; velocity: number; dragging: boolean; releasedAt: number };
export type SpinStore = Map<string, Spin>;

export function getSpin(store: SpinStore, slug: string): Spin {
  let spin = store.get(slug);
  if (!spin) {
    spin = { yaw: 0, pitch: 0, velocity: 0, dragging: false, releasedAt: -Infinity };
    store.set(slug, spin);
  }
  return spin;
}

/** Radians per dragged pixel: about 520px for a full turn. */
const SENSITIVITY = 0.012;
const PITCH_LIMIT = 0.6;
/** Below this distance a press is still a click on the link. */
const DRAG_THRESHOLD = 6;

type Drag = { slug: string; pointerId: number; startX: number; startY: number; x: number; y: number; time: number; moved: boolean };

/**
 * Pointer handlers for the hero phone links: a drag spins the phone in 360°,
 * a plain click still follows the link.
 */
export function useSpinDrag(store: RefObject<SpinStore>, enabled: boolean) {
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);

  function end(event: PointerEvent<HTMLElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    drag.current = null;
    if (!current.moved) return;
    const spin = getSpin(store.current, current.slug);
    spin.dragging = false;
    spin.releasedAt = performance.now();
    // Swallow only the click that ends this drag. Touch sends none after a move, so a
    // lingering flag would eat the next keyboard or screen-reader activation.
    suppressClick.current = true;
    window.setTimeout(() => { suppressClick.current = false; }, 0);
  }

  return (slug: string) => ({
    onPointerDown(event: PointerEvent<HTMLElement>) {
      suppressClick.current = false;
      if (!enabled || (event.pointerType === "mouse" && event.button !== 0)) return;
      // One drag at a time: a second finger must not orphan the phone already spinning.
      if (drag.current?.moved) return;
      const { clientX: x, clientY: y, pointerId } = event;
      drag.current = { slug, pointerId, startX: x, startY: y, x, y, time: event.timeStamp, moved: false };
    },
    onPointerMove(event: PointerEvent<HTMLElement>) {
      const current = drag.current;
      if (!current || current.pointerId !== event.pointerId) return;
      // The button was released somewhere we never heard about (e.g. outside the link).
      if (event.buttons === 0) {
        end(event);
        return;
      }
      if (!current.moved) {
        if (Math.hypot(event.clientX - current.startX, event.clientY - current.startY) < DRAG_THRESHOLD) return;
        current.moved = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        getSpin(store.current, slug).dragging = true;
      }
      const spin = getSpin(store.current, slug);
      const dx = (event.clientX - current.x) * SENSITIVITY;
      const dy = (event.clientY - current.y) * SENSITIVITY;
      const seconds = Math.max((event.timeStamp - current.time) / 1000, 1 / 240);
      spin.yaw += dx;
      spin.pitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, spin.pitch + dy * 0.5));
      spin.velocity = spin.velocity * 0.6 + (dx / seconds) * 0.4;
      Object.assign(current, { x: event.clientX, y: event.clientY, time: event.timeStamp });
    },
    onPointerUp: end,
    onPointerCancel: end,
    onLostPointerCapture: end,
    onClickCapture(event: SyntheticEvent) {
      if (!suppressClick.current) return;
      suppressClick.current = false;
      event.preventDefault();
    },
    onDragStart(event: SyntheticEvent) {
      // Stop the browser from dragging the link URL instead of the phone.
      event.preventDefault();
    },
  });
}

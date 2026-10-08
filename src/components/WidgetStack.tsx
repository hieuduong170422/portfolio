"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Hand } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { formatMessage } from "@/lib/i18n/messages";
import type { SurfaceWidget } from "@/lib/surfaces";
import styles from "./WidgetsScreen.module.css";

/** Share of the widget width a mouse drag must cover to move to the neighbour. */
const SWIPE_THRESHOLD = 0.18;
/** Keep snapping off until the programmatic smooth scroll has settled. */
const SNAP_RESTORE_MS = 380;
/** Peek at the next widget once after mount, so the stack reads as swipeable. */
const PEEK_DELAY_MS = 700;
const PEEK_HOLD_MS = 420;
const PEEK_SHARE = 0.22;

/** One home-screen widget slot that swipes between widgets, like a stack on iOS. */
export function WidgetStack({ appName, widgets, sizes }: { appName: string; widgets: SurfaceWidget[]; sizes: string }) {
  const { t } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; left: number } | null>(null);
  const snapTimer = useRef(0);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [explored, setExplored] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => () => window.clearTimeout(snapTimer.current), []);

  useEffect(() => {
    if (reducedMotion) return;
    const peek = (left: number) => {
      const track = trackRef.current;
      if (!track || dragRef.current) return;
      track.scrollTo({ left: left * track.clientWidth, behavior: "smooth" });
    };
    const timers = [
      window.setTimeout(() => { setDragging(true); peek(PEEK_SHARE); }, PEEK_DELAY_MS),
      window.setTimeout(() => peek(0), PEEK_DELAY_MS + PEEK_HOLD_MS),
      window.setTimeout(() => { if (!dragRef.current) setDragging(false); }, PEEK_DELAY_MS + PEEK_HOLD_MS + SNAP_RESTORE_MS),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion]);

  function goTo(target: number) {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(widgets.length - 1, target));
    if (next !== index) setExplored(true);
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track?.clientWidth) return;
    const next = Math.round(track.scrollLeft / track.clientWidth);
    if (next !== index) setExplored(true);
    setIndex(next);
  }

  // Touch and trackpads scroll natively; a mouse needs drag-to-swipe to feel the same.
  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    window.clearTimeout(snapTimer.current);
    dragRef.current = { x: event.clientX, left: event.currentTarget.scrollLeft };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    event.currentTarget.scrollLeft = drag.left - (event.clientX - drag.x);
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const width = event.currentTarget.clientWidth;
    if (!drag || !width) return;
    dragRef.current = null;
    const moved = (drag.x - event.clientX) / width;
    const step = moved > SWIPE_THRESHOLD ? 1 : moved < -SWIPE_THRESHOLD ? -1 : 0;
    goTo(Math.round(drag.left / width) + step);
    snapTimer.current = window.setTimeout(() => setDragging(false), SNAP_RESTORE_MS);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(index + (event.key === "ArrowRight" ? 1 : -1));
  }

  return (
    <div className={styles.stack} role="group" aria-roledescription="carousel"
      aria-label={formatMessage(t.preview.widgetStack, { name: appName })}>
      <div ref={trackRef} className={styles.track} data-dragging={dragging} tabIndex={0}
        onScroll={handleScroll} onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd}>
        {widgets.map((widget, i) => (
          <div key={widget.id} className={styles.slide} role="group" aria-roledescription="slide"
            aria-label={formatMessage(t.preview.widgetPosition, { current: i + 1, total: widgets.length })}>
            <Image src={widget.src} width={widget.width} height={widget.height} sizes={sizes}
              alt={`${appName} ${widget.title}`} className={styles.widget} draggable={false} />
          </div>
        ))}
      </div>
      {!explored && (
        <p className={styles.swipeHint} aria-hidden="true">
          <Hand aria-hidden="true" /><span>{t.preview.swipeWidgets}</span>
        </p>
      )}
      <div className={styles.dots}>
        {widgets.map((widget, i) => (
          <button key={widget.id} type="button" aria-current={index === i}
            aria-label={formatMessage(t.preview.showWidget, { name: widget.title })} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  );
}

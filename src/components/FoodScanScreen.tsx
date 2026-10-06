"use client";

import { useLocale } from "./LocaleProvider";
import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Camera, Check, ScanLine } from "lucide-react";
import { useIsPresent, useReducedMotion } from "framer-motion";
import type { AppScreen } from "@/lib/apps";
import styles from "./FoodScanScreen.module.css";

type Phase = "ready" | "capturing" | "scanning" | "complete";
const CAPTURE_MS = 180;
const SCAN_MS = 2800;


export function FoodScanScreen({ screen, sizes, preload = false, onComplete }: {
  screen: AppScreen;
  sizes: string;
  preload?: boolean;
  onComplete?: () => void;
}) {
  const { t } = useLocale();
  const [loaded, setLoaded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const reducedMotion = useReducedMotion();
  const isPresent = useIsPresent();
  const busy = phase === "capturing" || phase === "scanning" || (phase === "complete" && Boolean(onComplete));

  useEffect(() => {
    if (!loaded || !isPresent) return;

    // Wait for the screen transition on the first run. Replays respond immediately.
    const delay = attempt === 0 ? 650 : 0;
    const captureTime = reducedMotion ? 0 : CAPTURE_MS;
    const scanTime = reducedMotion ? 650 : SCAN_MS;
    const timers = [
      window.setTimeout(() => setPhase(reducedMotion ? "scanning" : "capturing"), delay),
      window.setTimeout(() => setPhase("scanning"), delay + captureTime),
      window.setTimeout(() => setPhase("complete"), delay + captureTime + scanTime),
    ];
    if (onComplete) {
      timers.push(window.setTimeout(onComplete, delay + captureTime + scanTime + 300));
    }

    // Changing screens, replaying, and Strict Mode must not leave an old run active.
    return () => timers.forEach(window.clearTimeout);
  }, [loaded, attempt, reducedMotion, isPresent, onComplete]);

  function capture() {
    if (!loaded || busy) return;
    setPhase(reducedMotion ? "scanning" : "capturing");
    setAttempt((value) => value + 1);
  }

  const StatusIcon = phase === "complete" ? Check : phase === "scanning" ? ScanLine : Camera;

  return (
    <div className={styles.camera} data-phase={phase}
      style={{ "--scan-duration": `${SCAN_MS}ms` } as CSSProperties}>
      <Image src={screen.src} alt={screen.alt} fill sizes={sizes}
        className={styles.image} preload={preload} draggable={false}
        onLoad={() => setLoaded(true)} />

      <div className={styles.scanArea} aria-hidden="true">
        {phase === "scanning" && <div className={styles.sweep}><span /></div>}
        {phase === "complete" && <div className={styles.confirmation} />}
      </div>
      {phase === "capturing" && <div className={styles.flash} aria-hidden="true" />}

      <div className={styles.status} role="status" aria-live="polite" aria-atomic="true">
        <StatusIcon size={13} aria-hidden="true" />
        <span>{t.scan[phase]}</span>
      </div>

      <button type="button" className={styles.shutter} onClick={capture}
        disabled={!loaded || busy}
        aria-label={phase === "complete" ? t.scan.again : t.scan.capture}
        title={phase === "complete" ? t.scan.replay : t.scan.photo}>
        <span aria-hidden="true" />
      </button>
    </div>
  );
}

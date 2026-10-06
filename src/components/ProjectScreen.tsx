"use client";

import { useLocale } from "./LocaleProvider";
import { LockKeyhole, MoonStar, Sparkles } from "lucide-react";
import type { AppCaseStudy } from "@/lib/apps";
import styles from "./ProjectVisual.module.css";
import { AppScreenshot } from "./AppScreenshot";

/** Shared image slot. Adding a screenshot replaces the branded preview everywhere. */
export function ProjectScreen({ app, index = 0, preload = false, sizes = "(max-width: 640px) 220px, 280px", interactive = false, scrollHintId, onScanComplete }: {
  app: AppCaseStudy;
  index?: number;
  preload?: boolean;
  sizes?: string;
  /** Hero previews remain links; only the showcase accepts scrolling. */
  interactive?: boolean;
  scrollHintId?: string;
  onScanComplete?: () => void;
}) {
  const { t } = useLocale();
  const screen = app.screens[index];
  if (screen) {
    return <AppScreenshot screen={screen} label={app.name} sizes={sizes} preload={preload}
      interactive={interactive} scrollHintId={scrollHintId} onScanComplete={onScanComplete} />;
  }
  const Icon = app.slug === "wedream" ? MoonStar : app.slug === "focuslock" ? LockKeyhole : Sparkles;
  return (
    <div className={styles.placeholder} data-variant={index}>
      <span className={styles.previewLabel}>{t.preview.visual}</span>
      <div className={styles.symbol} aria-hidden="true">
        <span className={styles.orbit} /><span className={styles.orbitInner} /><Icon strokeWidth={1} />
      </div>
      <div className={styles.placeholderCopy}>
        <span className={styles.placeholderName}>{app.name}</span>
        <span className={styles.placeholderTagline}>{app.tagline}</span>
      </div>
      <span className={styles.previewNote}>{t.preview.soon}</span>
    </div>
  );
}

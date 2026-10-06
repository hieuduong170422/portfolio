"use client";

import { useLocale } from "./LocaleProvider";
import { formatMessage } from "@/lib/i18n/messages";
import Image from "next/image";
import type { AppScreen } from "@/lib/apps";
import { FoodScanScreen } from "./FoodScanScreen";
import { DreamTypingScreen } from "./DreamTypingScreen";
import styles from "./ProjectVisual.module.css";

export function AppScreenshot({ screen, label, sizes, preload = false, interactive = false, scrollHintId, onScanComplete }: {
  screen: AppScreen;
  label: string;
  sizes: string;
  preload?: boolean;
  interactive?: boolean;
  scrollHintId?: string;
  onScanComplete?: () => void;
}) {
  const { t } = useLocale();
  if (screen.effect === "dream-typing" && interactive) {
    return <DreamTypingScreen key={screen.src} screen={screen} sizes={sizes} preload={preload} />;
  }
  if (screen.effect === "food-scan" && interactive) {
    return <FoodScanScreen key={screen.src} screen={screen} sizes={sizes} preload={preload} onComplete={onScanComplete} />;
  }
  if (screen.scroll && interactive) {
    return (
      <div key={screen.src} className={styles.scrollViewport} tabIndex={0} role="region"
        aria-label={formatMessage(t.preview.scrollRegion, { name: label })} aria-describedby={scrollHintId}>
        <Image src={screen.src} alt={screen.alt} width={screen.scroll.width} height={screen.scroll.height}
          sizes={sizes} className={styles.scrollImage} preload={preload} draggable={false} />
      </div>
    );
  }
  return <Image src={screen.src} alt={screen.alt} fill sizes={sizes} className={styles.image} preload={preload} />;
}

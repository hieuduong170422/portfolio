"use client";

import { useEffect, useState } from "react";
import type { AppScreen } from "@/lib/apps";
import type { AppSurfaces } from "@/lib/surfaces";
import { WidgetStack } from "./WidgetStack";
import { ShopSprite } from "./ShopSprite";
import { findLogo, useShopState } from "@/lib/shopDemo";
import styles from "./WidgetsScreen.module.css";

/** Grey stand-in apps: four beside the widget, three rows below it, four in the dock. */
const GRID_APPS = 16;
const DOCK_APPS = 4;
const BANNER_DELAY_MS = 1200;
const BANNER_CYCLE_MS = 4000;
const BANNER_VISIBLE_MS = 3000;

/** Drops each reminder in from the top once, the way banners arrive on a real phone. */
function useBannerSequence(count: number) {
  const [current, setCurrent] = useState<number | null>(null);
  useEffect(() => {
    const timers = Array.from({ length: count }, (_, i) => {
      const start = BANNER_DELAY_MS + i * BANNER_CYCLE_MS;
      return [
        window.setTimeout(() => setCurrent(i), start),
        window.setTimeout(() => setCurrent(null), start + BANNER_VISIBLE_MS),
      ];
    }).flat();
    return () => timers.forEach(window.clearTimeout);
  }, [count]);
  return current;
}

/** An iPhone home screen with a swipeable Capple widget among grey placeholder apps. */
export function WidgetsScreen({ screen, appName, surfaces, sizes }: {
  screen: AppScreen;
  appName: string;
  surfaces: AppSurfaces;
  sizes: string;
}) {
  const banner = useBannerSequence(surfaces.notifications.length);
  // The Capple icon follows the logo activated in the shop demo.
  const appIcon = findLogo(useShopState().active).sprite;

  return (
    <div className={styles.home}>
      <p className="sr-only">{screen.alt}</p>
      <div className={styles.statusBar} aria-hidden="true">
        <span>9:41</span><span className={styles.battery} />
      </div>

      <ul className={styles.banners} aria-hidden="true">
        {surfaces.notifications.map((notification, i) => (
          <li key={notification.id} className={styles.banner} data-visible={banner === i}>
            <ShopSprite sprite={appIcon} size="9.6cqw" className={styles.icon} />
            <div className={styles.copy}>
              <p className={styles.titleRow}><strong className={styles.title}>{notification.title}</strong><span>{notification.time}</span></p>
              <p className={styles.body}>{notification.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.grid}>
        <div className={styles.widgetCell}>
          <WidgetStack appName={appName} widgets={surfaces.widgets} sizes={sizes} />
        </div>
        <span className={styles.app}>
          <ShopSprite sprite={appIcon} size="15cqw" className={styles.appIcon} />
          <span className={styles.appName}>{appName}</span>
        </span>
        {Array.from({ length: GRID_APPS - 1 }, (_, i) => (
          <span key={i} className={styles.app} aria-hidden="true"><i /><b /></span>
        ))}
      </div>

      <div className={styles.pageDots} aria-hidden="true"><span /><span /><span /></div>
      <div className={styles.dock} aria-hidden="true">
        {Array.from({ length: DOCK_APPS }, (_, i) => <i key={i} />)}
      </div>
    </div>
  );
}

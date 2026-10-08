"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { AppScreen } from "@/lib/apps";
import type { AppSurfaces } from "@/lib/surfaces";
import { WidgetStack } from "./WidgetStack";
import { ShopSprite } from "./ShopSprite";
import { findLogo, useShopState } from "@/lib/shopDemo";
import styles from "./WidgetsScreen.module.css";

/** Grey stand-in apps: four beside the widget, then rows below it; a Live Activity leaves room for fewer. */
const GRID_APPS = 16;
const GRID_APPS_WITH_LIVE_ACTIVITY = 8;
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

/** An iPhone home screen with a swipeable widget stack among grey placeholder apps. */
export function WidgetsScreen({ screen, appName, surfaces, sizes }: {
  screen: AppScreen;
  appName: string;
  surfaces: AppSurfaces;
  sizes: string;
}) {
  const notifications = surfaces.notifications ?? [];
  const banner = useBannerSequence(notifications.length);
  // Capple's icon follows the logo activated in its shop demo; other apps ship their own icon.
  const shopIcon = findLogo(useShopState().active).sprite;
  const renderIcon = (size: string, className: string) => surfaces.iconSrc
    ? <Image src={surfaces.iconSrc} width={180} height={180} alt="" className={className} style={{ width: size, height: size }} />
    : <ShopSprite sprite={shopIcon} size={size} className={className} />;
  const topBand = surfaces.liveActivity ? "live" : notifications.length > 0 ? "banners" : "none";
  const gridApps = surfaces.liveActivity ? GRID_APPS_WITH_LIVE_ACTIVITY : GRID_APPS;

  return (
    <div className={styles.home} data-top-band={topBand} style={surfaces.wallpaper ? { background: surfaces.wallpaper } : undefined}>
      <p className="sr-only">{screen.alt}</p>
      <div className={styles.statusBar} aria-hidden="true">
        <span>9:41</span><span className={styles.battery} />
      </div>

      {surfaces.liveActivity && (
        <div className={styles.liveActivity}>
          <Image src={surfaces.liveActivity.src} width={surfaces.liveActivity.width} height={surfaces.liveActivity.height}
            sizes={sizes} alt={surfaces.liveActivity.label} />
        </div>
      )}

      {notifications.length > 0 && <ul className={styles.banners} aria-hidden="true">
        {notifications.map((notification, i) => (
          <li key={notification.id} className={styles.banner} data-visible={banner === i}>
            {renderIcon("9.6cqw", styles.icon)}
            <div className={styles.copy}>
              <p className={styles.titleRow}><strong className={styles.title}>{notification.title}</strong><span>{notification.time}</span></p>
              <p className={styles.body}>{notification.body}</p>
            </div>
          </li>
        ))}
      </ul>}

      <div className={styles.grid}>
        <div className={styles.widgetCell}>
          <WidgetStack appName={appName} widgets={surfaces.widgets} sizes={sizes} />
        </div>
        <span className={styles.app}>
          {renderIcon("15cqw", styles.appIcon)}
          <span className={styles.appName}>{appName}</span>
        </span>
        {Array.from({ length: gridApps - 1 }, (_, i) => (
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

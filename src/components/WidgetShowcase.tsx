"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { AppSurfaces, WidgetPlatform } from "@/lib/surfaces";
import styles from "./WidgetShowcase.module.css";

const WIDGET_SIZES = "(max-width: 700px) 150px, (max-width: 1100px) 18vw, 190px";

export function WidgetShowcase({ appName, surfaces }: { appName: string; surfaces: AppSurfaces }) {
  const [platform, setPlatform] = useState<WidgetPlatform>(surfaces.widgetSets[0].platform);
  const tabsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const id = useId();
  const sets = surfaces.widgetSets;
  const active = sets.find((set) => set.platform === platform) ?? sets[0];
  const panelId = `${id}-widgets`;

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + sets.length) % sets.length;
    setPlatform(sets[next].platform);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <section className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={styles.header}>
        <div>
          <h4 id={`${id}-heading`}>{surfaces.title}</h4>
          <p className={styles.description}>{surfaces.description}</p>
        </div>
        <div ref={tabsRef} className={styles.tabs} role="tablist" aria-label={`${appName} ${surfaces.title}`}>
          {sets.map((set, i) => (
            <button key={set.platform} id={`${id}-${set.platform}`} type="button" role="tab"
              aria-selected={set.platform === active.platform} aria-controls={panelId}
              tabIndex={set.platform === active.platform ? 0 : -1}
              onClick={() => setPlatform(set.platform)} onKeyDown={(event) => handleTabKey(event, i)}>
              {set.label}
            </button>
          ))}
        </div>
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={`${id}-${active.platform}`} className={styles.stage}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul key={active.platform} className={styles.widgets} data-platform={active.platform}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }} transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}>
            {active.widgets.map((widget) => (
              <li key={widget.id}>
                <Image src={widget.src} width={widget.width} height={widget.height} sizes={WIDGET_SIZES}
                  alt={`${appName} ${active.label} ${widget.title} widget`} className={styles.widget} />
                <span>{widget.title}</span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
        <p className={styles.tech}>{active.tech}</p>
      </div>

      <div className={styles.notifications}>
        <div className={styles.notificationsCopy}>
          <h5>{surfaces.notificationsTitle}</h5>
          <p>{surfaces.notificationsDescription}</p>
        </div>
        <ul className={styles.lockScreen}>
          {surfaces.notifications.map((notification) => (
            <li key={notification.id} className={styles.banner}>
              <Image src={surfaces.iconSrc} width={100} height={100} alt="" className={styles.icon} />
              <div className={styles.bannerCopy}>
                <p className={styles.bannerMeta}><strong>{appName}</strong><span>{notification.time}</span></p>
                <p className={styles.bannerTitle}>{notification.title}</p>
                <p className={styles.bannerBody}>{notification.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

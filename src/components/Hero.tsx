"use client";

import { site } from "@/lib/site";
import { useLocale } from "./LocaleProvider";
import { formatMessage } from "@/lib/i18n/messages";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getApps } from "@/lib/i18n/projects";
import { imageSizes } from "@/lib/imageSizes";
import { IPhoneDevice } from "./IPhoneDevice";
import { ProjectScreen } from "./ProjectScreen";
import visual from "./ProjectVisual.module.css";
import styles from "./Hero.module.css";
import { SolarSystem } from "./SolarSystem";

export function Hero() {
  const { t, locale } = useLocale();
  const apps = getApps(locale);
  return (
    <div className={styles.stage}>
      <SolarSystem />
      <header id="top" className={styles.hero}>
        <div className={styles.intro}>
          <h1>{site.name}</h1>
          <p className={styles.role}>{t.hero.role}</p>
          <p className={styles.description}>{t.hero.intro}</p>
          <div className={styles.availability}>
            <p>{t.hero.opportunities}</p>
            <p className={styles.location}>{t.hero.availability}</p>
          </div>
          <div className={styles.actions}>
            <a href="#work" className={styles.primaryLink}>{t.hero.explore} <ArrowDown size={16} /></a>
            <a href={site.cvPath} download className={styles.contactLink}>{t.nav.cv} <ArrowDown size={16} /></a>
          </div>
        </div>
        <div className={styles.gallery} aria-label={t.hero.gallery}>
          {apps.map((app, index) => (
            <a key={app.slug} href={`#${app.slug}`} data-project={app.slug}
              className={`${visual.theme} ${styles.phoneLink}`} aria-label={formatMessage(t.preview.explore, { name: app.name })}>
              <div className={styles.phone}>
                <IPhoneDevice showIsland={!app.screens[0]?.hasDynamicIsland}><ProjectScreen app={app} preload={index === 0} sizes={imageSizes.hero} /></IPhoneDevice>
              </div>
              <span className={styles.phoneLabel}><i />{app.shortName ?? app.name}<ArrowUpRight size={12} /></span>
            </a>
          ))}
        </div>
      </header>
    </div>
  );
}

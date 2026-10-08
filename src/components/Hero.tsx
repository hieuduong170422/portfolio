"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { site } from "@/lib/site";
import { useLocale } from "./LocaleProvider";
import { formatMessage } from "@/lib/i18n/messages";
import { ArrowDown, ArrowUpRight, Rotate3d } from "lucide-react";
import { getApps } from "@/lib/i18n/projects";
import { imageSizes } from "@/lib/imageSizes";
import { IPhoneDevice } from "./IPhoneDevice";
import { ProjectScreen } from "./ProjectScreen";
import { useSpinDrag, type SpinStore } from "./hero3d/spin";
import visual from "./ProjectVisual.module.css";
import styles from "./Hero.module.css";
import { SolarSystem } from "./SolarSystem";

// three.js only loads in the browser, after the HTML phones are already on screen.
const HeroPhones3D = dynamic(() => import("./hero3d/HeroPhones3D"), { ssr: false });

export function Hero() {
  const { t, locale } = useLocale();
  const apps = getApps(locale);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [ready3d, setReady3d] = useState(false);
  const [failed3d, setFailed3d] = useState(false);
  const onReady3d = useCallback(() => setReady3d(true), []);
  // Unmounting the scene and clearing ready3d brings the HTML phones back.
  const onFail3d = useCallback(() => {
    setFailed3d(true);
    setReady3d(false);
  }, []);
  const spins = useRef<SpinStore>(new Map());
  const spinHandlers = useSpinDrag(spins, ready3d);
  const phones3d = useMemo(() => apps.flatMap(({ slug, screens: [screen] }) =>
    screen ? [{ slug, src: screen.src, showIsland: !screen.hasDynamicIsland }] : []), [apps]);
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
        <div className={styles.gallery} aria-label={t.hero.gallery} data-3d={ready3d ? "ready" : undefined}>
          {!failed3d && <HeroPhones3D className={styles.scene3d} phones={phones3d} activeSlug={activeSlug} spins={spins}
            onReady={onReady3d} onFail={onFail3d} />}
          {apps.map((app, index) => (
            <a key={app.slug} href={`#${app.slug}`} data-project={app.slug}
              onPointerEnter={() => setActiveSlug(app.slug)} onPointerLeave={() => setActiveSlug(null)}
              onFocus={() => setActiveSlug(app.slug)} onBlur={() => setActiveSlug(null)} {...spinHandlers(app.slug)}
              className={`${visual.theme} ${styles.phoneLink}`} aria-label={formatMessage(t.preview.explore, { name: app.name })}>
              <div className={styles.phone}>
                <IPhoneDevice showIsland={!app.screens[0]?.hasDynamicIsland}><ProjectScreen app={app} preload={index === 0} sizes={imageSizes.hero} /></IPhoneDevice>
              </div>
              <span className={styles.phoneLabel}><i />{app.shortName ?? app.name}<ArrowUpRight size={12} /></span>
            </a>
          ))}
          {ready3d && <p className={styles.rotateHint} aria-hidden="true"><Rotate3d size={13} />{t.hero.rotate}</p>}
        </div>
      </header>
    </div>
  );
}

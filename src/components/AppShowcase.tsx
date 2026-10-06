"use client";

import { useLocale } from "./LocaleProvider";
import { formatMessage } from "@/lib/i18n/messages";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, CodeXml, RotateCcw } from "lucide-react";
import { IPhoneDevice } from "./IPhoneDevice";
import { ProjectScreen } from "./ProjectScreen";
import { FeatureGallery } from "./FeatureGallery";
import type { AppCaseStudy } from "@/lib/apps";
import { imageSizes } from "@/lib/imageSizes";
import { warmScreenImage } from "@/lib/warmScreenImage";
import visual from "./ProjectVisual.module.css";
import styles from "./AppShowcase.module.css";

export function AppShowcase({ app }: { app: AppCaseStudy }) {
  const { t } = useLocale();
  const [selected, setSelected] = useState(0);
  const [typingReplay, setTypingReplay] = useState(0);
  const reducedMotion = useReducedMotion();
  const chapter = app.chapters[selected];
  const panelId = `${app.slug}-preview`;
  const scrollable = Boolean(app.screens[selected]?.scroll);
  const interactiveScreen = scrollable || Boolean(app.screens[selected]?.effect);
  const scrollHintId = `${app.slug}-scroll-hint`;
  const scanScreenIndex = app.screens.findIndex((screen) => screen.effect === "food-scan");
  const chapterCount = app.chapters.length;
  useEffect(() => {
    // The scan ends with an automatic transition; fetch its result during the scan.
    if (app.screens[selected]?.effect === "food-scan") {
      warmScreenImage(app.screens[selected + 1], imageSizes.showcase);
    }
  }, [app.screens, selected]);
  const handleScanComplete = useCallback(() => {
    setSelected((current) => {
      // A finishing scan must not override a screen the visitor chose manually.
      if (current !== scanScreenIndex) return current;
      return Math.min(current + 1, chapterCount - 1);
    });
  }, [scanScreenIndex, chapterCount]);
  const links = [
    { href: app.links.appStore, label: "App Store" },
    { href: app.links.googlePlay, label: "Google Play" },
    { href: app.links.website, label: t.preview.website },
    { href: app.links.github, label: t.preview.code },
  ].filter((link) => link.href);

  return (
    <article aria-labelledby={`${app.slug}-title`} data-project={app.slug}
      className={`${visual.theme} ${styles.project}`}>
      <div className={styles.layout}>
        <div className={styles.visualColumn}>
          <div className={styles.stage} id={panelId} role="region" aria-label={formatMessage(t.preview.region, { name: app.name })}>
            <div className={styles.stageHeader}>
              <span>{app.shortName ?? app.name}</span>
              <span>{app.status === "in-development" || !app.screens[selected] ? t.preview.visual : t.preview.experience}</span>
            </div>
            <span className={styles.watermark} aria-hidden="true">{app.shortName ?? app.name}</span>
            <div className={styles.stageRing} aria-hidden="true" />
            <motion.div className={styles.device}
              initial={reducedMotion ? false : { rotate: 3, y: 28 }}
              whileInView={{ rotate: reducedMotion || interactiveScreen ? 0 : -3, y: 0 }}
              whileHover={reducedMotion || interactiveScreen ? undefined : { rotate: 0, y: -6 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}>
              <IPhoneDevice showIsland={!app.screens[selected]?.hasDynamicIsland}>
                <AnimatePresence initial={false}>
                  <motion.div key={selected} className={styles.screenContent}
                    initial={{ opacity: 0, x: reducedMotion ? 0 : 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reducedMotion ? 0 : -18 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}>
                    <ProjectScreen key={typingReplay} app={app} index={selected} interactive sizes={imageSizes.showcase}
                      onScanComplete={handleScanComplete}
                      scrollHintId={scrollable ? scrollHintId : undefined} />
                  </motion.div>
                </AnimatePresence>
              </IPhoneDevice>
            </motion.div>
            <div className={styles.stageFooter}>
              <span>0{selected + 1} <span>/ 0{app.chapters.length}</span></span>
              {scrollable && <span id={scrollHintId} className={styles.scrollHint}>
                <ArrowDown size={12} aria-hidden="true" /> {t.preview.scroll}
              </span>}
              {app.screens[selected]?.effect === "dream-typing" && <button type="button"
                className={styles.replay} aria-label={t.typing.replayLabel} aria-controls={panelId}
                onClick={() => setTypingReplay((current) => current + 1)}>
                <RotateCcw size={13} aria-hidden="true" /> {t.typing.replay}
              </button>}
              <div className={styles.previewControls}>
                <button type="button" aria-label={formatMessage(t.preview.previousScreen, { name: app.name })} disabled={selected === 0}
                  aria-controls={panelId} onClick={() => setSelected(selected - 1)}><ArrowLeft size={16} /></button>
                <button type="button" aria-label={formatMessage(t.preview.nextScreen, { name: app.name })} disabled={selected === app.chapters.length - 1}
                  onPointerEnter={() => warmScreenImage(app.screens[selected + 1], imageSizes.showcase)}
                  onFocus={() => warmScreenImage(app.screens[selected + 1], imageSizes.showcase)}
                  aria-controls={panelId} onClick={() => setSelected(selected + 1)}><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {app.screens[selected]?.caption ?? `${chapter.title} · ${t.preview.soon}`}
          </p>
        </div>

        <div className={styles.story}>
          {app.statusLabel && <p className={styles.statusBadge}>{app.statusLabel}</p>}
          <h3 id={`${app.slug}-title`}>{app.name}</h3>
          <p className={styles.description}>{app.description}</p>
          {app.role && <p className={styles.role}>{app.role}</p>}
          {app.stats && (
            <div className={styles.stats}>{app.stats.map((stat) => (
              <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))}</div>
          )}
          {app.statsNote && <p className={styles.statsNote}>{app.statsNote}</p>}
          <div className={styles.chapters} aria-label={formatMessage(t.preview.explore, { name: app.name })}>
            {app.chapters.map((step, i) => (
              <button key={i} type="button" aria-pressed={selected === i} aria-controls={panelId}
                onPointerEnter={() => warmScreenImage(app.screens[i], imageSizes.showcase)}
                onFocus={() => warmScreenImage(app.screens[i], imageSizes.showcase)}
                className={styles.chapter} onClick={() => setSelected(i)}>
                <span className={styles.stepNumber}>0{i + 1}</span>
                <span className={styles.stepCopy}><strong>{step.title}</strong></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
          <p className={styles.chapterDescription}>{chapter.description}</p>
          {links.length > 0 && (
            <div className={styles.links}>{links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}<ArrowUpRight size={15} />
              </a>
            ))}</div>
          )}
          {(app.role || app.tech.length > 0) && (
            <details className={styles.details} open>
              <summary>
                <CodeXml size={20} aria-hidden="true" />
                <span className={styles.detailsTitle}>{t.preview.behind}</span>
                <ChevronDown className={styles.detailsChevron} size={32} aria-hidden="true" />
              </summary>
              <div className={styles.detailsBody}>
                {app.responsibilities && <p>{app.responsibilities}</p>}
                {app.tech.length > 0 && <ul aria-label={t.preview.technologies}>{app.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
              </div>
            </details>
          )}
        </div>
      </div>
      {app.features && app.features.length > 0 && <FeatureGallery appName={app.shortName ?? app.name} features={app.features} />}
    </article>
  );
}

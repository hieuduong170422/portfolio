"use client";

import { useLocale } from "./LocaleProvider";
import { formatMessage } from "@/lib/i18n/messages";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { AppFeature } from "@/lib/apps";
import { imageSizes } from "@/lib/imageSizes";
import { warmScreenImage } from "@/lib/warmScreenImage";
import { IPhoneDevice } from "./IPhoneDevice";
import { AppScreenshot } from "./AppScreenshot";
import styles from "./FeatureGallery.module.css";

export function FeatureGallery({ appName, features }: { appName: string; features: AppFeature[] }) {
  const { t } = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const id = useId();
  const feature = features[featureIndex];
  const screen = feature.screens[selected];
  const multiple = feature.screens.length > 1;
  const previewId = `${id}-preview`;
  const hintId = `${id}-hint`;

  useEffect(() => {
    if (!opened) return;
    // Wait until the selected content is mounted so native dialog focus works.
    dialogRef.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [opened]);

  function openFeature(index: number) {
    setFeatureIndex(index);
    setSelected(0);
    setOpened(true);
  }

  function close() { dialogRef.current?.close(); }

  function handleBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || !multiple) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      setSelected((current) => Math.max(0, Math.min(feature.screens.length - 1, current + direction)));
    }
  }

  return (
    <section className={styles.gallery} aria-labelledby={`${id}-heading`}>
      <div className={styles.galleryHeading}>
        <h4 id={`${id}-heading`}>{t.features.title}</h4>
      </div>
      <div className={styles.cards} data-count={features.length}>
        {features.map((item, index) => (
          <button key={item.slug} type="button" className={styles.card} data-feature={item.slug}
            onPointerEnter={() => warmScreenImage(item.screens[0], imageSizes.featureDetail)}
            onFocus={() => warmScreenImage(item.screens[0], imageSizes.featureDetail)}
            aria-haspopup="dialog" aria-controls={`${id}-dialog`} onClick={() => openFeature(index)}>
            <span className={styles.cardCopy}>
              <span className={styles.cardTitle}>{item.category}</span>
              <span className={styles.cardLink}>{item.screens.length > 1 ? formatMessage(t.features.exploreSteps, { count: item.screens.length }) : t.features.exploreFeature}<ArrowUpRight size={15} /></span>
            </span>
            <span className={styles.cardVisual} aria-hidden="true">
              <span className={styles.cardPhone}>
                <IPhoneDevice showIsland={!item.screens[item.coverIndex ?? 0].hasDynamicIsland}><AppScreenshot screen={item.screens[item.coverIndex ?? 0]} label={appName} sizes={imageSizes.featureCover} /></IPhoneDevice>
              </span>
            </span>
          </button>
        ))}
      </div>

      <dialog ref={dialogRef} id={`${id}-dialog`} className={styles.dialog}
        aria-labelledby={`${id}-dialog-title`} onClose={() => setOpened(false)}
        onClick={handleBackdrop} onKeyDown={handleKeyDown}>
        {opened && <>
        <div className={styles.dialogHeader}>
          <div><span>{appName}</span><h4 id={`${id}-dialog-title`}>{feature.category}</h4></div>
          <button type="button" onClick={close} className={styles.close} aria-label={t.features.close}><X size={19} /></button>
        </div>
        <div className={styles.dialogContent}>
          <div className={styles.preview} id={previewId} role="region" aria-label={formatMessage(t.features.region, { name: feature.category })}>
            <div className={styles.phone}>
              <IPhoneDevice showIsland={!screen.hasDynamicIsland}>
                <AnimatePresence initial={false}>
                  <motion.div key={`${feature.slug}-${selected}`} className={styles.screen}
                    initial={{ opacity: 0, x: reducedMotion ? 0 : 14 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reducedMotion ? 0 : -14 }}
                    transition={{ duration: reducedMotion ? 0 : .22 }}>
                    <AppScreenshot screen={screen} label={`${appName} ${feature.category}`} sizes={imageSizes.featureDetail}
                      interactive scrollHintId={screen.scroll ? hintId : undefined} />
                  </motion.div>
                </AnimatePresence>
              </IPhoneDevice>
            </div>
            {screen.scroll && <p className={styles.scrollHint} id={hintId}><ArrowDown size={12} /> {t.preview.scrollInside}</p>}
          </div>
          <div className={styles.details}>
            <p className={styles.description}>{feature.description}</p>
            {multiple && (
              <div className={styles.steps} aria-label={formatMessage(t.features.steps, { name: feature.category })}>
                {feature.screens.map((step, index) => (
                  <button key={step.src} type="button" onClick={() => setSelected(index)}
                    onPointerEnter={() => warmScreenImage(step, imageSizes.featureDetail)}
                    onFocus={() => warmScreenImage(step, imageSizes.featureDetail)}
                    aria-pressed={selected === index} aria-controls={previewId}>
                    <span>{String(index + 1).padStart(2, "0")}</span>{step.title}<ArrowUpRight size={13} />
                  </button>
                ))}
              </div>
            )}
            <div className={styles.screenDescription} aria-live="polite" aria-atomic="true">
              <span>{multiple ? formatMessage(t.features.step, { current: selected + 1, total: feature.screens.length }) : t.features.closer}</span>
              <h5>{screen.title}</h5>
              <p>{screen.caption}</p>
            </div>
            {multiple && (
              <div className={styles.navigation}>
                <button type="button" onClick={() => setSelected((current) => current - 1)} disabled={selected === 0}
                  aria-label={t.features.previousStep} aria-controls={previewId}><ArrowLeft size={16} /> {t.features.previous}</button>
                <button type="button" onClick={() => setSelected((current) => current + 1)} disabled={selected === feature.screens.length - 1}
                  aria-label={t.features.nextStep} aria-controls={previewId}>{t.features.next} <ArrowRight size={16} /></button>
              </div>
            )}
          </div>
        </div>
        </>}
      </dialog>
    </section>
  );
}

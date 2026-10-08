"use client";

import { useEffect, useState } from "react";
import { CircleAlert, CircleCheck, ScanLine } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useLocale } from "./LocaleProvider";
import { formatMessage } from "@/lib/i18n/messages";
import { GIFT_SPRITE, findLogo, type MysteryReward } from "@/lib/shopDemo";
import { ShopSprite, pt } from "./ShopSprite";
import styles from "./ShopScreen.module.css";

const SHAKE_MS = 1400;

export function ShopToast({ text, tone }: { text: string; tone: "success" | "error" }) {
  const Icon = tone === "success" ? CircleCheck : CircleAlert;
  return (
    <p className={styles.toast} data-tone={tone} role="status">
      <Icon size={15} aria-hidden="true" />{text}
    </p>
  );
}

/** The system alert iOS shows after an alternate app icon is applied. */
export function IconChangedAlert({ appName, logoId, onConfirm }: { appName: string; logoId: string; onConfirm: () => void }) {
  const { t } = useLocale();
  return (
    <div className={styles.scrim}>
      <div className={styles.alert} role="alertdialog" aria-modal="true" aria-labelledby="shop-alert-text">
        <ShopSprite sprite={findLogo(logoId).sprite} size={pt(52)} className={styles.alertIcon} />
        <p id="shop-alert-text">{formatMessage(t.shop.iconChanged, { name: appName })}</p>
        <button type="button" onClick={onConfirm} autoFocus>{t.shop.ok}</button>
      </div>
    </div>
  );
}

/** Shakes the gift box, then reveals the reward in a bottom sheet. */
export function MysteryBoxReveal({ reward, onClose }: { reward: MysteryReward; onClose: () => void }) {
  const { t, locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), reducedMotion ? 0 : SHAKE_MS);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  const isLogo = reward.kind === "logo";
  return (
    <div className={styles.scrim} data-dark="true">
      {!revealed && <ShopSprite sprite={GIFT_SPRITE} size={pt(150)} className={styles.shaking} />}
      {revealed && (
        <div className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="shop-reward-title">
          <span className={styles.burst} aria-hidden="true" />
          {isLogo
            ? <ShopSprite sprite={reward.logo.sprite} size={pt(88)} className={styles.rewardIcon} />
            : <span className={styles.rewardScan} aria-hidden="true"><ScanLine size={40} /></span>}
          <h5 id="shop-reward-title">{isLogo ? t.shop.logoTitle : t.shop.scanTitle}</h5>
          <p>{isLogo ? formatMessage(t.shop.logoDesc, { name: reward.logo.name[locale] }) : formatMessage(t.shop.scanDesc, { count: reward.count })}</p>
          <button type="button" onClick={onClose} autoFocus>{t.shop.gotIt}</button>
        </div>
      )}
    </div>
  );
}

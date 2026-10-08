"use client";

import { useEffect, useState } from "react";
import { Lexend } from "next/font/google";
import { ArrowLeft, ScanLine } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { formatMessage } from "@/lib/i18n/messages";
import {
  COIN_SPRITE, GIFT_SPRITE, MYSTERY_BOX_PRICE, SHOP_LOGOS,
  activateLogo, buyLogo, findLogo, openMysteryBox, useShopState, type MysteryReward,
} from "@/lib/shopDemo";
import { ShopSprite, pt } from "./ShopSprite";
import { IconChangedAlert, MysteryBoxReveal, ShopToast } from "./ShopOverlays";
import styles from "./ShopScreen.module.css";

const lexend = Lexend({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600"] });

const TOAST_MS = 1800;

/** Capple's shop: buy logos with coins, activate one as the app icon, or open a mystery box. */
export function ShopScreen({ appName }: { appName: string }) {
  const { t, locale } = useLocale();
  const shop = useShopState();
  const [selected, setSelected] = useState("green");
  const [toast, setToast] = useState<{ text: string; tone: "success" | "error" } | null>(null);
  const [alertFor, setAlertFor] = useState<string | null>(null);
  const [reward, setReward] = useState<MysteryReward | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const logo = findLogo(selected);
  const owned = shop.owned.includes(logo.id);
  const active = shop.active === logo.id;
  const affordable = shop.coins >= logo.price;

  function handlePrimary() {
    if (owned) {
      if (!active) setAlertFor(logo.id);
      return;
    }
    if (!buyLogo(logo.id)) {
      setToast({ text: t.shop.notEnough, tone: "error" });
      return;
    }
    setToast({ text: t.shop.purchased, tone: "success" });
  }

  function handleMysteryBox() {
    const result = openMysteryBox();
    if (!result) {
      setToast({ text: t.shop.notEnough, tone: "error" });
      return;
    }
    setReward(result);
  }

  function confirmIcon() {
    if (alertFor) activateLogo(alertFor);
    setAlertFor(null);
  }

  const primaryLabel = owned ? (active ? t.shop.activated : t.shop.activate) : formatMessage(t.shop.payWith, { count: logo.price });

  return (
    <div className={`${styles.shop} ${lexend.className}`}>
      <div className={styles.statusBar} aria-hidden="true"><span>9:41</span><span className={styles.battery} /></div>

      <header className={styles.header}>
        <span className={styles.back} aria-hidden="true"><ArrowLeft size={18} /></span>
        <h4>{t.shop.title}</h4>
        <p className={styles.balance} aria-label={formatMessage(t.shop.balance, { count: shop.coins })}>
          <ShopSprite sprite={COIN_SPRITE} size={pt(23)} className={styles.coin} />{shop.coins}
        </p>
      </header>

      <p className={styles.section}>{t.shop.logo}</p>
      <div className={styles.grid}>
        {SHOP_LOGOS.map((item) => {
          const isOwned = shop.owned.includes(item.id);
          return (
            <button key={item.id} type="button" className={styles.item} aria-pressed={selected === item.id}
              aria-label={formatMessage(t.shop.selectLogo, { name: item.name[locale] })} onClick={() => setSelected(item.id)}>
              <ShopSprite sprite={item.sprite} size={pt(64)} className={styles.tile} />
              {item.price === 0 ? <span className={styles.free}>{t.shop.free}</span>
                : isOwned ? <span className={styles.owned}>{t.shop.owned}</span>
                : <span className={styles.price}><ShopSprite sprite={COIN_SPRITE} size={pt(18)} className={styles.coin} />{item.price}</span>}
            </button>
          );
        })}
      </div>

      <p className={`${styles.section} ${styles.otherSection}`}>{t.shop.other}</p>
      <button type="button" className={styles.box} onClick={handleMysteryBox}
        aria-label={formatMessage(t.shop.openBox, { count: MYSTERY_BOX_PRICE })}>
        <span className={styles.boxCopy}>
          <strong>{t.shop.mysteryBox}</strong>
          <span className={styles.chips}>
            <span><ScanLine size={12} aria-hidden="true" />{t.shop.scanTag}</span>
            <span><ShopSprite sprite={SHOP_LOGOS[0].sprite} size={pt(14)} className={styles.chipLogo} />{t.shop.logoTag}</span>
          </span>
          <span className={styles.price}><ShopSprite sprite={COIN_SPRITE} size={pt(18)} className={styles.coin} />{MYSTERY_BOX_PRICE}</span>
        </span>
        <ShopSprite sprite={GIFT_SPRITE} size={pt(104)} className={styles.gift} />
      </button>

      <button type="button" className={styles.primary} onClick={handlePrimary}
        data-muted={(owned && active) || (!owned && !affordable)} aria-disabled={owned && active}>
        {!owned && <ShopSprite sprite={COIN_SPRITE} size={pt(18)} className={styles.coin} />}
        {primaryLabel}
      </button>

      {toast && <ShopToast text={toast.text} tone={toast.tone} />}
      {alertFor && <IconChangedAlert appName={appName} logoId={alertFor} onConfirm={confirmIcon} />}
      {reward && <MysteryBoxReveal reward={reward} onClose={() => setReward(null)} />}
    </div>
  );
}

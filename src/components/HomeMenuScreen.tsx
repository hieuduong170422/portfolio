"use client";

import Image from "next/image";
import { useLocale } from "./LocaleProvider";
import type { AppScreen } from "@/lib/apps";
import styles from "./HomeMenuScreen.module.css";

const HOME_SRC = "/images/capple/home-hook.png";
const MENU_SRC = "/images/capple/menu.png";

/** Where each menu tile leads, by the target screen's image. Log food has no showcase screen. */
const MENU_TARGETS = {
  voice: "/images/capple/voice.png",
  chat: "/images/capple/chat-log.png",
  scan: "/images/capple/scan.png",
} as const;

/**
 * Capple's home with the blue log button live: tapping it raises the log sheet
 * (cropped from the real menu screenshot), whose tiles jump to their screens.
 * Home and menu share this component so the sheet slides instead of the screen swapping.
 */
export function HomeMenuScreen({ screen, open, sizes, onNavigate }: {
  screen: AppScreen;
  open: boolean;
  sizes: string;
  onNavigate: (src: string) => void;
}) {
  const { t } = useLocale();
  return (
    <div className={styles.screen} data-open={open}>
      <Image src={HOME_SRC} alt={open ? "" : screen.alt} fill sizes={sizes} className={styles.image} draggable={false} />
      {!open && (
        <button type="button" className={styles.logButton} aria-label={t.home.openMenu} onClick={() => onNavigate(MENU_SRC)}>
          <span className={styles.pulse} aria-hidden="true" />
        </button>
      )}

      <button type="button" className={styles.scrim} aria-label={t.home.closeMenu} tabIndex={open ? 0 : -1}
        aria-hidden={!open} onClick={() => onNavigate(HOME_SRC)} />
      <div className={styles.sheet} role="dialog" aria-label={screen.alt} aria-hidden={!open} inert={!open}>
        <Image src={MENU_SRC} alt="" width={1320} height={2868} sizes={sizes} className={styles.sheetImage} draggable={false} />
        <button type="button" className={styles.handle} aria-label={t.home.closeMenu} onClick={() => onNavigate(HOME_SRC)} />
        <button type="button" className={styles.tile} data-tile="voice" aria-label={t.home.voice} onClick={() => onNavigate(MENU_TARGETS.voice)} />
        <button type="button" className={styles.tile} data-tile="chat" aria-label={t.home.chat} onClick={() => onNavigate(MENU_TARGETS.chat)} />
        <button type="button" className={styles.tile} data-tile="scan" aria-label={t.home.scan} onClick={() => onNavigate(MENU_TARGETS.scan)} />
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import styles from "./IPhoneDevice.module.css";

// Geometry from Figma iphone17pro (2901:3419), in the 1300 × 2642 canvas.
export const IPHONE_SCREEN = { x: 65 / 1300, y: 55 / 2642, width: 1170 / 1300, height: 2532 / 2642 };

export function IPhoneDevice({ children, showIsland = true }: { children: ReactNode; showIsland?: boolean }) {
  return (
    <div className={styles.device}>
      <div className={styles.buttons} aria-hidden="true">
        <span className={styles.action} /><span className={styles.volumeUp} />
        <span className={styles.volumeDown} /><span className={styles.power} />
      </div>
      <div className={styles.body}>
        <div className={styles.primary} aria-hidden="true" />
        <div className={styles.highlight} aria-hidden="true" />
        <div className={styles.bezel} aria-hidden="true" />
        <div className={styles.screen}>{children}</div>
        {showIsland && <div className={styles.island} aria-hidden="true" />}
        <div className={styles.antenna} aria-hidden="true">
          <span /><span /><span /><span /><span /><span />
        </div>
      </div>
    </div>
  );
}

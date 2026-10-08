import styles from "./ScreenSkeleton.module.css";

/**
 * Generic app-screen placeholder drawn under every phone screenshot,
 * so a slow image shows a shimmering layout instead of a blank screen.
 */
export function ScreenSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <span className={styles.status} />
      <span className={styles.title} />
      <span className={styles.days} />
      <span className={styles.hero} />
      <span className={styles.cards}><i /><i /><i /></span>
      <span className={styles.row} />
      <span className={styles.row} />
      <span className={styles.tabBar} />
    </div>
  );
}

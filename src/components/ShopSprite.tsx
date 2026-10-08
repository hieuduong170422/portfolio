import type { CSSProperties } from "react";
import { SHEET_WIDTH_PT, SHOP_SHEET, type Sprite } from "@/lib/shopDemo";
import styles from "./ShopScreen.module.css";

/** Design points → container units of the iPhone frame (393pt across 92.3cqw of screen). */
export const pt = (value: number) => `calc(${value} * 0.23488cqw)`;

/** A crop of the shop screenshot, drawn at any CSS size (logo tiles, coin, gift box). */
export function ShopSprite({ sprite, size, className }: { sprite: Sprite; size: string; className?: string }) {
  const scale = (points: number) => `calc(${size} * ${points} / ${sprite.size})`;
  const style: CSSProperties = {
    width: size,
    height: size,
    backgroundImage: `url(${SHOP_SHEET})`,
    backgroundSize: `${scale(SHEET_WIDTH_PT)} auto`,
    backgroundPosition: `${scale(-sprite.x)} ${scale(-sprite.y)}`,
  };
  return <span className={`${styles.sprite} ${className ?? ""}`} style={style} aria-hidden="true" />;
}

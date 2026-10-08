import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import { SHEET_WIDTH_PT, SHOP_SHEET, type Sprite } from "@/lib/shopDemo";
import styles from "./ShopScreen.module.css";

// Serve the 1572px sheet through the image optimizer: a 1080px WebP is plenty for the crops and far lighter than the JPEG.
const { props: sheetProps } = getImageProps({ src: SHOP_SHEET, alt: "", width: 540, height: 1171 });
const SHEET_URL = sheetProps.src;

/** Fetch the sheet ahead of the shop screen so its logos appear with the screen. */
export function preloadShopSheet() {
  if (typeof window === "undefined") return;
  const image = new window.Image();
  image.decoding = "async";
  image.src = SHEET_URL;
}

/** Design points → container units of the iPhone frame (393pt across 92.3cqw of screen). */
export const pt = (value: number) => `calc(${value} * 0.23488cqw)`;

/** A crop of the shop screenshot, drawn at any CSS size (logo tiles, coin, gift box). */
export function ShopSprite({ sprite, size, className }: { sprite: Sprite; size: string; className?: string }) {
  const scale = (points: number) => `calc(${size} * ${points} / ${sprite.size})`;
  const style: CSSProperties = {
    width: size,
    height: size,
    backgroundImage: `url(${SHEET_URL})`,
    backgroundSize: `${scale(SHEET_WIDTH_PT)} auto`,
    backgroundPosition: `${scale(-sprite.x)} ${scale(-sprite.y)}`,
  };
  return <span className={`${styles.sprite} ${className ?? ""}`} style={style} aria-hidden="true" />;
}

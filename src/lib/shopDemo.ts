import { useSyncExternalStore } from "react";
import type { Locale } from "./i18n/messages";

/**
 * In-page demo of Capple's shop. Prices follow the Figma "Choose item" frame (2452:21985);
 * the starting balance is raised so visitors can afford one mystery box.
 */
export const SHOP_SHEET = "/images/capple/shop.jpg";
/** shop.jpg is a 4x export of a 393pt-wide screen; sprite coordinates below are in points. */
export const SHEET_WIDTH_PT = 393;
export const TILE_PT = 65;
export const MYSTERY_BOX_PRICE = 30;
export const STARTING_COINS = 40;
const SCAN_REWARD_MAX = 3;

export type Sprite = { x: number; y: number; size: number };

export type ShopLogo = { id: string; price: number; name: Record<Locale, string>; sprite: Sprite };

const COLUMNS = [19.5, 115.75, 211.75, 308.5];
const ROWS = [192.75, 304.75, 416.75];

const LOGO_SPECS: { id: string; price: number; en: string; vi: string }[] = [
  { id: "blue", price: 0, en: "Classic blue", vi: "Xanh cổ điển" },
  { id: "green", price: 3, en: "Green", vi: "Xanh lá" },
  { id: "orange", price: 3, en: "Orange", vi: "Cam" },
  { id: "pink", price: 3, en: "Pink", vi: "Hồng" },
  { id: "black", price: 7, en: "Black", vi: "Đen" },
  { id: "teal", price: 7, en: "Teal", vi: "Xanh ngọc" },
  { id: "purple", price: 7, en: "Purple", vi: "Tím" },
  { id: "sky", price: 7, en: "Sky", vi: "Xanh trời" },
  { id: "indigo", price: 7, en: "Indigo", vi: "Chàm" },
  { id: "dusk", price: 7, en: "Dusk", vi: "Chiều tím" },
  { id: "sunset", price: 7, en: "Sunset", vi: "Hoàng hôn" },
  { id: "rose", price: 7, en: "Rose garden", vi: "Vườn hồng" },
];

export const SHOP_LOGOS: ShopLogo[] = LOGO_SPECS.map((spec, i) => ({
  id: spec.id,
  price: spec.price,
  name: { en: spec.en, vi: spec.vi },
  sprite: { x: COLUMNS[i % 4], y: ROWS[Math.floor(i / 4)], size: TILE_PT },
}));

export const COIN_SPRITE: Sprite = { x: 320.2, y: 94.5, size: 23 };
export const GIFT_SPRITE: Sprite = { x: 261, y: 592, size: 104 };

export type ShopState = { coins: number; owned: string[]; active: string; bonusScans: number };

export type MysteryReward = { kind: "logo"; logo: ShopLogo } | { kind: "scan"; count: number };

// The design shows green as already owned; blue is the free default icon.
const INITIAL: ShopState = { coins: STARTING_COINS, owned: ["blue", "green"], active: "blue", bonusScans: 0 };

let state = INITIAL;
const listeners = new Set<() => void>();

function setState(next: ShopState) {
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useShopState(): ShopState {
  return useSyncExternalStore(subscribe, () => state, () => INITIAL);
}

export function findLogo(id: string): ShopLogo {
  return SHOP_LOGOS.find((logo) => logo.id === id) ?? SHOP_LOGOS[0];
}

/** Returns false when the logo is already owned or the balance is too low. */
export function buyLogo(id: string): boolean {
  const logo = findLogo(id);
  if (state.owned.includes(id) || state.coins < logo.price) return false;
  setState({ ...state, coins: state.coins - logo.price, owned: [...state.owned, id] });
  return true;
}

export function activateLogo(id: string) {
  if (!state.owned.includes(id)) return;
  setState({ ...state, active: id });
}

/** Spends the box price and grants either an unowned logo or 1–3 scans; null when unaffordable. */
export function openMysteryBox(random: () => number = Math.random): MysteryReward | null {
  if (state.coins < MYSTERY_BOX_PRICE) return null;
  const coins = state.coins - MYSTERY_BOX_PRICE;
  const unowned = SHOP_LOGOS.filter((logo) => !state.owned.includes(logo.id));
  if (unowned.length > 0 && random() < 0.5) {
    const logo = unowned[Math.floor(random() * unowned.length)];
    setState({ ...state, coins, owned: [...state.owned, logo.id] });
    return { kind: "logo", logo };
  }
  const count = 1 + Math.floor(random() * SCAN_REWARD_MAX);
  setState({ ...state, coins, bonusScans: state.bonusScans + count });
  return { kind: "scan", count };
}

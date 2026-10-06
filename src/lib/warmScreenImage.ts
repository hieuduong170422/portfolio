import { getImageProps } from "next/image";
import type { AppScreen } from "./apps";

const requested = new Set<string>();

/** Warm an intended next screen without delaying a click or loading every screenshot. */
export function warmScreenImage(screen: AppScreen | undefined, sizes: string) {
  if (!screen || typeof window === "undefined") return;
  const { props } = getImageProps({ src: screen.src, alt: "", fill: true, sizes });
  const key = `${props.srcSet}|${sizes}|${window.innerWidth}|${window.devicePixelRatio}`;
  if (requested.has(key)) return;
  requested.add(key);

  const image = new window.Image();
  image.decoding = "async";
  image.fetchPriority = "low";
  image.onerror = () => requested.delete(key);
  image.sizes = props.sizes ?? sizes;
  image.srcset = props.srcSet ?? "";
  image.src = props.src;
}

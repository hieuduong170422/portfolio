import { DEVICE } from "./geometry";

// The scene mirrors the CSS gallery so the 3D phones land exactly where the
// HTML phones were. Keep in sync with .gallery and .phoneLink in Hero.module.css.
const GALLERY_WIDTH = 10;
const GALLERY_HEIGHT = GALLERY_WIDTH / 1.03; // .gallery aspect-ratio
/** The canvas overflows the gallery by 10% on each side so tilted phones are not clipped. */
const CANVAS_SCALE = 1.2;
export const CAMERA_FOV = 26;
export const CAMERA_Z = (GALLERY_HEIGHT * CANVAS_SCALE) / 2 / Math.tan(((CAMERA_FOV / 2) * Math.PI) / 180);

export type Placement = {
  x: number; y: number; z: number; roll: number; yaw: number; phase: number;
  /** Anodised aluminium of the unibody (frame, back, plateau), toned to each project colour. */
  finish: string;
};

const DEG = Math.PI / 180;

/** left/top are the CSS percentages of .phoneLink; cssRotate is its rotate() in degrees. */
function place(left: number, top: number, cssRotate: number, z: number, yaw: number, phase: number, finish: string): Placement {
  return {
    x: left * GALLERY_WIDTH + DEVICE.width / 2 - GALLERY_WIDTH / 2,
    y: GALLERY_HEIGHT / 2 - top * GALLERY_HEIGHT - DEVICE.height / 2,
    z,
    // CSS rotates clockwise, three.js counter-clockwise.
    roll: -cssRotate * DEG,
    yaw,
    phase,
    finish,
  };
}

const PLACEMENTS: Record<string, Placement> = {
  capple: place(0.34, 0.03, -2, 0.5, 0, 0, "#4a5f8c"),
  wedream: place(0.02, 0.17, -13, 0, 0.2, 2.1, "#6c5a96"),
  focuslock: place(0.68, 0.22, 12, -0.3, -0.2, 4.2, "#5d7a60"),
};

export function getPlacement(slug: string): Placement | undefined {
  return PLACEMENTS[slug];
}

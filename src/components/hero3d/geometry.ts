import {
  BoxGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Shape,
  ShapeGeometry,
} from "three";
import { IPHONE_SCREEN } from "../IPhoneDevice";

// World units. The width matches one hero phone (32% of a 10-unit gallery);
// proportions follow the Figma iPhone 17 Pro frame used by IPhoneDevice.
const WIDTH = 3.2;
const HEIGHT = (WIDTH * 2642) / 1300;
const BODY_WIDTH = WIDTH * (1 - 2 * 0.0076923);
const BODY_RADIUS = 0.164 * BODY_WIDTH;
const BEVEL = 0.06;
const DEPTH = 0.18;
const CURVE_SEGMENTS = 48;

export const DEVICE = { width: WIDTH, height: HEIGHT };
/** z of the flat front glass, with the body centred on z = 0. */
export const FRONT_Z = DEPTH / 2 + BEVEL;

const SCREEN_WIDTH = IPHONE_SCREEN.width * WIDTH;
const SCREEN_HEIGHT = IPHONE_SCREEN.height * HEIGHT;
const ISLAND = { width: 0.2846 * WIDTH, height: 0.0831 * WIDTH, top: 0.0692 * WIDTH };
export const ISLAND_Y = HEIGHT / 2 - ISLAND.top - ISLAND.height / 2;

// Side buttons, as fractions of the device height (top edge, length). -1 = left side.
export const BUTTONS = [
  { side: -1, top: 0.2036, length: 0.0367 },
  { side: -1, top: 0.2752, length: 0.0765 },
  { side: -1, top: 0.3713, length: 0.0765 },
  { side: 1, top: 0.302, length: 0.1188 },
].map(({ side, top, length }) => ({
  x: side * (BODY_WIDTH / 2 + 0.012),
  y: HEIGHT / 2 - (top + length / 2) * HEIGHT,
  length: length * HEIGHT,
}));
export const BUTTON_SIZE = { width: 0.05, depth: 0.11 };

// Back of an iPhone 17 Pro: a full-width camera plateau across the top. Seen from
// the back the lenses sit on the left, so in model space (looking at the front) x > 0.
const BACK_Z = -FRONT_Z;
const PLATEAU = { inset: 0.08, height: 1.9, radius: 0.38, depth: 0.04, bevel: 0.03 };
const PLATEAU_TOP = HEIGHT / 2 - PLATEAU.inset;
export const PLATEAU_Y = PLATEAU_TOP - PLATEAU.height / 2;
const PLATEAU_THICKNESS = PLATEAU.depth + 2 * PLATEAU.bevel;
/** Centre z of the plateau, resting on the back glass. */
export const PLATEAU_Z = BACK_Z - PLATEAU_THICKNESS / 2;
const PLATEAU_BACK = BACK_Z - PLATEAU_THICKNESS;
const LENS_DEPTH = 0.08;
export const LENS = { ring: 0.4, glass: 0.3, z: PLATEAU_BACK - LENS_DEPTH / 2, depth: LENS_DEPTH };
const OUTER = BODY_WIDTH / 2 - 0.6;
export const LENSES = [
  { x: OUTER, y: PLATEAU_TOP - 0.55 },
  { x: OUTER, y: PLATEAU_TOP - 1.45 },
  { x: OUTER - 0.8, y: PLATEAU_TOP - 1.0 },
];
/** Flash and LiDAR on the far side of the plateau. */
export const SENSORS = [
  { x: -BODY_WIDTH / 2 + 0.5, y: PLATEAU_TOP - 0.5, radius: 0.14 },
  { x: -BODY_WIDTH / 2 + 0.5, y: PLATEAU_TOP - 1.45, radius: 0.12 },
].map((sensor) => ({ ...sensor, z: PLATEAU_BACK - 0.005 }));

function roundedRect(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.absarc(x + width - radius, y + radius, radius, -Math.PI / 2, 0, false);
  shape.lineTo(x + width, y + height - radius);
  shape.absarc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2, false);
  shape.lineTo(x + radius, y + height);
  shape.absarc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + radius);
  shape.absarc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5, false);
  return shape;
}

/** Flat rounded rectangle whose UVs span 0..1, so a screenshot fills it edge to edge. */
function roundedPlane(width: number, height: number, radius: number) {
  const geometry = new ShapeGeometry(roundedRect(width, height, radius), CURVE_SEGMENTS);
  const position = geometry.getAttribute("position");
  const uv: number[] = [];
  for (let i = 0; i < position.count; i++) {
    uv.push((position.getX(i) + width / 2) / width, (position.getY(i) + height / 2) / height);
  }
  geometry.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  return geometry;
}

export type PhoneGeometries = ReturnType<typeof createPhoneGeometries>;

/** One set shared by all phones; call dispose() when the scene unmounts. */
export function createPhoneGeometries() {
  // The bevel grows the outline outward, so the extruded shape is shrunk by it.
  const body = new ExtrudeGeometry(
    roundedRect(BODY_WIDTH - 2 * BEVEL, HEIGHT - 2 * BEVEL, BODY_RADIUS - BEVEL),
    { depth: DEPTH, bevelEnabled: true, bevelThickness: BEVEL, bevelSize: BEVEL, bevelSegments: 8, curveSegments: CURVE_SEGMENTS },
  );
  body.translate(0, 0, -DEPTH / 2);
  const plateau = new ExtrudeGeometry(
    roundedRect(BODY_WIDTH - 2 * PLATEAU.inset - 2 * PLATEAU.bevel, PLATEAU.height - 2 * PLATEAU.bevel, PLATEAU.radius - PLATEAU.bevel),
    { depth: PLATEAU.depth, bevelEnabled: true, bevelThickness: PLATEAU.bevel, bevelSize: PLATEAU.bevel, bevelSegments: 6, curveSegments: CURVE_SEGMENTS },
  );
  plateau.translate(0, 0, -PLATEAU.depth / 2);
  // Unit cylinder facing the camera axis; meshes scale it to each lens or sensor.
  const disc = new CylinderGeometry(1, 1, 1, 48);
  disc.rotateX(Math.PI / 2);
  const parts = {
    body,
    plateau,
    disc,
    screen: roundedPlane(SCREEN_WIDTH, SCREEN_HEIGHT, 0.141 * SCREEN_WIDTH),
    /** The front outline: drawn once opaque black, once as the glossy cover glass. */
    glass: roundedPlane(BODY_WIDTH - 2 * BEVEL, HEIGHT - 2 * BEVEL, BODY_RADIUS - BEVEL),
    island: roundedPlane(ISLAND.width, ISLAND.height, ISLAND.height / 2),
    button: new BoxGeometry(1, 1, 1),
  };
  return {
    ...parts,
    dispose: () => Object.values(parts).forEach((geometry) => geometry.dispose()),
  };
}

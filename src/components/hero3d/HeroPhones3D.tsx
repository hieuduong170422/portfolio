"use client";

import { Component, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import {
  AdditiveBlending,
  MathUtils,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PMREMGenerator,
  SRGBColorSpace,
  TextureLoader,
  type Group,
  type Texture,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createPhoneGeometries } from "./geometry";
import { CAMERA_FOV, CAMERA_Z, getPlacement } from "./layout";
import { Phone3D, type PhoneMaterials } from "./Phone3D";
import type { SpinStore } from "./spin";

export type HeroPhone = { slug: string; src: string; showIsland: boolean };

// Matches the hero <Image> width, and is listed in next.config images.imageSizes.
const TEXTURE_WIDTH = 512;
// The HTML phones finish their entrance animation by then; swapping earlier would jump.
const SWAP_AFTER_MS = 1300;
const TILT = { yaw: 0.22, pitch: 0.14, smoothing: 4 };

function textureUrl(src: string) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${TEXTURE_WIDTH}&q=90`;
}

function hasWebGL() {
  try {
    const context = document.createElement("canvas").getContext("webgl2");
    // Release the probe right away; mobile browsers cap live WebGL contexts.
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

/** If WebGL fails mid-render, drop the canvas and leave the HTML phones in place. */
class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("Hero 3D phones disabled, keeping HTML phones:", error);
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function setupEnvironment({ gl, scene }: RootState) {
  // Local studio lighting for metal and glass reflections; no HDR download.
  const pmrem = new PMREMGenerator(gl);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
}

/** iOS may drop the context in the background or under memory pressure; fall back to HTML phones. */
function watchContextLoss(gl: RootState["gl"], onLost: () => void) {
  gl.domElement.addEventListener("webglcontextlost", () => {
    console.warn("Hero 3D phones: WebGL context lost, keeping HTML phones");
    onLost();
  }, { once: true });
}

function Rig({ pointer, motion, children }: { pointer: RefObject<{ x: number; y: number }>; motion: boolean; children: ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    const target = motion ? pointer.current : { x: 0, y: 0 };
    group.rotation.y = MathUtils.damp(group.rotation.y, target.x * TILT.yaw, TILT.smoothing, delta);
    group.rotation.x = MathUtils.damp(group.rotation.x, -target.y * TILT.pitch, TILT.smoothing, delta);
  });
  return <group ref={ref}>{children}</group>;
}

/** Reports readiness once a frame with the textured phones has been drawn. */
function ReadySignal({ onReady }: { onReady: () => void }) {
  const timer = useRef<number | null>(null);
  useFrame(() => {
    if (timer.current !== null) return;
    timer.current = window.setTimeout(onReady, Math.max(0, SWAP_AFTER_MS - performance.now()));
  });
  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);
  return null;
}

function useScreenTextures(phones: HeroPhone[]) {
  const [textures, setTextures] = useState<Texture[] | null>(null);
  const key = phones.map((phone) => phone.src).join("|");
  useEffect(() => {
    let cancelled = false;
    let loaded: Texture[] = [];
    const loader = new TextureLoader();
    Promise.all(key.split("|").map((src) => loader.loadAsync(textureUrl(src))))
      .then((list) => {
        loaded = list;
        list.forEach((texture) => {
          texture.colorSpace = SRGBColorSpace;
          texture.anisotropy = 8;
        });
        if (cancelled) list.forEach((texture) => texture.dispose());
        else setTextures(list);
      })
      .catch((error) => console.warn("Hero 3D phones: screenshots failed to load, keeping HTML phones:", error));
    return () => {
      cancelled = true;
      loaded.forEach((texture) => texture.dispose());
    };
  }, [key]);
  return textures;
}

function usePointer(container: RefObject<HTMLDivElement | null>, enabled: boolean) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!enabled) return;
    function onMove(event: PointerEvent) {
      const rect = container.current?.getBoundingClientRect();
      if (!rect) return;
      pointer.current = {
        x: MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1),
        y: MathUtils.clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1),
      };
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [container, enabled]);
  return pointer;
}

function useInView(container: RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, [container]);
  return inView;
}

export default function HeroPhones3D({ phones, activeSlug, spins, onReady, onFail, className }: {
  phones: HeroPhone[];
  activeSlug: string | null;
  /** Drag state from the phone links, read every frame. */
  spins: RefObject<SpinStore>;
  onReady: () => void;
  /** The scene broke after loading; the caller should bring the HTML phones back. */
  onFail: () => void;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [supported] = useState(hasWebGL);
  const [motion] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [canHover] = useState(() => window.matchMedia("(hover: hover)").matches);
  const textures = useScreenTextures(phones);
  const pointer = usePointer(container, motion && canHover);
  const inView = useInView(container);

  const geometries = useMemo(() => createPhoneGeometries(), []);
  const materials = useMemo<PhoneMaterials>(() => ({
    front: new MeshStandardMaterial({ color: "#050505", metalness: 0, roughness: 0.2 }),
    // Black + additive: only the environment reflection shows, as a sheen over the screen.
    glass: new MeshStandardMaterial({ color: "#000", roughness: 0.06, transparent: true, blending: AdditiveBlending, depthWrite: false, envMapIntensity: 2.2 }),
    island: new MeshBasicMaterial({ color: "#000" }),
    lensRing: new MeshStandardMaterial({ color: "#3a3c40", metalness: 1, roughness: 0.2 }),
    lens: new MeshStandardMaterial({ color: "#07090d", metalness: 0.4, roughness: 0.05 }),
    lensCore: new MeshStandardMaterial({ color: "#1d2c4a", metalness: 0.6, roughness: 0.1, emissive: "#0b1426" }),
    sensor: new MeshStandardMaterial({ color: "#d8d2c0", metalness: 0.2, roughness: 0.45 }),
  }), []);
  useEffect(() => () => {
    geometries.dispose();
    Object.values(materials).forEach((material) => material.dispose());
  }, [geometries, materials]);

  if (!supported) return null;
  return (
    <div ref={container} className={className} aria-hidden="true">
      {textures && (
        <SceneBoundary onError={onFail}>
          <Canvas dpr={[1, 2]} frameloop={inView ? "always" : "never"} gl={{ antialias: true, alpha: true }}
            camera={{ fov: CAMERA_FOV, position: [0, 0, CAMERA_Z] }} onCreated={(state) => {
              setupEnvironment(state);
              watchContextLoss(state.gl, onFail);
            }}>
            <directionalLight position={[3, 5, 8]} intensity={1.2} />
            <Rig pointer={pointer} motion={motion}>
              {phones.map((phone, index) => {
                const placement = getPlacement(phone.slug);
                return placement && (
                  <Phone3D key={phone.slug} slug={phone.slug} spins={spins} placement={placement} screen={textures[index]} showIsland={phone.showIsland}
                    active={activeSlug === phone.slug} motion={motion} geometries={geometries} materials={materials} />
                );
              })}
            </Rig>
            <ReadySignal onReady={onReady} />
          </Canvas>
        </SceneBoundary>
      )}
    </div>
  );
}

"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, MeshStandardMaterial, type Group, type Material, type Texture } from "three";
import {
  BUTTONS, BUTTON_SIZE, FRONT_Z, ISLAND_Y, LENS, LENSES, PLATEAU_Y, PLATEAU_Z, SENSORS,
  type PhoneGeometries,
} from "./geometry";
import type { Placement } from "./layout";
import { getSpin, type SpinStore } from "./spin";

export type PhoneMaterials = { front: Material; glass: Material; island: Material; lensRing: Material; lens: Material; lensCore: Material; sensor: Material };

const FLOAT_AMPLITUDE = 0.07;
const HOVER_LIFT = 0.3;
const HOVER_FORWARD = 1;
const HOVER_SCALE = 1.04;
const SMOOTHING = 7;
const TURN = Math.PI * 2;
/** Fling friction (per second) and the pause before a turned phone faces front again. */
const SPIN_FRICTION = 2.5;
const RETURN_AFTER_MS = 2500;
const RETURN_SMOOTHING = 3;

/** Advances inertia and the ease home, returning whether the phone is turned away. */
function stepSpin(spin: ReturnType<typeof getSpin>, delta: number) {
  if (!spin.dragging) {
    spin.yaw += spin.velocity * delta;
    spin.velocity *= Math.exp(-SPIN_FRICTION * delta);
    spin.pitch = MathUtils.damp(spin.pitch, 0, RETURN_SMOOTHING, delta);
    const resting = Math.abs(spin.velocity) < 0.3 && performance.now() - spin.releasedAt > RETURN_AFTER_MS;
    // Whole turns count as home, so a phone spun twice does not unwind.
    if (resting) spin.yaw = MathUtils.damp(spin.yaw, Math.round(spin.yaw / TURN) * TURN, RETURN_SMOOTHING, delta);
  }
  return spin.dragging || Math.abs(spin.yaw - Math.round(spin.yaw / TURN) * TURN) > 0.05;
}

export function Phone3D({ slug, placement, screen, showIsland, active, motion, spins, geometries, materials }: {
  slug: string;
  placement: Placement;
  screen: Texture;
  showIsland: boolean;
  active: boolean;
  motion: boolean;
  spins: RefObject<SpinStore>;
  geometries: PhoneGeometries;
  materials: PhoneMaterials;
}) {
  const ref = useRef<Group>(null);
  const spinRef = useRef<Group>(null);
  const finish = useMemo(() => new MeshStandardMaterial({ color: placement.finish, metalness: 0.85, roughness: 0.35 }), [placement.finish]);
  useEffect(() => () => finish.dispose(), [finish]);

  // Start at rest, matching the HTML phone it replaces; useFrame eases from here.
  useLayoutEffect(() => {
    ref.current?.position.set(placement.x, placement.y, placement.z);
    ref.current?.rotation.set(0, placement.yaw, placement.roll);
  }, [placement]);

  useFrame((state, delta) => {
    const group = ref.current;
    if (!group || !spinRef.current) return;
    const spin = getSpin(spins.current, slug);
    // A phone being turned stays lifted and upright so it clears its neighbours.
    const lifted = stepSpin(spin, delta) || active;
    spinRef.current.rotation.set(spin.pitch, spin.yaw, 0);
    const float = motion ? Math.sin(state.clock.elapsedTime * 0.9 + placement.phase) * FLOAT_AMPLITUDE : 0;
    const damp = (from: number, to: number) => MathUtils.damp(from, to, SMOOTHING, delta);
    group.position.y = damp(group.position.y, placement.y + float + (lifted ? HOVER_LIFT : 0));
    group.position.z = damp(group.position.z, placement.z + (lifted ? HOVER_FORWARD : 0));
    group.rotation.y = damp(group.rotation.y, lifted ? 0 : placement.yaw);
    group.rotation.z = damp(group.rotation.z, lifted ? 0 : placement.roll);
    group.scale.setScalar(damp(group.scale.x, lifted ? HOVER_SCALE : 1));
  });

  return (
    <group ref={ref}>
      <group ref={spinRef}>
        {/* ExtrudeGeometry groups: 0 = front/back faces, 1 = sides and bevel. */}
        <mesh geometry={geometries.body} material={finish} />
        <mesh geometry={geometries.glass} material={materials.front} position-z={FRONT_Z + 0.001} />
        <mesh geometry={geometries.screen} position-z={FRONT_Z + 0.002}>
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
        {showIsland && <mesh geometry={geometries.island} material={materials.island} position={[0, ISLAND_Y, FRONT_Z + 0.004]} />}
        <mesh geometry={geometries.glass} material={materials.glass} position-z={FRONT_Z + 0.006} />
        {BUTTONS.map((button) => (
          <mesh key={button.y} geometry={geometries.button} material={finish}
            position={[button.x, button.y, 0]} scale={[BUTTON_SIZE.width, button.length, BUTTON_SIZE.depth]} />
        ))}
        <mesh geometry={geometries.plateau} material={finish} position={[0, PLATEAU_Y, PLATEAU_Z]} />
        {LENSES.map((lens) => (
          <group key={`${lens.x}:${lens.y}`} position={[lens.x, lens.y, LENS.z]}>
            <mesh geometry={geometries.disc} material={finish} scale={[LENS.ring, LENS.ring, LENS.depth]} />
            <mesh geometry={geometries.disc} material={materials.lensRing} scale={[LENS.glass + 0.04, LENS.glass + 0.04, LENS.depth + 0.006]} />
            <mesh geometry={geometries.disc} material={materials.lens} scale={[LENS.glass, LENS.glass, LENS.depth + 0.012]} />
            <mesh geometry={geometries.disc} material={materials.lensCore} scale={[LENS.glass * 0.42, LENS.glass * 0.42, LENS.depth + 0.016]} />
          </group>
        ))}
        {SENSORS.map((sensor) => (
          <mesh key={sensor.y} geometry={geometries.disc} material={materials.sensor}
            position={[sensor.x, sensor.y, sensor.z]} scale={[sensor.radius, sensor.radius, 0.01]} />
        ))}
      </group>
    </group>
  );
}

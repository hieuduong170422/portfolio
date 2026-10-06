import type { CSSProperties } from "react";
import styles from "./SolarSystem.module.css";

// Decorative distances and speeds are composed for the hero, not to scale.
const planets = [
  { name: "mercury", orbit: 15, size: 5, color: "#a89c91", period: 24, phase: 3 },
  { name: "venus", orbit: 24, size: 9, color: "#dca86b", period: 36, phase: 19 },
  { name: "earth", orbit: 34, size: 11, color: "#568cc7", period: 48, phase: 31 },
  { name: "mars", orbit: 44, size: 8, color: "#c16c4c", period: 62, phase: 12 },
  { name: "jupiter", orbit: 58, size: 27, color: "#c5a07d", period: 86, phase: 64 },
  { name: "saturn", orbit: 72, size: 22, color: "#d3bd8b", period: 112, phase: 43 },
  { name: "uranus", orbit: 86, size: 15, color: "#83bcc6", period: 140, phase: 115 },
  { name: "neptune", orbit: 100, size: 14, color: "#547bc5", period: 170, phase: 75 },
];

export function SolarSystem() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.stars}>
        {Array.from({ length: 55 }, (_, index) => (
          <i key={index} style={{
            left: `${(index * 37 + 11) % 100}%`,
            top: `${(index * 23 + 7) % 100}%`,
            "--star-size": `${index % 7 === 0 ? 3 : 2}px`,
            "--twinkle-delay": `${-(index % 9)}s`,
          } as CSSProperties} />
        ))}
      </div>
      <div className={styles.system}>
        <div className={styles.sun} />
        {planets.map((planet) => (
          <div key={planet.name} className={styles.orbit} style={{
            "--orbit": `${planet.orbit}%`,
            "--size": `${planet.size}px`,
            "--planet-color": planet.color,
            "--period": `${planet.period}s`,
            "--phase": `${-planet.phase}s`,
            "--initial-angle": `${planet.phase / planet.period * 360}deg`,
          } as CSSProperties}>
            <div className={styles.revolution}>
              <div className={styles.planet} data-planet={planet.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

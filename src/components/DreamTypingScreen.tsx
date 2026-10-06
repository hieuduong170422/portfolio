"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { useIsPresent } from "framer-motion";
import type { AppScreen } from "@/lib/apps";
import { dreamTyping, typingDuration } from "@/lib/dreamTyping";
import styles from "./DreamTypingScreen.module.css";

export function DreamTypingScreen({ screen, sizes, preload = false }: {
  screen: AppScreen;
  sizes: string;
  preload?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const isPresent = useIsPresent();

  return (
    <div className={styles.viewport}>
      <div className={styles.canvas} data-loaded={loaded} data-present={isPresent}
        style={{ "--finish": `${typingDuration}ms` } as CSSProperties}>
        <Image src={screen.src} alt={screen.alt} width={dreamTyping.width} height={dreamTyping.height}
          sizes={sizes} preload={preload} draggable={false} className={styles.image}
          onLoad={() => setLoaded(true)} />
        {dreamTyping.lines.map((line, index) => {
          const characters = Array.from(line.text).length;
          const duration = characters * dreamTyping.millisecondsPerCharacter;
          const delay = dreamTyping.leadIn + dreamTyping.lines.slice(0, index).reduce(
            (total, previous) => total + Array.from(previous.text).length * dreamTyping.millisecondsPerCharacter, 0,
          );
          const style = {
            left: `${line.x / dreamTyping.width * 100}%`,
            top: `${line.y / dreamTyping.height * 100}%`,
            width: `${line.width / dreamTyping.width * 100}%`,
            height: `${line.height / dreamTyping.height * 100}%`,
            "--characters": characters,
            "--duration": `${duration}ms`,
            "--delay": `${delay}ms`,
          } as CSSProperties;
          return <span key={index} className={styles.line} style={style} aria-hidden="true">
            <span className={styles.mask} /><span className={styles.cursor} />
          </span>;
        })}
        <span className={styles.continueCover} aria-hidden="true" />
      </div>
    </div>
  );
}

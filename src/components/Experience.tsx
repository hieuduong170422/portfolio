"use client";

import { useLocale } from "./LocaleProvider";
import { motion } from "framer-motion";
import { getExperience } from "@/lib/experience";
import styles from "./Experience.module.css";

export function Experience() {
  const { t, locale } = useLocale();
  const experience = getExperience(locale);
  return (
    <section
      id="experience"
      className={styles.section}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={styles.heading}
      >
        {t.nav.experience}
      </motion.h2>
      <div className={styles.entries}>
        {experience.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
            className={styles.entry}
          >
            <p className={styles.period}>{entry.period}</p>
            <div className={styles.position}>
              <h3 className={styles.role}>{entry.role}</h3>
              <p className={styles.organization}>{entry.org}</p>
              <ul className={styles.bullets}>
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useLocale } from "./LocaleProvider";
import { motion } from "framer-motion";
import { getExperience } from "@/lib/experience";

export function Experience() {
  const { t, locale } = useLocale();
  const experience = getExperience(locale);
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-[1240px] border-t border-border px-6 py-10 sm:py-12 sm:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-7 text-2xl font-medium tracking-tight"
      >
        {t.nav.experience}
      </motion.h2>
      <div className="flex flex-col gap-6">
        {experience.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
            className="grid gap-2 sm:grid-cols-[180px_1fr]"
          >
            <span className="text-sm text-secondary">{entry.period}</span>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">
                {entry.role} · {entry.org}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

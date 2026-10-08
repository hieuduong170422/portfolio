"use client";

import { useLocale } from "./LocaleProvider";
import { motion } from "framer-motion";
import { CodeXml, Mail, Phone } from "lucide-react";
import { formatMessage } from "@/lib/i18n/messages";
import { site } from "@/lib/site";

export function Contact() {
  const { t } = useLocale();
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[var(--content-width)] border-t border-border px-6 py-10 sm:py-12 text-center sm:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {t.contact.title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href={`mailto:${site.email}`}
          aria-label={`${t.contact.email}: ${site.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[15px] font-medium text-background transition-opacity hover:opacity-90"
        >
          <Mail size={16} aria-hidden="true" /> {site.email}
        </a>
        <a
          href={site.phoneHref}
          aria-label={formatMessage(t.contact.phone, { number: site.phone })}
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[15px] transition-colors hover:border-foreground"
        >
          <Phone size={16} aria-hidden="true" /> {site.phone}
        </a>
        <a
          href={site.gitlab}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[15px] transition-colors hover:border-foreground"
        >
          <CodeXml size={16} aria-hidden="true" /> GitLab
        </a>
        <a
          href={site.cvPath} download
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[15px] transition-colors hover:border-foreground"
        >
          {t.nav.cv}
        </a>
      </motion.div>
    </section>
  );
}

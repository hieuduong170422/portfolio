"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { getApps } from "@/lib/i18n/projects";
import { AppShowcase } from "./AppShowcase";
import visual from "./ProjectVisual.module.css";
import styles from "./ProjectPage.module.css";

/** Case-study page body: back link, project switcher, then the full showcase. */
export function ProjectPage({ slug }: { slug: string }) {
  const { t, locale } = useLocale();
  const apps = getApps(locale);
  const app = apps.find((item) => item.slug === slug);
  if (!app) return null;

  return (
    <section className={styles.page} aria-label={app.name}>
      <div className={styles.bar}>
        <Link href="/#work" className={styles.back}>
          <ArrowLeft size={16} aria-hidden="true" />{t.work.allWork}
        </Link>
        <nav className={styles.switcher} aria-label={t.work.otherProjects}>
          {apps.map((item) => (
            <Link key={item.slug} href={`/work/${item.slug}`} data-project={item.slug}
              aria-current={item.slug === slug ? "page" : undefined}
              className={`${visual.theme} ${styles.switch}`}>
              <span className={styles.dot} aria-hidden="true" />{item.shortName ?? item.name}
            </Link>
          ))}
        </nav>
      </div>
      <AppShowcase key={app.slug} app={app} variant="full" />
    </section>
  );
}

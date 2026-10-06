"use client";

import { useLocale } from "./LocaleProvider";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { getApps } from "@/lib/i18n/projects";
import { AppShowcase } from "./AppShowcase";
import visual from "./ProjectVisual.module.css";
import styles from "./Work.module.css";

const projectSlugs = getApps("en").map((app) => app.slug);

export function Work() {
  const { t, locale } = useLocale();
  const apps = getApps(locale);
  const [active, setActive] = useState(apps[0].slug);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    function followProjectLink() {
      const slug = window.location.hash.slice(1);
      if (!projectSlugs.includes(slug)) return;
      setActive(slug);
      // A hero link or Back/Forward can target a panel that was previously hidden.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => contentRef.current?.scrollIntoView({ block: "start" }));
    }
    // Resolve direct fragment links after hydration, when the panels are mounted.
    frame = requestAnimationFrame(followProjectLink);
    window.addEventListener("hashchange", followProjectLink);
    window.addEventListener("popstate", followProjectLink);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", followProjectLink);
      window.removeEventListener("popstate", followProjectLink);
    };
  }, []);

  function selectProject(slug: string) {
    if (slug === active) return;
    // When switching from further down a long project, return to the shared preview.
    if (contentRef.current && contentRef.current.getBoundingClientRect().top < 140) {
      contentRef.current.scrollIntoView({ block: "start", behavior: "instant" });
    }
    setActive(slug);
    window.history.pushState(null, "", `#${slug}`);
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % apps.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + apps.length) % apps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = apps.length - 1;
    else return;
    event.preventDefault();
    selectProject(apps[next].slug);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus({ preventScroll: true });
  }

  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <div className={styles.heading}>
        <h2 id="work-title">{t.work.label}</h2>
      </div>
      <div ref={tabsRef} className={styles.projectNav} role="tablist" aria-label={t.work.navigation}>
        {apps.map((app, i) => (
          <button key={app.slug} id={`${app.slug}-tab`} type="button" role="tab"
            aria-label={app.name} aria-controls={app.slug} aria-selected={active === app.slug} tabIndex={active === app.slug ? 0 : -1}
            onClick={() => selectProject(app.slug)} onKeyDown={(event) => handleTabKey(event, i)}
            className={visual.theme} data-project={app.slug}>
            <span className={styles.number}>0{i + 1}</span><span>{app.shortName ?? app.name}</span><span className={styles.dot} />
          </button>
        ))}
      </div>
      <div ref={contentRef} className={styles.content}>
        {apps.map((app) => (
          <div key={app.slug} id={app.slug} role="tabpanel" aria-labelledby={`${app.slug}-tab`}
            tabIndex={0} hidden={active !== app.slug} className={styles.panel}>
            {active === app.slug && <AppShowcase app={app} />}
          </div>
        ))}
      </div>
    </section>
  );
}

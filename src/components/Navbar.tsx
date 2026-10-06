"use client";

import { site } from "@/lib/site";
import { useLocale } from "./LocaleProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#work", label: "work" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
] as const;

export function Navbar() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex min-h-[var(--header-height)] max-w-[1240px] items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <a href="#top" className="min-w-0 text-[15px] leading-5 font-semibold tracking-tight sm:text-base">
          {site.name}
        </a>
        <div className="hidden items-center gap-4 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-secondary transition-colors hover:text-foreground"
            >
              {t.nav[link.label]}
            </a>
          ))}
          <a
            href={site.cvPath}
            download
            className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:border-foreground"
          >
            {t.nav.cv}
          </a>
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <div className="flex items-center shrink-0 gap-2 lg:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={site.cvPath}
            download
            className="rounded-full border border-border px-3 py-1.5 text-sm"
          >
            CV
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

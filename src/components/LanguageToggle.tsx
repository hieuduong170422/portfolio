"use client";

import { useLocale } from "./LocaleProvider";
import { locales } from "@/lib/i18n/messages";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div role="group" aria-label={t.nav.language} className="flex shrink-0 items-center rounded-full border border-border p-0.5">
      {locales.map((value) => (
        <button key={value} type="button" lang={value} aria-label={value === "en" ? "English" : "Tiếng Việt"}
          aria-pressed={locale === value} onClick={() => setLocale(value)}
          className={`min-h-8 min-w-9 cursor-pointer rounded-full px-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${locale === value ? "bg-foreground text-background" : "text-secondary hover:text-foreground"}`}>
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

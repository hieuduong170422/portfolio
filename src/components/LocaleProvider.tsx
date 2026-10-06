"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LOCALE_COOKIE, messages, type Locale } from "@/lib/i18n/messages";

const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void } | null>(null);

export function LocaleProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, updateLocale] = useState(initialLocale);

  function setLocale(next: Locale) {
    updateLocale(next);
    // The server uses this preference on the next visit, including the initial HTML and metadata.
    document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  useEffect(() => {
    const meta = messages[locale].meta;
    document.documentElement.lang = locale;
    document.title = meta.title;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute("content", meta.description);
    }
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute("content", meta.title);
    }
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", locale === "vi" ? "vi_VN" : "en_US");
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return { ...context, t: messages[context.locale] };
}

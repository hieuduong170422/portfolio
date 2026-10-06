"use client";

import { useLocale } from "./LocaleProvider";
import { Moon, Sun } from "lucide-react";
import { applyTheme } from "@/lib/theme";
import { useTheme } from "@/lib/useTheme";

export function ThemeToggle() {
  const { t } = useLocale();
  const theme = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? t.nav.light : t.nav.dark}
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-secondary transition-colors hover:text-foreground"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

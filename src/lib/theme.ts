export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "themechange";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
}

/** Inline script source, run before paint to avoid a light/dark flash. */
export const THEME_INIT_SCRIPT = `
(function(){
  try {
    var t = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

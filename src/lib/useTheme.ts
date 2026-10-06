"use client";

import { useSyncExternalStore } from "react";
import {
  THEME_CHANGE_EVENT,
  type Theme,
  getStoredTheme,
} from "@/lib/theme";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, callback);
}

function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getStoredTheme, getServerSnapshot);
}

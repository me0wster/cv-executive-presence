"use client";

import type React from "react";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CatppuccinTheme = "frappe" | "latte" | "macchiato" | "mocha";

export const catppuccinThemes: ReadonlyArray<{
  id: CatppuccinTheme;
  label: string;
}> = [
  { id: "latte", label: "Latte" },
  { id: "frappe", label: "Frappé" },
  { id: "macchiato", label: "Macchiato" },
  { id: "mocha", label: "Mocha" },
];

const THEME_STORAGE_KEY = "ctp-theme";

type ThemeContextValue = {
  theme: CatppuccinTheme;
  setTheme: (theme: CatppuccinTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isCatppuccinTheme(value: string | null): value is CatppuccinTheme {
  return (
    value === "latte" ||
    value === "frappe" ||
    value === "macchiato" ||
    value === "mocha"
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<CatppuccinTheme>(() => {
    if (typeof document === "undefined") {
      return "mocha";
    }

    const fromDataset = document.documentElement.dataset.theme;
    if (isCatppuccinTheme(fromDataset ?? null)) {
      return fromDataset as CatppuccinTheme;
    }

    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isCatppuccinTheme(stored)) {
      return stored as CatppuccinTheme;
    }

    return "mocha";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: CatppuccinTheme) => {
    setThemeState(next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

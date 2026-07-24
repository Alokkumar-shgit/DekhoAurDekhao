import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { districts, defaultTheme, getDistrictBySlug } from "../data/districts";

const ThemeContext = createContext(null);

const applyThemeVars = (theme) => {
  const root = document.documentElement;
  root.style.setProperty("--color-bg", theme.bg);
  root.style.setProperty("--color-bg2", theme.bg2);
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-accent", theme.accent);
  root.style.setProperty("--color-gold", theme.gold);
  root.style.setProperty("--color-text", theme.text);
  root.style.setProperty("--font-display", theme.fontDisplay);
  root.style.setProperty("--font-body", theme.fontBody);
  root.style.setProperty("--font-accent", theme.fontAccent);
};

export function ThemeProvider({ children }) {
  const [districtSlug, setDistrictSlug] = useState(null);

  const activeDistrict = districtSlug ? getDistrictBySlug(districtSlug) : null;
  const theme = activeDistrict ? activeDistrict.theme : defaultTheme;

  useEffect(() => {
    applyThemeVars(theme);
  }, [theme]);

  const selectDistrict = useCallback((slug) => {
    setDistrictSlug(slug);
  }, []);

  const resetTheme = useCallback(() => setDistrictSlug(null), []);

  return (
    <ThemeContext.Provider
      value={{ districtSlug, activeDistrict, theme, districts, selectDistrict, resetTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
};

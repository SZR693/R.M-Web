import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // 1. Priorité à la préférence sauvegardée
    const saved = localStorage.getItem("rm-theme");
    if (saved !== null) return saved === "dark";
    // 2. Sinon, préférence système
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Écoute les changements système si aucune préférence sauvegardée
  useEffect(() => {
    const saved = localStorage.getItem("rm-theme");
    if (saved !== null) return; // préférence manuelle = on ignore le système

    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    matcher.addEventListener("change", handleChange);
    return () => matcher.removeEventListener("change", handleChange);
  }, []);

  // Persiste le choix dans localStorage
  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("rm-theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

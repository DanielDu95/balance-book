// hooks/useDarkMode.ts
import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  // Load preference from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      document.documentElement.classList.toggle("dark", newValue);
      localStorage.setItem("theme", newValue ? "dark" : "light");
      return newValue;
    });
  };

  return { isDark, toggleDarkMode };
}

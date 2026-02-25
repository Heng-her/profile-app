// app/context/ThemeContext.tsx
import { Colors } from "@/constants/theme"; // ✅ Uses your existing theme
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeMode = "light" | "dark" | "system";

// Extend your existing Colors with app-specific UI colors
const getThemeColors = (isDark: boolean) => {
  const base = isDark ? Colors.dark : Colors.light;
  return {
    // From your existing theme
    text: base.text,
    background: base.background,
    tint: base.tint,
    icon: base.icon,
    tabIconDefault: base.tabIconDefault,
    tabIconSelected: base.tabIconSelected,
    
    // Extended UI colors for your app
    card: isDark ? "#1E1E1E" : "#FFFFFF",
    textSecondary: isDark ? "#B0B0B0" : "#666666",
    textMuted: isDark ? "#757575" : "#999999",
    border: isDark ? "#333333" : "#E0E0E0",
    searchBg: isDark ? "#2A2A2A" : "#F2F2F2",
    badgeBg: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.6)",
    favoriteBtnBg: isDark ? "#2A2A2A" : "#FFFFFF",
    favoriteIcon: isDark ? "#FFFFFF" : "#333333",
    shadow: "#000000",
    headerBg: base.background,
  };
};

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  colors: ReturnType<typeof getThemeColors>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@theme_mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>("system");

  // Load saved preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setThemeState(saved);
        }
      } catch (e) {
        console.warn("Failed to load theme:", e);
      }
    };
    loadTheme();
  }, []);

  // Save preference
  const updateTheme = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeState(mode);
    } catch (e) {
      console.warn("Failed to save theme:", e);
    }
  };

  const isDark = theme === "dark" || (theme === "system" && systemScheme === "dark");
  const colors = getThemeColors(isDark);

  const toggleTheme = () => updateTheme(isDark ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme: updateTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
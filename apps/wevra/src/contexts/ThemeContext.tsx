'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ThemeName } from '@tavia/taviad';

interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('gaming');

  const toggleTheme = () => {
    setThemeName((prev) => (prev === 'gaming' ? 'default' : 'gaming'));
  };

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeContextProvider');
  }
  return context;
}

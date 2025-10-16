import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { darkTheme, lightTheme, type ColorMode, type TaviaTheme } from '../theme/theme';

interface ThemeContextValue {
  mode: ColorMode;
  theme: TaviaTheme;
  toggleMode: () => void;
  setMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ColorMode;
  storageKey?: string;
}

export const ThemeProvider = ({
  children,
  defaultMode = 'light',
  storageKey = 'tavia-theme-mode',
}: ThemeProviderProps) => {
  const [mode, setModeState] = useState<ColorMode>(defaultMode);

  // Load saved theme from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedMode = localStorage.getItem(storageKey) as ColorMode | null;
    if (savedMode === 'light' || savedMode === 'dark') {
      setModeState(savedMode);
      document.documentElement.setAttribute('data-theme', savedMode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemMode = prefersDark ? 'dark' : 'light';
      setModeState(systemMode);
      document.documentElement.setAttribute('data-theme', systemMode);
    }
  }, [storageKey]);

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const setMode = useCallback(
    (newMode: ColorMode) => {
      setModeState(newMode);
      document.documentElement.setAttribute('data-theme', newMode);
      localStorage.setItem(storageKey, newMode);
    },
    [storageKey]
  );

  const toggleMode = useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  }, [mode, setMode]);

  const value = useMemo(
    () => ({
      mode,
      theme,
      toggleMode,
      setMode,
    }),
    [mode, theme, toggleMode, setMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export for backward compatibility
export { type TaviaTheme, type ColorMode };

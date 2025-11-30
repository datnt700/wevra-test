import { useMemo } from 'react';
import { getTheme, type ThemeName } from '../themes';
import type { ColorMode } from '../theme';

/**
 * Hook to get a theme by name
 * @param themeName - Theme name ('default' | 'gaming')
 * @param mode - Color mode ('light' | 'dark')
 * @returns The selected theme
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@emotion/react';
 * import { useTheme } from '@eventure/eventured';
 *
 * function App() {
 *   const theme = useTheme('gaming', 'light');
 *
 *   return (
 *     <ThemeProvider theme={theme}>
 *       {children}
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function useTheme(themeName: ThemeName = 'default', mode: ColorMode = 'light') {
  return useMemo(() => getTheme(themeName, mode), [themeName, mode]);
}

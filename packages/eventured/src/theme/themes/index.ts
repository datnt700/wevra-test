import { lightTheme, darkTheme } from '../theme';
import { gamingLightTheme, gamingDarkTheme } from './gaming';
import type { EventureTheme } from '../theme';

/**
 * Available theme names
 */
export type ThemeName = 'default' | 'gaming';

/**
 * Theme registry - maps theme names to their light/dark variants
 */
export const themes: Record<ThemeName, { light: EventureTheme; dark: EventureTheme }> = {
  default: {
    light: lightTheme,
    dark: darkTheme,
  },
  gaming: {
    light: gamingLightTheme,
    dark: gamingDarkTheme,
  },
};

/**
 * Get a theme by name and mode
 * @param name - Theme name ('default' | 'gaming')
 * @param mode - Color mode ('light' | 'dark')
 * @returns The selected theme
 */
export function getTheme(
  name: ThemeName = 'default',
  mode: 'light' | 'dark' = 'light'
): EventureTheme {
  return themes[name][mode];
}

// Re-export individual themes
export { gamingLightTheme, gamingDarkTheme, gamingCssVars } from './gaming';

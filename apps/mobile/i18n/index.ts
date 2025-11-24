/**
 * i18n Configuration for Tavia Mobile
 * Detects user's system language and falls back to English
 */
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import en from './translations/en.json';
import vi from './translations/vi.json';

// Initialize i18n
const i18n = new I18n({
  en,
  vi,
});

// Set the locale once at the beginning of your app
i18n.locale = Localization.getLocales()[0]?.languageCode || 'en';

// Enable fallback to English if translation is missing
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;

// Helper function to get current locale
export const getCurrentLocale = () => i18n.locale;

// Helper function to change locale manually
export const setLocale = (locale: string) => {
  i18n.locale = locale;
};

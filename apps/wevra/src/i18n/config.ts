export const locales = ['en', 'fr', 'vi'] as const;
export const defaultLocale = 'en';
export type Locale = (typeof locales)[number];

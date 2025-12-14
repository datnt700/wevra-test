import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  const raw = await requestLocale;

  const locale: Locale = raw && locales.includes(raw as Locale) ? (raw as Locale) : defaultLocale;
  console.log('i18n request locale =', locale);
  // Load modular i18n files
  const [common, navigation, home, actions, auth, errors, ai, quiz] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/navigation.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/actions.json`),
    import(`../messages/${locale}/auth.json`),
    import(`../messages/${locale}/errors.json`),
    import(`../messages/${locale}/ai.json`),
    import(`../messages/${locale}/quiz.json`),
  ]);

  return {
    locale,
    messages: {
      common: common.default,
      navigation: navigation.default,
      home: home.default,
      actions: actions.default,
      auth: auth.default,
      errors: errors.default,
      ai: ai.default,
      quiz: quiz.default,
    },
  };
});

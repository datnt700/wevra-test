import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { locales, defaultLocale, type Locale } from './config';

export default getRequestConfig(async () => {
  // Get locale from cookie or Accept-Language header
  const cookieStore = await cookies();
  const headersList = await headers();

  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const acceptLanguage = headersList.get('accept-language');

  let locale: string = defaultLocale;

  // Priority: cookie > accept-language header > default
  if (localeCookie && locales.includes(localeCookie as Locale)) {
    locale = localeCookie;
  } else if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0]?.split('-')[0];
    if (preferredLocale && locales.includes(preferredLocale as Locale)) {
      locale = preferredLocale;
    }
  }

  // Load modular i18n files
  const [common, navigation, home, actions, auth, errors, profile, groups] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/navigation.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/actions.json`),
    import(`../messages/${locale}/auth.json`),
    import(`../messages/${locale}/errors.json`),
    import(`../messages/${locale}/profile.json`),
    import(`../messages/${locale}/groups.json`),
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
      profile: profile.default,
      groups: groups.default,
    },
  };
});

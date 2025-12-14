/**
 * Middleware - Auth Protection
 * Protects routes under (user) route group
 */
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n/config';
// export { auth as middleware } from '@lib/auth';
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

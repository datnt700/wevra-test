/**
 * Middleware - Auth Protection
 * Protects routes under (user) route group
 */

export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: ['/journey/:path*'],
};

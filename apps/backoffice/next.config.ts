import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    // typedRoutes: true,
  },
};

export default withNextIntl(nextConfig);

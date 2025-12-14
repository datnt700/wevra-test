import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  compiler: {
    emotion: true,
  },
  experimental: {
    // typedRoutes: true,
    reactCompiler: true,
  },
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
  images: {
    remotePatterns: [],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);

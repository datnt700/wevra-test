import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { ClientProviders } from '@/components/ClientProviders';
import { env } from '@/lib/env';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: 'App Template - Tavia Monorepo',
    template: '%s | App Template',
  },
  description: 'A modern Next.js application template for the Tavia monorepo',
  keywords: ['next.js', 'react', 'typescript', 'template'],
  authors: [{ name: 'Tavia' }],
  creator: 'Tavia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'App Template - Tavia Monorepo',
    description: 'A modern Next.js application template',
    siteName: 'App Template',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://diverse-public.s3.eu-west-3.amazonaws.com/fonts/fonts.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/gotham.css"
        />
      </head>
      <body>
        <ClientProviders>
          <NextIntlClientProvider messages={messages}>
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}

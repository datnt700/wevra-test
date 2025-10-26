import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { ClientProviders } from '@/components/ClientProviders';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Tavia - Café & Restaurant Booking Platform',
    template: '%s | Tavia',
  },
  description:
    'Discover and book amazing cafés and restaurants. Find your perfect spot, reserve a table, and enjoy great experiences.',
  keywords: ['restaurant', 'café', 'booking', 'reservation', 'dining', 'food'],
  authors: [{ name: 'Tavia' }],
  creator: 'Tavia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Tavia - Café & Restaurant Booking Platform',
    description: 'Discover and book amazing cafés and restaurants',
    siteName: 'Tavia',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tavia - Café & Restaurant Booking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tavia - Café & Restaurant Booking Platform',
    description: 'Discover and book amazing cafés and restaurants',
    images: ['/og-image.png'],
    creator: '@tavia',
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
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
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
    <html lang={locale}>
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
            <AnalyticsProvider>
              <LocaleSwitcher />
              {children}
            </AnalyticsProvider>
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}

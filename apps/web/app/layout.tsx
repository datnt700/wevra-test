import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <LocaleSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

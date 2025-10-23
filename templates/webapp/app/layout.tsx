import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webapp Template',
  description: 'Generic Next.js 15 webapp template for Tavia monorepo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/" style={{ color: '#0070f3' }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

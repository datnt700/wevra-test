import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <div style={{ marginTop: '2rem' }}>
        <Link
          href="/about"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block',
          }}
        >
          {t('getStarted')}
        </Link>
      </div>

      <nav style={{ marginTop: '2rem' }}>
        <Link href="/en" style={{ marginRight: '1rem' }}>
          English
        </Link>
        <Link href="/fr">Français</Link>
      </nav>
    </main>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  const t = useTranslations('home');
  const tNav = useTranslations('navigation');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>{t('hero.title')}</h1>
          <p className={styles.subtitle}>{t('hero.subtitle')}</p>
          <button className={styles.cta}>{t('hero.cta')}</button>
        </div>

        <section className={styles.features}>
          <h2 className={styles.featuresTitle}>{t('features.title')}</h2>

          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <h3>{t('features.search.title')}</h3>
              <p>{t('features.search.description')}</p>
            </div>

            <div className={styles.feature}>
              <h3>{t('features.booking.title')}</h3>
              <p>{t('features.booking.description')}</p>
            </div>

            <div className={styles.feature}>
              <h3>{t('features.notifications.title')}</h3>
              <p>{t('features.notifications.description')}</p>
            </div>
          </div>
        </section>

        <nav className={styles.nav}>
          <Link href="/">{tNav('home')}</Link>
          <Link href="/about">{tNav('about')}</Link>
          <Link href="/contact">{tNav('contact')}</Link>
          <Link href="/animations">🎨 Animations Demo</Link>
          <Link href="/analytics-demo">📊 Analytics Demo</Link>
        </nav>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Tavia. All rights reserved.</p>
      </footer>
    </div>
  );
}

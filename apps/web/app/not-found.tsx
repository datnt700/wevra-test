import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>{t('notFound')}</h2>
        <p className={styles.message}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className={styles.button}>
          Go back home
        </Link>
      </div>
    </div>
  );
}

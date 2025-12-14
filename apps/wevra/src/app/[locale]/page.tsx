import HomePageClient from './HomePageClient';

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;
  console.log('LocalePage locale:', typeof locale);
  return <HomePageClient locale={locale} />;
}

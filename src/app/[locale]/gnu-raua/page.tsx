import type { Metadata } from 'next';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { Link as I18nLink } from '@/i18n/navigation';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Gnu-Rauå',
  description: 'Gnu-Rauå - Den litterære siden av Gnu Bar. Poesi, ord og kulturelle opplevelser i Stavanger.',
  openGraph: {
    type: "website",
    url: `${SITE_URL}/gnu-raua`,
    title: "Gnu-Rauå | Gnu Bar Stavanger",
    description: 'Den litterære siden av Gnu Bar. Poesi, ord og kulturelle opplevelser i Stavanger.',
    images: [
      {
        url: "https://gnubar.no/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gnu Bar Stavanger",
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/gnu-raua`,
    languages: {
      "no-NO": `${SITE_URL}/gnu-raua`,
      "en": `${SITE_URL}/en/gnu-raua`,
    },
  },
};

export default function GnuRaua() {
  const t = useTranslations('gnuRaua');

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Gnu-Rauå', url: `${SITE_URL}/gnu-raua` },
  ];

  const structuredData = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <main className="min-h-screen bg-gnu-cream">
      <Script
        id="gnu-raua-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': structuredData,
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-4">{t('pageTitle')}</h1>
        <h2 className="text-3xl font-bold text-gnu-black mb-12">
          {t('subtitle')}
        </h2>

        {/* Content section with dark green background */}
        <div className="bg-gnu-green text-gnu-cream p-8 mb-12 border-4 border-gnu-black">
          <p className="text-lg leading-relaxed mb-6">
            {t('content1')}
          </p>

          <p className="text-lg leading-relaxed mb-6">
            {t('content2')}
          </p>

          <p className="text-lg leading-relaxed">
            {t('content3')}
          </p>
        </div>

        {/* Link to poetry */}
        <div className="text-center">
          <I18nLink
            href="/gnu-raua/poesi"
            className="inline-block bg-gnu-black text-gnu-cream px-8 py-4 font-bold text-lg border-4 border-gnu-black hover:bg-gnu-red hover:text-gnu-cream transition-colors"
          >
            {t('linkToPoetry')}
          </I18nLink>
        </div>
      </div>
    </main>
  );
}

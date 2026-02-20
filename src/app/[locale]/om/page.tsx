import type { Metadata } from 'next';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Om Gnu',
  description: 'Om Gnu Bar - Lær mer om Stavanger sitt beste bar og konsertsted. Vi tilbyr live musikk, quiz, mat og en unik atmosfære.',
  openGraph: {
    type: "website",
    url: `${SITE_URL}/om`,
    title: "Om Gnu | Gnu Bar Stavanger",
    description: 'Om Gnu Bar - Lær mer om Stavanger sitt beste bar og konsertsted.',
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
    canonical: `${SITE_URL}/om`,
    languages: {
      "no-NO": `${SITE_URL}/om`,
      "en": `${SITE_URL}/en/about`,
    },
  },
};

export default function Om() {
  const t = useTranslations('om');
  const common = useTranslations('common');

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Om', url: `${SITE_URL}/om` },
  ];

  const structuredData = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <main className="min-h-screen bg-gnu-cream">
      <Script
        id="om-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': structuredData,
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-12">{t('pageTitle')}</h1>

        {/* Main description */}
        <section className="mb-12">
          <div className="bg-gnu-red border-4 border-gnu-black p-8">
            <p className="text-gnu-cream text-xl leading-relaxed mb-6">
              {t('mainDescription')}
            </p>

            <p className="text-gnu-cream text-xl leading-relaxed">
              {t('secondaryDescription')}
            </p>
          </div>
        </section>

        {/* Features section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-green pb-4">
            {t('offerHeading')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="gnu-card bg-gnu-green border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-3">{t('musicBar.title')}</h3>
              <p className="text-gnu-cream">
                {t('musicBar.description')}
              </p>
            </div>

            <div className="gnu-card bg-gnu-gold border-4 border-gnu-black p-6 text-gnu-black">
              <h3 className="text-gnu-black text-2xl font-bold mb-3">{t('quiz.title')}</h3>
              <p className="text-gnu-black">
                {t('quiz.description')}
              </p>
            </div>

            <div className="gnu-card bg-gnu-olive border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-3">{t('food.title')}</h3>
              <p className="text-gnu-cream">
                {t('food.description')}
              </p>
            </div>

            <div className="gnu-card bg-gnu-red border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-3">{t('view.title')}</h3>
              <p className="text-gnu-cream">
                {t('view.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Opening hours */}
        <section>
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-red pb-4">
            {t('hoursHeading')}
          </h2>

          <div className="bg-gnu-green border-4 border-gnu-black p-8">
            <div className="space-y-3 text-gnu-cream text-lg font-bold">
              <div className="flex justify-between">
                <span>{common('mondayToSunday')}:</span>
                <span>16:00–00:00</span>
              </div>
              <div className="flex justify-between border-t-2 border-gnu-cream pt-3">
                <span>{common('fridayToSaturday')}:</span>
                <span>15:00–02:00</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

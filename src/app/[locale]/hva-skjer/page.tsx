import type { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { EventsList } from './EventsList';
import { RecurringEventsList } from './RecurringEventsList';

export const metadata: Metadata = {
  title: 'Hva Skjer',
  description: 'Se hva som skjer på Gnu Bar - quiz, live musikk, DJ, Music Bingo og mer hver uke i Stavanger.',
  openGraph: {
    type: "website",
    url: `${SITE_URL}/hva-skjer`,
    title: "Hva Skjer | Gnu Bar Stavanger",
    description: 'Se hva som skjer på Gnu Bar - quiz, live musikk, DJ, Music Bingo og mer hver uke i Stavanger.',
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
    canonical: `${SITE_URL}/hva-skjer`,
    languages: {
      "no-NO": `${SITE_URL}/hva-skjer`,
      "en": `${SITE_URL}/en/whats-on`,
    },
  },
};

export default async function HvaSkjer(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hvaSkjer' });

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Hva Skjer', url: `${SITE_URL}/hva-skjer` },
  ];

  const structuredData = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <main className="min-h-screen bg-gnu-cream">
      <Script
        id="hva-skjer-structured-data"
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

        {/* Recurring events from database */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-green pb-4">
            {t('recurringEventsHeading')}
          </h2>
          <RecurringEventsList locale={locale} />
        </section>

        {/* Upcoming events from database */}
        <section>
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-red pb-4">
            {t('upcomingEventsHeading')}
          </h2>
          <EventsList locale={locale} noEventsText={t('noUpcomingEvents')} />
        </section>
      </div>
    </main>
  );
}

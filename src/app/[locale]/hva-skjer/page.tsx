import type { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { EventsList } from './EventsList';

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

        {/* Recurring events section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-green pb-4">
            {t('recurringEventsHeading')}
          </h2>
          <div className="space-y-4">
            <RecurringEventCard day={t('monday')} title="Master Monday" time="" description={t('masterMondayDesc')} type="Konsert" />
            <RecurringEventCard day={t('wednesday')} title={t('musicWednesday')} time="" description={t('musicWednesdayDesc')} type="Konsert" />
            <RecurringEventCard day={t('thursday')} title="Quiz" time="20:00" description={t('quizDesc')} type="Quiz" />
            <RecurringEventCard day={t('friday')} title="GNU-Pølse" time={t('from') + ' 15:00'} description={t('polseDesc')} type="Quiz" />
            <RecurringEventCard day={t('saturday')} title={t('djSaturday')} time="22:00" description={t('djDesc')} type="DJ" />
            <RecurringEventCard day={t('sunday')} title={t('sundaySchool')} time={t('from') + ' 16:00'} description={t('sundaySchoolDesc')} type="Søndagsskolen" />
          </div>
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

function RecurringEventCard({ day, title, time, description, type }: {
  day: string;
  title: string;
  time: string;
  description: string;
  type: string;
}) {
  const getBadgeColor = (type: string): string => {
    switch (type) {
      case 'Quiz': return 'bg-gnu-gold';
      case 'Konsert': return 'bg-gnu-red';
      case 'DJ': return 'bg-gnu-olive';
      case 'Søndagsskolen': return 'bg-gnu-cream text-gnu-black';
      default: return 'bg-gnu-green';
    }
  };

  return (
    <div className="gnu-card bg-gnu-green p-6 border-4 border-gnu-black">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-gnu-cream font-bold text-sm uppercase tracking-wider">{day}</p>
          <h3 className="text-gnu-cream text-2xl font-bold">{title}</h3>
        </div>
        <span className={`gnu-badge px-3 py-1 font-bold text-sm uppercase tracking-wider ${getBadgeColor(type)}`}>
          {type}
        </span>
      </div>
      {time && <p className="text-gnu-cream text-lg font-bold mb-2">{time}</p>}
      <p className="text-gnu-cream">{description}</p>
    </div>
  );
}

import type { Metadata } from 'next';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { Link as I18nLink } from '@/i18n/navigation';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Historie — Fra Skjenkestuen til Gnu',
  description: 'Historien om lokalet i Nedre Strandgate 23 i Stavanger — fra Skjenkestuen (1986–2006) til Gnu Bar. Et rom, to epoker, kontinuerlig bar siden 80-tallet.',
  openGraph: {
    type: "website",
    url: `${SITE_URL}/historie`,
    title: "Historie — Fra Skjenkestuen til Gnu | Gnu Bar Stavanger",
    description: 'Lokalet i Nedre Strandgate har vært bar siden 1986. Først Skjenkestuen. Så Gnu.',
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
    canonical: `${SITE_URL}/historie`,
    languages: {
      "no-NO": `${SITE_URL}/historie`,
      "en": `${SITE_URL}/en/history`,
    },
  },
};

export default function Historie() {
  const t = useTranslations('historie');

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Historie', url: `${SITE_URL}/historie` },
  ];

  const structuredData = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <main className="min-h-screen bg-gnu-cream">
      <Script
        id="historie-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': structuredData,
          }),
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-4">{t('pageTitle')}</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gnu-black mb-12">
          {t('subtitle')}
        </h2>

        {/* Intro */}
        <section className="mb-12">
          <div className="bg-gnu-green text-gnu-cream p-8 border-4 border-gnu-black">
            <p className="text-lg leading-relaxed mb-6">
              {t('intro1')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('intro2')}
            </p>
          </div>
        </section>

        {/* Skjenkestuen */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gnu-black mb-6 border-b-4 border-gnu-red pb-4">
            {t('skjenkeTitle')}
          </h2>
          <div className="space-y-6 text-gnu-black text-lg leading-relaxed">
            <p>{t('skjenke1')}</p>
            <p>{t('skjenke2')}</p>
            <p className="font-bold text-xl">{t('skjenke3')}</p>
            <p>{t('skjenke4')}</p>
            <p>{t('skjenke5')}</p>
          </div>
        </section>

        {/* Transition */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gnu-black mb-6 border-b-4 border-gnu-gold pb-4">
            {t('transitionTitle')}
          </h2>
          <div className="space-y-6 text-gnu-black text-lg leading-relaxed">
            <p>{t('transition1')}</p>
            <p>{t('transition2')}</p>
            <p>{t('transition3')}</p>
          </div>
        </section>

        {/* Gnu */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gnu-black mb-6 border-b-4 border-gnu-green pb-4">
            {t('gnuTitle')}
          </h2>
          <div className="space-y-6 text-gnu-black text-lg leading-relaxed">
            <p>{t('gnu1')}</p>
            <p>{t('gnu2')}</p>
            <p>{t('gnu3')}</p>
          </div>
        </section>

        {/* Rauå */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gnu-black mb-6 border-b-4 border-gnu-olive pb-4">
            {t('rauaTitle')}
          </h2>
          <div className="space-y-6 text-gnu-black text-lg leading-relaxed">
            <p>{t('raua1')}</p>
            <p>{t('raua2')}</p>
            <p>{t('raua3')}</p>
          </div>
        </section>

        {/* Same room */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gnu-black mb-6 border-b-4 border-gnu-red pb-4">
            {t('sameRoomTitle')}
          </h2>
          <div className="bg-gnu-red text-gnu-cream p-8 border-4 border-gnu-black">
            <p className="text-lg leading-relaxed mb-6">{t('sameRoom1')}</p>
            <p className="text-lg leading-relaxed mb-6">{t('sameRoom2')}</p>
            <p className="text-lg leading-relaxed">{t('sameRoom3')}</p>
          </div>
        </section>

        {/* Continuity */}
        <section className="mb-12">
          <div className="space-y-6 text-gnu-black text-lg leading-relaxed">
            <p>{t('continuity1')}</p>
            <p>{t('continuity2')}</p>
            <p>{t('continuity3')}</p>
          </div>
        </section>

        {/* Memory */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gnu-black mb-6 border-b-4 border-gnu-green pb-4">
            {t('memoryTitle')}
          </h2>
          <div className="space-y-6 text-gnu-black text-lg leading-relaxed">
            <p>{t('memory1')}</p>
            <p>{t('memory2')}</p>
            <p className="font-bold">{t('memory3')}</p>
          </div>
        </section>

        {/* Sources */}
        <section className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gnu-black/50 mb-4">
            {t('sourcesTitle')}
          </h3>
          <ul className="space-y-2 text-sm text-gnu-black/60">
            <li>
              <a href="https://www.aftenbladet.no/lokalt/i/wxJWP/over-og-ut-for-skjenkestuen" target="_blank" rel="noopener noreferrer" className="hover:text-gnu-green underline">
                Aftenbladet — Over og ut for Skjenkestuen
              </a>
            </li>
            <li>
              <a href="https://www.aftenbladet.no/lokalt/i/3Ry8v/gravoel-paa-skjenkestuen" target="_blank" rel="noopener noreferrer" className="hover:text-gnu-green underline">
                Aftenbladet — Gravøl på Skjenkestuen
              </a>
            </li>
            <li>
              <a href="https://www.aftenbladet.no/lokalt/i/OzXQ1/gnu-maa-vente-i-toalettkoe" target="_blank" rel="noopener noreferrer" className="hover:text-gnu-green underline">
                Aftenbladet — Gnu må vente i toalettkø
              </a>
            </li>
            <li>
              <a href="https://www.aftenbladet.no/lokalt/i/nVLkd/faa-gauker-paa-gnu" target="_blank" rel="noopener noreferrer" className="hover:text-gnu-green underline">
                Aftenbladet — Få gauker på Gnu
              </a>
            </li>
            <li>
              <a href="https://www.aftenbladet.no/lokalt/i/pP2KwR/naa-har-gnu-en-hel-gnu" target="_blank" rel="noopener noreferrer" className="hover:text-gnu-green underline">
                Aftenbladet — Nå har Gnu en hel gnu
              </a>
            </li>
            <li>
              <a href="https://www.dagsavisen.no/nyheter/passer-ikke-inn-pa-puben/4245503" target="_blank" rel="noopener noreferrer" className="hover:text-gnu-green underline">
                Dagsavisen — Passer ikke inn på puben
              </a>
            </li>
          </ul>
        </section>

        {/* CTA to about */}
        <div className="text-center">
          <I18nLink
            href="/om"
            className="inline-block bg-gnu-black text-gnu-cream px-8 py-4 font-bold text-lg border-4 border-gnu-black hover:bg-gnu-green hover:text-gnu-cream transition-colors"
          >
            {t('linkToAbout')}
          </I18nLink>
        </div>
      </div>
    </main>
  );
}

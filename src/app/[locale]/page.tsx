import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Script from 'next/script';
import { MapPin, Clock, Music, Calendar, BookOpen } from 'lucide-react';
import { Link as I18nLink } from '@/i18n/navigation';
import { generateHomePageSchema, SITE_URL } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const isNorwegian = locale === "no";
  const localeUrl = isNorwegian ? SITE_URL : `${SITE_URL}/en`;

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      type: "website",
      url: localeUrl,
      title: t("homeTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: `${SITE_URL}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Gnu Bar Stavanger",
        },
      ],
    },
    alternates: {
      canonical: localeUrl,
      languages: {
        "nb": SITE_URL,
        "en": `${SITE_URL}/en`,
      },
    },
  };
}

export default async function HomePage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const weeklyEvents = t.raw('home.eventWeekly');
  const structuredData = generateHomePageSchema();

  const eventTypeColors: Record<string, string> = {
    quiz: 'bg-gnu-gold text-gnu-black',
    polse: 'bg-gnu-red text-gnu-cream',
    dj: 'bg-gnu-green text-gnu-cream',
    sundayschool: 'bg-gnu-olive text-gnu-cream',
  };

  return (
    <>
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Hero */}
      <section className="bg-gnu-green text-gnu-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="gnu-headline text-7xl sm:text-8xl md:text-[10rem] text-gnu-cream leading-none mb-6 whitespace-pre-line">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gnu-cream/80 mb-8 max-w-xl leading-relaxed whitespace-pre-line">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <I18nLink
                href="/hva-skjer"
                className="gnu-card bg-gnu-red text-gnu-cream px-6 py-3 font-bold uppercase text-sm tracking-wide hover:bg-gnu-red-light"
              >
                {t('home.heroCtaPrimary')}
              </I18nLink>
              <I18nLink
                href="/booking"
                className="gnu-card bg-gnu-cream text-gnu-black px-6 py-3 font-bold uppercase text-sm tracking-wide"
              >
                {t('home.heroCtaSecondary')}
              </I18nLink>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-8 gnu-stars text-6xl opacity-30 select-none" aria-hidden="true">* *</div>
        <div className="absolute bottom-12 right-24 gnu-stars text-4xl opacity-20 select-none" aria-hidden="true">* * *</div>
      </section>

      {/* Opening Hours */}
      <section className="bg-gnu-gold text-gnu-black py-4 border-y-4 border-gnu-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <div className="flex items-center gap-2 font-bold uppercase text-sm tracking-wide">
            <Clock size={18} />
            <span>{t('common.mondayToSunday')}: 16:00–00:00</span>
          </div>
          <span className="hidden sm:inline font-bold">&bull;</span>
          <div className="font-bold uppercase text-sm tracking-wide">
            {t('common.fridayToSaturday')}: 15:00–02:00
          </div>
        </div>
      </section>

      {/* Weekly Events */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="gnu-headline text-5xl md:text-7xl text-gnu-green mb-12">
            {t('home.weeklyEventsHeading')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyEvents && weeklyEvents.map((event: Record<string, string>, index: number) => (
              <div key={index} className="gnu-card bg-gnu-cream p-6">
                <div className={`gnu-badge ${eventTypeColors[event.type] || 'bg-gnu-green text-gnu-cream'} mb-4`}>
                  {event.date}
                </div>
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <p className="text-gnu-black/60 text-sm">{event.desc}</p>
                <p className="text-gnu-black/40 text-sm mt-1">{event.time}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <I18nLink
              href="/hva-skjer"
              className="inline-block gnu-card bg-gnu-green text-gnu-cream px-8 py-3 font-bold uppercase text-sm tracking-wide"
            >
              {t('home.seeFullProgram')}
            </I18nLink>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-gnu-green py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <I18nLink href="/gnu-sounds" className="gnu-card bg-gnu-cream p-8 group">
            <div className="flex items-center gap-3 mb-4">
              <Music size={28} className="text-gnu-red" />
              <h3 className="text-2xl font-bold uppercase">{t('home.gnuSoundsCard.title')}</h3>
            </div>
            <p className="text-gnu-black/70 mb-4">
              {t('home.gnuSoundsCard.description')}
            </p>
            <span className="font-bold text-gnu-red group-hover:text-gnu-red-light transition-colors uppercase text-sm">
              {t('home.gnuSoundsCard.link')}
            </span>
          </I18nLink>

          <I18nLink href="/gnu-raua" className="gnu-card bg-gnu-cream p-8 group">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={28} className="text-gnu-olive" />
              <h3 className="text-2xl font-bold uppercase">{t('home.gnuRauaCard.title')}</h3>
            </div>
            <p className="text-gnu-black/70 mb-4">
              {t('home.gnuRauaCard.description')}
            </p>
            <span className="font-bold text-gnu-olive group-hover:text-gnu-green transition-colors uppercase text-sm">
              {t('home.gnuRauaCard.link')}
            </span>
          </I18nLink>

          <I18nLink href="/booking" className="gnu-card bg-gnu-cream p-8 group">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={28} className="text-gnu-gold" />
              <h3 className="text-2xl font-bold uppercase">{t('home.bookingCard.title')}</h3>
            </div>
            <p className="text-gnu-black/70 mb-4">
              {t('home.bookingCard.description')}
            </p>
            <span className="font-bold text-gnu-gold group-hover:text-gnu-red transition-colors uppercase text-sm">
              {t('home.bookingCard.link')}
            </span>
          </I18nLink>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="gnu-headline text-5xl md:text-7xl text-gnu-green mb-6">
              {t('home.findUs')}
            </h2>
            <div className="flex items-start gap-3 mb-4">
              <MapPin size={24} className="text-gnu-red mt-1 shrink-0" />
              <div>
                <p className="text-lg font-bold">{t('common.addressStreet')}</p>
                <p className="text-gnu-black/60">{t('common.addressCity')}</p>
                <p className="text-gnu-black/60 mt-1">{t('common.addressLandmark')}</p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Gnu+Bar+Stavanger+Nedre+Strandgate+23"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 gnu-card bg-gnu-green text-gnu-cream px-6 py-3 font-bold uppercase text-sm tracking-wide"
            >
              {t('home.openInMaps')}
            </a>
          </div>
          <div className="gnu-card overflow-hidden gnu-tilt-right">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2101.5!2d5.7333!3d58.9714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463a3549be27ddb5%3A0x7a4e9c7a7f5c7a7a!2sNedre+Strandgate+23%2C+4005+Stavanger!5e0!3m2!1sno!2sno!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gnu Bar location"
            />
          </div>
        </div>
      </section>
    </>
  );
}

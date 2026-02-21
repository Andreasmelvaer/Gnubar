import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { Link as I18nLink } from '@/i18n/navigation';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Gnu-Rauå',
  description: 'Gnu-Rauå — bakenden av en gnu, innramma i gull, på veggen hos Gnu Bar i Stavanger. Stavangers mest unødvendige monument.',
  openGraph: {
    type: "website",
    url: `${SITE_URL}/gnu-raua`,
    title: "Gnu-Rauå | Gnu Bar Stavanger",
    description: 'Stavangers mest unødvendige monument — bakenden av en gnu, innramma i gull.',
    images: [
      {
        url: "https://gnubar.no/images/gnu-raua/raua-gold-frame.jpg",
        width: 1200,
        height: 630,
        alt: "Gnu-Rauå — bakenden innramma i gull",
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

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-4">{t('pageTitle')}</h1>
        <h2 className="text-3xl font-bold text-gnu-black mb-12">
          {t('subtitle')}
        </h2>

        {/* Hero image — the star: Gnu-Rauå in gold frame */}
        <div className="mb-12 border-4 border-gnu-black overflow-hidden">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/images/gnu-raua/raua-gold-frame.jpg"
              alt={t('imageAlt7')}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content section */}
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

        {/* Photo gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Unveiling with the mayor */}
          <div className="border-4 border-gnu-black overflow-hidden">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/gnu-raua/unveiling-mayor.jpg"
                alt={t('imageAlt5')}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Gnu head on wall */}
          <div className="border-4 border-gnu-black overflow-hidden">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/gnu-raua/gnu-head-wall.jpg"
                alt={t('imageAlt6')}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bar interior */}
          <div className="border-4 border-gnu-black overflow-hidden">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/gnu-raua/bar-interior.jpg"
                alt={t('imageAlt1')}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Packed concert */}
          <div className="border-4 border-gnu-black overflow-hidden">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/gnu-raua/packed-concert.jpg"
                alt={t('imageAlt4')}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Acoustic stage */}
          <div className="border-4 border-gnu-black overflow-hidden">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/gnu-raua/acoustic-stage.jpg"
                alt={t('imageAlt2')}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Harbor view */}
          <div className="border-4 border-gnu-black overflow-hidden">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/gnu-raua/harbor-view.jpg"
                alt={t('imageAlt3')}
                fill
                className="object-cover"
              />
            </div>
          </div>
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

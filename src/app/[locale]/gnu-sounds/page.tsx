import type { Metadata } from 'next';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateVideoObjectSchema, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Gnu Sounds',
  description: 'Gnu Sounds - Video og opptak fra konserter og events på Gnu Bar i Stavanger. Se live musikk fra vår scene.',
  openGraph: {
    type: "website",
    url: `${SITE_URL}/gnu-sounds`,
    title: "Gnu Sounds | Gnu Bar Stavanger",
    description: 'Video og opptak fra konserter og events på Gnu Bar i Stavanger.',
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
    canonical: `${SITE_URL}/gnu-sounds`,
    languages: {
      "no-NO": `${SITE_URL}/gnu-sounds`,
      "en": `${SITE_URL}/en/gnu-sounds`,
    },
  },
};

interface VideoEntry {
  artist: string;
  youtubeId: string;
}

const videoEntries: VideoEntry[] = [
  { artist: 'The Essential Ether', youtubeId: '2k2X8IF0j1Y' },
  { artist: 'Auforia', youtubeId: '2zB_5_8gzsY' },
  { artist: 'JollyChimp', youtubeId: 'cAXDGPJ4Eak' },
  { artist: 'The Overalls', youtubeId: 'fWoVsLhENxs' },
  { artist: 'The Flag Is Three', youtubeId: 'HwcdsuZR2fM' },
  { artist: 'Black Catalyst', youtubeId: 'gDDY8WdbQGc' },
  { artist: 'Dogs Offended', youtubeId: 'EE-4esBPKPU' },
  { artist: 'Hundane', youtubeId: 'oR9WCyvsYDU' },
  { artist: 'Martin Rinde', youtubeId: 'IAk_r8EwKu4' },
  { artist: 'Poor Bambi', youtubeId: 'YuUuGD7atsE' },
];

export default function GnuSounds() {
  const t = useTranslations('gnuSounds');

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Gnu Sounds', url: `${SITE_URL}/gnu-sounds` },
  ];

  const videoSchemas = videoEntries.map(entry =>
    generateVideoObjectSchema({
      name: `${entry.artist} // Gnu Sounds // Full Set`,
      description: `Live full set by ${entry.artist} recorded at Gnu Bar Stavanger.`,
      thumbnailUrl: `https://img.youtube.com/vi/${entry.youtubeId}/hqdefault.jpg`,
      uploadDate: '2024-01-01T00:00:00Z',
      embedUrl: `https://www.youtube.com/embed/${entry.youtubeId}`,
    })
  );

  const structuredData = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema(breadcrumbs),
    ...videoSchemas,
  ];

  return (
    <main className="min-h-screen bg-gnu-cream">
      <Script
        id="gnu-sounds-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': structuredData,
          }),
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-6">{t('pageTitle')}</h1>

        <p className="text-gnu-black text-lg mb-12 max-w-2xl">
          {t('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoEntries.map((entry) => (
            <div
              key={entry.youtubeId}
              className="gnu-card bg-gnu-green border-4 border-gnu-black overflow-hidden"
            >
              {/* YouTube embed */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${entry.youtubeId}`}
                  title={`${entry.artist} // Gnu Sounds // Full Set`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Artist name */}
              <div className="p-4">
                <h2 className="text-gnu-cream text-xl font-bold uppercase tracking-wide">
                  {entry.artist}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube channel link */}
        <div className="mt-16 text-center">
          <a
            href="https://www.youtube.com/channel/UCEXU8nJ9D3jglGnWO3payJg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gnu-red text-gnu-cream px-8 py-4 font-bold uppercase tracking-wider hover:bg-red-700 transition-colors border-4 border-gnu-black"
          >
            {t('youtubeLink')}
          </a>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateVideoObjectSchema, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Gnu Sounds',
  description: 'Gnu Sounds - Video og opptak fra konserter og events på Gnu Bar i Stavanger. Se live musikk og dj-sett fra vår scene.',
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
  id: number;
  artist: string;
  date: string;
  description: string;
  youtubeId?: string;
}

const videoEntries: VideoEntry[] = [
  {
    id: 1,
    artist: 'The Meatpackers Live',
    date: '15. februar 2025',
    description: 'En fantastisk kveld med lokale rock\'n\'roll gutta. Energi, sved og gode lyder fra Gnu scenen.',
  },
  {
    id: 2,
    artist: 'Jazz Jam February',
    date: '28. februar 2025',
    description: 'Løs og ledig jazzsesjon med musikere fra hele Stavanger. En sjeldent opptak fra åpen scenekvelder.',
  },
  {
    id: 3,
    artist: 'Vinyl Nights Special',
    date: '1. mars 2025',
    description: 'Highlights fra vår klassiske Vinyl Listening Party-serier. Varme øremuskler og kjølig utstyr.',
  },
  {
    id: 4,
    artist: 'DJ Set: Retrowave Evening',
    date: '7. mars 2025',
    description: 'En DJ-master tar oss gjennom 80-tallet med moderne twist. Dansbar groove hele kvelden.',
  },
];

export default function GnuSounds() {
  const t = useTranslations('gnuSounds');

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Gnu Sounds', url: `${SITE_URL}/gnu-sounds` },
  ];

  const videoSchemas = videoEntries.map(entry =>
    generateVideoObjectSchema({
      name: entry.artist,
      description: entry.description,
      thumbnailUrl: 'https://gnubar.no/images/og-image.png',
      uploadDate: new Date(entry.date).toISOString(),
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
        <h1 className="gnu-headline text-gnu-black mb-12">{t('pageTitle')}</h1>

        <p className="text-gnu-black text-lg mb-12 max-w-2xl">
          {t('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoEntries.map((entry) => (
            <div
              key={entry.id}
              className="gnu-card bg-gnu-green border-4 border-gnu-black overflow-hidden"
            >
              {/* Video placeholder */}
              <div className="w-full bg-gnu-black h-48 flex items-center justify-center text-gnu-cream text-center p-4">
                <div>
                  <p className="text-sm uppercase tracking-wider font-bold mb-2">Videoavspilling</p>
                  <p className="text-xs">YouTube embed kommer her</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-gnu-cream text-2xl font-bold mb-2">{entry.artist}</h2>
                <p className="text-gnu-cream font-bold text-sm uppercase tracking-wider mb-4">
                  {entry.date}
                </p>
                <p className="text-gnu-cream">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

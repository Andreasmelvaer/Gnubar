import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gnu Sounds',
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
  return (
    <main className="min-h-screen bg-gnu-cream">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-12">Gnu Sounds</h1>

        <p className="text-gnu-black text-lg mb-12 max-w-2xl">
          Videoopptak fra Gnu sine beste musikalske stunder. Konserter, jam-sesjoner, og uforglemmelige kveldinger.
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

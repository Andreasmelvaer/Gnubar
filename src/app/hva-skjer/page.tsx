import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hva Skjer',
};

interface Event {
  id: number;
  date: string;
  title: string;
  time: string;
  type: 'Quiz' | 'Konsert' | 'DJ' | 'Music Bingo' | 'Vinyl Listening Party' | 'Søndagsskolen' | 'Jazz Jam';
  description: string;
}

const recurringEvents: Event[] = [
  {
    id: 1,
    date: 'Torsdag',
    title: 'Quiz',
    time: '20:00',
    type: 'Quiz',
    description: 'Quiz hver torsdag! NESTEN!! Premie til vinnerlaget.',
  },
  {
    id: 2,
    date: 'Fredag',
    title: 'GNU-Pølse',
    time: 'fra 15:00',
    type: 'Quiz',
    description: 'Pølsefredag på Gnu. Berømte GNU-pølser fra baren åpner.',
  },
  {
    id: 3,
    date: 'Lørdag',
    title: 'DJ-Lørdag',
    time: '22:00',
    type: 'DJ',
    description: 'DJ i baren hver lørdag kveld.',
  },
  {
    id: 4,
    date: 'Søndag',
    title: 'Søndagsskolen',
    time: 'fra 16:00',
    type: 'Søndagsskolen',
    description: 'Søker nye medlemmer! Hver søndag på Gnu.',
  },
];

const upcomingEvents: Event[] = [
  {
    id: 10,
    date: '25. februar',
    title: 'Vinyl Listening Party: The Who',
    time: '20:00',
    type: 'Vinyl Listening Party',
    description: 'Vi lytter til klassikeren "Tommy" på vinyl. Øl og god selskap garantert.',
  },
  {
    id: 11,
    date: '28. februar',
    title: 'Jazz Jam Session',
    time: '21:00',
    type: 'Jazz Jam',
    description: 'Løs og ledig jazzsesjon. Bring ditt instrument eller bare ørene dine.',
  },
  {
    id: 12,
    date: '4. mars',
    title: 'Søndagsskolen: Classic Rock',
    time: '19:00',
    type: 'Søndagsskolen',
    description: 'Tema: Ledende klassisk rockbands. Læring og underholdning blandet.',
  },
  {
    id: 13,
    date: '7. mars',
    title: 'Konsertkvelder: The Meatpackers',
    time: '21:00',
    type: 'Konsert',
    description: 'Lokal rock\'n\'roll band med kjemisk energi og råe lyder.',
  },
  {
    id: 14,
    date: '11. mars',
    title: 'Music Bingo',
    time: '20:00',
    type: 'Music Bingo',
    description: 'Bingo møter musikk. Ørene dine vil ha det moro!',
  },
];

const getBadgeColor = (type: string): string => {
  switch (type) {
    case 'Quiz':
      return 'bg-gnu-gold';
    case 'Konsert':
      return 'bg-gnu-red';
    case 'DJ':
      return 'bg-gnu-olive';
    case 'Music Bingo':
      return 'bg-gnu-gold';
    case 'Vinyl Listening Party':
      return 'bg-gnu-green';
    case 'Søndagsskolen':
      return 'bg-gnu-cream text-gnu-black';
    case 'Jazz Jam':
      return 'bg-gnu-red';
    default:
      return 'bg-gnu-green';
  }
};

export default function HvaSkjer() {
  return (
    <main className="min-h-screen bg-gnu-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-12">Hva Skjer</h1>

        {/* Faste innslag section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-green pb-4">
            Faste Innslag
          </h2>
          <div className="space-y-4">
            {recurringEvents.map((event) => (
              <div
                key={event.id}
                className="gnu-card bg-gnu-green p-6 border-4 border-gnu-black"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-gnu-cream font-bold text-sm uppercase tracking-wider">
                      {event.date}
                    </p>
                    <h3 className="text-gnu-cream text-2xl font-bold">{event.title}</h3>
                  </div>
                  <span className={`gnu-badge px-3 py-1 font-bold text-sm uppercase tracking-wider ${getBadgeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-gnu-cream text-lg font-bold mb-2">{event.time}</p>
                <p className="text-gnu-cream">{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kommende arrangementer */}
        <section>
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-red pb-4">
            Kommende Arrangementer
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="gnu-card bg-gnu-red p-6 border-4 border-gnu-black"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-gnu-cream font-bold text-sm uppercase tracking-wider">
                      {event.date}
                    </p>
                    <h3 className="text-gnu-cream text-2xl font-bold">{event.title}</h3>
                  </div>
                  <span className={`gnu-badge px-3 py-1 font-bold text-sm uppercase tracking-wider ${getBadgeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-gnu-cream text-lg font-bold mb-2">{event.time}</p>
                <p className="text-gnu-cream">{event.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

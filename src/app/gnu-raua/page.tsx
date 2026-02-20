import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gnu-Rauå',
};

export default function GnuRaua() {
  return (
    <main className="min-h-screen bg-gnu-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-4">Gnu-Rauå</h1>
        <h2 className="text-3xl font-bold text-gnu-black mb-12">
          Stavangers mest unødvendige monument — og hvorfor det betyr noe
        </h2>

        {/* Content section with dark green background */}
        <div className="bg-gnu-green text-gnu-cream p-8 mb-12 border-4 border-gnu-black">
          <p className="text-lg leading-relaxed mb-6">
            Gnu-Rauå er mer enn bare et monument av skum og pels. Det er en symbol på det uventede, 
            det absurde, og det som gjør Stavanger til en helt spesiell by. Her på Gnu kan vi sitje 
            og dele historier om en rau som aldri levde, men som lever videre i hjertene våre.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Den fulle historien kommer snart. For nå vet vi at Gnu-Rauå holder på å skrive sin egen 
            legende, en kapittel om gangen, en skål om gangen, og en eller annen sjalu kjærlighet 
            til denne byen og denne flokken.
          </p>

          <p className="text-lg leading-relaxed">
            Vilkommen til monumentet som ingen så komme, men som alle trenger.
          </p>
        </div>

        {/* Link to poetry */}
        <div className="text-center">
          <Link
            href="/gnu-raua/poesi"
            className="inline-block bg-gnu-black text-gnu-cream px-8 py-4 font-bold text-lg border-4 border-gnu-black hover:bg-gnu-red hover:text-gnu-cream transition-colors"
          >
            Les Rauspikka Poesi →
          </Link>
        </div>
      </div>
    </main>
  );
}

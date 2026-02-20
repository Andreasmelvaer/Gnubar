import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Om Gnu',
};

export default function Om() {
  return (
    <main className="min-h-screen bg-gnu-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-12">Om Gnu</h1>

        {/* Main description */}
        <section className="mb-12">
          <div className="bg-gnu-red border-4 border-gnu-black p-8">
            <p className="text-gnu-cream text-xl leading-relaxed mb-6">
              Gnu er en rock'n'roll bar som ligger ved Vågen med fantastisk utsikt over havnen. 
              Vi er kjent for våre berømte pølser, hyggelige quizer, og live musikk som får folk 
              til å danse selv når de bare vil drikke øl.
            </p>

            <p className="text-gnu-cream text-xl leading-relaxed">
              På Gnu kan du sitte og se utover Vågen, på alle de andre flokkdyrene.
            </p>
          </div>
        </section>

        {/* Features section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-green pb-4">
            Det vi tilbyr
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="gnu-card bg-gnu-green border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-3">Musikkbar</h3>
              <p className="text-gnu-cream">
                Live konserter, jazz jam-sesjoner, DJ-kveldinger, og vinyl listening parties. 
                Musikk er livsblod på Gnu.
              </p>
            </div>

            <div className="gnu-card bg-gnu-gold border-4 border-gnu-black p-6 text-gnu-black">
              <h3 className="text-gnu-black text-2xl font-bold mb-3">Quiz & Underholdning</h3>
              <p className="text-gnu-black">
                Torsdagsquizen er berømt. Bingo, musikk-trivia, og andre morsome aktiviteter året rundt.
              </p>
            </div>

            <div className="gnu-card bg-gnu-olive border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-3">Mat & Drikke</h3>
              <p className="text-gnu-cream">
                Berømte pølser, godt utvalg av øl og brennevin, og det som trengs for å holde energien oppe.
              </p>
            </div>

            <div className="gnu-card bg-gnu-red border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-3">Utsikt & Miljø</h3>
              <p className="text-gnu-cream">
                Havnebyutsikt fra Stavanger. Hyggelig brutalistisk interiør og en flokkmentalitet som varmer.
              </p>
            </div>
          </div>
        </section>

        {/* Opening hours */}
        <section>
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-red pb-4">
            Åpningstider
          </h2>

          <div className="bg-gnu-green border-4 border-gnu-black p-8">
            <div className="space-y-3 text-gnu-cream text-lg font-bold">
              <div className="flex justify-between">
                <span>Man/Tir/Ons/Tor/Søn:</span>
                <span>16:00–00:00</span>
              </div>
              <div className="flex justify-between border-t-2 border-gnu-cream pt-3">
                <span>Fre/Lør:</span>
                <span>15:00–02:00</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

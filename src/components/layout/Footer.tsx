import Link from 'next/link';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gnu-black text-gnu-cream">
      {/* Opening hours banner */}
      <div className="bg-gnu-red text-gnu-cream py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm font-bold uppercase tracking-wide">
          <span className="flex items-center gap-2">
            <Clock size={16} />
            Man/Tir/Ons/Tor/Søn: 16:00–00:00
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Fre/Lør: 15:00–02:00</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Brand */}
        <div>
          <h2 className="gnu-headline text-5xl text-gnu-gold mb-4">Gnu Bar</h2>
          <p className="text-gnu-cream/70 leading-relaxed">
            Stavangers mest unødvendige bar — siden 2016.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="font-bold uppercase text-sm tracking-wide text-gnu-gold mb-4">Sider</h3>
          <nav className="flex flex-col gap-2">
            <Link href="/hva-skjer" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">Hva skjer</Link>
            <Link href="/gnu-sounds" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">Gnu Sounds</Link>
            <Link href="/gnu-raua" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">Gnu-Rauå</Link>
            <Link href="/om" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">Om Gnu</Link>
            <Link href="/booking" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">Booking & Kontakt</Link>
          </nav>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="font-bold uppercase text-sm tracking-wide text-gnu-gold mb-4">Kontakt</h3>
          <div className="flex flex-col gap-3 text-gnu-cream/70">
            <a
              href="https://maps.google.com/?q=Nedre+Strandgate+23+Stavanger"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-gnu-gold transition-colors"
            >
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <span>Nedre Strandgate 23<br />4005 Stavanger</span>
            </a>
            <a href="tel:+4751567300" className="flex items-center gap-2 hover:text-gnu-gold transition-colors">
              <Phone size={18} className="shrink-0" />
              51 56 73 00
            </a>
            <a
              href="https://instagram.com/gnu.bar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gnu-gold transition-colors"
            >
              <Instagram size={18} className="shrink-0" />
              @gnu.bar
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gnu-cream/10 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gnu-cream/40 text-xs">
          © {new Date().getFullYear()} Gnu Bar, Stavanger. Alle rettigheter reservert.
        </div>
      </div>
    </footer>
  );
}

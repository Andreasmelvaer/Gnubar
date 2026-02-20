'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/hva-skjer', label: 'Hva skjer' },
  { href: '/gnu-sounds', label: 'Gnu Sounds' },
  { href: '/gnu-raua', label: 'Gnu-Rauå' },
  { href: '/om', label: 'Om Gnu' },
  { href: '/booking', label: 'Booking' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gnu-green text-gnu-cream sticky top-0 z-50 border-b-4 border-gnu-black">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/logo.png"
            alt="Gnu Bar"
            width={120}
            height={60}
            className="h-10 md:h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gnu-cream hover:text-gnu-gold transition-colors font-bold uppercase text-sm tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          {/* Language toggle */}
          <div className="flex items-center gap-1 ml-4 border-2 border-gnu-cream rounded">
            <button className="px-2 py-1 text-xs font-bold bg-gnu-cream text-gnu-green">NO</button>
            <button className="px-2 py-1 text-xs font-bold text-gnu-cream hover:text-gnu-gold transition-colors">EN</button>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gnu-cream"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden bg-gnu-green border-t-2 border-gnu-olive px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-gnu-cream hover:text-gnu-gold font-bold uppercase text-lg border-b border-gnu-olive"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 mt-4">
            <button className="px-3 py-1 text-sm font-bold bg-gnu-cream text-gnu-green">NO</button>
            <button className="px-3 py-1 text-sm font-bold text-gnu-cream border border-gnu-cream">EN</button>
          </div>
        </nav>
      )}
    </header>
  );
}

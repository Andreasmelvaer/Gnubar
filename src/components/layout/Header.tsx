'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, Link as I18nLink } from '@/i18n/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');

  const navLinks: Array<{ href: '/' | '/hva-skjer' | '/gnu-sounds' | '/gnu-raua' | '/om' | '/historie' | '/booking', labelKey: string }> = [
    { href: '/hva-skjer', labelKey: 'hvaSkjer' },
    { href: '/gnu-sounds', labelKey: 'gnuSounds' },
    { href: '/gnu-raua', labelKey: 'gnuRaua' },
    { href: '/om', labelKey: 'omGnu' },
    { href: '/historie', labelKey: 'historie' },
    { href: '/booking', labelKey: 'booking' },
  ];

  // Current pathname (without locale prefix) for language switching
  const currentPath = (pathname || '/') as '/';

  return (
    <header className="bg-gnu-green text-gnu-cream sticky top-0 z-50 border-b-4 border-gnu-black">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <I18nLink href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/logo.png"
            alt="Gnu Bar"
            width={120}
            height={60}
            className="h-10 md:h-12 w-auto"
            priority
          />
        </I18nLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <I18nLink
              key={link.href}
              href={link.href}
              className="text-gnu-cream hover:text-gnu-gold transition-colors font-bold uppercase text-sm tracking-wide"
            >
              {t(link.labelKey as any)}
            </I18nLink>
          ))}
          {/* Language toggle */}
          <div className="flex items-center gap-1 ml-4 border-2 border-gnu-cream rounded">
            <I18nLink
              href={currentPath}
              locale="no"
              className={`px-2 py-1 text-xs font-bold ${
                locale === 'no'
                  ? 'bg-gnu-cream text-gnu-green'
                  : 'text-gnu-cream hover:text-gnu-gold transition-colors'
              }`}
            >
              NO
            </I18nLink>
            <I18nLink
              href={currentPath}
              locale="en"
              className={`px-2 py-1 text-xs font-bold ${
                locale === 'en'
                  ? 'bg-gnu-cream text-gnu-green'
                  : 'text-gnu-cream hover:text-gnu-gold transition-colors'
              }`}
            >
              EN
            </I18nLink>
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
            <I18nLink
              key={link.href}
              href={link.href}
              className="block py-3 text-gnu-cream hover:text-gnu-gold font-bold uppercase text-lg border-b border-gnu-olive"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.labelKey as any)}
            </I18nLink>
          ))}
          <div className="flex items-center gap-2 mt-4">
            <I18nLink
              href={currentPath}
              locale="no"
              className={`px-3 py-1 text-sm font-bold ${
                locale === 'no'
                  ? 'bg-gnu-cream text-gnu-green'
                  : 'text-gnu-cream border border-gnu-cream'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              NO
            </I18nLink>
            <I18nLink
              href={currentPath}
              locale="en"
              className={`px-3 py-1 text-sm font-bold ${
                locale === 'en'
                  ? 'bg-gnu-cream text-gnu-green'
                  : 'text-gnu-cream border border-gnu-cream'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              EN
            </I18nLink>
          </div>
        </nav>
      )}
    </header>
  );
}


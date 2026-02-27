import { useTranslations } from 'next-intl';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';
import { Link as I18nLink } from '@/i18n/navigation';
import { NewsletterSignup } from '@/components/NewsletterSignup';

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gnu-black text-gnu-cream">
      {/* Opening hours banner */}
      <div className="bg-gnu-red text-gnu-cream py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm font-bold uppercase tracking-wide">
          <span className="flex items-center gap-2">
            <Clock size={16} />
            {t('common.mondayToSunday')}: 16:00–00:00
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span>{t('common.fridayToSaturday')}: 15:00–02:00</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Brand */}
        <div>
          <h2 className="gnu-headline text-5xl text-gnu-gold mb-4">Gnu Bar</h2>
          <p className="text-gnu-cream/70 leading-relaxed">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="font-bold uppercase text-sm tracking-wide text-gnu-gold mb-4">
            {t('footer.sectionLinks')}
          </h3>
          <nav className="flex flex-col gap-2">
            <I18nLink href="/hva-skjer" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">
              {t('nav.hvaSkjer')}
            </I18nLink>
            <I18nLink href="/gnu-sounds" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">
              {t('nav.gnuSounds')}
            </I18nLink>
            <I18nLink href="/gnu-raua" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">
              {t('nav.gnuRaua')}
            </I18nLink>
            <I18nLink href="/om" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">
              {t('nav.omGnu')}
            </I18nLink>
            <I18nLink href="/historie" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">
              {t('nav.historie')}
            </I18nLink>
            <I18nLink href="/booking" className="text-gnu-cream/70 hover:text-gnu-gold transition-colors">
              {t('nav.booking')}
            </I18nLink>
          </nav>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="font-bold uppercase text-sm tracking-wide text-gnu-gold mb-4">
            {t('footer.sectionContact')}
          </h3>
          <div className="flex flex-col gap-3 text-gnu-cream/70">
            <a
              href="https://maps.google.com/?q=Nedre+Strandgate+23+Stavanger"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-gnu-gold transition-colors"
            >
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <span>{t('common.address')}</span>
            </a>
            <a href="tel:+4751567300" className="flex items-center gap-2 hover:text-gnu-gold transition-colors">
              <Phone size={18} className="shrink-0" />
              {t('common.phone')}
            </a>
            <a
              href="https://instagram.com/gnu.bar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gnu-gold transition-colors"
            >
              <Instagram size={18} className="shrink-0" />
              {t('common.instagram')}
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter signup */}
      <div className="border-t border-gnu-cream/10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-bold uppercase text-sm tracking-wide text-gnu-gold mb-3">
              {t('footer.newsletterHeading')}
            </h3>
            <NewsletterSignup
              label={t('footer.newsletterHeading')}
              placeholder={t('footer.newsletterPlaceholder')}
              successText={t('footer.newsletterSuccess')}
              buttonText={t('footer.newsletterButton')}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gnu-cream/10 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gnu-cream/40 text-xs">
          {t('footer.copyright', { year })}
        </div>
      </div>
    </footer>
  );
}


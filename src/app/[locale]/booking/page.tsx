'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import Script from 'next/script';

export default function BookingPage() {
  const t = useTranslations('booking');
  const common = useTranslations('common');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    eventType: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic will be added later
    console.log('Form data:', formData);
  };

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Booking', url: `${SITE_URL}/booking` },
  ];

  const structuredData = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <main className="min-h-screen bg-gnu-cream">
      <Script
        id="booking-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': structuredData,
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-12">{t('pageTitle')}</h1>

        {/* Booking info section */}
        <section className="mb-12">
          <div className="bg-gnu-black text-gnu-cream p-8 border-4 border-gnu-black mb-8">
            <h2 className="text-3xl font-bold mb-6">{t('bookingInfoTitle')}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {t('bookingInfoText1')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('bookingInfoText2')}
            </p>
          </div>
        </section>

        {/* Contact details */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-green pb-4">
            {t('contactHeading')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="gnu-card bg-gnu-green border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-4">{t('barManager')}</h3>
              <p className="text-gnu-cream text-lg font-bold mb-2">Andrea</p>
              <p className="text-gnu-cream text-sm uppercase tracking-wider">
                {t('barManagerSubtitle')}
              </p>
            </div>

            <div className="gnu-card bg-gnu-red border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-4">{t('phone')}</h3>
              <p className="text-gnu-cream text-2xl font-bold">51 56 73 00</p>
            </div>

            <div className="gnu-card bg-gnu-gold text-gnu-black border-4 border-gnu-black p-6">
              <h3 className="text-gnu-black text-2xl font-bold mb-4">{t('address')}</h3>
              <p className="text-gnu-black text-lg font-bold">Nedre Strandgate 23</p>
              <p className="text-gnu-black">Stavanger, Norge</p>
            </div>

            <div className="gnu-card bg-gnu-olive border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-4">{t('hours')}</h3>
              <p className="text-gnu-cream text-sm">
                {common('mondayToSunday')}: 16:00–00:00<br />
                {common('fridayToSaturday')}: 15:00–02:00
              </p>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section>
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-red pb-4">
            {t('formTitle')}
          </h2>

          <form onSubmit={handleSubmit} className="bg-gnu-black border-4 border-gnu-black p-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gnu-cream font-bold mb-2 uppercase tracking-wider">
                {t('formName')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gnu-cream bg-gnu-cream text-gnu-black font-bold"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gnu-cream font-bold mb-2 uppercase tracking-wider">
                {t('formEmail')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gnu-cream bg-gnu-cream text-gnu-black font-bold"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="date" className="block text-gnu-cream font-bold mb-2 uppercase tracking-wider">
                {t('formDate')}
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gnu-cream bg-gnu-cream text-gnu-black font-bold"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="eventType" className="block text-gnu-cream font-bold mb-2 uppercase tracking-wider">
                {t('formEventType')}
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gnu-cream bg-gnu-cream text-gnu-black font-bold"
                required
              >
                <option value="">{t('formSelectPlaceholder')}</option>
                <option value="konsert">{t('eventTypeOptions.concert')}</option>
                <option value="dj">{t('eventTypeOptions.dj')}</option>
                <option value="privat">{t('eventTypeOptions.private')}</option>
                <option value="bedrift">{t('eventTypeOptions.corporate')}</option>
                <option value="bryllup">{t('eventTypeOptions.wedding')}</option>
                <option value="annet">{t('eventTypeOptions.other')}</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gnu-cream font-bold mb-2 uppercase tracking-wider">
                {t('formMessage')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gnu-cream bg-gnu-cream text-gnu-black font-bold"
                placeholder={t('formPlaceholder')}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-gnu-red text-gnu-cream px-8 py-4 font-bold text-lg border-4 border-gnu-red hover:bg-gnu-gold hover:text-gnu-black transition-colors uppercase tracking-wider"
            >
              {t('formSubmit')}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

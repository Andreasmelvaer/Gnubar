'use client';

import type { Metadata } from 'next';
import { FormEvent, useState } from 'react';

// Note: Next.js Metadata is not available in client components
// For this client component, metadata should be exported from a separate server component wrapper
// But keeping it here for reference
const metadata = {
  title: 'Booking & Kontakt',
};

export default function Booking() {
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

  return (
    <main className="min-h-screen bg-gnu-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="gnu-headline text-gnu-black mb-12">Booking & Kontakt</h1>

        {/* Booking info section */}
        <section className="mb-12">
          <div className="bg-gnu-black text-gnu-cream p-8 border-4 border-gnu-black mb-8">
            <h2 className="text-3xl font-bold mb-6">Vil du booke Gnu?</h2>
            <p className="text-lg leading-relaxed mb-6">
              Gnu disponerer av for private eventer, bedriftsfester, konserter, og andre arrangementer. 
              Vi har erfaring med alt fra små møter til større festivaler.
            </p>
            <p className="text-lg leading-relaxed">
              Kontakt oss med detaljer om ditt arrangement, så kan vi diskutere muligheter og pris.
            </p>
          </div>
        </section>

        {/* Contact details */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-green pb-4">
            Kontaktinformasjon
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="gnu-card bg-gnu-green border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-4">Barsjef</h3>
              <p className="text-gnu-cream text-lg font-bold mb-2">Andrea</p>
              <p className="text-gnu-cream text-sm uppercase tracking-wider">
                Bar Manager & Booking Contact
              </p>
            </div>

            <div className="gnu-card bg-gnu-red border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-4">Telefon</h3>
              <p className="text-gnu-cream text-2xl font-bold">51 56 73 00</p>
            </div>

            <div className="gnu-card bg-gnu-gold text-gnu-black border-4 border-gnu-black p-6">
              <h3 className="text-gnu-black text-2xl font-bold mb-4">Adresse</h3>
              <p className="text-gnu-black text-lg font-bold">Nedre Strandgate 23</p>
              <p className="text-gnu-black">Stavanger, Norge</p>
            </div>

            <div className="gnu-card bg-gnu-olive border-4 border-gnu-black p-6">
              <h3 className="text-gnu-cream text-2xl font-bold mb-4">Åpningstider</h3>
              <p className="text-gnu-cream text-sm">
                Man/Tir/Ons/Tor/Søn: 16:00–00:00<br />
                Fre/Lør: 15:00–02:00
              </p>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section>
          <h2 className="text-3xl font-bold text-gnu-black mb-8 border-b-4 border-gnu-red pb-4">
            Booking-forespørsel
          </h2>

          <form onSubmit={handleSubmit} className="bg-gnu-black border-4 border-gnu-black p-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gnu-cream font-bold mb-2 uppercase tracking-wider">
                Navn
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
                E-post
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
                Ønsket dato
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
                Type arrangement
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gnu-cream bg-gnu-cream text-gnu-black font-bold"
                required
              >
                <option value="">-- Velg type --</option>
                <option value="konsert">Konsert</option>
                <option value="dj">DJ-kvelder</option>
                <option value="privat">Privat event</option>
                <option value="bedrift">Bedriftsfest</option>
                <option value="bryllup">Bryllup</option>
                <option value="annet">Annet</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gnu-cream font-bold mb-2 uppercase tracking-wider">
                Beskjed
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gnu-cream bg-gnu-cream text-gnu-black font-bold"
                placeholder="Fortell oss om arrangementet ditt..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-gnu-red text-gnu-cream px-8 py-4 font-bold text-lg border-4 border-gnu-red hover:bg-gnu-gold hover:text-gnu-black transition-colors uppercase tracking-wider"
            >
              Send forespørsel
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

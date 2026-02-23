'use client';

import { useEffect, useState } from 'react';

interface Event {
  id: string;
  title_no: string;
  title_en: string | null;
  description_no: string | null;
  description_en: string | null;
  event_type: string;
  date: string;
  time: string;
}

const getBadgeColor = (type: string): string => {
  switch (type) {
    case 'quiz': return 'bg-gnu-gold';
    case 'konsert': return 'bg-gnu-red';
    case 'dj': return 'bg-gnu-olive';
    case 'bingo': return 'bg-gnu-gold';
    case 'vinyl': return 'bg-gnu-green';
    case 'soendagsskolen': return 'bg-gnu-cream text-gnu-black';
    case 'jazz': return 'bg-gnu-red';
    default: return 'bg-gnu-green';
  }
};

const formatDate = (dateStr: string, locale: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(locale === 'no' ? 'nb-NO' : 'en-GB', {
    day: 'numeric',
    month: 'long',
  });
};

const formatTime = (timeStr: string): string => {
  // Time comes as HH:MM:SS, just show HH:MM
  return timeStr.substring(0, 5);
};

export function EventsList({ locale, noEventsText }: { locale: string; noEventsText: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="gnu-card bg-gnu-red/30 p-6 border-4 border-gnu-black animate-pulse h-32" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="gnu-card bg-gnu-black p-8 border-4 border-gnu-black text-center">
        <p className="text-gnu-cream text-lg">{noEventsText}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="gnu-card bg-gnu-red p-6 border-4 border-gnu-black"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-gnu-cream font-bold text-sm uppercase tracking-wider">
                {formatDate(event.date, locale)}
              </p>
              <h3 className="text-gnu-cream text-2xl font-bold">
                {locale === 'en' && event.title_en ? event.title_en : event.title_no}
              </h3>
            </div>
            <span className={`gnu-badge px-3 py-1 font-bold text-sm uppercase tracking-wider ${getBadgeColor(event.event_type)}`}>
              {event.event_type}
            </span>
          </div>
          <p className="text-gnu-cream text-lg font-bold mb-2">{formatTime(event.time)}</p>
          {(locale === 'en' && event.description_en ? event.description_en : event.description_no) && (
            <p className="text-gnu-cream">
              {locale === 'en' && event.description_en ? event.description_en : event.description_no}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

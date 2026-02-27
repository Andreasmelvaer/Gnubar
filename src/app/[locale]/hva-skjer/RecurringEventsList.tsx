'use client';

import { useEffect, useState } from 'react';

interface Event {
  id: string;
  title_no: string;
  title_en: string | null;
  description_no: string | null;
  description_en: string | null;
  event_type: string;
  time: string;
  recurring_day: string | null;
  recurring_frequency: string;
}

const DAY_LABELS: Record<string, { no: string; en: string; order: number }> = {
  monday: { no: 'Mandag', en: 'Monday', order: 1 },
  tuesday: { no: 'Tirsdag', en: 'Tuesday', order: 2 },
  wednesday: { no: 'Onsdag', en: 'Wednesday', order: 3 },
  thursday: { no: 'Torsdag', en: 'Thursday', order: 4 },
  friday: { no: 'Fredag', en: 'Friday', order: 5 },
  saturday: { no: 'Lørdag', en: 'Saturday', order: 6 },
  sunday: { no: 'Søndag', en: 'Sunday', order: 7 },
};

const getBadgeColor = (type: string): string => {
  switch (type) {
    case 'quiz': return 'bg-gnu-gold';
    case 'konsert': return 'bg-gnu-red';
    case 'musikk': return 'bg-gnu-red';
    case 'dj': return 'bg-gnu-olive';
    case 'bingo': return 'bg-gnu-gold';
    case 'vinyl': return 'bg-gnu-green';
    case 'soendagsskolen': return 'bg-gnu-cream text-gnu-black';
    case 'jazz': return 'bg-gnu-red';
    default: return 'bg-gnu-green';
  }
};

const TYPE_LABELS: Record<string, Record<string, string>> = {
  konsert: { no: 'Konsert', en: 'Concert' },
  musikk: { no: 'Musikk', en: 'Music' },
  quiz: { no: 'Quiz', en: 'Quiz' },
  dj: { no: 'DJ', en: 'DJ' },
  bingo: { no: 'Music Bingo', en: 'Music Bingo' },
  vinyl: { no: 'Vinyl', en: 'Vinyl' },
  soendagsskolen: { no: 'Søndagsskolen', en: 'Sunday School' },
  jazz: { no: 'Jazz', en: 'Jazz' },
  annet: { no: 'Event', en: 'Event' },
};

export function RecurringEventsList({ locale }: { locale: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events?recurring=true')
      .then(res => res.json())
      .then(data => {
        // Sort by day of week
        const sorted = (data.events || []).sort((a: Event, b: Event) => {
          const aOrder = DAY_LABELS[a.recurring_day || '']?.order || 8;
          const bOrder = DAY_LABELS[b.recurring_day || '']?.order || 8;
          return aOrder - bOrder;
        });
        setEvents(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="gnu-card bg-gnu-green/30 p-6 border-4 border-gnu-black animate-pulse h-32" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {events.map((event) => {
        const dayLabel = event.recurring_day
          ? (locale === 'en' ? DAY_LABELS[event.recurring_day]?.en : DAY_LABELS[event.recurring_day]?.no) || event.recurring_day
          : '';
        const title = locale === 'en' && event.title_en ? event.title_en : event.title_no;
        const description = locale === 'en' && event.description_en ? event.description_en : event.description_no;
        const time = event.time?.substring(0, 5);

        return (
          <div
            key={event.id}
            className="gnu-card bg-gnu-green p-6 border-4 border-gnu-black"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-gnu-cream font-bold text-sm uppercase tracking-wider">{dayLabel}</p>
                <h3 className="text-gnu-cream text-2xl font-bold">{title}</h3>
              </div>
              <span className={`gnu-badge px-3 py-1 font-bold text-sm uppercase tracking-wider ${getBadgeColor(event.event_type)}`}>
                {TYPE_LABELS[event.event_type]?.[locale] || TYPE_LABELS[event.event_type]?.no || event.event_type}
              </span>
            </div>
            {time && <p className="text-gnu-cream text-lg font-bold mb-2">{time}</p>}
            {description && <p className="text-gnu-cream">{description}</p>}
          </div>
        );
      })}
    </div>
  );
}

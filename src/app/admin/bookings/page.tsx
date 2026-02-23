'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Check, X, Mail } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  desired_date: string;
  event_type: string;
  message: string;
  newsletter_opt_in: boolean;
  status: string;
  created_at: string;
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  konsert: 'Konsert',
  dj: 'DJ-kvelder',
  privat: 'Privat event',
  bedrift: 'Bedriftsfest',
  bryllup: 'Bryllup',
  annet: 'Annet',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  declined: 'bg-red-100 text-red-800',
};

export default function AdminBookings() {
  const supabase = createClient();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBookings(data);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    }
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
  const newCount = bookings.filter(b => b.status === 'new').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bookinger
          {newCount > 0 && (
            <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full align-middle">
              {newCount} nye
            </span>
          )}
        </h1>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'new', 'confirmed', 'declined'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              filter === f ? 'bg-[#3C4932] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'Alle' : f === 'new' ? 'Nye' : f === 'confirmed' ? 'Bekreftet' : 'Avslått'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Laster bookinger...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
          Ingen bookinger {filter !== 'all' ? 'med denne statusen' : 'ennå'}.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div
                className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{booking.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${STATUS_COLORS[booking.status]}`}>
                      {booking.status === 'new' ? 'Ny' : booking.status === 'confirmed' ? 'Bekreftet' : 'Avslått'}
                    </span>
                    {booking.newsletter_opt_in && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Nyhetsbrev</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {EVENT_TYPE_LABELS[booking.event_type] || booking.event_type} — {new Date(booking.desired_date + 'T00:00:00').toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(booking.created_at).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' })}
                </div>
              </div>

              {expandedId === booking.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">E-post</p>
                      <a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">{booking.email}</a>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Ønsket dato</p>
                      <p>{new Date(booking.desired_date + 'T00:00:00').toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Melding</p>
                    <p className="bg-white p-3 rounded border border-gray-200">{booking.message}</p>
                  </div>
                  <div className="flex gap-2">
                    {booking.status !== 'confirmed' && (
                      <button
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700"
                      >
                        <Check size={14} /> Bekreft
                      </button>
                    )}
                    {booking.status !== 'declined' && (
                      <button
                        onClick={() => updateStatus(booking.id, 'declined')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700"
                      >
                        <X size={14} /> Avslå
                      </button>
                    )}
                    <a
                      href={`mailto:${booking.email}?subject=Re: Booking forespørsel — Gnu Bar`}
                      className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-bold hover:bg-gray-100"
                    >
                      <Mail size={14} /> Svar
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit2, Trash2, Eye, EyeOff, Copy } from 'lucide-react';

interface Event {
  id: string;
  title_no: string;
  title_en: string | null;
  description_no: string | null;
  description_en: string | null;
  event_type: string;
  date: string;
  time: string;
  is_recurring: boolean;
  recurring_day: string | null;
  recurring_frequency: string;
  is_published: boolean;
  created_at: string;
}

const DAYS_OF_WEEK = [
  { value: 'monday', label: 'Mandag' },
  { value: 'tuesday', label: 'Tirsdag' },
  { value: 'wednesday', label: 'Onsdag' },
  { value: 'thursday', label: 'Torsdag' },
  { value: 'friday', label: 'Fredag' },
  { value: 'saturday', label: 'Lørdag' },
  { value: 'sunday', label: 'Søndag' },
];

const EVENT_TYPES = [
  { value: 'konsert', label: 'Konsert' },
  { value: 'musikk', label: 'Musikk' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'dj', label: 'DJ' },
  { value: 'bingo', label: 'Music Bingo' },
  { value: 'vinyl', label: 'Vinyl Listening Party' },
  { value: 'soendagsskolen', label: 'Søndagsskolen' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'annet', label: 'Annet' },
];

const emptyForm = {
  title_no: '',
  title_en: '',
  description_no: '',
  description_en: '',
  event_type: 'konsert',
  date: '',
  time: '20:00',
  recurring_frequency: 'none',
  recurring_day: '',
  is_published: true,
};

export default function AdminEvents() {
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(searchParams.get('new') === 'true');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);

    if (editingId) {
      // Update
      const res = await fetch(`/api/events/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await fetchEvents();
        resetForm();
      }
    } else {
      // Create
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await fetchEvents();
        resetForm();
      }
    }

    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Er du sikker på at du vil slette dette arrangementet?')) return;

    const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setEvents(events.filter(e => e.id !== id));
    }
  }

  async function togglePublished(event: Event) {
    const res = await fetch(`/api/events/${event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: !event.is_published }),
    });
    if (res.ok) {
      setEvents(events.map(e => e.id === event.id ? { ...e, is_published: !e.is_published } : e));
    }
  }

  function startEdit(event: Event) {
    setEditingId(event.id);
    setForm({
      title_no: event.title_no,
      title_en: event.title_en || '',
      description_no: event.description_no || '',
      description_en: event.description_en || '',
      event_type: event.event_type,
      date: event.date,
      time: event.time.substring(0, 5),
      recurring_frequency: event.recurring_frequency || 'none',
      recurring_day: event.recurring_day || '',
      is_published: event.is_published,
    });
    setShowForm(true);
  }

  function duplicateEvent(event: Event) {
    setEditingId(null);
    setForm({
      title_no: event.title_no,
      title_en: event.title_en || '',
      description_no: event.description_no || '',
      description_en: event.description_en || '',
      event_type: event.event_type,
      date: '',
      time: event.time.substring(0, 5),
      recurring_frequency: event.recurring_frequency || 'none',
      recurring_day: event.recurring_day || '',
      is_published: false,
    });
    setShowForm(true);
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  const today = new Date().toISOString().split('T')[0];
  const recurringEvents = events.filter(e => e.recurring_frequency && e.recurring_frequency !== 'none');
  const upcomingEvents = events.filter(e => (!e.recurring_frequency || e.recurring_frequency === 'none') && e.date >= today);
  const pastEvents = events.filter(e => (!e.recurring_frequency || e.recurring_frequency === 'none') && e.date < today);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Arrangementer</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#3C4932] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#3D691B] transition-colors"
        >
          <Plus size={18} />
          Nytt arrangement
        </button>
      </div>

      {/* Event form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">
            {editingId ? 'Rediger arrangement' : 'Nytt arrangement'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tittel (norsk) *</label>
              <input
                type="text"
                value={form.title_no}
                onChange={e => setForm({ ...form, title_no: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Title (English)</label>
              <input
                type="text"
                value={form.title_en}
                onChange={e => setForm({ ...form, title_en: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Beskrivelse (norsk)</label>
              <textarea
                value={form.description_no}
                onChange={e => setForm({ ...form, description_no: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Description (English)</label>
              <textarea
                value={form.description_en}
                onChange={e => setForm({ ...form, description_en: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Type *</label>
              <select
                value={form.event_type}
                onChange={e => setForm({ ...form, event_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none"
              >
                {EVENT_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Dato *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Klokkeslett *</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Recurring options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Frekvens</label>
              <select
                value={form.recurring_frequency}
                onChange={e => setForm({ ...form, recurring_frequency: e.target.value, recurring_day: e.target.value === 'none' ? '' : form.recurring_day })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none"
              >
                <option value="none">Engangs</option>
                <option value="weekly">Ukentlig</option>
                <option value="monthly">Månedlig</option>
              </select>
            </div>
            {form.recurring_frequency === 'weekly' && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Ukedag</label>
                <select
                  value={form.recurring_day}
                  onChange={e => setForm({ ...form, recurring_day: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none"
                >
                  <option value="">Velg ukedag</option>
                  {DAYS_OF_WEEK.map(d => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={e => setForm({ ...form, is_published: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-bold">Publisert (synlig på nettsiden)</span>
            </label>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving || !form.title_no || !form.date || !form.time}
              className="bg-[#3C4932] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#3D691B] transition-colors disabled:opacity-50"
            >
              {saving ? 'Lagrer...' : editingId ? 'Oppdater' : 'Opprett'}
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Avbryt
            </button>
          </div>
        </div>
      )}

      {/* Events list */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Laster arrangementer...</div>
      ) : (
        <>
          {/* Recurring */}
          {recurringEvents.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-700 mb-4">
                Faste program ({recurringEvents.length})
              </h2>
              <div className="space-y-2">
                {recurringEvents.map(event => (
                  <EventRow
                    key={event.id}
                    event={event}
                    onEdit={() => startEdit(event)}
                    onDelete={() => handleDelete(event.id)}
                    onTogglePublished={() => togglePublished(event)}
                    onDuplicate={() => duplicateEvent(event)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Kommende ({upcomingEvents.length})
            </h2>
            {upcomingEvents.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
                Ingen kommende arrangementer. Klikk &quot;Nytt arrangement&quot; for å legge til.
              </div>
            ) : (
              <div className="space-y-2">
                {upcomingEvents.map(event => (
                  <EventRow
                    key={event.id}
                    event={event}
                    onEdit={() => startEdit(event)}
                    onDelete={() => handleDelete(event.id)}
                    onTogglePublished={() => togglePublished(event)}
                    onDuplicate={() => duplicateEvent(event)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Past */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-400 mb-4">
                Tidligere ({pastEvents.length})
              </h2>
              <div className="space-y-2 opacity-60">
                {pastEvents.slice(0, 10).map(event => (
                  <EventRow
                    key={event.id}
                    event={event}
                    onEdit={() => startEdit(event)}
                    onDelete={() => handleDelete(event.id)}
                    onTogglePublished={() => togglePublished(event)}
                    onDuplicate={() => duplicateEvent(event)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function EventRow({ event, onEdit, onDelete, onTogglePublished, onDuplicate }: {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublished: () => void;
  onDuplicate: () => void;
}) {
  const typeLabel = EVENT_TYPES.find(t => t.value === event.event_type)?.label || event.event_type;
  const dateStr = new Date(event.date + 'T00:00:00').toLocaleDateString('nb-NO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-gray-500">{dateStr}</span>
          <span className="text-sm text-gray-400">{event.time.substring(0, 5)}</span>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{typeLabel}</span>
          {event.recurring_frequency && event.recurring_frequency !== 'none' && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
              {event.recurring_frequency === 'weekly' ? 'Ukentlig' : 'Månedlig'}
            </span>
          )}
          {!event.is_published && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Kladd</span>
          )}
        </div>
        <p className="font-bold truncate">{event.title_no}</p>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={onTogglePublished} className="p-2 hover:bg-gray-100 rounded-lg" title={event.is_published ? 'Skjul' : 'Publiser'}>
          {event.is_published ? <Eye size={16} className="text-green-600" /> : <EyeOff size={16} className="text-gray-400" />}
        </button>
        <button onClick={onDuplicate} className="p-2 hover:bg-gray-100 rounded-lg" title="Dupliser">
          <Copy size={16} className="text-gray-400" />
        </button>
        <button onClick={onEdit} className="p-2 hover:bg-gray-100 rounded-lg" title="Rediger">
          <Edit2 size={16} className="text-blue-600" />
        </button>
        <button onClick={onDelete} className="p-2 hover:bg-gray-100 rounded-lg" title="Slett">
          <Trash2 size={16} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}

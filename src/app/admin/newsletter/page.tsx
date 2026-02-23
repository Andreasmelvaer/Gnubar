'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Users, Download, Send } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  source: string;
  is_active: boolean;
  subscribed_at: string;
}

export default function AdminNewsletter() {
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCompose, setShowCompose] = useState(searchParams.get('compose') === 'true');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function fetchSubscribers() {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (!error && data) {
      setSubscribers(data);
    }
    setLoading(false);
  }

  async function handleSend() {
    if (!subject || !body) return;
    if (!confirm(`Sende nyhetsbrev til ${activeSubscribers.length} abonnenter?`)) return;

    setSending(true);
    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, bodyHtml: body }),
      });

      if (res.ok) {
        const data = await res.json();
        setSendResult(`Sendt til ${data.sentCount} abonnenter!`);
        setSubject('');
        setBody('');
      } else {
        setSendResult('Feil ved sending. Prøv igjen.');
      }
    } catch {
      setSendResult('Feil ved sending.');
    }
    setSending(false);
  }

  function exportCSV() {
    const csv = [
      'Email,Name,Source,Subscribed At,Active',
      ...activeSubscribers.map(s =>
        `${s.email},${s.name || ''},${s.source},${s.subscribed_at},${s.is_active}`
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gnu-bar-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  const activeSubscribers = subscribers.filter(s => s.is_active);
  const inactiveSubscribers = subscribers.filter(s => !s.is_active);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nyhetsbrev</h1>
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Eksporter CSV
          </button>
          <button
            onClick={() => { setShowCompose(true); setSendResult(null); }}
            className="flex items-center gap-2 bg-[#3C4932] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#3D691B] transition-colors"
          >
            <Send size={16} />
            Skriv nyhetsbrev
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Users size={16} />
            <span className="text-sm font-bold">Aktive abonnenter</span>
          </div>
          <p className="text-3xl font-bold">{activeSubscribers.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Mail size={16} />
            <span className="text-sm font-bold">Fra booking</span>
          </div>
          <p className="text-3xl font-bold">{activeSubscribers.filter(s => s.source === 'booking').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Mail size={16} />
            <span className="text-sm font-bold">Fra footer</span>
          </div>
          <p className="text-3xl font-bold">{activeSubscribers.filter(s => s.source === 'footer').length}</p>
        </div>
      </div>

      {/* Compose */}
      {showCompose && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Skriv nyhetsbrev</h2>
          {sendResult && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
              {sendResult}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">Emne</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="F.eks: Denne uken på Gnu Bar"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">Innhold (HTML)</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={10}
              placeholder="<h2>Hei fra Gnu Bar!</h2><p>Denne uken...</p>"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:border-[#3C4932] focus:outline-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSend}
              disabled={sending || !subject || !body}
              className="flex items-center gap-2 bg-[#E2452D] text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <Send size={16} />
              {sending ? 'Sender...' : `Send til ${activeSubscribers.length} abonnenter`}
            </button>
            <button
              onClick={() => setShowCompose(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Avbryt
            </button>
          </div>
        </div>
      )}

      {/* Subscribers list */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Laster abonnenter...</div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">E-post</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Navn</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Kilde</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Dato</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {activeSubscribers.map(sub => (
                <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{sub.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{sub.name || '—'}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{sub.source}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(sub.subscribed_at).toLocaleDateString('nb-NO')}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Aktiv</span></td>
                </tr>
              ))}
              {inactiveSubscribers.map(sub => (
                <tr key={sub.id} className="border-b border-gray-100 opacity-50">
                  <td className="px-4 py-3 text-sm">{sub.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{sub.name || '—'}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{sub.source}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(sub.subscribed_at).toLocaleDateString('nb-NO')}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Avmeldt</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {subscribers.length === 0 && (
            <div className="p-8 text-center text-gray-500">Ingen abonnenter ennå.</div>
          )}
        </div>
      )}
    </div>
  );
}

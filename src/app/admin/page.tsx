'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Calendar, BookOpen, Mail, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState({
    upcomingEvents: 0,
    newBookings: 0,
    subscribers: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const today = new Date().toISOString().split('T')[0];

      const [eventsRes, bookingsRes, subsRes] = await Promise.all([
        supabase.from('events').select('id', { count: 'exact', head: true }).gte('date', today).eq('is_published', true),
        supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }).eq('is_active', true),
      ]);

      setStats({
        upcomingEvents: eventsRes.count || 0,
        newBookings: bookingsRes.count || 0,
        subscribers: subsRes.count || 0,
      });
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Kommende arrangementer', value: stats.upcomingEvents, icon: Calendar, href: '/admin/events', color: 'bg-[#3C4932]' },
    { label: 'Nye bookinger', value: stats.newBookings, icon: BookOpen, href: '/admin/bookings', color: 'bg-[#E2452D]' },
    { label: 'Nyhetsbrev-abonnenter', value: stats.subscribers, icon: Mail, href: '/admin/newsletter', color: 'bg-[#E2CE37] text-black' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/admin/events?new=true"
          className="flex items-center gap-2 bg-[#3C4932] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#3D691B] transition-colors"
        >
          <Plus size={18} />
          Nytt arrangement
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="block">
              <div className={`${card.color} text-white rounded-lg p-6 hover:opacity-90 transition-opacity`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon size={24} />
                  <span className="text-4xl font-bold">{card.value}</span>
                </div>
                <p className="text-sm opacity-80">{card.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4">Hurtighandlinger</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/events?new=true" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#3C4932] hover:bg-gray-50 transition-colors text-center">
            <Calendar size={24} className="mx-auto mb-2 text-gray-400" />
            <p className="font-bold">Legg til arrangement</p>
          </Link>
          <Link href="/admin/newsletter?compose=true" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#3C4932] hover:bg-gray-50 transition-colors text-center">
            <Mail size={24} className="mx-auto mb-2 text-gray-400" />
            <p className="font-bold">Send nyhetsbrev</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

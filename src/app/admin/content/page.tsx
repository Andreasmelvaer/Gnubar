'use client';

import { useEffect, useState } from 'react';
import { Save, Check } from 'lucide-react';

interface ContentItem {
  id: string;
  key: string;
  section: string;
  label: string;
  value_no: string;
  value_en: string;
  field_type: string;
  sort_order: number;
}

const SECTION_LABELS: Record<string, string> = {
  home: 'Hjem',
  om: 'Om oss',
  booking: 'Booking & Kontakt',
  hvaSkjer: 'Hva Skjer',
  gnuRaua: 'Gnu-Rauå',
  gnuSounds: 'Gnu Sounds',
  historie: 'Historie',
  poesi: 'Poesi',
  common: 'Kontaktinfo & Åpningstider',
  footer: 'Footer',
};

export default function AdminContent() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editedItems, setEditedItems] = useState<Record<string, { value_no: string; value_en: string }>>({});

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data.content || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleChange(key: string, field: 'value_no' | 'value_en', value: string) {
    const item = content.find(c => c.key === key);
    if (!item) return;

    setEditedItems(prev => ({
      ...prev,
      [key]: {
        value_no: field === 'value_no' ? value : (prev[key]?.value_no ?? item.value_no),
        value_en: field === 'value_en' ? value : (prev[key]?.value_en ?? item.value_en),
      }
    }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    const items = Object.entries(editedItems).map(([key, values]) => ({
      key,
      value_no: values.value_no,
      value_en: values.value_en,
    }));

    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });

    if (res.ok) {
      // Update local state
      setContent(prev => prev.map(item => {
        const edited = editedItems[item.key];
        return edited ? { ...item, value_no: edited.value_no, value_en: edited.value_en } : item;
      }));
      setEditedItems({});
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  // Group content by section
  const sections = content.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  const hasChanges = Object.keys(editedItems).length > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Innhold</h1>
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : hasChanges
                ? 'bg-[#3C4932] text-white hover:bg-[#3D691B]'
                : 'bg-gray-200 text-gray-500'
          }`}
        >
          {saved ? <><Check size={18} /> Lagret!</> : <><Save size={18} /> {saving ? 'Lagrer...' : 'Lagre endringer'}</>}
        </button>
      </div>

      <p className="text-gray-500 mb-6">
        Rediger teksten som vises på nettsiden. Endringer vises umiddelbart etter lagring.
      </p>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Laster innhold...</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-700">
                  {SECTION_LABELS[section] || section}
                </h2>
              </div>
              <div className="p-6 space-y-6">
                {items.map(item => {
                  const edited = editedItems[item.key];
                  const currentNo = edited?.value_no ?? item.value_no;
                  const currentEn = edited?.value_en ?? item.value_en;
                  const isTextarea = item.field_type === 'textarea';

                  return (
                    <div key={item.key} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          {item.label} <span className="text-gray-400 font-normal">(NO)</span>
                        </label>
                        {isTextarea ? (
                          <textarea
                            value={currentNo}
                            onChange={e => handleChange(item.key, 'value_no', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none text-sm"
                          />
                        ) : (
                          <input
                            type="text"
                            value={currentNo}
                            onChange={e => handleChange(item.key, 'value_no', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none text-sm"
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          {item.label} <span className="text-gray-400 font-normal">(EN)</span>
                        </label>
                        {isTextarea ? (
                          <textarea
                            value={currentEn}
                            onChange={e => handleChange(item.key, 'value_en', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none text-sm"
                          />
                        ) : (
                          <input
                            type="text"
                            value={currentEn}
                            onChange={e => handleChange(item.key, 'value_en', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#3C4932] focus:outline-none text-sm"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

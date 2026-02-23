'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export function NewsletterSignup({ label, placeholder, successText, buttonText }: {
  label: string;
  placeholder: string;
  successText: string;
  buttonText: string;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-gnu-gold">
        <Mail size={16} />
        <span className="text-sm font-bold">{successText}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 bg-gnu-cream/10 border border-gnu-cream/20 text-gnu-cream text-sm rounded placeholder:text-gnu-cream/40 focus:outline-none focus:border-gnu-gold"
        required
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-4 py-2 bg-gnu-gold text-gnu-black text-sm font-bold rounded hover:bg-gnu-gold/80 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? '...' : buttonText}
      </button>
    </form>
  );
}

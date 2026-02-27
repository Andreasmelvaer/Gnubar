'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    if (error) {
      setStatus('error');
      if (error === 'unauthorized') {
        setErrorMsg('Denne e-postadressen har ikke tilgang.');
      } else if (message) {
        setErrorMsg(`Innlogging feilet: ${message}`);
      } else {
        setErrorMsg('Noe gikk galt med innloggingen. Prøv igjen.');
      }
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/callback`,
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setStatus('error');
        return;
      }

      setStatus('sent');
    } catch {
      setErrorMsg('Noe gikk galt. Prøv igjen.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      {status === 'sent' ? (
        <div className="text-center">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="text-xl font-bold mb-2">Sjekk e-posten din</h2>
          <p className="text-gray-600">
            Vi har sendt en innloggingslenke til <strong>{email}</strong>. Klikk på lenken for å logge inn.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 text-[#3C4932] font-bold hover:underline"
          >
            Bruk en annen e-post
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-6 text-center">Logg inn</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                E-post
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@epost.no"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3C4932] focus:outline-none"
                required
              />
            </div>

            {status === 'error' && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#3C4932] text-white py-3 px-4 rounded-lg font-bold hover:bg-[#3D691B] transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Sender...' : 'Send innloggingslenke'}
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">
            Kun autoriserte e-postadresser har tilgang.
          </p>
        </>
      )}
    </div>
  );
}

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-[#3C4932] flex items-center justify-center p-4 fixed inset-0 z-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#E2CE37]" style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 900 }}>
            Gnu Bar
          </h1>
          <p className="text-white/60 mt-2">Admin CMS</p>
        </div>

        <Suspense fallback={
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <p className="text-gray-500">Laster...</p>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

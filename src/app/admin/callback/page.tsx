'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient();

      // With implicit flow, tokens come in the URL hash fragment
      // The Supabase client automatically detects and processes them
      // We just need to check if a session was established
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        setError(sessionError.message);
        setTimeout(() => router.push('/admin/login?error=auth&message=' + encodeURIComponent(sessionError.message)), 2000);
        return;
      }

      if (session) {
        // Session established — redirect to admin dashboard
        router.push('/admin');
        return;
      }

      // If no session yet, listen for auth state changes
      // The Supabase client may still be processing the hash
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          subscription.unsubscribe();
          router.push('/admin');
        }
      });

      // Timeout after 10 seconds
      setTimeout(() => {
        subscription.unsubscribe();
        if (!error) {
          setError('Innlogging tok for lang tid. Prøv igjen.');
          setTimeout(() => router.push('/admin/login?error=auth&message=' + encodeURIComponent('Timeout waiting for session')), 2000);
        }
      }, 10000);
    };

    handleCallback();
  }, [router, error]);

  return (
    <div className="min-h-screen bg-[#3C4932] flex items-center justify-center p-4 fixed inset-0 z-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#E2CE37] mb-4" style={{ fontFamily: 'Epilogue, sans-serif' }}>
          Gnu Bar
        </h1>
        {error ? (
          <p className="text-red-300">Feil: {error}</p>
        ) : (
          <p className="text-white/80">Logger inn...</p>
        )}
      </div>
    </div>
  );
}

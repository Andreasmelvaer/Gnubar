'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Calendar, BookOpen, Mail, LogOut, Menu, X, Home, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  // Don't apply layout to login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user.email || null);
      } else {
        router.push('/admin/login');
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/events', label: 'Arrangementer', icon: Calendar },
    { href: '/admin/bookings', label: 'Bookinger', icon: BookOpen },
    { href: '/admin/newsletter', label: 'Nyhetsbrev', icon: Mail },
    { href: '/admin/content', label: 'Innhold', icon: FileText },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#3C4932] text-white transform transition-transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-[#E2CE37]">Gnu Bar CMS</h1>
          {user && <p className="text-xs text-white/60 mt-1">{user}</p>}
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white/10 text-[#E2CE37]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-colors w-full rounded-lg hover:bg-white/5"
          >
            <LogOut size={20} />
            Logg ut
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-white/40 hover:text-white/60 transition-colors text-sm mt-1"
          >
            ← Tilbake til gnubar.no
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between md:justify-end">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="text-sm text-gray-500">Gnu Bar Admin</span>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

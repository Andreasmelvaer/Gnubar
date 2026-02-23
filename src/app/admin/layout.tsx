// Force all admin pages to be dynamic (no static prerendering)
export const dynamic = 'force-dynamic';

import AdminShell from './AdminShell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body className="bg-gray-50 min-h-screen">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}

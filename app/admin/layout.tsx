'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Skip check for login page
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized) return null;

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold">TE Admin</h1>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <NavLink href="/admin" label="Dashboard" active={pathname === '/admin'} />
          <NavLink href="/admin/products" label="Products" active={pathname.startsWith('/admin/products')} />
          <NavLink href="/admin/inquiries" label="Inquiries" active={pathname.startsWith('/admin/inquiries')} />
          <NavLink href="/admin/content" label="Site Content" active={pathname.startsWith('/admin/content')} />
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/admin/login');
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 rounded-lg transition ${
        active ? 'bg-white text-primary font-bold' : 'hover:bg-white/10'
      }`}
    >
      {label}
    </Link>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { fetcher } from '@/lib/api';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [lastSeenTime, setLastSeenTime] = useState<string | null>(null);
  const [newItems, setNewItems] = useState<any[]>([]);
  const [showNotice, setShowNotice] = useState(false);

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

  useEffect(() => {
    if (!authorized || pathname === '/admin/login') return;
    let mounted = true;
    const init = async () => {
      try {
        const inquiries = await fetcher('/inquiries');
        if (mounted && inquiries.length > 0 && !lastSeenTime) {
          setLastSeenTime(inquiries[0].created_at);
        }
      } catch {}
    };
    init();
    const id = setInterval(async () => {
      try {
        const inquiries = await fetcher('/inquiries');
        if (!lastSeenTime && inquiries.length > 0) {
          setLastSeenTime(inquiries[0].created_at);
          return;
        }
        const latest = inquiries.filter((i: any) => {
          if (!lastSeenTime) return false;
          return new Date(i.created_at).getTime() > new Date(lastSeenTime).getTime();
        });
        if (latest.length > 0) {
          setNewItems(latest);
          setShowNotice(true);
          setLastSeenTime(latest[0].created_at);
        }
      } catch {}
    }, 7000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [authorized, pathname, lastSeenTime]);

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
          <NavLink href="/admin/chatbot" label="AI Agent" active={pathname.startsWith('/admin/chatbot')} />
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
      {showNotice && (
        <div className="fixed top-6 right-6 z-50 w-80 bg-white border border-gray-200 rounded-xl shadow-lg">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <div className="font-bold text-gray-800">New Inquiry Received</div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowNotice(false)}
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
            {newItems.map((i) => (
              <div key={i.id} className="border border-gray-100 rounded p-2">
                <div className="text-sm font-semibold">{i.name}</div>
                <div className="text-xs text-gray-500">{i.inquiry_type}</div>
                <div className="text-xs text-gray-500">{new Date(i.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex justify-end gap-2">
            <button
              className="px-3 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setShowNotice(false)}
            >
              Dismiss
            </button>
            <Link
              href="/admin/inquiries"
              className="px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary-light"
              onClick={() => setShowNotice(false)}
            >
              View
            </Link>
          </div>
        </div>
      )}
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

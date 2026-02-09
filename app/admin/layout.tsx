'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { fetcher } from '@/lib/api';
import { 
  LayoutDashboard, 
  Home, 
  FolderTree, 
  Package, 
  MessageSquare, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  Bot,
  LogOut,
  Menu,
  X,
  Bell,
  MapPin,
  User
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Notification State
  const [lastSeenTime, setLastSeenTime] = useState<string | null>(null);
  const [newItems, setNewItems] = useState<any[]>([]);
  const [showNotice, setShowNotice] = useState(false);

  // Auth Check
  useEffect(() => {
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Notification Polling
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

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/homepage', label: 'Homepage', icon: Home },
    { href: '/admin/categories', label: 'Categories', icon: FolderTree },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/coverage', label: 'Market Coverage', icon: MapPin },
    { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
    { href: '/admin/pages', label: 'Pages', icon: FileText },
    { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
    { href: '/admin/content', label: 'Site Content', icon: Settings },
    { href: '/admin/profile', label: 'Admin Profile', icon: User },
    { href: '/admin/chatbot', label: 'AI Agent', icon: Bot },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-primary border-r border-primary-light">
      <div className="p-6 border-b border-primary-light flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary font-bold">
            TE
          </div>
          <span className="text-xl font-bold text-white">Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden text-white/80 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 group ${
                isActive 
                  ? 'bg-white text-primary font-bold shadow-md' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-primary' : 'text-white/70 group-hover:text-white'} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-light">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/admin/login');
          }}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-white/90 hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <span className="font-bold text-lg text-gray-800">TE Admin</span>
        <div className="w-10" /> {/* Spacer for balance */}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-full shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-primary shadow-xl animate-in slide-in-from-left duration-200">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-full pt-16 md:pt-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Notifications */}
      {showNotice && (
        <div className="fixed top-6 right-6 z-50 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="p-4 border-b bg-gray-50/50 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-2 font-semibold text-gray-800">
              <Bell size={16} className="text-primary" />
              New Inquiry
            </div>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowNotice(false)}
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            {newItems.map((i) => (
              <div key={i.id} className="flex flex-col gap-1 text-sm">
                <div className="font-medium text-gray-900">{i.name}</div>
                <div className="text-gray-500">{i.inquiry_type}</div>
                <div className="text-xs text-gray-400">{new Date(i.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t bg-gray-50/50 rounded-b-xl flex justify-end gap-2">
            <button
              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition"
              onClick={() => setShowNotice(false)}
            >
              Dismiss
            </button>
            <Link
              href="/admin/inquiries"
              className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-md hover:bg-primary-light transition shadow-sm"
              onClick={() => setShowNotice(false)}
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

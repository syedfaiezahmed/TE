'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, inquiries: 0 });
  const [lastSeenTime, setLastSeenTime] = useState<string | null>(null);
  const [newItems, setNewItems] = useState<any[]>([]);
  const [showNotice, setShowNotice] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadStats() {
      try {
        const products = await fetcher('/products');
        const inquiries = await fetcher('/inquiries');
        setStats({ products: products.length, inquiries: inquiries.length });
        if (inquiries.length > 0) {
          setLastSeenTime(inquiries[0].created_at);
        }
      } catch (error) {
        console.error('Failed to load stats', error);
      }
    }
    loadStats();
  }, []);
  useEffect(() => {
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
          setStats((s) => ({ ...s, inquiries: inquiries.length }));
        }
      } catch {}
    }, 8000);
    return () => clearInterval(id);
  }, [lastSeenTime]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Products</h3>
          <p className="text-4xl font-bold text-primary mt-2">{stats.products}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Inquiries</h3>
          <p className="text-4xl font-bold text-primary mt-2">{stats.inquiries}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/admin/products" className="bg-white px-6 py-3 rounded-lg shadow-sm border hover:border-primary transition">
            Manage Products
          </a>
          <a href="/admin/inquiries" className="bg-white px-6 py-3 rounded-lg shadow-sm border hover:border-primary transition">
            View Inquiries
          </a>
        </div>
      </div>
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
            <button
              className="px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary-light"
              onClick={() => {
                setShowNotice(false);
                router.push('/admin/inquiries');
              }}
            >
              View
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

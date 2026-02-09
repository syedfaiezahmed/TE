'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ 
    products: 0, 
    inquiries: 0,
    pages: 0,
    media: 0
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [products, inquiries, pages, media] = await Promise.all([
          fetcher('/products'),
          fetcher('/inquiries'),
          fetcher('/content/pages'),
          fetcher('/media')
        ]);
        
        setStats({
          products: products.length,
          inquiries: inquiries.length,
          pages: pages.length,
          media: media.length
        });
        setRecentInquiries(inquiries.slice(0, 5));
      } catch (error) {
        console.error('Failed to load stats', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="text-sm text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          label="Total Products" 
          value={stats.products} 
          icon="📦" 
          color="bg-blue-50 text-blue-600"
          href="/admin/products"
        />
        <StatCard 
          label="Pending Inquiries" 
          value={stats.inquiries} 
          icon="📩" 
          color="bg-purple-50 text-purple-600"
          href="/admin/inquiries"
        />
        <StatCard 
          label="Content Pages" 
          value={stats.pages} 
          icon="📄" 
          color="bg-green-50 text-green-600"
          href="/admin/pages"
        />
        <StatCard 
          label="Media Assets" 
          value={stats.media} 
          icon="🖼️" 
          color="bg-orange-50 text-orange-600"
          href="/admin/media"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickAction 
              label="Add New Product" 
              desc="Create a new listing" 
              href="/admin/products" 
              icon="+" 
            />
            <QuickAction 
              label="Update Homepage" 
              desc="Edit hero & banners" 
              href="/admin/homepage" 
              icon="🏠" 
            />
            <QuickAction 
              label="Manage Categories" 
              desc="Organize your catalog" 
              href="/admin/categories" 
              icon="📂" 
            />
            <QuickAction 
              label="Site Settings" 
              desc="Update contact info" 
              href="/admin/content" 
              icon="⚙️" 
            />
          </div>
        </div>

        {/* System Status / Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Backend Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">ONLINE</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Database Connection</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">CONNECTED</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Last Backup</span>
              <span className="text-sm text-gray-500">Automatic (Daily)</span>
            </div>
            <div className="mt-4 pt-4 border-t text-xs text-gray-400 text-center">
              Trans Emirates Admin Panel v1.0
            </div>
          </div>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-sm text-primary hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="pb-3 font-medium pl-2">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq: any) => (
                <tr key={inq.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-900 pl-2">{inq.name}</td>
                  <td className="py-3 text-gray-600">{inq.email}</td>
                  <td className="py-3 text-gray-500">{new Date(inq.created_at).toLocaleDateString()}</td>
                  <td className="py-3 text-right pr-2">
                    <Link href="/admin/inquiries" className="text-primary hover:underline font-medium">Details</Link>
                  </td>
                </tr>
              ))}
              {recentInquiries.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">No inquiries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, href }: { label: string, value: number, icon: string, color: string, href: string }) {
  return (
    <Link href={href} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">{label}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${color}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs font-medium text-gray-400 group-hover:text-primary transition">
        Manage {label} →
      </div>
    </Link>
  );
}

function QuickAction({ label, desc, href, icon }: { label: string, desc: string, href: string, icon: string }) {
  return (
    <Link href={href} className="p-4 border rounded-lg hover:border-primary hover:bg-blue-50 transition group text-left">
      <div className="flex items-center gap-3 mb-1">
        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs group-hover:bg-primary group-hover:text-white transition">
          {icon}
        </span>
        <span className="font-semibold text-gray-900">{label}</span>
      </div>
      <p className="text-xs text-gray-500 pl-9">{desc}</p>
    </Link>
  );
}

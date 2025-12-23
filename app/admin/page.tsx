'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, inquiries: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        const products = await fetcher('/products');
        const inquiries = await fetcher('/inquiries');
        setStats({ products: products.length, inquiries: inquiries.length });
      } catch (error) {
        console.error('Failed to load stats', error);
      }
    }
    loadStats();
  }, []);

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
    </div>
  );
}

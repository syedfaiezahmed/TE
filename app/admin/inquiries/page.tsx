'use client';

import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/api';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  inquiry_type: string;
  created_at: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const data = await fetcher('/inquiries');
      setInquiries(data);
    } catch (error) {
      console.error('Failed to load inquiries', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await fetcher(`/inquiries/${id}`, { method: 'DELETE' });
      setInquiries(inquiries.filter(i => i.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (error) {
      alert('Failed to delete inquiry');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Inquiries & Leads</h1>
      
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* List View */}
        <div className="w-1/3 bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-gray-50 font-medium text-gray-500 text-xs uppercase tracking-wider">
            Recent Inquiries
          </div>
          <div className="flex-1 overflow-y-auto divide-y">
            {inquiries.map((inquiry) => (
              <div 
                key={inquiry.id}
                onClick={() => setSelectedInquiry(inquiry)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition ${selectedInquiry?.id === inquiry.id ? 'bg-blue-50 border-l-4 border-primary' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-gray-900 truncate">{inquiry.name}</span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs font-medium text-primary mb-1 uppercase tracking-wide">
                  {inquiry.inquiry_type}
                </div>
                <p className="text-sm text-gray-600 truncate">{inquiry.message}</p>
              </div>
            ))}
            {inquiries.length === 0 && (
              <div className="p-8 text-center text-gray-500">No inquiries found</div>
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
          {selectedInquiry ? (
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b flex justify-between items-start bg-gray-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedInquiry.name}</h2>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <a href={`mailto:${selectedInquiry.email}`} className="hover:text-primary flex items-center gap-1">
                      ✉️ {selectedInquiry.email}
                    </a>
                    {selectedInquiry.phone && (
                      <a href={`tel:${selectedInquiry.phone}`} className="hover:text-primary flex items-center gap-1">
                        📞 {selectedInquiry.phone}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium uppercase">
                    {selectedInquiry.inquiry_type}
                  </span>
                  <button 
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                    title="Delete Inquiry"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 flex-1 overflow-y-auto">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Message</h3>
                <div className="prose max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t bg-gray-50 text-xs text-gray-400 text-center">
                Received on {new Date(selectedInquiry.created_at).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <span className="text-6xl mb-4">📩</span>
              <p>Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

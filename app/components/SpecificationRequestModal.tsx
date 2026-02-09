'use client';

import { useState, Fragment } from 'react';
import { API_URL } from '@/lib/api';

interface SpecificationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function SpecificationRequestModal({ isOpen, onClose, productName }: SpecificationRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiry_type: 'specification_request',
        message: `Requesting specification for product: ${productName}\n\nCompany: ${formData.company}\n\nMessage: ${formData.message}`
      };

      const res = await fetch(`${API_URL}/inquiries/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to submit request');

      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
        <div className="bg-primary p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-bold">Request Specification</h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h4>
              <p className="text-gray-600">We will send the specification for <span className="font-semibold">{productName}</span> to your email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Product</span>
                <p className="font-medium text-primary">{productName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  required 
                  type="email" 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="Any specific requirements?"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-70 flex justify-center items-center"
              >
                {status === 'submitting' ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  'Send Request'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

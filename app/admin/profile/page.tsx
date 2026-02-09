'use client';

import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/api';
import { Lock, Mail, User as UserIcon, Save, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    current_password: '',
    new_email: '',
    new_password: '',
    confirm_password: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetcher('/auth/me')
      .then(data => {
        setCurrentUser(data);
        setFormData(prev => ({ ...prev, new_email: data.email }));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setErrorMessage('');

    // Validation
    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      setErrorMessage("New passwords do not match");
      setStatus('error');
      return;
    }

    if (!formData.current_password) {
      setErrorMessage("Current password is required to make changes");
      setStatus('error');
      return;
    }

    try {
      const payload: any = {
        current_password: formData.current_password
      };
      
      if (formData.new_email !== currentUser.email) {
        payload.new_email = formData.new_email;
      }
      
      if (formData.new_password) {
        payload.new_password = formData.new_password;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to update profile');
      }

      setStatus('success');
      setFormData(prev => ({ 
        ...prev, 
        current_password: '', 
        new_password: '', 
        confirm_password: '' 
      }));
      
      // Refresh user data if email changed
      if (payload.new_email) {
        setCurrentUser({ ...currentUser, email: payload.new_email });
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);

    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
      setStatus('error');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account credentials</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <UserIcon size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Account Settings</h2>
            <p className="text-sm text-gray-500">{currentUser?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Email Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Mail size={20} />
              Email Address
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="new_email"
                value={formData.new_email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <hr />

          {/* Password Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Lock size={20} />
              Change Password
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password (Optional)</label>
                <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Leave blank to keep current"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          <hr />

          {/* Verification Section */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-3">
              <Lock className="text-yellow-600 mt-1 shrink-0" size={18} />
              <div className="w-full">
                <label className="block text-sm font-bold text-yellow-800 mb-1">Current Password (Required to save changes)</label>
                <input
                  type="password"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Messages */}
          {status === 'error' && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              {errorMessage}
            </div>
          )}
          
          {status === 'success' && (
            <div className="p-4 bg-green-50 text-green-600 rounded-lg flex items-center gap-2">
              <CheckCircle size={20} />
              Profile updated successfully
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={status === 'saving'}
              className={`flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-light transition-all shadow-lg ${
                status === 'saving' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {status === 'saving' ? (
                <>Saving...</>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

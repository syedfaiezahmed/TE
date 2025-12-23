'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/api';

export default function ContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await fetcher('/content');
      setContent(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: string, value: string) => {
    try {
      await fetcher('/content', {
        method: 'POST',
        body: JSON.stringify({ key, value }),
      });
      alert('Saved!');
    } catch (error) {
      alert('Failed to save');
    }
  };

  if (loading) return <div>Loading...</div>;

  const fields = [
    { key: 'about_us_text', label: 'About Us Text' },
    { key: 'vision', label: 'Vision Statement' },
    { key: 'mission', label: 'Mission Statement' },
    { key: 'contact_email', label: 'Contact Email' },
    { key: 'contact_phone', label: 'Contact Phone' },
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Site Content</h1>
      
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            <div className="flex gap-4">
              <textarea
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                rows={3}
                defaultValue={content[field.key] || ''}
                onBlur={(e) => handleSave(field.key, e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Click outside to save</p>
          </div>
        ))}
      </div>
    </div>
  );
}

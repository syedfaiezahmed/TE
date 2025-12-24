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

  const sections = [
    {
      title: "Hero Section",
      fields: [
        { key: 'hero_title', label: 'Title', type: 'text' },
        { key: 'hero_subtitle', label: 'Subtitle', type: 'text' },
        { key: 'hero_description', label: 'Description', type: 'textarea' },
        { key: 'hero_image', label: 'Background Image URL', type: 'text' },
      ]
    },
    {
      title: "Who We Are",
      fields: [
        { key: 'whoweare_title', label: 'Title', type: 'text' },
        { key: 'whoweare_text', label: 'Main Text', type: 'textarea' },
      ]
    },
    {
      title: "General Info",
      fields: [
        { key: 'contact_email', label: 'Contact Email', type: 'text' },
        { key: 'contact_phone', label: 'Contact Phone', type: 'text' },
        { key: 'address', label: 'Office Address', type: 'textarea' },
      ]
    },
    {
      title: "Footer Section",
      fields: [
        { key: 'company_name', label: 'Company Name', type: 'text' },
        { key: 'footer_description', label: 'Footer Description', type: 'textarea' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl pb-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Site Content Management</h1>
      
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>
            <div className="p-6 space-y-6">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      rows={4}
                      defaultValue={content[field.key] || ''}
                      onBlur={(e) => handleSave(field.key, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      defaultValue={content[field.key] || ''}
                      onBlur={(e) => handleSave(field.key, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  )}
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    Click outside to save automatically
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

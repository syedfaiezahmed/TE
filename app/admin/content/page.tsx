'use client';

import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/api';
import RichTextEditor from '@/app/components/admin/RichTextEditor';

interface SiteContent {
  [key: string]: string;
}

const COMMON_KEYS = [
  { key: 'contact_email', label: 'Contact Email' },
  { key: 'contact_phone', label: 'Phone Number' },
  { key: 'address', label: 'Office Address' },
  { key: 'company_name', label: 'Company Name' },
  { key: 'footer_description', label: 'Footer Description', type: 'richtext' },
  { key: 'linkedin_url', label: 'LinkedIn URL' },
  { key: 'twitter_url', label: 'Twitter URL' },
  { key: 'whatsapp_number', label: 'WhatsApp Number' },
  // About Page
  { key: 'about_hero_title', label: 'About: Hero Title' },
  { key: 'about_hero_desc', label: 'About: Hero Description' },
  { key: 'about_founded_year', label: 'About: Founded Year' },
  { key: 'about_founder_name', label: 'About: Founder Name' },
  { key: 'about_history_title', label: 'About: History Title' },
  { key: 'about_history_text', label: 'About: History Text', type: 'richtext' },
  { key: 'about_quote', label: 'About: Quote' },
  { key: 'about_vision', label: 'About: Vision' },
  { key: 'about_mission', label: 'About: Mission' },
  { key: 'about_values', label: 'About: Values', type: 'richtext' },
  { key: 'about_image_url', label: 'About: Image URL' },
  // Homepage - Hero
  { key: 'hero_title', label: 'Home: Hero Title' },
  { key: 'hero_subtitle', label: 'Home: Hero Subtitle' },
  { key: 'hero_description', label: 'Home: Hero Description', type: 'richtext' },
  { key: 'hero_image', label: 'Home: Hero Image URL' },
  // Homepage - Who We Are
  { key: 'whoweare_title', label: 'Home: Who We Are Title' },
  { key: 'whoweare_text', label: 'Home: Who We Are Text', type: 'richtext' },
];

export default function SiteContentManager() {
  const [content, setContent] = useState<SiteContent>({});
  const [loading, setLoading] = useState(true);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await fetcher('/content');
      setContent(data);
    } catch (error) {
      console.error('Failed to load content', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: string, value: string) => {
    try {
      await fetcher('/content', {
        method: 'POST',
        body: JSON.stringify({ key, value })
      });
      setContent(prev => ({ ...prev, [key]: value }));
      alert('Saved successfully!');
    } catch (error) {
      alert('Failed to save');
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm(`Delete ${key}?`)) return;
    try {
      await fetcher(`/content/${key}`, { method: 'DELETE' });
      const newContent = { ...content };
      delete newContent[key];
      setContent(newContent);
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleAddCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newValue) return;
    await handleSave(newKey, newValue);
    setNewKey('');
    setNewValue('');
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Site Settings & Content</h1>

      <div className="grid grid-cols-1 gap-8">
        {/* Common Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold mb-6">General Information</h2>
          <div className="space-y-6">
            {COMMON_KEYS.map(({ key, label, type }) => (
              <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <label className="text-sm font-medium text-gray-700 pt-2">{label}</label>
                <div className="md:col-span-2 flex gap-2">
                  {type === 'richtext' ? (
                    <div className="w-full">
                       <RichTextEditor
                         value={content[key] || ''}
                         onChange={(val) => {
                           // For rich text, we might want to save on blur or debounce, 
                           // but RichTextEditor doesn't emit onBlur easily. 
                           // We will update local state and let user click a save button? 
                           // Or just update state and have a manual save button for the whole section?
                           // The current design uses onBlur for inputs. 
                           // Let's just update state and auto-save after delay or add a save button.
                           // For now, let's just update state and trigger save.
                           setContent(prev => ({ ...prev, [key]: val }));
                         }}
                       />
                       <button 
                         onClick={() => handleSave(key, content[key])}
                         className="mt-2 text-sm bg-primary text-white px-3 py-1 rounded"
                       >
                         Save {label}
                       </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      defaultValue={content[key] || ''}
                      onBlur={(e) => {
                        if (e.target.value !== content[key]) {
                          handleSave(key, e.target.value);
                        }
                      }}
                      className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      placeholder={`Enter ${label}...`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Keys */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold mb-6">Advanced / Custom Keys</h2>
          
          <div className="space-y-4 mb-8">
            {Object.entries(content)
              .filter(([k]) => !COMMON_KEYS.find(ck => ck.key === k) && k !== 'about' && k !== 'tagline') // Filter out common and system keys
              .map(([key, value]) => (
              <div key={key} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg">
                <span className="font-mono text-sm text-gray-600 w-1/3 truncate">{key}</span>
                <input
                  type="text"
                  defaultValue={value}
                  onBlur={(e) => handleSave(key, e.target.value)}
                  className="flex-1 p-2 border rounded bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <button 
                  onClick={() => handleDelete(key)}
                  className="text-red-500 hover:text-red-700 px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddCustom} className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-dashed">
            <input
              type="text"
              placeholder="Key (e.g., promo_banner_text)"
              value={newKey}
              onChange={e => setNewKey(e.target.value)}
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <input
              type="text"
              placeholder="Value"
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

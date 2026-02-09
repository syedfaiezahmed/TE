'use client';

import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/api';
import RichTextEditor from '@/app/components/admin/RichTextEditor';
import ImageUploader from '@/app/components/admin/ImageUploader';

export default function HomepageEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [content, setContent] = useState({
    hero_title: '',
    hero_subtitle: '',
    hero_description: '',
    hero_image: '',
    whoweare_title: '',
    whoweare_text: '',
    leadership_title: '',
    leadership_message: '',
    leadership_name: '',
    leadership_role: '',
    leadership_image: '',
    strength_title: '',
    strength_text: '',
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await fetcher('/content');
      setContent({
        hero_title: data.hero_title || '',
        hero_subtitle: data.hero_subtitle || '',
        hero_description: data.hero_description || '',
        hero_image: data.hero_image || '',
        whoweare_title: data.whoweare_title || '',
        whoweare_text: data.whoweare_text || '',
        leadership_title: data.leadership_title || '',
        leadership_message: data.leadership_message || '',
        leadership_name: data.leadership_name || '',
        leadership_role: data.leadership_role || '',
        leadership_image: data.leadership_image || '',
        strength_title: data.strength_title || '',
        strength_text: data.strength_text || '',
      });
    } catch (error) {
      console.error('Failed to load content', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      // Save each field individually as the API expects key-value pairs
      // In a real app, we might want a bulk update endpoint
      const promises = Object.entries(content).map(([key, value]) => 
        fetcher('/content', {
          method: 'POST',
          body: JSON.stringify({ key, value })
        })
      );

      await Promise.all(promises);
      setMessage('Homepage updated successfully!');
      
      // Hide message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save content', error);
      setMessage('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Homepage Editor</h1>
        {message && (
          <div className={`px-4 py-2 rounded ${message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl shadow-sm border">
        {/* Hero Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Hero Section</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
              <input
                type="text"
                name="hero_title"
                value={content.hero_title}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Global Food Commodity Trading"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
              <input
                type="text"
                name="hero_subtitle"
                value={content.hero_subtitle}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Bulk Supply of Rice, Sugar..."
              />
            </div>

            <div>
              <RichTextEditor
                label="Description"
                value={content.hero_description}
                onChange={(val) => setContent(prev => ({ ...prev, hero_description: val }))}
                placeholder="Short description under the title..."
              />
            </div>

            <div>
              <ImageUploader
                label="Background Image"
                value={content.hero_image}
                onChange={(url) => setContent(prev => ({ ...prev, hero_image: url }))}
              />
            </div>
          </div>
        </div>

        {/* Who We Are Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Who We Are Section</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <input
                type="text"
                name="whoweare_title"
                value={content.whoweare_title}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Who We Are"
              />
            </div>
            <div>
              <RichTextEditor
                label="Main Text"
                value={content.whoweare_text}
                onChange={(val) => setContent(prev => ({ ...prev, whoweare_text: val }))}
                placeholder="Describe your company..."
              />
            </div>
          </div>
        </div>

        {/* Our Strength Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Our Strength Section</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <input
                type="text"
                name="strength_title"
                value={content.strength_title}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Infrastructure & Reach"
              />
            </div>
            <div>
              <RichTextEditor
                label="Main Text"
                value={content.strength_text}
                onChange={(val) => setContent(prev => ({ ...prev, strength_text: val }))}
                placeholder="Describe your strengths..."
              />
            </div>
          </div>
        </div>

        {/* Leadership Message Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Leadership Message Section</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <input
                type="text"
                name="leadership_title"
                value={content.leadership_title}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. A Vision for Excellence"
              />
            </div>
            <div>
              <RichTextEditor
                label="Message (Quote)"
                value={content.leadership_message}
                onChange={(val) => setContent(prev => ({ ...prev, leadership_message: val }))}
                placeholder="Enter the leadership message..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="leadership_name"
                  value={content.leadership_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. Mohammed Al-Ghamdi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  name="leadership_role"
                  value={content.leadership_role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. Chairman of the Board"
                />
              </div>
            </div>
            <div>
              <ImageUploader
                label="Leader Image"
                value={content.leadership_image}
                onChange={(url) => setContent(prev => ({ ...prev, leadership_image: url }))}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-light transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

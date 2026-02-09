'use client';

import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/api';
import RichTextEditor from '@/app/components/admin/RichTextEditor';

interface Page {
  slug: string;
  title: string;
  content: string;
  seo_title?: string;
  seo_description?: string;
  is_published: boolean;
  updated_at?: string;
}

export default function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>({
    slug: '',
    title: '',
    content: '',
    is_published: true
  });
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const data = await fetcher('/content/pages');
      setPages(data);
    } catch (error) {
      console.error('Failed to load pages', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: Page) => {
    setCurrentPage(page);
    setIsNew(false);
    setIsEditing(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    
    try {
      await fetcher(`/content/pages/${slug}`, { method: 'DELETE' });
      setPages(pages.filter(p => p.slug !== slug));
    } catch (error) {
      console.error('Failed to delete page', error);
      alert('Failed to delete page');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        // Create
        const created = await fetcher('/content/pages', {
          method: 'POST',
          body: JSON.stringify(currentPage)
        });
        setPages([...pages, created]);
      } else {
        // Update
        const updated = await fetcher(`/content/pages/${currentPage.slug}`, {
          method: 'PUT',
          body: JSON.stringify(currentPage)
        });
        setPages(pages.map(p => p.slug === updated.slug ? updated : p));
      }
      setIsEditing(false);
      setCurrentPage({ slug: '', title: '', content: '', is_published: true });
    } catch (error) {
      console.error('Failed to save page', error);
      alert('Failed to save page. Check if slug is unique.');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{isNew ? 'New Page' : 'Edit Page'}</h2>
          <button 
            onClick={() => setIsEditing(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
              <input
                type="text"
                required
                value={currentPage.title}
                onChange={e => setCurrentPage({...currentPage, title: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                type="text"
                required
                disabled={!isNew}
                value={currentPage.slug}
                onChange={e => setCurrentPage({...currentPage, slug: e.target.value})}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none ${!isNew ? 'bg-gray-100' : ''}`}
                placeholder="e.g. about-us"
              />
              {!isNew && <p className="text-xs text-gray-500 mt-1">Slug cannot be changed once created.</p>}
            </div>

            <div className="col-span-1 md:col-span-2">
              <RichTextEditor
                label="Page Content"
                value={currentPage.content}
                onChange={(val) => setCurrentPage({...currentPage, content: val})}
                placeholder="Write your page content here..."
              />
            </div>

            <div className="col-span-1 md:col-span-2 border-t pt-4">
              <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={currentPage.seo_title || ''}
                    onChange={e => setCurrentPage({...currentPage, seo_title: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    value={currentPage.seo_description || ''}
                    onChange={e => setCurrentPage({...currentPage, seo_description: e.target.value})}
                    rows={2}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

             <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={currentPage.is_published}
                  onChange={e => setCurrentPage({...currentPage, is_published: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-gray-700">Published</label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-light transition"
            >
              Save Page
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Content Pages</h1>
        <button
          onClick={() => {
            setCurrentPage({ slug: '', title: '', content: '', is_published: true });
            setIsNew(true);
            setIsEditing(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition"
        >
          + Add Page
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Title</th>
              <th className="p-4 font-medium text-gray-600">Slug</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pages.map((page) => (
              <tr key={page.slug} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{page.title}</td>
                <td className="p-4 text-gray-500">/{page.slug}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${page.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {page.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(page)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(page.slug)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No pages found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

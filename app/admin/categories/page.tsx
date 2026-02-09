'use client';

import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/api';
import RichTextEditor from '@/app/components/admin/RichTextEditor';
import ImageUploader from '@/app/components/admin/ImageUploader';

interface Category {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_order: number;
  seo_title?: string;
  seo_description?: string;
  packing_options?: string;
}

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category>({
    name: '',
    slug: '',
    display_order: 0
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetcher('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await fetcher(`/categories/${id}`, { method: 'DELETE' });
      setCategories(categories.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete category', error);
      alert('Failed to delete category');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentCategory.id) {
        // Update
        const updated = await fetcher(`/categories/${currentCategory.id}`, {
          method: 'PUT',
          body: JSON.stringify(currentCategory)
        });
        setCategories(categories.map(c => c.id === updated.id ? updated : c));
      } else {
        // Create
        const created = await fetcher('/categories', {
          method: 'POST',
          body: JSON.stringify(currentCategory)
        });
        setCategories([...categories, created]);
      }
      setIsEditing(false);
      setCurrentCategory({ name: '', slug: '', display_order: 0 });
    } catch (error) {
      console.error('Failed to save category', error);
      alert('Failed to save category');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{currentCategory.id ? 'Edit Category' : 'New Category'}</h2>
          <button 
            onClick={() => setIsEditing(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={currentCategory.name}
                onChange={e => setCurrentCategory({...currentCategory, name: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                type="text"
                required
                value={currentCategory.slug}
                onChange={e => setCurrentCategory({...currentCategory, slug: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                value={currentCategory.display_order}
                onChange={e => setCurrentCategory({...currentCategory, display_order: parseInt(e.target.value)})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Packing Options</label>
              <input
                type="text"
                value={currentCategory.packing_options || ''}
                onChange={e => setCurrentCategory({...currentCategory, packing_options: e.target.value})}
                placeholder="e.g. 25kg PP Bags, 50kg Jute Sacks"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="col-span-1">
              <RichTextEditor
                label="Description"
                value={currentCategory.description || ''}
                onChange={(val) => setCurrentCategory({...currentCategory, description: val})}
                placeholder="Describe this category..."
              />
            </div>

            <div>
              <ImageUploader
                label="Category Image"
                value={currentCategory.image_url}
                onChange={(url) => setCurrentCategory({...currentCategory, image_url: url})}
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={currentCategory.seo_title || ''}
                    onChange={e => setCurrentCategory({...currentCategory, seo_title: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    value={currentCategory.seo_description || ''}
                    onChange={e => setCurrentCategory({...currentCategory, seo_description: e.target.value})}
                    rows={2}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
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
              Save Category
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={() => {
            setCurrentCategory({ name: '', slug: '', display_order: 0 });
            setIsEditing(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition"
        >
          + Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Order</th>
              <th className="p-4 font-medium text-gray-600">Name</th>
              <th className="p-4 font-medium text-gray-600">Slug</th>
              <th className="p-4 font-medium text-gray-600">Image</th>
              <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.sort((a,b) => a.display_order - b.display_order).map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="p-4">{category.display_order}</td>
                <td className="p-4 font-medium">{category.name}</td>
                <td className="p-4 text-gray-500">{category.slug}</td>
                <td className="p-4">
                  {category.image_url && (
                    <img src={category.image_url} alt={category.name} className="h-10 w-10 object-cover rounded" />
                  )}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id!)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No categories found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

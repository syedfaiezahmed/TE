'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/api';
import RichTextEditor from '@/app/components/admin/RichTextEditor';
import ImageUploader from '@/app/components/admin/ImageUploader';

type Category = {
  id: number;
  name: string;
};

type Product = {
  id?: number;
  name: string;
  slug: string;
  description: string; // Short description
  rich_description?: string; // HTML Content
  image_url: string; // Main image
  images?: string; // Additional images (JSON or comma separated)
  price?: number;
  stock_status: string;
  is_active: boolean;
  seo_title?: string;
  seo_description?: string;
  category_id?: number;
};

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    stock_status: 'in_stock',
    is_active: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        fetcher('/products'),
        fetcher('/categories')
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetcher(`/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product', error);
      alert('Failed to delete product');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentProduct.id ? `/products/${currentProduct.id}` : '/products';
      const method = currentProduct.id ? 'PUT' : 'POST';
      
      const saved = await fetcher(url, {
        method,
        body: JSON.stringify(currentProduct),
      });
      
      if (currentProduct.id) {
        setProducts(products.map(p => p.id === saved.id ? saved : p));
      } else {
        setProducts([...products, saved]);
      }
      
      setIsEditing(false);
      setCurrentProduct({
        name: '',
        slug: '',
        description: '',
        image_url: '',
        stock_status: 'in_stock',
        is_active: true
      });
    } catch (error) {
      console.error('Failed to save product', error);
      alert('Failed to save product');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{currentProduct.id ? 'Edit Product' : 'New Product'}</h2>
          <button 
            onClick={() => setIsEditing(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                required
                value={currentProduct.name}
                onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                required
                value={currentProduct.slug}
                onChange={e => setCurrentProduct({...currentProduct, slug: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={currentProduct.category_id || ''}
                onChange={e => setCurrentProduct({...currentProduct, category_id: Number(e.target.value) || undefined})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">Select Category...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea
                value={currentProduct.description || ''}
                onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                rows={3}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <RichTextEditor
                label="Rich Description (Full Detail)"
                value={currentProduct.rich_description || ''}
                onChange={(val) => setCurrentProduct({...currentProduct, rich_description: val})}
                placeholder="Detailed product description with formatting, tables, and images..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                value={currentProduct.price || ''}
                onChange={e => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value) || undefined})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
              <select
                value={currentProduct.stock_status}
                onChange={e => setCurrentProduct({...currentProduct, stock_status: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="pre_order">Pre-Order</option>
              </select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <ImageUploader
                label="Product Main Image"
                value={currentProduct.image_url}
                onChange={(url) => setCurrentProduct({...currentProduct, image_url: url})}
                placeholder="https://example.com/product.jpg"
              />
            </div>

            <div className="col-span-1 md:col-span-2 border-t pt-4">
              <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={currentProduct.seo_title || ''}
                    onChange={e => setCurrentProduct({...currentProduct, seo_title: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    value={currentProduct.seo_description || ''}
                    onChange={e => setCurrentProduct({...currentProduct, seo_description: e.target.value})}
                    rows={2}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={currentProduct.is_active}
                  onChange={e => setCurrentProduct({...currentProduct, is_active: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active (Visible on site)</label>
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
              Save Product
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => {
            setCurrentProduct({
              name: '',
              slug: '',
              description: '',
              image_url: '',
              stock_status: 'in_stock',
              is_active: true
            });
            setIsEditing(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Product</th>
              <th className="p-4 font-medium text-gray-600">Category</th>
              <th className="p-4 font-medium text-gray-600">Stock</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {product.image_url && (
                      <img src={product.image_url} alt="" className="w-10 h-10 rounded object-cover" />
                    )}
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-gray-500">/{product.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600">
                  {categories.find(c => c.id === product.category_id)?.name || '-'}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                    product.stock_status === 'in_stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {product.stock_status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${product.is_active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id!)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

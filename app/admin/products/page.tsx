'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/api';

type Product = {
  id?: number;
  name: string;
  description: string;
  image_url: string;
  category_id?: number;
};

type Category = {
  id: number;
  name: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({ name: '', description: '', image_url: '' });

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentProduct.id ? `/products/${currentProduct.id}` : '/products';
      const method = currentProduct.id ? 'PUT' : 'POST';
      
      await fetcher(url, {
        method,
        body: JSON.stringify(currentProduct),
      });
      
      setIsEditing(false);
      setCurrentProduct({ name: '', description: '', image_url: '' });
      loadData();
    } catch (error) {
      alert('Failed to save product');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetcher(`/products/${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => { setIsEditing(true); setCurrentProduct({ name: '', description: '', image_url: '' }); }}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition"
        >
          Add Product
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">{currentProduct.id ? 'Edit' : 'Add'} Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={currentProduct.name}
                onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded"
                value={currentProduct.description}
                onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
              />
              <input
                placeholder="Image URL"
                className="w-full p-2 border rounded"
                value={currentProduct.image_url}
                onChange={e => setCurrentProduct({...currentProduct, image_url: e.target.value})}
              />
              <select
                className="w-full p-2 border rounded"
                value={currentProduct.category_id || ''}
                onChange={e => setCurrentProduct({...currentProduct, category_id: Number(e.target.value)})}
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow overflow-hidden group">
            <div className="h-48 bg-gray-200 relative">
              {product.image_url && <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => { setCurrentProduct(product); setIsEditing(true); }}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(product.id!)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

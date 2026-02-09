'use client';

import { useState, useEffect } from 'react';
import { API_URL, fetcher } from '@/lib/api';
import SpecificationRequestModal from '@/app/components/SpecificationRequestModal';
import { getFallbackImage, getPackingOptions } from '@/lib/productUtils';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  rich_description?: string;
  image_url: string;
  images?: string; // JSON string
  category_id: number;
  category?: {
    id: number;
    name: string;
    packing_options?: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (!slug) return;
    
    const fetchProduct = async () => {
      try {
        const data = await fetcher(`/products/slug/${slug}`);
        setProduct(data);
        setActiveImage(data.image_url || getFallbackImage(data.name));
      } catch (err) {
        console.error(err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-32 min-h-screen container mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <Link href="/products" className="text-primary hover:underline">
          &larr; Back to Products
        </Link>
      </div>
    );
  }

  const additionalImages = product.images ? JSON.parse(product.images) : [];
  const packingOptions = product.category?.packing_options || getPackingOptions(product.name);
  const displayImage = product.image_url || getFallbackImage(product.name);

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8 flex items-center gap-2 text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="p-8 bg-gray-50/50">
              <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm mb-4 border border-gray-100">
                <img 
                  src={activeImage || displayImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4"
                />
              </div>
              
              {/* Thumbnails */}
              {(additionalImages.length > 0 || displayImage) && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  <button 
                    onClick={() => setActiveImage(displayImage)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden ${activeImage === displayImage ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={displayImage} alt="Main" className="w-full h-full object-cover" />
                  </button>
                  {additionalImages.map((img: string, idx: number) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden ${activeImage === img ? 'border-primary' : 'border-transparent'}`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-auto">
                {product.category && (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    {product.category.name}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{product.name}</h1>
                
                <div className="prose prose-lg text-gray-600 mb-8">
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>

                {product.rich_description && (
                  <div className="prose prose-sm text-gray-600 mb-8 max-w-none border-t border-b py-6 border-gray-100">
                    <div dangerouslySetInnerHTML={{ __html: product.rich_description }} />
                  </div>
                )}

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    Available Packing
                  </h3>
                  <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: packingOptions }} />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <button 
                  onClick={() => setIsSpecModalOpen(true)}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
                >
                  <span>Request Full Specification</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
                <p className="text-center text-sm text-gray-400 mt-4">
                  Bulk orders & wholesale inquiries only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SpecificationRequestModal 
        isOpen={isSpecModalOpen} 
        onClose={() => setIsSpecModalOpen(false)} 
        productName={product.name} 
      />
    </div>
  );
}

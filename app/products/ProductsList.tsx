'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/api';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  category_id: number;
}

interface ProcessedCategory extends Category {
  image: string;
  items: string[];
}

export default function ProductsList() {
  const [categories, setCategories] = useState<ProcessedCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback images map based on category name keywords
  const getFallbackImage = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('rice') || lowerName.includes('grain')) return "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    if (lowerName.includes('spice') || lowerName.includes('herb')) return "https://images.unsplash.com/photo-1532336414038-cf19250cbn1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    if (lowerName.includes('pulse') || lowerName.includes('lentil') || lowerName.includes('bean')) return "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    if (lowerName.includes('flour') || lowerName.includes('bak')) return "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    if (lowerName.includes('sugar') || lowerName.includes('salt')) return "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    if (lowerName.includes('oil') || lowerName.includes('ghee')) return "https://images.unsplash.com/photo-1474979266404-7cadd259c308?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    if (lowerName.includes('can') || lowerName.includes('preserv')) return "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    if (lowerName.includes('biscuit') || lowerName.includes('snack')) return "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    if (lowerName.includes('tea') || lowerName.includes('coffee') || lowerName.includes('beverage')) return "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"; // Default fallback
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, prodsRes] = await Promise.all([
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/products`)
        ]);

        if (!catsRes.ok || !prodsRes.ok) throw new Error('Failed to fetch data');

        const cats: Category[] = await catsRes.json();
        const prods: Product[] = await prodsRes.json();

        // Process data to match UI requirements
        const processedCats = cats.map(cat => {
          const catProducts = prods.filter(p => p.category_id === cat.id);
          
          // Use first product image if available, otherwise fallback
          let image = getFallbackImage(cat.name);
          if (catProducts.length > 0 && catProducts[0].image_url) {
            image = catProducts[0].image_url;
          }

          return {
            ...cat,
            image,
            items: catProducts.map(p => p.name)
          };
        });

        // Handle uncategorized products
        const uncategorizedProducts = prods.filter(p => !p.category_id);
        if (uncategorizedProducts.length > 0) {
          processedCats.push({
            id: 0, // Special ID for uncategorized
            name: "Other Products",
            description: "Various products from our collection.",
            image: uncategorizedProducts[0].image_url || getFallbackImage("Other"),
            items: uncategorizedProducts.map(p => p.name)
          });
        }

        setCategories(processedCats);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Our Product Range</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed text-gray-200">
            Sourcing the finest quality food products from around the globe for the Saudi market.
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {categories.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-xl">No products found. Please add products from the admin dashboard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div key={category.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-medium">View all {category.name} products</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                    <ul className="space-y-1">
                      {category.items.slice(0, 5).map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                      {category.items.length > 5 && (
                        <li className="text-primary text-sm font-medium pt-2">
                          + {category.items.length - 5} more items
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

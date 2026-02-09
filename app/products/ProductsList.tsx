'use client';

import { useEffect, useState, Suspense } from 'react';
import { API_URL } from '@/lib/api';
import SpecificationRequestModal from '@/app/components/SpecificationRequestModal';
import { getFallbackImage, getPackingOptions } from '@/lib/productUtils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  description: string;
  packing_options?: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  category_id: number;
}

interface ProcessedCategory extends Category {
  image: string;
  items: { name: string; slug: string }[];
}

export default function ProductsList() {
  return (
    <Suspense fallback={<div className="pt-20 text-center">Loading...</div>}>
      <ProductsListContent />
    </Suspense>
  );
}

function ProductsListContent() {
  const [categories, setCategories] = useState<ProcessedCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const [selectedSpecProduct, setSelectedSpecProduct] = useState('');
  
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
  }, [searchParams]);

  // Helper to filter out retail/forbidden items
  const isAllowedProduct = (name: string) => {
    const forbidden = ['vegetable', 'fruit', 'drink', 'beverage', 'coke', 'pepsi', 'soda', 'pickle', 'juice', 'sabzi'];
    const lower = name.toLowerCase();
    return !forbidden.some(f => lower.includes(f));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add timeout to fetch to fail fast if backend is down
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 2000)
        );

        const fetchWithTimeout = (url: string) => 
          Promise.race([fetch(url), timeoutPromise]) as Promise<Response>;

        const [catsRes, prodsRes] = await Promise.all([
          fetchWithTimeout(`${API_URL}/categories`),
          fetchWithTimeout(`${API_URL}/products`)
        ]);

        if (!catsRes.ok || !prodsRes.ok) throw new Error('Failed to fetch data');

        const cats: Category[] = await catsRes.json();
        const prods: Product[] = await prodsRes.json();

        // Process data to match UI requirements
        const processedCats = cats.map(cat => {
          const catProducts = prods.filter(p => p.category_id === cat.id && isAllowedProduct(p.name));
          
          // Use first product image if available, otherwise fallback
          let image = getFallbackImage(cat.name);
          if (catProducts.length > 0 && catProducts[0].image_url) {
            image = catProducts[0].image_url;
          }

          return {
            ...cat,
            image,
            items: catProducts.map(p => ({ name: p.name, slug: p.slug }))
          };
        }).filter(cat => isAllowedProduct(cat.name)); // Also filter categories

        // Handle uncategorized products
        const uncategorizedProducts = prods.filter(p => !p.category_id && isAllowedProduct(p.name));
        if (uncategorizedProducts.length > 0) {
          processedCats.push({
            id: 0, // Special ID for uncategorized
            name: "Other Products",
            description: "Various products from our collection.",
            image: uncategorizedProducts[0].image_url || getFallbackImage("Other"),
            items: uncategorizedProducts.map(p => ({ name: p.name, slug: p.slug }))
          });
        }

        setCategories(processedCats);
      } catch (error) {
        console.warn('Error fetching products, using fallback data:', error);
        
        // Fallback data when API is unreachable
        // IMAGES MUST BE BULK / WHOLESALE / TRADING FOCUSED (No Retail)
        const fallbackData: ProcessedCategory[] = [
          {
            id: 1,
            name: "Rice & Grains",
            description: "Premium quality Basmati and non-Basmati rice sourced from the best fields.",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Rice grains close up
            items: [
              { name: "Basmati Rice", slug: "basmati-rice" },
              { name: "Jasmine Rice", slug: "jasmine-rice" },
              { name: "Brown Rice", slug: "brown-rice" },
              { name: "Wheat", slug: "wheat" },
              { name: "Corn", slug: "corn" }
            ]
          },
          {
            id: 2,
            name: "Spices & Herbs",
            description: "Aromatic spices to enhance the flavor of your culinary creations.",
            image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Spices bulk
            items: [
              { name: "Cardamom", slug: "cardamom" },
              { name: "Cumin", slug: "cumin" },
              { name: "Turmeric", slug: "turmeric" },
              { name: "Black Pepper", slug: "black-pepper" },
              { name: "Saffron", slug: "saffron" }
            ]
          },
          {
            id: 3,
            name: "Pulses & Legumes",
            description: "Nutritious pulses essential for a balanced and healthy diet.",
            image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Lentils close up
            items: [
              { name: "Lentils", slug: "lentils" },
              { name: "Chickpeas", slug: "chickpeas" },
              { name: "Kidney Beans", slug: "kidney-beans" },
              { name: "Mung Beans", slug: "mung-beans" }
            ]
          },
          {
            id: 4,
            name: "Sugar & Salt",
            description: "High-quality refined sugar and pure salt for everyday use.",
            image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Sugar crystals / pile
            items: [
              { name: "White Sugar", slug: "white-sugar" },
              { name: "Brown Sugar", slug: "brown-sugar" },
              { name: "Table Salt", slug: "table-salt" },
              { name: "Sea Salt", slug: "sea-salt" }
            ]
          },
          {
            id: 5,
            name: "Oils & Ghee",
            description: "Pure and healthy cooking oils and ghee for delicious meals.",
            image: "https://images.unsplash.com/photo-1474979266404-7caddbed646e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Oil (keep distinct from others, but try to find bulk if possible. This one is okay for now as it's golden liquid)
            items: [
              { name: "Sunflower Oil", slug: "sunflower-oil" },
              { name: "Corn Oil", slug: "corn-oil" },
              { name: "Vegetable Ghee", slug: "vegetable-ghee" },
              { name: "Olive Oil", slug: "olive-oil" }
            ]
          },
          {
            id: 6,
            name: "Canned Foods",
            description: "Convenient and long-lasting canned food products.",
            image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Pallets / Shelves
            items: [
              { name: "Tomato Paste", slug: "tomato-paste" },
              { name: "Canned Beans", slug: "canned-beans" },
              { name: "Canned Corn", slug: "canned-corn" },
              { name: "Tuna", slug: "tuna" }
            ]
          }
        ];
        setCategories(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCategories = categories.map(cat => {
    if (!searchQuery.trim()) return cat;
    const query = searchQuery.toLowerCase();
    
    const catMatches = cat.name.toLowerCase().includes(query);
    const matchingItems = cat.items.filter(item => item.name.toLowerCase().includes(query));
    
    if (catMatches) return cat;
    if (matchingItems.length > 0) return { ...cat, items: matchingItems };
    return null;
  }).filter(Boolean) as ProcessedCategory[];

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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
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
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 relative">
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg"
            />
            <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-xl">{searchQuery ? 'No matching products found.' : 'No products found. Please add products from the admin dashboard.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
                <div key={category.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-primary shadow-sm uppercase tracking-wide">
                      Bulk Wholesale
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2 text-primary">{category.name}</h3>
                    <div 
                      className="text-gray-500 mb-4 text-sm leading-relaxed line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: category.description }}
                    />
                    
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Available Packing</p>
                      <div 
                        className="text-sm font-medium text-gray-700"
                        dangerouslySetInnerHTML={{ __html: category.packing_options || getPackingOptions(category.name) }}
                      />
                    </div>

                    <div className="flex-grow">
                      <ul className="space-y-2 mb-6">
                        {(searchQuery ? category.items : category.items.slice(0, 4)).map((item, index) => (
                          <li key={index}>
                            <Link href={`/products/${item.slug}`} className="flex items-center text-gray-700 text-sm hover:text-primary transition-colors group/item">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 group-hover/item:bg-primary transition-colors"></span>
                              <span className="border-b border-transparent group-hover/item:border-primary transition-all">{item.name}</span>
                            </Link>
                          </li>
                        ))}
                        {!searchQuery && category.items.length > 4 && (
                           <li className="text-xs text-gray-400 pl-4 italic">and {category.items.length - 4} more...</li>
                        )}
                      </ul>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setSelectedSpecProduct(category.name);
                        setIsSpecModalOpen(true);
                      }}
                      className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-2 mt-auto">
                      <span>Request Specification</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <SpecificationRequestModal 
        isOpen={isSpecModalOpen} 
        onClose={() => setIsSpecModalOpen(false)} 
        productName={selectedSpecProduct} 
      />
    </div>
  );
}

import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category_id?: number;
  image_url?: string;
  description?: string;
}

interface Category {
  id: number;
  name: string;
}

interface KeyProductsProps {
  products: Product[];
  categories: Category[];
}

const KeyProducts = ({ products, categories }: KeyProductsProps) => {
  // Helper to get category name
  const getCategoryName = (catId?: number) => {
    if (!catId) return "General";
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name : "General";
  };

  // If no products from API, show placeholder or empty state
  // Or we could keep the hardcoded ones as fallback if products array is empty?
  // User wants "best connect CMS", so if CMS is empty, website should probably be empty or show "Coming Soon".
  // But to avoid breaking the look during dev, I'll fallback to hardcoded if ABSOLUTELY 0 products.
  // Actually, better to show what's in DB. If empty, show message.
  
  const displayProducts = products && products.length > 0 ? products.slice(0, 8) : [];

  if (displayProducts.length === 0) {
    // Optional: Render nothing or a "No products" message
    // For now, let's render the section but with a message, or just return null.
    // But to keep layout, maybe just show hardcoded if empty? 
    // "shi sy best trha connect kro" implies using real data.
    // If I show hardcoded, user might think it's not connected.
    // So I will show ONLY real data.
    return (
       <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mt-2">Key Products</h2>
          <p className="mt-4 text-gray-500">No products available at the moment.</p>
        </div>
       </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Portfolio</span>
          <h2 className="text-4xl font-bold text-primary mt-2">Key Products</h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
          <p className="mt-4 text-primary/80 max-w-2xl mx-auto">
            A diverse selection of high-quality food products sourced globally to meet the demands of the Saudi market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={product.image_url || "https://via.placeholder.com/400x300?text=No+Image"} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link 
                    href="/products" 
                    className="bg-primary text-white font-bold py-2 px-6 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  {getCategoryName(product.category_id)}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors"
          >
            <span className="mr-2">View Full Catalog</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KeyProducts;

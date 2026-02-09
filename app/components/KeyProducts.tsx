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
  image_url?: string;
  description?: string;
}

interface KeyProductsProps {
  products: Product[];
  categories: Category[];
}

const KeyProducts = ({ products, categories }: KeyProductsProps) => {
  // Helper to get Bulk/Wholesale images for Categories
  const getCategoryDetails = (name: string) => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('rice')) return {
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Rice Grains Close-up High Quality
      desc: "Premium Basmati & Non-Basmati Rice in Bulk"
    };
    if (lowerName.includes('sugar')) return {
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // White Sugar Sacks/Pile
      desc: "Refined White & Brown Sugar Sourcing"
    };
    if (lowerName.includes('pulse') || lowerName.includes('lentil') || lowerName.includes('dal') || lowerName.includes('daal') || lowerName.includes('bean')) return {
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Colorful Pulses & Grains
      desc: "High-Quality Lentils & Pulses for Wholesale"
    };
    if (lowerName.includes('flour') || lowerName.includes('atta') || lowerName.includes('wheat') || lowerName.includes('bak')) return {
      image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Wheat Field/Harvest
      desc: "Wheat Flour & Grain Processing Supply"
    };
    if (lowerName.includes('spice') || lowerName.includes('masala') || lowerName.includes('herb')) return {
      image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Vibrant Spices Market
      desc: "Aromatic Whole & Ground Spices"
    };
    if (lowerName.includes('oil') || lowerName.includes('ghee')) return {
      image: "https://images.unsplash.com/photo-1474979266404-7caddbed646e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Industrial Oil
      desc: "Edible Oils & Ghee in Industrial Packaging"
    };
    if (lowerName.includes('can') || lowerName.includes('preserv')) return {
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Preserved Food Jars/Cans
      desc: "Canned Food Distribution & Logistics"
    };
    
    return {
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Warehouse
      desc: "Global Commodity Sourcing"
    };
  };

  // Use categories or fallback if empty
  const displayCategories = categories && categories.length > 0 ? categories : [
    { id: 1, name: "Rice & Grains" },
    { id: 2, name: "Sugar & Sweeteners" },
    { id: 3, name: "Edible Oils" },
    { id: 4, name: "Pulses & Lentils" },
    { id: 5, name: "Canned Foods" },
    { id: 6, name: "Spices & Herbs" }
  ];

  return (
    <section className="py-24 bg-white relative">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-3xl">
            <span className="text-accent font-bold uppercase tracking-widest text-xs">Global Marketplace</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-4">Our Commodities</h2>
            <div className="w-20 h-1 bg-accent mt-6"></div>
            <p className="mt-6 text-xl text-gray-600 font-light leading-relaxed">
              Discover our extensive portfolio of high-grade food commodities, sourced directly from global producers for the Saudi market.
            </p>
          </div>
          <div className="hidden md:block">
            <Link href="/products" className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors uppercase tracking-wide text-sm">
              View Full Catalog 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((cat) => {
            const details = getCategoryDetails(cat.name);
            const image = cat.image_url || details.image;
            // Strip HTML tags for card description
            const desc = cat.description ? cat.description.replace(/<[^>]*>?/gm, '') : details.desc;
            const productCount = products ? products.filter(p => p.category_id === cat.id).length : 0;
            
            return (
              <Link 
                key={cat.id} 
                href={`/products?search=${encodeURIComponent(cat.name)}`}
                className="group relative block h-[450px] overflow-hidden rounded-sm shadow-xl bg-gray-900"
              >
                {/* Image */}
                <img 
                  src={image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-70"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold text-white mb-1 leading-none drop-shadow-md">{cat.name}</h3>
                    {productCount > 0 && (
                      <p className="text-accent text-xs font-bold uppercase tracking-wider mb-3 drop-shadow-sm">
                        {productCount} Product{productCount !== 1 ? 's' : ''} Available
                      </p>
                    )}
                    <div className="w-12 h-1 bg-accent mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    <p className="text-gray-200 text-sm font-medium leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-sm line-clamp-3">
                      {desc}
                    </p>
                    
                    <span className="inline-flex items-center text-accent text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      View Catalog <span className="ml-2">→</span>
                    </span>
                  </div>
                </div>

                {/* Top Border Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-accent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            );
          })}
        </div>
        
        <div className="text-center mt-12 md:hidden">
          <Link href="/products" className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-sm hover:bg-primary/90 transition-all uppercase tracking-widest text-sm shadow-lg">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KeyProducts;

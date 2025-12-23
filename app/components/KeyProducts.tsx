import Link from 'next/link';

const KeyProducts = () => {
  const products = [
    { name: "Premium Basmati Rice", category: "Grains", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
    { name: "Exotic Spices", category: "Spices", image: "https://images.unsplash.com/photo-1532336414038-cf19250cbn1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
    { name: "Organic Pulses", category: "Grains", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
    { name: "Flour & Baking", category: "Baking", image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
    { name: "Refined Sugar", category: "Pantry", image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
    { name: "Vegetable Oils", category: "Cooking Essentials", image: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
    { name: "Premium Dates", category: "Fruits", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
    { name: "Tea & Coffee", category: "Beverages", image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
  ];

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
          {products.map((product, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={product.image} 
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
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{product.category}</div>
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

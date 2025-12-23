import Link from 'next/link';

export const metadata = {
  title: 'Our Products | Trans Emirates Company',
  description: 'Explore our wide range of premium food products including rice, spices, sugar, pulses, and more.',
};

const ProductsPage = () => {
  const categories = [
    {
      id: "grains",
      title: "Rice & Grains",
      description: "Premium Basmati, Sella, and Long Grain Rice sourced from the finest fields.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      items: ["Premium Basmati Rice", "Sella Rice", "Long Grain Rice", "Jasmine Rice"]
    },
    {
      id: "spices",
      title: "Spices & Herbs",
      description: "Aromatic spices that bring authentic flavor to every dish.",
      image: "https://images.unsplash.com/photo-1532336414038-cf19250cbn1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      items: ["Red Chili Powder", "Turmeric", "Coriander", "Cumin Seeds", "Black Pepper", "Cardamom"]
    },
    {
      id: "pulses",
      title: "Pulses & Lentils",
      description: "Nutritious and high-quality pulses essential for daily consumption.",
      image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      items: ["Red Lentils (Masoor)", "Yellow Lentils (Moong)", "Chickpeas (Chana)", "Black Gram", "Kidney Beans"]
    },
    {
      id: "flour",
      title: "Flour & Baking",
      description: "Finest quality wheat flour and baking essentials.",
      image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      items: ["Whole Wheat Flour (Atta)", "All-Purpose Flour (Maida)", "Semolina (Suji)", "Baking Powder", "Yeast"]
    },
    {
      id: "pantry",
      title: "Sugar & Salt",
      description: "Pure refined sugar and iodized salt for everyday needs.",
      image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      items: ["Refined White Sugar", "Brown Sugar", "Iodized Salt", "Himalayan Pink Salt"]
    },
    {
      id: "oil",
      title: "Oils & Ghee",
      description: "Healthy cooking oils and rich ghee for traditional taste.",
      image: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      items: ["Sunflower Oil", "Corn Oil", "Vegetable Ghee", "Pure Desi Ghee", "Olive Oil"]
    },
    {
      id: "canned",
      title: "Canned Foods",
      description: "Convenient and preserved food options for quick meals.",
      image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      items: ["Canned Tuna", "Canned Beans", "Tomato Paste", "Sweet Corn", "Pineapple Slices"]
    },
    {
      id: "snacks",
      title: "Biscuits & Snacks",
      description: "Delightful range of biscuits and savory snacks.",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      items: ["Cream Biscuits", "Tea Biscuits", "Wafers", "Crackers", "Chips"]
    },
    {
      id: "beverages",
      title: "Tea & Coffee",
      description: "Premium blends for the perfect cup every time.",
      image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      items: ["Black Tea", "Green Tea", "Arabic Coffee", "Instant Coffee"]
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                    <div className="w-12 h-1 bg-accent rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-primary/80 mb-6 min-h-[3rem]">{category.description}</p>
                  <div>
                    <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">Key Items</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {category.items.map((item, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Looking for Bulk Supply?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            We offer competitive rates for wholesalers, retailers, and HORECA partners. Get in touch for a customized quote.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-secondary font-bold py-4 px-10 rounded-full hover:bg-primary hover:text-white transition-all shadow-lg"
            >
              Request a Quote
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-secondary transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

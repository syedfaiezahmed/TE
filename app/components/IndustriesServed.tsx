import React from 'react';

const IndustriesServed = () => {
  const industries = [
    {
      title: "Supermarkets & Hypermarkets",
      description: "Supply chain solutions for major retail giants ensuring consistent stock of premium food products.",
      icon: "🛒",
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "Wholesale Distributors",
      description: "Bulk trading partnerships with regional distributors to reach every corner of the Kingdom.",
      icon: "📦",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "HORECA Sector",
      description: "Dedicated service for Hotels, Restaurants, and Cafes requiring high-quality ingredients.",
      icon: "🍽️",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "SMEs & Startups",
      description: "Strategic consulting for emerging businesses in the retail and food sectors.",
      icon: "💼",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-bold uppercase tracking-widest text-sm bg-secondary/10 px-4 py-1 rounded-full">
            Our Clients
          </span>
          <h2 className="text-4xl font-bold text-primary mt-4">Industries We Serve</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-primary/80 max-w-2xl mx-auto text-lg">
            We build lasting partnerships across diverse sectors, delivering value through reliability and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="group relative h-[400px] overflow-hidden rounded-2xl shadow-lg">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${industry.image}')` }}
              ></div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent opacity-90 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-2xl mb-4 text-white">
                    {industry.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{industry.title}</h3>
                  <p className="text-white/80 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {industry.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;

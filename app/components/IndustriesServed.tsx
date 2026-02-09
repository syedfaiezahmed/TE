import React from 'react';

const IndustriesServed = () => {
  const industries = [
    {
      title: "Supermarkets & Hypermarkets",
      description: "Reliable bulk supply chain for major retail chains.",
      icon: "🏗️",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" // Pallets / Warehouse
    },
    {
      title: "Wholesale Distributors",
      description: "High-volume trading partnerships for regional distribution.",
      icon: "📦",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" // Warehouse rows
    },
    {
      title: "Food Manufacturers",
      description: "Raw ingredients supply for large-scale food production.",
      icon: "🏭",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" // Industrial / Factory
    },
    {
      title: "Export & Re-Export",
      description: "Logistics and sourcing for international markets.",
      icon: "🚢",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" // Shipping Containers
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-accent font-bold uppercase tracking-widest text-xs">Our Clients</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-4 mb-6">Industries We Serve</h2>
            <p className="text-gray-600 text-lg font-light leading-relaxed">
              We build lasting partnerships across diverse sectors, delivering value through reliability and expertise.
            </p>
          </div>
          <div className="hidden md:block">
            <a href="/contact" className="inline-flex items-center font-bold text-primary border-b-2 border-accent hover:text-accent transition-colors pb-1 uppercase tracking-wide text-sm">
              Partner With Us <span className="ml-2">→</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <div key={index} className="group relative h-[450px] overflow-hidden rounded-sm shadow-xl bg-primary">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                style={{ backgroundImage: `url('${industry.image}')` }}
              ></div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-4xl mb-4 text-accent">
                    {industry.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{industry.title}</h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                    <p className="text-gray-300 leading-relaxed text-sm mb-4">
                      {industry.description}
                    </p>
                    <span className="text-accent text-xs font-bold uppercase tracking-widest">Learn More</span>
                  </div>
                </div>
              </div>
              
              {/* Border Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a href="/contact" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-sm uppercase tracking-wide text-sm">
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;

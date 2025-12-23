import React from 'react';

const TrustedPartners = () => {
  const partners = [
    { name: "Retail Giant KSA", logo: "🏢" },
    { name: "HyperMarket Co", logo: "🛒" },
    { name: "Saudi Hospitality", logo: "🏨" },
    { name: "Global Foods", logo: "🌍" },
    { name: "Local Distributors", logo: "🚚" },
    { name: "Premium Hotels", logo: "🛎️" },
  ];

  return (
    <section className="py-8 bg-white border-b border-secondary/10">
      <div className="container mx-auto px-4">
        <p className="text-center text-primary/60 font-bold uppercase tracking-widest text-sm mb-6">
          Trusted by Leading Retailers & Partners Across the Kingdom
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <span className="text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {partner.logo}
              </span>
              <span className="text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;

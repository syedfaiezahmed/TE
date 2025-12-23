import Link from 'next/link';

export const metadata = {
  title: 'Market Coverage | Trans Emirates Company',
  description: 'Our extensive distribution network covering major regions and cities across Saudi Arabia.',
};

const MarketCoveragePage = () => {
  const regions = [
    {
      name: "Western Region",
      hub: "Jeddah (HQ)",
      cities: ["Jeddah", "Makkah", "Madinah", "Taif", "Yanbu", "Rabigh"],
      color: "bg-primary"
    },
    {
      name: "Southern Region",
      hub: "Khamis Mushait",
      cities: ["Abha", "Khamis Mushait", "Jizan", "Najran", "Bisha", "Al Bahah"],
      color: "bg-secondary"
    },
    {
      name: "Northern Region",
      hub: "Tabuk",
      cities: ["Tabuk", "Sakaka", "Arar", "Al Jouf", "Hail", "Dubal"],
      color: "bg-accent"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Market Coverage</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed text-gray-200">
            A robust logistics network reaching every corner of the Kingdom.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-10 z-20 container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="py-4 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">60%</div>
              <div className="text-gray-500 font-medium uppercase tracking-wide">Geographical Area</div>
            </div>
            <div className="py-4 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-secondary mb-2">55%</div>
              <div className="text-gray-500 font-medium uppercase tracking-wide">Population Reach</div>
            </div>
            <div className="py-4 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">3</div>
              <div className="text-gray-500 font-medium uppercase tracking-wide">Regional Hubs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Regions Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Visual Representation (Map Placeholder) */}
            <div className="w-full lg:w-1/2">
              <div className="sticky top-24">
                <h2 className="text-3xl font-bold text-primary mb-6">Strategic Presence</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our network is designed to ensure efficient distribution to both major urban centers and remote rural areas. With strategically located warehouses and a dedicated fleet, we guarantee timely delivery and product freshness.
                </p>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden h-[400px] flex items-center justify-center bg-blue-50">
                  <div className="text-center opacity-50">
                     <span className="text-9xl">🇸🇦</span>
                     <p className="mt-4 font-bold text-primary">KSA Map Visual</p>
                  </div>
                  {/* Interactive Dots */}
                  <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-primary rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg" title="Jeddah"></div>
                  
                  <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-secondary rounded-full animate-ping delay-75"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg" title="Khamis Mushait"></div>

                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full animate-ping delay-150"></div>
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full border-2 border-white shadow-lg" title="Tabuk"></div>
                </div>
              </div>
            </div>

            {/* Regions List */}
            <div className="w-full lg:w-1/2 space-y-8">
              {regions.map((region, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-l-8" style={{ borderLeftColor: index === 0 ? '#7E3736' : index === 1 ? '#C09977' : '#D4AF37' }}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{region.name}</h3>
                      <p className="text-gray-500 font-medium mt-1">Hub: <span className="text-primary font-bold">{region.hub}</span></p>
                    </div>
                    <div className="text-3xl">📍</div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Key Cities Covered</h4>
                    <ul className="grid grid-cols-2 gap-3">
                      {region.cities.map((city, idx) => (
                        <li key={idx} className="flex items-center text-gray-700 font-medium">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Expand Your Reach in Saudi Arabia</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Partner with us to leverage our established distribution channels and market expertise.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-primary font-bold py-4 px-10 rounded-full hover:bg-accent hover:text-white transition-all shadow-lg"
          >
            Become a Partner
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MarketCoveragePage;

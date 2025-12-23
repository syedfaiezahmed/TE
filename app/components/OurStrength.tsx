const OurStrength = () => {
  const stats = [
    { label: "Years Experience", value: "25+", icon: "📅" },
    { label: "Area Coverage", value: "60%", icon: "🗺️" },
    { label: "Population Coverage", value: "55%", icon: "👥" },
    { label: "Regional Offices", value: "3", icon: "🏢" },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 text-white">
          <span className="bg-white/20 px-4 py-1 rounded-full text-white font-bold uppercase tracking-widest text-sm backdrop-blur-sm">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6">Our Strengths</h2>
          <p className="mt-6 text-white/90 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Leveraging decades of experience and a robust logistics network to deliver excellence across the Kingdom.
          </p>
        </div>

        {/* Floating Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/20 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-accent-light font-medium uppercase tracking-wider text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-secondary/20"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                📍
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Strategic Presence</h3>
              <p className="text-primary/80 leading-relaxed mb-6">
                Headquartered in <span className="font-bold text-primary">Jeddah</span>, with regional hubs in <span className="font-bold text-primary">Khamis Mushait</span> and <span className="font-bold text-primary">Tabuk</span>. Our network ensures efficient distribution to key markets.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-primary/70">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                  Main Commercial District (Jeddah)
                </li>
                <li className="flex items-center text-sm text-primary/70">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                  Logistics Center (Khamis Mushait)
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-primary/10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🌍
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Global Sourcing</h3>
              <p className="text-primary/80 leading-relaxed mb-6">
                We connect Saudi Arabia with the world, importing premium goods from <span className="font-bold text-primary">Pakistan, India, UAE</span>, and other international markets to meet local demand.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-primary/70">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                  Premium International Suppliers
                </li>
                <li className="flex items-center text-sm text-primary/70">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                  Quality Control Standards
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStrength;

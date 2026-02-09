interface OurStrengthProps {
  content?: Record<string, string>;
}

const OurStrength = ({ content }: OurStrengthProps) => {
  const title = content?.strength_title || "Infrastructure & Reach";
  const text = content?.strength_text || "Built on a foundation of robust logistics and strategic warehousing across the Kingdom.";
  
  const stats = [
    { label: "Years Experience", value: "25+", icon: "📅" },
    { label: "Area Coverage", value: "60%", icon: "🗺️" },
    { label: "Population Coverage", value: "55%", icon: "👥" },
    { label: "Regional Offices", value: "3", icon: "🏢" },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-primary">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
      ></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 text-white">
          <span className="bg-accent/20 px-4 py-1 rounded-sm text-accent font-bold uppercase tracking-widest text-xs backdrop-blur-sm border border-accent/30">Core Competencies</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6">{title}</h2>
          <div 
            className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>

        {/* Floating Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm border-t-2 border-accent p-6 text-center transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/10"
            >
              <div className="text-3xl mb-3 opacity-80">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 font-medium uppercase tracking-wider text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Box 1 */}
          <div className="bg-white rounded-sm p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:bg-accent/10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary text-white rounded-sm flex items-center justify-center mb-8 text-2xl shadow-lg">
                📍
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 uppercase tracking-wide">Strategic Warehousing</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Operating state-of-the-art storage facilities in <span className="font-bold text-primary">Jeddah, Khamis Mushait, and Tabuk</span>. Our warehouses are equipped with advanced inventory management systems.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm font-bold text-primary uppercase tracking-wider">
                  <span className="w-2 h-2 bg-accent mr-3"></span>
                  Temperature Controlled
                </div>
                <div className="flex items-center text-sm font-bold text-primary uppercase tracking-wider">
                  <span className="w-2 h-2 bg-accent mr-3"></span>
                  24/7 Logistics Operations
                </div>
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-sm p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:bg-accent/10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary text-white rounded-sm flex items-center justify-center mb-8 text-2xl shadow-lg">
                🌍
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 uppercase tracking-wide">International Sourcing</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Direct procurement channels from major agricultural hubs in <span className="font-bold text-primary">India, Pakistan, Brazil, and Thailand</span> to ensure consistent supply and competitive pricing.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm font-bold text-primary uppercase tracking-wider">
                  <span className="w-2 h-2 bg-accent mr-3"></span>
                  Direct Farm-to-Port
                </div>
                <div className="flex items-center text-sm font-bold text-primary uppercase tracking-wider">
                  <span className="w-2 h-2 bg-accent mr-3"></span>
                  Strict Quality Control
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStrength;

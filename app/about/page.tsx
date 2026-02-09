import Link from 'next/link';

export const metadata = {
  title: 'About Us | Trans Emirates Company',
  description: 'Learn about Trans Emirates Company, a trusted trading and consulting partner in Saudi Arabia established in 2000.',
};

async function getContent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${apiUrl}/content`, { cache: 'no-store' });
    if (!res.ok) return {};
    return res.json();
  } catch (error) {
    return {};
  }
}

const AboutPage = async () => {
  const content = await getContent();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">{content.about_hero_title || "Our Story"}</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed text-gray-200">
            {content.about_hero_desc || "Pioneering global supply chain solutions and commodity trading in Saudi Arabia since 2000."}
          </p>
        </div>
      </section>

      {/* Founder & History Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={content.about_image_url || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"} 
                  alt="Global Trading & Logistics" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 text-white">
                  <p className="font-bold text-lg">Established in {content.about_founded_year || "2000"}</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">{content.about_history_title || "A Legacy of Excellence"}</h2>
              
              {content.about_history_text ? (
                <div className="text-lg text-gray-700 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: content.about_history_text }} />
              ) : (
                <>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Trans Emirates Company was founded in <span className="font-bold text-primary">{content.about_founded_year || "2000"}</span> by <span className="font-bold text-primary">{content.about_founder_name || "Raja Muhammad Basheer"}</span> with a vision to bridge the gap between global quality products and the Saudi market.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Starting as a focused trading entity, we have grown into a multi-faceted organization. Today, we stand as a pillar of reliability in food distribution and supply chain excellence.
                  </p>
                </>
              )}

              <div className="pt-4">
                <div className="inline-block bg-secondary/10 px-6 py-4 rounded-lg border-l-4 border-secondary">
                  <p className="text-primary font-medium italic">
                    "{content.about_quote || "Our success is built on unwavering integrity, deep market understanding, and a commitment to the prosperity of our partners and the Kingdom."}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-background p-8 rounded-2xl shadow-lg border-t-4 border-primary hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-3xl mb-6">
                👁️
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                {content.about_vision || "To be the undisputed leader in B2B supply chain solutions across the GCC, driving sustainable growth for our partners."}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-background p-8 rounded-2xl shadow-lg border-t-4 border-accent hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-3xl mb-6">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                {content.about_mission || "To deliver premium quality products to every household in KSA."}
              </p>
            </div>

            {/* Values */}
            <div className="bg-background p-8 rounded-2xl shadow-lg border-t-4 border-secondary hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-3xl mb-6">
                💎
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Values</h3>
              {content.about_values ? (
                 <div className="text-gray-600 leading-relaxed whitespace-pre-line">{content.about_values}</div>
              ) : (
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>Integrity & Trust</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>Excellence in Service</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>Innovation & Growth</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>Community Commitment</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Core Focus</h2>
            <div className="w-24 h-1 bg-white mx-auto opacity-50"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Trading Division */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors">
              <div className="text-4xl mb-6">🚢</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Trans Emirates Trading</h3>
              <p className="text-accent font-bold uppercase text-sm mb-6">Global Commodity Sourcing & Distribution</p>
              <p className="text-white/80 mb-6 leading-relaxed">
                Specializing in the import and wholesale distribution of essential food commodities including rice, sugar, spices, and pulses. We serve wholesalers, retailers, and the HORECA sector with an efficient logistics network.
              </p>
              <Link href="/products" className="inline-block text-white font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors">
                View Commodities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

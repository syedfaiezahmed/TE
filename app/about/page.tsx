import Link from 'next/link';

export const metadata = {
  title: 'About Us | Trans Emirates Company',
  description: 'Learn about Trans Emirates Company, a trusted trading and consulting partner in Saudi Arabia established in 2000.',
};

const AboutPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Our Story</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed text-gray-200">
            Building trust and delivering excellence in Saudi Arabia since 2000.
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
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="Founder Vision" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 text-white">
                  <p className="font-bold text-lg">Established in 2000</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">A Legacy of Excellence</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Trans Emirates Company was founded in <span className="font-bold text-primary">2000</span> by <span className="font-bold text-primary">Raja Muhammad Basheer</span> with a vision to bridge the gap between global quality products and the Saudi market.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Starting as a focused trading entity, we have grown into a multi-faceted organization. Today, we stand as a pillar of reliability in food distribution and have expanded our expertise into professional business consulting through our Prospera division.
              </p>
              <div className="pt-4">
                <div className="inline-block bg-secondary/10 px-6 py-4 rounded-lg border-l-4 border-secondary">
                  <p className="text-primary font-medium italic">
                    "Our success is built on unwavering integrity, deep market understanding, and a commitment to the prosperity of our partners and the Kingdom."
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
                To be the undisputed leader in supply chain solutions and business advisory services across the GCC, driving sustainable growth for our partners.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-background p-8 rounded-2xl shadow-lg border-t-4 border-accent hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-3xl mb-6">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver premium quality products to every household in KSA and empower businesses with strategic financial insights and digital transformation.
              </p>
            </div>

            {/* Values */}
            <div className="bg-background p-8 rounded-2xl shadow-lg border-t-4 border-secondary hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-3xl mb-6">
                💎
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Values</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>Integrity & Trust</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>Excellence in Service</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>Innovation & Growth</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>Community Commitment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Divisions */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Core Divisions</h2>
            <div className="w-24 h-1 bg-white mx-auto opacity-50"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Trading Division */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors">
              <div className="text-4xl mb-6">🚢</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Trans Emirates Trading</h3>
              <p className="text-accent font-bold uppercase text-sm mb-6">Foodstuff Import & Distribution</p>
              <p className="text-white/80 mb-6 leading-relaxed">
                Specializing in the import and wholesale distribution of essential food commodities including rice, sugar, spices, and pulses. We serve wholesalers, retailers, and the HORECA sector with an efficient logistics network.
              </p>
              <Link href="/products" className="inline-block text-white font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors">
                View Products
              </Link>
            </div>

            {/* Consulting Division */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors">
              <div className="text-4xl mb-6">💼</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Prospera Consulting</h3>
              <p className="text-accent font-bold uppercase text-sm mb-6">Financial & Business Advisory</p>
              <p className="text-white/80 mb-6 leading-relaxed">
                Providing expert financial consulting, tax & Zakat advisory, and ERP implementation services. We help businesses optimize operations, ensure compliance, and achieve sustainable growth.
              </p>
              <Link href="/consulting" className="inline-block text-white font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

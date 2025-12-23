import Link from 'next/link';

export const metadata = {
  title: 'Prospera Consulting | Trans Emirates Company',
  description: 'Expert financial, tax, and technology consulting services for SMEs and investors in Saudi Arabia.',
};

const ConsultingPage = () => {
  const services = [
    {
      title: "Financial Advisory",
      description: "Strategic financial planning, budgeting, and forecasting to ensure sustainable growth and stability.",
      icon: "💰"
    },
    {
      title: "Tax, Zakat & VAT",
      description: "Comprehensive compliance services navigating the complexities of Saudi tax regulations.",
      icon: "📊"
    },
    {
      title: "Feasibility Studies",
      description: "In-depth market analysis and business planning for new ventures and expansions.",
      icon: "📑"
    },
    {
      title: "ERP Implementation",
      description: "Digital transformation using Zoho, Odoo, and Tally to streamline your business operations.",
      icon: "💻"
    },
    {
      title: "Internal Controls",
      description: "Robust risk management and audit frameworks to safeguard your assets and ensure accountability.",
      icon: "🛡️"
    },
    {
      title: "Investor Support",
      description: "End-to-end assistance for international investors entering the Saudi market, from licensing to launch.",
      icon: "🤝"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-accent font-bold uppercase tracking-widest text-sm bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm mb-4 inline-block">A Division of Trans Emirates Company</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Prospera Consulting</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed text-gray-200">
            Empowering businesses with financial intelligence and digital innovation.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Navigating the Future of Business</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              In a rapidly evolving Saudi economy, having the right financial and technological partner is crucial. 
              <span className="font-bold text-primary"> Prospera Consulting</span> combines deep local expertise with global best practices to help SMEs and large enterprises optimize performance, ensure compliance, and unlock new growth opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-background p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Industries We Serve</h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Our consultants have specialized experience across key sectors of the Saudi economy, allowing us to provide tailored advice that drives real results.
              </p>
              <ul className="space-y-4">
                {['Retail & Wholesale', 'Manufacturing', 'Real Estate & Construction', 'Technology & Startups', 'Hospitality & Tourism'].map((industry, index) => (
                  <li key={index} className="flex items-center text-lg">
                    <span className="w-2 h-2 bg-accent rounded-full mr-4"></span>
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl mb-2">🏭</div>
                  <div className="font-bold">Manufacturing</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl mb-2">🛒</div>
                  <div className="font-bold">Retail</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl mb-2">🏗️</div>
                  <div className="font-bold">Construction</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl mb-2">💻</div>
                  <div className="font-bold">Technology</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6">Ready to Optimize Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our experts to discuss your financial goals and operational challenges.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-secondary transition-colors shadow-lg"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ConsultingPage;

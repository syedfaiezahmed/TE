import Link from 'next/link';

interface WhoWeAreProps {
  content: Record<string, string>;
}

const WhoWeAre = ({ content }: WhoWeAreProps) => {
  const title = content.whoweare_title || "Who We Are";
  // Fallback text if not provided in CMS
  const defaultText = "A leading distributor of premium food products across major cities and rural markets in the Kingdom of Saudi Arabia. We ensure quality and reliability in every delivery, connecting global producers with local consumers.";
  const mainText = content.whoweare_text || defaultText;

  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-bold uppercase tracking-widest text-sm bg-secondary/10 px-4 py-1 rounded-full">Our Divisions</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mt-4">{title}</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="flex flex-col gap-16">
          
          {/* Division 1: Trading */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-accent/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full flex items-center justify-center shadow-xl z-10 hidden md:flex">
                <span className="text-white font-bold text-xl text-center leading-tight">Trusted<br/>Partner</span>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-3">Trans Emirates Trading</h3>
                <p className="text-accent font-bold text-lg uppercase tracking-wide">Foodstuff Distribution & Supply Chain</p>
              </div>
              
              <p className="text-primary/80 text-lg leading-relaxed">
                {mainText}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-background rounded-lg border border-secondary/20">
                  <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                  <span className="text-primary font-semibold">Nationwide Network</span>
                </div>
                <div className="flex items-center p-4 bg-background rounded-lg border border-secondary/20">
                  <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                  <span className="text-primary font-semibold">Global Sourcing</span>
                </div>
                <div className="flex items-center p-4 bg-background rounded-lg border border-secondary/20">
                  <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                  <span className="text-primary font-semibold">Retail Partnerships</span>
                </div>
                <div className="flex items-center p-4 bg-background rounded-lg border border-secondary/20">
                  <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                  <span className="text-primary font-semibold">Quality Assurance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Division 2: Consulting */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-xl z-10 hidden md:flex">
                <span className="text-white font-bold text-xl text-center leading-tight">Expert<br/>Advice</span>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-3">Prospera Consulting</h3>
                <p className="text-accent font-bold text-lg uppercase tracking-wide">Finance, tax, ERP & digital advisory for SMEs & investors</p>
              </div>
              
              <p className="text-primary/80 text-lg leading-relaxed">
                Empowering SMEs and investors with expert financial guidance, tax optimization strategies, and cutting-edge technology solutions to drive sustainable growth in the dynamic Saudi market.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-background rounded-lg border border-primary/10">
                  <span className="w-3 h-3 bg-accent rounded-full mr-3"></span>
                  <span className="text-primary font-semibold">Strategic Planning</span>
                </div>
                <div className="flex items-center p-4 bg-background rounded-lg border border-primary/10">
                  <span className="w-3 h-3 bg-accent rounded-full mr-3"></span>
                  <span className="text-primary font-semibold">Zakat & Tax</span>
                </div>
                <div className="flex items-center p-4 bg-background rounded-lg border border-primary/10">
                  <span className="w-3 h-3 bg-accent rounded-full mr-3"></span>
                  <span className="text-primary font-semibold">Digital Solutions</span>
                </div>
                <div className="flex items-center p-4 bg-background rounded-lg border border-primary/10">
                  <span className="w-3 h-3 bg-accent rounded-full mr-3"></span>
                  <span className="text-primary font-semibold">Business Growth</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/consulting" className="inline-flex items-center text-primary font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors">
                  Explore Consulting Services
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

import Link from 'next/link';

interface WhoWeAreProps {
  content: Record<string, string>;
}

const WhoWeAre = ({ content }: WhoWeAreProps) => {
  const title = content.whoweare_title || "Who We Are";
  // Fallback text if not provided in CMS
  const defaultText = "Engineering trusted global trade at scale. We connect international producers with the Saudi market through technology-enabled supply chains, ensuring quality, reliability, and efficiency in every transaction.";
  const mainText = content.whoweare_text || defaultText;

  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mt-4">{title}</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="flex flex-col gap-16">
          
          {/* Division 1: Trading */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-accent/20 rounded-sm transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative h-[500px] w-full rounded-sm overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-secondary rounded-sm flex flex-col items-center justify-center shadow-xl z-10 hidden md:flex border-4 border-white">
                <span className="text-white font-bold text-3xl">25+</span>
                <span className="text-white/80 text-xs uppercase tracking-wider mt-1">Years of<br/>Excellence</span>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <div className="inline-block bg-primary/5 px-3 py-1 rounded-sm mb-4">
                  <span className="text-primary font-bold text-sm uppercase tracking-wider">Since 2000</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">Trans Emirates Trading</h3>
                <p className="text-accent font-bold text-lg uppercase tracking-wide border-l-4 border-accent pl-4">Global Trade & Supply Chain Solutions</p>
              </div>
              
              <div 
                className="text-gray-600 text-lg leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: mainText }}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start p-4 bg-gray-50 rounded-sm hover:bg-white hover:shadow-lg transition-all border-l-4 border-transparent hover:border-accent">
                  <div className="text-2xl mr-4">🌍</div>
                  <div>
                    <h4 className="font-bold text-primary">Global Network</h4>
                    <p className="text-sm text-gray-500">Connecting 30+ countries</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-gray-50 rounded-sm hover:bg-white hover:shadow-lg transition-all border-l-4 border-transparent hover:border-accent">
                  <div className="text-2xl mr-4">🏭</div>
                  <div>
                    <h4 className="font-bold text-primary">Direct Sourcing</h4>
                    <p className="text-sm text-gray-500">From producers to you</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-gray-50 rounded-sm hover:bg-white hover:shadow-lg transition-all border-l-4 border-transparent hover:border-accent">
                  <div className="text-2xl mr-4">🚛</div>
                  <div>
                    <h4 className="font-bold text-primary">Efficient Logistics</h4>
                    <p className="text-sm text-gray-500">End-to-end management</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-gray-50 rounded-sm hover:bg-white hover:shadow-lg transition-all border-l-4 border-transparent hover:border-accent">
                  <div className="text-2xl mr-4">✅</div>
                  <div>
                    <h4 className="font-bold text-primary">Quality Assurance</h4>
                    <p className="text-sm text-gray-500">ISO 22000 Certified</p>
                  </div>
                </div>
              </div>

              <Link href="/about" className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors group">
                <span>Discover Our Story</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

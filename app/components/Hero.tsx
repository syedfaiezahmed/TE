import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", // Warehouse/Logistics image
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
          <span className="block text-accent mb-2">Trans Emirates Company</span>
          <span className="block text-2xl md:text-4xl lg:text-5xl font-light">Trusted Trading and Consulting Partner in Saudi Arabia</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-gray-200 font-light leading-relaxed">
          Serving the Saudi market for over 25 years in food distribution, supply chain, and business consulting.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
          <Link 
            href="/contact" 
            className="w-full md:w-auto bg-white hover:bg-gray-100 text-primary font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Request a Quote
          </Link>
          <Link 
            href="/suppliers" 
            className="w-full md:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105"
          >
            Become a Supplier
          </Link>
          <Link 
            href="/contact" 
            className="w-full md:w-auto bg-primary-light hover:bg-secondary text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white/70" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

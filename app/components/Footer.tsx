'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary relative overflow-hidden">
      <div className="container mx-auto px-4 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Brand & About (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-secondary font-bold text-2xl shadow-sm">TE</div>
              <h3 className="text-3xl font-bold text-white tracking-tight">Trans Emirates</h3>
            </div>
            <p className="text-primary/90 leading-relaxed font-medium text-lg pr-4">
              Your trusted partner in food distribution, supply chain management, and business consulting across the Kingdom of Saudi Arabia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>

          {/* Links (2 Columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-4 text-white border-b-2 border-primary/20 pb-2 inline-block">Explore</h4>
            <ul className="space-y-3 font-medium">
              {['Home', 'About Us', 'Our Products', 'Consulting', 'Market Coverage', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="flex items-center text-primary/80 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full mr-3"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations (3 Columns) */}
          <div className="lg:col-span-3">
            <h4 className="text-xl font-bold mb-4 text-white border-b-2 border-primary/20 pb-2 inline-block">Our Hubs</h4>
            <ul className="space-y-4">
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <strong className="text-white block text-lg mb-1">Jeddah (HQ)</strong>
                  <span className="text-primary/80 text-sm font-medium">Main Commercial District</span>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1zm8-1a1 1 0 00-1-1h-6v-3a1 1 0 00-1-1H4a1 1 0 00-1 1v7h15a1 1 0 001-1z" /></svg>
                </div>
                <div>
                  <strong className="text-white block text-lg mb-1">Khamis Mushait</strong>
                  <span className="text-primary/80 text-sm font-medium">Logistics Center</span>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <strong className="text-white block text-lg mb-1">Tabuk</strong>
                  <span className="text-primary/80 text-sm font-medium">Northern Trade Hub</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter (3 Columns) */}
          <div className="lg:col-span-3">
            <h4 className="text-xl font-bold mb-4 text-white border-b-2 border-primary/20 pb-2 inline-block">Stay Connected</h4>
            <p className="text-primary/80 mb-6 font-medium">Subscribe for market insights and company updates.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-lg bg-white/40 border border-white/20 text-primary placeholder-primary/60 focus:outline-none focus:bg-white/60 focus:ring-2 focus:ring-primary transition-all"
              />
              <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-light transition-colors shadow-sm">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-primary/70">
          <p>&copy; {new Date().getFullYear()} Trans Emirates Company. All Rights Reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

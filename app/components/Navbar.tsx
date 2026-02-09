'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/95 backdrop-blur-sm shadow-lg py-2' : 'bg-primary/80 backdrop-blur-sm py-4'
      } text-white`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-accent text-3xl">✦</span>
            <span>Trans Emirates</span>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wide">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-accent transition-colors">
            About Us
          </Link>
          <Link href="/products" className="hover:text-accent transition-colors">
            Commodities
          </Link>
          <Link href="/market-coverage" className="hover:text-accent transition-colors">
            Logistics
          </Link>
          <Link href="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
          
          {/* CTA Button */}
          <Link 
            href="/contact" 
            className="bg-accent hover:bg-accent-light text-primary font-bold py-2 px-6 rounded-md transition-all transform hover:-translate-y-0.5 shadow-lg uppercase tracking-wider text-sm"
          >
            Request Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none text-accent">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-white/10 absolute w-full left-0 top-full shadow-xl">
          <ul className="flex flex-col p-6 space-y-4 text-center text-lg font-medium">
            <li>
              <Link href="/" onClick={toggleMenu} className="block hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={toggleMenu} className="block hover:text-accent transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" onClick={toggleMenu} className="block hover:text-accent transition-colors">
                Commodities
              </Link>
            </li>
            <li>
              <Link href="/market-coverage" onClick={toggleMenu} className="block hover:text-accent transition-colors">
                Logistics
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu} className="block hover:text-accent transition-colors">
                Contact
              </Link>
            </li>
            <li className="pt-4">
              <Link 
                href="/contact" 
                onClick={toggleMenu}
                className="inline-block w-full bg-accent text-primary font-bold py-3 rounded-md hover:bg-accent-light transition-colors uppercase tracking-wider"
              >
                Request Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

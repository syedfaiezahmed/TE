'use client';

import { useState, useEffect } from 'react';

interface DivisionModalProps {
  shouldShow: boolean;
}

const DivisionModal = ({ shouldShow }: DivisionModalProps) => {
  const [isOpen, setIsOpen] = useState(shouldShow);
  const [isVisible, setIsVisible] = useState(shouldShow);

  useEffect(() => {
    // Check cookie on mount to ensure modal shows if cookie is missing
    const checkCookie = () => {
      const hasCookie = document.cookie.split(';').some(c => c.trim().startsWith('te_division_selected_v2='));
      console.log('DivisionModal check:', { hasCookie, shouldShow, isOpen });
      
      if (!hasCookie) {
        setIsOpen(true);
        // Small delay to ensure render before animation
        requestAnimationFrame(() => setIsVisible(true));
      }
    };

    checkCookie();
  }, [shouldShow]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  };

  const handleTradingClick = () => {
    setCookie('te_division_selected_v2', 'true', 365);
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      document.body.style.overflow = 'unset';
    }, 300); // Wait for animation
  };

  const handleConsultingClick = () => {
    setCookie('te_division_selected_v2', 'true', 365);
    window.location.href = 'https://prosperaksa.com';
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4 transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-1 bg-primary rounded-full mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Welcome</h2>
          <p className="text-gray-600 text-lg">Please select your division to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleTradingClick}
            className="w-full group relative flex items-center justify-between p-6 border-2 border-primary/20 bg-primary/5 rounded-2xl hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                Trading Division
              </span>
              <span className="text-sm font-medium text-primary group-hover:text-white/90 transition-colors">
                Trans Emirates Trading Est.
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg 
                className="w-6 h-6 text-primary group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

          <button
            onClick={handleConsultingClick}
            className="w-full group relative flex items-center justify-between p-6 border-2 border-secondary/20 bg-secondary/5 rounded-2xl hover:bg-secondary hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                Consulting Division
              </span>
              <span className="text-sm font-medium text-secondary group-hover:text-white/90 transition-colors">
                Prospera KSA
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg 
                className="w-6 h-6 text-secondary group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </button>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-8">
          Select an option to proceed to the relevant website
        </p>
      </div>
    </div>
  );
};

export default DivisionModal;

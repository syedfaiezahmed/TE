'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useRef } from 'react';

interface LayoutWrapperProps {
  children: React.ReactNode;
  content?: Record<string, string>;
}

export default function LayoutWrapper({ children, content = {} }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isAdmin) return;
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    const targets = root.querySelectorAll<HTMLElement>(
      '[data-animate], .scroll-animate, section, .grid > *, .prose > *'
    );
    targets.forEach((el) => {
      // Skip nested nav/footer containers if any
      if (el.closest('nav') || el.closest('footer')) return;
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isAdmin, pathname]);
  useEffect(() => {
    if (isAdmin) return;
    const root = rootRef.current;
    if (!root) return;
    root.classList.remove('page-transition');
    void root.offsetWidth;
    root.classList.add('page-transition');
  }, [pathname, isAdmin]);

  return (
    <>
      {!isAdmin && <Navbar />}
      <div ref={rootRef}>
        {children}
      </div>
      {!isAdmin && <Footer content={content} />}
    </>
  );
}

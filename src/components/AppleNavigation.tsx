import React, { useState, useEffect } from 'react';
import { Menu, X, Sunrise } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAppleParallax';

const AppleNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Apple-style navigation with blur and transparency effects
  const navRef = useScrollAnimation({
    start: 'top 5%',
    end: 'top 30%',
    onUpdate: (progress) => {
      setIsScrolled(progress > 0.05);
      setScrollProgress(progress);
      
      if (navRef.current) {
        const nav = navRef.current;
        const blur = Math.min(progress * 20, 10);
        const opacity = Math.min(0.8 + progress * 0.2, 0.95);
        
        nav.style.backdropFilter = `blur(${blur}px) saturate(180%)`;
        nav.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        nav.style.borderBottomColor = `rgba(0, 0, 0, ${Math.min(progress * 0.1, 0.1)})`;
      }
    }
  });

  const scrollToSection = (sectionNumber: number) => {
    const targetElement = document.querySelector(`[data-section="${sectionNumber}"]`);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Apple-style smooth scroll progress indicator
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <>
      {/* Apple-style scroll progress indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-grass-500 to-sky-400 z-50 origin-left transition-transform duration-150"
        style={{
          width: '100%',
          transform: `scaleX(${scrollProgress})`
        }}
      />

      <nav
        ref={navRef as React.RefObject<HTMLNavElement>}
        className="fixed top-0 w-full z-40 transition-all duration-300 border-b border-transparent"
        style={{
          backdropFilter: 'blur(0px)',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          willChange: 'backdrop-filter, background-color, border-color'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with Apple-style scaling */}
            <div 
              className="flex items-center space-x-2 cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => scrollToSection(0)}
            >
              <Sunrise className={`h-8 w-8 transition-colors duration-300 ${
                isScrolled ? 'text-grass-600' : 'text-white'
              }`} />
              <span className={`font-inter font-black text-xl transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                TGC
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: 'Home', section: 0 },
                { label: 'Mission', section: 4 },
                { label: 'Impact', section: 5 },
                { label: 'Join', section: 6 }
              ].map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.section)}
                  className={`font-inter font-medium transition-all duration-300 hover:scale-105 relative group ${
                    isScrolled ? 'text-gray-700 hover:text-grass-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                  {/* Apple-style hover underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-grass-500 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              
              {/* Apple-style CTA button */}
              <button 
                onClick={() => scrollToSection(7)}
                className="bg-grass-500 text-white px-6 py-2 rounded-full font-inter font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-sky-400 active:scale-95"
                style={{
                  boxShadow: '0 4px 14px 0 rgba(76, 175, 80, 0.3)'
                }}
              >
                Touch Grass
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Apple-style mobile menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-b-2xl border-t border-gray-200/50">
              {[
                { label: 'Home', section: 0 },
                { label: 'Mission', section: 4 },
                { label: 'Impact', section: 5 },
                { label: 'Join', section: 6 }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.section)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-grass-600 font-inter font-medium transition-all duration-200 hover:bg-grass-50 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection(7)}
                className="block w-full text-left px-3 py-2 bg-grass-500 text-white rounded-lg font-inter font-medium hover:bg-sky-400 transition-all duration-300 mt-2"
              >
                Touch Grass
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppleNavigation;
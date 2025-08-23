import React, { useState, useEffect } from 'react';
import { Menu, X, Sunrise } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionNumber: number) => {
    const targetElement = document.querySelector(`[data-section="${sectionNumber}"]`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-grass-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
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
            <button 
              onClick={() => scrollToSection(0)}
              className={`font-inter font-medium transition-colors duration-300 hover:text-grass-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection(4)}
              className={`font-inter font-medium transition-colors duration-300 hover:text-grass-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Mission
            </button>
            <button 
              onClick={() => scrollToSection(5)}
              className={`font-inter font-medium transition-colors duration-300 hover:text-grass-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Impact
            </button>
            <button 
              onClick={() => scrollToSection(6)}
              className={`font-inter font-medium transition-colors duration-300 hover:text-grass-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Join
            </button>
            <button 
              onClick={() => scrollToSection(7)}
              className="bg-grass-500 text-white px-6 py-2 rounded-full font-inter font-medium hover:bg-sky-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Touch Grass
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-grass-200">
            <button 
              onClick={() => scrollToSection(0)}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-grass-600 font-inter font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection(4)}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-grass-600 font-inter font-medium"
            >
              Mission
            </button>
            <button 
              onClick={() => scrollToSection(5)}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-grass-600 font-inter font-medium"
            >
              Impact
            </button>
            <button 
              onClick={() => scrollToSection(6)}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-grass-600 font-inter font-medium"
            >
              Join
            </button>
            <button 
              onClick={() => scrollToSection(7)}
              className="block w-full text-left px-3 py-2 bg-grass-500 text-white rounded-lg font-inter font-medium hover:bg-sky-400 transition-all duration-300"
            >
              Touch Grass
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
import React, { useEffect, useState } from 'react';
import { Users, Heart, Zap } from 'lucide-react';

interface WhatIfSectionProps {
  type: 'npcs' | 'health' | 'connection';
  headline: string;
  subtext: string;
  sectionNumber: number;
}

const WhatIfSection: React.FC<WhatIfSectionProps> = ({ type, headline, subtext, sectionNumber }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.2,
        rootMargin: '100px 0px'
      }
    );

    const element = document.querySelector(`[data-section="${sectionNumber}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionNumber]);

  const getBackgroundClass = () => {
    switch (type) {
      case 'npcs':
        return 'bg-gradient-to-br from-sky-400 to-sky-300';
      case 'health':
        return 'bg-gradient-to-br from-grass-400 to-grass-300';
      case 'connection':
        return 'bg-gradient-to-br from-sky-300 via-grass-200 to-grass-300';
      default:
        return 'bg-gradient-to-br from-sky-400 to-grass-400';
    }
  };

  const getIcon = () => {
    const iconClass = "w-16 h-16 text-white";
    switch (type) {
      case 'npcs':
        return <Zap className={iconClass} />;
      case 'health':
        return <Heart className={iconClass} />;
      case 'connection':
        return <Users className={iconClass} />;
      default:
        return <Zap className={iconClass} />;
    }
  };

  const getDoodles = () => {
    if (type === 'npcs') {
      return (
        <>
          {/* Breaking chains */}
          <svg className="absolute top-20 left-16 w-16 h-16 text-white/20" viewBox="0 0 100 100">
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M30 30 Q35 25 40 30 Q45 35 50 30" strokeDasharray="5,5" />
              <path d="M50 30 L60 40" strokeWidth="4" />
              <circle cx="35" cy="30" r="8" />
              <circle cx="65" cy="45" r="8" opacity="0.5" />
            </g>
          </svg>
          
          {/* Arrows pointing away */}
          <svg className="absolute top-32 right-20 w-20 h-12 text-sunlight-400/40" viewBox="0 0 100 60">
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 30 L60 30" />
              <path d="M50 20 L60 30 L50 40" />
              <path d="M70 15 L85 30 L70 45" />
            </g>
          </svg>
        </>
      );
    }
    
    if (type === 'health') {
      return (
        <>
          {/* Sun with rays */}
          <svg className="absolute top-16 right-16 w-20 h-20 text-sunlight-400/60" viewBox="0 0 100 100">
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="50" cy="50" r="12" />
              <line x1="50" y1="20" x2="50" y2="30" />
              <line x1="50" y1="70" x2="50" y2="80" />
              <line x1="25" y1="35" x2="32" y2="42" />
              <line x1="68" y1="58" x2="75" y2="65" />
            </g>
          </svg>
          
          {/* Growing grass */}
          <div className="absolute bottom-20 left-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i}
                className="absolute bottom-0 w-2 bg-grass-600/40 rounded-t-full animate-sway"
                style={{ 
                  left: `${i * 8}px`,
                  height: Math.random() * 20 + 10,
                  animationDelay: `${i * 200}ms`
                }}
              />
            ))}
          </div>
        </>
      );
    }
    
    return (
      <>
        {/* Connected hands */}
        <svg className="absolute top-24 left-12 w-20 h-16 text-white/30" viewBox="0 0 100 80">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M20 40 Q30 30 40 40 Q50 30 60 40 Q70 30 80 40" />
            <circle cx="25" cy="45" r="8" />
            <circle cx="50" cy="45" r="8" />
            <circle cx="75" cy="45" r="8" />
          </g>
        </svg>
        
        {/* Hearts floating */}
        <div className="absolute bottom-16 right-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-4 h-4 animate-float"
              style={{ 
                right: `${i * 12}px`,
                bottom: `${i * 8}px`,
                animationDelay: `${i * 300}ms`
              }}
            >
              <div className="w-4 h-4 bg-sunlight-400/60 rotate-45 relative">
                <div className="absolute -left-2 -top-1 w-3 h-3 bg-sunlight-400/60 rounded-full" />
                <div className="absolute -right-1 -top-2 w-3 h-3 bg-sunlight-400/60 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <section 
      data-section={sectionNumber}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${getBackgroundClass()}`}
    >
      {/* Background with stable decorations */}
      <div className="absolute inset-0">
        {getDoodles()}
        
        {/* Floating clouds */}
        <div className="absolute top-20 left-20 w-24 h-12 bg-white/20 rounded-full animate-float" />
        <div className="absolute bottom-32 right-24 w-32 h-16 bg-white/15 rounded-full animate-float-reverse" />
      </div>
      
      {/* Content with smooth transitions */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className={`space-y-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              {getIcon()}
            </div>
          </div>

          {/* Headline - Restored Original Content */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-inter font-black text-white leading-tight tracking-tight drop-shadow-lg">
            {headline}
          </h2>

          {/* Subtext - Restored Original Content */}
          <p className="text-xl sm:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-inter font-medium drop-shadow-md">
            {subtext}
          </p>

          {/* Decorative element */}
          <div className="pt-8">
            <div className="w-24 h-2 bg-white/40 mx-auto rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        {type === 'health' && (
          <div className="flex justify-center space-x-4 h-full items-end pb-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-2 bg-grass-600/40 rounded-t-full animate-sway"
                style={{ 
                  height: Math.random() * 24 + 8,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatIfSection;
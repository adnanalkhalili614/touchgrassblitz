import React, { useEffect, useState } from 'react';

const DoodleElements: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Sun Rays Doodle */}
      <svg 
        className={`absolute top-20 right-20 w-20 h-20 text-sunlight-400/40 transition-all duration-2000 ${
          isVisible ? 'opacity-100 animate-sketch-in' : 'opacity-0'
        }`} 
        viewBox="0 0 100 100"
        style={{ animationDelay: '0.5s' }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="50" cy="50" r="15" />
          <line x1="50" y1="10" x2="50" y2="20" />
          <line x1="50" y1="80" x2="50" y2="90" />
          <line x1="20" y1="35" x2="27" y2="42" />
          <line x1="73" y1="58" x2="80" y2="65" />
          <line x1="10" y1="50" x2="20" y2="50" />
          <line x1="80" y1="50" x2="90" y2="50" />
          <line x1="20" y1="65" x2="27" y2="58" />
          <line x1="73" y1="42" x2="80" y2="35" />
        </g>
      </svg>

      {/* Arrow Doodle pointing away from phone */}
      <svg 
        className={`absolute top-32 left-16 w-16 h-16 text-white/30 transition-all duration-2000 ${
          isVisible ? 'opacity-100 animate-sketch-in' : 'opacity-0'
        }`} 
        viewBox="0 0 100 100"
        style={{ animationDelay: '1s' }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M20 50 L70 50" />
          <path d="M60 40 L70 50 L60 60" />
        </g>
      </svg>

      {/* Cloud Doodle */}
      <svg 
        className={`absolute bottom-40 right-24 w-24 h-12 text-white/20 transition-all duration-2000 ${
          isVisible ? 'opacity-100 animate-sketch-in' : 'opacity-0'
        }`} 
        viewBox="0 0 100 50"
        style={{ animationDelay: '1.5s' }}
      >
        <path 
          d="M20 35 Q15 25 25 25 Q30 15 40 20 Q50 10 60 20 Q70 15 75 25 Q85 25 80 35 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>

      {/* Grass Sprouts Doodle */}
      <svg 
        className={`absolute bottom-20 left-32 w-20 h-10 text-grass-400/30 transition-all duration-2000 ${
          isVisible ? 'opacity-100 animate-sketch-in' : 'opacity-0'
        }`} 
        viewBox="0 0 100 50"
        style={{ animationDelay: '2s' }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M10 50 Q15 30 20 50" />
          <path d="M25 50 Q30 25 35 50" />
          <path d="M40 50 Q45 35 50 50" />
          <path d="M55 50 Q60 20 65 50" />
          <path d="M70 50 Q75 40 80 50" />
        </g>
      </svg>

      {/* Birds Doodle */}
      <svg 
        className={`absolute top-16 left-1/3 w-16 h-8 text-white/25 transition-all duration-2000 ${
          isVisible ? 'opacity-100 animate-sketch-in' : 'opacity-0'
        }`} 
        viewBox="0 0 100 40"
        style={{ animationDelay: '2.5s' }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M20 20 Q25 15 30 20 Q35 15 40 20" />
          <path d="M50 25 Q55 20 60 25 Q65 20 70 25" />
          <path d="M75 15 Q80 10 85 15 Q90 10 95 15" />
        </g>
      </svg>
    </>
  );
};

export default DoodleElements;
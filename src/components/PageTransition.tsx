import React from 'react';

interface PageTransitionProps {
  isTransitioning: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ isTransitioning }) => {
  return (
    <div className={`fixed inset-0 pointer-events-none z-40 transition-opacity duration-300 ${
      isTransitioning ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Page flip shadow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent transform skew-x-12 translate-x-full animate-pulse" />
      
      {/* Grass sprouts during transition */}
      <div className="absolute bottom-0 left-0 right-0 h-12">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute bottom-0 w-1 bg-grass-400/30 rounded-t-full transition-all duration-500 ${
              isTransitioning ? 'animate-sprout' : 'h-0'
            }`}
            style={{ 
              left: `${i * 5}%`,
              height: Math.random() * 24 + 8,
              animationDelay: `${i * 25}ms`
            }}
          />
        ))}
      </div>
      
      {/* Floating particles during transition */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 bg-sunlight-400/40 rounded-full transition-all duration-700 ${
              isTransitioning ? 'animate-float' : 'opacity-0'
            }`}
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 100}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PageTransition;
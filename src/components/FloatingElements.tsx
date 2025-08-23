import React from 'react';
import { Cloud, Sun, Leaf } from 'lucide-react';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating clouds with natural drift */}
      <Cloud className="absolute top-16 left-16 w-16 h-16 text-white/10 animate-drift" />
      <Cloud className="absolute top-32 right-20 w-20 h-20 text-white/5 animate-drift" style={{ animationDelay: '3s' }} />
      <Cloud className="absolute top-1/2 left-8 w-12 h-12 text-white/10 animate-drift" style={{ animationDelay: '6s' }} />
      <Cloud className="absolute bottom-1/3 right-1/4 w-14 h-14 text-white/8 animate-drift" style={{ animationDelay: '9s' }} />
      
      {/* Floating suns with slow rotation */}
      <Sun className="absolute top-20 right-32 w-12 h-12 text-sunlight-400/20 animate-spin-slow" />
      <Sun className="absolute bottom-32 left-20 w-8 h-8 text-sunlight-400/30 animate-spin-slow" style={{ animationDelay: '5s' }} />
      
      {/* Floating leaves with sway */}
      <Leaf className="absolute top-1/3 right-16 w-10 h-10 text-grass-400/20 animate-sway" />
      <Leaf className="absolute bottom-1/3 left-32 w-8 h-8 text-grass-500/20 animate-sway-reverse" />
      <Leaf className="absolute top-2/3 right-1/3 w-6 h-6 text-grass-600/20 animate-sway" style={{ animationDelay: '2s' }} />
      
      {/* Floating particles for ambient life */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-sunlight-400/30 rounded-full animate-float"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10000}ms`,
              animationDuration: `${Math.random() * 5000 + 8000}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingElements;
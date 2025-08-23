import React, { useEffect, useState } from 'react';
import { Sun } from 'lucide-react';

const ClosingSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('[data-section="8"]');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleTouchGrass = () => {
    // This could link to a signup form, social media, or external site
    window.open('https://touchgrass.org', '_blank');
  };

  return (
    <section 
      data-section="8"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-grass-500 via-grass-600 to-grass-700"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Sunlight overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-sunlight-400/20 via-transparent to-transparent" />
        
        {/* Large floating sun */}
        <Sun className="absolute top-20 right-20 w-32 h-32 text-sunlight-400/30 animate-spin-slow" />
        
        {/* Grass field effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-grass-400/20 rounded-t-full animate-sway"
              style={{ 
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 60}%`,
                width: Math.random() * 6 + 2,
                height: Math.random() * 80 + 20,
                animationDelay: `${Math.random() * 5000}ms`,
                animationDuration: `${Math.random() * 3000 + 4000}ms`
              }}
            />
          ))}
        </div>

        {/* Floating nature particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-sunlight-400/40 rounded-full animate-float"
              style={{ 
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8000}ms`,
                animationDuration: `${Math.random() * 4000 + 6000}ms`
              }}
            />
          ))}
        </div>

        {/* Wind effect - moving lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <g stroke="white" strokeWidth="1" fill="none">
            {Array.from({ length: 8 }).map((_, i) => (
              <path 
                key={i}
                d={`M${i * 125} 200 Q${i * 125 + 50} 300 ${i * 125} 400 Q${i * 125 + 50} 500 ${i * 125} 600`}
                className="animate-drift"
                style={{ animationDelay: `${i * 500}ms` }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className={`space-y-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          {/* Main Quote */}
          <div className="space-y-8">
            <blockquote className="text-6xl sm:text-7xl lg:text-8xl font-inter font-black text-white leading-tight tracking-tight drop-shadow-lg">
              "THE FUTURE IS HUMAN.
              <br />
              THE FUTURE IS OUTSIDE."
            </blockquote>
            
            {/* Quote decoration with manifesto styling */}
            <div className="flex justify-center space-x-4">
              <div className="w-16 h-2 bg-sunlight-400 rounded-full animate-pulse" />
              <div className="w-8 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="w-16 h-2 bg-sunlight-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>

          {/* Manifesto subtext */}
          <p className="text-2xl sm:text-3xl text-white/90 font-inter font-medium max-w-4xl mx-auto leading-relaxed">
            Step out of the algorithm.
            <br />
            <span className="text-sunlight-400 font-bold">Touch grass</span>. <span className="text-sunlight-400 font-bold">Join the movement</span>.
          </p>

          {/* Final CTA */}
          <div className="pt-12">
            <button 
              onClick={handleTouchGrass}
              className="bg-sunlight-400 hover:bg-white text-grass-900 px-16 py-6 text-2xl font-inter font-black rounded-full transform hover:scale-105 shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <span>TOUCH GRASS</span>
                <Sun className="w-8 h-8" />
              </div>
            </button>
          </div>

          {/* Footer message */}
          <div className="pt-16">
            <p className="text-lg text-white/70 font-caveat font-semibold">
              The revolution starts when you step outside.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-grass-800/50 to-transparent" />
    </section>
  );
};

export default ClosingSection;
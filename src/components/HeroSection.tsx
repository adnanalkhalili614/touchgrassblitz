import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Immediate load to prevent flashing
    setIsLoaded(true);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('[data-section="1"]');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      data-section="0" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-400 via-sky-300 to-grass-400"
    >
      {/* Stable Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-grass-400/20" />
        
        {/* Floating clouds with stable animation */}
        <div className="absolute top-20 left-20 w-32 h-16 bg-white/20 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-40 h-20 bg-white/15 rounded-full animate-float-reverse" />
        <div className="absolute bottom-32 left-16 w-24 h-12 bg-white/25 rounded-full animate-float" />

        {/* Stable grass decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <div className="absolute bottom-0 left-0 right-0 h-8">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i}
                className="absolute bottom-0 w-1 bg-grass-400/40 rounded-t-full animate-sway"
                style={{ 
                  left: `${i * 3.33}%`,
                  height: Math.random() * 16 + 8,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Always Visible */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Main Headline - Restored Original Content */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-inter font-black text-white leading-tight tracking-tight drop-shadow-lg">
              GET OUTSIDE.
              <br />
              <span className="text-sunlight-400">GET HUMAN.</span>
            </h1>
            
            {/* Stable underline */}
            <div className="w-32 h-2 bg-sunlight-400 mx-auto rounded-full animate-pulse" />
          </div>

          {/* Subtext - Restored Original Content */}
          <p className="text-xl sm:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-inter font-medium drop-shadow-md">
            We're done being trapped in screens, junk food, and fake 'health.'
            <br className="hidden sm:block" />
            Touch Grass Collective is bringing people back to{' '}
            <span className="text-sunlight-400 font-bold">sunlight</span>,{' '}
            <span className="text-sunlight-400 font-bold">movement</span>, and{' '}
            <span className="text-sunlight-400 font-bold">real life</span>.
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <button
              onClick={scrollToNextSection}
              className="bg-grass-500 hover:bg-sky-400 text-white px-12 py-4 text-xl font-inter font-black rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 drop-shadow-lg"
            >
              JOIN THE REBELLION
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-white/80 cursor-pointer hover:text-white transition-colors duration-300" onClick={scrollToNextSection}>
            <span className="text-sm font-inter font-medium">Scroll to explore</span>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
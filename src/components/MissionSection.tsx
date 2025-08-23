import React, { useEffect, useState } from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

const MissionSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [transformationStage, setTransformationStage] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger transformation stages with delays
          setTimeout(() => setTransformationStage(1), 1000);
          setTimeout(() => setTransformationStage(2), 2000);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('[data-section="4"]');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      data-section="4" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-blue-50 to-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Breaking chains animation */}
        <svg className="absolute top-20 left-20 w-20 h-20 text-red-400/30" viewBox="0 0 100 100">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M30 40 Q35 35 40 40 Q45 45 50 40" strokeDasharray="10,5" />
            <path d="M50 40 L70 60" strokeWidth="4" opacity="0.7" />
            <circle cx="35" cy="40" r="12" strokeDasharray="8,4" />
            <circle cx="65" cy="55" r="12" strokeDasharray="8,4" opacity="0.5" />
            <path d="M48 42 L52 38 M52 42 L48 38" strokeWidth="3" />
          </g>
        </svg>

        {/* Warning system doodles */}
        <AlertTriangle className="absolute top-32 right-32 w-16 h-16 text-orange-400/30 animate-bounce-slow" />
        
        {/* Light rays breaking through */}
        <svg className="absolute top-0 right-0 w-64 h-64 text-sunlight-400/20" viewBox="0 0 200 200">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M100 50 L120 20" />
            <path d="M100 50 L140 30" />
            <path d="M100 50 L160 50" />
            <path d="M100 50 L140 70" />
            <path d="M100 50 L120 80" />
          </g>
        </svg>

        {/* Floating paper/manifesto pages */}
        <div className="absolute top-40 left-32 w-16 h-20 bg-white/60 rounded-lg shadow-lg animate-float transform rotate-12" />
        <div className="absolute bottom-40 right-20 w-20 h-24 bg-white/40 rounded-lg shadow-lg animate-float-reverse transform -rotate-6" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className={`space-y-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          {/* Main Headline */}
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-inter font-black text-gray-900 leading-tight tracking-tight">
              THE SYSTEM PROFITS
              <br />
              WHEN YOU'RE
              <br />
              <span className="text-red-600">SICK & SCROLLING</span>
            </h2>
            
            {/* Animated underline */}
            <div className="w-40 h-3 bg-red-500 mx-auto rounded-full animate-pulse" />
          </div>

          {/* Subtext */}
          <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-inter font-medium">
            Touch Grass Collective is the antidote.
            <br />
            We are the resistance to digital prison.
            <br />
            <span className="text-grass-600 font-bold">Sunlight. Strength. Real food. Real community.</span>
            <br />
            No filters. No lies.
          </p>

          {/* Visual Transformation */}
          <div className="pt-12">
            <div className="flex items-center justify-center space-x-8 sm:space-x-16">
              {/* Before - Hunched figure */}
              <div className={`transition-all duration-2000 ${transformationStage >= 1 ? 'opacity-50 scale-95' : 'opacity-100'}`}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-600 rounded-t-full relative">
                  <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-sky-400 rounded-sm transition-all duration-1000 ${
                    transformationStage >= 1 ? 'opacity-20' : 'opacity-80'
                  }`} />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-600 rounded-b-full" />
                </div>
                <p className="text-sm text-gray-500 mt-2 font-caveat">trapped</p>
              </div>

              {/* Arrow */}
              <ArrowRight className={`w-8 h-8 text-grass-600 transition-all duration-1000 ${
                transformationStage >= 1 ? 'animate-bounce text-green-500' : 'text-gray-400'
              }`} />

              {/* After - Standing figure */}
              <div className={`transition-all duration-2000 delay-500 ${transformationStage >= 2 ? 'opacity-100 scale-110' : 'opacity-70'}`}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-grass-600 rounded-t-full relative">
                  <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-sunlight-400 rounded-full transition-all duration-1000 ${
                    transformationStage >= 2 ? 'animate-pulse' : ''
                  }`} />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-grass-600 rounded-b-full" />
                </div>
                <p className="text-sm text-grass-600 mt-2 font-caveat font-bold">free</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom grass decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <div className="flex justify-center space-x-2 h-full items-end pb-2">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={i}
              className={`w-1 bg-grass-500/40 rounded-t-full transition-all duration-1000 ${
                isVisible ? 'animate-sprout' : 'h-0'
              }`}
              style={{ 
                height: Math.random() * 24 + 8,
                animationDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
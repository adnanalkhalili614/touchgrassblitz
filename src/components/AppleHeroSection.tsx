import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useAppleParallax, useScrollAnimation } from '../hooks/useAppleParallax';
import AppleParallaxSection from './AppleParallaxSection';

const AppleHeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Apple-style mouse parallax for subtle interactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Simulate loading completion
    const timer = setTimeout(() => setIsLoaded(true), 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Parallax elements with different speeds for depth
  const backgroundRef = useAppleParallax({ speed: 0.3, direction: 'up' });
  const midgroundRef = useAppleParallax({ speed: 0.6, direction: 'up' });
  const foregroundRef = useAppleParallax({ speed: 0.9, direction: 'up' });

  // Apple-style scroll indicator animation
  const scrollIndicatorRef = useScrollAnimation({
    start: 'top 10%',
    end: 'bottom 30%',
    onUpdate: (progress) => {
      if (scrollIndicatorRef.current) {
        const opacity = Math.max(1 - progress * 3, 0);
        const translateY = progress * 30;
        scrollIndicatorRef.current.style.opacity = opacity.toString();
        scrollIndicatorRef.current.style.transform = `translateY(${translateY}px)`;
      }
    }
  });

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('[data-section="1"]');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      data-section="0" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #6EC6FF 0%, #4CAF50 100%)'
      }}
    >
      {/* Apple-style layered parallax backgrounds */}
      <div className="absolute inset-0">
        {/* Background layer - slowest */}
        <div
          ref={backgroundRef as React.RefObject<HTMLDivElement>}
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 20%, rgba(255, 235, 59, 0.3) 0%, transparent 50%)',
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            willChange: 'transform'
          }}
        />

        {/* Midground layer - medium speed */}
        <div
          ref={midgroundRef as React.RefObject<HTMLDivElement>}
          className="absolute inset-0"
        >
          {/* Floating clouds with Apple-style subtle animation */}
          <div 
            className="absolute top-20 left-20 w-32 h-16 bg-white/20 rounded-full"
            style={{
              transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 8}px)`,
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-40 right-32 w-40 h-20 bg-white/15 rounded-full"
            style={{
              transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * 6}px)`,
              animation: 'float 10s ease-in-out infinite 2s'
            }}
          />
          <div 
            className="absolute bottom-32 left-16 w-24 h-12 bg-white/25 rounded-full"
            style={{
              transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * -5}px)`,
              animation: 'float 12s ease-in-out infinite 4s'
            }}
          />
        </div>

        {/* Foreground layer - fastest */}
        <div
          ref={foregroundRef as React.RefObject<HTMLDivElement>}
          className="absolute bottom-0 left-0 right-0 h-16"
        >
          {/* Apple-style grass animation */}
          <div className="absolute bottom-0 left-0 right-0 h-8">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i}
                className="absolute bottom-0 w-1 bg-grass-400/40 rounded-t-full"
                style={{ 
                  left: `${i * 3.33}%`,
                  height: Math.random() * 16 + 8,
                  animation: `sway ${4 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 100}ms`,
                  transform: `translateX(${mousePosition.x * (i % 3 + 1)}px)`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content with Apple-style entrance animation */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Apple-style staggered text animation */}
          <div className="space-y-4">
            <h1 
              className={`text-6xl sm:text-7xl lg:text-8xl font-inter font-black text-white leading-tight tracking-tight transition-all duration-1000 ${
                isLoaded 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
              style={{
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                transform: `translateY(${mousePosition.y * -5}px)`
              }}
            >
              GET OUTSIDE.
              <br />
              <span 
                className="text-sunlight-400"
                style={{
                  transform: `translateX(${mousePosition.x * 3}px)`,
                  display: 'inline-block'
                }}
              >
                GET HUMAN.
              </span>
            </h1>
            
            {/* Apple-style animated underline */}
            <div 
              className={`w-32 h-2 bg-sunlight-400 mx-auto rounded-full transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
          </div>

          {/* Subtext with Apple-style fade-in */}
          <p 
            className={`text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-inter font-medium transition-all duration-1000 delay-500 ${
              isLoaded 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}
          >
            We're done being trapped in screens, junk food, and fake 'health.'
            <br className="hidden sm:block" />
            Touch Grass Collective is bringing people back to{' '}
            <span className="text-sunlight-400 font-bold">sunlight</span>,{' '}
            <span className="text-sunlight-400 font-bold">movement</span>, and{' '}
            <span className="text-sunlight-400 font-bold">real life</span>.
          </p>

          {/* Apple-style CTA button */}
          <div className="pt-8">
            <button
              onClick={scrollToNextSection}
              className={`bg-grass-500 hover:bg-sky-400 text-white px-12 py-4 text-xl font-inter font-black rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 ${
                isLoaded 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: '800ms',
                boxShadow: '0 8px 32px rgba(76, 175, 80, 0.4)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="relative z-10">JOIN THE REBELLION</span>
              
              {/* Apple-style button glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </button>
          </div>
        </div>

        {/* Apple-style scroll indicator */}
        <div 
          ref={scrollIndicatorRef as React.RefObject<HTMLDivElement>}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToNextSection}
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors duration-300">
            <span className="text-sm font-inter font-medium">Scroll to explore</span>
            <div className="relative">
              <ArrowDown className="w-6 h-6 animate-bounce" />
              {/* Apple-style glow effect */}
              <div className="absolute inset-0 w-6 h-6 bg-white/20 rounded-full animate-ping" />
            </div>
          </div>
        </div>
      </div>

      {/* Apple-style ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
              transform: `translate(${mousePosition.x * (Math.random() * 10 + 5)}px, ${mousePosition.y * (Math.random() * 10 + 5)}px)`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default AppleHeroSection;
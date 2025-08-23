import React from 'react';
import { Users, Heart, Zap } from 'lucide-react';
import { useAppleParallax, useScrollAnimation, useTextScale } from '../hooks/useAppleParallax';
import AppleTextMorph from './AppleTextMorph';

interface AppleWhatIfSectionProps {
  type: 'npcs' | 'health' | 'connection';
  headline: string;
  subtext: string;
  sectionNumber: number;
}

const AppleWhatIfSection: React.FC<AppleWhatIfSectionProps> = ({ 
  type, 
  headline, 
  subtext, 
  sectionNumber 
}) => {
  // Apple-style parallax backgrounds with different speeds
  const backgroundRef = useAppleParallax({ speed: 0.3, direction: 'up' });
  const midgroundRef = useAppleParallax({ speed: 0.6, direction: 'up' });
  
  // Apple-style text scaling for headlines
  const headlineRef = useTextScale(0.8, 1.2);
  
  // Scroll-triggered content animation
  const contentRef = useScrollAnimation({
    start: 'top 95%',
    end: 'top 70%',
    onUpdate: (progress) => {
      if (contentRef.current) {
        // Apple-style staggered fade-in
        const opacity = Math.min(progress * 2, 1);
        const translateY = (1 - progress) * 60;
        const scale = 0.9 + progress * 0.1;
        
        contentRef.current.style.opacity = opacity.toString();
        contentRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`;
      }
    }
  });

  // Icon animation
  const iconRef = useScrollAnimation({
    start: 'top 95%',
    end: 'top 75%',
    onUpdate: (progress) => {
      if (iconRef.current) {
        const scale = 0.5 + progress * 0.5;
        const rotate = progress * 360;
        const opacity = progress;
        
        iconRef.current.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
        iconRef.current.style.opacity = opacity.toString();
      }
    }
  });

  const getBackgroundGradient = () => {
    switch (type) {
      case 'npcs':
        return 'linear-gradient(135deg, #6EC6FF 0%, #4FC3F7 50%, #29B6F6 100%)';
      case 'health':
        return 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 50%, #81C784 100%)';
      case 'connection':
        return 'linear-gradient(135deg, #6EC6FF 0%, #4CAF50 50%, #66BB6A 100%)';
      default:
        return 'linear-gradient(135deg, #6EC6FF 0%, #4CAF50 100%)';
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

  const getAppleStyleDoodles = () => {
    if (type === 'npcs') {
      return (
        <div
          ref={midgroundRef as React.RefObject<HTMLDivElement>}
          className="absolute inset-0"
        >
          {/* Breaking chains with Apple-style animation */}
          <svg className="absolute top-20 left-16 w-16 h-16 text-white/20" viewBox="0 0 100 100">
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M30 30 Q35 25 40 30 Q45 35 50 30" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10;0" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M50 30 L60 40" strokeWidth="4" />
              <circle cx="35" cy="30" r="8" />
              <circle cx="65" cy="45" r="8" opacity="0.5" />
            </g>
          </svg>
          
          {/* Arrows with subtle animation */}
          <svg className="absolute top-32 right-20 w-20 h-12 text-sunlight-400/40" viewBox="0 0 100 60">
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 30 L60 30">
                <animate attributeName="stroke-dasharray" values="0,40;40,0;0,40" dur="4s" repeatCount="indefinite" />
              </path>
              <path d="M50 20 L60 30 L50 40" />
            </g>
          </svg>
        </div>
      );
    }
    
    if (type === 'health') {
      return (
        <div
          ref={midgroundRef as React.RefObject<HTMLDivElement>}
          className="absolute inset-0"
        >
          {/* Animated sun */}
          <svg className="absolute top-16 right-16 w-20 h-20 text-sunlight-400/60" viewBox="0 0 100 100">
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="50" cy="50" r="12" />
              <g>
                <line x1="50" y1="20" x2="50" y2="30" />
                <line x1="50" y1="70" x2="50" y2="80" />
                <line x1="25" y1="35" x2="32" y2="42" />
                <line x1="68" y1="58" x2="75" y2="65" />
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="0 50 50;360 50 50" 
                  dur="20s" 
                  repeatCount="indefinite" 
                />
              </g>
            </g>
          </svg>
          
          {/* Growing grass with staggered animation */}
          <div className="absolute bottom-20 left-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i}
                className="absolute bottom-0 w-2 bg-grass-600/40 rounded-t-full"
                style={{ 
                  left: `${i * 8}px`,
                  height: Math.random() * 20 + 10,
                  animation: `sprout 2s ease-out forwards`,
                  animationDelay: `${i * 200}ms`
                }}
              />
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div
        ref={midgroundRef as React.RefObject<HTMLDivElement>}
        className="absolute inset-0"
      >
        {/* Connected hands with pulse animation */}
        <svg className="absolute top-24 left-12 w-20 h-16 text-white/30" viewBox="0 0 100 80">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M20 40 Q30 30 40 40 Q50 30 60 40 Q70 30 80 40">
              <animate attributeName="stroke-width" values="2;4;2" dur="2s" repeatCount="indefinite" />
            </path>
            <circle cx="25" cy="45" r="8" />
            <circle cx="50" cy="45" r="8" />
            <circle cx="75" cy="45" r="8" />
          </g>
        </svg>
        
        {/* Floating hearts */}
        <div className="absolute bottom-16 right-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-4 h-4"
              style={{ 
                right: `${i * 12}px`,
                bottom: `${i * 8}px`,
                animation: `float ${6 + i}s ease-in-out infinite`,
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
      </div>
    );
  };

  return (
    <section 
      data-section={sectionNumber}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: getBackgroundGradient() }}
    >
      {/* Apple-style layered parallax background */}
      <div className="absolute inset-0">
        {/* Background layer */}
        <div
          ref={backgroundRef as React.RefObject<HTMLDivElement>}
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
          }}
        />
        
        {/* Doodles and decorative elements */}
        {getAppleStyleDoodles()}
        
        {/* Floating clouds with Apple-style subtle movement */}
        <div className="absolute top-20 left-20 w-24 h-12 bg-white/20 rounded-full animate-float" />
        <div className="absolute bottom-32 right-24 w-32 h-16 bg-white/15 rounded-full animate-float-reverse" />
      </div>
      
      {/* Content with Apple-style entrance animation */}
      <div
        ref={contentRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        style={{
          opacity: 0,
          transform: 'translateY(60px) scale(0.9)',
          willChange: 'opacity, transform'
        }}
      >
        <div className="space-y-8">
          {/* Apple-style icon with entrance animation */}
          <div className="flex justify-center mb-8">
            <div
              ref={iconRef as React.RefObject<HTMLDivElement>}
              className="p-4 bg-white/10 rounded-full backdrop-blur-sm"
              style={{
                opacity: 0,
                transform: 'scale(0.5) rotate(0deg)',
                willChange: 'opacity, transform',
                backdropFilter: 'blur(10px) saturate(180%)'
              }}
            >
              {getIcon()}
            </div>
          </div>

          {/* Apple-style scaling headline */}
          <h2 
            ref={headlineRef as React.RefObject<HTMLHeadingElement>}
            className="text-5xl sm:text-6xl lg:text-7xl font-inter font-black text-white leading-tight tracking-tight"
            style={{
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              willChange: 'transform'
            }}
          >
            <AppleTextMorph
              texts={[headline]}
              trigger="time"
              duration={4000}
            />
          </h2>

          {/* Subtext with Apple-style fade-in */}
          <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-inter font-medium">
            {subtext}
          </p>

          {/* Apple-style decorative element */}
          <div className="pt-8">
            <div className="w-24 h-2 bg-white/40 mx-auto rounded-full">
              <div 
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{
                  width: '100%',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Apple-style bottom decoration */}
      {type === 'health' && (
        <div className="absolute bottom-0 left-0 right-0 h-20">
          <div className="flex justify-center space-x-4 h-full items-end pb-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-2 bg-grass-600/40 rounded-t-full"
                style={{ 
                  height: Math.random() * 24 + 8,
                  animation: `sprout 2s ease-out forwards`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AppleWhatIfSection;
import React, { useEffect, useState } from 'react';
import { useAppleParallax, useScrollAnimation, useTextScale } from '../hooks/useAppleParallax';

interface AppleParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  className?: string;
  parallaxSpeed?: number;
  textAnimation?: boolean;
  sectionId?: string;
}

const AppleParallaxSection: React.FC<AppleParallaxSectionProps> = ({
  children,
  backgroundImage,
  backgroundColor = 'transparent',
  className = '',
  parallaxSpeed = 0.5,
  textAnimation = true,
  sectionId
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Apple-style parallax for background
  const backgroundRef = useAppleParallax({
    speed: parallaxSpeed,
    direction: 'up',
    threshold: 0.2
  });

  // Scroll-triggered fade in animation
  const contentRef = useScrollAnimation({
    start: 'top 90%',
    end: 'top 60%',
    onUpdate: (progress) => {
      if (contentRef.current) {
        const opacity = Math.min(progress * 2, 1); // Fade in over first half of animation
        const translateY = (1 - progress) * 50; // Slide up effect
        
        contentRef.current.style.opacity = opacity.toString();
        contentRef.current.style.transform = `translateY(${translateY}px)`;
      }
      
      setIsVisible(progress > 0.1);
    }
  });

  // Apple-style text scaling for headlines
  const headlineRef = useTextScale(0.9, 1.1);

  return (
    <section 
      className={`relative min-h-screen overflow-hidden ${className}`}
      data-section={sectionId}
      style={{ backgroundColor }}
    >
      {/* Parallax Background */}
      {backgroundImage && (
        <div
          ref={backgroundRef as React.RefObject<HTMLDivElement>}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
        />
      )}

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div
        ref={contentRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
        style={{
          opacity: 0,
          transform: 'translateY(50px)',
          willChange: 'opacity, transform'
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child) && child.type === 'h1') {
              // Apply text scaling to main headlines
              return React.cloneElement(child, {
                ref: textAnimation ? headlineRef : undefined,
                style: {
                  ...child.props.style,
                  willChange: textAnimation ? 'transform' : undefined
                }
              });
            }
            return child;
          })}
        </div>
      </div>

      {/* Apple-style section indicator */}
      {isVisible && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-16 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="w-full bg-white rounded-full transition-all duration-300"
              style={{
                height: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default AppleParallaxSection;
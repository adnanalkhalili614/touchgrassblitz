import React, { ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  triggerElement?: string | HTMLElement;
  startPosition?: string;
  endPosition?: string;
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  triggerElement,
  startPosition = 'top bottom',
  endPosition = 'bottom top'
}) => {
  const elementRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const element = elementRef.current;
    
    // Calculate movement based on direction and speed
    // Speed < 1 = slower than scroll (background effect)
    // Speed > 1 = faster than scroll (foreground effect)
    const movement = speed * 100;
    
    let transform = {};
    
    switch (direction) {
      case 'up':
        transform = { yPercent: -movement };
        break;
      case 'down':
        transform = { yPercent: movement };
        break;
      case 'left':
        transform = { xPercent: -movement };
        break;
      case 'right':
        transform = { xPercent: movement };
        break;
      default:
        transform = { yPercent: -movement };
    }

    // Apple-style smooth parallax with direct scroll mapping
    gsap.to(element, {
      ...transform,
      ease: 'none', // Direct 1:1 scroll mapping
      scrollTrigger: {
        trigger: triggerElement || element,
        start: startPosition,
        end: endPosition,
        scrub: true, // Perfect scroll synchronization
        invalidateOnRefresh: true
      }
    });
  }, [speed, direction, triggerElement, startPosition, endPosition]);

  return (
    <div
      ref={elementRef}
      className={`${className} will-change-transform`}
      style={{ 
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxElement;
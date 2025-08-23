import React, { ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn' | 'bounceIn';
  duration?: number;
  delay?: number;
  threshold?: string;
  triggerOnce?: boolean;
  className?: string;
  stagger?: number;
  ease?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeIn',
  duration = 0.8,
  delay = 0,
  threshold = 'top 80%',
  triggerOnce = false,
  className = '',
  stagger = 0,
  ease = 'power2.out'
}) => {
  const elementRef = React.useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!elementRef.current) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(elementRef.current, { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0 });
      return;
    }

    const element = elementRef.current;
    let fromVars = {};
    let toVars = {};

    // Define animation variants
    switch (animation) {
      case 'fadeIn':
        fromVars = { opacity: 0 };
        toVars = { opacity: 1 };
        break;
      case 'slideUp':
        fromVars = { opacity: 0, y: 50 };
        toVars = { opacity: 1, y: 0 };
        break;
      case 'slideDown':
        fromVars = { opacity: 0, y: -50 };
        toVars = { opacity: 1, y: 0 };
        break;
      case 'slideLeft':
        fromVars = { opacity: 0, x: 50 };
        toVars = { opacity: 1, x: 0 };
        break;
      case 'slideRight':
        fromVars = { opacity: 0, x: -50 };
        toVars = { opacity: 1, x: 0 };
        break;
      case 'scaleIn':
        fromVars = { opacity: 0, scale: 0.8 };
        toVars = { opacity: 1, scale: 1 };
        break;
      case 'rotateIn':
        fromVars = { opacity: 0, rotation: 15, transformOrigin: 'center center' };
        toVars = { opacity: 1, rotation: 0, transformOrigin: 'center center' };
        break;
      case 'bounceIn':
        fromVars = { opacity: 0, scale: 0.3 };
        toVars = { opacity: 1, scale: 1, ease: 'back.out(1.7)' };
        break;
      default:
        fromVars = { opacity: 0 };
        toVars = { opacity: 1 };
    }

    // Set initial state
    gsap.set(element, fromVars);

    // Create reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: threshold,
        toggleActions: triggerOnce ? 'play none none none' : 'play none none reverse',
        invalidateOnRefresh: true
      }
    });

    // Handle staggered children or single element
    const targets = stagger > 0 ? element.children : element;
    
    tl.to(targets, {
      ...toVars,
      duration: duration,
      delay: delay,
      ease: toVars.ease || ease,
      stagger: stagger > 0 ? stagger : 0
    });

  }, [animation, duration, delay, threshold, triggerOnce, stagger, ease]);

  return (
    <div 
      ref={elementRef}
      className={`${className} will-change-transform`}
      style={{ 
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
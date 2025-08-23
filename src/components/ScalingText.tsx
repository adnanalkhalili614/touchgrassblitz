import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScalingTextProps {
  children: React.ReactNode;
  className?: string;
  minScale?: number;
  maxScale?: number;
  triggerStart?: string;
  triggerEnd?: string;
  scrub?: boolean | number;
}

const ScalingText: React.FC<ScalingTextProps> = ({
  children,
  className = '',
  minScale = 0.8,
  maxScale = 1.2,
  triggerStart = 'top 80%',
  triggerEnd = 'center center',
  scrub = 1
}) => {
  const elementRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Apple-style smooth scaling with direct scroll mapping
    gsap.fromTo(elementRef.current,
      { 
        scale: minScale,
        transformOrigin: 'center center'
      },
      {
        scale: maxScale,
        ease: 'none', // Direct scroll mapping
        scrollTrigger: {
          trigger: elementRef.current,
          start: triggerStart,
          end: triggerEnd,
          scrub: scrub,
          invalidateOnRefresh: true
        }
      }
    );
  }, [minScale, maxScale, triggerStart, triggerEnd, scrub]);

  return (
    <div
      ref={elementRef}
      className={`${className} will-change-transform`}
      style={{ 
        willChange: 'transform',
        transformOrigin: 'center center'
      }}
    >
      {children}
    </div>
  );
};

export default ScalingText;
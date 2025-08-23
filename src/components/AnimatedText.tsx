import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimatedTextProps {
  texts: string[];
  className?: string;
  animationType?: 'fade' | 'slide' | 'typewriter' | 'morph' | 'scale' | 'scrollMorph';
  duration?: number;
  delay?: number;
  trigger?: boolean | HTMLElement;
  typewriterSpeed?: number;
  loop?: boolean;
  scrollTriggerConfig?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
  };
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  texts,
  className = '',
  animationType = 'fade',
  duration = 2000,
  delay = 0,
  trigger = true,
  typewriterSpeed = 50,
  loop = true,
  scrollTriggerConfig = {}
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts[0] || '');
  const textRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>();

  // Apple-style scroll-driven text morphing
  useGSAP(() => {
    if (!textRef.current || texts.length <= 1) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayText(texts[0]);
      return;
    }

    if (animationType === 'scrollMorph' && trigger !== true) {
      // Scroll-driven text morphing - Apple style
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger as HTMLElement || textRef.current,
          start: scrollTriggerConfig.start || 'top 80%',
          end: scrollTriggerConfig.end || 'bottom 20%',
          scrub: scrollTriggerConfig.scrub !== undefined ? scrollTriggerConfig.scrub : 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const textIndex = Math.floor(progress * (texts.length - 1));
            const nextIndex = Math.min(textIndex + 1, texts.length - 1);
            
            if (textIndex !== currentIndex) {
              // Smooth text transition with GSAP
              gsap.to(textRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.2,
                ease: 'power2.out',
                onComplete: () => {
                  setCurrentIndex(textIndex);
                  setDisplayText(texts[textIndex]);
                  gsap.fromTo(textRef.current, 
                    { opacity: 0, scale: 1.05 },
                    { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
                  );
                }
              });
            }
          }
        }
      });
      
      timelineRef.current = tl;
      return () => tl.kill();
    }

    if (animationType === 'morph' && trigger === true) {
      // Time-based morphing with GSAP
      const tl = gsap.timeline({ 
        repeat: loop ? -1 : 0, 
        delay: delay / 1000,
        onRepeat: () => {
          const nextIndex = (currentIndex + 1) % texts.length;
          morphToText(texts[nextIndex], nextIndex);
        }
      });
      
      // Initial morph cycle
      texts.forEach((text, index) => {
        if (index > 0) {
          tl.call(() => morphToText(text, index), [], index * (duration / 1000));
        }
      });
      
      timelineRef.current = tl;
      return () => tl.kill();
    }

    if (animationType === 'typewriter') {
      // Enhanced typewriter with GSAP
      typewriterEffect();
    }

  }, [texts, animationType, trigger, currentIndex, duration, delay, loop, scrollTriggerConfig]);

  const morphToText = useCallback((newText: string, newIndex: number) => {
    if (!textRef.current) return;
    
    const tl = gsap.timeline();
    
    // Morph out current text
    tl.to(textRef.current, {
      opacity: 0,
      scale: 0.9,
      rotationX: 90,
      duration: 0.3,
      ease: 'power2.out'
    })
    // Change text content
    .call(() => {
      setDisplayText(newText);
      setCurrentIndex(newIndex);
    })
    // Morph in new text
    .fromTo(textRef.current, 
      { opacity: 0, scale: 1.1, rotationX: -90 },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.4,
        ease: 'power2.out'
      }
    );
  }, []);

  const typewriterEffect = useCallback(() => {
    if (!textRef.current || texts.length === 0) return;
    
    let currentTextIndex = 0;
    
    const typeText = (text: string) => {
      setDisplayText('');
      
      const tl = gsap.timeline();
      
      // Type each character
      for (let i = 0; i <= text.length; i++) {
        tl.call(() => {
          setDisplayText(text.slice(0, i));
        }, [], i * (typewriterSpeed / 1000));
      }
      
      // Wait, then move to next text
      tl.call(() => {
        if (loop) {
          currentTextIndex = (currentTextIndex + 1) % texts.length;
          setTimeout(() => typeText(texts[currentTextIndex]), duration - (text.length * typewriterSpeed));
        }
      }, [], text.length * (typewriterSpeed / 1000) + 1);
      
      return tl;
    };
    
    const tl = typeText(texts[currentTextIndex]);
    timelineRef.current = tl;
    
    return () => tl.kill();
  }, [texts, typewriterSpeed, duration, loop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const getAnimationClasses = () => {
    const baseClasses = 'inline-block will-change-transform';
    
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return `${baseClasses} opacity-100`;
    }
    
    return baseClasses;
  };

  return (
    <span 
      ref={textRef}
      className={`${getAnimationClasses()} ${className}`}
      style={{ 
        willChange: 'transform, opacity',
        transformStyle: 'preserve-3d'
      }}
    >
      {displayText}
      {animationType === 'typewriter' && (
        <span className="animate-pulse ml-1 text-current opacity-70">|</span>
      )}
    </span>
  );
};

export default AnimatedText;
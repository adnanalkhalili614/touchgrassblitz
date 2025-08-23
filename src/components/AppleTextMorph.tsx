import React, { useEffect, useState, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useAppleParallax';

interface AppleTextMorphProps {
  texts: string[];
  className?: string;
  duration?: number;
  trigger?: 'scroll' | 'time';
  scrollConfig?: {
    start?: string;
    end?: string;
  };
}

const AppleTextMorph: React.FC<AppleTextMorphProps> = ({
  texts,
  className = '',
  duration = 3000,
  trigger = 'scroll',
  scrollConfig = { start: 'top 80%', end: 'bottom 20%' }
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts[0] || '');
  const [isAnimating, setIsAnimating] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  // Apple-style text morphing with smooth character transitions
  const morphText = (fromText: string, toText: string, callback?: () => void) => {
    if (!textRef.current) return;

    setIsAnimating(true);
    const element = textRef.current;
    const maxLength = Math.max(fromText.length, toText.length);
    let step = 0;
    const steps = 20; // Number of animation frames
    const stepDuration = 50; // Duration per step in ms

    // Apple-style easing function
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      if (step <= steps) {
        const progress = easeOutCubic(step / steps);
        let result = '';

        for (let i = 0; i < maxLength; i++) {
          const charProgress = Math.max(0, Math.min(1, (progress * maxLength - i) / 2));
          
          if (charProgress >= 1) {
            // Character fully transitioned
            result += toText[i] || '';
          } else if (charProgress > 0) {
            // Character in transition - use random chars for Apple-style glitch effect
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
            if (Math.random() < 0.7) {
              result += chars[Math.floor(Math.random() * chars.length)];
            } else {
              result += toText[i] || fromText[i] || '';
            }
          } else {
            // Character not yet transitioning
            result += fromText[i] || '';
          }
        }

        setDisplayText(result);
        
        // Apple-style scale effect during transition
        const scale = 1 + Math.sin(progress * Math.PI) * 0.05;
        element.style.transform = `scale(${scale})`;
        element.style.filter = `blur(${Math.sin(progress * Math.PI) * 0.5}px)`;

        step++;
        setTimeout(animate, stepDuration);
      } else {
        // Animation complete
        setDisplayText(toText);
        element.style.transform = 'scale(1)';
        element.style.filter = 'blur(0px)';
        setIsAnimating(false);
        callback?.();
      }
    };

    animate();
  };

  // Scroll-triggered morphing
  const scrollRef = useScrollAnimation({
    start: scrollConfig.start || 'top 95%',
    end: scrollConfig.end || 'bottom 30%',
    onUpdate: (progress) => {
      if (trigger !== 'scroll' || texts.length <= 1) return;

      const targetIndex = Math.floor(progress * (texts.length - 1));
      const nextIndex = Math.min(targetIndex + 1, texts.length - 1);
      
      // Calculate sub-progress within current text pair
      const subProgress = (progress * (texts.length - 1)) % 1;
      
      if (targetIndex !== currentIndex && !isAnimating) {
        morphText(texts[currentIndex], texts[targetIndex], () => {
          setCurrentIndex(targetIndex);
        });
      }
    }
  });

  // Time-based morphing
  useEffect(() => {
    if (trigger !== 'time' || texts.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % texts.length;
      morphText(texts[currentIndex], texts[nextIndex], () => {
        setCurrentIndex(nextIndex);
      });
    }, duration);

    return () => clearInterval(interval);
  }, [currentIndex, texts, duration, trigger]);

  return (
    <span 
      ref={trigger === 'scroll' ? scrollRef as React.RefObject<HTMLSpanElement> : textRef}
      className={`${className} inline-block will-change-transform`}
      style={{ 
        willChange: 'transform, filter',
        transformOrigin: 'center center'
      }}
    >
      <span ref={textRef} className="inline-block">
        {displayText}
      </span>
      
      {/* Apple-style cursor effect during animation */}
      {isAnimating && (
        <span className="inline-block w-0.5 h-[1em] bg-current ml-1 animate-pulse" />
      )}
    </span>
  );
};

export default AppleTextMorph;
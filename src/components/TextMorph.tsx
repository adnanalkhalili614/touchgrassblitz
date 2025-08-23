import React, { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TextMorphProps {
  texts: string[];
  className?: string;
  morphSpeed?: number;
  threshold?: number;
}

const TextMorph: React.FC<TextMorphProps> = ({
  texts,
  className = '',
  morphSpeed = 100,
  threshold = 0.2
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts[0] || '');
  const [isMorphing, setIsMorphing] = useState(false);
  const elementRef = React.useRef<HTMLSpanElement>(null);
  const morphRef = useRef<NodeJS.Timeout>();

  const morphText = (fromText: string, toText: string, callback?: () => void) => {
    setIsMorphing(true);
    const maxLength = Math.max(fromText.length, toText.length);
    let step = 0;

    const morph = () => {
      if (step <= maxLength) {
        let result = '';
        for (let i = 0; i < maxLength; i++) {
          if (i < step) {
            result += toText[i] || '';
          } else if (i < fromText.length) {
            // Random character effect during transition
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
            result += Math.random() < 0.7 ? fromText[i] : chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayText(result);
        step++;
        morphRef.current = setTimeout(morph, morphSpeed);
      } else {
        setDisplayText(toText);
        setIsMorphing(false);
        callback?.();
      }
    };

    morph();
  };

  // GSAP-powered morphing with scroll trigger
  useGSAP(() => {
    if (!elementRef.current || texts.length <= 1) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => startMorphCycle(),
        onLeave: () => stopMorphCycle(),
        onEnterBack: () => startMorphCycle(),
        onLeaveBack: () => stopMorphCycle()
      }
    });

    return () => {
      tl.kill();
      stopMorphCycle();
    };
  });

  const startMorphCycle = () => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % texts.length;
      morphText(texts[currentIndex], texts[nextIndex], () => {
        setCurrentIndex(nextIndex);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  };

  const stopMorphCycle = () => {
    if (morphRef.current) clearTimeout(morphRef.current);
  };

  useEffect(() => {
    return () => {
      if (morphRef.current) clearTimeout(morphRef.current);
    };
  }, []);

  return (
    <span 
      ref={elementRef}
      className={`${className} ${isMorphing ? 'animate-pulse' : ''}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {displayText}
    </span>
  );
};

export default TextMorph;
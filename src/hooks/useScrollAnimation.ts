import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  resetOnExit?: boolean;
  debounceMs?: number;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false,
    resetOnExit = true,
    debounceMs = 16 // ~60fps
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Debounced visibility handler to prevent flickering
  const debouncedSetVisible = useCallback((visible: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(visible);
    }, debounceMs);
  }, [debounceMs]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          if (!triggerOnce || !hasAnimated) {
            debouncedSetVisible(true);
            setHasAnimated(true);
          }
        } else {
          if (resetOnExit && !triggerOnce) {
            debouncedSetVisible(false);
            // Reset animation state after a delay to allow for smooth re-entry
            setTimeout(() => setHasAnimated(false), 200);
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, resetOnExit, hasAnimated, debouncedSetVisible]);

  return { elementRef, isVisible, hasAnimated };
};

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous RAF to prevent stacking
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);
        
        setScrollProgress(progress);
        setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { scrollProgress, scrollDirection };
};

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      // Cancel previous RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = elementRef.current!.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * speed;
        
        // Only update if element is in viewport for performance
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          setOffset(rate);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed]);

  return { elementRef, offset };
};

// New hook for sticky section animations
export const useStickyAnimation = (sectionHeight: number = 100) => {
  const [progress, setProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const element = elementRef.current!;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if section is in sticky range
        const stickyStart = rect.top <= 0;
        const stickyEnd = rect.bottom <= windowHeight;
        
        setIsSticky(stickyStart && !stickyEnd);
        
        if (stickyStart && !stickyEnd) {
          // Calculate progress through sticky section
          const scrolledInSection = Math.abs(rect.top);
          const totalStickyHeight = rect.height - windowHeight;
          const stickyProgress = Math.min(Math.max(scrolledInSection / totalStickyHeight, 0), 1);
          setProgress(stickyProgress);
        } else {
          setProgress(stickyStart ? 1 : 0);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sectionHeight]);

  return { elementRef, progress, isSticky };
};

// Hook for text scaling based on scroll
export const useTextScale = (minScale: number = 0.8, maxScale: number = 1.2) => {
  const [scale, setScale] = useState(1);
  const elementRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const element = elementRef.current!;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate scale based on element position in viewport
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        const maxDistance = windowHeight / 2;
        
        // Scale inversely to distance from center
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        const currentScale = maxScale - (normalizedDistance * (maxScale - minScale));
        
        setScale(currentScale);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [minScale, maxScale]);

  return { elementRef, scale };
};
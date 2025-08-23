import { useEffect, useRef, useCallback } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
  easing?: string;
  threshold?: number;
}

interface ScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  onUpdate?: (progress: number) => void;
}

// High-performance scroll handler with RAF throttling
class AppleScrollController {
  private static instance: AppleScrollController;
  private rafId: number | null = null;
  private scrollY = 0;
  private callbacks: Set<() => void> = new Set();
  private isScrolling = false;
  private scrollTimeout: NodeJS.Timeout | null = null;

  static getInstance(): AppleScrollController {
    if (!AppleScrollController.instance) {
      AppleScrollController.instance = new AppleScrollController();
    }
    return AppleScrollController.instance;
  }

  private constructor() {
    this.handleScroll = this.handleScroll.bind(this);
    this.updateAnimations = this.updateAnimations.bind(this);
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }

  private handleScroll(): void {
    this.scrollY = window.scrollY;
    this.isScrolling = true;

    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 150);

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(this.updateAnimations);
    }
  }

  private updateAnimations(): void {
    this.callbacks.forEach(callback => callback());
    this.rafId = null;

    if (this.isScrolling) {
      this.rafId = requestAnimationFrame(this.updateAnimations);
    }
  }

  subscribe(callback: () => void): () => void {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  getScrollY(): number {
    return this.scrollY;
  }

  isCurrentlyScrolling(): boolean {
    return this.isScrolling;
  }
}

// Apple-style parallax hook
export const useAppleParallax = (options: ParallaxOptions = {}) => {
  const {
    speed = 0.5,
    direction = 'up',
    offset = 0,
    easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    threshold = 0.1
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const controller = AppleScrollController.getInstance();

  const updateParallax = useCallback(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const scrollY = controller.getScrollY();
    const windowHeight = window.innerHeight;

    // Check if element is in viewport with threshold
    const isInViewport = rect.bottom >= -windowHeight * threshold && 
                        rect.top <= windowHeight * (1 + threshold);

    if (!isInViewport) return;

    // Calculate parallax offset based on scroll position and element position
    const elementTop = rect.top + scrollY;
    const elementCenter = elementTop + rect.height / 2;
    const viewportCenter = scrollY + windowHeight / 2;
    const distance = elementCenter - viewportCenter;

    // Apply easing function for smooth movement
    const parallaxOffset = distance * speed + offset;

    let transform = '';
    switch (direction) {
      case 'up':
        transform = `translate3d(0, ${-parallaxOffset}px, 0)`;
        break;
      case 'down':
        transform = `translate3d(0, ${parallaxOffset}px, 0)`;
        break;
      case 'left':
        transform = `translate3d(${-parallaxOffset}px, 0, 0)`;
        break;
      case 'right':
        transform = `translate3d(${parallaxOffset}px, 0, 0)`;
        break;
    }

    // Apply transform with hardware acceleration
    element.style.transform = transform;
    element.style.willChange = 'transform';
    element.style.transition = controller.isCurrentlyScrolling() ? 'none' : `transform 0.1s ${easing}`;
  }, [speed, direction, offset, easing, threshold, controller]);

  useEffect(() => {
    const unsubscribe = controller.subscribe(updateParallax);
    
    // Initial calculation
    updateParallax();

    // Handle resize
    const handleResize = () => {
      setTimeout(updateParallax, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
      
      // Clean up element styles
      if (elementRef.current) {
        elementRef.current.style.transform = '';
        elementRef.current.style.willChange = '';
        elementRef.current.style.transition = '';
      }
    };
  }, [updateParallax]);

  return elementRef;
};

// Apple-style scroll-triggered animations
export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    trigger,
    start = 'top 90%',
    end = 'bottom 50%',
    scrub = false,
    pin = false,
    onUpdate
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const controller = AppleScrollController.getInstance();

  const updateAnimation = useCallback(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const triggerElement = trigger ? document.querySelector(trigger) : element;
    if (!triggerElement) return;

    const rect = triggerElement.getBoundingClientRect();
    const scrollY = controller.getScrollY();
    const windowHeight = window.innerHeight;

    // Parse start and end positions
    const startOffset = parseFloat(start.split(' ')[1]) / 100 * windowHeight;
    const endOffset = parseFloat(end.split(' ')[1]) / 100 * windowHeight;

    const startPosition = rect.top + scrollY - (windowHeight - startOffset);
    const endPosition = rect.bottom + scrollY - endOffset;

    // Calculate progress (0 to 1)
    const progress = Math.max(0, Math.min(1, 
      (scrollY - startPosition) / (endPosition - startPosition)
    ));

    // Apply pin effect
    if (pin && progress > 0 && progress < 1) {
      element.style.position = 'fixed';
      element.style.top = '0';
      element.style.left = '0';
      element.style.width = '100%';
      element.style.zIndex = '10';
    } else if (pin) {
      element.style.position = '';
      element.style.top = '';
      element.style.left = '';
      element.style.width = '';
      element.style.zIndex = '';
    }

    // Call update callback with progress
    if (onUpdate) {
      onUpdate(progress);
    }

    return progress;
  }, [trigger, start, end, pin, onUpdate, controller]);

  useEffect(() => {
    const unsubscribe = controller.subscribe(updateAnimation);
    
    // Initial calculation
    updateAnimation();

    return () => {
      unsubscribe();
      
      // Clean up pinned styles
      if (elementRef.current && pin) {
        const element = elementRef.current;
        element.style.position = '';
        element.style.top = '';
        element.style.left = '';
        element.style.width = '';
        element.style.zIndex = '';
      }
    };
  }, [updateAnimation, pin]);

  return elementRef;
};

// Apple-style text scaling animation
export const useTextScale = (minScale = 0.8, maxScale = 1.2) => {
  const elementRef = useRef<HTMLElement>(null);
  const controller = AppleScrollController.getInstance();

  const updateScale = useCallback(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;

    // Calculate distance from viewport center
    const distance = Math.abs(elementCenter - viewportCenter);
    const maxDistance = windowHeight / 2;
    const normalizedDistance = Math.min(distance / maxDistance, 1);

    // Calculate scale (closer to center = larger)
    const scale = maxScale - (normalizedDistance * (maxScale - minScale));

    element.style.transform = `scale(${scale})`;
    element.style.transformOrigin = 'center center';
  }, [minScale, maxScale, controller]);

  useEffect(() => {
    const unsubscribe = controller.subscribe(updateScale);
    updateScale();

    return () => {
      unsubscribe();
      if (elementRef.current) {
        elementRef.current.style.transform = '';
        elementRef.current.style.transformOrigin = '';
      }
    };
  }, [updateScale]);

  return elementRef;
};

export default AppleScrollController;
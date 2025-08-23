import React, { ReactNode } from 'react';
import { useStickyAnimation } from '../hooks/useScrollAnimation';

interface StickySectionProps {
  children: ReactNode;
  className?: string;
  stickyHeight?: number;
  onProgressChange?: (progress: number) => void;
}

const StickySection: React.FC<StickySectionProps> = ({
  children,
  className = '',
  stickyHeight = 200,
  onProgressChange
}) => {
  const { elementRef, progress, isSticky } = useStickyAnimation(stickyHeight);

  React.useEffect(() => {
    onProgressChange?.(progress);
  }, [progress, onProgressChange]);

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`relative ${className}`}
      style={{ height: `${stickyHeight}vh` }}
    >
      <div 
        className={`${isSticky ? 'fixed top-0 left-0 w-full' : 'relative'} h-screen flex items-center justify-center`}
        style={{
          transform: `translateY(${progress * 50}px)`,
          opacity: 1 - (progress * 0.3)
        }}
      >
        {typeof children === 'function' ? children(progress, isSticky) : children}
      </div>
    </div>
  );
};

export default StickySection;
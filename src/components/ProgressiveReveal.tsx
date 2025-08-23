import React, { ReactNode, useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ProgressiveRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  threshold?: number;
  className?: string;
}

const ProgressiveReveal: React.FC<ProgressiveRevealProps> = ({
  children,
  staggerDelay = 200,
  threshold = 0.1,
  className = ''
}) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold, resetOnExit: true });
  const childrenArray = React.Children.toArray(children);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(childrenArray.length).fill(false));

  useEffect(() => {
    if (isVisible) {
      // Stagger the reveal of each child
      childrenArray.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * staggerDelay);
      });
    } else {
      // Reset all items when not visible
      setVisibleItems(new Array(childrenArray.length).fill(false));
    }
  }, [isVisible, childrenArray.length, staggerDelay]);

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>} className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ease-out ${
            visibleItems[index]
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform translate-y-8'
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ProgressiveReveal;
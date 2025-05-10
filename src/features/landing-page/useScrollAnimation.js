'use client';

import { useState, useEffect, useRef } from 'react';

// Custom hook to detect when an element enters the viewport
export function useScrollAnimation(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once the animation has played, we can unobserve the element
          if (!options.repeat && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (options.repeat) {
          // If repeat is enabled, reset visibility when element leaves viewport
          setIsVisible(false);
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options.rootMargin, options.threshold, options.repeat]);

  return [elementRef, isVisible];
}

// Helper function to create staggered animations for child elements
export function useStaggeredAnimation(count, options = {}) {
  const [containerRef, isVisible] = useScrollAnimation(options);

  return { containerRef, isVisible, getDelay: (index) => index * (options.staggerDelay || 0.1) };
}

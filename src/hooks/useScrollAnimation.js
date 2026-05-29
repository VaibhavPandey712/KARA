import { useEffect, useRef, useState } from 'react';

/**
 * useScrollAnimation — triggers a "visible" class when element enters viewport
 * @param {number} threshold - 0–1, default 0.12
 * @param {string} rootMargin - default '0px 0px -60px 0px'
 */
export function useScrollAnimation(threshold = 0.12, rootMargin = '0px 0px -60px 0px') {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
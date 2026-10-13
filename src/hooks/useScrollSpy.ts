import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseScrollSpyOptions {
  offset?: number;
  rootMargin?: string;
  defaultSection?: string;
}

/**
 * useScrollSpy
 * Smoothly tracks the viewport scroll position and updates the active section identifier.
 * Guarantees zero glitching on rapid scrolls and honors direct hash navigation on initial load.
 */
export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
): string {
  const {
    rootMargin = '-20% 0px -65% 0px',
    defaultSection = sectionIds[0] || 'now',
  } = options;

  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash && sectionIds.includes(hash)) {
        return hash;
      }
    }
    return defaultSection;
  });

  const activeSectionRef = useRef<string>(activeSection);

  // Keep ref synchronized whenever activeSection state changes
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      activeSectionRef.current = hash;
      setActiveSection(hash);
    }
  }, [sectionIds]);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nextId = entry.target.id;
            if (activeSectionRef.current !== nextId) {
              activeSectionRef.current = nextId;
              setActiveSection(nextId);
            }
          }
        });
      },
      {
        root: null,
        rootMargin,
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Fallback scroll listener for rapid flick-scrolling
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // clearance offset
      let currentSection = activeSectionRef.current;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPosition >= top) {
            currentSection = id;
            break;
          }
        }
      }

      if (currentSection !== activeSectionRef.current) {
        activeSectionRef.current = currentSection;
        setActiveSection(currentSection);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [sectionIds, rootMargin]);

  return activeSection;
}

export default useScrollSpy;

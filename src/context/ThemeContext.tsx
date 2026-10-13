import React, { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'theme';

/**
 * Determine initial theme safely from DOM class, localStorage, or system preference.
 */
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';

  // 1. DOM attribute set by synchronous <head> script takes precedence
  if (document.documentElement.classList.contains('dark')) {
    return 'dark';
  }
  if (document.documentElement.getAttribute('data-theme') === 'light') {
    return 'light';
  }

  // 2. Local storage check
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // QuotaExceededError or private browsing security restriction
  }

  // 3. System media query fallback
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

/**
 * Apply theme to document element and persist in localStorage safely.
 */
const applyThemeToDOM = (nextTheme: Theme) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  if (nextTheme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }

  try {
    localStorage.setItem(STORAGE_KEY, nextTheme);
  } catch (err) {
    // In Safari private mode or if storage quota is exceeded, fail silently
    console.warn('Unable to persist theme to localStorage:', err);
  }
};

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Sync DOM with current theme state on mount
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  // Listen to OS system preference changes if user hasn't explicitly set a preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          const next = e.matches ? 'dark' : 'light';
          setThemeState(next);
          applyThemeToDOM(next);
        }
      } catch {
        // Storage access error
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyThemeToDOM(next);
      return next;
    });
  }, []);

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode (Current: ${theme})`}
      className={`
        relative inline-flex items-center justify-center
        w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg
        border border-border-subtle
        bg-surface hover:bg-surface-elevated hover:border-border-hover
        text-secondary hover:text-primary
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        ${className}
      `}
    >
      {isDark ? (
        <Sun
          className="w-5 h-5 text-accent transition-transform duration-200"
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="w-5 h-5 text-accent transition-transform duration-200"
          aria-hidden="true"
        />
      )}
      <span className="sr-only">
        Switch to {isDark ? 'light' : 'dark'} mode (Current: {theme})
      </span>
    </button>
  );
};

export default ThemeToggle;

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'muted';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const variantStyles = {
    default: 'bg-surface-elevated text-secondary border-border-subtle',
    accent: 'bg-accent/10 text-accent border-accent/20',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    muted: 'bg-surface text-muted border-border-subtle/50'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

import React from 'react';
import { FileText, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import type { NavItem, ProfileData } from '../../types';
import { DEFAULT_PROFILE, DEFAULT_NAV_ITEMS } from './DesktopSidebar';

export interface MobileHeaderProps {
  activeSection: string;
  profile?: ProfileData;
  navItems?: NavItem[];
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  activeSection,
  profile = DEFAULT_PROFILE,
  navItems = DEFAULT_NAV_ITEMS,
}) => {
  const displayName = profile.fullName || profile.name || 'Harsha Matta';

  return (
    <div className="lg:hidden w-full max-w-full">
      {/* Sticky Primary Header Bar (strictly h-16 = 64px at sticky top-0) */}
      <header className="sticky top-0 z-30 h-16 bg-surface/95 backdrop-blur-md border-b border-border-subtle flex items-center justify-between px-4 sm:px-6">
        {/* Brand Title */}
        <div className="flex items-center space-x-2 min-w-0">
          <a
            href="#now"
            className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-primary hover:text-accent transition-colors truncate min-h-[44px] flex items-center"
          >
            {displayName}
          </a>
        </div>

        {/* Action Cluster: Resume PDF + Theme Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <a
            href={profile.resumeUrl}
            download="Harsha_Matta_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Harsha Matta Resume PDF"
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface-elevated border border-border-subtle hover:border-hover text-xs font-mono text-accent hover:text-accent-hover transition-colors min-h-[44px] min-w-[44px]"
            title="Download Resume PDF"
          >
            <FileText className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="font-semibold hidden sm:inline">Resume PDF</span>
            <span className="font-semibold sm:hidden">Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-70 hidden sm:inline" aria-hidden="true" />
          </a>

          <ThemeToggle />
        </div>
      </header>

      {/* Horizontal Scrollable Pill Navigation Strip */}
      <nav
        aria-label="Section navigation"
        className="sticky top-16 z-20 bg-canvas/90 backdrop-blur-md border-b border-border-subtle/60 px-3 py-2 overflow-x-auto scrollbar-none flex items-center space-x-2"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`
                flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all min-h-[44px] flex items-center justify-center
                ${
                  isActive
                    ? 'bg-accent text-white font-semibold shadow-xs'
                    : 'bg-surface hover:bg-surface-elevated text-secondary hover:text-primary border border-border-subtle'
                }
              `}
            >
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileHeader;

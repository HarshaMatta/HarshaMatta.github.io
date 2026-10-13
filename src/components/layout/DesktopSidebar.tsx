import React from 'react';
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  BookOpen,
  ArrowUpRight,
  MapPin,
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import type { NavItem, ProfileData } from '../../types';
import { profile as defaultProfileData } from '../../data/profile';

export type { NavItem, ProfileData };

export interface DesktopSidebarProps {
  activeSection: string;
  profile?: ProfileData;
  navItems?: NavItem[];
}

export const DEFAULT_PROFILE: ProfileData = defaultProfileData;

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'now', label: 'Now & Focus', href: '#now' },
  { id: 'projects', label: 'Selected Projects', href: '#projects', badge: '4' },
  { id: 'quant', label: 'Quantitative Research', href: '#quant', badge: 'VRP' },
  { id: 'writing', label: 'Technical Writing', href: '#writing', badge: '3.4k' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'education', label: 'Education & Skills', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  activeSection,
  profile = DEFAULT_PROFILE,
  navItems = DEFAULT_NAV_ITEMS,
}) => {
  const displayName = profile.fullName || profile.name || 'Harsha Matta';
  const githubUrl = profile.social?.github || 'https://github.com/HarshaMatta';
  const linkedinUrl = profile.social?.linkedin || 'https://linkedin.com/in/harshamatta';
  const mediumUrl = profile.social?.medium || 'https://medium.com/@harsha.v.matta';
  const emailAddress = profile.email || 'harsha.v.matta@gmail.com';

  return (
    <aside
      aria-label="Author and primary navigation"
      className="hidden lg:flex flex-col justify-between h-screen sticky top-0 py-12 xl:py-16 overflow-y-auto pr-6 xl:pr-10 select-none scrollbar-thin"
    >
      {/* Top Section: Identity & 20-Second Recruiter Pitch */}
      <div className="space-y-8">
        {/* Name & Academic Credentials */}
        <div>
          <h1 className="font-serif text-4xl xl:text-5xl font-bold tracking-tight text-primary">
            <a href="#now" className="hover:text-accent transition-colors">
              {displayName}
            </a>
          </h1>
          <p className="mt-3 font-sans text-base xl:text-lg font-medium text-accent">
            {profile.institution}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-surface-elevated text-secondary border border-border-subtle">
              {profile.degree}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-surface-elevated text-muted border border-border-subtle">
              Expected {profile.expectedGraduation}
            </span>
          </div>
        </div>

        {/* 20-Second Recruiter Pitch */}
        <div className="space-y-3 font-sans text-sm xl:text-base text-secondary leading-relaxed">
          <p>
            Building high-performance software and empirical mathematical models across three core engineering disciplines:
          </p>
          <div className="flex flex-col space-y-1.5 pt-1">
            {profile.disciplines.map((discipline, idx) => (
              <div
                key={discipline}
                className="flex items-center space-x-2 text-xs xl:text-sm font-mono text-primary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="font-medium">{discipline}</span>
                <span className="text-muted text-[11px]">
                  {idx === 0 && '— Swift, SwiftUI, local-first engine'}
                  {idx === 1 && '— deal.II HPC, FEM, C++20'}
                  {idx === 2 && '— SPX/VIX VRP, Options Greeks'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Action: Authoritative Resume PDF Button */}
        <div className="pt-2">
          <a
            href={profile.resumeUrl}
            download="Harsha_Matta_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-elevated border border-border-subtle hover:border-border-hover text-sm font-mono text-primary hover:text-accent transition-all duration-150 shadow-sm group min-h-[44px]"
            title="Download Harsha Matta's Resume PDF (Oct 2026)"
          >
            <span className="flex items-center space-x-2.5">
              <FileText className="w-4 h-4 text-accent" aria-hidden="true" />
              <span className="font-semibold">Resume PDF</span>
              <span className="text-xs text-muted font-sans">(Oct 2026)</span>
            </span>
            <ArrowUpRight
              className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* ScrollSpy Navigation Links */}
        <nav
          aria-label="Table of Contents"
          className="pt-4 flex flex-col space-y-1"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`
                  group flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-all duration-150 min-h-[44px]
                  ${
                    isActive
                      ? 'text-primary font-semibold bg-surface-elevated/70'
                      : 'text-secondary hover:text-primary hover:bg-surface/50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  {/* Visual Active Indicator Bar */}
                  <span
                    className={`
                      h-0.5 rounded-full transition-all duration-200
                      ${
                        isActive
                          ? 'w-8 bg-accent'
                          : 'w-4 bg-border-hover group-hover:w-6 group-hover:bg-accent/60'
                      }
                    `}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                {item.badge && (
                  <span
                    className={`
                      text-[10px] font-mono px-1.5 py-0.5 rounded
                      ${
                        isActive
                          ? 'bg-accent/15 text-accent font-medium'
                          : 'bg-surface-elevated text-muted'
                      }
                    `}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Socials, Location, & Theme Switcher */}
      <div className="pt-8 space-y-4 border-t border-border-subtle/60">
        <div className="flex items-center justify-between">
          {/* Social Channels */}
          <div className="flex items-center space-x-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center text-secondary hover:text-primary hover:bg-surface border border-transparent hover:border-border-subtle transition-colors"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center text-secondary hover:text-primary hover:bg-surface border border-transparent hover:border-border-subtle transition-colors"
            >
              <Linkedin className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href={mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium Publication"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center text-secondary hover:text-primary hover:bg-surface border border-transparent hover:border-border-subtle transition-colors"
            >
              <BookOpen className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${emailAddress}`}
              aria-label="Direct Email"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center text-secondary hover:text-primary hover:bg-surface border border-transparent hover:border-border-subtle transition-colors"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>

        {/* Location & Status Marker */}
        <div className="flex items-center space-x-2 text-xs font-mono text-muted">
          <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" aria-hidden="true" />
          <span>{profile.location} &middot; Open to Summer 2026/2027 roles</span>
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;

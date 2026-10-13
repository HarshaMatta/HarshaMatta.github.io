import React from 'react';
import { FileText, ArrowUp, Github, Linkedin, Mail, BookOpen } from 'lucide-react';
import type { ProfileData } from '../../types';
import { DEFAULT_PROFILE } from './DesktopSidebar';

export interface FooterProps {
  profile?: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile = DEFAULT_PROFILE }) => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const displayName = profile.fullName || profile.name || 'Harsha Matta';
  const githubUrl = profile.social?.github || 'https://github.com/HarshaMatta';
  const linkedinUrl = profile.social?.linkedin || 'https://linkedin.com/in/harshamatta';
  const mediumUrl = profile.social?.medium || 'https://medium.com/@harsha.v.matta';
  const emailAddress = profile.email || 'harsha.v.matta@gmail.com';

  return (
    <footer
      aria-label="Site Colophon and Status"
      className="border-t border-border-subtle pt-12 pb-16 space-y-8 font-sans text-xs text-secondary w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Editorial Colophon */}
        <div className="space-y-2 max-w-xl">
          <p className="text-primary font-medium text-sm">
            Designed and engineered by {displayName}.
          </p>
          <p className="text-secondary leading-relaxed">
            Undergraduate in Applied Mathematics &amp; Computer Science at the{' '}
            <span className="text-primary font-medium">{profile.institution}</span> (Expected {profile.expectedGraduation}).
          </p>
          <p className="text-muted font-mono text-[11px]">
            Built with React 19, TypeScript strict mode, Vite, and Tailwind CSS. Hosted on GitHub Pages with dual-theme Warm Paper Light and Obsidian Dark tokens.
          </p>
        </div>

        {/* Back to Top & Quick Resume Button */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.resumeUrl}
            download="Harsha_Matta_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-surface border border-border-subtle hover:border-hover text-accent font-mono text-xs transition-colors min-h-[44px]"
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Harsha_Matta_Resume.pdf</span>
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="inline-flex items-center space-x-1 px-3 py-2 rounded-lg bg-surface hover:bg-surface-elevated border border-border-subtle hover:border-hover text-primary font-mono text-xs transition-colors min-h-[44px]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Social Links & Availability Beacon */}
      <div className="pt-6 border-t border-border-subtle/50 flex flex-col sm:flex-row sm:flex-nowrap sm:items-center justify-between gap-4">
        {/* Availability Beacon */}
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs text-primary">
            Available for Summer 2026/2027 Systems &amp; Quantitative Engineering Internships
          </span>
        </div>

        {/* Social Links Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="min-h-[44px] min-w-[44px] inline-flex items-center space-x-1.5 py-2 px-2 hover:text-primary transition-colors font-mono text-xs"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="min-h-[44px] min-w-[44px] inline-flex items-center space-x-1.5 py-2 px-2 hover:text-primary transition-colors font-mono text-xs"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a
            href={mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium Publication"
            className="min-h-[44px] min-w-[44px] inline-flex items-center space-x-1.5 py-2 px-2 hover:text-primary transition-colors font-mono text-xs"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Medium</span>
          </a>
          <a
            href={`mailto:${emailAddress}`}
            aria-label="Direct Email"
            className="min-h-[44px] min-w-[44px] inline-flex items-center space-x-1.5 py-2 px-2 hover:text-accent transition-colors font-mono text-xs"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Email</span>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-muted text-[11px] font-mono">
        &copy; 2026 Harsha Matta. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

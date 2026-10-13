import React, { useState } from 'react';
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Lock,
  FileSpreadsheet,
  Maximize2,
  Star
} from 'lucide-react';
import type { ProjectItem } from '../../types';
import type { LightboxMedia } from '../ui/LightboxModal';

interface TrackInOfficeShowcaseProps {
  project: ProjectItem;
  onOpenLightbox: (media: LightboxMedia) => void;
}

export const TrackInOfficeShowcase: React.FC<TrackInOfficeShowcaseProps> = ({
  project,
  onOpenLightbox
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="p-6 sm:p-8 rounded-3xl bg-surface border border-border-subtle shadow-sm hover:border-border-hover transition-all space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start space-x-4">
          <img
            src={project.icon || '/assets/trackinoffice/icon.jpg'}
            alt="TrackInOffice App Icon"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-md border border-border-subtle shrink-0 object-cover"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                {project.title}
              </h3>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Star className="w-3 h-3 fill-current" />
                <span>5.0 ★ App Store</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-accent">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Action Link to App Store */}
        <div className="flex flex-wrap items-center gap-2 sm:self-start">
          {project.actions.map((act) => (
            <a
              key={act.url}
              href={act.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all min-h-[44px] ${
                act.primary
                  ? 'bg-accent text-white hover:bg-accent-hover shadow-sm'
                  : 'bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-primary'
              }`}
            >
              <span>{act.label}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          ))}
        </div>
      </div>

      {/* Narrative Summary */}
      <p className="text-sm sm:text-base text-secondary leading-relaxed font-sans">
        {project.description}
      </p>

      {/* Security & Systems Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-surface-elevated border border-border-subtle space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-primary">
            <Lock className="w-4 h-4 text-accent" />
            <span>Keychain Coordinate Vault</span>
          </div>
          <p className="text-xs text-secondary leading-relaxed font-sans">
            Workplace GPS coordinates are encrypted in iOS Keychain with <code className="text-primary font-mono font-semibold text-[11px]">kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly</code>, enabling locked-device background reads.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface-elevated border border-border-subtle space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-primary">
            <MapPin className="w-4 h-4 text-accent" />
            <span>Hardware Geofencing</span>
          </div>
          <p className="text-xs text-secondary leading-relaxed font-sans">
            Delegates boundary checking directly to low-power baseband cell/Wi-Fi geofences (<code className="text-primary font-mono font-semibold text-[11px]">CLCircularRegion</code>) with zero continuous GPS polling battery drain.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface-elevated border border-border-subtle space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-primary">
            <FileSpreadsheet className="w-4 h-4 text-accent" />
            <span>Formula-Injection Shielding</span>
          </div>
          <p className="text-xs text-secondary leading-relaxed font-sans">
            CSV export sanitizes control characters (<code className="text-primary font-mono font-semibold text-[11px]">=, +, -, @</code>) to shield corporate spreadsheets against remote formula injection exploits.
          </p>
        </div>
      </div>

      {/* Interactive Screenshot Gallery */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-secondary">
          <span>Production App Screens (Click to enlarge)</span>
          <span className="text-[11px] text-muted">Available on iOS App Store</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {project.media?.map((m, idx) => (
            <button
              key={m.src}
              type="button"
              onClick={() => onOpenLightbox({ src: m.src, alt: m.alt, caption: m.caption })}
              className="group relative rounded-xl overflow-hidden border border-border-subtle bg-surface-elevated hover:border-accent transition-all text-left focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={`View full resolution: ${m.caption || m.alt}`}
            >
              <div className="aspect-[9/16] max-h-[360px] w-full overflow-hidden bg-canvas/60 flex items-center justify-center p-2">
                <img
                  src={m.src}
                  alt={m.alt}
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface/90 text-primary text-xs font-mono shadow-md backdrop-blur-sm">
                  <Maximize2 className="w-3.5 h-3.5 text-accent" />
                  <span>Enlarge</span>
                </div>
              </div>

              <div className="p-2.5 border-t border-border-subtle bg-surface/90">
                <p className="text-[11px] text-secondary font-sans line-clamp-1">
                  {m.caption || `Screen ${idx + 1}`}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Technology Tags */}
      <div className="flex flex-wrap gap-1.5 pt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-surface-elevated text-secondary border border-border-subtle"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expandable Technical Deep-Dive Case Study */}
      <div className="border-t border-border-subtle pt-4">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-accent hover:text-accent-hover transition-colors min-h-[44px]"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Collapse Architecture Specs' : 'Explore Native Systems & Security Architecture'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && project.extendedCaseStudy && (
          <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-surface-elevated/70 border border-border-subtle space-y-5 animate-in fade-in duration-200">
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                Privacy-First Hybrid Attendance Architecture
              </h4>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                {project.extendedCaseStudy.overview}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider block">
                Technical Highlights &amp; Privacy Design:
              </span>
              <ul className="space-y-2 text-xs text-secondary font-sans">
                {project.extendedCaseStudy.architecture.map((arch, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-accent font-mono mt-0.5 font-bold">›</span>
                    <span className="leading-relaxed">{arch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.extendedCaseStudy.technicalHighlights && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {project.extendedCaseStudy.technicalHighlights.map((hl, i) => {
                  const title = typeof hl === 'string' ? `Highlight ${i + 1}` : hl.title;
                  const detail = typeof hl === 'string' ? hl : hl.detail;
                  return (
                    <div
                      key={title}
                      className="p-3.5 rounded-xl bg-surface border border-border-subtle space-y-1"
                    >
                      <span className="text-xs font-mono font-medium text-accent block">
                        {title}
                      </span>
                      <p className="text-xs text-secondary font-sans leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

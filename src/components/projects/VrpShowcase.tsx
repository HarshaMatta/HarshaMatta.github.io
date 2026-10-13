import React from 'react';
import {
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  Calculator,
  Maximize2
} from 'lucide-react';
import type { QuantProjectItem } from '../../types';
import type { LightboxMedia } from '../ui/LightboxModal';

interface VrpShowcaseProps {
  project: QuantProjectItem;
  onOpenLightbox: (media: LightboxMedia) => void;
}

export const VrpShowcase: React.FC<VrpShowcaseProps> = ({ project, onOpenLightbox }) => {

  return (
    <article className="p-6 sm:p-8 rounded-3xl bg-surface border border-border-subtle shadow-sm hover:border-border-hover transition-all space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0f172a] border border-border-subtle flex items-center justify-center font-mono font-bold text-accent text-xl shrink-0 shadow-md">
            <TrendingUp className="w-7 h-7 text-accent" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                {project.title}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                15+ Yrs SPX &amp; VIX &middot; Empirical Study
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-accent">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-2 sm:self-start">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-accent text-white hover:bg-accent-hover shadow-sm transition-all min-h-[44px]"
            >
              <span>Live Dashboard</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-primary transition-all min-h-[44px]"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          )}
          {project.paperUrl && (
            <a
              href={project.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-primary transition-all min-h-[44px]"
            >
              <span>Read Paper</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          )}
        </div>
      </div>

      {/* Narrative Summary */}
      <p className="text-sm sm:text-base text-secondary leading-relaxed font-sans">
        {project.description}
      </p>

      {/* Interactive Dashboard Preview Frame */}
      {project.previewSvg && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-secondary">
            <span>Streamlit Interactive Dashboard Preview (Click to inspect)</span>
            <span className="text-[11px] text-muted">Rolling Sharpe, Regime Attribution &amp; Heatmaps</span>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenLightbox({
                src: project.previewSvg!,
                alt: 'Volatility Risk Premium Streamlit Dashboard Preview',
                caption:
                  'Interactive Streamlit research dashboard showing rolling Sharpe ratios, monthly variance harvest heatmaps, and regime attribution'
              })
            }
            className="group relative w-full rounded-2xl overflow-hidden border border-border-subtle bg-[#0e1115] hover:border-accent transition-all text-left focus:outline-none focus:ring-2 focus:ring-accent p-3 sm:p-4"
            aria-label="View full resolution Volatility Risk Premium dashboard preview"
          >
            <div className="w-full max-h-[300px] flex items-center justify-center">
              <img
                src={project.previewSvg}
                alt="Volatility Risk Premium Dashboard Preview"
                loading="lazy"
                className="max-h-[280px] w-auto object-contain group-hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface/90 text-primary text-xs font-mono shadow-md backdrop-blur-sm">
                <Maximize2 className="w-3.5 h-3.5 text-accent" />
                <span>Inspect Visualization</span>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Core Mathematical Formulations */}
      {project.equations && project.equations.length > 0 && (
        <div className="space-y-3">
          <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider block">
            Mathematical Formulations &amp; Signals:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.equations.map((eq) => (
              <div
                key={eq.name}
                className="p-3.5 rounded-xl bg-surface-elevated border border-border-subtle space-y-1.5"
              >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-accent">
                  {eq.name}
                </span>
                <Calculator className="w-3.5 h-3.5 text-muted" />
              </div>
              <div className="p-2 rounded-lg bg-canvas border border-border-subtle font-mono text-xs text-primary font-semibold overflow-x-auto">
                {eq.latex}
              </div>
              <p className="text-[11px] text-secondary font-sans leading-relaxed">
                {eq.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Market Regime Partitioning */}
      {project.regimes && (
        <div className="space-y-3">
          <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider block">
            Market Regime Attribution:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.regimes.map((reg) => (
              <div
                key={reg.name}
                className="p-3.5 rounded-xl bg-surface-elevated border border-border-subtle space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-primary">
                    {reg.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                      reg.riskLevel === 'low'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : reg.riskLevel === 'moderate'
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'bg-rose-500/10 text-rose-500'
                    }`}
                  >
                    {reg.riskLevel}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-accent">
                  {reg.condition}
                </p>
                <p className="text-[11px] text-secondary font-sans leading-relaxed">
                  {reg.behavior}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Methodological Transparency & Honest Caveats */}
      {project.caveats && (
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Methodological Integrity &amp; Tail-Risk Caveats</span>
          </div>
          <ul className="space-y-1 text-xs text-secondary font-sans">
            {project.caveats.map((cav, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-amber-500 font-mono mt-0.5 font-bold">›</span>
                <span className="leading-relaxed">{cav}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

import React, { useState } from 'react';
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Maximize2,
  Code2
} from 'lucide-react';
import type { ProjectItem } from '../../types';
import type { LightboxMedia } from '../ui/LightboxModal';

interface DealiiShowcaseProps {
  project: ProjectItem;
  onOpenLightbox: (media: LightboxMedia) => void;
}

export const DealiiShowcase: React.FC<DealiiShowcaseProps> = ({ project, onOpenLightbox }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="p-6 sm:p-8 rounded-3xl bg-surface border border-border-subtle shadow-sm hover:border-border-hover transition-all space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#121519] border border-border-subtle flex items-center justify-center font-mono font-bold text-accent text-xl shrink-0 shadow-md">
            d2
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                {project.title}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                2 Merged PRs &middot; 1 In Review
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-accent">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Action Link to Upstream Repository */}
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

      {/* Verified Pull Requests Status Board */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-secondary">
          <span className="font-semibold text-primary uppercase tracking-wider">
            Verified Upstream Contributions (dealii/dealii)
          </span>
          <span className="text-[11px] text-muted">1.7k+ Stars &middot; C++20</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* PR 1: Merged */}
          <a
            href="https://github.com/dealii/dealii/pull/19327"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-surface-elevated border border-border-subtle hover:border-accent transition-all block group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Merged #19327</span>
              </span>
              <span className="text-[10px] font-mono text-muted">2026-02-25</span>
            </div>
            <h4 className="text-xs font-serif font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-1">
              Optimize InterpolatedUniformGridData delta_x caching
            </h4>
            <p className="text-[11px] text-secondary font-sans leading-relaxed">
              Cached grid increments to eliminate redundant divisions in inner loops across millions of parallel MPI quadrature evaluations.
            </p>
          </a>

          {/* PR 2: Merged */}
          <a
            href="https://github.com/dealii/dealii/pull/19370"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-surface-elevated border border-border-subtle hover:border-accent transition-all block group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Merged #19370</span>
              </span>
              <span className="text-[10px] font-mono text-muted">2026-03-08</span>
            </div>
            <h4 className="text-xs font-serif font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-1">
              Assert in real_to_unit_cell to catch non-hypercubes
            </h4>
            <p className="text-[11px] text-secondary font-sans leading-relaxed">
              Added boundary assertions to catch non-hypercube geometries and prevent silent solver divergence on mixed meshes.
            </p>
          </a>

          {/* PR 3: In Review */}
          <a
            href="https://github.com/dealii/dealii/pull/19804"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-surface-elevated border border-border-subtle hover:border-accent transition-all block group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-amber-500">
                <Clock className="w-3.5 h-3.5" />
                <span>In Review #19804</span>
              </span>
              <span className="text-[10px] font-mono text-muted">Active</span>
            </div>
            <h4 className="text-xs font-serif font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-1">
              Fix real to unit cell affine approximation
            </h4>
            <p className="text-[11px] text-secondary font-sans leading-relaxed">
              Stabilizing the initial affine approximation guess for Newton–Raphson iteration on distorted quad and hex meshes.
            </p>
          </a>
        </div>
      </div>

      {/* Vector Coordinate Mapping Diagram Frame */}
      {project.diagramSvg && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-secondary">
            <span>Finite Element Coordinate Inversion Diagram (Click to inspect)</span>
            <span className="text-[11px] text-muted">Unit Reference vs. Physical Mesh</span>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenLightbox({
                src: project.diagramSvg!,
                alt: 'deal.II Real-to-Unit Affine Coordinate Mapping Diagram',
                caption:
                  'Mapping from reference unit hypercube [0, 1]^d to distorted physical mesh cell K with Newton–Raphson coordinate inversion'
              })
            }
            className="group relative w-full rounded-2xl overflow-hidden border border-border-subtle bg-[#0e1115] hover:border-accent transition-all text-left focus:outline-none focus:ring-2 focus:ring-accent p-4 sm:p-6"
            aria-label="View full resolution deal.II affine mapping diagram"
          >
            <div className="w-full max-h-[280px] flex items-center justify-center">
              <img
                src={project.diagramSvg}
                alt="deal.II Real-to-Unit Coordinate Inversion Diagram"
                loading="lazy"
                className="max-h-[260px] w-auto object-contain group-hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface/90 text-primary text-xs font-mono shadow-md backdrop-blur-sm">
                <Maximize2 className="w-3.5 h-3.5 text-accent" />
                <span>View Full Vector Diagram</span>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Code Optimization Context */}
      <div className="p-4 rounded-2xl bg-canvas border border-border-subtle space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-accent font-semibold">
          <Code2 className="w-4 h-4" />
          <span>Hot-Path Optimization Breakdown (PR #19327)</span>
        </div>
        <p className="text-xs text-secondary font-sans leading-relaxed">
          In large-scale MPI finite-element simulations, <code className="font-mono text-primary font-semibold">InterpolatedUniformGridData::value()</code> evaluates material property tables millions of times per timestep. The original routine recalculated <code className="font-mono text-primary font-semibold">delta_x = (x_max - x_min) / (n_points - 1)</code> dynamically on every access. Precomputing and caching the grid-spacing increments in table memory eliminated thousands of redundant division operations on the innermost simulation loop.
        </p>
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

      {/* Expandable Technical Case Study */}
      <div className="border-t border-border-subtle pt-4">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-accent hover:text-accent-hover transition-colors min-h-[44px]"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Collapse Technical Case Study' : 'Explore Scientific Computing Deep Dive'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && project.extendedCaseStudy && (
          <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-surface-elevated/70 border border-border-subtle space-y-5 animate-in fade-in duration-200">
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                Mathematical Context: Finite Element Mesh Inversion
              </h4>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                {project.extendedCaseStudy.overview}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider block">
                Engineering Problems Solved:
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

            {project.extendedCaseStudy.caveatsOrChallenges && (
              <div className="p-3.5 rounded-xl bg-canvas border border-border-subtle text-xs text-secondary font-sans space-y-1">
                <span className="font-mono text-primary font-semibold block">
                  Current Status &amp; Peer Review:
                </span>
                <p>{project.extendedCaseStudy.caveatsOrChallenges[0]}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

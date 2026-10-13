import React from 'react';
import { ExternalLink, Maximize2, Calculator, PenTool } from 'lucide-react';
import type { LightboxMedia } from '../ui/LightboxModal';

interface SecondaryProjectsSectionProps {
  onOpenLightbox: (media: LightboxMedia) => void;
}

export const SecondaryProjectsSection: React.FC<SecondaryProjectsSectionProps> = ({
  onOpenLightbox
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-border-subtle pb-4 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-primary">
            Curated Engineering &amp; Quantitative Tools
          </h3>
          <p className="text-secondary text-xs sm:text-sm font-sans mt-1">
            Educational handwriting companion, analytical derivative sensitivity tools, and mathematical engines.
          </p>
        </div>
        <span className="hidden sm:inline-flex text-xs font-mono px-2.5 py-0.5 rounded-full bg-surface-elevated text-secondary border border-border-subtle">
          4 Curated Projects
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project 1: Paatam */}
        <article className="p-6 rounded-2xl bg-surface border border-border-subtle space-y-4 hover:border-border-hover transition-colors flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src="/assets/paatam/icon.jpg"
                  alt="Paatam Icon"
                  className="w-12 h-12 rounded-xl object-cover shadow-sm border border-border-subtle shrink-0"
                />
                <div>
                  <h4 className="font-serif text-lg font-semibold text-primary">
                    Paatam &mdash; Indic Script Learning
                  </h4>
                  <span className="text-xs font-mono text-accent">
                    275+ Organic Downloads &middot; iOS &amp; Android
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                Published
              </span>
            </div>

            <p className="text-xs text-secondary leading-relaxed font-sans">
              An interactive handwriting companion for learning Indian language scripts (Telugu, Hindi, Tamil, Kannada, Malayalam). Analyzes Apple PencilKit stroke direction heuristics in real time, pairing algorithmic spaced repetition with visual completion rings.
            </p>

            {/* Screenshots strip */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[
                { src: '/assets/paatam/screen1.jpg', label: 'Dashboard' },
                { src: '/assets/paatam/screen2.jpg', label: 'Tracing' },
                { src: '/assets/paatam/screen3.jpg', label: 'Rings' },
                { src: '/assets/paatam/screen4.jpg', label: 'Details' }
              ].map((s) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() =>
                    onOpenLightbox({
                      src: s.src,
                      alt: `Paatam ${s.label} Screen`,
                      caption: `Paatam — ${s.label} Interface`
                    })
                  }
                  className="group relative rounded-lg overflow-hidden border border-border-subtle bg-canvas aspect-[9/16] focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <img
                    src={s.src}
                    alt={`Paatam ${s.label}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <Maximize2 className="w-3 h-3 text-white" />
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Swift', 'SwiftUI', 'PencilKit', 'Flutter (Legacy)', 'Spaced Repetition'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-surface-elevated text-secondary border border-border-subtle"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-accent">
            <a
              href="https://apps.apple.com/us/app/paatam/id6670503097"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 font-semibold hover:underline min-h-[44px]"
            >
              <span>App Store</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/HarshaMatta/paatam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 hover:underline min-h-[44px]"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="paatam/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 hover:underline min-h-[44px]"
            >
              <span>Case Study</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </article>

        {/* Project 2: Options Greeks Visualizer */}
        <article className="p-6 rounded-2xl bg-surface border border-border-subtle space-y-4 hover:border-border-hover transition-colors flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-[#0f172a] border border-border-subtle flex items-center justify-center font-mono font-bold text-accent text-lg shrink-0">
                  <Calculator className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-primary">
                    Options Greeks Real-Time Visualizer
                  </h4>
                  <span className="text-xs font-mono text-accent">
                    Analytical Derivative Sensitivities
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-secondary leading-relaxed font-sans">
              An interactive dashboard modeling Delta, Gamma, Theta, Vega, and Rho sensitivities across strike prices, implied volatility surfaces, and expirations using analytical SciPy implementations.
            </p>

            <button
              type="button"
              onClick={() =>
                onOpenLightbox({
                  src: '/assets/quant/greeks_dashboard.svg',
                  alt: 'Options Greeks Visualizer Dashboard Preview',
                  caption: 'Interactive real-time Greeks sensitivity dashboard'
                })
              }
              className="group relative w-full aspect-[2/1] rounded-xl overflow-hidden border border-border-subtle bg-[#121519] flex items-center justify-center p-2 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <img
                src="/assets/quant/greeks_dashboard.svg"
                alt="Greeks Dashboard Preview"
                loading="lazy"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Python', 'SciPy', 'Plotly', 'Streamlit', 'Greeks Modeling'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-surface-elevated text-secondary border border-border-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-accent">
            <a
              href="https://greeksvisualizer.streamlit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 font-semibold hover:underline min-h-[44px]"
            >
              <span>Live App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/HarshaMatta/GreeksVisualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 hover:underline min-h-[44px]"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </article>

        {/* Project 3: Black-Scholes Profit Model */}
        <article className="p-6 rounded-2xl bg-surface border border-border-subtle space-y-4 hover:border-border-hover transition-colors flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-[#0f172a] border border-border-subtle flex items-center justify-center font-mono font-bold text-accent text-lg shrink-0">
                  BS
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-primary">
                    Black–Scholes Profit &amp; Payoff Model
                  </h4>
                  <span className="text-xs font-mono text-accent">
                    Analytical Option Pricing &amp; PnL Visualization
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-secondary leading-relaxed font-sans">
              Computes analytical call and put premiums, break-even thresholds, and expiration profit/loss boundaries with dynamic volatility adjustments and time decay schedules.
            </p>

            <button
              type="button"
              onClick={() =>
                onOpenLightbox({
                  src: '/assets/quant/black_scholes_dashboard.svg',
                  alt: 'Black-Scholes Dashboard Preview',
                  caption: 'Black–Scholes Option Profit & Payoff Model'
                })
              }
              className="group relative w-full aspect-[2/1] rounded-xl overflow-hidden border border-border-subtle bg-[#121519] flex items-center justify-center p-2 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <img
                src="/assets/quant/black_scholes_dashboard.svg"
                alt="Black-Scholes Dashboard"
                loading="lazy"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Python', 'Black-Scholes', 'Pandas', 'Streamlit', 'Payoff Analysis'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-surface-elevated text-secondary border border-border-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-accent">
            <a
              href="https://optionprofitmodel.streamlit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 font-semibold hover:underline min-h-[44px]"
            >
              <span>Live App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/HarshaMatta/optionProfitModel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 hover:underline min-h-[44px]"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </article>

        {/* Project 4: iPadOS Multivariable Calc App */}
        <article className="p-6 rounded-2xl bg-surface border border-border-subtle space-y-4 hover:border-border-hover transition-colors flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-[#0f172a] border border-border-subtle flex items-center justify-center font-mono font-bold text-accent text-lg shrink-0">
                  <PenTool className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-primary">
                    iPadOS Multivariable Calculus Engine
                  </h4>
                  <span className="text-xs font-mono text-accent">
                    SwiftUI &middot; PencilKit &middot; Vision OCR &middot; OpenAI
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-elevated text-secondary border border-border-subtle">
                Active
              </span>
            </div>

            <p className="text-xs text-secondary leading-relaxed font-sans">
              Local multivariable mathematical problem generator using LaTeX via SwiftMath. Clusters native Apple PencilKit stroke trajectories, extracts symbols via Vision OCR, and executes a staged grading pipeline (exact match &rarr; symbolic normalizer &rarr; LLM equivalence).
            </p>

            <div className="p-3.5 rounded-xl bg-surface-elevated border border-border-subtle text-xs text-secondary font-sans space-y-1">
              <span className="font-mono text-primary font-semibold text-[11px] block">
                Staged Pipeline:
              </span>
              <p className="text-[11px]">
                Direct Match &rarr; Normalized Symbolic Equivalence &rarr; OpenAI Diagnostic Verifier with daily client token budget limits.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Swift', 'SwiftUI', 'PencilKit', 'Vision OCR', 'Symbolic Math', 'iPadOS'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-surface-elevated text-secondary border border-border-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-accent">
            <span className="text-muted text-[11px] font-mono">
              Independent Academic Engineering Tool
            </span>
          </div>
        </article>
      </div>
    </div>
  );
};

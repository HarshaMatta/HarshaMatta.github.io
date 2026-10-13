import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DesktopSidebar, DEFAULT_NAV_ITEMS } from './components/layout/DesktopSidebar';
import { MobileHeader } from './components/layout/MobileHeader';
import { Footer } from './components/layout/Footer';
import { LightboxModal, type LightboxMedia } from './components/ui/LightboxModal';
import { NextShowcase } from './components/projects/NextShowcase';
import { DealiiShowcase } from './components/projects/DealiiShowcase';
import { TrackInOfficeShowcase } from './components/projects/TrackInOfficeShowcase';
import { VrpShowcase } from './components/projects/VrpShowcase';
import { SecondaryProjectsSection } from './components/projects/SecondaryProjectsSection';
import { WritingCard } from './components/writing/WritingCard';
import { useScrollSpy } from './hooks/useScrollSpy';
import {
  FileText,
  Sparkles,
  Layers,
  Cpu,
  TrendingUp,
  ArrowUpRight,
  Mail
} from 'lucide-react';

import { profile } from './data/profile';
import { projects } from './data/projects';
import { quantProjects } from './data/quant';
import { articles, writingMetadata } from './data/articles';
import { experience } from './data/experience';
import { leadership } from './data/leadership';
import { education } from './data/education';

const SECTION_IDS = [
  'now',
  'projects',
  'quant',
  'writing',
  'experience',
  'education',
  'contact',
];

const PortfolioShell: React.FC = () => {
  const [lightboxMedia, setLightboxMedia] = useState<LightboxMedia | null>(null);

  const activeSection = useScrollSpy(SECTION_IDS, {
    offset: 100,
    defaultSection: 'now',
  });

  const nextProject = projects.find((p) => p.id === 'next')!;
  const dealiiProject = projects.find((p) => p.id === 'dealii')!;
  const trackInOfficeProject = projects.find((p) => p.id === 'trackinoffice')!;
  const vrpProject = quantProjects.find((p) => p.id === 'vrp')!;

  return (
    <div className="min-h-screen bg-canvas text-primary selection:bg-accent-tint selection:text-accent overflow-x-hidden antialiased">
      {/* Accessible Skip to Content Link (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface-elevated focus:text-accent focus:border focus:border-border-subtle focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent font-mono text-xs"
      >
        Skip to main content
      </a>

      {/* Accessible Lightbox Modal */}
      <LightboxModal media={lightboxMedia} onClose={() => setLightboxMedia(null)} />

      {/* Mobile & Tablet Header */}
      <div className="lg:hidden sticky top-0 z-30 w-full h-16">
        <MobileHeader
          activeSection={activeSection}
          profile={profile}
          navItems={DEFAULT_NAV_ITEMS}
        />
      </div>

      {/* Primary Responsive Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="lg:flex lg:justify-between lg:gap-12 xl:gap-16">
          {/* Desktop Sticky Left Sidebar (~35-40% width) */}
          <div className="lg:w-[380px] xl:w-[420px] lg:shrink-0">
            <DesktopSidebar
              activeSection={activeSection}
              profile={profile}
              navItems={DEFAULT_NAV_ITEMS}
            />
          </div>

          {/* Right Scroll Stream (~60-65% width) */}
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 min-w-0 pt-8 pb-16 lg:py-16 space-y-20 lg:space-y-28 outline-none"
          >
            {/* ================================================================= */}
            {/* SECTION 1: NOW & 20-SECOND RECRUITER BRIEF                        */}
            {/* ================================================================= */}
            <section id="now" className="scroll-mt-32 lg:scroll-mt-24 space-y-6">
              <div className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center space-x-2 text-accent font-mono text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span>20-Second Candidate Brief</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-3">
                  {profile.fullName || profile.name}
                </h1>
                <p className="font-sans text-base sm:text-lg text-accent font-medium mb-2">
                  {profile.institution} &middot; {profile.degree}
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-surface-elevated text-secondary border border-border-subtle">
                    UNC Chapel Hill
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-surface-elevated text-secondary border border-border-subtle">
                    Expected {profile.expectedGraduation}
                  </span>
                </div>

                <p className="text-secondary text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  {profile.bioShort}
                </p>

                {/* 3 Core Disciplines Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <div className="p-4 rounded-2xl bg-surface-elevated border border-border-subtle space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-primary">
                      <Layers className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Native Apple Systems</span>
                    </div>
                    <p className="text-xs text-secondary font-sans leading-relaxed">
                      Shipped native software for iPhone, iPad, and Mac. Built Next (App Store ID 6781007283) with local-first Markdown vaults and NSFilePresenter sync, and InOffice Tracker (5.0 ★).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-elevated border border-border-subtle space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-primary">
                      <Cpu className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>C++ Scientific Computing</span>
                    </div>
                    <p className="text-xs text-secondary font-sans leading-relaxed">
                      Upstream contributor to deal.II (1.7k+ stars). 2 merged PRs (#19327, #19370) optimizing hot-path MPI table lookups and cell assertions; affine mapping PR #19804 in review.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-elevated border border-border-subtle md:col-span-2 space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-primary">
                      <TrendingUp className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Quantitative Finance &amp; Derivatives</span>
                    </div>
                    <p className="text-xs text-secondary font-sans leading-relaxed">
                      15+ year empirical study of the Volatility Risk Premium across SPX and VIX daily closes. Author of a 3-part Medium derivatives pricing series (3,400+ impressions).
                    </p>
                  </div>
                </div>

                {/* Resume & Direct Action Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={profile.resumeUrl}
                    download="Harsha_Matta_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-accent text-white hover:bg-accent-hover text-xs font-mono font-semibold transition-colors min-h-[44px] shadow-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Résumé PDF</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-xs font-mono text-primary transition-colors min-h-[44px]"
                  >
                    <Mail className="w-4 h-4 text-accent" />
                    <span>{profile.email}</span>
                  </a>

                  <span className="inline-flex items-center max-w-full px-3 py-1.5 rounded-full text-xs font-mono bg-surface-elevated text-secondary border border-border-subtle select-none">
                    Status: {profile.statusMessage}
                  </span>
                </div>
              </div>
            </section>

            {/* ================================================================= */}
            {/* SECTION 2: SELECTED WORK (4 ASYMMETRIC FLAGSHIPS)                 */}
            {/* ================================================================= */}
            <section id="projects" className="scroll-mt-32 lg:scroll-mt-24 space-y-8">
              <div className="border-b border-border-subtle pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                    Selected Engineering Projects
                  </h2>
                  <p className="text-secondary text-xs sm:text-sm font-sans mt-1">
                    Authentic native software, open-source C++ computing routines, and privacy-first systems.
                  </p>
                </div>
                <span className="hidden sm:inline-flex text-xs font-mono px-2.5 py-0.5 rounded-full bg-surface-elevated text-accent border border-border-subtle">
                  Curated Work
                </span>
              </div>

              {/* Flagship 1: Next */}
              {nextProject && (
                <NextShowcase
                  project={nextProject}
                  onOpenLightbox={(media) => setLightboxMedia(media)}
                />
              )}

              {/* Flagship 2: deal.II */}
              {dealiiProject && (
                <DealiiShowcase
                  project={dealiiProject}
                  onOpenLightbox={(media) => setLightboxMedia(media)}
                />
              )}

              {/* Flagship 3: InOffice Tracker */}
              {trackInOfficeProject && (
                <TrackInOfficeShowcase
                  project={trackInOfficeProject}
                  onOpenLightbox={(media) => setLightboxMedia(media)}
                />
              )}

              {/* Curated Secondary Work (Paatam, Greeks Visualizer, Black-Scholes, Calc App) */}
              <SecondaryProjectsSection
                onOpenLightbox={(media) => setLightboxMedia(media)}
              />
            </section>

            {/* ================================================================= */}
            {/* SECTION 3: QUANTITATIVE RESEARCH & DERIVATIVES                    */}
            {/* ================================================================= */}
            <section id="quant" className="scroll-mt-32 lg:scroll-mt-24 space-y-8">
              <div className="border-b border-border-subtle pb-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                  Quantitative Research &amp; Derivatives
                </h2>
                <p className="text-secondary text-xs sm:text-sm font-sans mt-1">
                  Empirical volatility risk premium pipeline, regime analysis, and analytical options models.
                </p>
              </div>

              {/* Flagship 4: Volatility Risk Premium Pipeline */}
              {vrpProject && (
                <VrpShowcase
                  project={vrpProject}
                  onOpenLightbox={(media) => setLightboxMedia(media)}
                />
              )}
            </section>

            {/* ================================================================= */}
            {/* SECTION 4: TECHNICAL WRITING & PUBLICATIONS                       */}
            {/* ================================================================= */}
            <section id="writing" className="scroll-mt-32 lg:scroll-mt-24 space-y-6">
              <div className="border-b border-border-subtle pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                    Technical Writing &amp; Publications
                  </h2>
                  <p className="text-secondary text-xs sm:text-sm font-sans mt-1">
                    Mathematical derivations and portfolio replication on Medium.
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-surface-elevated text-secondary border border-border-subtle">
                  {writingMetadata.totalImpressions} Impressions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <WritingCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* ================================================================= */}
            {/* SECTION 5: EXPERIENCE & LEADERSHIP                                */}
            {/* ================================================================= */}
            <section id="experience" className="scroll-mt-32 lg:scroll-mt-24 space-y-8">
              <div className="border-b border-border-subtle pb-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                  Professional Experience &amp; Leadership
                </h2>
                <p className="text-secondary text-xs sm:text-sm font-sans mt-1">
                  Open-source contributions, industry engineering internships, and institutional governance.
                </p>
              </div>

              {/* Professional Experience Stream */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                  Engineering &amp; Industry Experience
                </h3>
                {experience.map((exp) => (
                  <div
                    key={exp.id || exp.role}
                    className="p-6 rounded-2xl bg-surface border border-border-subtle space-y-2 hover:border-border-hover transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-secondary mb-1">
                      <span className="text-primary font-semibold text-base font-serif">
                        {exp.role}
                      </span>
                      <span>{exp.period}</span>
                    </div>
                    <span className="text-xs font-mono text-accent block font-medium">
                      {exp.organization} &middot; {exp.location}
                    </span>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                      {exp.summary || exp.description}
                    </p>
                    <ul className="list-disc list-inside text-xs text-secondary space-y-1 pt-1 font-sans">
                      {exp.highlights.slice(0, 3).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Leadership Stream */}
              <div className="space-y-4 pt-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                  Campus &amp; Community Leadership
                </h3>
                {leadership.map((lead) => (
                  <div
                    key={lead.id || lead.role}
                    className="p-6 rounded-2xl bg-surface border border-border-subtle space-y-2 hover:border-border-hover transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-secondary mb-1">
                      <span className="text-primary font-semibold text-base font-serif">
                        {lead.role}
                      </span>
                      <span>{lead.period}</span>
                    </div>
                    <span className="text-xs font-mono text-accent block font-medium">
                      {lead.organization}
                    </span>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                      {lead.summary || lead.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ================================================================= */}
            {/* SECTION 6: EDUCATION & SKILLS                                     */}
            {/* ================================================================= */}
            <section id="education" className="scroll-mt-32 lg:scroll-mt-24 space-y-6">
              <div className="border-b border-border-subtle pb-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                  Education &amp; Technical Competencies
                </h2>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border-subtle space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-primary">
                      {education.institution}
                    </h3>
                    <p className="text-accent text-sm font-medium mt-0.5">
                      {education.degree} in {education.majors.join(' & ')}
                    </p>
                  </div>
                  <span className="self-start text-xs font-mono px-3 py-1 rounded-full bg-surface-elevated text-secondary border border-border-subtle">
                    Expected {education.expectedGraduation}
                  </span>
                </div>

                {/* Coursework Chips */}
                <div className="space-y-3">
                  <span className="text-xs font-mono text-secondary uppercase tracking-wider block font-medium">
                    Core Academic Coursework
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'COMP 210 (Data Structures)',
                      'COMP 211 (Systems Fundamentals)',
                      'COMP 301 (Programming Foundations)',
                      'COMP 311 (Computer Organization)',
                      'COMP 455 (Models of Languages & Computation)',
                      'MATH 347 (Linear Algebra)',
                      'MATH 233 (Multivariable Calculus)',
                      'MATH 381 (Discrete Mathematics)',
                    ].map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-surface-elevated text-primary border border-border-subtle"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Inventory */}
                {education.skillCategories && (
                  <div className="space-y-3 pt-3 border-t border-border-subtle/50">
                    <span className="text-xs font-mono text-secondary uppercase tracking-wider block font-medium">
                      Technical Competency Matrix
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {education.skillCategories.map((cat) => (
                        <div
                          key={cat.category}
                          className="p-3.5 rounded-xl bg-surface-elevated border border-border-subtle space-y-1.5"
                        >
                          <span className="text-xs font-mono font-semibold text-accent block">
                            {cat.category}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.skills.map((sk) => (
                              <span
                                key={sk}
                                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface text-secondary border border-border-subtle/40"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ================================================================= */}
            {/* SECTION 7: CONTACT                                                */}
            {/* ================================================================= */}
            <section id="contact" className="scroll-mt-32 lg:scroll-mt-24 space-y-6">
              <div className="border-b border-border-subtle pb-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                  Get in Touch
                </h2>
                <p className="text-secondary text-xs sm:text-sm font-sans mt-1">
                  Open for discussion regarding summer software engineering internships, open-source systems, or quantitative research.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border-subtle space-y-4">
                <p className="text-sm text-secondary leading-relaxed font-sans">
                  The fastest way to reach me is directly by email at{' '}
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-accent font-mono font-medium hover:underline"
                  >
                    {profile.email}
                  </a>
                  . You can also explore my open-source repositories on GitHub and professional network on LinkedIn.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-mono font-semibold hover:bg-accent-hover transition-colors min-h-[44px] shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>

                  <a
                    href={profile.resumeUrl}
                    download="Harsha_Matta_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-xs font-mono text-primary transition-colors min-h-[44px]"
                  >
                    <FileText className="w-4 h-4 text-accent" />
                    <span>Download Résumé PDF</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                  </a>

                  <a
                    href={profile.social?.github || 'https://github.com/HarshaMatta'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-xs font-mono text-primary transition-colors min-h-[44px]"
                  >
                    <span>GitHub ↗</span>
                  </a>

                  <a
                    href={profile.social?.linkedin || 'https://linkedin.com/in/harshamatta'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-xs font-mono text-primary transition-colors min-h-[44px]"
                  >
                    <span>LinkedIn ↗</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Footer Colophon */}
            <Footer profile={profile} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioShell />
    </ThemeProvider>
  );
}

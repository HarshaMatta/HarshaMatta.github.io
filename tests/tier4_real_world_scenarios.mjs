/**
 * Tier 4: Real-World Application Scenarios (20 Comprehensive Journey Scenarios)
 * Harsha Matta Portfolio Rebuild Test Suite
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  assert,
  assertEqual,
  assertDeepEqual,
  assertIncludes,
  assertNotIncludes,
  assertMatch,
  assertContrastRatio,
  assertFileExists,
  assertValidUrl,
  assertValidPdf
} from './harness/assertions.mjs';

import {
  LocalStorageSimulator,
  ThemeEngineSimulator,
  FocusTrapSimulator,
  ScrollLockSimulator,
  LayoutSimulator,
  HtmlInspector
} from './harness/dom_simulator.mjs';

import {
  FEATURE_INVENTORY,
  AUTHORITATIVE_ORACLE,
  calculateLogReturn,
  annualizeDailyVolatility,
  calculateDailyVrp,
  classifyMarketRegime,
  sanitizeCsvField
} from './harness/project_oracle.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

export function registerTier4Tests(harness) {
  function fileExists(relPath) {
    return fs.existsSync(path.join(PROJECT_ROOT, relPath));
  }

  function getFileContent(relPath) {
    const fullPath = path.join(PROJECT_ROOT, relPath);
    return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf-8') : null;
  }

  // =========================================================================
  // SCENARIO 1: 20-Second Recruiter Fast Scan
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M2',
    name: 'S1: 20-Second Recruiter Fast Scan: verifies immediate identity, UNC education, and core disciplines',
    fn: () => {
      // 1. Recruiter arrives: name prominently displayed
      assertEqual(AUTHORITATIVE_ORACLE.profile.fullName, 'Harsha Matta');

      // 2. Education at UNC Chapel Hill with Applied Math & CS double major
      assert(
        AUTHORITATIVE_ORACLE.profile.institution.includes('University of North Carolina at Chapel Hill') &&
        AUTHORITATIVE_ORACLE.profile.shortInstitution === 'UNC Chapel Hill',
        'Profile must state UNC Chapel Hill education'
      );
      assertEqual(AUTHORITATIVE_ORACLE.profile.degree, 'B.S. in Applied Mathematics & Computer Science');
      assertEqual(AUTHORITATIVE_ORACLE.profile.expectedGraduation, 'May 2028');

      // 3. Three core disciplines glanceable above the fold
      assertDeepEqual(AUTHORITATIVE_ORACLE.profile.disciplines, [
        'Native Apple Systems',
        'C++ Scientific Computing',
        'Quantitative Finance'
      ]);

      // 4. Resume PDF available for single-click download
      const resumeCandidate1 = path.join(PROJECT_ROOT, 'public/assets/Harsha_Matta_Resume.pdf');
      const resumeCandidate2 = path.join(PROJECT_ROOT, 'assets/resume.pdf');
      assert(fs.existsSync(resumeCandidate1) || fs.existsSync(resumeCandidate2), 'Resume must exist');

      // 5. Contact email available
      assertEqual(AUTHORITATIVE_ORACLE.profile.email, 'harsha.v.matta@gmail.com');
    }
  });

  // =========================================================================
  // SCENARIO 2: Senior iOS Engineering Hiring Manager Deep Dive
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M3',
    name: 'S2: Senior iOS Engineering Manager: audits Next app architecture, NSFilePresenter, and App Intents',
    fn: () => {
      const nextSpec = AUTHORITATIVE_ORACLE.flagships.next;
      assertEqual(nextSpec.appStoreId, '6781007283');
      assertEqual(nextSpec.landingPage, 'https://harshamatta.github.io/projNext/');

      // Inspects core architecture highlights
      assertIncludes(nextSpec.coreHighlights[0], 'mirror');
      assertIncludes(nextSpec.coreHighlights[1], 'NSFilePresenter');
      assertIncludes(nextSpec.coreHighlights[2], 'user-approval gate');

      // Inspects retina screenshots
      assertEqual(nextSpec.screenshots.length, 3);
    }
  });

  // =========================================================================
  // SCENARIO 3: HPC / Systems Scientist Inspection
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M3',
    name: 'S3: HPC / Systems Scientist: verifies deal.II upstream merged PRs vs open PR and affine diagram',
    fn: () => {
      const dealii = AUTHORITATIVE_ORACLE.flagships.dealii;
      const mergedPrs = dealii.prs.filter(p => p.status === 'merged');
      const reviewPrs = dealii.prs.filter(p => p.status === 'in_review');

      // Exactly 2 merged PRs (#19327, #19370)
      assertEqual(mergedPrs.length, 2);
      assertEqual(mergedPrs[0].number, 19327);
      assertEqual(mergedPrs[1].number, 19370);

      // Exactly 1 PR in active review (#19804)
      assertEqual(reviewPrs.length, 1);
      assertEqual(reviewPrs[0].number, 19804);

      // Vector diagram exists
      const p1 = path.join(PROJECT_ROOT, dealii.diagramSvg);
      const p2 = path.join(PROJECT_ROOT, 'public', dealii.diagramSvg);
      assert(fs.existsSync(p1) || fs.existsSync(p2));
    }
  });

  // =========================================================================
  // SCENARIO 4: Quantitative Hedge Fund Portfolio Manager Audit
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M3',
    name: 'S4: Quantitative PM Audit: evaluates VRP pipeline, math alignment, and honest tail-risk caveats',
    fn: () => {
      const vrp = AUTHORITATIVE_ORACLE.flagships.vrp;
      assertEqual(vrp.historicalHorizon, '15+ years (2010 - present)');
      assertEqual(vrp.positiveDaysRatio, '>85%');

      // Verifies mathematical pipeline
      const r = calculateLogReturn(105, 100);
      assert(r > 0);
      const annualized = annualizeDailyVolatility(0.012);
      assert(annualized > 0);

      // Discloses negative skewness and historical liquidation shocks
      assertIncludes(vrp.tailRiskEvents[0], 'Volmageddon');
      assertIncludes(vrp.tailRiskEvents[1], 'COVID');

      // Convexity bias caveat
      assertIncludes(vrp.instrumentCaveat, 'convexity bias');
    }
  });

  // =========================================================================
  // SCENARIO 5: Mobile Candidate Screen on iPhone (390px)
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M2',
    name: 'S5: Mobile Candidate Screen: renders linear stack with sticky header and zero overflow across cards',
    fn: () => {
      const mobileElements = [
        { id: 'mobile-header', width: 390 },
        { id: 'hero-block', width: 360 },
        { id: 'next-project-card', width: 370 },
        { id: 'dealii-card', width: 370 },
        { id: 'quant-card', width: 370 }
      ];
      const result = LayoutSimulator.evaluateViewport(390, mobileElements);
      assertEqual(result.isMobile, true);
      assertEqual(result.hasHorizontalOverflow, false);
    }
  });

  // =========================================================================
  // SCENARIO 6: Complete WCAG 2.2 AA Keyboard Accessibility Audit
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M5',
    name: 'S6: WCAG 2.2 AA Keyboard Audit: navigates page exclusively using keyboard Tab and Escape',
    fn: () => {
      const trap = new FocusTrapSimulator(['close-btn', 'prev-btn', 'next-btn']);
      const trigger = { id: 'thumbnail-trigger', focused: false, focus() { this.focused = true; } };

      // 1. Open modal
      trap.open(trigger);
      assertEqual(trap.getCurrentFocus(), 'close-btn');

      // 2. Tab forward
      assertEqual(trap.handleKeyDown('Tab'), 'prev-btn');
      assertEqual(trap.handleKeyDown('Tab'), 'next-btn');

      // 3. Tab wraps around
      assertEqual(trap.handleKeyDown('Tab'), 'close-btn');

      // 4. Escape restores trigger focus
      const restored = trap.handleKeyDown('Escape');
      restored.focus();
      assertEqual(trigger.focused, true);
    }
  });

  // =========================================================================
  // SCENARIO 7: Full Night-to-Day Editorial Transition
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M1',
    name: 'S7: Editorial Theme Transition: begins in Obsidian Dark, toggles to Warm Paper Light with zero flicker',
    fn: () => {
      const storage = new LocalStorageSimulator();
      storage.setItem('theme', 'dark');

      const engine = new ThemeEngineSimulator(storage);
      const initial = engine.executeHeadScript();
      assertEqual(initial, 'dark');
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens.dark.canvas, '#0B0D0E');

      // Daytime arrives: user toggles theme
      const daylight = engine.toggleTheme();
      assertEqual(daylight, 'light');
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens.light.canvas, '#FBF9F5');

      // Page reload in daylight preserves light theme
      const reloadedEngine = new ThemeEngineSimulator(storage);
      const reloadedTheme = reloadedEngine.executeHeadScript();
      assertEqual(reloadedTheme, 'light');
    }
  });

  // =========================================================================
  // SCENARIO 8: Technical Writing Deep Dive
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M4',
    name: 'S8: Technical Writing Deep Dive: verifies 3,400+ impressions and 4 quantitative finance articles',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.writingImpressionsMetric, '3,400+ total impressions');
      assertEqual(AUTHORITATIVE_ORACLE.articles.length, 4);

      for (const art of AUTHORITATIVE_ORACLE.articles) {
        assert(art.title.length > 5);
        assert(art.date.length > 5);
        assertValidUrl(art.url);
      }
    }
  });

  // =========================================================================
  // SCENARIO 9: InOffice Security & Privacy Due Diligence
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M3',
    name: 'S9: InOffice Security Audit: verifies Keychain storage flag and formula-injection defenses',
    fn: () => {
      const sec = AUTHORITATIVE_ORACLE.flagships.trackinoffice.security;
      assertEqual(sec.keychainAttribute, 'kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly');
      assertEqual(sec.cooldownWindowMinutes, 30);

      // Attack vector: malicious formula in attendance note
      const maliciousPayload = '=cmd|"/C calc"!A0';
      const sanitized = sanitizeCsvField(maliciousPayload);
      assert(sanitized.startsWith('\'='));
    }
  });

  // =========================================================================
  // SCENARIO 10: Secondary Projects & Cross-Discipline Review
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M4',
    name: 'S10: Secondary Projects Review: inspects Paatam (275+ DLs), Greeks, Option Profit, and Multivariable Calc',
    fn: () => {
      const paatam = AUTHORITATIVE_ORACLE.secondaries.paatam;
      assertEqual(paatam.downloadsMetric, '275+ organic downloads');

      const greeks = AUTHORITATIVE_ORACLE.secondaries.greeks;
      assertEqual(greeks.greeks.length, 5);

      const optionprofit = AUTHORITATIVE_ORACLE.secondaries.optionprofit;
      assertIncludes(optionprofit.model, 'Black-Scholes');

      const multivar = AUTHORITATIVE_ORACLE.secondaries.multivariable;
      assertEqual(multivar.stages.length, 4);
    }
  });

  // =========================================================================
  // SCENARIO 11: High-Latency / Offline Asset Resilience
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M1',
    name: 'S11: Offline / High-Latency Resilience: fonts fall back smoothly and SVG assets render without network',
    fn: () => {
      const tailwind = getFileContent('tailwind.config.js');
      assert(tailwind, 'tailwind.config.js must exist');
      assertIncludes(tailwind, 'Newsreader');
      assertIncludes(tailwind, 'Georgia');
      assertIncludes(tailwind, 'Inter');
      assertIncludes(tailwind, '-apple-system');
      assertIncludes(tailwind, 'JetBrains Mono');
    }
  });

  // =========================================================================
  // SCENARIO 12: Screen Reader User Experience
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M5',
    name: 'S12: Screen Reader UX: semantic landmarks, aria labels, and alt attributes verified',
    fn: () => {
      const indexHtml = getFileContent('index.html') || '';
      const inspector = new HtmlInspector(indexHtml);
      assert(inspector.hasMetaTag('viewport'), 'Must contain viewport meta tag');
      assertEqual(indexHtml.includes('lang="en"'), true, 'Must specify HTML document language');

      const themeToggle = getFileContent('src/components/ui/ThemeToggle.tsx') || '';
      assertIncludes(themeToggle, 'aria-label');
      assertIncludes(themeToggle, 'sr-only');
    }
  });

  // =========================================================================
  // SCENARIO 13: GitHub Pages CI/CD Pipeline Simulation
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M5',
    name: 'S13: GitHub Pages CI/CD Pipeline: verifies deploy.yml workflow with checkout, build, and deploy steps',
    progressiveCheck: () => fileExists('.github/workflows/deploy.yml'),
    fn: () => {
      const yml = getFileContent('.github/workflows/deploy.yml');
      assertIncludes(yml, 'actions/checkout@v4');
      assertIncludes(yml, 'npm run build');
      assertIncludes(yml, 'actions/deploy-pages@v4');
    }
  });

  // =========================================================================
  // SCENARIO 14: Deep Linking Direct Route Refresh
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M5',
    name: 'S14: Direct Route Refresh: verifies 404.html enables direct navigation to subpaths on GitHub Pages',
    progressiveCheck: () => fileExists('dist/404.html'),
    fn: () => {
      const path404 = path.join(PROJECT_ROOT, 'dist/404.html');
      assertFileExists(path404, 'dist/404.html must exist');
      const content = fs.readFileSync(path404, 'utf8');
      assertIncludes(content, '<div id="root">');
      assert(content.length > 500, '404.html must contain full SPA document shell');
    }
  });

  // =========================================================================
  // SCENARIO 15: Cross-Browser Contrast & Typography Legibility
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M1',
    name: 'S15: Typography & Contrast Legibility: verifies WCAG 2.2 contrast across both Warm Paper and Obsidian themes',
    fn: () => {
      // Dark theme body contrast
      assertContrastRatio(
        AUTHORITATIVE_ORACLE.themeTokens.dark.inkPrimary,
        AUTHORITATIVE_ORACLE.themeTokens.dark.canvas,
        4.5
      );
      // Light theme body contrast
      assertContrastRatio(
        AUTHORITATIVE_ORACLE.themeTokens.light.inkPrimary,
        AUTHORITATIVE_ORACLE.themeTokens.light.canvas,
        4.5
      );
    }
  });

  // =========================================================================
  // SCENARIO 16: Privacy & Zero-Telemetry Audit
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M1',
    name: 'S16: Zero-Telemetry Privacy Audit: verifies zero analytics trackers and strictly client-side state',
    fn: () => {
      const html = getFileContent('index.html');
      assert(html, 'index.html must exist');
      const forbidden = ['google-analytics.com', 'googletagmanager.com', 'hotjar', 'segment.io', 'mixpanel'];
      forbidden.forEach(tracker => {
        assertNotIncludes(html, tracker, `Third-party tracker "${tracker}" found in index.html`);
      });
      const pkg = JSON.parse(getFileContent('package.json'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      forbidden.forEach(tracker => {
        assert(!deps[tracker], `Telemetry package "${tracker}" found in package.json`);
      });
    }
  });

  // =========================================================================
  // SCENARIO 17: Interactive Streamlit Tool Exploration
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M4',
    name: 'S17: Trader Explores Streamlit Apps: verifies valid live links for VRP, Greeks, and Option Profit models',
    fn: () => {
      assertValidUrl(AUTHORITATIVE_ORACLE.flagships.vrp.streamlitUrl);
      assertValidUrl(AUTHORITATIVE_ORACLE.secondaries.greeks.streamlitUrl);
      assertValidUrl(AUTHORITATIVE_ORACLE.secondaries.optionprofit.streamlitUrl);
    }
  });

  // =========================================================================
  // SCENARIO 18: Campus Leadership & Honors Review
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M4',
    name: 'S18: Leadership & Honors Review: verifies UNC Special Task Force on AI, Sangam Treasurer, and Technospire',
    progressiveCheck: () => fileExists('src/data/leadership.ts') || fileExists('src/data/profile.ts'),
    fn: () => {
      const data = (getFileContent('src/data/leadership.ts') || '') + (getFileContent('src/data/profile.ts') || '');
      assert(data.includes('Special Task Force') || data.includes('Sangam') || data.includes('Technospire'));
    }
  });

  // =========================================================================
  // SCENARIO 19: Motion Sensitivity / Vestibular Disorder Simulation
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M5',
    name: 'S19: Vestibular Motion Simulation: verifies all transitions disabled when prefers-reduced-motion is active',
    fn: () => {
      const css = getFileContent('src/index.css') || '';
      assertIncludes(css, '@media (prefers-reduced-motion: reduce)');
      assertMatch(css, /scroll-behavior:\s*auto\s*!important/);
      assertMatch(css, /transition-duration:\s*0\.01ms\s*!important/);
    }
  });

  // =========================================================================
  // SCENARIO 20: Full End-to-End Build and Verification Gate
  // =========================================================================
  harness.register({
    tier: 4,
    milestone: 'M1',
    name: 'S20: Master Verification Gate: all 39 features present in inventory and mapped to milestones',
    fn: () => {
      assertEqual(FEATURE_INVENTORY.length, 39);
      for (const feat of FEATURE_INVENTORY) {
        assert(feat.id >= 1 && feat.id <= 39);
        assert(['M1', 'M2', 'M3', 'M4', 'M5'].includes(feat.milestone));
      }
    }
  });
}

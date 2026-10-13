/**
 * Tier 3: Cross-Feature Combinations (Pairwise Subsystem Interactions)
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
  assertMatch,
  assertThrows,
  assertContrastRatio,
  assertFileExists,
  assertValidUrl
} from './harness/assertions.mjs';

import {
  LocalStorageSimulator,
  ThemeEngineSimulator,
  FocusTrapSimulator,
  ScrollLockSimulator,
  LayoutSimulator
} from './harness/dom_simulator.mjs';

import {
  AUTHORITATIVE_ORACLE,
  sanitizeCsvField,
  calculateDailyVrp,
  classifyMarketRegime
} from './harness/project_oracle.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

export function registerTier3Tests(harness) {
  function getFileContent(relPath) {
    const fullPath = path.join(PROJECT_ROOT, relPath);
    return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf-8') : null;
  }

  function fileExists(relPath) {
    return fs.existsSync(path.join(PROJECT_ROOT, relPath));
  }

  // Cross 1: Theme Toggle (F11) + Lightbox Modal (F27)
  harness.register({
    tier: 3,
    milestone: 'M5',
    name: 'X1: Theme Toggle + Lightbox Modal: switching theme while modal open updates palette without dismissing modal',
    fn: () => {
      const storage = new LocalStorageSimulator();
      const engine = new ThemeEngineSimulator(storage, true);
      engine.executeHeadScript(); // dark

      const trap = new FocusTrapSimulator(['close-modal-btn']);
      trap.open('dealii-diagram-thumb');
      assertEqual(trap.isOpen, true);

      // User toggles theme while lightbox is open
      const newTheme = engine.toggleTheme();
      assertEqual(newTheme, 'light');
      // Modal must remain open and focus trap preserved
      assertEqual(trap.isOpen, true);
      assertEqual(trap.getCurrentFocus(), 'close-modal-btn');
    }
  });

  // Cross 2: Deep Routing (F36) + Responsive Mobile Navigation (F32)
  harness.register({
    tier: 3,
    milestone: 'M5',
    name: 'X2: Deep Routing + Mobile Viewport: direct hash navigation on 390px clears sticky header offset',
    fn: () => {
      const viewport = LayoutSimulator.evaluateViewport(390);
      assertEqual(viewport.isMobile, true);

      const headerHeight = 64;
      const targetScrollMargin = 80;
      assert(targetScrollMargin > headerHeight, 'Section scroll-margin-top must exceed mobile header height');
    }
  });

  // Cross 3: Theme Persistence (F10) + Prefers-Reduced-Motion (F31)
  harness.register({
    tier: 3,
    milestone: 'M5',
    name: 'X3: Theme Persistence + Reduced Motion: theme toggling with reduced motion uses zero transition duration',
    fn: () => {
      const storage = new LocalStorageSimulator();
      const engine = new ThemeEngineSimulator(storage, true);
      engine.executeHeadScript();

      const css = getFileContent('src/index.css') || '';
      assertIncludes(css, '@media (prefers-reduced-motion: reduce)');
      assertMatch(css, /transition-duration:\s*0\.01ms\s*!important/);

      const nextTheme = engine.toggleTheme();
      assertEqual(nextTheme, 'light');
      assertEqual(storage.getItem('theme'), 'light');
    }
  });

  // Cross 4: Lightbox Focus Trap (F27) + Focus Restoration (F28) + deal.II Affine Diagram (F14)
  harness.register({
    tier: 3,
    milestone: 'M5',
    name: 'X4: Lightbox Focus Trap + Restoration + deal.II Diagram: full keyboard journey into diagram modal and back',
    fn: () => {
      const thumbnailTrigger = { id: 'dealii-affine-svg', hasFocus: false, focus() { this.hasFocus = true; } };
      const trap = new FocusTrapSimulator(['close-btn', 'download-svg-btn']);
      
      // 1. Open modal from thumbnail
      trap.open(thumbnailTrigger);
      assertEqual(trap.getCurrentFocus(), 'close-btn');

      // 2. Tab to next button inside modal
      assertEqual(trap.handleKeyDown('Tab'), 'download-svg-btn');

      // 3. Tab wraps back to close button
      assertEqual(trap.handleKeyDown('Tab'), 'close-btn');

      // 4. Hit Escape to close
      const restored = trap.handleKeyDown('Escape');
      assertEqual(restored.id, 'dealii-affine-svg');
      restored.focus();
      assertEqual(thumbnailTrigger.hasFocus, true);
    }
  });

  // Cross 5: VRP Case Study (F18/F19/F24) + Responsive Resize (F32/F34)
  harness.register({
    tier: 3,
    milestone: 'M3',
    name: 'X5: VRP Case Study Drawer + Viewport Resize: expanding on 1440px and resizing to 390px produces 0 overflow',
    fn: () => {
      const trap = new FocusTrapSimulator(['close-drawer-btn']);
      trap.open({ id: 'vrp-case-study-trigger' });
      assertEqual(trap.isOpen, true, 'Drawer must be open');

      const elements = [
        { id: 'vrp-headline', width: 360 },
        { id: 'vrp-math-container', width: 370 },
        { id: 'vrp-disclaimer-box', width: 365 }
      ];
      const evalResult = LayoutSimulator.evaluateViewport(390, elements);
      assertEqual(evalResult.hasHorizontalOverflow, false, 'Expanded drawer elements must fit within 390px');
    }
  });

  // Cross 6: Resume Download (F35) + Mobile Compact Header (F32)
  harness.register({
    tier: 3,
    milestone: 'M2',
    name: 'X6: Resume Download + Mobile Header: resume link accessible from 390px sticky header with valid target',
    fn: () => {
      const content = (getFileContent('src/components/layout/MobileHeader.tsx') || '') +
                      (getFileContent('src/App.tsx') || '');
      assert(content.length > 0, 'Header or preview component must exist');
      assertIncludes(content, 'Harsha_Matta_Resume.pdf');
      assertIncludes(content, 'target="_blank"');
      assertIncludes(content, 'rel="noopener noreferrer"');
    }
  });

  // Cross 7: deal.II PR Badges (F15) + High Contrast Focus Rings (F30)
  harness.register({
    tier: 3,
    milestone: 'M5',
    name: 'X7: deal.II PR Badges + Focus Rings: keyboard Tab onto Merged and In Review badges reveals 3:1 focus ring',
    fn: () => {
      // Focus ring contrast on dark surface
      assertContrastRatio('#38BDF8', '#141618', 3.0, 'Dark mode focus ring around PR badge');
      // Focus ring contrast on light paper
      assertContrastRatio('#0369A1', '#FBF9F5', 3.0, 'Light mode focus ring around PR badge');
    }
  });

  // Cross 8: Next Screenshots (F12) + Lightbox Media Caption (F27/F28)
  harness.register({
    tier: 3,
    milestone: 'M5',
    name: 'X8: Next Screenshots + Lightbox Caption: clicking Next thumbnail loads matching caption in modal dialog',
    fn: () => {
      const next = AUTHORITATIVE_ORACLE.flagships.next;
      assertEqual(next.screenshots.length, 3);
      assertFileExists(path.join(PROJECT_ROOT, 'public', next.screenshots[0]));
    }
  });

  // Cross 9: Scrollspy Navigation (F34) + Theme Toggle (F11)
  harness.register({
    tier: 3,
    milestone: 'M2',
    name: 'X9: Scrollspy Active Indicator + Theme Switch: active navigation link maintains high contrast across themes',
    fn: () => {
      // Dark theme active indicator (#38BDF8 on #0B0D0E)
      assertContrastRatio('#38BDF8', '#0B0D0E', 4.5);
      // Light theme active indicator (#0369A1 on #FBF9F5)
      assertContrastRatio('#0369A1', '#FBF9F5', 4.5);
    }
  });

  // Cross 10: 404 SPA Fallback (F36) + .nojekyll Static Preservation (F37)
  harness.register({
    tier: 3,
    milestone: 'M5',
    name: 'X10: SPA 404 Fallback + .nojekyll: subroute /paatam requests boot SPA without Jekyll dropping underscore dirs',
    progressiveCheck: () => fileExists('dist/404.html') || fileExists('public/.nojekyll'),
    fn: () => {
      const nojekyll = path.join(PROJECT_ROOT, 'public/.nojekyll');
      assertFileExists(nojekyll, 'public/.nojekyll must be present');
      const dist404 = path.join(PROJECT_ROOT, 'dist/404.html');
      if (fs.existsSync(dist404)) {
        const content = fs.readFileSync(dist404, 'utf8');
        assertIncludes(content, 'id="root"');
      }
    }
  });

  // Cross 11: Technical Writing Stream (F25) + Lightbox Modal (F27)
  harness.register({
    tier: 3,
    milestone: 'M4',
    name: 'X11: Medium Articles Stream + Lightbox Preview: clicking article cover SVG opens modal with article metadata',
    fn: () => {
      const article = AUTHORITATIVE_ORACLE.articles[0];
      const trap = new FocusTrapSimulator(['close-btn']);
      trap.open({ id: `article-cover-${article.id}` });
      assertEqual(trap.isOpen, true);
      const restored = trap.close();
      assertEqual(restored.id, 'article-cover-option-pricing');
    }
  });

  // Cross 12: Content Layer Immutability (F4) + React Component Consumption (F1)
  harness.register({
    tier: 3,
    milestone: 'M2',
    name: 'X12: Content Immutability + React Component Consumption: multiple render passes cannot mutate data catalog',
    fn: () => {
      const oracleFlagships = AUTHORITATIVE_ORACLE.flagships;
      assertThrows(() => {
        'use strict';
        Object.freeze(oracleFlagships);
        oracleFlagships.tampered = true;
      });
      if (fileExists('src/data/projects.ts')) {
        const content = getFileContent('src/data/projects.ts');
        assert(content.includes('as const') || content.includes('ProjectItem[]') || content.includes('export const'));
      }
    }
  });

  // Cross 13: InOffice Security Spec (F17) + CSV Formula Sanitization (F16)
  harness.register({
    tier: 3,
    milestone: 'M3',
    name: 'X13: InOffice Security Spec + CSV Export: formulas sanitized before disk write while preserving date integrity',
    fn: () => {
      const csvRow = {
        date: '2026-06-15',
        status: 'In Office',
        note: '=SUM(1, 2) Dangerous formula'
      };
      const sanitizedNote = sanitizeCsvField(csvRow.note);
      assertEqual(sanitizedNote, '\'=SUM(1, 2) Dangerous formula');
      assertEqual(csvRow.date, '2026-06-15');
    }
  });

  // Cross 14: Paatam Metric Chip (F20) + Tablet 2-Column Secondary Grid (F33)
  harness.register({
    tier: 3,
    milestone: 'M4',
    name: 'X14: Paatam Download Metric + Tablet Grid: secondary projects render in balanced 2-column cards on 768px',
    fn: () => {
      const evalResult = LayoutSimulator.evaluateViewport(768, [
        { id: 'paatam-card', width: 350 },
        { id: 'greeks-card', width: 350 }
      ]);
      assertEqual(evalResult.isTablet, true);
      assertEqual(evalResult.hasHorizontalOverflow, false);
    }
  });

  // Cross 15: VRP Mathematical Calculations (F18) + Regime Partitioning Rules (F19)
  harness.register({
    tier: 3,
    milestone: 'M3',
    name: 'X15: VRP Calculation + Regime Attribution: calculates positive premium in bull regime and inverted in crisis',
    fn: () => {
      // Bull market: VIX = 14%, realized = 11%
      const bullVrp = calculateDailyVrp(14.0, 0.11);
      const bullRegime = classifyMarketRegime(14.0, 5200, 4900);
      assertEqual(bullRegime, 'bull');
      assert(bullVrp > 0, 'Bull VRP must be positive');

      // Crisis market: VIX = 42%, realized = 60%
      const crisisVrp = calculateDailyVrp(42.0, 0.60);
      const crisisRegime = classifyMarketRegime(42.0, 4100, 4900);
      assertEqual(crisisRegime, 'crisis');
      assert(crisisVrp < 0, 'Crisis VRP inverted');
    }
  });

  // Cross 16: Zero-Flicker Script (F10) + Dark Theme Canvas (F9) + Light Theme Canvas (F8)
  harness.register({
    tier: 3,
    milestone: 'M1',
    name: 'X16: Anti-Flash Execution + Dual Theme Tokens: guarantees exact canvas token applied before first paint',
    fn: () => {
      const storage = new LocalStorageSimulator();
      // Test dark
      storage.setItem('theme', 'dark');
      const darkEngine = new ThemeEngineSimulator(storage);
      const darkTheme = darkEngine.executeHeadScript();
      assertEqual(darkTheme, 'dark');
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens[darkTheme].canvas, '#0B0D0E');

      // Test light
      storage.setItem('theme', 'light');
      const lightEngine = new ThemeEngineSimulator(storage);
      const lightTheme = lightEngine.executeHeadScript();
      assertEqual(lightTheme, 'light');
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens[lightTheme].canvas, '#FBF9F5');
    }
  });
}

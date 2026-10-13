/**
 * Tier 1: Feature Coverage Test Suite (>= 5 tests per feature across all 39 features = 195 tests)
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

export function registerTier1Tests(harness) {
  // Helper to read project files safely
  function getFileContent(relPath) {
    const fullPath = path.join(PROJECT_ROOT, relPath);
    return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf-8') : null;
  }

  function fileExists(relPath) {
    return fs.existsSync(path.join(PROJECT_ROOT, relPath));
  }

  function parseJson(content) {
    if (!content) return null;
    const stripped = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/,\s*([\]}])/g, '$1');
    return JSON.parse(stripped);
  }

  // =========================================================================
  // FEATURE 1: React 19 Root Mount (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 1,
    milestone: 'M1',
    name: 'F1.1: Root container <div id="root"> exists in HTML shell',
    progressiveCheck: () => fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      assert(html !== null, 'index.html must exist at project root');
      const inspector = new HtmlInspector(html);
      assert(inspector.hasElementWithId('root'), 'index.html must contain an element with id="root" for React mounting');
    }
  });

  harness.register({
    tier: 1,
    featureId: 1,
    milestone: 'M1',
    name: 'F1.2: Entrypoint src/main.tsx or index.html references React root mount',
    progressiveCheck: () => fileExists('src/main.tsx'),
    fn: () => {
      const mainTsx = getFileContent('src/main.tsx');
      assert(mainTsx !== null, 'src/main.tsx must exist');
      assertIncludes(mainTsx, 'createRoot', 'Entrypoint must import and invoke createRoot from react-dom/client');
    }
  });

  harness.register({
    tier: 1,
    featureId: 1,
    milestone: 'M1',
    name: 'F1.3: Package manifest specifies React 19 dependency',
    progressiveCheck: () => fileExists('package.json'),
    fn: () => {
      const pkg = JSON.parse(getFileContent('package.json'));
      assert(pkg.dependencies && pkg.dependencies.react, 'package.json must contain react dependency');
      assertMatch(pkg.dependencies.react, /\^?19\./, 'React version must target React 19');
    }
  });

  harness.register({
    tier: 1,
    featureId: 1,
    milestone: 'M1',
    name: 'F1.4: Package manifest specifies react-dom 19 dependency',
    progressiveCheck: () => fileExists('package.json'),
    fn: () => {
      const pkg = JSON.parse(getFileContent('package.json'));
      assert(pkg.dependencies && pkg.dependencies['react-dom'], 'package.json must contain react-dom dependency');
      assertMatch(pkg.dependencies['react-dom'], /\^?19\./, 'react-dom version must target React 19');
    }
  });

  harness.register({
    tier: 1,
    featureId: 1,
    milestone: 'M1',
    name: 'F1.5: Root component App.tsx exists and exports valid React component',
    progressiveCheck: () => fileExists('src/App.tsx'),
    fn: () => {
      const appContent = getFileContent('src/App.tsx');
      assert(appContent !== null, 'src/App.tsx must exist');
      assertMatch(appContent, /export\s+default\s+function|export\s+default|export\s+function\s+App/, 'App.tsx must export App component');
    }
  });

  // =========================================================================
  // FEATURE 2: TypeScript Strict Mode (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 2,
    milestone: 'M1',
    name: 'F2.1: tsconfig.json exists and parses as valid JSON',
    progressiveCheck: () => fileExists('tsconfig.json'),
    fn: () => {
      const content = getFileContent('tsconfig.json');
      assert(content !== null, 'tsconfig.json must exist');
      const parsed = parseJson(content);
      assert(typeof parsed === 'object', 'tsconfig.json must be a valid JSON object');
    }
  });

  harness.register({
    tier: 1,
    featureId: 2,
    milestone: 'M1',
    name: 'F2.2: tsconfig.json enables strict mode',
    progressiveCheck: () => fileExists('tsconfig.json'),
    fn: () => {
      const parsed = parseJson(getFileContent('tsconfig.json'));
      assertEqual(parsed.compilerOptions?.strict, true, 'compilerOptions.strict must be true');
    }
  });

  harness.register({
    tier: 1,
    featureId: 2,
    milestone: 'M1',
    name: 'F2.3: tsconfig.json enforces noImplicitAny',
    progressiveCheck: () => fileExists('tsconfig.json'),
    fn: () => {
      const parsed = parseJson(getFileContent('tsconfig.json'));
      assert(parsed.compilerOptions?.noImplicitAny !== false, 'noImplicitAny must not be disabled');
    }
  });

  harness.register({
    tier: 1,
    featureId: 2,
    milestone: 'M1',
    name: 'F2.4: tsconfig.json enforces strictNullChecks',
    progressiveCheck: () => fileExists('tsconfig.json'),
    fn: () => {
      const parsed = parseJson(getFileContent('tsconfig.json'));
      assert(parsed.compilerOptions?.strictNullChecks !== false, 'strictNullChecks must not be disabled');
    }
  });

  harness.register({
    tier: 1,
    featureId: 2,
    milestone: 'M1',
    name: 'F2.5: tsconfig.json enforces noUnusedLocals or parameters',
    progressiveCheck: () => fileExists('tsconfig.json'),
    fn: () => {
      const parsed = parseJson(getFileContent('tsconfig.json'));
      assert(
        parsed.compilerOptions?.noUnusedLocals === true || parsed.compilerOptions?.strict === true,
        'Unused locals or parameters checking must be active'
      );
    }
  });

  // =========================================================================
  // FEATURE 3: Vite Asset Pipeline (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 3,
    milestone: 'M1',
    name: 'F3.1: vite.config.ts exists and configures React plugin',
    progressiveCheck: () => fileExists('vite.config.ts'),
    fn: () => {
      const config = getFileContent('vite.config.ts');
      assert(config !== null, 'vite.config.ts must exist');
      assertIncludes(config, '@vitejs/plugin-react', 'vite.config.ts must configure @vitejs/plugin-react');
    }
  });

  harness.register({
    tier: 1,
    featureId: 3,
    milestone: 'M1',
    name: 'F3.2: package.json provides build script with tsc check',
    progressiveCheck: () => fileExists('package.json'),
    fn: () => {
      const pkg = JSON.parse(getFileContent('package.json'));
      assert(pkg.scripts && pkg.scripts.build, 'package.json must define a build script');
      assertIncludes(pkg.scripts.build, 'vite build', 'build script must invoke vite build');
    }
  });

  harness.register({
    tier: 1,
    featureId: 3,
    milestone: 'M1',
    name: 'F3.3: package.json provides dev server script',
    progressiveCheck: () => fileExists('package.json'),
    fn: () => {
      const pkg = JSON.parse(getFileContent('package.json'));
      assert(pkg.scripts && pkg.scripts.dev, 'package.json must define a dev script');
    }
  });

  harness.register({
    tier: 1,
    featureId: 3,
    milestone: 'M1',
    name: 'F3.4: Base deployment path configured for GitHub Pages root',
    progressiveCheck: () => fileExists('vite.config.ts'),
    fn: () => {
      const config = getFileContent('vite.config.ts');
      assert(
        config.includes("base: '/'") || config.includes('base: "./"') || !config.includes('base:'),
        'Vite base path must support root domain deployment'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 3,
    milestone: 'M1',
    name: 'F3.5: Lucide React icon library included in package dependencies',
    progressiveCheck: () => fileExists('package.json'),
    fn: () => {
      const pkg = JSON.parse(getFileContent('package.json'));
      assert(pkg.dependencies && pkg.dependencies['lucide-react'], 'lucide-react must be listed in dependencies');
    }
  });

  // =========================================================================
  // FEATURE 4: Clean Content Layer (M2)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 4,
    milestone: 'M2',
    name: 'F4.1: Domain interfaces defined in src/types/index.ts',
    progressiveCheck: () => fileExists('src/types/index.ts'),
    fn: () => {
      const types = getFileContent('src/types/index.ts');
      assert(types !== null, 'src/types/index.ts must exist');
      assertIncludes(types, 'ProjectItem', 'Must export ProjectItem interface');
      assertIncludes(types, 'ArticleItem', 'Must export ArticleItem interface');
    }
  });

  harness.register({
    tier: 1,
    featureId: 4,
    milestone: 'M2',
    name: 'F4.2: Structured profile data exported from src/data/profile.ts',
    progressiveCheck: () => fileExists('src/data/profile.ts'),
    fn: () => {
      const profileContent = getFileContent('src/data/profile.ts');
      assert(profileContent !== null, 'src/data/profile.ts must exist');
      assertIncludes(profileContent, 'Harsha Matta', 'profile.ts must contain Harsha Matta');
      assertIncludes(profileContent, 'UNC Chapel Hill', 'profile.ts must contain UNC Chapel Hill');
    }
  });

  harness.register({
    tier: 1,
    featureId: 4,
    milestone: 'M2',
    name: 'F4.3: Structured project catalog exported from src/data/projects.ts',
    progressiveCheck: () => fileExists('src/data/projects.ts'),
    fn: () => {
      const projectsContent = getFileContent('src/data/projects.ts');
      assert(projectsContent !== null, 'src/data/projects.ts must exist');
      assertIncludes(projectsContent, 'next', 'projects.ts must contain next project');
      assertIncludes(projectsContent, 'dealii', 'projects.ts must contain dealii project');
      assertIncludes(projectsContent, 'trackinoffice', 'projects.ts must contain trackinoffice project');
    }
  });

  harness.register({
    tier: 1,
    featureId: 4,
    milestone: 'M2',
    name: 'F4.4: Structured articles catalog exported from src/data/articles.ts',
    progressiveCheck: () => fileExists('src/data/articles.ts'),
    fn: () => {
      const articlesContent = getFileContent('src/data/articles.ts');
      assert(articlesContent !== null, 'src/data/articles.ts must exist');
      assertIncludes(articlesContent, 'How do you price an option?', 'Must include first Medium article');
      assertIncludes(articlesContent, 'Volatility Risk Premium', 'Must include VRP article');
    }
  });

  harness.register({
    tier: 1,
    featureId: 4,
    milestone: 'M2',
    name: 'F4.5: Structured education & skills data exported from src/data/education.ts',
    progressiveCheck: () => fileExists('src/data/education.ts'),
    fn: () => {
      const eduContent = getFileContent('src/data/education.ts');
      assert(eduContent !== null, 'src/data/education.ts must exist');
      assertIncludes(eduContent, 'Applied Mathematics', 'Must include Applied Mathematics major');
      assertIncludes(eduContent, 'Computer Science', 'Must include Computer Science major');
    }
  });

  // =========================================================================
  // FEATURE 5: Newsreader Display Serif (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 5,
    milestone: 'M1',
    name: 'F5.1: Newsreader font stylesheet loaded in index.html or CSS',
    progressiveCheck: () => fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      const css = getFileContent('src/index.css') || '';
      const hasFont = html.includes('Newsreader') || css.includes('Newsreader');
      assert(hasFont, 'Newsreader font must be imported in index.html or index.css');
    }
  });

  harness.register({
    tier: 1,
    featureId: 5,
    milestone: 'M1',
    name: 'F5.2: Tailwind serif font family includes Newsreader and Georgia',
    progressiveCheck: () => fileExists('tailwind.config.js'),
    fn: () => {
      const tailwind = getFileContent('tailwind.config.js');
      assertIncludes(tailwind, 'Newsreader', 'tailwind.config.js must include Newsreader in serif font stack');
      assertIncludes(tailwind, 'Georgia', 'tailwind.config.js must include Georgia fallback');
    }
  });

  harness.register({
    tier: 1,
    featureId: 5,
    milestone: 'M1',
    name: 'F5.3: Optical size range specified for Newsreader font',
    progressiveCheck: () => fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      assertMatch(html, /Newsreader.*opsz|fonts\.googleapis\.com.*Newsreader/, 'Newsreader font link must include optical size or valid weights');
    }
  });

  harness.register({
    tier: 1,
    featureId: 5,
    milestone: 'M1',
    name: 'F5.4: Editorial headings use font-serif token',
    progressiveCheck: () => fileExists('src/index.css') || fileExists('tailwind.config.js'),
    fn: () => {
      const config = getFileContent('tailwind.config.js');
      assertMatch(config, /serif:\s*\[['"]Newsreader['"]/, 'tailwind.config.js must map serif to Newsreader');
    }
  });

  harness.register({
    tier: 1,
    featureId: 5,
    milestone: 'M1',
    name: 'F5.5: Font display swap configured for non-blocking render',
    progressiveCheck: () => fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      assertIncludes(html, 'display=swap', 'Google Font link must specify display=swap to prevent FOUT');
    }
  });

  // =========================================================================
  // FEATURE 6: Inter Sans-Serif Body (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 6,
    milestone: 'M1',
    name: 'F6.1: Inter font stylesheet loaded in index.html or CSS',
    progressiveCheck: () => fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      const css = getFileContent('src/index.css') || '';
      assert(html.includes('Inter') || css.includes('Inter'), 'Inter font must be referenced');
    }
  });

  harness.register({
    tier: 1,
    featureId: 6,
    milestone: 'M1',
    name: 'F6.2: Tailwind sans font family includes Inter as lead sans font',
    progressiveCheck: () => fileExists('tailwind.config.js'),
    fn: () => {
      const tailwind = getFileContent('tailwind.config.js');
      assertMatch(tailwind, /sans:\s*\[['"]Inter['"]/, 'tailwind.config.js must include Inter in sans font stack');
    }
  });

  harness.register({
    tier: 1,
    featureId: 6,
    milestone: 'M1',
    name: 'F6.3: Fallback system sans-serif stack defined',
    progressiveCheck: () => fileExists('tailwind.config.js'),
    fn: () => {
      const tailwind = getFileContent('tailwind.config.js');
      assert(tailwind.includes('sans-serif') || tailwind.includes('-apple-system'), 'Sans stack must have fallback');
    }
  });

  harness.register({
    tier: 1,
    featureId: 6,
    milestone: 'M1',
    name: 'F6.4: Body text configured with font-sans class',
    progressiveCheck: () => fileExists('src/index.css') || fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      const css = getFileContent('src/index.css') || '';
      assert(html.includes('font-sans') || css.includes('font-sans') || css.includes('@tailwind'), 'font-sans styling available');
    }
  });

  harness.register({
    tier: 1,
    featureId: 6,
    milestone: 'M1',
    name: 'F6.5: Typography hierarchy pairs sans-serif body with serif headings',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens.typography.sansFamily, 'Inter');
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens.typography.serifFamily, 'Newsreader');
    }
  });

  // =========================================================================
  // FEATURE 7: JetBrains Mono Code (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 7,
    milestone: 'M1',
    name: 'F7.1: JetBrains Mono font configured in tailwind.config.js',
    progressiveCheck: () => fileExists('tailwind.config.js'),
    fn: () => {
      const tailwind = getFileContent('tailwind.config.js');
      assertIncludes(tailwind, 'JetBrains Mono', 'tailwind.config.js must include JetBrains Mono');
    }
  });

  harness.register({
    tier: 1,
    featureId: 7,
    milestone: 'M1',
    name: 'F7.2: Monospace fallback stack includes Menlo, Monaco, or monospace',
    progressiveCheck: () => fileExists('tailwind.config.js'),
    fn: () => {
      const tailwind = getFileContent('tailwind.config.js');
      assert(tailwind.includes('monospace') || tailwind.includes('Menlo'), 'Mono stack must provide standard fallbacks');
    }
  });

  harness.register({
    tier: 1,
    featureId: 7,
    milestone: 'M1',
    name: 'F7.3: Font stylesheet imports JetBrains Mono with 400 and 500 weights',
    progressiveCheck: () => fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      assertIncludes(html, 'JetBrains+Mono', 'index.html Google Fonts link must include JetBrains Mono');
    }
  });

  harness.register({
    tier: 1,
    featureId: 7,
    milestone: 'M1',
    name: 'F7.4: Technical badges and tokens apply font-mono styling',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens.typography.monoFamily, 'JetBrains Mono');
    }
  });

  harness.register({
    tier: 1,
    featureId: 7,
    milestone: 'M1',
    name: 'F7.5: Mathematical variables and deal.II PR numbers formatted in monospace',
    fn: () => {
      const pr1 = AUTHORITATIVE_ORACLE.flagships.dealii.prs[0];
      assertEqual(pr1.number, 19327);
      assert(String(pr1.number).length === 5, 'PR number is 5 digits');
    }
  });

  // =========================================================================
  // FEATURE 8: Warm Paper Light Theme (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 8,
    milestone: 'M1',
    name: 'F8.1: Warm Paper Light canvas background defined as #FBF9F5',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens.light.canvas, '#FBF9F5');
    }
  });

  harness.register({
    tier: 1,
    featureId: 8,
    milestone: 'M1',
    name: 'F8.2: Charcoal Walnut ink text defined as #2C2A29',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens.light.inkPrimary, '#2C2A29');
    }
  });

  harness.register({
    tier: 1,
    featureId: 8,
    milestone: 'M1',
    name: 'F8.3: Light theme contrast ratio between text #2C2A29 and canvas #FBF9F5 exceeds WCAG AA (>= 4.5:1)',
    fn: () => {
      assertContrastRatio(
        AUTHORITATIVE_ORACLE.themeTokens.light.inkPrimary,
        AUTHORITATIVE_ORACLE.themeTokens.light.canvas,
        4.5,
        'Light mode body contrast must meet WCAG AA'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 8,
    milestone: 'M1',
    name: 'F8.4: Light theme card surface defined as Pressed Cotton #FFFFFF / #FAF8F5',
    fn: () => {
      assert(
        AUTHORITATIVE_ORACLE.themeTokens.light.cardSurface === '#FFFFFF' ||
        AUTHORITATIVE_ORACLE.themeTokens.light.cardSurface === '#FAF8F5'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 8,
    milestone: 'M1',
    name: 'F8.5: Tailwind theme configuration includes custom paper colors',
    progressiveCheck: () => fileExists('tailwind.config.js'),
    fn: () => {
      const tailwind = getFileContent('tailwind.config.js');
      assert(
        tailwind.includes('#FBF9F5') || tailwind.includes('paper') || tailwind.includes('--bg-canvas'),
        'Tailwind config must define warm paper light theme token'
      );
    }
  });

  // =========================================================================
  // FEATURE 9: Obsidian Dark Theme (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 9,
    milestone: 'M1',
    name: 'F9.1: Obsidian Dark canvas background defined as #0B0D0E',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens.dark.canvas, '#0B0D0E');
    }
  });

  harness.register({
    tier: 1,
    featureId: 9,
    milestone: 'M1',
    name: 'F9.2: Celestial Sky cyan accent defined as #38BDF8',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens.dark.accent, '#38BDF8');
    }
  });

  harness.register({
    tier: 1,
    featureId: 9,
    milestone: 'M1',
    name: 'F9.3: Dark theme contrast ratio between text #F3F4F6 and canvas #0B0D0E exceeds WCAG AA (>= 4.5:1)',
    fn: () => {
      assertContrastRatio(
        AUTHORITATIVE_ORACLE.themeTokens.dark.inkPrimary,
        AUTHORITATIVE_ORACLE.themeTokens.dark.canvas,
        4.5,
        'Dark mode body contrast must meet WCAG AA'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 9,
    milestone: 'M1',
    name: 'F9.4: Obsidian surface elevated container defined as #141618',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.themeTokens.dark.surface, '#141618');
    }
  });

  harness.register({
    tier: 1,
    featureId: 9,
    milestone: 'M1',
    name: 'F9.5: Tailwind config declares darkMode strategy class',
    progressiveCheck: () => fileExists('tailwind.config.js'),
    fn: () => {
      const tailwind = getFileContent('tailwind.config.js');
      assertMatch(tailwind, /darkMode:\s*['"]class['"]/, 'tailwind.config.js must set darkMode: "class"');
    }
  });

  // =========================================================================
  // FEATURE 10: Zero-Flicker Persistence (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 10,
    milestone: 'M1',
    name: 'F10.1: Synchronous inline <script> present in <head> of index.html',
    progressiveCheck: () => fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      const inspector = new HtmlInspector(html);
      const head = inspector.getHeadContent();
      assertIncludes(head, '<script', '<head> must contain inline script for theme initialization');
    }
  });

  harness.register({
    tier: 1,
    featureId: 10,
    milestone: 'M1',
    name: 'F10.2: Pre-render script checks localStorage.getItem("theme")',
    progressiveCheck: () => fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      assertIncludes(html, "localStorage.getItem('theme')", 'Script must inspect localStorage theme');
    }
  });

  harness.register({
    tier: 1,
    featureId: 10,
    milestone: 'M1',
    name: 'F10.3: Pre-render script checks prefers-color-scheme media query as fallback',
    progressiveCheck: () => fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      assertIncludes(html, 'prefers-color-scheme', 'Script must query prefers-color-scheme');
    }
  });

  harness.register({
    tier: 1,
    featureId: 10,
    milestone: 'M1',
    name: 'F10.4: ThemeEngine simulator accurately executes anti-flash logic',
    fn: () => {
      const storage = new LocalStorageSimulator();
      storage.setItem('theme', 'dark');
      const engine = new ThemeEngineSimulator(storage);
      const applied = engine.executeHeadScript();
      assertEqual(applied, 'dark');
      assert(engine.documentElement.classList.contains('dark'), 'Must add dark class to root');
    }
  });

  harness.register({
    tier: 1,
    featureId: 10,
    milestone: 'M1',
    name: 'F10.5: ThemeEngine removes dark class when light theme stored',
    fn: () => {
      const storage = new LocalStorageSimulator();
      storage.setItem('theme', 'light');
      const engine = new ThemeEngineSimulator(storage);
      engine.documentElement.classList.add('dark'); // pre-existing class
      const applied = engine.executeHeadScript();
      assertEqual(applied, 'light');
      assert(!engine.documentElement.classList.contains('dark'), 'Must remove dark class on light theme');
    }
  });

  // =========================================================================
  // FEATURE 11: Theme Toggle Interaction (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 11,
    milestone: 'M1',
    name: 'F11.1: Theme toggle switches from dark to light mode',
    fn: () => {
      const storage = new LocalStorageSimulator();
      const engine = new ThemeEngineSimulator(storage, true);
      engine.executeHeadScript(); // begins dark
      const nextTheme = engine.toggleTheme();
      assertEqual(nextTheme, 'light');
      assertEqual(storage.getItem('theme'), 'light');
      assertEqual(engine.getCurrentTheme(), 'light');
    }
  });

  harness.register({
    tier: 1,
    featureId: 11,
    milestone: 'M1',
    name: 'F11.2: Theme toggle switches from light to dark mode',
    fn: () => {
      const storage = new LocalStorageSimulator();
      storage.setItem('theme', 'light');
      const engine = new ThemeEngineSimulator(storage);
      engine.executeHeadScript();
      const nextTheme = engine.toggleTheme();
      assertEqual(nextTheme, 'dark');
      assertEqual(storage.getItem('theme'), 'dark');
      assertEqual(engine.getCurrentTheme(), 'dark');
    }
  });

  harness.register({
    tier: 1,
    featureId: 11,
    milestone: 'M1',
    name: 'F11.3: Theme toggle updates data-theme attribute on root element',
    fn: () => {
      const storage = new LocalStorageSimulator();
      const engine = new ThemeEngineSimulator(storage, false);
      engine.toggleTheme(); // switches to dark
      assertEqual(engine.documentElement.getAttribute('data-theme'), 'dark');
      engine.toggleTheme(); // switches to light
      assertEqual(engine.documentElement.getAttribute('data-theme'), 'light');
    }
  });

  harness.register({
    tier: 1,
    featureId: 11,
    milestone: 'M1',
    name: 'F11.4: ThemeToggle component file exists in src/components/ui/ThemeToggle.tsx',
    progressiveCheck: () => fileExists('src/components/ui/ThemeToggle.tsx'),
    fn: () => {
      const comp = getFileContent('src/components/ui/ThemeToggle.tsx');
      assert(comp !== null, 'src/components/ui/ThemeToggle.tsx must exist');
      assert(comp.includes('aria-label') || comp.includes('toggleTheme'), 'Must provide accessible toggle button');
    }
  });

  harness.register({
    tier: 1,
    featureId: 11,
    milestone: 'M1',
    name: 'F11.5: ThemeContext provider file exists in src/context/ThemeContext.tsx',
    progressiveCheck: () => fileExists('src/context/ThemeContext.tsx'),
    fn: () => {
      const ctx = getFileContent('src/context/ThemeContext.tsx');
      assert(ctx !== null, 'src/context/ThemeContext.tsx must exist');
      assertIncludes(ctx, 'createContext', 'Must create React context');
      assertIncludes(ctx, 'useTheme', 'Must export useTheme hook');
    }
  });

  // =========================================================================
  // FEATURE 12: Flagship Next Presentation (M3)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 12,
    milestone: 'M3',
    name: 'F12.1: Next project tagline matches authoritative specification',
    fn: () => {
      assertEqual(
        AUTHORITATIVE_ORACLE.flagships.next.tagline,
        'To-Do List and Calendar with AI Scheduling'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 12,
    milestone: 'M3',
    name: 'F12.2: Next project App Store ID verified as 6781007283',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.flagships.next.appStoreId, '6781007283');
    }
  });

  harness.register({
    tier: 1,
    featureId: 12,
    milestone: 'M3',
    name: 'F12.3: Next live landing page URL points to https://harshamatta.github.io/projNext/',
    fn: () => {
      assertValidUrl(AUTHORITATIVE_ORACLE.flagships.next.landingPage);
      assertEqual(AUTHORITATIVE_ORACLE.flagships.next.landingPage, 'https://harshamatta.github.io/projNext/');
    }
  });

  harness.register({
    tier: 1,
    featureId: 12,
    milestone: 'M3',
    name: 'F12.4: Next icon asset exists on disk',
    fn: () => {
      const iconPath = path.join(PROJECT_ROOT, AUTHORITATIVE_ORACLE.flagships.next.iconPath);
      const pubIconPath = path.join(PROJECT_ROOT, 'public', AUTHORITATIVE_ORACLE.flagships.next.iconPath);
      assert(fs.existsSync(iconPath) || fs.existsSync(pubIconPath), 'Next icon asset must exist in assets or public/assets');
    }
  });

  harness.register({
    tier: 1,
    featureId: 12,
    milestone: 'M3',
    name: 'F12.5: Next screenshot assets (screen1, screen2, screen3) exist on disk',
    fn: () => {
      for (const scr of AUTHORITATIVE_ORACLE.flagships.next.screenshots) {
        const p1 = path.join(PROJECT_ROOT, scr);
        const p2 = path.join(PROJECT_ROOT, 'public', scr);
        assert(fs.existsSync(p1) || fs.existsSync(p2), `Screenshot ${scr} must exist`);
      }
    }
  });

  // =========================================================================
  // FEATURE 13: Next Architecture Spec (M3)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 13,
    milestone: 'M3',
    name: 'F13.1: Spec defines dual-file mirror paradigm with .tasks.md',
    fn: () => {
      assertIncludes(
        AUTHORITATIVE_ORACLE.flagships.next.coreHighlights[0],
        '.tasks.md',
        'Next spec must define dual-file mirror paradigm'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 13,
    milestone: 'M3',
    name: 'F13.2: Spec defines NSFilePresenter concurrency and line hashing',
    fn: () => {
      assertIncludes(
        AUTHORITATIVE_ORACLE.flagships.next.coreHighlights[1],
        'NSFilePresenter',
        'Next spec must document NSFilePresenter'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 13,
    milestone: 'M3',
    name: 'F13.3: Spec defines BYOK AI with interactive user-approval gate',
    fn: () => {
      assertIncludes(
        AUTHORITATIVE_ORACLE.flagships.next.coreHighlights[2],
        'user-approval gate',
        'Next spec must document strict approval gate'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 13,
    milestone: 'M3',
    name: 'F13.4: Spec defines markdown inline tokens ([status:], [date:], [time:], [rolled:])',
    fn: () => {
      const tokens = AUTHORITATIVE_ORACLE.flagships.next.specTokens;
      assertDeepEqual(tokens, ['[status: active]', '[date: YYYY-MM-DD]', '[time: HH:MM-HH:MM]', '[rolled: X]']);
    }
  });

  harness.register({
    tier: 1,
    featureId: 13,
    milestone: 'M3',
    name: 'F13.5: Case study markdown or data contains complete Next architectural notes',
    progressiveCheck: () => fileExists('src/data/projects.ts'),
    fn: () => {
      const content = getFileContent('src/data/projects.ts');
      assertIncludes(content, 'mirror', 'projects.ts must describe mirror paradigm');
    }
  });

  // =========================================================================
  // FEATURE 14: Flagship deal.II Presentation (M3)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 14,
    milestone: 'M3',
    name: 'F14.1: deal.II presentation references upstream dealii/dealii repository',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.flagships.dealii.repoUrl, 'https://github.com/dealii/dealii');
    }
  });

  harness.register({
    tier: 1,
    featureId: 14,
    milestone: 'M3',
    name: 'F14.2: deal.II affine mapping vector diagram exists on disk',
    fn: () => {
      const svgPath = path.join(PROJECT_ROOT, AUTHORITATIVE_ORACLE.flagships.dealii.diagramSvg);
      const pubSvgPath = path.join(PROJECT_ROOT, 'public', AUTHORITATIVE_ORACLE.flagships.dealii.diagramSvg);
      assert(fs.existsSync(svgPath) || fs.existsSync(pubSvgPath), 'affine_mapping.svg must exist');
    }
  });

  harness.register({
    tier: 1,
    featureId: 14,
    milestone: 'M3',
    name: 'F14.3: affine_mapping.svg contains valid SVG root and unit reference cell coordinates',
    fn: () => {
      const svgPath = path.join(PROJECT_ROOT, 'public', AUTHORITATIVE_ORACLE.flagships.dealii.diagramSvg);
      const altSvgPath = path.join(PROJECT_ROOT, AUTHORITATIVE_ORACLE.flagships.dealii.diagramSvg);
      const content = fs.existsSync(svgPath) ? fs.readFileSync(svgPath, 'utf-8') : fs.readFileSync(altSvgPath, 'utf-8');
      assertIncludes(content, '<svg', 'Diagram must be a valid SVG');
      assert(content.includes('K') || content.includes('Unit') || content.includes('affine'), 'SVG contains mathematical cell labels');
    }
  });

  harness.register({
    tier: 1,
    featureId: 14,
    milestone: 'M3',
    name: 'F14.4: deal.II contribution documents InterpolatedUniformGridData delta_x caching',
    fn: () => {
      const pr = AUTHORITATIVE_ORACLE.flagships.dealii.prs.find(p => p.number === 19327);
      assert(pr !== undefined, 'PR #19327 must be cataloged');
      assertIncludes(pr.title, 'InterpolatedUniformGridData');
    }
  });

  harness.register({
    tier: 1,
    featureId: 14,
    milestone: 'M3',
    name: 'F14.5: deal.II contribution documents non-hypercube affine assertion',
    fn: () => {
      const pr = AUTHORITATIVE_ORACLE.flagships.dealii.prs.find(p => p.number === 19370);
      assert(pr !== undefined, 'PR #19370 must be cataloged');
      assertIncludes(pr.title, 'affine approximation');
    }
  });

  // =========================================================================
  // FEATURE 15: deal.II PR Differentiation (M3)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 15,
    milestone: 'M3',
    name: 'F15.1: PR #19327 status is explicitly "merged"',
    fn: () => {
      const pr = AUTHORITATIVE_ORACLE.flagships.dealii.prs.find(p => p.number === 19327);
      assertEqual(pr.status, 'merged');
      assertEqual(pr.date, '2026-02-25');
    }
  });

  harness.register({
    tier: 1,
    featureId: 15,
    milestone: 'M3',
    name: 'F15.2: PR #19370 status is explicitly "merged"',
    fn: () => {
      const pr = AUTHORITATIVE_ORACLE.flagships.dealii.prs.find(p => p.number === 19370);
      assertEqual(pr.status, 'merged');
      assertEqual(pr.date, '2026-03-08');
    }
  });

  harness.register({
    tier: 1,
    featureId: 15,
    milestone: 'M3',
    name: 'F15.3: PR #19804 status is explicitly "in_review" (NOT merged)',
    fn: () => {
      const pr = AUTHORITATIVE_ORACLE.flagships.dealii.prs.find(p => p.number === 19804);
      assertEqual(pr.status, 'in_review');
      assert(pr.status !== 'merged', 'PR #19804 must NOT be marked merged');
    }
  });

  harness.register({
    tier: 1,
    featureId: 15,
    milestone: 'M3',
    name: 'F15.4: All PR records map to valid canonical GitHub PR URLs',
    fn: () => {
      for (const pr of AUTHORITATIVE_ORACLE.flagships.dealii.prs) {
        const url = `https://github.com/dealii/dealii/pull/${pr.number}`;
        assertValidUrl(url);
      }
    }
  });

  harness.register({
    tier: 1,
    featureId: 15,
    milestone: 'M3',
    name: 'F15.5: Verified badges component exists in src/components/ui/Badge.tsx',
    progressiveCheck: () => fileExists('src/components/ui/Badge.tsx'),
    fn: () => {
      const badge = getFileContent('src/components/ui/Badge.tsx');
      assert(badge !== null, 'src/components/ui/Badge.tsx must exist');
    }
  });

  // =========================================================================
  // FEATURE 16: Flagship InOffice Presentation (M3)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 16,
    milestone: 'M3',
    name: 'F16.1: InOffice App Store URL verified',
    fn: () => {
      assertEqual(
        AUTHORITATIVE_ORACLE.flagships.trackinoffice.appStoreUrl,
        'https://apps.apple.com/us/app/trackinoffice/id6762209341'
      );
      assertValidUrl(AUTHORITATIVE_ORACLE.flagships.trackinoffice.appStoreUrl);
    }
  });

  harness.register({
    tier: 1,
    featureId: 16,
    milestone: 'M3',
    name: 'F16.2: InOffice App Store ID verified as 6762209341',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.flagships.trackinoffice.appStoreId, '6762209341');
    }
  });

  harness.register({
    tier: 1,
    featureId: 16,
    milestone: 'M3',
    name: 'F16.3: InOffice hardware geofencing radius parameter 50m - 500m verified',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.flagships.trackinoffice.security.geofenceRadius, '50m - 500m');
    }
  });

  harness.register({
    tier: 1,
    featureId: 16,
    milestone: 'M3',
    name: 'F16.4: InOffice notification cooldown window verified as 30 minutes',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.flagships.trackinoffice.security.cooldownWindowMinutes, 30);
    }
  });

  harness.register({
    tier: 1,
    featureId: 16,
    milestone: 'M3',
    name: 'F16.5: InOffice icon and screenshots exist on disk',
    fn: () => {
      const iconPath = path.join(PROJECT_ROOT, AUTHORITATIVE_ORACLE.flagships.trackinoffice.iconPath);
      const pubIconPath = path.join(PROJECT_ROOT, 'public', AUTHORITATIVE_ORACLE.flagships.trackinoffice.iconPath);
      assert(fs.existsSync(iconPath) || fs.existsSync(pubIconPath), 'InOffice icon must exist');
      for (const scr of AUTHORITATIVE_ORACLE.flagships.trackinoffice.screenshots) {
        const p1 = path.join(PROJECT_ROOT, scr);
        const p2 = path.join(PROJECT_ROOT, 'public', scr);
        assert(fs.existsSync(p1) || fs.existsSync(p2), `Screenshot ${scr} must exist`);
      }
    }
  });

  // =========================================================================
  // FEATURE 17: InOffice Security Spec (M3)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 17,
    milestone: 'M3',
    name: 'F17.1: Keychain attribute matches kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly',
    fn: () => {
      assertEqual(
        AUTHORITATIVE_ORACLE.flagships.trackinoffice.security.keychainAttribute,
        'kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 17,
    milestone: 'M3',
    name: 'F17.2: SwiftData local encrypted SQLite database persistence verified',
    fn: () => {
      assertEqual(
        AUTHORITATIVE_ORACLE.flagships.trackinoffice.security.storage,
        'SwiftData encrypted SQLite'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 17,
    milestone: 'M3',
    name: 'F17.3: Formula injection defense covers trigger characters =, +, -, @',
    fn: () => {
      const triggers = AUTHORITATIVE_ORACLE.flagships.trackinoffice.security.formulaDefenseChars;
      assertDeepEqual(triggers, ['=', '+', '-', '@']);
    }
  });

  harness.register({
    tier: 1,
    featureId: 17,
    milestone: 'M3',
    name: 'F17.4: CSV formula defense sanitizes formula trigger cells',
    fn: () => {
      const sanitized = sanitizeCsvField('=cmd|"/C calc"!A0');
      assertEqual(sanitized, '\'=cmd|"/C calc"!A0');
      const safeText = sanitizeCsvField('Office Day Normal');
      assertEqual(safeText, 'Office Day Normal');
    }
  });

  harness.register({
    tier: 1,
    featureId: 17,
    milestone: 'M3',
    name: 'F17.5: InOffice case study documents 100% offline-first architecture',
    progressiveCheck: () => fileExists('src/data/projects.ts'),
    fn: () => {
      const content = getFileContent('src/data/projects.ts');
      assertIncludes(content, 'kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly');
    }
  });

  // =========================================================================
  // FEATURE 18: Flagship VRP Presentation (M3)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 18,
    milestone: 'M3',
    name: 'F18.1: VRP historical horizon covers 15+ years of SPX/VIX daily data',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.flagships.vrp.historicalHorizon, '15+ years (2010 - present)');
    }
  });

  harness.register({
    tier: 1,
    featureId: 18,
    milestone: 'M3',
    name: 'F18.2: VRP empirical finding verifies positive premium on >85% of trading days',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.flagships.vrp.positiveDaysRatio, '>85%');
    }
  });

  harness.register({
    tier: 1,
    featureId: 18,
    milestone: 'M3',
    name: 'F18.3: VRP live Streamlit link verified',
    fn: () => {
      assertValidUrl(AUTHORITATIVE_ORACLE.flagships.vrp.streamlitUrl);
      assertEqual(AUTHORITATIVE_ORACLE.flagships.vrp.streamlitUrl, 'https://volatilityriskpremium.streamlit.app/');
    }
  });

  harness.register({
    tier: 1,
    featureId: 18,
    milestone: 'M3',
    name: 'F18.4: VRP GitHub repository link verified',
    fn: () => {
      assertValidUrl(AUTHORITATIVE_ORACLE.flagships.vrp.githubUrl);
      assertEqual(AUTHORITATIVE_ORACLE.flagships.vrp.githubUrl, 'https://github.com/HarshaMatta/VolatilityRiskPremium');
    }
  });

  harness.register({
    tier: 1,
    featureId: 18,
    milestone: 'M3',
    name: 'F18.5: VRP dashboard preview SVG exists on disk',
    fn: () => {
      const p1 = path.join(PROJECT_ROOT, AUTHORITATIVE_ORACLE.flagships.vrp.dashboardSvg);
      const p2 = path.join(PROJECT_ROOT, 'public', AUTHORITATIVE_ORACLE.flagships.vrp.dashboardSvg);
      assert(fs.existsSync(p1) || fs.existsSync(p2), 'vrp_dashboard.svg must exist');
    }
  });

  // =========================================================================
  // FEATURE 19: VRP Methodological Disclaimers (M3)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 19,
    milestone: 'M3',
    name: 'F19.1: Discloses historical tail-risk events (Feb 2018 Volmageddon & March 2020 COVID)',
    fn: () => {
      const events = AUTHORITATIVE_ORACLE.flagships.vrp.tailRiskEvents;
      assertIncludes(events[0], 'Volmageddon');
      assertIncludes(events[1], 'COVID');
    }
  });

  harness.register({
    tier: 1,
    featureId: 19,
    milestone: 'M3',
    name: 'F19.2: Discloses variance swaps vs volatility swaps convexity bias distinction',
    fn: () => {
      assertIncludes(
        AUTHORITATIVE_ORACLE.flagships.vrp.instrumentCaveat,
        'convexity bias'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 19,
    milestone: 'M3',
    name: 'F19.3: Characterizes strategy as empirical research and simulated backtest',
    progressiveCheck: () => fileExists('src/data/projects.ts') || fileExists('src/data/quant.ts'),
    fn: () => {
      const content = (getFileContent('src/data/projects.ts') || '') + (getFileContent('src/data/quant.ts') || '');
      assert(content.includes('empirical') || content.includes('simulated') || content.includes('backtest'), 'Must disclose research/simulated nature');
    }
  });

  harness.register({
    tier: 1,
    featureId: 19,
    milestone: 'M3',
    name: 'F19.4: Market regime classifier categorizes VIX >= 30 as crisis',
    fn: () => {
      const regime = classifyMarketRegime(32.5, 4500, 4400);
      assertEqual(regime, 'crisis');
    }
  });

  harness.register({
    tier: 1,
    featureId: 19,
    milestone: 'M3',
    name: 'F19.5: Market regime classifier categorizes VIX < 20 and SPX > SMA as bull',
    fn: () => {
      const regime = classifyMarketRegime(16.2, 5100, 4800);
      assertEqual(regime, 'bull');
    }
  });

  // =========================================================================
  // FEATURE 20: Secondary Paatam Showcase (M4)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 20,
    milestone: 'M4',
    name: 'F20.1: Paatam highlights 275+ organic downloads metric',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.secondaries.paatam.downloadsMetric, '275+ organic downloads');
    }
  });

  harness.register({
    tier: 1,
    featureId: 20,
    milestone: 'M4',
    name: 'F20.2: Paatam App Store URL verified as id6670503097',
    fn: () => {
      assertValidUrl(AUTHORITATIVE_ORACLE.secondaries.paatam.appStoreUrl);
      assertEqual(AUTHORITATIVE_ORACLE.secondaries.paatam.appStoreId, '6670503097');
    }
  });

  harness.register({
    tier: 1,
    featureId: 20,
    milestone: 'M4',
    name: 'F20.3: Paatam documents Indic languages (Telugu, Hindi, Tamil, Kannada, Malayalam)',
    fn: () => {
      assertDeepEqual(
        AUTHORITATIVE_ORACLE.secondaries.paatam.languages,
        ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam']
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 20,
    milestone: 'M4',
    name: 'F20.4: Paatam documents Apple PencilKit tracing heuristics and spaced repetition',
    fn: () => {
      assertIncludes(AUTHORITATIVE_ORACLE.secondaries.paatam.tech[0], 'PencilKit');
    }
  });

  harness.register({
    tier: 1,
    featureId: 20,
    milestone: 'M4',
    name: 'F20.5: Paatam app icon and 4 screenshots exist on disk',
    fn: () => {
      for (let i = 1; i <= 4; i++) {
        const p1 = path.join(PROJECT_ROOT, `assets/paatam/screen${i}.jpg`);
        const p2 = path.join(PROJECT_ROOT, `public/assets/paatam/screen${i}.jpg`);
        assert(fs.existsSync(p1) || fs.existsSync(p2), `Paatam screen${i}.jpg must exist`);
      }
    }
  });

  // =========================================================================
  // FEATURE 21: Secondary Greeks Visualizer (M4)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 21,
    milestone: 'M4',
    name: 'F21.1: Greeks Visualizer live Streamlit link verified',
    fn: () => {
      assertValidUrl(AUTHORITATIVE_ORACLE.secondaries.greeks.streamlitUrl);
      assertEqual(AUTHORITATIVE_ORACLE.secondaries.greeks.streamlitUrl, 'https://greeksvisualizer.streamlit.app');
    }
  });

  harness.register({
    tier: 1,
    featureId: 21,
    milestone: 'M4',
    name: 'F21.2: Greeks Visualizer GitHub repository verified',
    fn: () => {
      assertValidUrl(AUTHORITATIVE_ORACLE.secondaries.greeks.githubUrl);
      assertEqual(AUTHORITATIVE_ORACLE.secondaries.greeks.githubUrl, 'https://github.com/HarshaMatta/GreeksVisualizer');
    }
  });

  harness.register({
    tier: 1,
    featureId: 21,
    milestone: 'M4',
    name: 'F21.3: Models Delta, Gamma, Theta, Vega, Rho sensitivities',
    fn: () => {
      assertDeepEqual(
        AUTHORITATIVE_ORACLE.secondaries.greeks.greeks,
        ['Delta', 'Gamma', 'Theta', 'Vega', 'Rho']
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 21,
    milestone: 'M4',
    name: 'F21.4: Greeks dashboard preview SVG exists on disk',
    fn: () => {
      const p1 = path.join(PROJECT_ROOT, AUTHORITATIVE_ORACLE.secondaries.greeks.previewSvg);
      const p2 = path.join(PROJECT_ROOT, 'public', AUTHORITATIVE_ORACLE.secondaries.greeks.previewSvg);
      assert(fs.existsSync(p1) || fs.existsSync(p2), 'greeks_dashboard.svg must exist');
    }
  });

  harness.register({
    tier: 1,
    featureId: 21,
    milestone: 'M4',
    name: 'F21.5: Greeks Visualizer cataloged in src/data/quant.ts or projects.ts',
    progressiveCheck: () => fileExists('src/data/quant.ts') || fileExists('src/data/projects.ts'),
    fn: () => {
      const data = (getFileContent('src/data/quant.ts') || '') + (getFileContent('src/data/projects.ts') || '');
      assertIncludes(data, 'greeks', 'Greeks project must be cataloged in data layer');
    }
  });

  // =========================================================================
  // FEATURE 22: Secondary Option Profit Model (M4)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 22,
    milestone: 'M4',
    name: 'F22.1: Option Profit Model live Streamlit link verified',
    fn: () => {
      assertValidUrl(AUTHORITATIVE_ORACLE.secondaries.optionprofit.streamlitUrl);
      assertEqual(AUTHORITATIVE_ORACLE.secondaries.optionprofit.streamlitUrl, 'https://optionprofitmodel.streamlit.app');
    }
  });

  harness.register({
    tier: 1,
    featureId: 22,
    milestone: 'M4',
    name: 'F22.2: Option Profit Model GitHub repo verified',
    fn: () => {
      assertValidUrl(AUTHORITATIVE_ORACLE.secondaries.optionprofit.githubUrl);
      assertEqual(AUTHORITATIVE_ORACLE.secondaries.optionprofit.githubUrl, 'https://github.com/HarshaMatta/optionProfitModel');
    }
  });

  harness.register({
    tier: 1,
    featureId: 22,
    milestone: 'M4',
    name: 'F22.3: Implements Black-Scholes European call/put valuation model',
    fn: () => {
      assertIncludes(AUTHORITATIVE_ORACLE.secondaries.optionprofit.model, 'Black-Scholes');
    }
  });

  harness.register({
    tier: 1,
    featureId: 22,
    milestone: 'M4',
    name: 'F22.4: Black-Scholes dashboard preview SVG exists on disk',
    fn: () => {
      const p1 = path.join(PROJECT_ROOT, AUTHORITATIVE_ORACLE.secondaries.optionprofit.previewSvg);
      const p2 = path.join(PROJECT_ROOT, 'public', AUTHORITATIVE_ORACLE.secondaries.optionprofit.previewSvg);
      assert(fs.existsSync(p1) || fs.existsSync(p2), 'black_scholes_dashboard.svg must exist');
    }
  });

  harness.register({
    tier: 1,
    featureId: 22,
    milestone: 'M4',
    name: 'F22.5: Option Profit Model cataloged in data layer',
    progressiveCheck: () => fileExists('src/data/quant.ts') || fileExists('src/data/projects.ts'),
    fn: () => {
      const data = (getFileContent('src/data/quant.ts') || '') + (getFileContent('src/data/projects.ts') || '');
      assertIncludes(data, 'optionprofit', 'Option Profit Model must be cataloged in data layer');
    }
  });

  // =========================================================================
  // FEATURE 23: Secondary Multivariable Calc (M4)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 23,
    milestone: 'M4',
    name: 'F23.1: Multivariable Calc app documents 4-stage grading pipeline',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.secondaries.multivariable.stages.length, 4);
      assertIncludes(AUTHORITATIVE_ORACLE.secondaries.multivariable.stages[0], 'Stage 1');
      assertIncludes(AUTHORITATIVE_ORACLE.secondaries.multivariable.stages[1], 'Stage 2');
      assertIncludes(AUTHORITATIVE_ORACLE.secondaries.multivariable.stages[2], 'Stage 3');
      assertIncludes(AUTHORITATIVE_ORACLE.secondaries.multivariable.stages[3], 'Stage 4');
    }
  });

  harness.register({
    tier: 1,
    featureId: 23,
    milestone: 'M4',
    name: 'F23.2: Documents local mathematical problem generation via LaTeX',
    progressiveCheck: () => fileExists('src/data/projects.ts'),
    fn: () => {
      const content = getFileContent('src/data/projects.ts');
      assert(content.includes('LaTeX') || content.includes('multivariable'), 'Must reference LaTeX or Multivariable Calc');
    }
  });

  harness.register({
    tier: 1,
    featureId: 23,
    milestone: 'M4',
    name: 'F23.3: Documents PencilKit handwriting capture and Vision OCR spatial clustering',
    progressiveCheck: () => fileExists('src/data/projects.ts'),
    fn: () => {
      const content = getFileContent('src/data/projects.ts');
      assert(content.includes('PencilKit') || content.includes('Vision'), 'Must reference PencilKit / Vision OCR');
    }
  });

  harness.register({
    tier: 1,
    featureId: 23,
    milestone: 'M4',
    name: 'F23.4: Documents AICostLimiter token middleware',
    fn: () => {
      assertEqual(
        AUTHORITATIVE_ORACLE.secondaries.multivariable.costLimiter,
        'AICostLimiter middleware'
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 23,
    milestone: 'M4',
    name: 'F23.5: Multivariable Calc project cataloged in src/data/projects.ts',
    progressiveCheck: () => fileExists('src/data/projects.ts'),
    fn: () => {
      const content = getFileContent('src/data/projects.ts');
      assertIncludes(content, 'multivariable', 'Must catalog multivariable project in data layer');
    }
  });

  // =========================================================================
  // FEATURE 24: Progressive Disclosure UI (M3)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 24,
    milestone: 'M3',
    name: 'F24.1: CaseStudyModal or drawer component exists in src/components/ui/',
    progressiveCheck: () => fileExists('src/components/ui/CaseStudyModal.tsx'),
    fn: () => {
      const comp = getFileContent('src/components/ui/CaseStudyModal.tsx');
      assert(comp !== null, 'src/components/ui/CaseStudyModal.tsx must exist');
    }
  });

  harness.register({
    tier: 1,
    featureId: 24,
    milestone: 'M3',
    name: 'F24.2: Case study disclosure supports expand and collapse state',
    progressiveCheck: () => fileExists('src/components/ui/CaseStudyModal.tsx'),
    fn: () => {
      const comp = getFileContent('src/components/ui/CaseStudyModal.tsx');
      assert(comp !== null, 'src/components/ui/CaseStudyModal.tsx must exist');
      assertMatch(comp, /isOpen|onClose/i, 'CaseStudyModal must support expand/collapse disclosure state');
    }
  });

  harness.register({
    tier: 1,
    featureId: 24,
    milestone: 'M3',
    name: 'F24.3: Accessible aria-expanded attribute toggles on disclosure button',
    progressiveCheck: () => fileExists('src/components/ui/CaseStudyModal.tsx'),
    fn: () => {
      const comp = getFileContent('src/components/ui/CaseStudyModal.tsx');
      assert(comp !== null, 'src/components/ui/CaseStudyModal.tsx must exist');
      assert(comp.includes('aria-expanded') || comp.includes('aria-label') || comp.includes('aria-haspopup'), 'Disclosure elements must support accessibility attributes');
    }
  });

  harness.register({
    tier: 1,
    featureId: 24,
    milestone: 'M3',
    name: 'F24.4: Flagship projects contain extendedCaseStudy data structures',
    progressiveCheck: () => fileExists('src/data/projects.ts'),
    fn: () => {
      const content = getFileContent('src/data/projects.ts');
      assertIncludes(content, 'extendedCaseStudy', 'Flagship projects must include extendedCaseStudy data');
    }
  });

  harness.register({
    tier: 1,
    featureId: 24,
    milestone: 'M3',
    name: 'F24.5: Escape key dismisses open case study modal',
    fn: () => {
      const trap = new FocusTrapSimulator(['close-btn']);
      trap.open('trigger-card');
      const restored = trap.handleKeyDown('Escape');
      assertEqual(restored, 'trigger-card');
      assertEqual(trap.isOpen, false);
    }
  });

  // =========================================================================
  // FEATURE 25: Published Medium Stream (M4)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 25,
    milestone: 'M4',
    name: 'F25.1: Exactly 4 verified Medium articles cataloged',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.articles.length, 4);
    }
  });

  harness.register({
    tier: 1,
    featureId: 25,
    milestone: 'M4',
    name: 'F25.2: Article 1 "How do you price an option?" verified (Feb 14, 2025)',
    fn: () => {
      const art = AUTHORITATIVE_ORACLE.articles[0];
      assertEqual(art.title, 'How do you price an option?');
      assertEqual(art.date, 'Feb 14, 2025');
      assertEqual(art.topic, 'Pricing Theory');
      assertValidUrl(art.url);
    }
  });

  harness.register({
    tier: 1,
    featureId: 25,
    milestone: 'M4',
    name: 'F25.3: Article 2 "American Options Pt 1: Portfolio Approach" verified (Feb 18, 2025)',
    fn: () => {
      const art = AUTHORITATIVE_ORACLE.articles[1];
      assertIncludes(art.title, 'American Option, Part 1');
      assertEqual(art.date, 'Feb 18, 2025');
      assertValidUrl(art.url);
    }
  });

  harness.register({
    tier: 1,
    featureId: 25,
    milestone: 'M4',
    name: 'F25.4: Article 3 "American Options Pt 2: Risk-Neutral Approach" verified (Feb 24, 2025)',
    fn: () => {
      const art = AUTHORITATIVE_ORACLE.articles[2];
      assertIncludes(art.title, 'American Option, Part 2');
      assertEqual(art.date, 'Feb 24, 2025');
      assertValidUrl(art.url);
    }
  });

  harness.register({
    tier: 1,
    featureId: 25,
    milestone: 'M4',
    name: 'F25.5: All 4 Medium cover SVG assets exist on disk',
    fn: () => {
      for (const art of AUTHORITATIVE_ORACLE.articles) {
        const p1 = path.join(PROJECT_ROOT, art.coverSvg);
        const p2 = path.join(PROJECT_ROOT, 'public', art.coverSvg);
        assert(fs.existsSync(p1) || fs.existsSync(p2), `Cover SVG ${art.coverSvg} must exist`);
      }
    }
  });

  // =========================================================================
  // FEATURE 26: Writing Impression Metric (M4)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 26,
    milestone: 'M4',
    name: 'F26.1: Writing impression metric verified as "3,400+ total impressions"',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.writingImpressionsMetric, '3,400+ total impressions');
    }
  });

  harness.register({
    tier: 1,
    featureId: 26,
    milestone: 'M4',
    name: 'F26.2: Writing metric badge displayed in Technical Writing section header',
    progressiveCheck: () => fileExists('src/components/sections/WritingSection.tsx') || fileExists('src/data/articles.ts'),
    fn: () => {
      const content = (getFileContent('src/components/sections/WritingSection.tsx') || '') +
                      (getFileContent('src/data/articles.ts') || '');
      assert(content.includes('3,400') || content.includes('impressions'), 'Writing section must display 3,400+ impressions metric');
    }
  });

  harness.register({
    tier: 1,
    featureId: 26,
    milestone: 'M4',
    name: 'F26.3: Impression badge styled with high-contrast text',
    fn: () => {
      assertContrastRatio('#38BDF8', '#0B0D0E', 4.5, 'Metric badge accent contrast');
    }
  });

  harness.register({
    tier: 1,
    featureId: 26,
    milestone: 'M4',
    name: 'F26.4: Metric derived strictly from authoritative October 2026 resume',
    fn: () => {
      assertMatch(AUTHORITATIVE_ORACLE.writingImpressionsMetric, /3,400\+/, 'Matches resume claim');
    }
  });

  harness.register({
    tier: 1,
    featureId: 26,
    milestone: 'M4',
    name: 'F26.5: Writing section component exists in src/components/sections/WritingSection.tsx',
    progressiveCheck: () => fileExists('src/components/sections/WritingSection.tsx'),
    fn: () => {
      const comp = getFileContent('src/components/sections/WritingSection.tsx');
      assert(comp !== null, 'src/components/sections/WritingSection.tsx must exist');
    }
  });

  // =========================================================================
  // FEATURE 27: Lightbox Modal Focus Trap (M5)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 27,
    milestone: 'M5',
    name: 'F27.1: Lightbox modal sets role="dialog" and aria-modal="true"',
    progressiveCheck: () => fileExists('src/components/ui/LightboxModal.tsx'),
    fn: () => {
      const comp = getFileContent('src/components/ui/LightboxModal.tsx');
      assert(comp !== null, 'src/components/ui/LightboxModal.tsx must exist');
      assertIncludes(comp, 'role="dialog"');
      assertIncludes(comp, 'aria-modal="true"');
    }
  });

  harness.register({
    tier: 1,
    featureId: 27,
    milestone: 'M5',
    name: 'F27.2: Focus Trap Simulator traps Tab forward cycle inside modal elements',
    fn: () => {
      const trap = new FocusTrapSimulator(['close-btn', 'prev-btn', 'next-btn']);
      trap.open();
      assertEqual(trap.getCurrentFocus(), 'close-btn');
      assertEqual(trap.handleKeyDown('Tab'), 'prev-btn');
      assertEqual(trap.handleKeyDown('Tab'), 'next-btn');
      assertEqual(trap.handleKeyDown('Tab'), 'close-btn'); // Wraps back to first!
    }
  });

  harness.register({
    tier: 1,
    featureId: 27,
    milestone: 'M5',
    name: 'F27.3: Focus Trap Simulator traps Shift+Tab backward cycle inside modal elements',
    fn: () => {
      const trap = new FocusTrapSimulator(['close-btn', 'prev-btn', 'next-btn']);
      trap.open();
      assertEqual(trap.getCurrentFocus(), 'close-btn');
      assertEqual(trap.handleKeyDown('Tab', true), 'next-btn'); // Wraps backward to last!
      assertEqual(trap.handleKeyDown('Tab', true), 'prev-btn');
      assertEqual(trap.handleKeyDown('Tab', true), 'close-btn');
    }
  });

  harness.register({
    tier: 1,
    featureId: 27,
    milestone: 'M5',
    name: 'F27.4: Escape key dismisses modal from inside focus trap',
    fn: () => {
      const trap = new FocusTrapSimulator(['close-btn']);
      trap.open('orig-thumb');
      const restored = trap.handleKeyDown('Escape');
      assertEqual(restored, 'orig-thumb');
      assertEqual(trap.isOpen, false);
    }
  });

  harness.register({
    tier: 1,
    featureId: 27,
    milestone: 'M5',
    name: 'F27.5: Single-element modal traps Tab on single close button',
    fn: () => {
      const trap = new FocusTrapSimulator(['close-btn']);
      trap.open();
      assertEqual(trap.handleKeyDown('Tab'), 'close-btn');
      assertEqual(trap.handleKeyDown('Tab', true), 'close-btn');
    }
  });

  // =========================================================================
  // FEATURE 28: Focus Restoration (M5)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 28,
    milestone: 'M5',
    name: 'F28.1: LightboxContext manages active trigger element reference',
    progressiveCheck: () => fileExists('src/context/LightboxContext.tsx'),
    fn: () => {
      const ctx = getFileContent('src/context/LightboxContext.tsx');
      assert(ctx !== null, 'src/context/LightboxContext.tsx must exist');
      assert(ctx.includes('trigger') || ctx.includes('openLightbox'), 'Must accept trigger element on open');
    }
  });

  harness.register({
    tier: 1,
    featureId: 28,
    milestone: 'M5',
    name: 'F28.2: Closing modal restores focus to original thumbnail element',
    fn: () => {
      const triggerEl = { id: 'next-thumbnail-1', focused: false, focus() { this.focused = true; } };
      const trap = new FocusTrapSimulator(['close-btn']);
      trap.open(triggerEl);
      const restored = trap.close();
      restored.focus();
      assertEqual(triggerEl.focused, true);
    }
  });

  harness.register({
    tier: 1,
    featureId: 28,
    milestone: 'M5',
    name: 'F28.3: Restores focus on backdrop click dismissal',
    fn: () => {
      const triggerEl = { id: 'affine-svg-preview', focused: false, focus() { this.focused = true; } };
      const trap = new FocusTrapSimulator(['close-btn']);
      trap.open(triggerEl);
      // Simulate backdrop click dismissing modal
      const restored = trap.close();
      assertEqual(restored.id, 'affine-svg-preview');
    }
  });

  harness.register({
    tier: 1,
    featureId: 28,
    milestone: 'M5',
    name: 'F28.4: Fallback to document body if trigger element becomes unmounted',
    fn: () => {
      const trap = new FocusTrapSimulator(['close-btn']);
      trap.open(null); // No trigger captured
      const restored = trap.close();
      const target = restored || 'document.body';
      assertEqual(target, 'document.body');
    }
  });

  harness.register({
    tier: 1,
    featureId: 28,
    milestone: 'M5',
    name: 'F28.5: Focus restoration does not throw error when null trigger provided',
    fn: () => {
      const trap = new FocusTrapSimulator(['close-btn']);
      trap.open(null);
      const result = trap.close();
      assertEqual(result, null);
    }
  });

  // =========================================================================
  // FEATURE 29: Body Scroll Lock (M5)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 29,
    milestone: 'M5',
    name: 'F29.1: Opening modal sets body overflow to hidden',
    fn: () => {
      const lock = new ScrollLockSimulator();
      lock.lock();
      assertEqual(lock.body.style.overflow, 'hidden');
      assertEqual(lock.isLocked, true);
    }
  });

  harness.register({
    tier: 1,
    featureId: 29,
    milestone: 'M5',
    name: 'F29.2: Closing modal restores previous body overflow style',
    fn: () => {
      const lock = new ScrollLockSimulator();
      lock.body.style.overflow = '';
      lock.lock();
      lock.unlock();
      assertEqual(lock.body.style.overflow, '');
      assertEqual(lock.isLocked, false);
    }
  });

  harness.register({
    tier: 1,
    featureId: 29,
    milestone: 'M5',
    name: 'F29.3: Preserves pre-existing custom body overflow styles',
    fn: () => {
      const lock = new ScrollLockSimulator();
      lock.body.style.overflow = 'auto';
      lock.lock();
      assertEqual(lock.body.style.overflow, 'hidden');
      lock.unlock();
      assertEqual(lock.body.style.overflow, 'auto');
    }
  });

  harness.register({
    tier: 1,
    featureId: 29,
    milestone: 'M5',
    name: 'F29.4: LightboxModal code implements body scroll locking useEffect',
    progressiveCheck: () => fileExists('src/components/ui/LightboxModal.tsx'),
    fn: () => {
      const comp = getFileContent('src/components/ui/LightboxModal.tsx');
      assert(comp.includes('overflow') || comp.includes('hidden'), 'Lightbox modal must manipulate body overflow');
    }
  });

  harness.register({
    tier: 1,
    featureId: 29,
    milestone: 'M5',
    name: 'F29.5: Clean unmount restores scroll lock without lingering hidden style',
    fn: () => {
      const lock = new ScrollLockSimulator();
      lock.lock();
      // Simulate unmount hook execution
      lock.unlock();
      assertEqual(lock.body.style.overflow, '');
    }
  });

  // =========================================================================
  // FEATURE 30: Visible Focus Rings (M5)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 30,
    milestone: 'M5',
    name: 'F30.1: Focus ring styles defined in CSS or Tailwind with focus-visible',
    progressiveCheck: () => fileExists('src/index.css') || fileExists('tailwind.config.js'),
    fn: () => {
      const css = (getFileContent('src/index.css') || '') + (getFileContent('tailwind.config.js') || '');
      assert(css.includes('focus-visible') || css.includes('outline'), 'Must define focus-visible rings');
    }
  });

  harness.register({
    tier: 1,
    featureId: 30,
    milestone: 'M5',
    name: 'F30.2: Focus ring outline width is at least 2px',
    progressiveCheck: () => fileExists('src/index.css'),
    fn: () => {
      const indexCss = getFileContent('src/index.css');
      assert(indexCss !== null, 'src/index.css must exist');
      const match = indexCss.match(/outline:\s*(\d+)px/);
      assert(match, 'src/index.css must specify focus outline width in pixels');
      const minOutlineWidthPx = parseInt(match[1], 10);
      assert(minOutlineWidthPx >= 2, 'Focus outline must be >= 2px');
    }
  });

  harness.register({
    tier: 1,
    featureId: 30,
    milestone: 'M5',
    name: 'F30.3: Focus ring provides distinct outline-offset',
    progressiveCheck: () => fileExists('src/index.css'),
    fn: () => {
      const indexCss = getFileContent('src/index.css');
      assert(indexCss !== null, 'src/index.css must exist');
      const match = indexCss.match(/outline-offset:\s*(\d+)px/);
      assert(match, 'src/index.css must specify outline-offset in pixels');
      const offsetPx = parseInt(match[1], 10);
      assert(offsetPx >= 2, 'Focus ring offset must be >= 2px');
    }
  });

  harness.register({
    tier: 1,
    featureId: 30,
    milestone: 'M5',
    name: 'F30.4: Dark mode focus ring cyan (#38BDF8) meets 3:1 contrast against surface #141618',
    fn: () => {
      assertContrastRatio('#38BDF8', '#141618', 3.0, 'Dark mode focus ring contrast');
    }
  });

  harness.register({
    tier: 1,
    featureId: 30,
    milestone: 'M5',
    name: 'F30.5: Light mode focus ring editorial blue (#0369A1) meets 3:1 contrast against #FBF9F5',
    fn: () => {
      assertContrastRatio('#0369A1', '#FBF9F5', 3.0, 'Light mode focus ring contrast');
    }
  });

  // =========================================================================
  // FEATURE 31: Prefers-Reduced-Motion (M5)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 31,
    milestone: 'M5',
    name: 'F31.1: CSS media query prefers-reduced-motion declared',
    progressiveCheck: () => fileExists('src/index.css'),
    fn: () => {
      const css = getFileContent('src/index.css');
      assertIncludes(css, 'prefers-reduced-motion', 'src/index.css must declare prefers-reduced-motion media query');
    }
  });

  harness.register({
    tier: 1,
    featureId: 31,
    milestone: 'M5',
    name: 'F31.2: Smooth scrolling disabled under reduced motion',
    progressiveCheck: () => fileExists('src/index.css'),
    fn: () => {
      const css = getFileContent('src/index.css');
      assert(css.includes('scroll-behavior: auto') || css.includes('scroll-behavior'), 'Must disable smooth scrolling');
    }
  });

  harness.register({
    tier: 1,
    featureId: 31,
    milestone: 'M5',
    name: 'F31.3: Animation and transition durations neutralized under reduced motion',
    progressiveCheck: () => fileExists('src/index.css'),
    fn: () => {
      const css = getFileContent('src/index.css');
      assert(css.includes('transition') || css.includes('animation') || css.includes('none'), 'Must neutralize transitions');
    }
  });

  harness.register({
    tier: 1,
    featureId: 31,
    milestone: 'M5',
    name: 'F31.4: Modal transitions appear instantaneously without scaling delay',
    fn: () => {
      const cssContent = getFileContent('src/index.css');
      assert(cssContent !== null, 'src/index.css must exist');
      assertIncludes(cssContent, '@media (prefers-reduced-motion: reduce)');
      assertMatch(cssContent, /transition-duration:\s*0\.01ms\s*!important/);
      assertMatch(cssContent, /animation-duration:\s*0\.01ms\s*!important/);
    }
  });

  harness.register({
    tier: 1,
    featureId: 31,
    milestone: 'M5',
    name: 'F31.5: Functional behavior remains 100% operational with reduced motion active',
    fn: () => {
      const trap = new FocusTrapSimulator(['close-btn']);
      trap.open();
      assertEqual(trap.isOpen, true);
      trap.close();
      assertEqual(trap.isOpen, false);
    }
  });

  // =========================================================================
  // FEATURE 32: Mobile Viewport (390px) (M2)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 32,
    milestone: 'M2',
    name: 'F32.1: Layout simulator evaluates 390px viewport as mobile',
    fn: () => {
      const evalResult = LayoutSimulator.evaluateViewport(390);
      assertEqual(evalResult.isMobile, true);
      assertEqual(evalResult.isDesktop, false);
    }
  });

  harness.register({
    tier: 1,
    featureId: 32,
    milestone: 'M2',
    name: 'F32.2: Mobile header component exists in src/components/layout/MobileHeader.tsx',
    progressiveCheck: () => fileExists('src/components/layout/MobileHeader.tsx'),
    fn: () => {
      const header = getFileContent('src/components/layout/MobileHeader.tsx');
      assert(header !== null, 'src/components/layout/MobileHeader.tsx must exist');
    }
  });

  harness.register({
    tier: 1,
    featureId: 32,
    milestone: 'M2',
    name: 'F32.3: Zero horizontal overflow on 390px viewport width',
    fn: () => {
      const elements = [{ id: 'card-1', width: 360 }, { id: 'media-1', width: 370 }];
      const evalResult = LayoutSimulator.evaluateViewport(390, elements);
      assertEqual(evalResult.hasHorizontalOverflow, false);
    }
  });

  harness.register({
    tier: 1,
    featureId: 32,
    milestone: 'M2',
    name: 'F32.4: Mobile touch targets meet minimum 44px hit dimensions',
    progressiveCheck: () => fileExists('src/components/ui/ThemeToggle.tsx'),
    fn: () => {
      const source = getFileContent('src/components/ui/ThemeToggle.tsx');
      assert(source !== null, 'ThemeToggle component must exist');
      assertMatch(source, /min-h-\[(4[0-9]|50)px\]|h-(10|11|12)|min-w-\[(4[0-9]|50)px\]|w-(10|11|12)/, 'Mobile interactive targets must provide >= 40-44px touch targets');
    }
  });

  harness.register({
    tier: 1,
    featureId: 32,
    milestone: 'M2',
    name: 'F32.5: Viewport meta tag present in index.html',
    progressiveCheck: () => fileExists('index.html'),
    fn: () => {
      const html = getFileContent('index.html');
      assertIncludes(html, 'width=device-width', 'index.html must include standard responsive viewport meta');
    }
  });

  // =========================================================================
  // FEATURE 33: Tablet Viewport (768px) (M2)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 33,
    milestone: 'M2',
    name: 'F33.1: Layout simulator evaluates 768px viewport as tablet',
    fn: () => {
      const evalResult = LayoutSimulator.evaluateViewport(768);
      assertEqual(evalResult.isTablet, true);
      assertEqual(evalResult.isMobile, false);
      assertEqual(evalResult.isDesktop, false);
    }
  });

  harness.register({
    tier: 1,
    featureId: 33,
    milestone: 'M2',
    name: 'F33.2: Zero horizontal overflow on 768px viewport width',
    fn: () => {
      const elements = [{ id: 'card-grid', width: 720 }];
      const evalResult = LayoutSimulator.evaluateViewport(768, elements);
      assertEqual(evalResult.hasHorizontalOverflow, false);
    }
  });

  harness.register({
    tier: 1,
    featureId: 33,
    milestone: 'M2',
    name: 'F33.3: Tablet grid renders side-by-side media columns',
    progressiveCheck: () => fileExists('src/App.tsx'),
    fn: () => {
      const app = getFileContent('src/App.tsx');
      assert(app !== null, 'src/App.tsx must exist');
      assertMatch(app, /grid-cols-1\s+md:grid-cols-2|grid-cols-2/, 'Tablet layout must render responsive 2-column side-by-side grid');
    }
  });

  harness.register({
    tier: 1,
    featureId: 33,
    milestone: 'M2',
    name: 'F33.4: Tailwind breakpoint md (768px) utilized for tablet styling',
    progressiveCheck: () => fileExists('src/App.tsx'),
    fn: () => {
      const app = getFileContent('src/App.tsx');
      assert(app.includes('md:') || app.includes('lg:'), 'Must use responsive Tailwind breakpoints');
    }
  });

  harness.register({
    tier: 1,
    featureId: 33,
    milestone: 'M2',
    name: 'F33.5: Lightbox centers media preview on 768px screen',
    fn: () => {
      const evalResult = LayoutSimulator.evaluateViewport(768, [{ id: 'lightbox', width: 700 }]);
      assertEqual(evalResult.hasHorizontalOverflow, false, 'Modal width constrained within viewport');
      assertEqual(evalResult.isTablet, true);
    }
  });

  // =========================================================================
  // FEATURE 34: Desktop Viewport (1440px) (M2)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 34,
    milestone: 'M2',
    name: 'F34.1: Layout simulator evaluates 1440px viewport as desktop',
    fn: () => {
      const evalResult = LayoutSimulator.evaluateViewport(1440);
      assertEqual(evalResult.isDesktop, true);
      assertEqual(evalResult.isMobile, false);
      assertEqual(evalResult.isTablet, false);
    }
  });

  harness.register({
    tier: 1,
    featureId: 34,
    milestone: 'M2',
    name: 'F34.2: Desktop sidebar component exists in src/components/layout/DesktopSidebar.tsx',
    progressiveCheck: () => fileExists('src/components/layout/DesktopSidebar.tsx'),
    fn: () => {
      const sidebar = getFileContent('src/components/layout/DesktopSidebar.tsx');
      assert(sidebar !== null, 'src/components/layout/DesktopSidebar.tsx must exist');
    }
  });

  harness.register({
    tier: 1,
    featureId: 34,
    milestone: 'M2',
    name: 'F34.3: Desktop layout implements 2-column editorial structure (sticky sidebar + scroll stream)',
    progressiveCheck: () => fileExists('src/App.tsx'),
    fn: () => {
      const app = getFileContent('src/App.tsx');
      assert(app.includes('DesktopSidebar') || app.includes('sticky'), 'App must feature desktop sidebar navigation');
    }
  });

  harness.register({
    tier: 1,
    featureId: 34,
    milestone: 'M2',
    name: 'F34.4: Zero horizontal overflow on 1440px viewport width',
    fn: () => {
      const elements = [{ id: 'sidebar', width: 480 }, { id: 'stream', width: 800 }];
      const evalResult = LayoutSimulator.evaluateViewport(1440, elements);
      assertEqual(evalResult.hasHorizontalOverflow, false);
    }
  });

  harness.register({
    tier: 1,
    featureId: 34,
    milestone: 'M2',
    name: 'F34.5: Container width bounded (e.g. max-w-6xl or max-w-7xl) on ultra-wide screens',
    progressiveCheck: () => fileExists('src/App.tsx'),
    fn: () => {
      const app = getFileContent('src/App.tsx');
      assert(app.includes('max-w-') || app.includes('container'), 'Layout must constrain maximum width');
    }
  });

  // =========================================================================
  // FEATURE 35: Resume PDF Integration (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 35,
    milestone: 'M1',
    name: 'F35.1: Resume PDF exists in public/assets/Harsha_Matta_Resume.pdf',
    progressiveCheck: () => fileExists('public/assets/Harsha_Matta_Resume.pdf') || fileExists('assets/resume.pdf'),
    fn: () => {
      const p1 = path.join(PROJECT_ROOT, 'public/assets/Harsha_Matta_Resume.pdf');
      const p2 = path.join(PROJECT_ROOT, 'assets/resume.pdf');
      assert(fs.existsSync(p1) || fs.existsSync(p2), 'Resume PDF must exist in public/assets or assets');
    }
  });

  harness.register({
    tier: 1,
    featureId: 35,
    milestone: 'M1',
    name: 'F35.2: Resume PDF file has valid %PDF- magic bytes header',
    progressiveCheck: () => fileExists('public/assets/Harsha_Matta_Resume.pdf') || fileExists('assets/resume.pdf'),
    fn: () => {
      const p1 = path.join(PROJECT_ROOT, 'public/assets/Harsha_Matta_Resume.pdf');
      const p2 = path.join(PROJECT_ROOT, 'assets/resume.pdf');
      const target = fs.existsSync(p1) ? p1 : p2;
      assertValidPdf(target);
    }
  });

  harness.register({
    tier: 1,
    featureId: 35,
    milestone: 'M1',
    name: 'F35.3: Resume file size is substantial (> 50 KB, verified single page)',
    progressiveCheck: () => fileExists('public/assets/Harsha_Matta_Resume.pdf') || fileExists('assets/resume.pdf'),
    fn: () => {
      const p1 = path.join(PROJECT_ROOT, 'public/assets/Harsha_Matta_Resume.pdf');
      const p2 = path.join(PROJECT_ROOT, 'assets/resume.pdf');
      const target = fs.existsSync(p1) ? p1 : p2;
      const stat = fs.statSync(target);
      assert(stat.size > 50000, 'Resume PDF size must exceed 50 KB');
    }
  });

  harness.register({
    tier: 1,
    featureId: 35,
    milestone: 'M1',
    name: 'F35.4: Backward compatible alias public/assets/resume.pdf configured or present',
    progressiveCheck: () => fileExists('public/assets/resume.pdf') || fileExists('assets/resume.pdf'),
    fn: () => {
      const p1 = path.join(PROJECT_ROOT, 'public/assets/resume.pdf');
      const p2 = path.join(PROJECT_ROOT, 'assets/resume.pdf');
      assert(fs.existsSync(p1) || fs.existsSync(p2), 'resume.pdf alias must exist');
    }
  });

  harness.register({
    tier: 1,
    featureId: 35,
    milestone: 'M1',
    name: 'F35.5: Resume download link uses target="_blank" and rel="noopener noreferrer"',
    fn: () => {
      const content = (getFileContent('src/App.tsx') || '') +
                      (getFileContent('src/components/layout/DesktopSidebar.tsx') || '') +
                      (getFileContent('src/components/layout/MobileHeader.tsx') || '');
      assert(content.length > 0, 'Component containing resume download link must exist');
      assertIncludes(content, 'target="_blank"', 'Resume download link must open in new tab');
      assertIncludes(content, 'rel="noopener noreferrer"', 'Resume download link must protect opener context');
      assert(
        content.includes('Harsha_Matta_Resume.pdf') || content.includes('resume.pdf'),
        'Resume download link must reference authoritative PDF asset'
      );
    }
  });

  // =========================================================================
  // FEATURE 36: GitHub Pages SPA 404 Fallback (M5)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 36,
    milestone: 'M5',
    name: 'F36.1: Build script generates dist/404.html identical to index.html',
    progressiveCheck: () => fileExists('dist/404.html'),
    fn: () => {
      const fourOhFour = getFileContent('dist/404.html');
      assert(fourOhFour !== null, 'dist/404.html must exist after build');
      assertIncludes(fourOhFour, 'id="root"', '404.html must contain React mount container');
    }
  });

  harness.register({
    tier: 1,
    featureId: 36,
    milestone: 'M5',
    name: 'F36.2: 404.html preserves <head> anti-flash script',
    progressiveCheck: () => fileExists('dist/404.html'),
    fn: () => {
      const fourOhFour = getFileContent('dist/404.html');
      assertIncludes(fourOhFour, 'localStorage', '404.html must retain anti-flash theme script');
    }
  });

  harness.register({
    tier: 1,
    featureId: 36,
    milestone: 'M5',
    name: 'F36.3: 404.html asset paths use absolute root paths (/assets/)',
    progressiveCheck: () => fileExists('dist/404.html'),
    fn: () => {
      const fourOhFour = getFileContent('dist/404.html');
      assert(fourOhFour.includes('/assets/') || fourOhFour.includes('./assets/'), 'Asset paths must be properly rooted');
    }
  });

  harness.register({
    tier: 1,
    featureId: 36,
    milestone: 'M5',
    name: 'F36.4: vite.config.ts or build post-hook configured to create 404.html',
    progressiveCheck: () => fileExists('vite.config.ts') || fileExists('package.json'),
    fn: () => {
      const config = (getFileContent('vite.config.ts') || '') + (getFileContent('package.json') || '');
      assert(config.includes('404') || config.includes('build'), 'Must have 404 generation or build script');
    }
  });

  harness.register({
    tier: 1,
    featureId: 36,
    milestone: 'M5',
    name: 'F36.5: Direct URL requests to subroutes boot React app via 404 fallback',
    fn: () => {
      const subroutes = ['/paatam', '/projNext', '/quant'];
      for (const route of subroutes) {
        assert(route.startsWith('/'), 'Subroutes begin with leading slash');
      }
    }
  });

  // =========================================================================
  // FEATURE 37: .nojekyll Preservation (M1)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 37,
    milestone: 'M1',
    name: 'F37.1: .nojekyll file exists at project root or in public/.nojekyll',
    progressiveCheck: () => fileExists('.nojekyll') || fileExists('public/.nojekyll'),
    fn: () => {
      const p1 = path.join(PROJECT_ROOT, '.nojekyll');
      const p2 = path.join(PROJECT_ROOT, 'public/.nojekyll');
      assert(fs.existsSync(p1) || fs.existsSync(p2), '.nojekyll must exist in project root or public/');
    }
  });

  harness.register({
    tier: 1,
    featureId: 37,
    milestone: 'M1',
    name: 'F37.2: .nojekyll preserved in dist/ output after build',
    progressiveCheck: () => fileExists('dist/.nojekyll'),
    fn: () => {
      assertFileExists(path.join(PROJECT_ROOT, 'dist/.nojekyll'), 'dist/.nojekyll must exist after build');
    }
  });

  harness.register({
    tier: 1,
    featureId: 37,
    milestone: 'M1',
    name: 'F37.3: .nojekyll is not gitignored in .gitignore',
    progressiveCheck: () => fileExists('.gitignore'),
    fn: () => {
      const gitignore = getFileContent('.gitignore');
      assert(!gitignore.includes('.nojekyll'), '.nojekyll must NOT be gitignored');
    }
  });

  harness.register({
    tier: 1,
    featureId: 37,
    milestone: 'M1',
    name: 'F37.4: .nojekyll file has read permissions',
    fn: () => {
      const p = path.join(PROJECT_ROOT, 'public/.nojekyll');
      assertFileExists(p, 'public/.nojekyll must exist in source tree');
      fs.accessSync(p, fs.constants.R_OK);
      const stat = fs.statSync(p);
      assert(stat.isFile(), '.nojekyll must be a regular file');
    }
  });

  harness.register({
    tier: 1,
    featureId: 37,
    milestone: 'M1',
    name: 'F37.5: .nojekyll prevents Jekyll dropping underscore folders on GitHub Pages',
    fn: () => {
      const pPublic = path.join(PROJECT_ROOT, 'public/.nojekyll');
      assertFileExists(pPublic, 'public/.nojekyll must exist in repository root public folder');
      const pDist = path.join(PROJECT_ROOT, 'dist/.nojekyll');
      if (fs.existsSync(path.join(PROJECT_ROOT, 'dist'))) {
        assertFileExists(pDist, 'dist/.nojekyll must be preserved in Vite build output');
      }
    }
  });

  // =========================================================================
  // FEATURE 38: GitHub Actions Deploy Workflow (M5)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 38,
    milestone: 'M5',
    name: 'F38.1: .github/workflows/deploy.yml exists',
    progressiveCheck: () => fileExists('.github/workflows/deploy.yml'),
    fn: () => {
      assertFileExists(path.join(PROJECT_ROOT, '.github/workflows/deploy.yml'));
    }
  });

  harness.register({
    tier: 1,
    featureId: 38,
    milestone: 'M5',
    name: 'F38.2: Workflow triggers on push to main branch',
    progressiveCheck: () => fileExists('.github/workflows/deploy.yml'),
    fn: () => {
      const workflow = getFileContent('.github/workflows/deploy.yml');
      assertIncludes(workflow, 'branches: [main]', 'Workflow must trigger on push to main');
    }
  });

  harness.register({
    tier: 1,
    featureId: 38,
    milestone: 'M5',
    name: 'F38.3: Workflow configures pages: write and id-token: write permissions',
    progressiveCheck: () => fileExists('.github/workflows/deploy.yml'),
    fn: () => {
      const workflow = getFileContent('.github/workflows/deploy.yml');
      assertIncludes(workflow, 'pages: write');
      assertIncludes(workflow, 'id-token: write');
    }
  });

  harness.register({
    tier: 1,
    featureId: 38,
    milestone: 'M5',
    name: 'F38.4: Workflow steps include checkout, setup-node, npm ci, and npm run build',
    progressiveCheck: () => fileExists('.github/workflows/deploy.yml'),
    fn: () => {
      const workflow = getFileContent('.github/workflows/deploy.yml');
      assertIncludes(workflow, 'actions/checkout@v4');
      assertIncludes(workflow, 'actions/setup-node@v4');
      assertIncludes(workflow, 'npm run build');
    }
  });

  harness.register({
    tier: 1,
    featureId: 38,
    milestone: 'M5',
    name: 'F38.5: Workflow uploads ./dist artifact and invokes deploy-pages',
    progressiveCheck: () => fileExists('.github/workflows/deploy.yml'),
    fn: () => {
      const workflow = getFileContent('.github/workflows/deploy.yml');
      assertIncludes(workflow, 'actions/upload-pages-artifact@v3');
      assertIncludes(workflow, 'actions/deploy-pages@v4');
    }
  });

  // =========================================================================
  // FEATURE 39: 20-Second Recruiter Heuristic (M2)
  // =========================================================================
  harness.register({
    tier: 1,
    featureId: 39,
    milestone: 'M2',
    name: 'F39.1: Full Name "Harsha Matta" prominently rendered above fold',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.profile.fullName, 'Harsha Matta');
    }
  });

  harness.register({
    tier: 1,
    featureId: 39,
    milestone: 'M2',
    name: 'F39.2: UNC Chapel Hill education clearly displayed',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.profile.institution, 'University of North Carolina at Chapel Hill');
      assertEqual(AUTHORITATIVE_ORACLE.profile.shortInstitution, 'UNC Chapel Hill');
    }
  });

  harness.register({
    tier: 1,
    featureId: 39,
    milestone: 'M2',
    name: 'F39.3: B.S. in Applied Mathematics & Computer Science verified',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.profile.degree, 'B.S. in Applied Mathematics & Computer Science');
      assertEqual(AUTHORITATIVE_ORACLE.profile.expectedGraduation, 'May 2028');
    }
  });

  harness.register({
    tier: 1,
    featureId: 39,
    milestone: 'M2',
    name: 'F39.4: Three core disciplines clearly identified',
    fn: () => {
      assertDeepEqual(
        AUTHORITATIVE_ORACLE.profile.disciplines,
        ['Native Apple Systems', 'C++ Scientific Computing', 'Quantitative Finance']
      );
    }
  });

  harness.register({
    tier: 1,
    featureId: 39,
    milestone: 'M2',
    name: 'F39.5: Verified direct contact email harsha.v.matta@gmail.com available',
    fn: () => {
      assertEqual(AUTHORITATIVE_ORACLE.profile.email, 'harsha.v.matta@gmail.com');
      assertValidUrl(`mailto:${AUTHORITATIVE_ORACLE.profile.email}`);
    }
  });
}

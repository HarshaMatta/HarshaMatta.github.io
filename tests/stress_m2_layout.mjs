/**
 * Empirical Layout & Boundary Stress Harness for Milestone 2
 * Challenger 1: Responsive Layout Shell, Viewports, Touch Targets, Header, Sidebar
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

function getFile(relPath) {
  return fs.readFileSync(path.join(PROJECT_ROOT, relPath), 'utf-8');
}

console.log('======================================================================');
console.log('   M2 CHALLENGER 1: EMPIRICAL STRESS & CORNER TEST HARNESS');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const findings = [];

function check(testName, condition, details = {}) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.log(`✗ FAIL: ${testName}`);
    console.log(`  Details: ${JSON.stringify(details, null, 2)}`);
    findings.push({ testName, details });
  }
}

// ---------------------------------------------------------------------------
// 1. TOUCH TARGET MEASUREMENTS (>= 44x44px)
// ---------------------------------------------------------------------------
console.log('--- 1. Testing Touch Targets (>= 44x44px) ---');

const themeToggleSource = getFile('src/components/ui/ThemeToggle.tsx');
const mobileHeaderSource = getFile('src/components/layout/MobileHeader.tsx');
const desktopSidebarSource = getFile('src/components/layout/DesktopSidebar.tsx');
const footerSource = getFile('src/components/layout/Footer.tsx');
const appSource = getFile('src/App.tsx');

// ThemeToggle button bounding box
const themeToggleHas44pxMin = /min-h-\[44px\]/.test(themeToggleSource) && /min-w-\[44px\]/.test(themeToggleSource);
const themeToggleHas40pxExplicit = /min-h-\[40px\]/.test(themeToggleSource) || /h-10/.test(themeToggleSource);
check(
  'ThemeToggle button meets strictly >= 44x44px minimum touch target dimensions',
  themeToggleHas44pxMin && !themeToggleHas40pxExplicit,
  {
    themeToggleSourceMatch: themeToggleSource.match(/w-10\s+h-10\s+min-w-\[40px\]\s+min-h-\[40px\]/)?.[0] || 'not found',
    explanation: 'ThemeToggle specifies w-10 h-10 min-w-[40px] min-h-[40px], yielding a 40x40px hit target instead of >= 44x44px required for touch target compliance.'
  }
);

// MobileHeader theme toggle integration
check(
  'MobileHeader does not embed sub-44px ThemeToggle on mobile viewport',
  !/ThemeToggle/.test(mobileHeaderSource) || (themeToggleHas44pxMin && !themeToggleHas40pxExplicit),
  {
    explanation: 'MobileHeader includes <ThemeToggle />, which renders as 40x40px in the mobile sticky header.'
  }
);

// DesktopSidebar social links
const sidebarSocialHas40px = /min-w-\[40px\]\s+min-h-\[40px\]/.test(desktopSidebarSource);
check(
  'DesktopSidebar social links meet >= 44x44px minimum target dimensions',
  !sidebarSocialHas40px && /min-h-\[44px\]/.test(desktopSidebarSource),
  {
    sidebarSocialMatches: desktopSidebarSource.match(/min-w-\[40px\]\s+min-h-\[40px\]/g)?.length || 0,
    explanation: 'DesktopSidebar social icon buttons (GitHub, LinkedIn, Medium, Email) are styled with w-10 h-10 min-w-[40px] min-h-[40px] (40x40px).'
  }
);

// Footer social links
const footerSocialLinks = [...footerSource.matchAll(/<a\b[^>]*href=\{[^}]*\}[\s\S]*?<\/a>/gi)];
const footerSocialHas44px = footerSocialLinks.length > 0 && footerSocialLinks.every(link => link[0].includes('min-h-[44px]') || link[0].includes('h-11') || link[0].includes('h-12'));
check(
  'Footer social and contact links provide minimum 44px hit dimensions',
  footerSocialHas44px,
  {
    totalFooterLinksFound: footerSocialLinks.length,
    failingLinks: footerSocialLinks.filter(link => !link[0].includes('min-h-[44px]')).map(l => l[0].replace(/\s+/g, ' ').slice(0, 100)),
    explanation: 'Footer social links (GitHub, LinkedIn, Medium, Email) use text-xs inline styling without min-h-[44px] or sufficient padding, yielding hit target heights of ~16px.'
  }
);

// ---------------------------------------------------------------------------
// 2. STICKY HEADER HEIGHT (h-16) & CONTAINER OVERFLOW
// ---------------------------------------------------------------------------
console.log('\n--- 2. Testing Sticky Header Height & Overflow Geometry ---');

// App.tsx line 56: <div className="lg:hidden sticky top-0 z-30 h-16 w-full">
const appMobileHeaderWrapperMatch = appSource.match(/<div\s+className=["'][^"']*lg:hidden[^"']*sticky\s+top-0[^"']*h-16[^"']*["']>/);
const mobileHeaderHasNavStrip = /<nav\b[^>]*aria-label=["']Section navigation["'][^>]*>/.test(mobileHeaderSource);

// Check if MobileHeader total height exceeds h-16 (64px)
check(
  'MobileHeader component total rendered height matches the outer wrapper height (h-16 = 64px)',
  !appMobileHeaderWrapperMatch, // Wrapper in App.tsx must not constrain MobileHeader to h-16
  {
    wrapperInApp: appMobileHeaderWrapperMatch?.[0] || 'not found',
    headerInMobileHeader: mobileHeaderSource.match(/<header\s+className=["'][^"']*h-16[^"']*["']>/)?.[0] || 'not found',
    navInMobileHeader: mobileHeaderSource.match(/<nav\s+aria-label=["']Section navigation["'][^"']*className=["'][^"']*["']>/)?.[0] || 'not found',
    explanation: 'App.tsx wraps <MobileHeader> in a fixed h-16 (64px) container. However, MobileHeader renders both a 64px <header> and a ~56px <nav> strip (~120px total), causing the nav strip to vertically overflow outside the containing block into subsequent content.'
  }
);

// Check scroll clearance for hash navigation (scroll-mt-24 vs header + nav height)
// scroll-mt-24 is 96px (6rem). Header (64px) + Nav (~56px) = ~120px.
// If scroll-mt is 96px, jumping to #projects will put the title under the 120px sticky navigation bar!
const scrollMarginMatches = appSource.match(/scroll-mt-([0-9]+)/g) || [];
const maxScrollMargin = Math.max(...scrollMarginMatches.map(m => parseInt(m.replace('scroll-mt-', ''), 10) * 4)); // rem to px
check(
  'Section scroll-margin (scroll-mt) provides clearance for the combined mobile header + nav height (>= 120px)',
  maxScrollMargin >= 120,
  {
    maxScrollMarginFound: `${maxScrollMargin}px`,
    requiredClearance: '>= 120px (64px header + ~56px pill nav strip)',
    explanation: `Sections use scroll-mt-24 (${maxScrollMargin}px). Since mobile header + nav occupies ~120px, section headings are partially occluded by ~24px when jumping to hash anchors on mobile.`
  }
);

// ---------------------------------------------------------------------------
// 3. RESPONSIVE VIEWPORTS & ZERO HORIZONTAL OVERFLOW
// ---------------------------------------------------------------------------
console.log('\n--- 3. Testing Viewport Width & Horizontal Overflow ---');

// Check body / html overflow-x
const cssSource = getFile('src/index.css');
const htmlSource = getFile('index.html');
const bodyHasOverflowXHidden = cssSource.includes('overflow-x: hidden') || appSource.includes('overflow-x-hidden');
check(
  'Document root / body enforces overflow-x: hidden',
  bodyHasOverflowXHidden,
  {
    inCss: cssSource.includes('overflow-x: hidden'),
    inApp: appSource.includes('overflow-x-hidden')
  }
);

// Check Status badge text wrapping in Hero card
// Status message: 92 characters in inline-flex rounded-full badge
const profileSource = getFile('src/data/profile.ts');
const statusMessage = profileSource.match(/statusMessage:\s*['"]([^'"]+)['"]/)?.[1] || '';
const badgeInApp = appSource.match(/<span\s+className=["'][^"']*rounded-full[^"']*font-mono[^"']*["']>\s*Status:\s*\{profile\.statusMessage\}\s*<\/span>/);
const badgeHasWrapOrTruncate = badgeInApp && (badgeInApp[0].includes('truncate') || badgeInApp[0].includes('break-') || badgeInApp[0].includes('max-w-'));

check(
  'Hero status badge wraps or truncates on narrow mobile viewports (320px - 390px)',
  Boolean(badgeHasWrapOrTruncate),
  {
    statusMessageLength: `${statusMessage.length} characters (${statusMessage})`,
    badgeMarkup: badgeInApp?.[0] || 'not found',
    estimatedMonospaceWidth: `~${Math.round(statusMessage.length * 7.2 + 24)}px`,
    viewportMobileWidth: '390px (content card inner width: ~310px)',
    explanation: 'The status badge renders a 92-char monospace string inside inline-flex rounded-full without truncate, break-words, or max-w, producing an element ~686px wide on a 390px viewport.'
  }
);

// Check 320px, 390px, 768px, 1440px container constraints
check(
  'Desktop layout enforces max-w-7xl bounding container for ultra-wide screens',
  appSource.includes('max-w-7xl'),
  { present: appSource.includes('max-w-7xl') }
);

check(
  'Tablet layout activates 2-column responsive grid (md:grid-cols-2)',
  appSource.includes('md:grid-cols-2'),
  { present: appSource.includes('md:grid-cols-2') }
);

// ---------------------------------------------------------------------------
// 4. DESKTOP SIDEBAR SCROLLING & INDEPENDENT OVERFLOW
// ---------------------------------------------------------------------------
console.log('\n--- 4. Testing Desktop Sidebar Scrolling & ScrollSpy ---');

const sidebarHasOverflowYAuto = desktopSidebarSource.includes('overflow-y-auto');
const sidebarHasHScreen = desktopSidebarSource.includes('h-screen');
const sidebarHasSticky = desktopSidebarSource.includes('sticky top-0');

check(
  'Desktop sidebar has independent vertical scrolling (overflow-y-auto) with h-screen sticky positioning',
  sidebarHasOverflowYAuto && sidebarHasHScreen && sidebarHasSticky,
  {
    hasOverflowYAuto: sidebarHasOverflowYAuto,
    hasHScreen: sidebarHasHScreen,
    hasSticky: sidebarHasSticky
  }
);

// Check useScrollSpy hook resilience
const scrollSpySource = getFile('src/hooks/useScrollSpy.ts');
const scrollSpyHasHashInit = scrollSpySource.includes('window.location.hash');
const scrollSpyHasIntersectionObserver = scrollSpySource.includes('IntersectionObserver');
const scrollSpyHasScrollFallback = scrollSpySource.includes('window.addEventListener(\'scroll\'');
const scrollSpyHasThrottleOrRaf = scrollSpySource.includes('requestAnimationFrame');

check(
  'useScrollSpy initializes from URL hash on load',
  scrollSpyHasHashInit,
  { hasHashInit: scrollSpyHasHashInit }
);

check(
  'useScrollSpy incorporates requestAnimationFrame throttling against rapid flick-scrolling',
  scrollSpyHasThrottleOrRaf,
  { hasThrottleOrRaf: scrollSpyHasThrottleOrRaf }
);

const scrollSpyDepsMatch = scrollSpySource.match(/,\s*\[([^\]]+)\]\s*\);\s*return activeSection;/);
const scrollSpyHasActiveSectionInDeps = scrollSpyDepsMatch && scrollSpyDepsMatch[1].includes('activeSection');
check(
  'useScrollSpy avoids observer recreation churn during rapid scroll (activeSection omitted from effect deps)',
  !scrollSpyHasActiveSectionInDeps,
  {
    dependenciesFound: scrollSpyDepsMatch?.[1]?.trim() || 'not found',
    explanation: 'useScrollSpy includes activeSection in the useEffect dependency array. Each time the active section updates during rapid scrolling, the entire IntersectionObserver and scroll listener are torn down and re-instantiated, causing observer thrashing and missed intersection triggers.'
  }
);

// ---------------------------------------------------------------------------
// 5. ACCESSIBLE SKIP TO CONTENT LINK
// ---------------------------------------------------------------------------
console.log('\n--- 5. Testing Skip to Content Accessibility ---');

const skipLinkMatch = appSource.match(/<a\b[^>]*href=["']#main-content["'][^>]*>[\s\S]*?Skip to main content[\s\S]*?<\/a>/i);
const mainContentMatch = appSource.match(/<(?:main|div)\b[^>]*id=["']main-content["'][^>]*>/i);

check(
  'Accessible skip-to-content link targets valid #main-content element',
  Boolean(skipLinkMatch && mainContentMatch),
  {
    skipLinkFound: Boolean(skipLinkMatch),
    mainContentFound: Boolean(mainContentMatch)
  }
);

// ---------------------------------------------------------------------------
// SUMMARY & VERDICT
// ---------------------------------------------------------------------------
console.log('\n======================================================================');
console.log(`TOTAL CHECKS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log('======================================================================');

if (failedTests > 0) {
  console.log('\nCONFIRMED VULNERABILITIES & REGRESSIONS:');
  findings.forEach((f, idx) => {
    console.log(`\n[Vulnerability #${idx + 1}] ${f.testName}`);
    console.log(`  Details: ${JSON.stringify(f.details, null, 2)}`);
  });
}

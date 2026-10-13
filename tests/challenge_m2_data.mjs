#!/usr/bin/env node
/**
 * Milestone 2 Challenger 2: Empirical Data Integrity & Schema Challenge Suite
 * 
 * Tests:
 * 1. Asset path resolution across all data modules against disk filesystem.
 * 2. Schema conformance and type fidelity of all exported data.
 * 3. Anti-mock and anti-dummy content inspection.
 * 4. deal.II PR status splitting (#19327, #19370 merged; #19804 in review) and metric authenticity.
 * 5. Quantitative models mathematical rigor, live links, and risk caveats.
 * 6. External URL integrity and consistency.
 * 7. Resume PDF validity (magic bytes, file size, download anchors).
 * 8. Layout shell responsive contracts and accessibility invariants.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Test tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, message, details = {}) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
    failures.push({ message, details });
  }
}

function suite(name, fn) {
  console.log(`\n======================================================`);
  console.log(`SUITE: ${name}`);
  console.log(`======================================================`);
  return fn();
}

async function run() {
  console.log(`Starting M2 Challenger 2 Empirical Test Suite...`);
  console.log(`Project root: ${PROJECT_ROOT}`);

  // Dynamic imports of structured data
  const profileModule = await import(path.join(PROJECT_ROOT, 'src/data/profile.ts'));
  const projectsModule = await import(path.join(PROJECT_ROOT, 'src/data/projects.ts'));
  const quantModule = await import(path.join(PROJECT_ROOT, 'src/data/quant.ts'));
  const articlesModule = await import(path.join(PROJECT_ROOT, 'src/data/articles.ts'));
  const leadershipModule = await import(path.join(PROJECT_ROOT, 'src/data/leadership.ts'));
  const experienceModule = await import(path.join(PROJECT_ROOT, 'src/data/experience.ts'));
  const educationModule = await import(path.join(PROJECT_ROOT, 'src/data/education.ts'));

  const profile = profileModule.profile;
  const projects = projectsModule.projects;
  const quantProjects = quantModule.quantProjects;
  const articles = articlesModule.articles;
  const writingMetadata = articlesModule.writingMetadata;
  const leadership = leadershipModule.leadership;
  const experience = experienceModule.experience;
  const education = educationModule.education;

  // ---------------------------------------------------------------------------
  // SUITE 1: Asset Path Resolution & Disk Existence
  // ---------------------------------------------------------------------------
  suite('1. Asset Path Resolution & Disk Verification', () => {
    // Collect all referenced paths
    const referencedAssets = [];

    function findPaths(obj, origin) {
      if (!obj) return;
      if (typeof obj === 'string') {
        if (
          obj.startsWith('/assets/') ||
          obj.startsWith('assets/') ||
          /\.(png|jpg|jpeg|svg|pdf|webp)$/i.test(obj)
        ) {
          referencedAssets.push({ pathStr: obj, origin });
        }
      } else if (Array.isArray(obj)) {
        obj.forEach((item, idx) => findPaths(item, `${origin}[${idx}]`));
      } else if (typeof obj === 'object') {
        Object.entries(obj).forEach(([key, val]) => findPaths(val, `${origin}.${key}`));
      }
    }

    findPaths(profile, 'profile');
    findPaths(projects, 'projects');
    findPaths(quantProjects, 'quantProjects');
    findPaths(articles, 'articles');
    findPaths(education, 'education');

    console.log(`Total asset references discovered: ${referencedAssets.length}`);

    for (const { pathStr, origin } of referencedAssets) {
      const cleanPath = pathStr.startsWith('/') ? pathStr.slice(1) : pathStr;
      const candidates = [
        path.join(PROJECT_ROOT, 'public', cleanPath),
        path.join(PROJECT_ROOT, cleanPath)
      ];

      const exists = candidates.some(p => fs.existsSync(p));
      assert(
        exists,
        `Asset exists on disk: "${pathStr}" (referenced at ${origin})`,
        { pathStr, origin, checkedPaths: candidates }
      );
    }
  });

  // ---------------------------------------------------------------------------
  // SUITE 2: Schema Conformance & Type Integrity
  // ---------------------------------------------------------------------------
  suite('2. Schema Conformance & Type Fidelity', () => {
    // Profile
    assert(profile.name === 'Harsha Matta', 'Profile name is Harsha Matta');
    assert(profile.institution === 'University of North Carolina at Chapel Hill', 'Profile institution is UNC Chapel Hill');
    assert(profile.shortInstitution === 'UNC Chapel Hill', 'Profile shortInstitution is UNC Chapel Hill');
    assert(profile.degree === 'B.S. in Applied Mathematics & Computer Science', 'Profile degree matches B.S. in Applied Mathematics & Computer Science');
    assert(profile.expectedGraduation === 'May 2028', 'Profile expectedGraduation is May 2028');
    assert(profile.email === 'harsha.v.matta@gmail.com', 'Profile email is harsha.v.matta@gmail.com');
    assert(Array.isArray(profile.disciplines) && profile.disciplines.length === 3, 'Profile has exactly 3 core disciplines');
    assert(
      JSON.stringify(profile.disciplines) === JSON.stringify(['Native Apple Systems', 'C++ Scientific Computing', 'Quantitative Finance']),
      'Profile disciplines match canonical list'
    );
    assert(Array.isArray(profile.socialLinks) && profile.socialLinks.length >= 4, 'Profile has at least 4 social links');

    // Projects
    assert(Array.isArray(projects) && projects.length === 8, `Projects array has exactly 8 projects (found ${projects.length})`);
    const flagships = projects.filter(p => p.flagship);
    assert(flagships.length === 4, `Exactly 4 flagship projects (found ${flagships.length})`);
    const flagshipIds = flagships.map(p => p.id).sort();
    assert(
      JSON.stringify(flagshipIds) === JSON.stringify(['dealii', 'next', 'trackinoffice', 'vrp']),
      `Flagship IDs match ['dealii', 'next', 'trackinoffice', 'vrp']`
    );

    for (const p of projects) {
      assert(Boolean(p.id && p.title && p.subtitle && p.description && p.category), `Project ${p.id} has all required fields`);
      assert(['apple', 'hpc', 'quant', 'education'].includes(p.category), `Project ${p.id} has valid category (${p.category})`);
      assert(Array.isArray(p.tags) && p.tags.length > 0, `Project ${p.id} has non-empty tags array`);
      assert(Array.isArray(p.actions), `Project ${p.id} has actions array`);

      if (p.flagship) {
        assert(Boolean(p.extendedCaseStudy), `Flagship ${p.id} has extendedCaseStudy`);
        if (p.extendedCaseStudy) {
          assert(Boolean(p.extendedCaseStudy.overview), `Flagship ${p.id} case study has overview`);
          assert(Array.isArray(p.extendedCaseStudy.architecture) && p.extendedCaseStudy.architecture.length > 0, `Flagship ${p.id} has architecture bullets`);
          assert(Array.isArray(p.extendedCaseStudy.technicalHighlights) && p.extendedCaseStudy.technicalHighlights.length > 0, `Flagship ${p.id} has technicalHighlights`);
        }
      }
    }

    // Quant Projects
    assert(Array.isArray(quantProjects) && quantProjects.length === 3, `Quant projects has exactly 3 models (found ${quantProjects.length})`);
    for (const q of quantProjects) {
      assert(Boolean(q.id && q.title && q.description), `Quant project ${q.id} has required base fields`);
      assert(Array.isArray(q.equations) && q.equations.length > 0, `Quant project ${q.id} has non-empty equations`);
      assert(Array.isArray(q.caveats) && q.caveats.length > 0, `Quant project ${q.id} has non-empty caveats`);
      assert(Boolean(q.liveUrl), `Quant project ${q.id} has liveUrl`);
    }

    // Articles
    assert(Array.isArray(articles) && articles.length === 4, `Articles has exactly 4 items (found ${articles.length})`);
    assert(writingMetadata.totalImpressions === '3,400+', `Writing metadata has '3,400+' total impressions`);
    for (const a of articles) {
      assert(Boolean(a.id && a.title && a.topic && a.date && a.url && a.hook && a.coverSvg), `Article ${a.id} has all required fields`);
      assert(Array.isArray(a.takeaways) && a.takeaways.length > 0, `Article ${a.id} has takeaways`);
    }

    // Education
    assert(education.institution === 'University of North Carolina at Chapel Hill', 'Education institution matches UNC Chapel Hill');
    assert(Array.isArray(education.majors) && education.majors.includes('Applied Mathematics') && education.majors.includes('Computer Science'), 'Education majors contain Applied Math and CS');
    assert(Array.isArray(education.coursework) && education.coursework.length === 2, 'Education coursework has CS and Math categories');
    assert(Array.isArray(education.honors) && education.honors.length >= 4, 'Education honors has at least 4 items');
    assert(Array.isArray(education.certifications) && education.certifications.length >= 2, 'Education certifications has at least 2 items');

    // Experience & Leadership
    assert(Array.isArray(experience) && experience.length === 3, `Experience has 3 roles (found ${experience.length})`);
    assert(Array.isArray(leadership) && leadership.length === 5, `Leadership has 5 roles (found ${leadership.length})`);
  });

  // ---------------------------------------------------------------------------
  // SUITE 3: Anti-Mock & Anti-Dummy Audit
  // ---------------------------------------------------------------------------
  suite('3. Anti-Mock and Anti-Dummy Audit', () => {
    // Matches common placeholder terms, avoiding LaTeX command \bar{...}
    const placeholderRegex = /(?:^|[^\\])\b(lorem\s+ipsum|placeholder|dummy|asdf|foo\b|baz\b|test\d+|todo|tbd|coming\s+soon)\b|\bfoo\s+bar\b/i;

    function checkObjectForPlaceholders(obj, pathName) {
      if (!obj) return;
      if (typeof obj === 'string') {
        const match = obj.match(placeholderRegex);
        assert(!match, `No placeholder text in "${pathName}" (found: "${match ? match[0] : ''}")`, { pathName, match: match ? match[0] : null });
      } else if (Array.isArray(obj)) {
        obj.forEach((item, idx) => checkObjectForPlaceholders(item, `${pathName}[${idx}]`));
      } else if (typeof obj === 'object') {
        Object.entries(obj).forEach(([k, v]) => checkObjectForPlaceholders(v, `${pathName}.${k}`));
      }
    }

    checkObjectForPlaceholders(profile, 'profile');
    checkObjectForPlaceholders(projects, 'projects');
    checkObjectForPlaceholders(quantProjects, 'quantProjects');
    checkObjectForPlaceholders(articles, 'articles');
    checkObjectForPlaceholders(leadership, 'leadership');
    checkObjectForPlaceholders(experience, 'experience');
    checkObjectForPlaceholders(education, 'education');
  });

  // ---------------------------------------------------------------------------
  // SUITE 4: deal.II PR Splitting & Metric Authenticity
  // ---------------------------------------------------------------------------
  suite('4. deal.II PR Splitting & Metric Authenticity', () => {
    const dealiiProject = projects.find(p => p.id === 'dealii');
    assert(Boolean(dealiiProject), 'deal.II project exists in projects catalog');

    const prs = dealiiProject.verifiedPrs || [];
    assert(prs.length === 3, `deal.II project lists exactly 3 PRs (found ${prs.length})`);

    const pr19327 = prs.find(p => p.prNumber === 19327);
    assert(Boolean(pr19327), 'PR #19327 exists in deal.II project');
    assert(pr19327?.status === 'merged', 'PR #19327 status is "merged"');
    assert(pr19327?.date === '2026-02-25', 'PR #19327 date is "2026-02-25"');
    assert(pr19327?.url === 'https://github.com/dealii/dealii/pull/19327', 'PR #19327 URL is accurate');

    const pr19370 = prs.find(p => p.prNumber === 19370);
    assert(Boolean(pr19370), 'PR #19370 exists in deal.II project');
    assert(pr19370?.status === 'merged', 'PR #19370 status is "merged"');
    assert(pr19370?.date === '2026-03-08', 'PR #19370 date is "2026-03-08"');
    assert(pr19370?.url === 'https://github.com/dealii/dealii/pull/19370', 'PR #19370 URL is accurate');

    const pr19804 = prs.find(p => p.prNumber === 19804);
    assert(Boolean(pr19804), 'PR #19804 exists in deal.II project');
    assert(pr19804?.status === 'in_review', 'PR #19804 status is strictly "in_review" (NOT merged)');
    assert(pr19804?.url === 'https://github.com/dealii/dealii/pull/19804', 'PR #19804 URL is accurate');

    // Experience entry deal.II PR consistency
    const dealiiExp = experience.find(e => e.id === 'dealii-contributor');
    assert(Boolean(dealiiExp), 'deal.II contributor experience entry exists');
    assert(Array.isArray(dealiiExp?.verifiedPrs) && dealiiExp.verifiedPrs.length === 3, 'Experience deal.II lists exactly 3 verified PRs');

    const expPr19804 = dealiiExp?.verifiedPrs?.find(p => p.prNumber === 19804);
    assert(expPr19804?.status === 'in_review', 'Experience PR #19804 status is strictly "in_review"');

    // Authenticity checks: no fabricated metrics in descriptions
    const prText = JSON.stringify(prs) + JSON.stringify(dealiiExp);
    assert(!/100,000\+ lines/i.test(prText), 'No exaggerated line counts in deal.II PRs');
    assert(!/lead maintainer/i.test(prText), 'Accurate contributor role without title inflation');
  });

  // ---------------------------------------------------------------------------
  // SUITE 5: Quantitative Models & Mathematical Formulations
  // ---------------------------------------------------------------------------
  suite('5. Quantitative Models & Mathematical Formulations', () => {
    const vrp = quantProjects.find(q => q.id === 'vrp');
    assert(Boolean(vrp), 'VRP model exists in quantProjects');
    assert(vrp.liveUrl === 'https://volatilityriskpremium.streamlit.app/', 'VRP liveUrl is live Streamlit app');
    assert(vrp.githubUrl === 'https://github.com/HarshaMatta/VolatilityRiskPremium', 'VRP githubUrl is correct');
    assert(vrp.paperUrl === 'https://medium.com/@harsha.v.matta/volatility-risk-premium-a35d89502110', 'VRP paperUrl is correct');

    // Check equations
    const vrpEqNames = vrp.equations.map(e => e.name);
    assert(vrpEqNames.some(n => /log\s+returns/i.test(n)), 'VRP includes Log Returns formulation');
    assert(vrpEqNames.some(n => /realized\s+volatility/i.test(n)), 'VRP includes Realized Volatility formulation');
    assert(vrpEqNames.some(n => /volatility\s+risk\s+premium/i.test(n)), 'VRP includes VRP spread formulation');
    assert(vrpEqNames.some(n => /variance\s+swap/i.test(n)), 'VRP includes Variance Swap payoff formula');

    // Check caveats
    const vrpCaveatsText = vrp.caveats.join(' ');
    assert(/negative\s+skew/i.test(vrpCaveatsText), 'VRP caveats disclose negative skew');
    assert(/(Volmageddon|COVID)/i.test(vrpCaveatsText), 'VRP caveats disclose historical tail risk drawdowns');
    assert(/convexity\s+bias/i.test(vrpCaveatsText), 'VRP caveats disclose variance vs volatility swap convexity bias');

    // Greeks Visualizer
    const greeks = quantProjects.find(q => q.id === 'greeks');
    assert(Boolean(greeks), 'Greeks model exists in quantProjects');
    assert(greeks.liveUrl === 'https://greeksvisualizer.streamlit.app', 'Greeks liveUrl is valid');
    const greeksEqNames = greeks.equations.map(e => e.name);
    assert(greeksEqNames.some(n => /delta/i.test(n)), 'Greeks includes Delta equation');
    assert(greeksEqNames.some(n => /gamma/i.test(n)), 'Greeks includes Gamma equation');
    assert(greeksEqNames.some(n => /vega/i.test(n)), 'Greeks includes Vega equation');
    assert(greeksEqNames.some(n => /theta/i.test(n)), 'Greeks includes Theta equation');

    // Option Profit
    const optionProfit = quantProjects.find(q => q.id === 'option-profit');
    assert(Boolean(optionProfit), 'Option Profit model exists in quantProjects');
    assert(optionProfit.liveUrl === 'https://optionprofitmodel.streamlit.app', 'Option Profit liveUrl is valid');
    const optEqNames = optionProfit.equations.map(e => e.name);
    assert(optEqNames.some(n => /call/i.test(n)), 'Option Profit includes Call formula');
    assert(optEqNames.some(n => /put/i.test(n)), 'Option Profit includes Put formula');
    assert(optEqNames.some(n => /d_?1/i.test(n)), 'Option Profit includes d1 formula');
    assert(optEqNames.some(n => /d_?2/i.test(n)), 'Option Profit includes d2 formula');
  });

  // ---------------------------------------------------------------------------
  // SUITE 6: External URL Integrity
  // ---------------------------------------------------------------------------
  suite('6. External URL Integrity & Consistency', () => {
    const urls = [];
    function collectUrls(obj, origin) {
      if (!obj) return;
      if (typeof obj === 'string') {
        if (/^https?:\/\//i.test(obj) || /^mailto:/i.test(obj)) {
          urls.push({ url: obj, origin });
        }
      } else if (Array.isArray(obj)) {
        obj.forEach((i, idx) => collectUrls(i, `${origin}[${idx}]`));
      } else if (typeof obj === 'object') {
        Object.entries(obj).forEach(([k, v]) => collectUrls(v, `${origin}.${k}`));
      }
    }

    collectUrls(profile, 'profile');
    collectUrls(projects, 'projects');
    collectUrls(quantProjects, 'quantProjects');
    collectUrls(articles, 'articles');
    collectUrls(experience, 'experience');

    console.log(`Discovered ${urls.length} URLs in content layer.`);

    for (const { url, origin } of urls) {
      if (url.startsWith('mailto:')) {
        assert(url === 'mailto:harsha.v.matta@gmail.com', `Valid email link: ${url}`);
      } else {
        try {
          const parsed = new URL(url);
          assert(parsed.protocol === 'https:', `URL uses HTTPS: ${url} (at ${origin})`);
          assert(Boolean(parsed.hostname), `URL has valid hostname: ${url}`);
        } catch (e) {
          assert(false, `Invalid URL format: ${url} (at ${origin})`, { error: e.message });
        }
      }
    }
  });

  // ---------------------------------------------------------------------------
  // SUITE 7: Resume PDF Integrity
  // ---------------------------------------------------------------------------
  suite('7. Resume PDF Integrity & Download Anchors', () => {
    const resumePath = path.join(PROJECT_ROOT, 'public/assets/Harsha_Matta_Resume.pdf');
    const resumeAliasPath = path.join(PROJECT_ROOT, 'public/assets/resume.pdf');

    assert(fs.existsSync(resumePath), 'Harsha_Matta_Resume.pdf exists in public/assets/');
    assert(fs.existsSync(resumeAliasPath), 'resume.pdf alias exists in public/assets/');

    if (fs.existsSync(resumePath)) {
      const stats = fs.statSync(resumePath);
      assert(stats.size > 50000, `Resume file size is realistic (>50KB, actual: ${stats.size} bytes)`);

      const buffer = fs.readFileSync(resumePath);
      const magic = buffer.slice(0, 5).toString('ascii');
      assert(magic === '%PDF-', `Resume starts with valid PDF magic bytes: "${magic}"`);
    }

    // Check App.tsx, DesktopSidebar.tsx, MobileHeader.tsx for resume links
    const appTsx = fs.readFileSync(path.join(PROJECT_ROOT, 'src/App.tsx'), 'utf-8');
    const desktopSidebarTsx = fs.readFileSync(path.join(PROJECT_ROOT, 'src/components/layout/DesktopSidebar.tsx'), 'utf-8');
    const mobileHeaderTsx = fs.readFileSync(path.join(PROJECT_ROOT, 'src/components/layout/MobileHeader.tsx'), 'utf-8');

    assert(
      desktopSidebarTsx.includes('Harsha_Matta_Resume.pdf') && desktopSidebarTsx.includes('download='),
      'DesktopSidebar provides resume download button with download attribute'
    );
    assert(
      mobileHeaderTsx.includes('Harsha_Matta_Resume.pdf') && mobileHeaderTsx.includes('download='),
      'MobileHeader provides resume download button with download attribute'
    );
    assert(
      appTsx.includes('Harsha_Matta_Resume.pdf'),
      'App.tsx includes resume link in 20-second recruiter brief'
    );
  });

  // ---------------------------------------------------------------------------
  // SUITE 8: Viewport Responsiveness & Layout Invariants
  // ---------------------------------------------------------------------------
  suite('8. Viewport Responsiveness & Layout Shell Invariants', () => {
    const desktopSidebarTsx = fs.readFileSync(path.join(PROJECT_ROOT, 'src/components/layout/DesktopSidebar.tsx'), 'utf-8');
    const mobileHeaderTsx = fs.readFileSync(path.join(PROJECT_ROOT, 'src/components/layout/MobileHeader.tsx'), 'utf-8');
    const appTsx = fs.readFileSync(path.join(PROJECT_ROOT, 'src/App.tsx'), 'utf-8');

    // Desktop sidebar
    assert(desktopSidebarTsx.includes('overflow-y-auto'), 'DesktopSidebar includes independent overflow-y-auto scroll container');
    assert(desktopSidebarTsx.includes('sticky top-0'), 'DesktopSidebar is sticky top-0');

    // Mobile header
    assert(mobileHeaderTsx.includes('sticky top-0'), 'MobileHeader is sticky top-0');
    assert(mobileHeaderTsx.includes('min-h-[44px]') && mobileHeaderTsx.includes('min-w-[44px]'), 'MobileHeader enforces 44px touch targets');

    // App layout
    assert(appTsx.includes('max-w-7xl'), 'App container bounded by max-w-7xl');
    assert(appTsx.includes('overflow-x-hidden'), 'App container prevents horizontal overflow with overflow-x-hidden');
    assert(appTsx.includes('grid-cols-1 md:grid-cols-2'), 'App layout adapts from single column to 2-column on tablet (md)');
  });

  // ---------------------------------------------------------------------------
  // FINAL SUMMARY
  // ---------------------------------------------------------------------------
  console.log(`\n======================================================`);
  console.log(`M2 CHALLENGER 2 EMPIRICAL TEST SUITE SUMMARY`);
  console.log(`======================================================`);
  console.log(`Total Assertions: ${totalTests}`);
  console.log(`Passed:           ${passedTests}`);
  console.log(`Failed:           ${failedTests}`);

  if (failedTests > 0) {
    console.error(`\nFAILURES SUMMARY (${failedTests}):`);
    failures.forEach((f, i) => {
      console.error(`[${i + 1}] ${f.message}`);
      if (Object.keys(f.details).length > 0) {
        console.error(`    Details: ${JSON.stringify(f.details)}`);
      }
    });
    process.exit(1);
  } else {
    console.log(`\nALL M2 CHALLENGER 2 EMPIRICAL ASSERTIONS PASSED!`);
    process.exit(0);
  }
}

run().catch(err => {
  console.error('Fatal execution error in challenge script:', err);
  process.exit(1);
});

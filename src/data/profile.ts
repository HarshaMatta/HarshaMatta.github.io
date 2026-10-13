/**
 * Authoritative Profile Data for Harsha Matta
 * Source: October 2026 Master Resume & Verified Educational Record
 */

import type { ProfileData } from '../types';

export const profile: ProfileData = {
  name: 'Harsha Matta',
  fullName: 'Harsha Matta',
  preferredName: 'Harsha',
  title: 'Applied Mathematics & Computer Science @ UNC Chapel Hill',
  headline: 'Systems Programmer, Quantitative Researcher & Native Apple Engineer',
  institution: 'University of North Carolina at Chapel Hill',
  shortInstitution: 'UNC Chapel Hill',
  degree: 'B.S. in Applied Mathematics & Computer Science',
  expectedGraduation: 'May 2028',
  location: 'Chapel Hill, NC',
  email: 'harsha.v.matta@gmail.com',
  phone: '(704) 441-8962',
  workAuthorization: 'US Citizen / Authorized to work in the US (No sponsorship required now or in future)',
  bioShort:
    'Undergraduate in Applied Mathematics and Computer Science at UNC Chapel Hill (Expected May 2028). Engineering high-performance C++ scientific simulations, local-first native Apple productivity suites, and empirical quantitative derivatives models.',
  bioFull: [
    'I am an undergraduate at the University of North Carolina at Chapel Hill pursuing a double major in Applied Mathematics and Computer Science (Expected May 2028). My work bridges pure mathematical modeling with low-level systems engineering.',
    'On the systems engineering side, I contribute upstream performance optimizations to deal.II—a massive C++ finite element library used for HPC numerical simulations worldwide—and engineer local-first, privacy-respecting native Apple software across iOS, iPadOS, and macOS using Swift, SwiftUI, AppKit, and App Intents.',
    'On the quantitative finance side, I construct empirical research pipelines analyzing multi-decade index derivatives data, investigating market fear overpricing, variance swap harvesting, and the structural dynamics of the volatility risk premium.'
  ],
  educationSummary:
    'B.S. in Applied Mathematics & Computer Science at University of North Carolina at Chapel Hill (Expected May 2028).',
  bioParagraphs: [
    'Undergraduate in Applied Mathematics and Computer Science at UNC Chapel Hill (Expected May 2028).',
    'Contributing upstream C++ performance optimizations to deal.II scientific finite element library.',
    'Engineering local-first Apple software and quantitative volatility risk research pipelines.'
  ],
  resumeUrl: '/assets/Harsha_Matta_Resume.pdf',
  resumeAliasUrl: '/assets/resume.pdf',
  disciplines: [
    'Native Apple Systems',
    'C++ Scientific Computing',
    'Quantitative Finance'
  ],
  social: {
    github: 'https://github.com/HarshaMatta',
    linkedin: 'https://linkedin.com/in/harshamatta',
    medium: 'https://medium.com/@harsha.v.matta'
  },
  socialLinks: [
    {
      label: 'GitHub',
      url: 'https://github.com/HarshaMatta',
      icon: 'Github',
      external: true
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/harshamatta',
      icon: 'Linkedin',
      external: true
    },
    {
      label: 'Medium',
      url: 'https://medium.com/@harsha.v.matta',
      icon: 'BookOpen',
      external: true
    },
    {
      label: 'Email',
      url: 'mailto:harsha.v.matta@gmail.com',
      icon: 'Mail',
      external: true
    }
  ],
  statusMessage: 'Open for Summer 2026/2027 Software Engineering, Systems & Quantitative Finance Opportunities'
};

export default profile;

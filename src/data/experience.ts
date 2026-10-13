/**
 * Authoritative Professional & Research Experience Data for Harsha Matta Portfolio
 * Sources: October 2026 Master Resume & Verified Open Source Contributions.
 */

import type { ExperienceItem } from '../types';

export const experience: ExperienceItem[] = [
  // ==========================================
  // EXPERIENCE 1: deal.II (Open Source C++)
  // ==========================================
  {
    id: 'dealii-contributor',
    role: 'Open Source Contributor',
    organization: 'deal.II Scientific Computing Library',
    period: 'Feb 2026 – Present',
    location: 'Remote',
    category: 'open_source',
    summary:
      'Contributing hot-path performance optimizations and numerical geometry robustness patches to an international high-performance C++ finite element framework used for large-scale scientific simulations (1.7k+ stars).',
    highlights: [
      'Merged PR #19327: Optimized hot-path property evaluation in InterpolatedUniformGridData::value() by caching grid-spacing increments (delta_x), eliminating redundant floating-point divisions across millions of quadrature evaluations in parallel MPI simulations.',
      'Merged PR #19370: Added assertion boundary checks to GridTools::affine_cell_approximation to catch non-hypercube geometries and prevent silent numerical divergence on unstructured mixed meshes.',
      'Active PR #19804: Stabilized real-to-unit cell affine approximations in Mapping::transform_real_to_unit_cell on distorted quadrilateral and hexahedral cells, ensuring robust initial guesses for Newton–Raphson iteration and preserving quadratic convergence.',
      'Participate actively in asynchronous upstream code review, adhere to strict C++20 modern standards, and run valgrind memory leak checks and regression test suites.'
    ],
    tags: [
      'C++20',
      'HPC',
      'Finite Element Methods',
      'MPI',
      'Numerical Analysis',
      'Open Source'
    ],
    verifiedPrs: [
      {
        prNumber: 19327,
        title: 'Optimize InterpolatedUniformGridData delta_x caching',
        url: 'https://github.com/dealii/dealii/pull/19327',
        status: 'merged',
        date: '2026-02-25',
        description: 'Cached delta_x grid spacing to eliminate repeated divisions in property evaluations.'
      },
      {
        prNumber: 19370,
        title: 'Add Assert to real_to_unit_cell_affine_approximation to catch non-hypercubes',
        url: 'https://github.com/dealii/dealii/pull/19370',
        status: 'merged',
        date: '2026-03-08',
        description: 'Added runtime assertions preventing numerical divergence on non-hypercube meshes.'
      },
      {
        prNumber: 19804,
        title: 'Fix real to unit cell affine approximation',
        url: 'https://github.com/dealii/dealii/pull/19804',
        status: 'in_review',
        date: '2026-05',
        description: 'Stabilized affine inversion on distorted cells to ensure quadratic Newton convergence.'
      }
    ]
  },

  // ==========================================
  // EXPERIENCE 2: CyberWIN (Software Engineering Intern)
  // ==========================================
  {
    id: 'cyberwin-internship',
    role: 'Software Engineering Intern & Marketer',
    organization: 'CyberWIN',
    period: 'Apr 2024 – May 2025',
    location: 'Monroe, NC',
    category: 'internship',
    summary:
      'Led development of an AI-driven compliance analysis feature and contributed to the CySAT cybersecurity compliance platform across the full SDLC.',
    highlights: [
      'Led a cross-functional development team building an AI-powered document analysis feature tailored to CMMC/NIST cybersecurity compliance standards on the CySAT platform.',
      'Participated across the full Software Development Life Cycle (SDLC), streamlining deployment releases, sprint planning, and feature documentation.',
      'Formulated technical product documentation and marketing assets to bridge developer progress with executive stakeholders.'
    ],
    tags: [
      'Python',
      'AI Document Analysis',
      'Cybersecurity Compliance',
      'CMMC / NIST',
      'SDLC',
      'Agile Sprints'
    ]
  },

  // ==========================================
  // EXPERIENCE 3: Unilever (Web Development Intern)
  // ==========================================
  {
    id: 'unilever-internship',
    role: 'Web Development Student Intern',
    organization: 'Unilever',
    period: 'Jul 2022',
    location: 'London, UK',
    category: 'student',
    summary:
      'Developed a website personalization prototype during an internal corporate hackathon, adhering to enterprise design standards and WCAG accessibility guidelines.',
    highlights: [
      'Engineered an interactive web personalization prototype under tight sprint constraints during an internal hackathon.',
      'Adhered strictly to WCAG accessibility guidelines and corporate responsive design patterns.',
      'Collaborated within an agile cross-functional sprint team, presenting the finished prototype to technical mentors.'
    ],
    tags: [
      'JavaScript',
      'Web Development',
      'WCAG Accessibility',
      'Agile Methodologies',
      'UI Prototyping'
    ]
  }
];

export default experience;

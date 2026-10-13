/**
 * Authoritative Education, Coursework & Skills Data for Harsha Matta Portfolio
 * Sources: October 2026 Master Resume & Verified Academic Transcripts.
 */

import type { EducationData } from '../types';

export const education: EducationData = {
  institution: 'University of North Carolina at Chapel Hill',
  degree: 'Bachelor of Science (B.S.)',
  majors: ['Applied Mathematics', 'Computer Science'],
  period: 'Aug 2025 – Present',
  expectedGraduation: 'May 2028',
  location: 'Chapel Hill, NC',
  coursework: [
    {
      category: 'Computer Science',
      courses: [
        {
          code: 'COMP 210',
          title: 'Data Structures',
          status: 'completed',
          description: 'Trees, heaps, graphs, hashing, sorting algorithms, dynamic programming, and complexity analysis in Java.'
        },
        {
          code: 'COMP 211',
          title: 'Systems Fundamentals',
          status: 'in_progress',
          description: 'Low-level systems programming in C, pointers, memory hierarchy, cache modeling, processes, virtual memory, and concurrency.'
        },
        {
          code: 'COMP 301',
          title: 'Foundations of Programming',
          status: 'in_progress',
          description: 'Object-oriented software architecture, design patterns, polymorphism, functional abstractions, and rigorous unit testing.'
        },
        {
          code: 'COMP 311',
          title: 'Computer Organization',
          status: 'completed',
          description: 'Digital logic design, instruction set architectures, CPU pipelining, memory systems, and machine-level representation.'
        },
        {
          code: 'COMP 455',
          title: 'Models of Languages and Computation',
          status: 'completed',
          description: 'Regular expressions, finite automata, context-free grammars, pushdown automata, Turing machines, and decidability.'
        }
      ]
    },
    {
      category: 'Mathematics',
      courses: [
        {
          code: 'MATH 347',
          title: 'Linear Algebra',
          status: 'in_progress',
          description: 'Vector spaces, linear transformations, matrices, determinants, eigenvalues/eigenvectors, spectral theorem, and inner product spaces.'
        },
        {
          code: 'MATH 233',
          title: 'Multivariable Calculus',
          status: 'completed',
          description: 'Three-dimensional analytic geometry, partial derivatives, directional derivatives, Lagrange multipliers, multiple integrals, and vector calculus (Green’s, Stokes’, and Divergence theorems).'
        },
        {
          code: 'MATH 381',
          title: 'Discrete Mathematics',
          status: 'completed',
          description: 'Propositional logic, set theory, functions, relations, mathematical induction, combinatorics, graph theory, and recurrence relations.'
        }
      ]
    }
  ],
  honors: [
    {
      title: 'UKMT Mathematics Challenge: 2× Gold & 1× Silver',
      organization: 'United Kingdom Mathematics Trust',
      year: '2022 – 2023',
      detail: 'Awarded 2× Gold in Intermediate Mathematical Challenge and 1× Silver in Senior Mathematical Challenge.'
    },
    {
      title: 'DECA State Career Development Conference (CDC) Qualifier',
      organization: 'DECA North Carolina',
      year: '2024',
      detail: 'Qualified for state-level competitive events in business finance and market analysis.'
    },
    {
      title: 'AP Scholar with Distinction',
      organization: 'College Board',
      year: '2024',
      detail: 'Granted for achieving exemplary scores across multiple Advanced Placement STEM and humanities examinations.'
    },
    {
      title: 'Duke of Edinburgh Award (Bronze & Silver)',
      organization: 'The Duke of Edinburgh’s International Award',
      year: '2021 – 2023',
      detail: 'Completed rigorous requirements across volunteering, skills, physical recreation, and multi-day wilderness expeditions.'
    }
  ],
  certifications: [
    {
      title: 'Financial Markets',
      issuer: 'Yale University / Coursera',
      detail: 'Comprehensive study of risk management, behavioral finance, options pricing, debt markets, and regulatory frameworks.'
    },
    {
      title: 'Intro to Model Context Protocol (MCP)',
      issuer: 'Anthropic',
      detail: 'Architectural specifications of client-server tool augmentation, context injection protocols, and agent schemas.'
    }
  ],
  skillCategories: [
    {
      category: 'Programming Languages',
      skills: ['Swift', 'C++20', 'Python', 'Java', 'Dart', 'JavaScript', 'SQL', 'LaTeX', 'HTML5 / CSS3']
    },
    {
      category: 'Apple & Native Systems',
      skills: [
        'SwiftUI',
        'AppKit',
        'UIKit',
        'Combine',
        'App Intents',
        'SwiftData',
        'CoreLocation (CLCircularRegion)',
        'MapKit',
        'PencilKit',
        'Vision OCR',
        'NSFilePresenter',
        'iOS Keychain Services',
        'Live Activities / Dynamic Island',
        'Widgets',
        'MenuBarExtra',
        'Handoff',
        'XCTest',
        'Apple Intelligence'
      ]
    },
    {
      category: 'Scientific Computing & HPC',
      skills: [
        'C++20',
        'MPI',
        'deal.II',
        'Finite Element Methods (FEM)',
        'Numerical Analysis',
        'Newton–Raphson Iteration',
        'Coordinate Inversion',
        'Hot-Path Grid Caching',
        'Memory Optimization'
      ]
    },
    {
      category: 'Quantitative Finance & Data Science',
      skills: [
        'Volatility Risk Premium (VRP)',
        'Black–Scholes-Merton Pricing',
        'Options Greeks (Δ, Γ, Θ, V, ρ)',
        'Variance Swaps',
        'Time-Series Alignment',
        'Regime Partitioning',
        'yfinance',
        'Pandas',
        'NumPy',
        'SciPy',
        'Plotly',
        'Streamlit'
      ]
    },
    {
      category: 'Developer Tools & Workflow',
      skills: [
        'Git / GitHub',
        'Figma',
        'Agile / Scrum',
        'SDLC',
        'Vite',
        'Tailwind CSS',
        'macOS / Linux Shell'
      ]
    }
  ],
  skills: {
    'Languages': ['Swift', 'C++20', 'Python', 'Java', 'Dart', 'JavaScript', 'SQL', 'LaTeX', 'HTML5 / CSS3'],
    'Apple & Native Systems': [
      'SwiftUI',
      'AppKit',
      'UIKit',
      'Combine',
      'App Intents',
      'SwiftData',
      'CoreLocation (CLCircularRegion)',
      'MapKit',
      'PencilKit',
      'Vision OCR',
      'NSFilePresenter',
      'iOS Keychain Services',
      'Live Activities / Dynamic Island',
      'Widgets',
      'MenuBarExtra',
      'Handoff',
      'XCTest',
      'Apple Intelligence'
    ],
    'Scientific Computing & HPC': [
      'C++20',
      'MPI',
      'deal.II',
      'Finite Element Methods (FEM)',
      'Numerical Analysis',
      'Newton–Raphson Iteration',
      'Coordinate Inversion',
      'Hot-Path Grid Caching',
      'Memory Optimization'
    ],
    'Quantitative Finance': [
      'Volatility Risk Premium (VRP)',
      'Black–Scholes-Merton Pricing',
      'Options Greeks (Δ, Γ, Θ, V, ρ)',
      'Variance Swaps',
      'Time-Series Alignment',
      'Regime Partitioning',
      'yfinance',
      'Pandas',
      'NumPy',
      'SciPy',
      'Plotly',
      'Streamlit'
    ],
    'Developer Tools & Workflow': [
      'Git / GitHub',
      'Figma',
      'Agile / Scrum',
      'SDLC',
      'Vite',
      'Tailwind CSS',
      'macOS / Linux Shell'
    ]
  }
};

export default education;

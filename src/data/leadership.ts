/**
 * Authoritative Campus Governance & Nonprofit Leadership Data for Harsha Matta Portfolio
 * Sources: October 2026 Master Resume & Institutional Appointment Records.
 */

import type { LeadershipItem } from '../types';

export const leadership: LeadershipItem[] = [
  // ==========================================
  // ROLE 1: UNC Special Task Force on AI
  // ==========================================
  {
    id: 'unc-ai-task-force',
    role: 'Task Force Member — Technical & Policy Track',
    organization: 'UNC Special Task Force on AI & Academic Affairs',
    period: 'Aug 2026 – Present',
    location: 'Chapel Hill, NC',
    summary:
      'Appointed by the UNC Student Government (Duncan Administration) and Office of the Chancellor to evaluate generative AI tools, student usage guidelines, and technological frameworks for academic research and pedagogy.',
    highlights: [
      'Advise Chief AI Officer, Provost, and senior university administration on student-centered AI usage guidelines, technological ethics, and academic integrity policy.',
      'Evaluate emerging generative AI models, campus tool licensing, and technical infrastructure for classroom adoption and campus-wide AI literacy.',
      'Formulate policy recommendations balancing rigorous academic standards with emerging educational technologies and research applications.'
    ],
    tags: ['AI Policy', 'Academic Governance', 'UNC Chapel Hill', 'Higher Ed Strategy'],
    metric: 'Advising Executive Administration & Chancellor'
  },

  // ==========================================
  // ROLE 2: Technospire Nonprofit
  // ==========================================
  {
    id: 'technospire',
    role: 'Founder & President',
    organization: 'Technospire (501(c)(3) Nonprofit CS Organization)',
    period: 'Mar 2024 – Jul 2025',
    location: 'Charlotte, NC',
    summary:
      'Founded a regional computer science nonprofit organization from the ground up, scaling to a 12-member executive board, organizing 3 regional hackathons, and delivering youth technical education.',
    highlights: [
      'Owned end-to-end execution of 3 regional hackathons engaging 130+ students across North Carolina: managed venue logistics, sponsor outreach, and judging.',
      'Maintained an active community newsletter with 192 subscribers covering tech opportunities.',
      'Authored and personally taught a structured Python programming curriculum to 30+ middle school students.',
      'Directed student developer teams delivering 4 production websites for local small businesses.'
    ],
    tags: ['Nonprofit Leadership', 'Hackathons', 'Python Curriculum', 'Web Dev', 'Mentorship'],
    metric: '130+ Participants · 12-Member Board · 4 Websites'
  },

  // ==========================================
  // ROLE 3: UNC Sangam
  // ==========================================
  {
    id: 'unc-sangam',
    role: 'Treasurer & Publicity Lead',
    organization: 'UNC Sangam (South Asian Cultural Organization)',
    period: 'Fall 2025 – Present',
    location: 'Chapel Hill, NC',
    summary:
      'Oversee financial budgeting, resource allocation, and digital marketing campaigns for one of UNC’s largest South Asian cultural organizations.',
    highlights: [
      'Manage budgeting, expense tracking, and financial planning across major campus events including Garba and Mock Shaadi.',
      'Directed and produced a viral promotional marketing video for Mock Shaadi that achieved over 12,000 views, driving record student engagement and attendance.',
      'Coordinate fund allocations and university reimbursement workflows to ensure cost-effective event operations at scale.'
    ],
    tags: ['Budget Oversight', 'Financial Planning', 'Digital Marketing', 'Video Production'],
    metric: '12,000+ Video Views · Major Campus Scale'
  },

  // ==========================================
  // ROLE 4: Technology Student Association (TSA)
  // ==========================================
  {
    id: 'tsa-weddington',
    role: 'Founder & President',
    organization: 'Technology Student Association (Weddington Chapter)',
    period: '2023 – 2025',
    location: 'Weddington, NC',
    summary:
      'Established the inaugural high school chapter, securing administrative approval and leading competitive STEM teams at regional and state conferences.',
    highlights: [
      'Built institutional buy-in from school administration and recruited founding membership base interested in STEM leadership.',
      'Represented chapter across competitive technology and software events.'
    ],
    tags: ['STEM Leadership', 'Chapter Founding', 'Student Governance']
  },

  // ==========================================
  // ROLE 5: Student Voice (Student Government)
  // ==========================================
  {
    id: 'student-voice-sutton',
    role: 'Class Representative',
    organization: 'Student Voice (Sutton Grammar School)',
    period: 'Mar 2020 – Jul 2023',
    location: 'London, UK',
    summary:
      'Represented cohort across an 8-month advocacy initiative, restoring off-campus lunch privileges and collaborating with local police on pedestrian traffic safety.',
    highlights: [
      'Surveyed student body and presented data-driven safety proposals to faculty and school administration.',
      'Collaborated with local police to establish new street safety protocols, resolving canteen overcrowding.'
    ],
    tags: ['Policy Advocacy', 'Data-Driven Proposals', 'Student Representation']
  }
];

export default leadership;

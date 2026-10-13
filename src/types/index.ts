/**
 * ==============================================================================
 * Harsha Matta Portfolio — Authoritative Domain Type Definitions
 * Milestone 2 Architecture Contract (src/types/index.ts)
 * ==============================================================================
 * Strict TypeScript domain definitions decoupling structured content (`src/data/`)
 * from layout shells, progressive-disclosure drawers, and presentation components.
 *
 * Strict Mode Guarantees:
 * - Zero `any` types.
 * - Strict null checks enabled.
 * - Exhaustive union discrimination.
 * ==============================================================================
 */

import type { ReactNode } from 'react';

// ==============================================================================
// 1. Theme & Design System Contracts
// ==============================================================================

/**
 * Supported color themes for the portfolio.
 * Matches Warm Paper Light (#FBF9F5) and Obsidian Dark (#0B0D0E).
 */
export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

// ==============================================================================
// 2. Navigation & Viewport Contracts
// ==============================================================================

/**
 * Canonical section identifiers for scrollspy, page landmarks, and deep anchors.
 */
export type SectionId =
  | 'now'
  | 'projects'
  | 'quant'
  | 'writing'
  | 'experience'
  | 'leadership'
  | 'education'
  | 'contact'
  | 'about';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

// ==============================================================================
// 3. Social & External Affordance Contracts
// ==============================================================================

export type SocialPlatform =
  | 'github'
  | 'linkedin'
  | 'medium'
  | 'email'
  | 'x'
  | 'website'
  | 'resume';

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
  external: boolean;
}

export type ActionType = 'app_store' | 'github' | 'live' | 'paper' | 'internal';

export interface ProjectAction {
  label: string;
  url: string;
  type?: ActionType;
  primary?: boolean;
  ariaLabel?: string;
}

// ==============================================================================
// 4. Media, Screenshots & Lightbox Contracts
// ==============================================================================

export interface ScreenshotMedia {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}

export interface LightboxMedia {
  src: string;
  alt: string;
  caption: string;
  title?: string;
  width?: number;
  height?: number;
}

export interface LightboxState {
  isOpen: boolean;
  activeMedia: LightboxMedia | null;
  triggerElement: HTMLElement | null;
}

export interface LightboxContextValue {
  openLightbox: (media: LightboxMedia, triggerElement?: HTMLElement | null) => void;
  closeLightbox: () => void;
  isOpen: boolean;
  activeMedia: LightboxMedia | null;
}

export interface LightboxProviderProps {
  children: ReactNode;
}

// ==============================================================================
// 5. Open Source Pull Request & Verification Contracts
// ==============================================================================

export type PrStatus = 'merged' | 'in_review';

export interface VerifiedPR {
  prNumber: number;
  title: string;
  url: string;
  status: PrStatus;
  date: string;
  description?: string;
  codeSnippet?: string;
  repository?: string;
}

export type VerifiedPr = VerifiedPR;

// ==============================================================================
// 6. Project & Technical Case Study Contracts
// ==============================================================================

export type ProjectCategory = 'apple' | 'hpc' | 'quant' | 'education';

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  description?: string;
}

export interface CaseStudyHighlight {
  title: string;
  detail: string;
  code?: string;
}

export interface ExtendedCaseStudy {
  overview: string;
  architecture: string[];
  technicalHighlights: CaseStudyHighlight[] | string[];
  caveatsOrChallenges?: string[];
  codeSnippets?: CodeSnippet[];
  diagram?: {
    svgPath: string;
    title: string;
    caption: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  flagship: boolean;
  category: ProjectCategory;
  appStoreId?: string;
  description: string;
  tags: string[];
  metrics?: string[];
  icon?: string;
  media?: ScreenshotMedia[];
  diagramSvg?: string;
  actions: ProjectAction[];
  verifiedPrs?: VerifiedPR[];
  caseStudy?: ExtendedCaseStudy;
  extendedCaseStudy?: ExtendedCaseStudy;
}

// ==============================================================================
// 7. Quantitative Derivatives & Empirical Finance Contracts
// ==============================================================================

export interface QuantEquation {
  name: string;
  latex: string;
  explanation: string;
  equation?: string;
  description?: string;
}

export type QuantMathEquation = QuantEquation;

export interface QuantParameter {
  name: string;
  symbol: string;
  valueOrDefinition: string;
  interpretation: string;
}

export interface QuantRegime {
  name: string;
  condition: string;
  behavior: string;
  riskLevel: 'low' | 'moderate' | 'severe';
}

export interface QuantProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category?: 'derivatives' | 'volatility' | 'pricing' | string;
  status?: string;
  description: string;
  mathFormulation?: string;
  equations?: QuantEquation[];
  parameters?: QuantParameter[];
  regimes?: QuantRegime[];
  caveats: string[];
  liveUrl?: string;
  githubUrl?: string;
  paperUrl?: string;
  repoUrl?: string;
  previewSvg?: string;
  metrics?: string[];
  tags: string[];
}

// ==============================================================================
// 8. Published Technical Writing Contracts
// ==============================================================================

export interface ArticleItem {
  id: string;
  title: string;
  topic: string;
  date: string;
  formattedDate?: string;
  url: string;
  hook: string;
  coverSvg: string;
  readTime: string;
  takeaways?: string[];
}

export interface WritingMetadata {
  totalImpressions: string;
  articlesCount: number;
  platform: string;
  profileUrl: string;
}

// ==============================================================================
// 9. Professional Experience & Leadership Contracts
// ==============================================================================

export interface LeadershipItem {
  id?: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  summary?: string;
  description?: string;
  highlights: string[];
  tags?: string[];
  metric?: string;
}

export interface ExperienceItem {
  id?: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  category?: 'open_source' | 'internship' | 'student';
  summary?: string;
  description?: string;
  highlights: string[];
  tags?: string[];
  technologies?: string[];
  verifiedPrs?: VerifiedPR[];
  link?: string;
}

// ==============================================================================
// 10. Education & Skills Inventory Contracts
// ==============================================================================

export interface CourseItem {
  code: string;
  title: string;
  status?: 'completed' | 'in_progress';
  description?: string;
}

export interface CourseCategory {
  category: string;
  courses: CourseItem[];
}

export interface HonorItem {
  title: string;
  organization: string;
  year: string;
  detail: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  detail: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export type SkillsMap = Record<string, string[]>;

export interface EducationData {
  institution: string;
  degree: string;
  majors: string[];
  period?: string;
  expectedGraduation: string;
  graduation?: string;
  location?: string;
  coursework: CourseCategory[] | string[];
  honors: HonorItem[] | string[];
  certifications: CertificationItem[] | string[];
  skillCategories?: SkillCategory[];
  skills?: SkillsMap;
  gpa?: string;
}

// ==============================================================================
// 11. Profile & Recruiter Summary Contracts
// ==============================================================================

export interface ProfileData {
  name: string;
  fullName?: string;
  preferredName?: string;
  headline?: string;
  title?: string;
  institution: string;
  shortInstitution?: string;
  degree: string;
  expectedGraduation: string;
  location: string;
  email: string;
  phone?: string;
  workAuthorization?: string;
  bioShort?: string;
  bioFull?: string[];
  educationSummary?: string;
  bioParagraphs?: string[];
  resumeUrl: string;
  resumeAliasUrl?: string;
  disciplines: string[];
  socialLinks: SocialLink[];
  social?: {
    github: string;
    linkedin: string;
    medium: string;
    email?: string;
  };
  statusMessage?: string;
  avatarUrl?: string;
}

// ==============================================================================
// 12. UI Component Props & State Contracts
// ==============================================================================

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'info'
  | 'accent'
  | 'outline';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

export interface ProjectCardProps {
  project: ProjectItem;
  onOpenCaseStudy?: (project: ProjectItem) => void;
  onOpenLightbox?: (media: ScreenshotMedia, trigger: HTMLElement) => void;
}

export interface QuantCardProps {
  project: QuantProjectItem;
  onOpenLightbox?: (media: ScreenshotMedia, trigger: HTMLElement) => void;
}

export interface ArticleCardProps {
  article: ArticleItem;
}

export interface DesktopSidebarProps {
  activeSection: string;
  profile?: ProfileData;
  navItems?: NavItem[];
}

export interface MobileHeaderProps {
  activeSection: string;
  profile?: ProfileData;
  navItems?: NavItem[];
}

export interface FooterProps {
  profile?: ProfileData;
}

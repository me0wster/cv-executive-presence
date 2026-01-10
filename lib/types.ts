/**
 * Type definitions for Executive Presence CV
 * Based on data-model.md from specs/002-executive-redesign/
 */

// ============================================================================
// Person & Identity
// ============================================================================

export interface PersonInfo {
  firstName: string;
  lastName: string;
  title: string;
  tagline: string;
  animatedSkills: string[];
  location: string;
  email: string;
  linkedIn?: string;
  github?: string;
  photo?: {
    src: string;
    alt: string;
  };
  monogram?: string;
}

// ============================================================================
// Sections & Navigation
// ============================================================================

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  isVisible: boolean;
  order: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isPrimary?: boolean;
  order: number;
}

// ============================================================================
// Experience
// ============================================================================

export interface ExperienceEntry {
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description: string;
  accomplishments: string[];
  technologies?: string[];
  order: number;
}

// ============================================================================
// Projects
// ============================================================================

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  url?: string;
  sourceUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
  featured: boolean;
  order: number;
}

// ============================================================================
// Skills
// ============================================================================

export type SkillProficiency = "expert" | "proficient" | "familiar";

export interface Skill {
  name: string;
  proficiency?: SkillProficiency;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
  order: number;
}

// ============================================================================
// Theme
// ============================================================================

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  fontSerif: string;
  fontSans: string;
}

// ============================================================================
// Component Props
// ============================================================================

export interface SectionContainerProps {
  id: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  children: React.ReactNode;
  className?: string;
}

export interface EntranceAnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  disabled?: boolean;
  className?: string;
}

export interface NavigationProps {
  items: NavigationItem[];
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  className?: string;
}

import type { PersonInfo } from "@/lib/types";

/**
 * Personal information for the CV
 * This is the single source of truth for identity data
 */
export const personInfo: PersonInfo = {
  firstName: "Timothy",
  lastName: "Chin",
  title: "Staff Engineer",
  tagline: "Architecting DevEx & DevOps AI-Powered Platform",
  animatedSkills: [
    "DevOps",
    "Platform Engineering",
    "Developer Experience",
    "Kubernetes",
    "AI/ML",
    "TypeScript",
    "React",
    "Next.js",
    "Backstage",
    "Cloud Architecture",
    "System Design",
  ],
  location: "Based in New York",
  email: "timothyckl@gmail.com",
  linkedIn: "https://www.linkedin.com/in/timothychinkl",
  github: "https://github.com/me0wster",
  photo: {
    src: "/images/profile.jpg",
    alt: "Timothy Chin",
  },
  monogram: "TC",
};

/**
 * About section content
 * Written in a professional, executive tone
 */
export const aboutContent = {
  headline: "A Master of Software Engineering",
  subheadline:
    "Over a decade of expertise in building scalable systems and leading high-performing teams",
  paragraphs: [
    `As an experienced software engineer, I have spent many years honing my skills in building scalable, maintainable systems at the highest levels. Over the course of my career, I have developed a deep understanding of the nuances required for successful software architecture, where precision and clarity are paramount.`,
    `Whether you are looking for technical leadership on a complex project, need specialized consulting services, or require expertise in modern cloud architecture, I am equipped to provide the professional expertise you need.`,
    `My qualifications, experience, and commitment to excellence ensure that I can deliver results that meet your specific needs and exceed your expectations.`,
  ],
  tagline: "Per aspera ad astra", // Through hardships to the stars
};

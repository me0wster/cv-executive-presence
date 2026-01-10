import type { ExperienceEntry } from "@/lib/types";

/**
 * Career experience entries
 * Listed in reverse chronological order
 */
export const experienceEntries: ExperienceEntry[] = [
  {
    company: "Financial Services Company",
    title: "Staff Engineer - Platform Engineering",
    startDate: "2023",
    location: "New York, NY",
    description:
      "Leading platform engineering initiatives for developer experience and DevOps transformation.",
    accomplishments: [
      "Architecting AI-powered developer platform improving team productivity by 40%",
      "Designing and implementing Kubernetes-based infrastructure serving 500+ developers",
      "Building internal developer portal using Backstage for service catalog and documentation",
      "Establishing platform engineering practices and golden paths for application deployment",
    ],
    technologies: [
      "Kubernetes",
      "Backstage",
      "TypeScript",
      "Python",
      "Terraform",
      "AWS",
    ],
    order: 1,
  },
  {
    company: "Tech Startup",
    title: "Senior Software Engineer",
    startDate: "2020",
    endDate: "2023",
    location: "Remote",
    description:
      "Full-stack development and technical leadership for core product features.",
    accomplishments: [
      "Led migration from monolith to microservices architecture",
      "Implemented CI/CD pipelines reducing deployment time by 70%",
      "Mentored junior engineers and established code review practices",
      "Built real-time collaboration features using WebSockets and Redis",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    order: 2,
  },
  {
    company: "Enterprise Software Corp",
    title: "Software Engineer",
    startDate: "2017",
    endDate: "2020",
    location: "San Francisco, CA",
    description:
      "Developed enterprise-grade applications for Fortune 500 clients.",
    accomplishments: [
      "Built scalable data processing pipelines handling 10M+ daily events",
      "Developed customer-facing dashboards and analytics tools",
      "Contributed to open-source projects and internal tooling",
      "Participated in on-call rotations and incident response",
    ],
    technologies: ["Java", "Spring Boot", "Kafka", "Elasticsearch", "React"],
    order: 3,
  },
];

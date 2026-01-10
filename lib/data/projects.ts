import type { ProjectEntry } from "@/lib/types";

/**
 * Featured projects and portfolio items
 */
export const projectEntries: ProjectEntry[] = [
  {
    id: "developer-portal",
    title: "Developer Portal",
    description:
      "Internal developer portal built with Backstage for service catalog, documentation, and golden paths.",
    longDescription:
      "A comprehensive developer platform that centralizes service ownership, API documentation, and deployment workflows. Features include automated service scaffolding, integration with CI/CD pipelines, and real-time service health monitoring.",
    technologies: [
      "Backstage",
      "TypeScript",
      "React",
      "PostgreSQL",
      "Kubernetes",
    ],
    featured: true,
    order: 1,
  },
  {
    id: "ai-code-assistant",
    title: "AI Code Assistant",
    description:
      "LLM-powered coding assistant integrated into the development workflow for code review and suggestions.",
    longDescription:
      "An AI-powered tool that provides intelligent code suggestions, automated code reviews, and documentation generation. Built with privacy-first approach using self-hosted models.",
    technologies: ["Python", "LangChain", "OpenAI", "FastAPI", "Redis"],
    featured: true,
    order: 2,
  },
  {
    id: "infrastructure-as-code-templates",
    title: "Infrastructure as Code Templates",
    description:
      "Reusable Terraform modules and Kubernetes configurations for standardized infrastructure deployment.",
    technologies: ["Terraform", "Kubernetes", "AWS", "Helm"],
    featured: true,
    order: 3,
  },
  {
    id: "real-time-analytics-dashboard",
    title: "Real-time Analytics Dashboard",
    description:
      "High-performance dashboard for monitoring application metrics and business KPIs.",
    technologies: ["React", "D3.js", "WebSockets", "ClickHouse"],
    featured: true,
    order: 4,
  },
];

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): ProjectEntry[] {
  return projectEntries
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);
}

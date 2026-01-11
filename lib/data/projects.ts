import type { ProjectEntry } from "@/lib/types";

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
    id: "real-time-analytics-dashboard",
    title: "Real-time Analytics Dashboard",
    description:
      "High-performance dashboard for monitoring Developer and DORA metrics",
    technologies: ["React", "DevLake"],
    featured: true,
    order: 3,
  },
  {
    id: "ai-sdk-provider",
    title: "Watsonx ai-sdk Provider",
    description:
      "Building a LLM SDK Provider for ai-sdk to support IBM's Watsonx AI models.",
    technologies: ["TypeScript", "ai-sdk"],
    sourceUrl: "https://github.com/me0wster/watsonx-ai-provider",
    sourceType: "github",
    featured: true,
    order: 4,
  },
];

export function getFeaturedProjects(): ProjectEntry[] {
  return projectEntries
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);
}

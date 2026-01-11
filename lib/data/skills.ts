import type { SkillCategory } from "@/lib/types";

/**
 * Skills organized by category
 * Proficiency levels: expert, proficient, familiar
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "platform",
    name: "Platform Engineering",
    skills: [
      { name: "ArgoCD", proficiency: "proficient" },
      { name: "Backstage", proficiency: "expert" },
      { name: "Docker", proficiency: "expert" },
      { name: "Helm", proficiency: "proficient" },
      { name: "Kubernetes", proficiency: "expert" },
      { name: "OpenTelemetry", proficiency: "proficient" },
      { name: "Terraform", proficiency: "expert" },
    ],
    order: 1,
  },
  {
    id: "cloud",
    name: "Cloud & Infrastructure",
    skills: [
      { name: "AWS", proficiency: "expert" },
      { name: "GCP", proficiency: "proficient" },
      { name: "Azure", proficiency: "familiar" },
    ],
    order: 2,
  },
  {
    id: "languages",
    name: "Languages & Frameworks",
    skills: [
      { name: "Bash Scripting", proficiency: "proficient" },
      { name: "Go", proficiency: "proficient" },
      { name: "Java", proficiency: "proficient" },
      { name: "Next.js", proficiency: "expert" },
      { name: "Node.js", proficiency: "expert" },
      { name: "Python", proficiency: "expert" },
      { name: "React", proficiency: "expert" },
      { name: "TypeScript", proficiency: "expert" },
    ],
    order: 3,
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    skills: [
      { name: "ai-sdk", proficiency: "expert" },
      { name: "LangChain", proficiency: "proficient" },
      { name: "Context & Prompt Engineering", proficiency: "proficient" },
      {
        name: "LLM Compliance, Governance & Ethics",
        proficiency: "proficient",
      },
      { name: "MCP (Model Context Protocol)", proficiency: "expert" },
      { name: "RAG", proficiency: "proficient" },
      { name: "Vector Databases", proficiency: "proficient" },
    ],
    order: 4,
  },
  {
    id: "practices",
    name: "Practices & Methodologies",
    skills: [
      { name: "DevOps", proficiency: "expert" },
      { name: "CI/CD", proficiency: "expert" },
      { name: "Agile/Scrum", proficiency: "expert" },
      { name: "System Design", proficiency: "expert" },
      { name: "Technical Leadership", proficiency: "expert" },
    ],
    order: 5,
  },
  {
    id: "certifications",
    name: "Certifications",
    skills: [
      {
        name: "Certified Backstage Associate (Exam Developer)",
        proficiency: "expert",
      },
      {
        name: "Certified Cloud Native Platform Engineering Associate (CNPA)",
        proficiency: "expert",
      },
      {
        name: "GitLab Professional Services Engineer",
        proficiency: "expert",
      },
      {
        name: "AWS Solutions Architect Associate",
        proficiency: "expert",
      },
    ],
    order: 6,
  },
];

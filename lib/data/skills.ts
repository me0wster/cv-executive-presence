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
      { name: "Ansible", proficiency: "proficient" },
      { name: "ArgoCD", proficiency: "proficient" },
      { name: "Backstage", proficiency: "expert" },
      { name: "Crossplane", proficiency: "proficient" },
      { name: "Docker", proficiency: "expert" },
      { name: "Helm", proficiency: "proficient" },
      { name: "Kubernetes", proficiency: "expert" },
      { name: "OpenTelemetry", proficiency: "proficient" },
      { name: "Terraform/Tofu", proficiency: "expert" },
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
      { name: "Bash", proficiency: "proficient" },
      { name: "Go", proficiency: "proficient" },
      { name: "Java", proficiency: "proficient" },
      { name: "Next.js", proficiency: "expert" },
      { name: "Node.js", proficiency: "proficient" },
      { name: "Python", proficiency: "expert" },
      { name: "React", proficiency: "proficient" },
      { name: "TypeScript", proficiency: "proficient" },
    ],
    order: 3,
  },
  {
    id: "ai-ml",
    name: "Generative AI",
    skills: [
      { name: "ai-sdk", proficiency: "expert" },
      { name: "LangChain", proficiency: "proficient" },
      { name: "Context Engineering", proficiency: "proficient" },
      { name: "Prompt Engineering", proficiency: "proficient" },
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
      { name: "Engineering Leadership", proficiency: "expert" },
      { name: "Mentorship", proficiency: "expert" },
      { name: "Technical Leadership", proficiency: "expert" },
      { name: "DevOps", proficiency: "expert" },
      { name: "CI/CD", proficiency: "expert" },
      { name: "Agile/Scrum", proficiency: "expert" },
      { name: "System Design", proficiency: "expert" },
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

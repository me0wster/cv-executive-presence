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
      { name: "Kubernetes", proficiency: "expert" },
      { name: "Docker", proficiency: "expert" },
      { name: "Terraform", proficiency: "expert" },
      { name: "Backstage", proficiency: "expert" },
      { name: "ArgoCD", proficiency: "proficient" },
      { name: "Helm", proficiency: "proficient" },
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
      { name: "Cloudflare", proficiency: "proficient" },
    ],
    order: 2,
  },
  {
    id: "languages",
    name: "Languages & Frameworks",
    skills: [
      { name: "TypeScript", proficiency: "expert" },
      { name: "Python", proficiency: "expert" },
      { name: "Go", proficiency: "proficient" },
      { name: "React", proficiency: "expert" },
      { name: "Next.js", proficiency: "expert" },
      { name: "Node.js", proficiency: "expert" },
    ],
    order: 3,
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    skills: [
      { name: "LLM Integration", proficiency: "proficient" },
      { name: "Prompt Engineering", proficiency: "proficient" },
      { name: "MLOps", proficiency: "familiar" },
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
      { name: "Technical Leadership", proficiency: "proficient" },
    ],
    order: 5,
  },
];

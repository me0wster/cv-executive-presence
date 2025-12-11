import { SectionFooter, SectionHeader } from "./section-wrapper";

export function ProjectsSection() {
  const projects = [
    {
      name: "Multi clustered Kubernetes solutions",
      tech: "Kubernetes, AWS, ArgoCD, Terraform, Helm, Prometheus, Grafana",
      description:
        "Designed and implemented multi, high availability Kubernetes cluster solution, orchestrated with ArgoCD with GitOps principals in mind around our Internal Developer Platform (IDP) offering different classes of server pricing, network topologies and applications to significantly reduce costs",
    },
    {
      name: "GenAI Chatbot for Venue.sh",
      tech: "ai-sdk (openai, anthropic, gemini), Backstage, Internal Developer Portal (IDP)",
      description:
        "Building a Generative AI system that integrates with the Internal Developer Portal (IDP) (Venue.sh) turning it from a static information hub into an interactive, conversational hub with context about your CI/CD practices. Includes retrieval-augmented generation (RAG) techniques and model control protocols (MCPs) to ensure enhanced data utilization and system performance.",
    },
    {
      name: "Enterprise GitLab Migration",
      tech: "GitLab, Jenkins, SVN, CI/CD",
      description:
        "Leading a team of 5 consultants to migrate 20 years of legacy projects from SVN to GitLab for a major financial institution, rebuilding Jenkins pipelines and modernizing CI/CD workflows. Collaborated with 10 cross-functional customer teams to ensure seamless integration and adoption. Served as the principal DevOps consultant driving enterprise-wide modernization initiatives.",
    },
    {
      name: "Multi-Brand SPA Environment Rollout",
      tech: "Nx, Amazon ECS, Netlify, Dev-Staging-Prod",
      description:
        "Led the rollout of a full Dev-Staging-Prod environment supporting 27 brand single-page applications built with Nx. Orchestrated a rapid migration from Netlify to Amazon ECS in just two weeks in response to strategic changes. Partnered with software engineering leadership to ensure scalability, maintainability, and delivery excellence.",
    },
  ];

  return (
    <div className="space-y-4 text-sm">
      <SectionHeader title="PROJECTS" />
      {projects.map((project, idx) => (
        <div key={idx} className="pl-2 space-y-1">
          <div className="text-[#cdd6f4]">
            <span className="text-[#a6e3a1]">[{idx + 1}]</span>
            <span className="pl-3 font-bold">{project.name}</span>
          </div>
          <div className="pl-7 space-y-1">
            <div className="text-[#a6adc8]">{project.description}</div>
            <div className="text-[#7f849c] text-xs">TECH: {project.tech}</div>
          </div>
        </div>
      ))}
      <SectionFooter />
    </div>
  );
}

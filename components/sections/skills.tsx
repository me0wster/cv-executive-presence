import { SectionFooter, SectionHeader } from "./section-wrapper";

export function SkillsSection() {
  const skillCategories = [
    {
      category: "CLOUD & DEVOPS",
      skills: [
        "AWS (EC2, EKS, ECS, Lambda, S3, CloudWatch, VPC)",
        "Kubernetes (multi-cluster HA architectures, cost optimization, network topology)",
        "Docker",
        "Terraform",
        "CloudFormation",
        "Ansible",
        "GitLab CI/CD",
        "GitHub Actions",
        "GitOps workflows",
      ],
    },
    {
      category: "OBSERVABILITY & MONITORING",
      skills: [
        "OpenTelemetry (large-scale log/metrics ingestion, distributed tracing, observability)",
        "Alert routing and noise reduction",
        "On-call system design (SRE)",
        "Prometheus",
        "Grafana",
        "Signoz",
      ],
    },
    {
      category: "BACKEND & SERVICES",
      skills: [
        "Node (Javascript/Typescript)",
        "Python (automation, backend services)",
        "Java",
        "RESTful APIs",
        "Microservices architecture",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "DynamoDB",
      ],
    },
    {
      category: "PLATFORM ENGINEERING & DEVEX",
      skills: [
        "Backstage (Certified Associate) (Exam Creator)",
        "Internal Developer Platforms (IDP)",
        "Self-service infrastructure",
        "Developer experience optimization",
        "CI/CD pipeline optimization (5x improvement)",
      ],
    },
  ];

  return (
    <div className="space-y-3 text-sm">
      <SectionHeader title="SKILLS" />
      <div className="pl-2 space-y-4">
        {skillCategories.map((cat, idx) => (
          <div key={idx}>
            <div className="text-[#a6e3a1] mb-2">{cat.category}:</div>
            <div className="pl-4 flex flex-wrap gap-2">
              {cat.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[#cdd6f4] border border-[#45475a] bg-[#313244] px-2 py-1 text-xs rounded-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <SectionFooter />
    </div>
  );
}

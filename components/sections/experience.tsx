import { SectionFooter, SectionHeader } from "./section-wrapper";

export function ExperienceSection() {
  const experiences = [
    {
      role: "Engineering Team Lead / Staff Engineer",
      company: "Venue.sh",
      period: "Mar 2023 - Present",
      description: [
        "Architected the technical vision for the Venue.sh platform, defining both internal and external technology stacks to ensure a seamless, scalable user experience",
        "Leading and mentoring a cross-functional team of 10 software and DevOps engineers, driving alignment with overall business objectives and technical excellence. Guiding team members in their career development paths while helping the engineering team continuously deliver through building a robust and performant CI/CD pipeline.",
        "Building a Generative AI system that integrates with the Internal Developer Portal (IDP) (Venue.sh) turning it from a static information hub into an interactive, conversational hub with context about your CI/CD practices",
        "Designed and implemented multi, high availability Kubernetes cluster solutions around our Internal Developer Platform (IDP) integrating different classes of server pricing, network topologies and applications to significantly reduce costs",
        "Designed and implemented a scalable Opentelemetry solution that ingests logs and metrics while also sending alerts to appropriate channels for alerting & consumption",
        "Engage closely with product and business teams to shape product vision and drive successful market integrations. Providing feedback as part of the Initiative, UX and research process.",
        "Manage a live AI platform instance to deploy Retrieval-Augmented Generation (RAG) techniques and implement Model Control Protocols (MCPs), ensuring enhanced data utilization and system performance.",
        "Mentored engineers across DevOps, backend, and platform disciplines, promoting technical ownership and growth",
      ],
    },
    {
      role: "Principal DevOps Consultant",
      company: "Adaptavist",
      period: "Apr 2021 - Mar 2023",
      description: [
        "Spearheaded technical solution design and project strategy for top new and existing logo clients, breaking down silos and implementing new processes to improve organizational agility.",
        "Advised on integrations and platform scalability, ensuring that technical solutions aligned with long-term business strategies. Working with account managers and project managers to not only deliver existing requirements but also expand into different areas of the existing relationship.",
        "Served as the subject matter expert, communicating complex technical concepts to executive leadership and cross-functional teams. Helping the teams across the organization and roles understand the end goal through DevOps principles of people, processes and tools.",
        "Leading a rapid transition from SaaS hosting to AWS for key customers, delivering operational readiness within two weeks and achieving cost savings exceeding $100K",
      ],
    },
    {
      role: "DevOps Architect",
      company: "ConnectALL",
      period: "Jun 2020 - Apr 2021",
      description: [
        "Transformed monolithic Java legacy applications into a containerized solution using Docker and Kubernetes reducing the build and deployment time by 5x",
        "Managed a dual-role team, integrating DevOps and IT operational practices to ensure high-quality, scalable deployments across multiple environments",
        "Working and coordinating with multiple colleagues around the world in shaping the infrastructure of both cloud and on-prem servers and infrastructure",
      ],
    },
    {
      role: "Senior Developer & DevOps Consultant",
      company: "Go2Group",
      period: "Mar 2013  - Jun 2020",
      description: [
        "Developed and implemented robust solutions across multiple platforms, honing expertise in cloud technologies, integration solutions, and agile processes.",
        "Implementing CI/CD solutions for different customers",
        "Built foundational skills in client consulting, systems integration, and process optimization that inform current strategic decision-making.",
      ],
    },
  ];

  return (
    <div className="space-y-4 text-sm">
      <SectionHeader title="WORK EXPERIENCE" />
      {experiences.map((exp, idx) => (
        <div key={idx} className="pl-2 space-y-2">
          <div>
            <div className="text-[#cdd6f4] flex items-start justify-between">
              <span className="text-[#a6e3a1]">[{idx + 1}]</span>
              <div className="flex-1 pl-3">
                <div className="font-bold">{exp.role}</div>
                <div className="text-[#a6adc8]">
                  {exp.company} • {exp.period}
                </div>
              </div>
            </div>
          </div>
          <div className="pl-7 space-y-1">
            {exp.description.map((desc, i) => (
              <div key={i} className="text-[#a6adc8] flex gap-2">
                <span className="text-[#7f849c]">•</span>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <SectionFooter />
    </div>
  );
}

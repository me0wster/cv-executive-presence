import { SectionFooter, SectionHeader } from "./section-wrapper";

export function AboutSection() {
  return (
    <div className="space-y-3 text-sm">
      <SectionHeader title="ABOUT" />
      <div className="space-y-3 text-[#cdd6f4] pl-2">
        <div>
          <div className="text-[#a6e3a1] mb-1">NAME:</div>
          <div className="pl-4">Your Name</div>
        </div>
        <div>
          <div className="text-[#a6e3a1] mb-1">TITLE:</div>
          <div className="pl-4">
            TECHNICAL LEADER | Staff Engineer | Architecting DevEx & DevOps
            AI-Powered Platform
          </div>
        </div>
        <div>
          <div className="text-[#a6e3a1] mb-1">BIO:</div>
          <div className="pl-4 text-[#a6adc8] leading-relaxed">
            Innovative engineering leader with 12+ years of experience across
            DevOps, platform engineering, and developer experience (DevEx). I
            specialize in architecting scalable, cost-effective, multi-cloud
            platforms while building internal products that streamline developer
            workflows and boost team productivity. As a technical leader, I lead
            cross-functional teams and design DevEx-focused solutions that
            reduce friction, increase velocity, and align engineering outcomes
            with business goals.
            <br />
            <br />
            Passionate about AI, I integrate cutting-edge tools and frameworks
            into daily workflows to optimize coding, reporting, and technical
            decision-making. I am also spearheading our AI initiatives;
            architecting and implementing our agentic, generative AI solution
            into Venue.sh that transforms our developer portal into an
            intelligent, conversational interface. I bring a strategic mindset,
            hands-on technical leadership, and a proven track record of
            delivering impact across complex engineering ecosystems.
          </div>
        </div>
        <div>
          <div className="text-[#a6e3a1] mb-1">LOCATION:</div>
          <div className="pl-4">New York</div>
        </div>
      </div>
      <SectionFooter />
    </div>
  );
}

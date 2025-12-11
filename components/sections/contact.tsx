import { SectionFooter, SectionHeader } from "./section-wrapper";

export function ContactSection() {
  return (
    <div className="space-y-3 text-sm">
      <SectionHeader title="CONTACT" />
      <div className="pl-2 space-y-3">
        <div className="text-[#cdd6f4]">
          <div className="text-[#a6e3a1] mb-2">GET IN TOUCH:</div>
          <div className="pl-4 space-y-2">
            <div className="flex gap-3">
              <span className="text-[#7f849c] w-20">EMAIL:</span>
              <span className="text-[#89b4fa]">
                timothyckl.interview@gmail.com
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#7f849c] w-20">GITHUB:</span>
              <span className="text-[#89b4fa]">github.com/me0wster</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#7f849c] w-20">LINKEDIN:</span>
              <span className="text-[#89b4fa]">
                linkedin.com/in/timothychinkl
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#7f849c] w-20">WEBSITE:</span>
              <span className="text-[#89b4fa]">me0wster.com</span>
            </div>
          </div>
        </div>
      </div>
      <SectionFooter />
    </div>
  );
}

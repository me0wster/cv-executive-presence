import { SectionFooter, SectionHeader } from "./section-wrapper";

export function EducationSection() {
  return (
    <div className="space-y-3 text-sm">
      <SectionHeader title="EDUCATION" />
      <div className="pl-2 space-y-4">
        <div>
          <div className="text-[#cdd6f4]">
            <span className="text-[#a6e3a1]">[1]</span>
            <span className="pl-3 font-bold">
              BSc (Hons) Business Systems Information, Information Technology
            </span>
          </div>
          <div className="pl-7 text-[#a6adc8]">
            HELP University College • 2004 - 2007
          </div>
          <div className="pl-7 text-[#7f849c] text-xs mt-1">GPA: 3.8/4.0</div>
        </div>
        <div>
          <div className="text-[#cdd6f4]">
            <span className="text-[#a6e3a1]">[2]</span>
            <span className="pl-3 font-bold">
              Relevant Certifications & Courses
            </span>
          </div>
          <div className="pl-7 space-y-1 mt-2">
            <div className="text-[#a6adc8] flex gap-2">
              <span className="text-[#7f849c]">•</span>
              <span>AWS Solutions Architect Associate</span>
            </div>
            <div className="text-[#a6adc8] flex gap-2">
              <span className="text-[#7f849c]">•</span>
              <span>Certified Backstage Associate (Exam Creator)</span>
            </div>
            <div className="text-[#a6adc8] flex gap-2">
              <span className="text-[#7f849c]">•</span>
              <span>
                Certified Cloud Native Platform Engineering Associate (CNPA)
              </span>
            </div>
            <div className="text-[#a6adc8] flex gap-2">
              <span className="text-[#7f849c]">•</span>
              <span>GitLab Professional Services Engineer</span>
            </div>
          </div>
        </div>
      </div>
      <SectionFooter />
    </div>
  );
}

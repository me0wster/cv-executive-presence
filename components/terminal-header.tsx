export function TerminalHeader() {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#f38ba8] border border-[#f38ba8]" />
          <div className="w-3 h-3 rounded-full bg-[#f9e2af] border border-[#f9e2af]" />
          <div className="w-3 h-3 rounded-full bg-[#a6e3a1] border border-[#a6e3a1]" />
        </div>
        <div className="text-[#a6adc8] text-sm">
          bash — resume - Timothy Chin
        </div>
      </div>
      <div className="border border-[#45475a] rounded-md">
        <div className="bg-[#181825] px-3 py-1.5 border-b border-[#45475a]">
          <div className="text-xs text-[#a6adc8]">~/portfolio/resume</div>
        </div>
      </div>
    </div>
  );
}

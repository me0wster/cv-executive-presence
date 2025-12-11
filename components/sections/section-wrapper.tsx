export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center text-[#7f849c] pb-2">
      <span className="mr-1">┌─</span>
      <span className="text-[#89b4fa] font-bold mx-2">{title}</span>
      <span className="flex-1 border-t border-dashed border-[#45475a]" />
      <span className="ml-1">┐</span>
    </div>
  );
}

export function SectionFooter() {
  return (
    <div className="flex items-center text-[#585b70] pt-2">
      <span className="mr-1">└</span>
      <span className="flex-1 border-t border-dashed border-[#45475a]" />
      <span className="ml-1">┘</span>
    </div>
  );
}

interface EditorialChipProps {
  num: string;
  label: string;
  title: string;
  href: string;
}

export function EditorialChip({ num, label, title, href }: EditorialChipProps) {
  return (
    <a href={href} className="world-chip group">
      <span className="world-num">{num}</span>
      <span>
        <b>{label}</b>
        <p className="transition-colors group-hover:text-[var(--world-bone)]">
          {title}
        </p>
      </span>
    </a>
  );
}

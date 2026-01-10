const commands = [
  { cmd: "about", desc: "Display personal information" },
  { cmd: "experience", desc: "Show work experience" },
  { cmd: "skills", desc: "List technical skills" },
  { cmd: "projects", desc: "Display notable projects" },
  { cmd: "contact", desc: "Show contact information" },
  { cmd: "help", desc: "Show available commands" },
  { cmd: "clear", desc: "Clear the terminal" },
];

const shortcuts = [
  { key: "Ctrl+L", desc: "Clear terminal" },
  { key: "Ctrl+K", desc: "Show help" },
  { key: "↑ / ↓", desc: "Navigate command history" },
];

export function HelpSection({ onCommand }: { onCommand: (cmd: string) => void }) {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <div className="text-foreground border-b border-border pb-2 mb-3">
          Available Commands:
        </div>
        {commands.map((cmd) => (
          <button
            key={cmd.cmd}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCommand(cmd.cmd);
            }}
            className="flex w-full items-center gap-4 text-left text-(--ctp-subtext1) hover:text-(--terminal-yellow) transition-colors cursor-pointer"
          >
            <span className="text-(--terminal-green) w-24 underline decoration-dotted">
              {cmd.cmd}
            </span>
            <span className="text-(--ctp-overlay0)">—</span>
            <span>{cmd.desc}</span>
          </button>
        ))}
      </div>
      <div>
        <div className="text-foreground border-b border-border pb-2 mb-3">
          Keyboard Shortcuts:
        </div>
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.key}
            className="flex items-center gap-4 text-(--ctp-subtext1)"
          >
            <span className="text-(--terminal-blue) w-24 font-bold">
              {shortcut.key}
            </span>
            <span className="text-(--ctp-overlay0)">—</span>
            <span>{shortcut.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

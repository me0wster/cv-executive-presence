"use client";

import { useState, useEffect } from "react";
import { Terminal } from "@/components/terminal";
import { TerminalHeader } from "@/components/terminal-header";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="h-screen bg-[#1e1e2e] text-[#cdd6f4] p-4 sm:p-8 font-mono flex flex-col">
      <div className="w-full flex flex-col flex-1 min-h-0">
        <TerminalHeader />
        <Terminal />
      </div>
    </main>
  );
}

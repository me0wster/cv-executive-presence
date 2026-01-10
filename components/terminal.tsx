"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { AboutSection } from "./sections/about";
import { ContactSection } from "./sections/contact";
import { ExperienceSection } from "./sections/experience";
import { HelpSection } from "./sections/help";
import { ProjectsSection } from "./sections/projects";
import { SkillsSection } from "./sections/skills";
import { WelcomeSection } from "./sections/welcome";

type HistoryEntry = {
  id: number;
  command: string;
  output: React.ReactNode;
};

export function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tempInput, setTempInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  const handleCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "clear") {
      setHistory([]);
      setInput("");
      setCommandHistory([]);
      setHistoryIndex(-1);
      setTempInput("");
      return;
    }

    if (trimmedCmd === "") {
      setHistory((prev) => [
        ...prev,
        {
          id: idCounter.current++,
          command: cmd,
          output: null,
        },
      ]);
      setInput("");
      setHistoryIndex(-1);
      setTempInput("");
      return;
    }

    let output: React.ReactNode;
    switch (trimmedCmd) {
      case "about":
        output = <AboutSection />;
        break;
      case "experience":
        output = <ExperienceSection />;
        break;
      case "skills":
        output = <SkillsSection />;
        break;
      case "projects":
        output = <ProjectsSection />;
        break;
      case "contact":
        output = <ContactSection />;
        break;
      case "help":
        output = <HelpSection onCommand={handleCommand} />;
        break;
      default:
        output = (
          <div className="text-(--terminal-red) text-sm">
            command not found. Type 'help' for available commands.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: idCounter.current++,
        command: cmd,
        output,
      },
    ]);

    setCommandHistory((prev) => {
      if (prev.length === 0 || prev[prev.length - 1] !== cmd) {
        return [...prev, cmd];
      }
      return prev;
    });

    setInput("");
    setHistoryIndex(-1);
    setTempInput("");
  }, []);

  useEffect(() => {
    // Auto-run welcome on mount
    setTimeout(() => {
      setHistory([
        {
          id: idCounter.current++,
          command: "cat welcome.txt",
          output: <WelcomeSection />,
        },
        {
          id: idCounter.current++,
          command: "help",
          output: <HelpSection onCommand={handleCommand} />,
        },
      ]);
    }, 300);
  }, [handleCommand]);

  useEffect(() => {
    // Scroll to bottom when history changes
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      handleCommand("clear");
      return;
    }

    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      handleCommand("help");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      if (historyIndex === -1) {
        setTempInput(input);
      }

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;

      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput(tempInput);
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  return (
    <div className="border border-border rounded-md bg-background flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="space-y-4">
        {history.map((entry) => (
          <div key={entry.id} className="space-y-2">
            <div className="text-foreground text-sm">
              <span className="text-(--terminal-green)">$ </span>
              {entry.command}
            </div>
            {entry.output}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-(--terminal-green)">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground font-mono text-sm caret-(--terminal-green)"
            placeholder="Type a command... (try 'help')"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

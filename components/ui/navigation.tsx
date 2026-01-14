"use client";

import { useState, useEffect } from "react";
import { navigationItems, sectionIds } from "@/lib/data/navigation";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { useScrollTo } from "@/lib/hooks/use-scroll-to";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollTo(sectionId);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 right-0 h-screen z-40 hidden lg:flex flex-col justify-center px-8",
          "transition-all duration-300",
          isScrolled && "bg-background/80 backdrop-blur-sm"
        )}
        aria-label="Main navigation"
      >
        <ul className="space-y-6">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  "nav-link block text-right text-sm uppercase tracking-widest",
                  activeSection === item.id && "nav-link-active",
                  item.isPrimary && "font-semibold"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-4 flex justify-end">
            <ThemeToggle />
          </li>
        </ul>
      </nav>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 lg:hidden",
          "transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={(e) => handleNavClick(e, "hero")}
            className="font-serif text-xl font-medium text-foreground"
          >
            TC
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 w-10 h-10 flex flex-col items-center justify-center"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen && "rotate-45 translate-y-1.5"
              )}
            />
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground mt-1.5 transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground mt-1.5 transition-all duration-300",
                isMobileMenuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          "bg-background/98 backdrop-blur-md",
          "transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          className="h-full flex flex-col items-center justify-center"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-8 text-center">
            {navigationItems.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "transition-all duration-500",
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-2xl font-serif italic transition-colors duration-200 text-foreground"
                  style={{
                    color:
                      activeSection === item.id
                        ? "var(--color-accent-cta)"
                        : undefined,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-accent-cta)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      activeSection === item.id
                        ? "var(--color-accent-cta)"
                        : "")
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li
              className={cn(
                "transition-all duration-500 pt-4",
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: isMobileMenuOpen
                  ? `${navigationItems.length * 50}ms`
                  : "0ms",
              }}
            >
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

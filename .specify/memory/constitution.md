<!--
Sync Impact Report:
Version: 0.0.0 → 1.0.0
Change Type: Initial Constitution Creation
Modified Principles: N/A (Initial creation)
Added Sections:
  - Core Principles (5 principles defined)
  - User Experience Standards
  - Technical Standards
  - Governance
Templates Status:
  ✅ plan-template.md - Constitution Check section ready for validation
  ✅ spec-template.md - User scenarios align with UX-first principle
  ✅ tasks-template.md - Task structure supports component-driven development
Follow-up TODOs: None
-->

# CV-TUI Constitution

## Core Principles

### I. Terminal Aesthetic First (NON-NEGOTIABLE)

Every feature MUST preserve and enhance the terminal/CLI aesthetic. This is the defining characteristic of the project.

**Rules:**
- All UI components MUST use monospace fonts (Menlo, Courier New)
- Color schemes MUST use Catppuccin themes exclusively (Latte, Frappé, Macchiato, Mocha)
- Interactive elements MUST feel like terminal commands (keyboard-driven, text-based)
- Visual design MUST evoke a retro terminal experience while remaining modern and accessible

**Rationale:** The terminal aesthetic is not decoration—it's the core brand identity. It differentiates this CV from traditional portfolio sites and reflects the owner's technical expertise and personality.

### II. Component-Driven Architecture

All content sections MUST be implemented as independent, reusable React components.

**Rules:**
- Each CV section (About, Experience, Skills, Projects, Contact) MUST be a standalone component
- Components MUST follow the pattern: `[Section]Section` (e.g., `AboutSection`, `SkillsSection`)
- Components MUST use shared wrappers (`SectionHeader`, `SectionFooter`) for consistency
- New sections MUST be added through the terminal command system
- Components MUST be self-contained with their own data and styling

**Rationale:** Component isolation enables easy content updates, A/B testing of different sections, and maintainability. Each section can be developed, tested, and modified independently.

### III. Keyboard-First Interaction

All user interactions MUST be achievable via keyboard commands.

**Rules:**
- Terminal input MUST support command history (↑/↓ arrow keys)
- Keyboard shortcuts MUST be documented in the help system (Ctrl+L, Ctrl+K)
- Mouse interactions are OPTIONAL enhancements, never requirements
- All commands MUST be discoverable through the `help` command
- Command names MUST be intuitive and match common CLI conventions

**Rationale:** Keyboard-first design honors the terminal metaphor, improves accessibility, and creates a more engaging experience for technical audiences who prefer keyboard navigation.

### IV. Theme Flexibility

The application MUST support multiple Catppuccin themes with seamless switching.

**Rules:**
- All color references MUST use CSS custom properties (e.g., `var(--ctp-green)`)
- Theme state MUST persist across sessions via localStorage
- Theme switching MUST not cause layout shifts or flashing
- All four Catppuccin flavors MUST be supported: Latte (light), Frappé, Macchiato, Mocha (dark)
- Terminal semantic colors MUST be defined: `--terminal-green`, `--terminal-red`, `--terminal-blue`, `--terminal-yellow`, `--terminal-purple`

**Rationale:** Theme flexibility respects user preferences and demonstrates technical sophistication. Catppuccin provides a cohesive, accessible color system that maintains the terminal aesthetic across light and dark modes.

### V. Content as Code

CV content MUST be maintained as structured data within components, not in external files or databases.

**Rules:**
- Experience, skills, projects data MUST be defined as TypeScript objects within components
- Content updates MUST be made through code commits, not CMS or admin panels
- Data structures MUST be typed (TypeScript interfaces/types)
- Content MUST be version-controlled alongside code
- ASCII art and visual elements MUST be defined as string constants

**Rationale:** Content-as-code ensures version control, enables code review of content changes, and eliminates runtime dependencies. For a personal CV site, this simplicity is a feature, not a limitation.

## User Experience Standards

### Performance

- Initial page load MUST complete in under 2 seconds on 3G connections
- Theme switching MUST be instant (no perceptible delay)
- Terminal command execution MUST feel immediate (< 100ms)
- No layout shifts during hydration or theme changes

### Accessibility

- All interactive elements MUST be keyboard accessible
- Color contrast MUST meet WCAG AA standards across all themes
- Screen readers MUST be able to navigate content logically
- Focus indicators MUST be visible and follow terminal aesthetic

### Responsiveness

- Layout MUST adapt gracefully from mobile (320px) to desktop (2560px+)
- Terminal interface MUST remain usable on touch devices
- ASCII art MUST scale appropriately or provide mobile alternatives
- All commands MUST work on mobile keyboards

## Technical Standards

### Technology Stack

**Required:**
- Next.js 16+ (App Router)
- React 19+
- TypeScript 5+
- Tailwind CSS 4+
- pnpm (package manager)

**Prohibited:**
- jQuery or legacy libraries
- CSS-in-JS libraries (use Tailwind + CSS custom properties)
- External CMS or database systems
- Heavy animation libraries (keep it lightweight)

### Code Quality

- All components MUST be TypeScript with explicit types
- No `any` types except when interfacing with untyped libraries
- Components MUST use React hooks (functional components only)
- State management MUST use React Context for theme, useState/useCallback for local state
- No prop drilling beyond 2 levels (use Context if needed)

### File Organization

```
app/                    # Next.js app router
  globals.css          # Theme system & Tailwind
  layout.tsx           # Root layout
  page.tsx             # Main page

components/
  sections/            # CV content sections
    about.tsx
    experience.tsx
    skills.tsx
    projects.tsx
    contact.tsx
    help.tsx
    welcome.tsx
    section-wrapper.tsx
  theme/               # Theme system
    theme-provider.tsx
    theme-switcher.tsx
    theme-script.tsx
  terminal.tsx         # Terminal shell
  terminal-header.tsx  # Terminal chrome
```

### Testing Philosophy

- Manual testing via browser is PRIMARY validation method
- Visual regression testing for theme consistency
- Lighthouse scores: Performance > 90, Accessibility > 95
- Test across all four Catppuccin themes before merging

## Governance

### Amendment Process

1. **Proposal:** Document proposed change with rationale
2. **Impact Analysis:** Identify affected components and templates
3. **Version Bump:** Follow semantic versioning (MAJOR.MINOR.PATCH)
4. **Update Templates:** Sync plan-template.md, spec-template.md, tasks-template.md
5. **Commit:** Use format `docs: amend constitution to vX.Y.Z (description)`

### Versioning Policy

- **MAJOR:** Principle removal, architectural paradigm shifts (e.g., abandoning terminal aesthetic)
- **MINOR:** New principle added, significant guidance expansion
- **PATCH:** Clarifications, examples, typo fixes, non-semantic refinements

### Compliance Review

- All feature specifications MUST include a Constitution Check section
- PRs MUST reference relevant constitutional principles
- Complexity that violates principles MUST be explicitly justified
- Constitution supersedes all other documentation in case of conflict

### Living Document

This constitution is a living document. As the project evolves, principles may be refined, but the core identity—a terminal-style CV with beautiful theming—remains sacrosanct.

**Version**: 1.0.0 | **Ratified**: 2026-01-10 | **Last Amended**: 2026-01-10

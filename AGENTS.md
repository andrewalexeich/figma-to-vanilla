# Project Instructions

## 1. Project Purpose

The project is intended for converting Figma designs into accurate static HTML/CSS/JS implementations using Figma MCP.

## 2. General Rules

All rules specified here are mandatory and must be followed by the AI agent.

Do not rewrite, simplify, or replace existing project rules with your own assumptions.

Do not change the project structure unless necessary.

Do not create files, directories, components, CSS, or JavaScript that are not предусмотрены existing project rules or explicitly requested by the user.

If an existing project rule conflicts with the AI agent's own assumption, the project rule takes priority.

If there are several substantially different ways to correctly implement a task and Figma does not provide enough information to unambiguously determine the required behavior, do not choose an option on your own. Ask the user a clarifying question through the AI agent's available interactive mechanism and wait for their response.

## 3. Token Efficiency

### Editing Iterations

Perform ordinary text, CSS, HTML, and local logic changes in a single iteration.

Do not split a simple task into multiple stages unless necessary.

For already implemented layouts, do not perform another full project analysis unless the current task requires it.

### Terminal

For ordinary layout work and local changes, the following are prohibited:

- bash
- Python
- Node.js scripts
- test scripts
- terminal QA

Terminal usage is permitted only if the user explicitly requests it or the task is technically impossible without a terminal.

The prohibition on terminal usage does not apply to reading project instructions, including `AGENTS.md`, `CLAUDE.md`, `SKILL.md`, and files in the `references/` directory.

Use the AI agent's available built-in file-reading tools to read these files. Do not use the terminal to read instructions.

### Minimal Changes

Change only the necessary lines.

Do not rewrite an entire file for a minor change.

Do not refactor adjacent code unless necessary.

Preserve the existing correct implementation and change only what is necessary for the current task.

### Context Minimization and Avoiding Repeated Analysis

Detailed project rules are located in `/references/` inside the `.agents/skills/figma-to-web/` skill directory. Do not require the user to repeat or duplicate these rules in every request.

When performing a task, use the existing project rules as the primary source of requirements and do not request them again unless necessary.

When continuing an already implemented layout, analyze only the parts of the project and Figma that are relevant to the current task.

Do not perform another full analysis of already implemented breakpoints, sections, or components unless required by the current task.

If the user explicitly specifies a particular Frame, Component, Variant, or breakpoint in Figma, treat it as the current scope of work and do not expand the task to other areas unless necessary.

### Preserving User Changes

If the user has made changes to HTML, CSS, or JS independently, consider those changes intentional and preserve them.

Do not revert, overwrite, refactor, or "fix" user changes without the user's explicit instruction.

When making new changes, account for existing manual edits and apply changes on top of them.

If a user change conflicts with the current task or project rules, do not remove it automatically.

First determine the impact of the conflict and, if necessary, inform the user.

### User Communication

Do not duplicate modified code in your response.

Do not repeat long descriptions of project rules to the user.

After successfully completing a simple change, respond briefly:

`Changes applied.`

After completing a more complex task, briefly report the result and the verification performed.

If there is an important risk or unresolved conflict, report only that.

### Targeted File Analysis

When continuing existing work, do not reread large project files in their entirety unless necessary, if a specific section is sufficient for the current task.

First determine the scope of the change based on the current task and the selected Figma Frame, then analyze the related HTML/CSS/JS and necessary rules.

Perform a full project re-analysis only when the current task genuinely affects the architecture, multiple related sections, or requires verification of the overall structure.

## 4. Mandatory Skill

For tasks involving the development, implementation, adaptation, or verification of websites based on Figma designs, use the `figma-to-web` skill.

Before starting such a task, read its `SKILL.md` in full and follow the instructions contained in it.

The skill is located at:

`.agents/skills/figma-to-web/SKILL.md` (OpenCode, Codex) and `.claude/skills/figma-to-web/SKILL.md` (Claude Code, Cline).

Detailed project technical rules are located in the `references/` directory inside the `.agents/skills/figma-to-web/` skill directory (OpenCode, Codex) and inside the `.claude/skills/figma-to-web/references/` directory (Claude Code, Cline).

Do not load all reference files automatically. Select the necessary files according to the skill instructions.
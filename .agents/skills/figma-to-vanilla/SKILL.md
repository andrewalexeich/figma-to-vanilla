---
name: figma-to-vanilla
description: Converting Figma designs into accurate static HTML/CSS/JS implementations using Figma MCP without frameworks. The main set of rules for implementing, adapting, analyzing, and verifying websites based on Figma designs, including layout, responsive behavior, components, styles, assets, animations, and visual verification.
license: MIT
metadata:
  author: "Andrey Gorokhov"
---

# 1. Purpose

These rules are instructions for the AI agent on implementing a static website based on a Figma design.

The main task is to reproduce the provided Figma design in HTML/CSS/JS as accurately as possible, preserving its visual structure, typography, dimensions, colors, spacing, components, and intended responsive behavior.

# 2. Reference Rules

Detailed project rules are divided by task and located in the `references/` directory.

Do not read all reference files automatically for every task.

Before starting work, determine which aspects are affected by the current task and read only the corresponding reference files.

If a task affects multiple aspects, read all corresponding files.

If it becomes clear during the work that the task affects an additional area, read the corresponding reference file before implementing it.

| File | Read when the task involves |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `references/mcp-rules.md` | working with Figma MCP, retrieving data from Figma, analyzing a specific design, or visual verification through Figma MCP |
| `references/structure.md` | project structure, `index.html`, HTML/CSS/JS organization, JavaScript logic, favicon |
| `references/fluid-responsive.md` | dimensions, units of measurement, breakpoints, responsive behavior, fluid layout, behavior below/above 1920px, containers |
| `references/css-conventions.md` | CSS, BEM, classes, CSS variables, typography, colors, dimensions, and general CSS conventions |
| `references/figma-components.md` | Figma Components, Component Sets, Variants, Component Properties, Instances, component states |
| `references/figma-layout.md` | Figma Auto Layout, Layout Grid, spacing, Grid/Flexbox, container structure, `position: absolute` |
| `references/assets.md` | fonts, images, SVG, favicon, WebP, asset import and processing |
| `references/animations.md` | animations, transitions, interactive states, storyboard, Prototype connections, GSAP |
| `references/verification.md` | visual verification, Live Server, responsive testing, and final result verification |
| `references/production-git.md` | minification, production files, `.gitignore`, Git, GitHub, or Vercel |

## Basic Combinations

For ordinary Figma implementation:

1. `mcp-rules.md`
2. `structure.md`
3. `css-conventions.md`
4. `figma-layout.md`
5. `fluid-responsive.md`
6. `figma-components.md` — if Components/Variants are used
7. `assets.md` — if images, fonts, or other assets are used
8. `verification.md` — before completing the task

For modifying existing HTML/CSS/JS:

1. `structure.md`
2. `css-conventions.md` — if CSS is affected
3. `fluid-responsive.md` — if responsive behavior is affected
4. `verification.md` — if the change affects the visual result

For animations:

1. `mcp-rules.md`
2. `animations.md`
3. `structure.md`
4. `css-conventions.md`
5. `figma-layout.md` — if the animation is related to layout
6. `fluid-responsive.md` — if the animation depends on a breakpoint
7. `verification.md`

For working with assets only:

1. `assets.md`
2. `structure.md` — if HTML/CSS references need to be changed

For production/Git:

1. `production-git.md`
2. `structure.md` — if the task also affects the production file structure
3. `verification.md` — if the final website needs to be verified

## Rule for Figma

If a task involves a specific Figma design, use `mcp-rules.md` first, then read only the reference files related to the identified structure and task.

For example, if a section needs to be implemented using Auto Layout, Components, and responsive versions, the following files must be read:

`mcp-rules.md`

`figma-layout.md`

`figma-components.md`

`fluid-responsive.md`

`structure.md`

`css-conventions.md`

`verification.md`

Do not read `animations.md`, `production-git.md`, or `assets.md` if the current task does not involve them.

## Priority Rule

Reference file rules are mandatory within the areas they describe.

If the current task involves multiple reference files, all applicable rules must be followed.

Do not consider the need to read a reference file as grounds for changing parts of the project that are unrelated to the current task.

If a reference file rule conflicts with the AI agent's own assumption, the project rule takes priority.

If two project rules genuinely conflict with each other, do not choose an option independently. Identify the conflict and ask the user for clarification.

## Rule for Re-reading

If a required reference file has already been read during the current task and its rules have not changed, it does not need to be read again unless necessary.

When moving on to a new task, determine the necessary reference files again based on the current context.
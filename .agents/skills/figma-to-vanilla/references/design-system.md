# UI Kit and Design System

## Purpose

This document defines the workflow for working with the Figma UI Kit and design system during website implementation.

The goal is to identify shared design rules and reusable project components, preserve the collected information, and consistently apply it when implementing pages without re-analyzing elements that have already been reviewed.

## Initial UI Kit Analysis

At the beginning of the project, check whether a UI Kit, component library, or other design system materials are available in Figma.

If a UI Kit is available, treat it as the foundation and specification of the website's design system.

Gradually review the following:

- **Figma Variables** — available variables and their values.
- **Color Styles** — the color palette and the purpose of each color.
- **Text Styles** — typography styles and their properties.
- **Components and Component Sets** — the component library, its variants, and properties.
- **General styles** — additional design rules not represented by Figma Variables or Styles.

Do not assume that all of these materials are necessarily available in the UI Kit. If some materials are missing, determine the corresponding values as the page designs are analyzed.

Review the UI Kit progressively, retrieving only the necessary information instead of loading the entire library in a single oversized request.

A UI Kit typically contains components intended for the website. Treat these components as the website's predefined component library rather than limiting the analysis to components already encountered on the first provided page.

## Design System Preparation Before Implementation

Before starting page implementation, review the available UI Kit materials and prepare the project's base design system.

At this stage:

- Identify available Figma Variables and transfer them, along with recurring values, into CSS Custom Properties according to `css-conventions.md`.
- Review Color Styles and preserve the color palette according to the rules in `css-conventions.md`.
- Review Text Styles and prepare the corresponding reusable CSS classes according to `css-conventions.md`.
- Review the Components and Component Sets library, identifying available components, their variants, and properties according to `figma-components.md`.
- Record the collected information and design system structure for subsequent use during page implementation.

There is no need to implement HTML, CSS, and JavaScript for every component and variant at this stage. The component library must be reviewed and taken into account, while individual components should be implemented as needed in the relevant parts of the website.

If the UI Kit does not contain certain required information, do not invent it in advance. Determine missing values and rules as the pages are analyzed and implemented.

Review the UI Kit and prepare the base design system progressively, avoiding redundant requests to Figma.

## Building and Maintaining the Design System

As the UI Kit and Figma pages are reviewed, extend and refine the project's shared styles, values, and components.

- Transfer recurring values into CSS Custom Properties according to `css-conventions.md`.
- Transfer Figma Text Styles into separate reusable CSS classes according to `css-conventions.md`.
- Follow the component analysis and implementation rules in `figma-components.md`.
- Account for responsive typography and layout variations according to `fluid-responsive.md`.
- Preserve the established values and component structure for reuse when implementing subsequent pages.

Do not create duplicate CSS Variables, typography classes, or components if the corresponding elements have already been defined and implemented.

## Reusing the Design System Across Pages

When implementing each subsequent page:

1. Take into account the shared styles, CSS Variables, and components that have already been reviewed and implemented.
2. Compare new elements with existing ones to identify opportunities for reuse.
3. Reuse existing components and styles when they match the new design.
4. Review only new components, different variants, and values that have not yet been established.
5. Do not repeat the analysis of information that has already been reliably retrieved and preserved.

Do not automatically force new elements to conform to the existing design system. If differences are found, verify them in Figma and follow the actual design.

Figma remains the source of truth. If new Figma data conflicts with previously established values, verify the reason for the differences and use the current parameters specified by the design.

## If the UI Kit Is Missing or Incomplete

If the UI Kit is unavailable or does not contain all the necessary materials, gradually build the design system based on the provided page designs.

As implementation progresses, identify recurring values, typography styles, general layout parameters, and reusable components.

Preserve the collected information and apply it when implementing subsequent pages.

Do not attempt to build a complete design system in advance if the necessary information is not yet available in Figma.
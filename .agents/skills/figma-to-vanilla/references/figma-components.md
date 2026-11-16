# Figma Components

This skill is used to analyze and transfer Figma components into a reusable structure for static HTML/CSS/JS layouts.

The main task is to identify Components, Component Sets, Variants, Component Properties, and Instances in Figma, combine variants of the same component into a single BEM block, and implement their states and modifications through HTML/CSS/JS without duplicating components or violating the original structure and behavior of the layout.

---

Convert Figma Components into reusable BEM blocks within the HTML structure of the project.

For Single-page projects, implement components within the corresponding HTML document.

For Multi-page projects, implement components within the HTML documents of the pages where they are used, following the project's established architecture and component reuse rules.

Before creating a new component, check whether a suitable component already exists.

Do not create duplicates of the same component.

## Analysis of Components, Component Sets, and Variants

When a UI Kit or component library is available, review its Components, Component Sets, Variants, and Component Properties during the initial design system analysis, following `design-system.md`.

When analyzing individual page designs, identify the Components and Instances used on the provided page and compare them with the components already reviewed and recorded.

If no UI Kit or component library is available, identify reusable components progressively as page designs are analyzed.

Do not inspect all website pages in advance solely to search for reusable components. Identify opportunities for reuse as new pages are provided.

It is necessary to identify:

- Figma Components;
- Component Sets;
- Variants within Component Sets;
- Component Properties;
- Instances of these components used in the layout.

If a Component Set with multiple Variants exists in Figma, treat it as a single reusable component.

For example:

```text
Button
├── State=Default
└── State=Hover
```

This is one Button component with states, not two separate components.

Create a single BEM block `.button` in HTML.

Implement Variant states using the corresponding HTML/CSS/JS behavior:

- Hover → `:hover`;
- Focus → `:focus` / `:focus-visible`;
- Active → `:active`;
- Disabled → the corresponding element state;
- other states → only if their behavior is confirmed by the design or requirements.

Do not create separate HTML blocks for each Variant.

If a Component is used in multiple places in the layout, use the same component structure and styles, changing only the necessary modifiers, properties, and content.

When analyzing a component, consider not only its appearance, but also:

- component name;
- Component Set;
- Variant properties;
- Variant property values;
- dimensions;
- Auto Layout;
- internal spacing;
- typography;
- colors;
- borders;
- radii;
- shadows;
- states;
- nested components;
- used Assets.

## Figma Variants

Variants of the same Figma Component should generally be implemented as modifiers of a single BEM block.

For example:

```css
.button {}
.button--primary {}
.button--secondary {}
.button--large {}
.button--small {}
```

Do not create separate blocks:

```css
.primary-button {}
.secondary-button {}
.large-button {}
```

if they are variants of the same component.

## Mandatory Component Analysis Before Implementation

Before writing HTML and CSS, always separately check the component structure in Figma.

Do not limit the analysis to the visual appearance of the layout. Before starting implementation, determine:

1. Which Components are used.
2. Which of them belong to Component Sets.
3. Which Variants exist for each Component Set.
4. Which Component Properties are used.
5. Where the Instances of these components are located.
6. Which states and variants must be reflected in HTML/CSS/JS.

If this structure exists in Figma, take it into account during implementation even if the variants look visually identical.

The component name in Figma does not have to match the CSS class name exactly.

For example, a Figma component may be named `hero-btn`, while its semantic BEM class in HTML/CSS may be `.button`.

When choosing a CSS class, follow the semantics and BEM structure of the implemented website rather than mechanically copying the names of Figma Layers, Components, or Variants.
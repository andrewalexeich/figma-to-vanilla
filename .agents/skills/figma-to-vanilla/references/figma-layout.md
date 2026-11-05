# Figma Layout Analysis

This skill is used to analyze the layout structure in Figma before implementing a static HTML/CSS/JS layout.

The main task is to accurately determine the relationships between elements, Auto Layout, Layout Grid, spacing, alignment, containers, and responsive structure in Figma, and use them as the basis for choosing the correct CSS mechanism while preserving the original visual result.

## 1. Analysis

Before implementation, carefully analyze:

* Auto Layout;
* Layout Grid;
* element arrangement direction;
* element dimensions;
* repeated dimensions;
* spacing consistency;
* alignment;
* distances between elements;
* parent-child relationships;
* repeated components;
* visual groups;
* changes between responsive designs;
* maximum container widths;
* Auto Layout behavior at resolutions above 1920px.

## 2. Transferring Spacing from Figma Auto Layout

If the distance between child elements in Figma is defined through `Auto Layout spacing`, transfer it to CSS as `gap`, `row-gap`, or `column-gap` of the corresponding parent container.

Do not replace `Auto Layout spacing` with `margin` on one of the child elements if the parent's `gap` correctly reflects the Figma structure.

Do not add compensating `margin` values to child elements to imitate spacing that is a property of the parent Auto Layout in Figma.

If the spacing between several child elements is defined by a single Auto Layout spacing value, preserve it as a single parent property rather than distributing it across individual child `margin` values.

If the spacing in Figma is not defined through Auto Layout spacing, but through individual margins, positioning, or another structure, do not apply this rule automatically — determine the CSS mechanism based on the actual Figma structure.

## 3. Section and Inner Container

When transferring a layout from Figma, distinguish between the outer Frame/Section and the inner Container created to implement the project's structure and fluidity.

If the HTML contains an outer section and an inner Container, determine from the Figma structure which level each geometric property belongs to:

* `height` / `min-height`;
* `100vh` / `100svh` / `100dvh`;
* outer `padding`;
* `max-width`;
* inner `padding`;
* alignment and layout of child elements.

Do not automatically transfer properties of the outer Figma Frame/Section to the inner Container just because the Container is its first child element.

If a viewport-dependent height belongs to the section itself, for example, if the section must have `min-height: 100vh`, set it on the corresponding section element, not on the inner Container.

Do not automatically consider the Container created to implement project fluidity a replacement for the outer Figma Frame/Section.

Do not change the DOM level at which a geometric property is set without confirmation from the Figma structure and the required visual behavior.

Choose the CSS mechanism based on the **actual Figma structure**, not only on the visual arrangement of elements.

When choosing between CSS Grid and Flexbox, always take into account the Layout Grid and Auto Layout of the parent Frame.

If the Figma structure uses Layout Grid to position or align multiple elements across columns/rows, implement the corresponding structure using CSS Grid.

Do not replace CSS Grid with Flexbox solely because the elements are visually arranged in a single row.

Use CSS Grid when elements must be aligned to a two-dimensional grid, columns, or rows, when multiple elements must independently occupy specific areas of one shared grid, or when the Figma Layout Grid defines their relative positioning.

Use Flexbox for arranging elements sequentially in one dimension when the Figma structure actually corresponds to horizontal or vertical Auto Layout.

Use the normal document flow where elements naturally appear in sequence and no separate layout mechanism is required.

Before changing an already implemented layout, do not replace Grid with Flexbox without checking the Figma structure.

If the existing implementation visually matches Figma but uses a different CSS mechanism, do not change it without necessity solely to use Flexbox or Grid.

Pay particular attention to cases where using Flexbox changes the position of elements relative to the container, columns, menu, or other layout elements.

The main criterion is not the name of the CSS technology, but its correspondence to the **Figma structure, Layout Grid, Auto Layout, and visual result**.

Do not transfer `x/y` coordinates from Figma directly into `position: absolute`.

Use `position: absolute` only when an element actually needs to:

* overlap another element;
* have independent positioning;
* be a decorative element;
* be placed on top of another element.
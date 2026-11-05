# Responsiveness, Containers

This skill is used to implement responsive layouts and container structures based on the provided Figma designs.

The main task is to accurately transfer Figma's Fluid Responsive system, use the specified breakpoints and scaling coefficients, determine the actual dimensions and constraints of containers based on the design structure, and implement responsive behavior only on the basis of the provided responsive designs, without independently inventing breakpoints, layouts, or structural changes.

## 1. Fluid Responsive

Use the following Fluid Responsive system:

```css
/* Fluid Responsive */
html { font-size: 12px; }
@media screen and (max-width:1920px) { html { font-size: 0.625vw; } } /* 1600px design, 0.625vw = 10px, divide all px values in the design by 10 to get the result in rem */
@media screen and (max-width:991px) { html { font-size: 1.302vw; } } /* 768px design, 1.302vw = 10px, divide all px values in the design by 10 to get the result in rem */
@media screen and (max-width:479px) { html { font-size: 2.778vw; } } /* 360px design, 2.778vw = 10px, divide all px values in the design by 10 to get the result in rem */
```

### Main Desktop Design

The main desktop design in Figma is **1600px**.

It serves as the base design for the range:

```text
up to and including 1920px
```

The main styles for the desktop design must be placed in:

```css
@media screen and (max-width: 1920px) {
    ...
}
```

Fluid Responsive is used in this case:

```css
html {
    font-size: 0.625vw;
}
```

At a viewport width of 1600px:

```text
0.625vw = 10px
```

Therefore, all dimensions from the 1600px design are converted as follows:

```text
Figma px / 10 = rem
```

For example:

```text
16px → 1.6rem
24px → 2.4rem
32px → 3.2rem
48px → 4.8rem
```

### Responsive Designs

Responsive designs are handled in the same way.

For the 768px design, use:

```css
@media screen and (max-width: 991px) {
    html {
        font-size: 1.302vw;
    }
}
```

At a viewport width of 768px:

```text
1.302vw ≈ 10px
```

Dimensions from the 768px Figma design are converted as follows:

```text
Figma px / 10 = rem
```

For the 360px design, use:

```css
@media screen and (max-width: 479px) {
    html {
        font-size: 2.778vw;
    }
}
```

At a viewport width of 360px:

```text
2.778vw ≈ 10px
```

Dimensions from the 360px Figma design are also converted as follows:

```text
Figma px / 10 = rem
```

For each provided responsive design, use the corresponding `html { font-size: ...vw; }` rule from the Fluid Responsive system specified above.

Do not change the coefficients:

```text
0.625vw
1.302vw
2.778vw
```

without the user's explicit instruction.

### Behavior Above 1920px

**Above 1920px, the layout must no longer be fluid.**

At viewport widths greater than 1920px, the layout must be fixed relative to its maximum width specified in Figma.

If the main container in Figma uses Auto Layout and has a limited width, you must:

* determine its `max-width` from Figma;
* set `max-width` in **px**;
* use `margin: 0 auto` for horizontal centering;
* do not stretch the container beyond its width in Figma.

For example, if the main container width in Figma is 1600px:

```css
.container {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
}
```

For dimensions that must remain fixed at resolutions **above 1920px**, use `px`, not `rem`.

Thus:

* **up to 1920px** — Fluid Responsive;
* **above 1920px** — a fixed layout based on Figma dimensions, with `max-width` and centering;
* the main container must not continue growing along with the viewport.

### Important Rule

Do not use `rem` for fixed dimensions that must remain unchanged at viewport widths above 1920px.

At resolutions above 1920px, dimensions that define the fixed width of the layout and its containers must be set in `px`.

## 2. Responsive

Before starting implementation, determine whether a responsive version of the design is provided.

### If Responsive Design Exists

Ask the user to select/highlight the corresponding responsive Frames/Canvases in Figma.

Use the provided responsive designs as the **only source of truth** for responsive behavior.

Process each provided responsive design using the same Fluid Responsive system:

* determine the width of the Figma design;
* determine the corresponding breakpoint;
* convert element dimensions from Figma px to `rem` by dividing by 10.

Do not independently invent:

* additional breakpoints;
* dimensions;
* element rearrangements;
* hiding elements;
* mobile navigation;
* layout changes,

if these are not present in the provided design or explicitly specified by the user.

When adapting one breakpoint, preserve the correct implementation of all other already provided breakpoints.

Implement changes that apply only to the current breakpoint inside the corresponding media query or by another method that does not affect the other breakpoints.

After making responsive changes, check the current breakpoint and all already implemented breakpoints to ensure that the changes have not disrupted existing behavior.

Do not change the styles of another breakpoint without necessity and without confirmation from the corresponding Figma Frame.

When adapting the layout, separately check Figma Text Styles for each text layer. If a separate Text Style is used for a breakpoint (for example, Desktop/H1, Tablet/H1, Mobile/H1), take its actual parameters into account: font family, font size, font weight, line-height, letter-spacing, and color. Do not assume that typography remains unchanged based solely on the visual similarity of the text.

When adapting the layout, preserve existing HTML elements and components if they remain the same in terms of meaning.

Do not require the HTML structure to fully match the layers of every responsive Figma Frame.

If an element exists only at a specific breakpoint, it is acceptable to add it as a responsive-only element.

For example, if Hamburger is present only in the mobile Figma Frame and is absent from the desktop Frame, do not artificially add it to the desktop layout just to preserve an identical set of layers. Implement it as a mobile-only element: the element may be present in the shared HTML, but hidden on desktop using CSS media queries (`display: none`) and made visible at the corresponding mobile breakpoint.

Do not use JavaScript to change the visibility or layout of elements if this can be correctly implemented using CSS.

If a responsive design requires an additional wrapper for a group of elements, it is acceptable to add it to the HTML.

Do not add additional wrappers or elements without necessity. Every structural difference must be justified by the provided responsive Figma design, its Auto Layout, Layout Grid, or the required component behavior.

The main principle: preserve shared components and elements, but do not attempt to artificially make the HTML structure absolutely identical across all breakpoints if the structure of the Figma responsive design objectively differs.

### If Responsive Design Does Not Exist

Implement only the provided desktop design.

Do not invent a mobile version independently.

## 3. Containers

Do not automatically treat the desktop Frame width as the maximum width of the inner container.

The actual `max-width` must be determined based on Figma Auto Layout and structure.

Do not invent `max-width` independently.

At resolutions above 1920px, use the following structure:

```css
.block__container {
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
}
```

Apply `max-width: 1920px` if it corresponds to the project structure and Fluid Responsive rules.

If Figma specifies a different maximum width for a particular inner container, use the value confirmed by the design.

For example:

```css
max-width: 1600px;
```

or:

```css
max-width: 1440px;
```

Do not automatically set `max-width: 1920px` for an inner container solely because this is the maximum width of the viewport or outer Frame.

At resolutions up to 1920px, preserve the existing Fluid Responsive system and correct container behavior within the parent block.

Do not add additional `width: 100%` and `max-width` rules for breakpoints below 992px without necessity: the container width must be determined by the existing layout structure and the behavior of nested elements.

Do not create an additional container if the existing HTML structure already provides the required behavior.
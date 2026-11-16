# CSS, CSS Variables, BEM, Typography

This skill is used to organize CSS code and transfer typography and class structure from Figma into a static HTML/CSS/JS layout.

The main task is to accurately implement dimensions and layout using CSS, move repeated values into CSS variables, follow the BEM methodology and a consistent container pattern, and preserve Figma typography parameters.

## 1. CSS

Organize CSS according to the established project architecture and the hybrid CSS organization approach.

Use shared CSS files for global styles and separate files for components or pages when justified by the project structure.

Do not create a separate file for CSS boilerplate.

Do not create unnecessary CSS files or split styles into separate files without a practical reason.

Reuse existing CSS files whenever appropriate.

### Native CSS Nesting

Use native CSS Nesting when nested selectors improve readability and organization.

Example:

```css
.button {
    background-color: black;

    &:hover {
        background-color: gray;
    }
}

.button__icon {
    width: 2rem;
}
```

Do not require SCSS or Sass for CSS nesting. Native CSS Nesting is sufficient for projects using standard CSS.

If an existing project already uses SCSS or Sass, preserve its established approach.

### Dimensions and Centering

To implement dimensions and layout, use CSS properties corresponding to the Figma structure:

```css
width;
height;
max-width;
gap;
```

Use the following for horizontal centering:

```css
margin: 0 auto;
```

Do not use the following without strict necessity:

```css
margin-inline: auto;
```

Do not use `min-height` as a standard replacement for `height`.

Use `min-height` only in special cases when it is genuinely required by the design or page behavior, for example:

```css
min-height: 100vh;
```

In responsive layouts, use `width` and `height` according to the provided Figma designs.

Do not transfer `x` and `y` values from Figma directly into CSS.

Do not use inline styles without necessity.

## 2. CSS Variables

Move repeated colors, fonts, and other values into CSS custom properties.

Example:

```css
:root {
    --color-primary: #123456;
    --color-text: #222222;
    --color-background: #ffffff;
    --font-primary: "Inter", sans-serif;
}
```

Use meaningful names:

```text
--color-primary
--color-text
--color-background
--color-border
--font-primary
```

Do not use meaningless names such as:

```text
--color-1
--color-2
--value-3
```

If Figma contains meaningful Variable/Style names, preserve their meaning when creating CSS variables whenever possible.

Use the same CSS variable for identical values.

## 3. BEM

Use the BEM methodology.

Format:

```css
.block
.block__element
.block__element--modifier
```

Example:

```css
.button {}
.button__icon {}
.button--primary {}
.button--large {}
```

Do not use Figma layer names directly:

```css
.frame-123
.group-456
.rectangle-12
```

Do not use meaningless names:

```css
.left
.right
.item
.text
.block1
.block2
```

Class names must describe the purpose of the element.

Avoid excessive selector nesting.

Use consistent CSS naming conventions throughout the project.

Do not introduce alternative naming conventions or arbitrary class naming patterns without a practical reason.

For existing projects, preserve the established CSS naming conventions rather than introducing a different approach.

## 4. Containers

When a block has its own main container, use the `block__container` naming pattern.

For example:

<div class="hero__container">
    ...
</div>

Use the `__container` suffix consistently for the main container of a corresponding block.

Do not use `block__inner`, `block__wrapper`, `block__content`, or other alternative names for the main container when the element serves specifically as the block's container.

Do not create an additional `__inner` element solely to designate the main container.

Do not create unnecessary containers when they are not required by the design or HTML structure.

## 5. Typography

### Letter Spacing

If Figma specifies `letter-spacing` in percentages, convert it to `em`.

Examples:

```text
-4% → -0.04em
-2% → -0.02em
0%  → 0em
2%  → 0.02em
4%  → 0.04em
```

Do not use `px` for `letter-spacing` if the value in Figma is specified in percentages.

### Line Height

If Figma specifies line height as a percentage, preserve the percentage value.

For example:

```css
line-height: 120%;
```

Do not convert percentage-based `line-height` to px without necessity.

### Full Typography Correspondence

When transferring text from Figma, preserve:

- `font-family`;
- `font-weight`;
- `font-size`;
- `line-height`;
- `letter-spacing`;
- `text-transform`;
- `color`;
- `text-align`.

Do not change these parameters solely for coding convenience.

### Figma Text Styles and CSS Classes

Treat Figma Text Styles as predefined combinations of typography properties, not as individual CSS variables.

Create reusable CSS classes for Figma Text Styles used in the implementation, preserving the meaning of their names and all defined typography properties.

Name typography classes according to the purpose of the text style, not the device or viewport.

For example, if Figma contains the following Text Styles:

- Desktop/H1
- Tablet/H1
- Mobile/H1
- Desktop/Link
- Tablet/Link
- Mobile/Link

Create the corresponding CSS classes:

```css
.text-h1 {}
.text-link {}
```

Do not include device names such as Desktop, Tablet, or Mobile in CSS class names when these styles represent responsive variants of the same text style.

Define the base typography properties in the corresponding CSS class and override responsive values using media queries.

Apply typography classes to HTML elements when their text corresponds to a Figma Text Style, regardless of the HTML tag or component role.

Typography classes are responsible only for text appearance. They must not control component layout, positioning, spacing, or behavior.

For example:

```html
<h1 class="main__title text-h1">Main page</h1>

<a class="nav__link text-link" href="#">About</a>

<button class="button text-button" type="button">Call me back</button>
```

Keep typography classes separate from BEM component and layout classes.

Do not combine distinct Figma Text Styles into a single CSS class merely because some of their properties are identical.

If Figma provides multiple distinct text styles with the same general purpose, preserve their differences using appropriate separate CSS classes.

Each typography class must preserve the complete set of properties defined by its corresponding Figma Text Style:

- `font-family`;
- `font-weight`;
- `font-size`;
- `line-height`;
- `letter-spacing`;
- `text-transform`;
- `color`;
- `text-align`.

Do not invent missing typography values or derive them from other Text Styles.

CSS variables and typography classes serve different purposes:

- CSS variables store individual reusable values, such as colors, font families, and other shared design properties.
- Typography classes define complete combinations of properties corresponding to Figma Text Styles.

Use both mechanisms together where appropriate.
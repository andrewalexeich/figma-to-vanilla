# CSS, CSS Variables, BEM, Typography

This skill is used to organize CSS code and transfer typography and class structure from Figma into a static HTML/CSS/JS layout.

The main task is to accurately implement dimensions and layout using CSS, move repeated values into CSS variables, follow the BEM methodology and a consistent container pattern, and preserve Figma typography parameters.

## 1. CSS

All CSS must be located only in:

```text
styles/styles.css
```

Do not create a separate file for CSS boilerplate.

Do not create additional CSS files without the user's explicit instruction.

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

## 4. Containers

Use a consistent BEM pattern for the main block container:

`block__container`

For example:

```html
<div class="hero__container">
    ...
</div>
```

The `__container` name is mandatory for the main container of the corresponding block.

Do not use `block__inner`, `block__wrapper`, `block__content`, or other alternative names for the main container if this element is specifically the block's container.

Do not create a separate `__inner` solely to designate the main container.

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

* `font-family`;
* `font-weight`;
* `font-size`;
* `line-height`;
* `letter-spacing`;
* `text-transform`;
* `color`;
* `text-align`.

Do not change these parameters solely for coding convenience.